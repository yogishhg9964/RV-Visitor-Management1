import { Text, View, StyleSheet } from "react-native";

const More = () => {
    return (
        <View style={styles.container}>
            <Text>More</Text>
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

export default More; 