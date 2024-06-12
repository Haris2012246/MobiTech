import colors from "../config/colors";
import { Platform } from "react-native";

export default {
  header: {
    backgroundColor: colors.primary,
    width: "100%",
    height: "10%",
    ...Platform.select({
      ios: {
        padding: 60,
      },
      android: {
        padding: 50,
      },
    }),
  },
};
