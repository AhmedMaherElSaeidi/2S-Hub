import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SuccessMessage from "../../components/Successmessage/Successmessage";
import {
  loadCustomer,
  saveCustomerPhone,
} from "./CustomerDetails.service";
import styles from "./CustomerDetails.style";

export default function CustomerDetails({ route, navigation }) {
  const { customerId } = route.params;

  const [customer, setCustomer] = useState(null);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const goBackTimeout = useRef(null);

  useEffect(() => {
    return () => clearTimeout(goBackTimeout.current);
  }, []);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);
        const data = await loadCustomer(customerId);
        setCustomer(data);
        setPhone(data.phone || "");
      } catch (err) {
        setError(err.message || "Unable to load customer");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [customerId]);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const updated = await saveCustomerPhone(customerId, phone);
      setCustomer(updated);
      setSuccess("Phone number updated.");

      goBackTimeout.current = setTimeout(() => {
        navigation.goBack();
      }, 800);
    } catch (err) {
      setError(err.message || "Unable to update phone");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  if (!customer) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorMessage message={error || "Customer not found"} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>{customer.name}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{customer.email || "-"}</Text>

          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>
            {customer.street || "-"} {customer.city || ""}
          </Text>

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="Phone number"
          />

          <ErrorMessage message={error} />
          <SuccessMessage message={success} />

          <View style={styles.saveButton}>
            <Button
              title={saving ? "Saving..." : "Save Phone"}
              onPress={handleSave}
              disabled={saving}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
