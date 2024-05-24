const custom_months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const custom_days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

export const customDateFormat = (date: Date): string => {
    const today = new Date();
    const getDate = `${date.getDate()} ${custom_months[date.getMonth()]} ${custom_days[date.getDay()]}`;
    const time = `${today.getHours()}:${today.getMinutes()}`;
    return `${getDate} ${time}`;
};
