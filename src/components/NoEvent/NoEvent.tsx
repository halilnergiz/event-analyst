import { CreateEventPopUp } from '../Popup/CreateEventPopUp';

export const NoEvent = () => {
    return (
        <div className="no-event">
            <h2>
                Herhangi bir etkinlik oluşturmadınız, <br />
                Yeni bir etkinlik oluşturmak için tıklayınız
            </h2>
            <CreateEventPopUp />
        </div>
    );
};
