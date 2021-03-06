import {StyleSheet} from 'react-native';
import color from '../constants/Colors'
import layout from '../constants/Layout';

const styles = {
    inputChooses: {
        paddingVertical:10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    buttonSave:{
        alignItems: 'center',
        backgroundColor: color.greenButton,
        padding: 10
    },
    buttonQuit: {
        alignItems: 'center',
        backgroundColor: color.redButton,
        padding: 10
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
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
    }
};

export default function createStyles(overrides = {}) {
    return StyleSheet.create({...styles, ...overrides})
}