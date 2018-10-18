import {StyleSheet} from 'react-native';
import color from '../constants/Colors';
import layout from '../constants/Layout';

const styles = {
    info1: {
        flex: 1,
        flexDirection: "column"
    },
    item: {
        alignItems: "center",
        marginBottom: 5,
        marginTop: 15,
        paddingHorizontal: 10
    },
    shadow: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#ddd",
        borderBottomWidth: 0,
        shadowColor: "#000",
        shadowOffset: {width: 10, height: 30},
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
        marginLeft: 5,
        marginRight: 5,
        alignSelf: "stretch"
    },
    gradient: {
        flex: 1,
        flexDirection: "row",
        borderRadius: 10,
        alignItems: "center"
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 0,
    },
    reminderText: {
        margin: 5,
        fontSize: 27,
        color: color.dataColor,
        textAlign: "center",
    },
    reminderTextLocked: {
        margin: 5,
        fontSize: 27,
        color: "#000",
        textAlign: "center",
    },
    dateText: {
        margin: 5,
        fontSize: 20,
        color: color.dataColor,
        textAlign: 'center',
    },
    dateTextLocked: {
        margin: 5,
        fontSize: 20,
        color: "#000",
        textAlign: 'center',
    },
    emptyText: {
        fontSize: 17,
        color: color.subtleText,
        textAlign: 'center',
    },
    emptyTextView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 0,
        alignItems: 'center',
        height: layout.window.height - 150,
    }
};

export default function createStyles(overrides = {}) {
    return StyleSheet.create({...styles, ...overrides})
}