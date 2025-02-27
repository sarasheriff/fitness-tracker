import moment from "moment";

export const sumCalculation = (arr: any[], item: string) => {
  const total = arr.reduce((acc, currentValue) => {
    return acc + currentValue[item];
  }, 0);

  return total;
};

export const sumDuration = (durations: any[]) => {
  const durationsMapped = durations.map((item) => item.timer);
  const totalDurations = durationsMapped
    .slice(1)
    .reduce(
      (prev, cur) => moment.duration(cur).add(prev),
      moment.duration(durationsMapped[0])
    );
  let result = moment.utc(totalDurations.asMilliseconds()).format("HH:mm:ss");
  return result
  let splitTime = result.split(":");
  let hours = splitTime[0];
  let minutes = splitTime[1];
  let seconds = splitTime[2];
  if (+hours > 0 && +minutes > 0 && +seconds > 0) {
    return `${hours}h ${minutes}min ${seconds}sec`;
  } else if (+hours > 0 && +minutes > 0) {
    return `${hours}h ${minutes}min`;
  } else if (+hours > 0) {
    return `${hours}h`;
  } else if (+minutes > 0) {
    return `${minutes}min`;
  } else if (+seconds > 0) {
    return `${seconds}sec`;
  } else {
    return "0min";
  }
};
