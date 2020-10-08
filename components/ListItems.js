import React,{ forwardRef, useRef, useImperativeHandle} from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { spacing, fontSize, palette} from '../style/constants'

const ListItem = ({item}) => {
    return <TouchableOpacity onPress={()=>item.onPress(item.id)} style={styles.itemContainer}>
               {item.selected ?
                <FontAwesome style={styles.icon} name="circle" size={24} color="black" /> :
                <FontAwesome style={styles.icon} name="circle-o" size={24} color="black" /> }
               <Text style={styles.text}>{item.title}</Text>
           </TouchableOpacity>
}

export const ListItems = forwardRef((props,ref) => {
    const flatList=useRef()
    useImperativeHandle(ref, () => ({
        scrollToEnd: () => {
            flatList.current.scrollToEnd();
        }
    }),[flatList]);
    const data=props.items
          .filter(item=>item.selected===1||props.selectedOnly===false)
          .map((item)=>Object.assign(item,{onPress:props.onPress}))
    const renderLeftActions=(progress,dragX) => {return <View style={{backgroundColor:"blue"}}/>}
    return <FlatList ref={flatList} style={styles.flatList} data={data} renderItem={ListItem} keyExtractor={(item) => `list-item-${item.id}`}/>
})

const styles = StyleSheet.create({
    flatList: {
        width:"100%",
        flexGrow:1
    },
    itemContainer: {
        width:"100%",
        height:60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding:spacing.sp2
    },
    icon: {
        marginRight:spacing.sp2
    },
    text: {
        fontSize:fontSize.f6
    }
});
