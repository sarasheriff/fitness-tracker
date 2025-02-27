import * as Notifications from "expo-notifications";

export const useLocaleNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: false,
    }),
  });

  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Failed to get push token for push notification!");
    }
  };

  const scheduleDailyReminder = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Daily Reminder",
        body: "Don't miss your daily activity!",
        sound: true,
      },
      trigger: {
        hour: 10,
        minute: 0,
        repeats: true,
      },
    });
  };

  return {
    scheduleDailyReminder,
    requestPermissions,
  };
};
