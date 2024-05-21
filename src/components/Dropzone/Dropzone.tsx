import { useCallback, useEffect, useState } from 'react';

import { useDropzone, FileWithPath } from 'react-dropzone';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';

import { ImgFilePreview } from '../../types';


export const Dropzone = () => {
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

    const removeFile = (fileName: string) => {
        setFile(prevFiles => prevFiles.filter(file => file.file.name !== fileName));
    };

    const fileElements = files.map((file) => {
        console.log(file);
        return (
            <li className='img-element' key={file.file.name}>
                <img className='img-preview' src={file.preview} alt={file.file.name} />
                <CancelTwoToneIcon className='cancel-icon' onClick={() => removeFile(file.file.name)} />
            </li>
        );
    });

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    return (
        <section className="dropzone-container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p className='select-text' >Görselleri buraya sürükleyip bırakın veya tıklayarak seçin</p>
                <CloudUploadIcon color={'primary'} />
                <p>(Sadece *.png *.jpg ve *.jpeg formatı)</p>
            </div>
            <aside>
                <h4>Yüklenen Görseller</h4>
                <ul className='selected-img-list'>{fileElements}</ul>
            </aside>
        </section>
    );
};
