import { View } from "react-native";
import AppText from "./Text";
import EmptyIcon from "@/icons/empty-box.svg"


export default function EmptyView({ message } : { message : string }) {


    return (<View style={{
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20
    }}>
        <EmptyIcon width={100} height={100} />
        <AppText style={{ textAlign: "center" }}>
           {message}
        </AppText>
    </View>)
}

