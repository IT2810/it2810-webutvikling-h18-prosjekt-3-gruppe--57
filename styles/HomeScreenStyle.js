import { StyleSheet, Dimensions} from 'react-native';
import color from '../constants/Colors'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const chartWidth = 0.9*screenWidth;
const chartHeight = 0.2*screenHeight;


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
        width: screenWidth-20,
        borderColor:'red',
        marginHorizontal:10,
        backgroundColor:color.background
    },
    diagram: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    shadow: {
        backgroundColor:"#f1f1f1",
        borderWidth: 1,
        borderRadius: 11,
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
    rightBoxContainer: {
        flex:1,
        flexDirection:'row',
        backgroundColor:"rgba(54,54,54,0)",
        alignSelf: 'flex-end',
        borderRadius:10,
    },
    gradient: {
        borderRadius: 10,
        alignItems: 'center',
        flex:1,
        flexDirection:'row',
    },
    container: {
        flex: 1,
        backgroundColor: color.background,
    },
    getStartedText: {
        justifyContent: 'center',
        margin: 10,
        fontSize: 27,
        color: color.text,
        textAlign: 'center',
    },
};

export default function createStyles(overrides = {}) {
    return StyleSheet.create({...styles, ...overrides})
}