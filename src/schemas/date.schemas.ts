const custom_months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const custom_days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

export const customDateFormat = (date: any) => {
    const getDate = `${date.getDate()} ${custom_months[date.getMonth()]} ${date.getFullYear()} ${custom_days[date.getDay()]}`;
    const time = `${date.getHours()}:${date.getMinutes()}`;
    return date.getFullYear() === Number(1970) ? (date = '-') : (`${getDate} ${time}`);
};
