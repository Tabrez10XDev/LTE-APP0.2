/* StudDashboard.j */
import { StyleSheet } from 'react-native';

const StudStyle = StyleSheet.create({
    studMainContainer:{
        alignItems:'center', 
        marginVertical:40,
    }, 
    gradeText:{
        color:'#58585A',
        marginVertical:5
    }, 
    moreText:{
        color:'#2664DE',
        marginVertical:10
    },
    nameTextStyle:{
        fontSize:26,
    }, 
    textStyle:{
        fontSize:40,
        fontWeight:'bold'
    },
    completedText:{
        color:'#2865DE', 
    },
    studyingText:{
        color:'#F41E78', 
    },
    subTextStyle:{
        color:'#58585A',
        fontSize:14,
    }, 
    mainContainer:{
        alignSelf:'center',
        flexDirection:'row', 
    },
    completionAlign:{
        flexDirection:'column', 
        alignItems:'center',
        alignSelf:'stretch',
        marginHorizontal:30
    },

    /* StudPerformance.js */
    mainView:{
        marginVertical:25,
        alignItems:'center'
    },
    gridView: {
        marginTop: 10,
      },
      itemCode: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#1EC12A',
        borderColor:'gray',
        borderWidth:0.75,
        height: 75,
        padding:18,
        textAlign:'center',
      },
})

export default StudStyle