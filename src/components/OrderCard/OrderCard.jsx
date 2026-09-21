import React from "react";
import { Pressable, Text } from "react-native";
import styles from "./OrderCard.style";

export default function OrderCard({ order, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.orderNumber}>{order.order_number}</Text>
      <Text style={styles.info}>{order.customer}</Text>
      <Text style={styles.info}>{order.order_date}</Text>
      <Text style={styles.status}>{order.status}</Text>
    </Pressable>
  );
}
