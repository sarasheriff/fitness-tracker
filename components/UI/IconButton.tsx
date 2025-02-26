import { Pressable, StyleSheet, View } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons";

const IconButton = ({name, color, size, onPress, isDisabled}: {name: any, color: string, size: number, onPress?: () => void, isDisabled?: boolean}) => {
    return (
        <Pressable onPress={onPress} disabled={isDisabled} style={({pressed}) => [pressed && styles.pressed, isDisabled && styles.disabled]}>
        <View>
            <Ionicons name={name} color={color} size={size}/>
        </View>
        </Pressable>
    )
}

export default IconButton;

const styles= StyleSheet.create({
    pressed: {
        opacity: 0.7,
    },
    disabled: {
        opacity: 0.4
    }
})