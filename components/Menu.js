import React, { useEffect, useRef } from 'react'
import { fontSize, fonts, spacing, palette } from '../style/constants'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { Animated } from "react-native";

const MenuItem = (props) => {
    return (<TouchableOpacity style={styles.menuItem} onPress={props.onPress}>
              <Text style={styles.menuItemText}>
                {props.text}
              </Text>
            </TouchableOpacity>)
}

export const Menu = (props) => {
    const dispatch=props.dispatch
    const selectAll=()=>dispatch({type:'selectAll'})
    const deselectAll=()=>dispatch({type:'deselectAll'})
    const showPrivacyPolicy=()=>dispatch({type:'showPrivacyPolicy'})
    const removeAll=()=>dispatch({type:'removeAll'})
    const menuYOffset=useRef(new Animated.Value(0)).current;
    useEffect(()=>{
        Animated.timing(menuYOffset, {
            toValue: props.menuOpen?0:-300,
            duration: 200,
            useNativeDriver:true
        }).start();
    },[props.menuOpen])
    return (<Animated.View style={[styles.container,{transform:[{translateY:menuYOffset}]}]}>
              <MenuItem text="Select All" onPress={selectAll}/>
              <MenuItem text="Deselect All" onPress={deselectAll}/>
              <MenuItem text="Remove All" onPress={removeAll}/>
              <MenuItem text="Privacy Policy" onPress={showPrivacyPolicy}/>
            </Animated.View>)
}

const styles = StyleSheet.create({
    container: {
        width:"100%",
        backgroundColor:palette.ui5,
        paddingTop:80,
        zIndex:1,
        shadowColor: "#000",
        shadowOffset: {width: 0,height: 2,},
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
        position:'absolute',
        alignItems:'flex-end',
        justifyContent:'flex-end',
        padding:spacing.sp2
    },
    menuItem: {
        padding:spacing.sp2
    },
    menuItemText: {
        color:palette.ui0,
        fontSize:fontSize.f5,
        fontFamily:fonts.primary
    }
});
