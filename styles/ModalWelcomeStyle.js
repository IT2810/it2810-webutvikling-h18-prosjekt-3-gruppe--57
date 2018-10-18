import {StyleSheet} from 'react-native';
import color from '../constants/Colors'
import layout from '../constants/Layout';

const styles = {
    inputChooses: {
        paddingVertical:20,
    },
    greenButton:{
        alignItems: 'center',
        backgroundColor: color.greenButton,
        padding: 10
    },
    img: {
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
    },
    svg: {
        alignSelf:'center'
    },
    container: {
        marginHorizontal:20,
    },
    titleT: {
        margin:10,
        fontSize: 27,
        color: color.subtleText,
        textAlign: 'left',
    },
    titleB: {
        margin: 10,
        fontSize: 47,
        color: color.normalText,
        textAlign: 'center',
        shadowColor: color.normalText,
        shadowOffset: {width: 10, height: 30},
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
    },
    textT: {
        margin: 10,
        fontSize: 17,
        color: color.normalText,
        textAlign: 'left',
        marginBottom:20,
    }
};

export default function createStyles(overrides = {}) {
    return StyleSheet.create({...styles, ...overrides})
}