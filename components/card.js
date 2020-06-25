import React, {Component} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import firebase from '../db';


class Card extends Component{

    state={
        meals:[],
        uid:"", 
        mealId:""
      }
  
      componentDidMount(){
          const {meals} = this.state;
          let me = this;
      
          firebase.firestore().enablePersistence().collection('meals').get().then(function(querySnapshot) {
              querySnapshot.forEach((doc)=> {
                  const fetchedMealData = {
                      id: doc.id,
                      ...doc.data()
                    };
                  meals.push(fetchedMealData);
                  me.setState(meals)
                  
              });
          });
          firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                // User logged in already or has just logged in.
                console.log(user.uid);
                this.setState({uid:user.uid})
              } else {
                // User not logged in or has just logged out.
              };
            });
      }
  
      getMealId=(clickedMealId)=> {
          this.setState({mealId: clickedMealId})
          console.log(clickedMealId)
  
  
          const {uid} = this.state;
          console.log(this.state)
  
          firebase.firestore().collection("mealUserId").add({
              mealId: clickedMealId,
              currentUserUid:uid
          
          })
        //   .then( (docRef) =>{
        //     this.props.navigation.navigate('Saved')
  
        //   })
  
  
       }
       
       learnMore=(clickedMealId)=>{
            console.log(clickedMealId)
        //   this.props.navigation.navigate('Meal', {id: clickedMealId})
       }
  
     
  render(){
    const {meals}= this.state;
        console.log(this.state.meals)

    console.log(this.props )
    return(
      
    
      <ScrollView> 
          
      <View style={{flex:1,}}>

      {meals.map((meal)=>
  
        <View style={styles.container}>
            
            <Text style={styles.header}>{meal.mealName}</Text>
            <Image 
            style={styles.image}
            source={{uri:meal.image}}    
            />
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
                        
        }}>

        <TouchableOpacity
        style={styles.button}
        onPress={()=>this.learnMore(meal.id)}>
            <Text  style={styles.text}>SHOW MORE</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.button2}
        onPress={()=>this.getMealId(meal.id)}>
        <Image
            style={styles.fav}
            source={require('../assets/heart.png')}>
                    
            </Image>
        
        </TouchableOpacity>
        </View>
        </View>
        
        
      )}
      </View>
        </ScrollView>  
    )}}
    const styles=StyleSheet.create({
        container:{
          flex:1,
          width:200,
          height:200,
        //   alignItems: "center",
        //   textAlign:"center",
          backgroundColor: '#5D5B5B',
          marginTop:10,
          marginBottom:10
        },
        header:{
            fontSize:30,
            color:'rgb(22,53,86)',
        },
        image:{
            width: 150,
            height:150,
            margin:15,
            borderRadius:150/2,
            shadowColor:'black'
            
        },
        button:{
            top:-10,
            backgroundColor: '#fffde7',
            padding: 10,
            width: 106,
            height:40,
            fontSize: 14,
            borderRadius:10,
            left:109,
        },
        text:{
            color:'rgb(22,53,86)',
            fontSize:14
        },
        button2:{
            top:-10,
            padding: 1,
            fontSize: 14,
            borderRadius:10,
            right:180,
        },
        fav:{
            height:30,
            width:30,
        },
        myfav:{
            width:50,
            height:50,
            right:160,
            top:35
        }
    })


export default Card;