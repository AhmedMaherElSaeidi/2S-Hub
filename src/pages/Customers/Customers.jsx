import React, { useCallback, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import CustomerCard from "../../components/CustomerCard/CustomerCard";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { loadCustomers } from "./Customers.service";
import styles from "./Customers.style";

export default function Customers({ navigation }) {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCustomers = async (value = "") => {
    try {
      setLoading(true);
      setError("");

      const data = await loadCustomers(value);
      setCustomers(data);
    } catch (err) {
      setError(err.message || "Unable to load customers");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCustomers(search);
    }, [search])
  );

  const handleSearch = (value) => {
    setSearch(value);
    fetchCustomers(value);
  };

  if (loading && customers.length === 0) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Customers</Text>

        <TextInput
          style={styles.search}
          value={search}
          onChangeText={handleSearch}
          placeholder="Search customer..."
        />

        <ErrorMessage message={error} />
      </View>

      <FlatList
        contentContainerStyle={styles.list}
        data={customers}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CustomerCard
            customer={item}
            onPress={() =>
              navigation.navigate("CustomerDetails", {
                customerId: item.id,
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No customers found.</Text>
        }
      />
    </SafeAreaView>
  );
}