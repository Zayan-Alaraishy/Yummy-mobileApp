import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import firebase from '../db';
import Card from './card'
export default class Main extends Component {
  constructor() {
    super();
    this.state = { 
      uid : firebase.auth().currentUser.uid,
      email:firebase.auth().currentUser.email,
      name:''
    }
  }

  componentDidMount=()=>{
    console.log('email', this.state.email)

    firebase.firestore().collection('users').doc(this.state.uid)
    .get()
    .then((doc)=> {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            console.log(doc.data().name);
            this.setState({name:doc.data().name})

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  

  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.textStyle}>
          hhhhh, {this.state.name}, {this.state.uid}
        </Text>

        <Button
          color="#3740FE"
          title="Logout"
          onPress={() => this.signOut()}
        />
        <Card/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  }
});