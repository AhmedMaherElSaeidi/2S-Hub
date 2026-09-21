import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderCard from "../../components/OrderCard/OrderCard";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { loadSalesOrders } from "./SalesOrders.service";
import styles from "./SalesOrders.style";

export default function SalesOrders({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await loadSalesOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message || "Unable to load sales orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <SafeAreaView style={styles.container}>
      <ErrorMessage message={error} />

      <FlatList
        contentContainerStyle={styles.list}
        data={orders}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onPress={() =>
              navigation.navigate("SalesOrderDetails", {
                orderId: item.id,
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No sales orders found.</Text>
        }
      />
    </SafeAreaView>
  );
}
