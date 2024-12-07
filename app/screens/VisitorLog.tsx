import { Text, View, StyleSheet } from "react-native";

const VisitorLog = () => {
    return (
        <View style={styles.container}>
            <Text>VisitorLog</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default VisitorLog;
