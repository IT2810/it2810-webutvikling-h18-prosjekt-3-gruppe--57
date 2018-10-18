import {StyleSheet} from 'react-native';
import color from '../constants/Colors'
import layout from '../constants/Layout';

const styles = {
    inputChooses: {
        paddingVertical: 10,
    },
    buttonSave: {
        alignItems: 'center',
        backgroundColor: color.greenButton,
        padding: 10
    },
    buttonQuit: {
        alignItems: 'center',
        backgroundColor: color.redButton,
        padding: 10
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    lock: {
        paddingHorizontal: 20,
    },
    info1: {
        flex: 1,
        flexDirection: 'column',
    },
    item: {
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 15,
        paddingHorizontal: 10,
    },
    shadow: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 10, height: 30},
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
        marginLeft: 5,
        marginRight: 5,
        alignSelf: 'stretch',
    },
    gradient: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 0,
    },
    dateText: {
        margin: 10,
        fontSize: 27,
        color: color.dataColor,
        textAlign: 'center',
        paddingVertical: 15,
    },
    dateTextLocked: {
        margin: 10,
        fontSize: 27,
        color: "#000",
        textAlign: 'center',
        paddingVertical: 15,
    },
    modalText: {
        margin: 10,
        fontSize: 27,
        color: '#000',
        textAlign: 'center',
    },
    modalText2: {
        margin: 10,
        fontSize: 17,
        color: '#000',
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