import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#669999"
    },
    buttons: {
        // flex: 0.15,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20
    },
    button: {
        marginHorizontal: 20,
        padding: 20,
        backgroundColor: "#0D4D4D",
        color: "white",
        textAlign: "center"
    },
    selectedButton: {
        backgroundColor: "#006699"
    },
    body: {
        // flex: 0.8,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    subTitle: {
        marginVertical: 10
    },
    viewport: {
        // flex: 1,
        alignSelf: "center",
        backgroundColor: "white"
    }
});

export default styles;
