import { StyleSheet,Dimensions } from 'react-native';
import color from '../constants/Colors'

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
    imgView:{
        alignItems:'center',
        aspectRatio: 5/1.8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: color.normalText,
        shadowOffset: {width: 10, height: 30},
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 3,
        marginBottom:20,
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