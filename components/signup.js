import React, { Component } from 'react';
import { StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../db';
import image from '../assets/newest.png'


class Signup extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('users');
    this.state = {
      name: '',
      email: '',
      password: '',
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeUser() {
    if(this.state.name === ''){
     alert('Fill at least your name!')
    } else {
      this.setState({
        isLoading: true,
      });   
      firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
      .then(()=>{   
        let user  =  firebase.auth().currentUser
        firebase.firestore().collection('users').doc(user.uid).set({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }).then((res) => {
        this.setState({
          name: '',
          email: '',
          password: '',
          isLoading: false,
        });
        this.props.navigation.navigate('Main')
      });
    })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
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
      <ScrollView style={styles.container}>
                <Image source={image}
                    style={styles.image}
                    />
                    <Text style={styles.title} >Sign up</Text>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Name'}
              value={this.state.name}
              onChangeText={(val) => this.inputValueUpdate(val, 'name')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              // multiline={true}
              // numberOfLines={4}
              placeholder={'Email'}
              value={this.state.email}
              onChangeText={(val) => this.inputValueUpdate(val, 'email')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Password'}
              value={this.state.mobile}
              onChangeText={(val) => this.inputValueUpdate(val, 'password')}
              secureTextEntry={true}

          />
        </View>
        <View style={{top:260,}}>
          <Button
            title='Sign up'
            onPress={() => this.storeUser()} 
            type="solid"
            buttonStyle={{
              backgroundColor:'#A51E24'
            }}
          />
        </View>
        <View>
        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Already Registered? Click here to login
        </Text> 
        </View>

      </ScrollView>
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
    left:70,
    // top: 100


  },
  inputGroup: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#5D5B5B',
    top:250, 
    color:'#5D5B5B',
    marginBottom:30

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
})

export default Signup;