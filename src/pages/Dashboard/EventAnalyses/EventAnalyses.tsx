import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { BarChart, DefaultizedPieValueType, PieChart, pieArcLabelClasses } from '@mui/x-charts';
import ErrorIcon from '@mui/icons-material/Error';

import { UploadPhotos } from '../UploadPhotos/UploadPhotos';
import { IEventPerson, IEvents } from '../../../types';

interface IRaceCounts {
    [key: string]: number;
}

export const EventAnalyses = () => {
    // const navigate = useNavigate();
    // const { eventId } = useParams();
    const [eventCheck, setEventCheck] = useState<Boolean>(false);
    // const [eventPersonCheck, setEventPersonCheck] = useState<Boolean>(false);

    // const [eventName, setEventName] = useState<string>('');
    // const [femaleCount, setFemaleCount] = useState<number>(0);
    // const [maleCount, setMaleCount] = useState<number>(0);
    // const [raceVariety, setRaceVariety] = useState<IRaceCounts>();
    // const [participantAges, setParticipantAges] = useState<number[]>([]);

    //     const getParticipantData = (data: IEvents[]) => {
    //         let female = 0;
    //         let male = 0;
    //         const races: string[] = [];
    //         const ages = {
    //             '18 Yaş altı': 0,
    //             '18-25 Yaş': 0,
    //             '26-35 Yaş': 0,
    //             '36-45 Yaş': 0,
    //             '46-60 Yaş': 0,
    //             '60 Yaş üzeri': 0,
    //         };
    // 
    //         data[0].persons.forEach((person: IEventPerson) => {
    // 
    //             person.gender === 'Female' ? female += 1 : male += 1;
    // 
    //             races.push(person.race);
    // 
    //             switch (true) {
    //                 case (person.age < 18):
    //                     ages['18 Yaş altı'] = ages['18 Yaş altı'] + 1; break;
    //                 case (person.age > 18 && person.age <= 25):
    //                     ages['18-25 Yaş'] = ages['18-25 Yaş'] + 1; break;
    //                 case (person.age > 25 && person.age <= 35):
    //                     ages['26-35 Yaş'] = ages['26-35 Yaş'] + 1; break;
    //                 case (person.age > 35 && person.age <= 46):
    //                     ages['36-45 Yaş'] = ages['36-45 Yaş'] + 1; break;
    //                 case (person.age > 46 && person.age <= 60):
    //                     ages['46-60 Yaş'] = ages['46-60 Yaş'] + 1; break;
    //                 case (person.age > 60):
    //                     ages['60 Yaş üzeri'] = ages['60 Yaş üzeri'] + 1; break;
    //             }
    //         });
    // 
    //         setFemaleCount(female);
    //         setMaleCount(male);
    // 
    //         const raceObj: IRaceCounts = {};
    //         races.forEach((element: string) => {
    //             raceObj[element] = (raceObj[element] || 0) + 1;
    //         });
    // 
    //         setRaceVariety(raceObj);
    // 
    //         setParticipantAges(Object.values(ages));
    //     };

    // useEffect(() => {
    //     const checkEvent = async () => {
    //         try {
    //             const res = await axios.get(`event_detail/${eventId}/`);
    //             const { data } = res;
    //             setEventCheck(true);
    //             setEventName(data.title);
    //             console.log(res);
    // if (data[0].persons.length) {
    // setEventPersonCheck(true);
    // getParticipantData(data as IEvents[]);
    // } else {
    // setEventPersonCheck(false);
    // alert('Etkinlik Fotoğraflarını Yükleyiniz');
    // navigate(`/dashboard/event-detail/${eventId}/upload-photos`);  
    // }
    //         } catch (err) {
    //             setEventCheck(false);
    //             console.log(err);
    //         }
    //     };
    //     checkEvent();
    // }, [eventCheck, eventId]);

    // chart data

    //     const participantRaces = () => {
    //         const keys = Object.keys(raceVariety || {});
    //         const values = Object.values(raceVariety || {});
    //         const data = [];
    // 
    //         for (let i = 0; i < keys.length; i++) {
    //             data.push({
    //                 id: i,
    //                 value: values[i],
    //                 label: keys[i]
    //             });
    //         }
    //         return data;
    //     };

    // TEMPORARY DUMMY DATA
    const participantGenders = [
        { id: 0, value: 6, label: 'Kadın Katılımcı' },
        { id: 1, value: 15, label: 'Erkek Katılımcı' },
    ];

    const TOTAL = participantGenders?.map((item) => item.value).reduce((a, b) => a + b, 0);
    const getArcLabel = (params: DefaultizedPieValueType) => {
        const percent = params.value / TOTAL;
        return `${(percent * 100).toFixed(1)}%`;
    };


    const participantRaces = [
        { id: 0, value: 8, label: 'Caucasian' },
        { id: 1, value: 4, label: 'African American' },
        { id: 2, value: 2, label: 'Asian' },
        { id: 3, value: 7, label: 'Hispanic' },
    ];
    const TOTAL2 = participantRaces?.map((item) => item.value).reduce((a, b) => a + b, 0);
    const getArcLabel2 = (params: DefaultizedPieValueType) => {
        const percent = params.value / TOTAL2;
        return `${(percent * 100).toFixed(1)}%`;
    };

    const participantAges = [23, 42, 32, 1, 47, 4];

    return (
        <>
            {
                !!eventCheck ? (
                    <div className='not-found'>
                        <ErrorIcon />
                        <h3>
                            Etkinlik Bulunamadı
                        </h3>
                    </div>
                ) : (
                    <>
                        <h1 className='event-name'> {"{eventName}"} </h1>
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