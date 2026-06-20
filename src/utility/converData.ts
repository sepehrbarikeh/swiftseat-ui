import moment from 'jalali-moment';

export const FormatPersianDateTime = (date: string) => {
  const m = moment(date);

  return {
    date: m.locale('fa').format('YYYY/MM/DD'),
    time: m.format('HH:mm:ss'),
  };
};