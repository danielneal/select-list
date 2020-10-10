import React,{ forwardRef, useRef, useImperativeHandle} from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { spacing, fontSize, palette,fonts } from '../style/constants'
import {Swipeable} from 'react-native-gesture-handler'

const ListItem = ({item}) => {
    const renderLeftActions=(_progress,_transX)=>
          (<View style={styles.leftActions}>
             <Text style={styles.leftActionsText}>Delete item</Text>
           </View>)
    return (
        <Swipeable renderLeftActions={renderLeftActions} onSwipeableLeftOpen={()=>item.onSwipeRight(item.id)}>
          <TouchableOpacity onPress={()=>item.onPress(item.id)} style={styles.itemContainer}>
            {item.selected ?
             <FontAwesome style={styles.icon} name="circle" size={24} color="black" /> :
             <FontAwesome style={styles.icon} name="circle-o" size={24} color="black" /> }
            <View style={styles.textContainer}>
              <Text style={styles.text}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        </Swipeable>
    )
}

export const ListItems = forwardRef((props,ref) => {
    const flatList=useRef()
    useImperativeHandle(ref, () => ({
        scrollToEnd: () => {
            flatList.current.scrollToEnd();
        }
    }),[flatList]);
    const data=props.items.map((item)=>Object.assign(item,{onPress:props.onPress,onSwipeRight:props.onSwipeRight}))
    const renderLeftActions=(progress,dragX) => {return <View style={{backgroundColor:"blue"}}/>}
    return <FlatList ref={flatList} style={styles.flatList} data={data} renderItem={ListItem} keyExtractor={(item) => `list-item-${item.id}`}/>
})

const styles = StyleSheet.create({
    leftActions: {
        backgroundColor:palette.brand1,
        justifyContent:'center',
        flex:1,
        padding:spacing.sp2
    },
    leftActionsText: {
        color:palette.ui5,
        fontSize:fontSize.f5
    },
    flatList: {
        width:"100%",
    },
    itemContainer: {
        backgroundColor:palette.ui5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding:spacing.sp2
    },
    icon: {
        marginRight:spacing.sp2
    },
    textContainer: {
        flexShrink:1
    },
    text: {
        fontFamily:fonts.primary,
        fontSize:fontSize.f5,
    }
});
