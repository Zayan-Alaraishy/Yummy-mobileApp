import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator, Image } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../db';
import image from '../assets/newest.png'

export default class Login extends Component {
  
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(res)
        console.log('User logged-in successfully!')
        this.setState({
          isLoading: false,
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Main')
      })
      .catch(error => this.setState({ errorMessage: error.message }))
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={styles.container}>
        <Image source={image}
                    style={styles.image}
                    />
                    <Text style={styles.title} >Log in</Text> 
        <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        </View>
        <View style={styles.inputGroup}>
        <TextInput
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          secureTextEntry={true}
        />   
        </View>
        <View style={{top:270}}>
        <Button
          title="Log in"
          onPress={() => this.userLogin()}
          type="solid"
            buttonStyle={{
              backgroundColor:'#A51E24'
            }}
        />  
        </View> 

        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Signup')}>
          Don't have account? Click here to sign up
        </Text>                          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display:'flex', 
    flex: 1,
    padding: 35,
    backgroundColor: '#fff'

  },
  title:{
    fontSize:26, 
    fontWeight:'bold', 
    color:'#5D5B5B', 
    top: 210
  },
  image:{
    width:250,
    height:250, 
    borderRadius:250/2, 
    position: 'absolute',
    left:90,
    top: 20


  },
  inputGroup: {
    borderBottomWidth: 1,
    borderBottomColor: '#5D5B5B',
    top:260, 
    color:'#5D5B5B',
    marginBottom:40

  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
    loginText: {
    color: '#5D5B5B',
    marginTop: 310,
    textAlign: 'center'
  },
});