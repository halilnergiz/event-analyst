import { Dayjs } from 'dayjs';

const custom_months = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
];
const custom_days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

export const customDateFormatSystem = (date: any) => {
  const getDate = `${date.getDate()} ${custom_months[date.getMonth()]} ${date.getFullYear()} ${
    custom_days[date.getDay()]
  }`;
  const time = `${date.getHours()}:${date.getMinutes()}`;
  return date.getFullYear() === Number(1970) ? (date = '-') : `${getDate} ${time}`;
};

const customDateFormatUser = (date: any) => {
  const getDate = `${date.getDate()} ${custom_months[date.getMonth()]} ${date.getFullYear()} ${
    custom_days[date.getDay()]
  }`;
  return date.getFullYear() === Number(1970) ? (date = '-') : `${getDate}`;
};

export const checkInformationContentSystem = (data: Date | Dayjs | string | undefined) => {
  if (data instanceof Date) {
    data ? (data = customDateFormatSystem(data).toString()) : (data = '-');
    console.log(data);
    return data;
  }
  console.log(data);
  return data ? data.toString() : '-';
};

export const checkInformationContentUser = (data: Date | Dayjs | string | undefined) => {
  if (data instanceof Date) {
    data ? (data = customDateFormatUser(data).toString()) : (data = '-');
    console.log(data);
    return data;
  }
  console.log(data);
  return data ? data.toString() : '-';
};
