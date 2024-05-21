import { styled } from '@mui/material/styles';
import { Dropzone } from '../../../components';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const UploadPhotos = () => {
    return (
        <div className='upload-photos-container'>
            <div className='upload-button-container'>
                <Dropzone />
            </div>
        </div>
    );
};
