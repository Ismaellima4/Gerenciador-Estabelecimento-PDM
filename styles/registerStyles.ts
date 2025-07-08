import { StyleSheet } from "react-native";


export const registerStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  multiline: {
    minHeight: 120,
    textAlignVertical: 'top',
    lineHeight: 22,
  },
  inputsWrapper: {
    flexGrow: 1,
    marginBottom: 150,
  },
  required: {
    color: 'red',
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
  },
   backButtonText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center'
  },
  backButton: {
   backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20, 
  },
});