import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import { useDropzone, FileWithPath } from 'react-dropzone';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import { Alert, Button, Typography } from '@mui/material';

import { useEventContext } from '../../context';
import { ImgFilePreview } from '../../types';
import { axiosFileUploadInterceptor } from '../../config/axios_config';


export const UpdateEventDropzone = () => {
    const { setEventPhotos, eventPhotos } = useEventContext();
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
        maxSize: 10000000,
        multiple: true,
        onDrop,
    });

    const fileElements = files.map((file) => {
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
                    onClick={() => removeFile(file.file.name)}
                />
            </li>
        );
    });

    const removeFile = (fileName: string) => {
        const deleteConfirmation = window.confirm('Fotoğrafı silmek istediğinize emin misiniz?');
        if (deleteConfirmation) {
            alert('Fotoğraf silindi');
            return setFile(prevFiles => prevFiles.filter(file => file.file.name !== fileName));
        }
    };

    const onStartAnalyze = async () => {
        const deletedPreviousPhotos = eventPhotos.filter(previousPhoto => !files.find(newPhotos => newPhotos.file.name === previousPhoto.path));
        const addedNewPhotoFiles = files.filter(newPhoto => !eventPhotos.find(previousPhoto => previousPhoto.path === newPhoto.file.name));

        if (deletedPreviousPhotos.length !== 0) {
            deletedPreviousPhotos.forEach(async (photo) => {
                try {
                    const res = await axios.delete(`photos/${photo.photoId}/delete/`);
                    console.log(`${photo.photoId} silindi`, res);
                } catch (err) {
                    alert(`${photo.photoId} silinemedi`);
                    throw new Error(err as string);
                }
            });
        }

        // TODO: add event result table to db before the this page's logic
        if (eventId && addedNewPhotoFiles.length !== 0) {
            const formData = new FormData();

            formData.append('event', eventId);
            addedNewPhotoFiles.forEach((file) => {
                formData.append('path', file.file);
            });

            try {
                const res = await axiosFileUploadInterceptor.post('photos/upload/', formData);
                console.log(res);
                if (res.status === 201) {
                    alert("Değişiklikler kaydedildi");
                    return setEventPhotos(res.data);
                }
            } catch (err) {
                alert("Fotoğraflar eklenemedi");
                throw new Error(err as string);
            }
        }
        return alert("Hiçbir değişiklik yapılmadı");
    };

    useEffect(() => {
        return () => {
            files.forEach(file => {
                URL.revokeObjectURL(file.preview);
            });
        };
    }, [files]);

    // get current photos
    useEffect(() => {
        const existingFiles = eventPhotos.map((photo) => {
            return ({
                file: new File([], photo.path),
                preview: photo.path,
            });
        });
        setFile(existingFiles);
    }, [eventPhotos]);

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
                    Ekleyeceğiniz görselleri buraya sürükleyip bırakın veya tıklayarak seçin
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
                Kaydet
            </Button>
        </section>
    );
};
