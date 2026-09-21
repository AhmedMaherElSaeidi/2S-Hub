import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {
  loadSalesOrder,
  confirmOrder,
} from "./SalesOrderDetails.service";
import styles from "./SalesOrderDetails.style";

export default function SalesOrderDetails({ route }) {
  const { orderId } = route.params;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const data = await loadSalesOrder(orderId);
      setOrder(data);
    } catch (err) {
      setError(err.message || "Unable to load sales order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const handleConfirm = async () => {
    try {
      setConfirming(true);
      setError("");

      const updated = await confirmOrder(orderId);
      setOrder(updated);
    } catch (err) {
      setError(err.message || "Unable to confirm order");
    } finally {
      setConfirming(false);
    }
  };

  if (loading) return <Loading />;

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorMessage message={error || "Order not found"} />
      </SafeAreaView>
    );
  }

  const canConfirm =
    order.status === "draft" || order.status === "quotation";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{order.order_number}</Text>

        <Text style={styles.label}>Customer</Text>
        <Text style={styles.value}>{order.customer}</Text>

        <Text style={styles.label}>Order Date</Text>
        <Text style={styles.value}>{order.order_date}</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>{order.status}</Text>

        <Text style={styles.label}>Total</Text>
        <Text style={styles.value}>{order.total}</Text>

        <Text style={styles.sectionTitle}>Products</Text>

        {(order.products || []).map((product) => (
          <View key={String(product.id || product.name)} style={styles.product}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productInfo}>
              {product.quantity} × {product.price}
            </Text>
          </View>
        ))}

        <ErrorMessage message={error} />

        {canConfirm ? (
          <Button
            title={confirming ? "Confirming..." : "Confirm Order"}
            onPress={handleConfirm}
            disabled={confirming}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}
