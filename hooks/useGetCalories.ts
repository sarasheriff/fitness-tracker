import { useEffect, useState } from "react";

import { activitiesCalMapper } from "../utils/activitiesMapper";
import { Activities } from "../shared/types/activity.type";

function useGetCalories() {
  const [steps, setSteps] = useState(0);
  const [activityType, setActivityType] = useState<Activities>();
  const [estimateCal, setEstimateCal] = useState(0);

  useEffect(() => {
    if (!activityType && !steps) return;
    setEstimateCal(steps * activitiesCalMapper[activityType as Activities]);
  }, [activityType, steps]);

  const activityTypeHandler = (activity: Activities) => {
    setActivityType(activity);
  };

  const stepsHandler = (insertedSteps: number) => {
    setSteps(insertedSteps);
  };

  return { estimateCal, activityTypeHandler, stepsHandler };
}

export default useGetCalories;
