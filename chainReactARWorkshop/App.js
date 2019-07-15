
import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity,StatusBar, Text, View} from 'react-native';
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Shop from './src/components/Shop'
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
      <Text style={styles.welcomeText}>Welcome to Chain React AR Workshop app. </Text>
      <Text style={styles.welcomeText}>Click here to begin...</Text>
    </TouchableOpacity>
  </View>
)

HomeScreen.navigationOptions = {
  header: null
}

const AppNavigator = createSwitchNavigator({
  Home: {
    screen: HomeScreen
  },
  Shop: Shop
})


const AppContainer = createAppContainer(AppNavigator)

const App = () => (
  <View style={{flex: 1}}>
    <StatusBar barStyle="light-content"/>
    <AppContainer />
  </View>
)


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: '#161637' 
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  welcomeText:{
    color: '#ffffff',
    fontSize: 24, 
    textAlign: 'center',
    paddingBottom: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});