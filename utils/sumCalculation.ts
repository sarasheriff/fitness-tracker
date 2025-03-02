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
};
