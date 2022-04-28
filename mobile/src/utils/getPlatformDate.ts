import { addDays } from 'date-fns';
import { Platform } from 'react-native';

export function getPlatformDate(date: Date){
  if(Platform.OS === 'ios' || 'android'){
    return addDays(date, 1);
  }else{
    return date;
  }
}