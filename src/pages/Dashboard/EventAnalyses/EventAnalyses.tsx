import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import { Dayjs } from 'dayjs';

import { DefaultizedPieValueType } from '@mui/x-charts';

import { CarousePhotoArea, MuiBarChart, MuiBarChartDataInfo, MuiPieChart } from '../../../components';
import { useEventContext } from '../../../context';
import { customDateFormat } from '../../../schemas';


export const EventAnalyses = () => {
    const { eventInformations, setEventInformations,  eventPhotos, setEventPhotos  } = useEventContext();
    const { eventId } = useParams();

    useEffect(() => {
        const getEventAnalyses = async () => {
            try {
                const res = await axios.get(`event_detail/${eventId}/`);
                console.log(res.data);
                setEventInformations(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getEventAnalyses();
    }, []);

    // TODO: this context's logic usage should be proper for getting photos. Don't  
    useEffect(() => {
        const isPhotoExist = async () => {
            try {
                const res = await axios.get(`events/${eventId}/photos/`);
                setEventPhotos(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        isPhotoExist();
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

    const participantAges = [23, 42, 32, 12, 47, 4];

    const checkInformationContent = (data: Date | Dayjs | string | undefined) => {
        if (data instanceof Date) {
            data ? data = customDateFormat(data).toString() : data = '-';
            console.log(data);
            return data;
        }
        console.log(data);
        return data ? data.toString() : '-';
    };

    return (
        <div className='event-container'>
            <h1 className='event-name'>
                {eventInformations?.title}
            </h1>
            <div className='event-base-informations'>
                <div className='event-action-content'>
                    <div className='description'>
                        <b className='info-title'>
                            Açıklama:
                        </b>
                        <span>
                            {checkInformationContent(eventInformations?.description)}
                        </span>
                    </div>
                    <div className='address'>
                        <b className='info-title'>
                            Adres:
                        </b>
                        <span>
                            {checkInformationContent(eventInformations?.address)}
                        </span>
                    </div>
                    <div className='dates'>
                        <b className='info-title'>
                            Başlangıç Tarihi:
                        </b>
                        <span className='start-date'>
                            {
                                eventInformations?.start_date ?
                                    checkInformationContent(new Date((eventInformations?.start_date!).toString()))
                                    : '-'
                            }
                        </span>
                    </div>
                    <div className='dates'>
                        <b className='info-title'>
                            Bitiş Tarihi:
                        </b>
                        <span className='end-date'>
                            {
                                eventInformations?.end_date ?
                                    checkInformationContent(new Date((eventInformations?.end_date!).toString()))
                                    : '-'
                            }
                        </span>
                    </div>
                </div>
                <div className='user-action-content'>
                    <div className='created-at'>
                        <b className='info-title'>
                            Oluşturulma Tarihi:
                        </b>
                        <span>
                            {checkInformationContent(new Date(eventInformations?.createdAt!))}
                        </span>
                    </div>
                    <div className='updated-at'>
                        <b className='info-title'>
                            Son Güncellenme Tarihi:
                        </b>
                        <span>
                            {checkInformationContent(new Date(eventInformations?.updatedAt!))}
                        </span>
                    </div>
                </div>
            </div>
            <div className='pie-chart-area'>
                <div className='chart gender'>
                    <h2>
                        Cinsiyet Analizi
                    </h2>
                    <MuiPieChart
                        participiants={participantGenders}
                        arcLabel={getArcLabel}
                        colors={['#f8268f', '#1063a7']}
                        width={550}
                        height={300}
                    />
                </div>

                <div className='chart race'>
                    <h2>
                        Irk Analizi
                    </h2>
                    <MuiPieChart
                        participiants={participantRaces}
                        arcLabel={getArcLabel2}
                        width={550}
                        height={300}
                    />
                </div>
            </div>

            <div className='bar-chart-area'>
                <h2>
                    Yaş Analizi
                </h2>
                <div className='content'>
                    <div className='chart age'>
                        <MuiBarChart
                            chartName='Yaş Aralığı'
                            xAxisLabels={[
                                '18 Yaş Altı',
                                '18-25 Yaş',
                                '26-35 Yaş',
                                '36-45 Yaş',
                                '46-60 Yaş',
                                '60 Yaş Üzeri'
                            ]}
                            seriesData={participantAges}
                            width={600}
                            height={300} />
                    </div>
                    <MuiBarChartDataInfo
                        participiants={participantAges}
                    />
                </div>
            </div>
            <CarousePhotoArea />
        </div>
    );
};