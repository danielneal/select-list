import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
const listItems = [{id:1,title:"Quorn Bolognese",selected:false},
                   {id:2,title:"Butternut squash, barley, broccoli",selected:true},
                   {id:3,title:"Pasta with Caponata",selected:true}]


export const ListItems = (props) => {
    return listItems
        .filter(item=>item.selected===true||props.selectedOnly===false)
        .map(item=>
              <View style={styles.container} key={item.id}>
              {item.selected ?
               <FontAwesome name="circle" size={24} color="black" />:
               <FontAwesome name="circle-o" size={24} color="black" /> }
              <Text>{item.title}</Text>
              </View>)
}

const styles = StyleSheet.create({
    container: {
        width:"100%",
        flexDirection: 'row',
        backgroundColor:'pink',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});
