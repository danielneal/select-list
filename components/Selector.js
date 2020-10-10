import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {spacing, fontSize, palette, borderRadius} from '../style/constants'

export const Selector = (props) => {
    return(<View style={styles.container}>
             {props.items
              .map(item=>
                   <TouchableOpacity key={item.id} style={[styles.item,item.id===props.selectedId?styles.selectedItem:{}]} onPress={()=>props.onPress(item.id)}>
                     <Text style={[styles.itemText,item.id===props.selectedId?styles.selectedItemText:{}]}>{item.title}</Text>
                   </TouchableOpacity>)}
           </View>)
}

const styles = StyleSheet.create({
    container: {
        width:"100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding:spacing.sp2
    },
    item: {
        paddingHorizontal:spacing.sp3,
        paddingVertical:spacing.sp2,
        borderWidth:2,
        marginRight:spacing.sp2,
        borderColor:palette.ui0,
        borderRadius:borderRadius.br3
    },
    selectedItem: {
        borderColor:palette.brand1,
        backgroundColor:palette.brand1,
    },
    itemText: {
        fontFamily:'Avenir Next',
        fontSize:fontSize.f6,
        color:palette.ui0
    },
    selectedItemText:{
        color:palette.ui5,
    }

});
