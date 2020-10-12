import React from 'react'
import { fontSize, fonts, spacing, palette } from '../style/constants'
import { StyleSheet, View, Text } from 'react-native'

export const EmptyList = (props) => {
    return (<View style={styles.container}>
            <Text style={styles.text}>
            {props.selectedOnly==1? 'List of selected items is empty. \n\nChoose some items from the \'All\' tab to show here':'List is empty.\n Add items using the input below. \n\nSwipe right to delete items.'}
            </Text>
            </View>)
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
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
