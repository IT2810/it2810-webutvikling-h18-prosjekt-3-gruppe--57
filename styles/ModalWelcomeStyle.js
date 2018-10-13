import { StyleSheet } from 'react-native';

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
        backgroundColor: '#17cf94',
        padding: 10
    },
    buttonQuit: {
        alignItems: 'center',
        backgroundColor: '#F2686B',
        padding: 10
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    camera: {
        aspectRatio: 4/5,
    },
    lock: {
        paddingHorizontal: 20,
    },
    img: {
        width: 70,
        height: 70,
        margin: 0,
        marginHorizontal: 0,
        borderRadius: 10,
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
    input: {
        height: 30
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
        borderRadius: 10,
    },
    dateText: {
        margin: 10,
        fontSize: 27,
        color: '#ffffff',
        textAlign: 'center',
    },
    titleT: {
        margin: 10,
        fontSize: 27,
        color: '#000',
        textAlign: 'center',
    },
    titleB: {
        margin: 10,
        fontSize: 37,
        color: '#000',
        textAlign: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 10, height: 30},
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
    },
    textT: {
        margin: 10,
        fontSize: 17,
        color: '#000',
        textAlign: 'center',
    }
};

export default function createStyles(overrides = {}) {
    return StyleSheet.create({...styles, ...overrides})
}