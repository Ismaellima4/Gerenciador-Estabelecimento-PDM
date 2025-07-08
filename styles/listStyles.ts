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
  card: { 
    backgroundColor: '#e0e0e0', 
    borderRadius: 10, 
    padding: 12, 
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: '#000'
  },
  cardTitle: { 
    fontWeight: 'bold', 
    fontSize: 20, 
    marginBottom: 4 
  },
  cardInfo: { 
    fontSize: 14, 
    color: '#444' 
  },
  emptyText: { 
    textAlign: 'center',
    marginTop: 20, 
    color: '#999' 
  },

});