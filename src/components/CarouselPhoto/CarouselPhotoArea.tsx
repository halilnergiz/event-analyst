import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

import { useEventContext } from '../../context';


export const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1024 },
        items: 5,
        slidesToSlide: 2,
    },
    desktop: {
        breakpoint: { max: 1024, min: 800 },
        items: 4,
    },
};

export const CarouselPhotoArea = () => {
    const { eventPhotos } = useEventContext();
    const navigatePhotoLink = (photoURL: string) => {
        window.open(photoURL, '_blank');
    };

    const photos = eventPhotos.map((item) => (
        <div
            className='img-item'
            key={item.photoId}
        >
            <img
                draggable={false}
                src={`${item.path}`}
                alt={item.path}
                onDoubleClick={() => navigatePhotoLink(item.path)}
            />
        </div>
    ));

    return (
        <div className='img-field'>
            <h2>Etkinlik Görselleri</h2>
            <Carousel responsive={responsive}>
                {photos}
            </Carousel>
        </div>
    );
};
