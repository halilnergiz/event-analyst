import { Dropzone } from '../Dropzone/Dropzone';

export const UploadPhotos = () => {
    return (
        <div className='upload-photos-container'>
            <div className='upload-button-container'>
                <Dropzone />
            </div>
        </div>
    );
};
