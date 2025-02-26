import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';
 export const shareFile = async (items: any[]) => {
    try {
    const header = 'Name,Duration,Date\n';
    const csvRows = items.map((item) => `${item.name},${item.duration},${item.date}`);
    const csvString = header + csvRows.join('\n');
    const filename = FileSystem.documentDirectory + 'data.csv';

    await FileSystem.writeAsStringAsync(filename, csvString, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    await Sharing.shareAsync(filename);
  } catch (error) {
    console.error('Error sharing file:', error);
    Alert.alert('Error', 'Failed to share file.');
  }
};