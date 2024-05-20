import { useNavigate } from 'react-router-dom';

import { AspectRatio, Button, Card, CardContent, Typography } from '@mui/joy';

interface IEventCard {
    eventId: string,
    title: string,
    createdAt: string | number,
}

export const EventCard = ({ eventId, title, createdAt }: IEventCard) => {
    const navigate = useNavigate(); 
    const routeDetails = () => {
        navigate(`/dashboard/events/${eventId}`)
    };

    return (
        <Card sx={{ width: 320, justifyContent:'space-between' }}>
            <AspectRatio minHeight="120px" maxHeight="200px">
                <img
                    src="/images/card-bg.jpg"
                    loading="lazy"
                    alt=""
                    height={0}
                />
            </AspectRatio>
            <div>
                <Typography level="title-lg"> {title} </Typography>
                <Typography level="body-sm"> {createdAt}</Typography>
            </div>
            <CardContent orientation="horizontal">
                <Button
                    variant="solid"
                    size="sm"
                    color="primary"
                    fullWidth
                    style={{height:'3rem', position:'relative', bottom:'0'}}
                    onClick={routeDetails}
                >
                    İçeriğe Git
                </Button>
            </CardContent>
        </Card>
    );
};
