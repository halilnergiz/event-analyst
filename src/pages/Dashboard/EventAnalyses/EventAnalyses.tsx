import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { DefaultizedPieValueType } from '@mui/x-charts';
import ErrorIcon from '@mui/icons-material/Error';

import { UploadPhotos } from '../UploadPhotos/UploadPhotos';
import { IEvent } from '../../../types';
import { MuiPieChart, MuiBarChart, MuiBarChartDataInfo } from '../../../components';


export const EventAnalyses = () => {
    const { eventId } = useParams();

    const [event, setEvent] = useState<IEvent>();
    const [photo, setPhoto] = useState();

    useEffect(() => {
        const getEventAnalyses = async () => {
            const res = await axios.get(`event_detail/${eventId}/`);
            console.log(res.data);
            setEvent(res.data);
        };
        getEventAnalyses();
    }, []);

    // TEMPORARY DUMMY DATA
    const participantGenders = [
        { id: 0, value: 6, label: 'Kadın Katılımcı' },
        { id: 1, value: 15, label: 'Erkek Katılımcı' },
    ];

    const TotalGender = participantGenders?.map((item) => item.value).reduce((a, b) => a + b, 0);

    const getArcLabel = (params: DefaultizedPieValueType) => {
        const percent = params.value / TotalGender;
        return `${(percent * 100).toFixed(1)}%`;
    };


    const participantRaces = [
        { id: 0, value: 8, label: 'Caucasian' },
        { id: 1, value: 4, label: 'African American' },
        { id: 2, value: 2, label: 'Asian' },
        { id: 3, value: 7, label: 'Hispanic' },
    ];

    const TotalRace = participantRaces?.map((item) => item.value).reduce((a, b) => a + b, 0);

    const getArcLabel2 = (params: DefaultizedPieValueType) => {
        const percent = params.value / TotalRace;
        return `${(percent * 100).toFixed(1)}%`;
    };

    const participantAges = [23, 42, 32, 1, 47, 4];

    return (
        <>
            {
                !photo ? (
                    <>
                        <UploadPhotos />
                    </>
                ) : (
                    <>
                        <h1 className='event-name'> {event?.title} </h1>
                        <div className="upper-area">
                            <div className='chart gender'>
                                <h3>Cinsiyet Analizi</h3>
                                <MuiPieChart participiants={participantGenders} arcLabel={getArcLabel} colors={['#f0c1c0', '#97d6f4']} width={550} height={300} />
                            </div>

                            <div className='chart race'>
                                <h3>Irk Analizi</h3>
                                <MuiPieChart participiants={participantRaces} arcLabel={getArcLabel2} width={550} height={300} />
                            </div>
                        </div>

                        <div className="lower-area">
                            <div className="chart age">
                                <h3>Yaş Analizi</h3>
                                <MuiBarChart chartName='Yaş Aralığı' xAxisLabels={[
                                    '18 Yaş Altı',
                                    '18-25 Yaş',
                                    '26-35 Yaş',
                                    '36-45 Yaş',
                                    '46-60 Yaş',
                                    '60 Yaş Üzeri'
                                ]} seriesData={participantAges} width={600} height={300} />
                            </div>
                            <MuiBarChartDataInfo participiants={participantAges} />
                        </div>
                    </>
                )
            }
        </>
    );
};