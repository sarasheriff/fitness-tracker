import moment from 'moment'

export const calculateTimePeriod = (insertDate) => {
  const now = moment();
  const date = moment(insertDate);

  if (date.isSame(now, 'day')) {
    return 'Today';
  } else if (date.isSame(now.clone().subtract(1, 'days'), 'day')) {
    return 'Yesterday';
  } else if (date.isSame(now, 'week')) {
      return 'This Week';
  } else if (date.isSame(now.clone().subtract(1, 'weeks'), 'week')){
      return "Last Week";
  } else if(date.isSame(now, 'month')){
      return "This Month";
  } else if (date.isSame(now.clone().subtract(1, 'months'), 'month')){
      return "Last Month";
  } else {
    return date.format('MMMM Do, YYYY');
  }
}