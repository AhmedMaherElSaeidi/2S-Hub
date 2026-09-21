import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./CustomerCard.style";

export default function CustomerCard({ customer, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{customer.name}</Text>

      {customer.phone ? (
        <Text style={styles.info}>{customer.phone}</Text>
      ) : null}

      {customer.city ? (
        <Text style={styles.info}>{customer.city}</Text>
      ) : null}
    </Pressable>
  );
}
