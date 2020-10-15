import React from 'react'
import { fontSize, fonts, spacing, palette } from '../style/constants'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

export const Title = (props) => {
    const dispatch = props.dispatch
    const onPress = () => dispatch({type:'toggleMenuOpen'})

    return (<View style={styles.container}>
              <Text style={styles.titleText}>
                Select List
              </Text>
              <TouchableOpacity onPress={onPress}>
                <MaterialIcons name="menu" size={32} color="black"/>
              </TouchableOpacity>
            </View>)
}

const styles = StyleSheet.create({
    container: {
        width:"100%",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:spacing.sp2,
        zIndex:2
    },
    titleText: {
        color:palette.ui0,
        fontSize:fontSize.f7,
        fontFamily:fonts.primary
    }
});
