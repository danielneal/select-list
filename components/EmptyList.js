import React from 'react'
import { fontSize, fonts, spacing, palette } from '../style/constants'
import { StyleSheet, View, Text } from 'react-native'

export const EmptyList = (props) => {
    return (<View style={styles.container}>
            <Text style={styles.text}>
            {props.selectedOnly==1? 'List of selected items is empty, choose some items from the All tab to show here':'List is empty, add some items using the input below to show here'}
            </Text>
            </View>)
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:spacing.sp4
    },
    text: {
        textAlign:'center',
        fontSize:fontSize.f5,
        color:palette.ui2,
        fontFamily:fonts.primary
    }

});
