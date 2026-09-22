import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 14,
    backgroundColor: "#ffffff",
    fontSize: 16,
  },
  inputWrapper: {
    justifyContent: "center",
  },
  inputWithIcon: {
    paddingRight: 44,
  },
  iconButton: {
    position: "absolute",
    right: 14,
    height: 48,
    justifyContent: "center",
  },
});