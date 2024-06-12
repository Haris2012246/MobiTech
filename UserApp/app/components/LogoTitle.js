import { Image } from "react-native";


function LogoTitle() {
  return (
    <Image
      style={{ width: 60, height: 60,}}
      source={require("../assets/mobitechLogo.png")}
    />
  );
}

export default LogoTitle;
