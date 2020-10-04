import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {spacing, fontSize, palette} from '../style/constants'

export const Selector = (props) => {
    console.log(props.items)
    return(<View style={styles.container}>
            {props.items.map(
                item=>
                    <TouchableOpacity style={[styles.item,item.id===props.selectedId?styles.selectedItem:{}]} onPress={()=>props.onPress(item.id)}>
                    <Text style={styles.itemText} key={item.id}>{item.title}</Text>
                    </TouchableOpacity>)}
           </View>)
}

const styles = StyleSheet.create({
    container: {
        width:"100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    item: {
        padding:spacing.sp3
    },
    selectedItem: {
        backgroundColor:palette.brand1,
    },
    itemText:{
        fontSize:fontSize.f4
    }

});
