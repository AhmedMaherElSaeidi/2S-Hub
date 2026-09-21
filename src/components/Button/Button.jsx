import React from "react";
import { Pressable, Text } from "react-native";
import styles from "./Button.style";

export default function Button({ title, onPress, disabled = false }) {
  return (
    <Pressable
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
