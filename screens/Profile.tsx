import { useEffect, useState } from "react";
import {
  Button,
  Image,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import IconButton from "../components/UI/IconButton";
import { Colors } from "../constants/colors";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";

const initializeDB = async (db) => {
  try {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS userTable (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, imageUri TEXT);     
        `);
  } catch (error) {}
};

export default function Profile() {
  return (
    <SQLiteProvider databaseName="fitness-data.db" onInit={initializeDB}>
      <PickImagee />
    </SQLiteProvider>
  );
}

export function PickImagee() {
  const [image, setImage] = useState<string | null>(null);
  const db = useSQLiteContext();

  async function fetchNotes() {
    const result = await db.getAllAsync("SELECT * FROM userTable");
    if (!!result.length) {
      setImage(result[0]["imageUri"]);
    }
  }


  useEffect(() => {
    fetchNotes();
  }, []);

  const updateImage = async (img) => {
    const USER_ID = 1;
    const result = await db.runAsync(
      "UPDATE userTable SET imageUri = ? WHERE id = ?",
      [img, USER_ID]
    );
    setImage(img);
  };

  const addImage = async (img) => {
    await db.runAsync("INSERT INTO userTable (imageUri) values (?)", [img]);
    Alert.alert("Image Added");
    setImage(img);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const imgUri = result?.assets[0]?.uri;

    if (!result.canceled) {
      !!image ? updateImage(imgUri) : addImage(imgUri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
      <Pressable onPress={pickImage}>
        <View style={styles.userImg}>
          {!image ? (
            <IconButton name="person" size={100} color={Colors.primary800} />
          ) : (
            <Image
              source={{ uri: image }}
              style={[styles.image, styles.userImg]}
            />
          )}
        </View>
        
          <View style={styles.cameraIcon}>
            <IconButton name="camera" size={20} color={Colors.white} />
          </View>
        </Pressable>
      </View>
      <View>
        <Text style={styles.userNameText}>Sara Sherif</Text>
      </View>
      <View style={styles.emailUser}>
        <IconButton name="mail" size={20} color={Colors.purpel700} />
        <Text style={styles.emailText}>user@email.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  wrapper: {},
  image: {
    width: 200,
    height: 200,
  },
  userImg: {
    width: 200,
    height: 200,
    backgroundColor: Colors.primary400,
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.white,
    shadowColor: "#39324a",
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    position: "relative",
    flexDirection:"row"
  },
  cameraIcon: {
    position: "absolute",
    pointerEvents: "auto",
    zIndex: 2,
    bottom: 0,
    right: 30,
    width: 40,
    height: 40,
    backgroundColor: Colors.primary700,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
    borderWidth: 2,
    borderColor: "white",
  },
  userNameText: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 15,
  },
  emailUser: {
    flexDirection: "row",
    padding: 8,
  },
  emailText: {
    fontSize: 18,
    color: Colors.accent500,
    paddingLeft: 5,
  },
});
