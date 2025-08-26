import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function (date: Date | string) {
  return format(date, 'dd MMMM yyyy', { locale: ru });
}
