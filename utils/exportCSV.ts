import { Alert } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

import moment from 'moment';

 export const shareFile = async (items: any[]) => {
    try {
    const header = 'Name,Duration,Date\n';
    const csvRows = items.map((item) => `${item.activityType},${item.timer},${moment(new Date(item.date).toISOString()).format().split("T")[0]}`);
    const csvString = header + csvRows.join('\n');
    const filename = FileSystem.documentDirectory + 'data.csv';

    await FileSystem.writeAsStringAsync(filename, csvString, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    await Sharing.shareAsync(filename);
  } catch (error) {
    Alert.alert('Error', 'Failed to share file.');
  }
};