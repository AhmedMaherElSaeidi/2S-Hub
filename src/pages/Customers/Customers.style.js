import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 14,
  },
  search: {
    height: 46,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 14,
    backgroundColor: "#ffffff",
  },
  list: {
    padding: 16,
    paddingTop: 0,
  },
  empty: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 30,
  },
});