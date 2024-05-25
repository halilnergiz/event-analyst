import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import { DefaultizedPieValueType } from '@mui/x-charts';

import { useEventContext } from '../../../context';
import { MuiBarChart, MuiBarChartDataInfo, MuiPieChart } from '../../../components';
import { customDateFormat } from '../../../schemas';


export const EventAnalyses = () => {
    const { eventInformations, setEventInformations, eventPhotos } = useEventContext();
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

    const checkInformationContent = (data: string | Date | undefined) => {
        if (data instanceof Date) {
            return data ? customDateFormat(data) : '-';
        }
        console.log('not date');
        return data ? data : '-';
    };

    return (
        <div className='event-container'>
            <h1 className='event-name'> {eventInformations?.title} </h1>
            <div className='event-base-informations'>
                <div className='event-action-content'>
                    <div className='description'>
                        <b className='info-title'>Açıklama:</b>
                        <span>
                            {checkInformationContent(eventInformations?.description)}
                        </span>
                    </div>
                    <div className='address'>
                        <b className='info-title'>Adres:</b>
                        <span>
                            {checkInformationContent(eventInformations?.address)}
                        </span>
                    </div>
                    <div className='dates'>
                        <b className='info-title'>Başlangıç Tarihi:</b>
                        <span className='start-date'>
                            {checkInformationContent(new Date(eventInformations?.start_date!))}
                        </span>
                    </div>
                    <div className='dates'>
                        <b className='info-title'>Bitiş Tarihi:</b>
                        <span className='end-date'>
                            {checkInformationContent(new Date(eventInformations?.end_date!))}
                        </span>
                    </div>
                </div>
                <div className='user-action-content'>
                    <div className='created-at'>
                        <b className='info-title'>Oluşturulma Tarihi:</b>
                        <span>
                            {checkInformationContent(new Date(eventInformations?.createdAt!))}
                        </span>
                    </div>
                    <div className='updated-at'>
                        <b className='info-title'>Son Güncellenme Tarihi:</b>
                        <span>
                            {checkInformationContent(new Date(eventInformations?.updatedAt!))}
                        </span>
                    </div>
                </div>
            </div>
            <div className='pie-chart-area'>
                <div className='chart gender'>
                    <h3>Cinsiyet Analizi</h3>
                    <MuiPieChart
                        participiants={participantGenders}
                        arcLabel={getArcLabel}
                        colors={['#f8268f', '#1063a7']}
                        width={550}
                        height={300}
                    />
                </div>

                <div className='chart race'>
                    <h3>Irk Analizi</h3>
                    <MuiPieChart
                        participiants={participantRaces}
                        arcLabel={getArcLabel2}
                        width={550}
                        height={300}
                    />
                </div>
            </div>

            <div className='bar-chart-area'>
                <h3 className='title'>Yaş Analizi</h3>
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
                    <MuiBarChartDataInfo participiants={participantAges} />
                </div>
            </div>
            <div className='img-field'>
                <h2>Etkinlik Görselleri</h2>
                <ul className='img-list' >
                    {eventPhotos.map((item) => {
                        console.log(item);
                        return (
                            <li className='img-item' key={item.photoId}>
                                <img
                                    src={`${item.path}`}
                                    alt={item.path}
                                    loading="lazy"
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};