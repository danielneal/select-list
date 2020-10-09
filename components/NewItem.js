import React,{useState, useRef} from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity , TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { spacing, fontSize, palette, borderRadius} from '../style/constants'

export const NewItem = (props) => {
    const [text,setText]=useState("")
    const input = useRef()
    const canAdd=text.length>0
    return <View style={styles.container}>
             <TextInput ref={input} onChangeText={(text)=>setText(text)} placeholder="Add new item" style={styles.textInput}/>
             <View style={styles.buttonContainer}>
               <TouchableOpacity onPress={ canAdd? ()=>{
                   props.onAdd(text);setText(""),input.current.clear()}:()=>{}} style={styles.button}>
                 <Text style={styles.buttonText}>Add</Text>
                 <FontAwesome style={styles.icon} name="plus-circle" size={32} color="black" />
               </TouchableOpacity>
             </View>
           </View>
}

const styles = StyleSheet.create({
    textInput: {
        fontSize:fontSize.f6,
        padding:spacing.sp3
    },
    container: {
        width:"100%",
        borderTopWidth:1
    },
    button: {
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:palette.ui5,
        borderRadius:borderRadius.br3,
        paddingHorizontal:spacing.sp3,
        paddingVertical:spacing.sp1

    },
    buttonText: {
        fontSize:fontSize.f6,
    },
    buttonContainer: {
        flexDirection:'row',
        justifyContent:'flex-end',
    },
    icon: {
        margin:spacing.sp2
    }
});
