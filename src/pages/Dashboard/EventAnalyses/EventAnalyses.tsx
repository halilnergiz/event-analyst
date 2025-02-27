import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import { DefaultizedPieValueType } from '@mui/x-charts';

import {
  CarouselPhotoArea,
  Dropzone,
  Map,
  MuiBarChart,
  MuiBarChartDataInfo,
  MuiPieChart,
} from '../../../components';
import { useEventContext } from '../../../context';
import { checkInformationContentSystem, checkInformationContentUser } from '../../../schemas';

export const EventAnalyses = () => {
  const { eventInformations, eventPhotos, setEventInformations, setEventPhotos } =
    useEventContext();
  const { eventId } = useParams();

  useEffect(() => {
    const getEventData = async () => {
      try {
        const [eventDetails, eventPhotos] = await Promise.all([
          axios.get(`event_detail/${eventId}/`),
          axios.get(`events/${eventId}/photos/`),
        ]);

        setEventInformations(eventDetails.data);
        setEventPhotos(eventPhotos.data);
      } catch (err) {
        console.log(err);
      }
    };
    getEventData();
  }, [eventId]);

  // TEMPORARY DUMMY DATA
  const participantGenders = [
    { id: 0, value: 6, label: 'Kadın Katılımcı' },
    { id: 1, value: 15, label: 'Erkek Katılımcı' },
  ];

  const TotalGender = participantGenders?.map(item => item.value).reduce((a, b) => a + b, 0);

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

  const TotalRace = participantRaces?.map(item => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel2 = (params: DefaultizedPieValueType) => {
    const percent = params.value / TotalRace;
    return `${(percent * 100).toFixed(1)}%`;
  };

  const participantAges = [23, 42, 32, 12, 47, 4];

  return (
    <div className='event-container'>
      <h1 className='event-name'>{eventInformations?.title}</h1>
      <div className='event-base-informations'>
        <div className='event-action-content'>
          <div className='description'>
            <b className='info-title'>Açıklama:</b>
            <span>{checkInformationContentUser(eventInformations?.description)}</span>
          </div>
          <div className='address'>
            <b className='info-title'>Adres:</b>
            <span>{checkInformationContentUser(eventInformations?.address)}</span>
          </div>
          <div className='dates'>
            <b className='info-title'>Başlangıç Tarihi:</b>
            <span className='start-date'>
              {eventInformations?.start_date
                ? checkInformationContentUser(new Date(eventInformations?.start_date!.toString()))
                : '-'}
            </span>
          </div>
          <div className='dates'>
            <b className='info-title'>Bitiş Tarihi:</b>
            <span className='end-date'>
              {eventInformations?.end_date
                ? checkInformationContentUser(new Date(eventInformations?.end_date!.toString()))
                : '-'}
            </span>
          </div>
        </div>
        <div className='user-action-content'>
          <div className='created-at'>
            <b className='info-title'>Oluşturulma Tarihi:</b>
            <span>{checkInformationContentSystem(new Date(eventInformations?.createdAt!))}</span>
          </div>
          <div className='updated-at'>
            <b className='info-title'>Son Güncellenme Tarihi:</b>
            <span>{checkInformationContentSystem(new Date(eventInformations?.updatedAt!))}</span>
          </div>
        </div>
      </div>
      {!!eventPhotos.length ? (
        <>
          <div className='pie-chart-area'>
            <div className='chart gender'>
              <h2>Cinsiyet Analizi</h2>
              <MuiPieChart
                participiants={participantGenders}
                arcLabel={getArcLabel}
                colors={['#f8268f', '#1063a7']}
                width={550}
                height={300}
              />
            </div>

            <div className='chart race'>
              <h2>Irk Analizi</h2>
              <MuiPieChart
                participiants={participantRaces}
                arcLabel={getArcLabel2}
                width={550}
                height={300}
              />
            </div>
          </div>

          <div className='bar-chart-area'>
            <h2>Yaş Analizi</h2>
            <div className='content'>
              <div className='chart age'>
                <MuiBarChart
                  xAxisLabels={[
                    '18 Yaş Altı',
                    '18-25 Yaş',
                    '26-35 Yaş',
                    '36-45 Yaş',
                    '46-60 Yaş',
                    '60 Yaş Üzeri',
                  ]}
                  seriesData={participantAges}
                  width={600}
                  height={300}
                />
              </div>
              <MuiBarChartDataInfo participiants={participantAges} />
            </div>
          </div>
          <CarouselPhotoArea />
        </>
      ) : (
        <Dropzone />
      )}
      {!!Number(eventInformations?.latitude) && (
        <Map
          eventLatitude={eventInformations?.latitude}
          eventLongitude={eventInformations?.longitude}
        />
      )}
    </div>
  );
};
