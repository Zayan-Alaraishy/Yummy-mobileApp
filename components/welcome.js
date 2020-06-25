import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator , Image} from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../db';
import image from '../assets/new2.png'


export default class Login extends Component {
  
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: false
    }
  }

  render() {    
    return (
      <View style={styles.container}>


        <Image source={image}
                    style={styles.image}
                    />
                <Text style={styles.text}>
          Wasfa
        </Text>

        <View style={{width:350, top:400,left:30}}>
        <Button
        titleStyle={{ color: '#A51E24' }}
        buttonStyle={{ borderWidth: 2, borderColor: '#A51E24',}}
          type="outline"
          title="Sign up"
          onPress={() => this.props.navigation.navigate('Signup')}
          />
          </View>

          <View style={{width:350, top:415,left:30}}>
        <Button
        titleStyle={{ color: '#A51E24' }}
        buttonStyle={{ borderWidth: 2, borderColor: '#A51E24',}}
          type="outline"
          title="Login"
          onPress={() => this.props.navigation.navigate('Login')}
          />
          </View>

          <View style={{width:350, top:430,left:30}}>
        <Button
        titleStyle={{ color: '#A51E24' }}
        buttonStyle={{ borderWidth: 2, borderColor: '#A51E24',}}
          type="outline"
          title="Maybe later"
          onPress={() => this.props.navigation.navigate('Card')}
          />
          </View>
        {/* <Button
            style={styles.button}
          // color="#3740FE"
          title="Sign in"
          onPress={() => this.props.navigation.navigate('Login')}

        />  
        <Button
                    style={styles.button}
          // color="#3740FE"
          title="Maybe later"
        onPress={() => this.props.navigation.navigate('Card')}

        />                           */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    // padding: 0,
    backgroundColor: '#fff'
  },
  text:{
    fontSize:36, 
    fontWeight:'bold', 
    color:"#A51E24", 
    textAlign:'center', 
    alignItems:'center', 
    justifyContent:'center',
    top: 350

  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  image:{
    width:250,
    height:250, 
    borderRadius:250/2, 
    position: 'absolute',
    left:90, 
    top: 100


  },
  button:{
    color:"#A51E24", 

  }

});