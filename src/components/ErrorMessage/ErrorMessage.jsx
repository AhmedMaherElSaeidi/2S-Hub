import React from "react";
import { Text } from "react-native";
import styles from "./ErrorMessage.style";

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return <Text style={styles.error}>{message}</Text>;
}
