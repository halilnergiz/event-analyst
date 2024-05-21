import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import { BarChart, DefaultizedPieValueType, PieChart, pieArcLabelClasses } from '@mui/x-charts';
import ErrorIcon from '@mui/icons-material/Error';

import { UploadPhotos } from '../UploadPhotos/UploadPhotos';
import { IEvent } from '../../../types';


export const EventAnalyses = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState<IEvent>();

    useEffect(() => {
        console.log(eventId);
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
                !event ? (
                    <div className='not-found'>
                        <ErrorIcon />
                        <h3>
                            Etkinlik Bulunamadı
                        </h3>
                    </div>
                ) : (
                    <>
                        <h1 className='event-name'> {event.title} </h1>
                        <div className="upper-area">
                            <div className='chart gender'>
                                <h3>Cinsiyet Analizi</h3>
                                <PieChart
                                    series={[
                                        {
                                            data: participantGenders,
                                            innerRadius: 64,
                                            outerRadius: 126,
                                            paddingAngle: 2,
                                            cornerRadius: 5,
                                            startAngle: 0,
                                            endAngle: 360,
                                            cx: 150,
                                            cy: 150,
                                            faded: { innerRadius: 30, additionalRadius: -30 },
                                            highlightScope: { faded: 'global', highlighted: 'item' },
                                            arcLabel: getArcLabel,
                                        }
                                    ]}
                                    sx={{
                                        [`& .${pieArcLabelClasses.root}`]: {
                                            fill: 'white',
                                            fontSize: 14,
                                        },
                                    }}
                                    colors={['#f0c1c0', '#97d6f4']}
                                    width={550}
                                    height={300}
                                />
                            </div>

                            <div className='chart race'>
                                <h3>Irk Analizi</h3>
                                <PieChart
                                    series={[
                                        {
                                            data: participantRaces,
                                            innerRadius: 64,
                                            outerRadius: 126,
                                            paddingAngle: 2,
                                            cornerRadius: 5,
                                            startAngle: 0,
                                            endAngle: 360,
                                            cx: 150,
                                            cy: 150,
                                            faded: { innerRadius: 30, additionalRadius: -30 },
                                            highlightScope: { faded: 'global', highlighted: 'item' },
                                            arcLabel: getArcLabel2,
                                        }
                                    ]}
                                    sx={{
                                        [`& .${pieArcLabelClasses.root}`]: {
                                            fill: 'white',
                                            fontSize: 14,
                                        },
                                    }}
                                    width={550}
                                    height={300}
                                />
                            </div>
                        </div>


                        <div className="lower-area">
                            <div className="chart age">
                                <h3>Yaş Analizi</h3>
                                <BarChart
                                    xAxis={[
                                        {
                                            scaleType: 'band',
                                            data: [
                                                '18 Yaş Altı',
                                                '18-25 Yaş',
                                                '26-35 Yaş',
                                                '36-45 Yaş',
                                                '46-60 Yaş',
                                                '60 Yaş Üzeri'
                                            ],
                                            label: 'Yaş Aralığı',
                                        },
                                    ]}
                                    series={[
                                        {
                                            data: [23, 42, 32, 1, 47, 4],
                                        },
                                    ]}
                                    width={600}
                                    height={300}
                                />
                            </div>
                            <div className="age-infs">
                                <div className="infs">
                                    <div className="inf-box id-0" />
                                    <span>
                                        18 Yaş Altı: {participantAges[0]} Kişi
                                    </span>
                                </div>
                                <div className="infs">
                                    <div className="inf-box id-1" />
                                    <span>
                                        18-25 Yaş: {participantAges[1]} Kişi
                                    </span>
                                </div>
                                <div className="infs">
                                    <div className="inf-box id-2" />
                                    <span>
                                        26-35 Yaş: {participantAges[2]} Kişi
                                    </span>
                                </div>
                                <div className="infs">
                                    <div className="inf-box id-3" />
                                    <span>
                                        36-45 Yaş: {participantAges[3]} Kişi
                                    </span>
                                </div>
                                <div className="infs">
                                    <div className="inf-box id-4" />
                                    <span>
                                        46-60 Yaş: {participantAges[4]} Kişi
                                    </span>
                                </div>
                                <div className="infs">
                                    <div className="inf-box id-5" />
                                    <span>
                                        60 Yaş Üzeri: {participantAges[5]} Kişi
                                    </span>
                                </div>

                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
};