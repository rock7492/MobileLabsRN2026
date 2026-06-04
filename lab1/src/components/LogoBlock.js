import { Image } from "react-native";

export default function LogoBlock() {
    return (
        <Image
            source={require('../../assets/logo.png')}
            style={{ width: 120, height: 40 }}
            resizeMode="contain"
        />
    );
}