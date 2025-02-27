import { Activities } from "../shared/interfacse";

export const mostRecent = (data: Activities[]) => {
  const today = new Date();
  const recentData = data.filter((item) => {
    const itemDate = new Date(item.date);
    const timeDifference = today - itemDate;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    return daysDifference <= 7; 
  });

  return recentData
};
