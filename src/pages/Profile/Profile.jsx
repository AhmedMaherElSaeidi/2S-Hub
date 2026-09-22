import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button/Button";
import { getCurrentUser, logout } from "../../controller/auth.controller";
import styles from "./Profile.style";

export default function Profile({ navigation }) {
  const user = getCurrentUser();
  const isInternal = user?.groups?.includes("base.group_user");

  const handleLogout = () => {
    logout();

    // Reset on the root navigator, not the tab navigator, so the whole
    // history is cleared and there's no way to swipe/back into a
    // protected screen after logging out.
    const rootNavigation = navigation.getParent() || navigation;
    rootNavigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.avatar}>
          <Text style={styles.avatarLetter}>
            {(user?.name || user?.username || "?").charAt(0).toUpperCase()}
          </Text>
        </View>

        <Text style={styles.name}>{user?.name || user?.username}</Text>
        <Text style={styles.username}>@{user?.username}</Text>
        <Text style={styles.role}>
          {isInternal ? "Internal User" : "Portal User"}
        </Text>

        <View style={styles.logoutButton}>
          <Button title="Log Out" onPress={handleLogout} />
        </View>
      </View>
    </SafeAreaView>
  );
}