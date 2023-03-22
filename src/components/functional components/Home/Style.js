/* HomeTabView StyleSheet */
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
 


  mainAudioContainer: {
    flex: 1,
  },
  audioText:{
        fontSize:16, 
        width:370,
        alignSelf:'center',
        textAlign:'center',  
        margin:30
  }, 
  dragViewContainer: {
    flex: 2,
    width: 370,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#B5B5B5",
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'#FAFAFA'
  },
  uploadIcon:{
    textAlign:'center'
  }, 
  uploadText:{
    textAlign:'center', 
  }, 

  subViewContainer: {
    width: 350,
    height: 250,
    alignSelf: "center",
    marginHorizontal:50, 
    marginVertical:50, 
    justifyContent:"flex-end" 
  },
  btnStyle: {
    alignItems: "center",
    backgroundColor: "#FF758F",
    padding: 10,
    borderRadius: 5,
  },
  btnTextStyle: {
    fontSize: 20,
    color: "#FFFFFF",
  },
});

export default styles;
