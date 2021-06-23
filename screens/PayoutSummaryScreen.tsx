import {Text, View} from "../components/Themed";
import EditScreenInfo from "../components/EditScreenInfo";
import {StyleSheet} from "react-native";
import * as React from "react";
import PayoutSummary from "../components/PayoutSummary";

export default function PayoutSummaryScreen(data: any) {
    return (
        <View style={styles.container}>
            <PayoutSummary path="/screens/PayoutSummaryScreen.tsx" data={data}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems: 'center',
        fontFamily: 'roboto'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
