import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import { useDropzone, FileWithPath } from 'react-dropzone';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import { Alert, Button, Typography } from '@mui/joy';

import { useEventContext } from '../../context';
import { ImgFilePreview } from '../../types';
import { axiosFileUploadInterceptor } from '../../config/axios_config';

interface ICancelUpdate {
    onCancelUpdate: () => void;
}

export const UpdateEventDropzone = ({ onCancelUpdate }: ICancelUpdate) => {
    const { setEventPhotos, eventPhotos } = useEventContext();
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [files, setFile] = useState<ImgFilePreview[]>([]);

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        const mappedFiles = acceptedFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setFile(prevFiles => [...prevFiles, ...mappedFiles]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
        },
        maxSize: 10000000,
        multiple: true,
        onDrop,
    });

    const fileElements = files.map(file => {
        return (
            <li
                className="img-element"
                key={file.file.name}
            >
                <img
                    className="img-preview"
                    src={file.preview}
                    alt={file.file.name}
                />
                <CancelTwoToneIcon
                    className="cancel-icon"
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
        const deletedPreviousPhotos = eventPhotos.filter(
            previousPhoto => !files.find(newPhotos => newPhotos.file.name === previousPhoto.path)
        );
        const addedNewPhotoFiles = files.filter(
            newPhoto =>
                !eventPhotos.find(previousPhoto => previousPhoto.path === newPhoto.file.name)
        );

        if (deletedPreviousPhotos.length !== 0) {
            try {
                await Promise.all(
                    deletedPreviousPhotos.map(photo =>
                        axios.delete(`photos/${photo.photoId}/delete/`)
                    )
                );
            } catch (err) {
                alert('Bazı fotoğraflar silinemedi');
                throw new Error(err as string);
            }
        }

        if (eventId && addedNewPhotoFiles.length !== 0) {
            const formData = new FormData();

            formData.append('event', eventId);
            addedNewPhotoFiles.forEach(file => {
                formData.append('path', file.file);
            });

            try {
                const res = await axiosFileUploadInterceptor.post('photos/upload/', formData);
                if (res.status === 201) {
                    // Yeni fotoğrafları context'e set et
                    const updatedPhotos = await axios.get(`events/${eventId}/photos/`);
                    setEventPhotos(updatedPhotos.data);
                }
            } catch (err) {
                alert('Fotoğraflar eklenemedi');
                throw new Error(err as string);
            }
        }

        // Tüm işlemlerden sonra güncel fotoğrafları al
        try {
            const finalPhotos = await axios.get(`events/${eventId}/photos/`);
            setEventPhotos(finalPhotos.data);
        } catch (err) {
            console.error('Fotoğraflar güncellenemedi', err);
        }

        alert('Etkinlik Güncellendi');
        return navigate(`/dashboard/event/${eventId}`);
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
        const existingFiles = eventPhotos.map(photo => {
            return {
                file: new File([], photo.path),
                preview: photo.path,
            };
        });
        setFile(existingFiles);
    }, [eventPhotos]);

    return (
        <section className="dropzone-container">
            <div className={`photo-alert${!files.length ? '-active' : ''}`}>
                <Alert color="warning">
                    Etkinliğe ait hiçbir fotoğraf bulunamadı, lütfen fotoğraf yükleyiniz.
                </Alert>
            </div>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p className="select-text">
                    Ekleyeceğiniz görselleri buraya sürükleyip bırakın veya tıklayarak seçin
                </p>
                <CloudUploadIcon color={'primary'} />
                <p>(Sadece *.png *.jpg ve *.jpeg formatı)</p>
            </div>
            <aside>
                <Typography
                    display={!files.length ? 'none' : 'block'}
                    level="body-lg"
                >
                    Yüklenen Görseller
                </Typography>
                <ul className="selected-img-list">{fileElements}</ul>
            </aside>
            <div className="update-photos-buttons">
                <Button
                    type="submit"
                    variant="solid"
                    color="success"
                    disabled={!files.length}
                    onClick={onStartAnalyze}
                >
                    Güncelle
                </Button>
                <Button
                    type="button"
                    variant="outlined"
                    color="danger"
                    onClick={onCancelUpdate}
                >
                    İptal Et
                </Button>
            </div>
        </section>
    );
};
