import { useEffect, useState } from "react";

function useTimeFormat() {
  const [timeFormatting, setTimeFormatting] = useState("");
  const [recievedTime, setRecievedTime] = useState("");
  let splitTime = recievedTime.split(":");
  let hours = splitTime[0];
  let minutes = splitTime[1];
  let seconds = splitTime[2];
  useEffect(() => {
    const formatting = () => {
      if (!recievedTime) return;
      if (+hours > 0 && +minutes > 0 && +seconds > 0) {
        setTimeFormatting(`${hours}h ${minutes}min ${seconds}sec`);
      } else if (+hours > 0 && +minutes > 0) {
        setTimeFormatting(`${hours}h ${minutes}min`);
      } else if (+hours > 0) {
        setTimeFormatting(`${hours}h`);
      } else if (+minutes > 0) {
        setTimeFormatting(`${minutes}min`);
      } else if (+seconds > 0) {
        setTimeFormatting(`${seconds}sec`);
      } else {
        setTimeFormatting("0min");
      }
    };
    formatting();
  }, [recievedTime]);

  const timeHandler = (data: string) => {
    setRecievedTime(data);
  };

  return { timeFormatting, timeHandler };
}

export default useTimeFormat;
