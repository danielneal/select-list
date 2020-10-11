import React from 'react'
import { fontSize, fonts, spacing, palette } from '../style/constants'
import { StyleSheet, View, Text } from 'react-native'

export const Title = () => {
    return (<View style={styles.container}>
            <Text style={styles.titleText}>
            Select List
            </Text>
            </View>)
}

const styles = StyleSheet.create({
    container: {
        width:"100%",
        alignItems:'center',
        justifyContent:'center',
        padding:spacing.sp2
    },
    titleText: {
        color:palette.ui0,
        fontSize:fontSize.f7,
        fontFamily:fonts.primary
    }
});
