import { StyleSheet } from "react-native";


export const listStyles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingHorizontal: 16, 
    paddingTop: 24, 
    backgroundColor: '#fff' 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,  
  },
  title: {
    fontSize: 20, 
    fontWeight: 'bold',
    paddingHorizontal : 10
  },

});