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
    camera: {
        aspectRatio: 4/5,
    },
    image:{
        flex:1,
        aspectRatio: 4/5,
    },
    info1: {
        flex: 1,
        flexDirection: 'column',
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