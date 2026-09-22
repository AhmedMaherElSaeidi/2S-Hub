import React from "react";
import { Text } from "react-native";
import styles from "./Successmessage.style";

export default function SuccessMessage({ message }) {
    if (!message) return null;

    return <Text style={styles.success}>{message}</Text>;
}