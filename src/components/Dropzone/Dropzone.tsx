import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDropzone, FileWithPath } from 'react-dropzone';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import { Alert, Button, Typography } from '@mui/material';

import { ImgFilePreview } from '../../types';
import { axiosFileUploadInterceptor } from '../../config/axios_config';
import { useEventContext } from '../../context';


export const Dropzone = () => {
    const { setEventPhotos } = useEventContext();
    const { eventId } = useParams();
    const [files, setFile] = useState<ImgFilePreview[]>([]);

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        const mappedFiles = acceptedFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setFile(prevFiles => [...prevFiles, ...mappedFiles]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        maxSize: 10000000, // max 10MB
        multiple: true,
        onDrop,
    });

    const fileElements = files.map((file) => {
        console.log(file);
        return (
            <li
                className='img-element'
                key={file.file.name}
            >
                <img
                    className='img-preview'
                    src={file.preview}
                    alt={file.file.name}
                />
                <CancelTwoToneIcon
                    className='cancel-icon'
                    onClick={() => {
                        return removeFile(file.file.name);
                    }}
                />
            </li>
        );
    });

    const removeFile = (fileName: string) => {
        return setFile(prevFiles => prevFiles.filter(file => file.file.name !== fileName));
    };

    const onStartAnalyze = async () => {
        const formData = new FormData();

        formData.append('event', eventId!);
        files.forEach((file) => {
            formData.append('path', file.file);
        });

        try {
            const res = await axiosFileUploadInterceptor.post('photos/upload/', formData);
            console.log(res);
            if (res.status === 201) {
                setEventPhotos(res.data);
            }
        } catch (err) {
            alert("Fotoğraflar eklenemedi");
            throw new Error(err as string);
        }
    };

    useEffect(() => {
        return () => {
            files.forEach(file => {
                URL.revokeObjectURL(file.preview);
            });
        };
    }, [files]);

    return (
        <section className="dropzone-container">
            <div className={`photo-alert${!files.length ? '-active' : ''}`}>
                <Alert severity="warning">
                    Etkinliğe ait hiçbir fotoğraf bulunamadı, lütfen fotoğraf yükleyiniz.
                </Alert>
            </div>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p className='select-text' >
                    Görselleri buraya sürükleyip bırakın veya tıklayarak seçin
                </p>
                <CloudUploadIcon color={'primary'} />
                <p>
                    (Sadece *.png *.jpg ve *.jpeg formatı)
                </p>
            </div>
            <aside>
                <Typography
                    display={!files.length ? 'none' : 'block'}
                    variant='subtitle1'
                >
                    Yüklenen Görseller
                </Typography>
                <ul className='selected-img-list'>
                    {fileElements}
                </ul>
            </aside>
            <Button
                className='start-analyze-button'
                variant='contained'
                color='success'
                disabled={!files.length}
                onClick={onStartAnalyze}
            >
                Analizi Başlat
            </Button>
        </section>
    );
};
