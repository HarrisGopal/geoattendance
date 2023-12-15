import React, { Component } from 'react';
import {View,ScrollView,TouchableOpacity} from 'react-native';
import {} from 'react-native-oreopscomponent'
import OreText from 'react-native-oreopscomponent/components/OreText';

export default class welcome extends Component {
static navigationOptions = {
     header: null
  };
constructor(props) {
super(props);
this.state={
   
   }
}

render() {
 return (
    <View>
       <OreText style={{marginTop:250,fontSize:30,textAlign:"center",color:"black"}} title="Welcome to Oreops" />
      
    </View>
     
   );
  }
 }


