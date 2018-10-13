import { StyleSheet } from 'react-native';
import color from '../constants/Colors'

const styles = {
    scorePointText:{
        margin: 10,
        fontSize: 57,
        color:color.dataColor,
        textAlign: 'center',
    },
    item: {
        alignItems: 'center',
        marginBottom: 30,
        paddingHorizontal: 10,
        borderColor:'red',
        backgroundColor:color.background
    },
    diagram: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    shadow: {
        backgroundColor:"#1FBF53",
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
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'stretch',
    },
    shadowChart: {
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
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'stretch',
    },
    gradient: {
        borderRadius: 10,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: color.background,
    },
    getStartedText: {
        margin: 10,
        fontSize: 27,
        color: color.text,
        textAlign: 'center',
    },
};

export default function createStyles(overrides = {}) {
    return StyleSheet.create({...styles, ...overrides})
}