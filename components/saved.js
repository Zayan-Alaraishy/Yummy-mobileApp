import React, {Component} from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView} from 'react-native';
import firebase from '../db';

class Saved extends Component{

    state={
        favMeals:[],
        uid:"",
        currentUserMealId:[]
    }

    componentDidMount(){

        let me = this;
        const {currentUserMealId, favMeals}= this.state; 
        this.list(); 
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User logged in already or has just logged in.
              console.log(user.uid);
              this.setState({uid:user.uid});
              console.log(this.state.uid);
            } else {
              // User not logged in or has just logged out.
            };
            firebase.firestore().collection("mealUserId").where("currentUserUid", "==",this.state.uid)
        .get()
        .then((querySnapshot)=>{
            querySnapshot.forEach((doc)=> {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                me.setState({currentUserMealId:doc.data().mealId})
        });
        }).then(()=>{
            console.log(currentUserMealId);
            currentUserMealId.forEach((id)=>{
                console.log(id);
                firebase.firestore().collection('meals').doc(state.params.id)
            .get()
            .then((doc)=>{
                    console.log(doc.data());
                    me.setState({favMeals:doc.data()})

                });
            })
        });

        console.log(currentUserMealId);
        });      
    }


        list=()=>{

            let me = this;
            const {currentUserMealId, favMeals}= this.state; 

            currentUserMealId.forEach(id => {
                console.log(params.id);
                firebase.firestore().collection('meals').doc(state.params.id)
                .get()
                .then((doc)=>{
                    console.log(doc.data());
                    me.setState({favMeals:doc.data()})

    
                    });
                });
        }


         
       learnMore=(clickedMealId)=>{
        console.log(clickedMealId)
        this.props.navigation.navigate('Meal', {id: clickedMealId})
   }
    render(){
        const {favMeals}= this.state;
        console.log(this.state.favMeals); 
        console.log(this.props)


        return(
            <ImageBackground
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1
            }}
            source={{uri:"https://images.pexels.com/photos/207253/pexels-photo-207253.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}}      >
        

        <View style={{flex:1, alignItems:"center"}}>
            
                    {favMeals.map((meal)=>

                       
                        <View style={styles.container}>
                            <Text style={styles.header}>{meal.mealName}</Text>
                            <Image
                                source={{uri:meal.image}}/>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={()=>this.learnMore(meal.id)}>
                                <Text  style={styles.text}>SHOW MORE</Text>
                            </TouchableOpacity>
                        </View>

                    )}
               
            </View>
                
</ImageBackground>
        )
    }
}
const styles=StyleSheet.create({
    container:{
      flex:1,
      maxWidth:600,
      maxHeight:450,
      alignItems: "center",
      textAlign:"center",
      backgroundColor: 'rgba(255,253,231,0.8)',
      borderRadius:10,
      top:10,
      margin:10
    },
    header:{
        fontSize:30,
        color:'rgb(22,53,86)',
    },
    image:{
        width: 300,
        height:300,
        margin:20,
        borderRadius:10,
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


export default Saved;