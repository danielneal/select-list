import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState,useRef} from 'react'
import * as db from './db'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import {ListItems} from './components/ListItems'
import {Selector} from './components/Selector'
import {NewItem} from './components/NewItem'

export default function App() {
    const [listItems,setListItems]=useState({});
    const flatList=useRef()
    useEffect(()=>{
        console.log('initialising')
        db.migrate();
        db.getListItems((items)=>{
            setListItems(items)
        })},[]);
    console.log(listItems);
    const [selectedOnly,setSelectedOnly]=useState(false)
    return (<SafeAreaView style={styles.container}>
              <StatusBar style="auto" />
              <Selector items={[{id:0,title:"Selected"},
                                {id:1,title:"All"}]}
                        selectedId={selectedOnly?0:1}
                        onPress={(id)=>{
                            if(id===0){
                                setSelectedOnly(true)
                            } else if (id===1) {
                                setSelectedOnly(false)
                            }
                        }}/>
              <ListItems items={listItems}
                         ref={flatList}
                         selectedOnly={selectedOnly}
                         onSwipeRight={(id)=>{
                             db.deleteItem(id);
                             setListItems((items)=>{const {[id]:omit,...newItems}=items;return newItems;})

                         }}
                         onPress={(id)=>{
                             db.toggleItem(id);
                             setListItems((items)=>{
                                 const item=items[id];
                                 item.selected=item.selected===1?0:1
                                 return {[id]:item,...items}})
                         }}/>
              <NewItem onAdd={(text)=>{
                  db.addItem(text,(id)=> setListItems((items)=>{
                      return {...items, [id]:{id:id,title:text,selected:1}}
                  }));
                  flatList.current.scrollToEnd()
              }}/>
            </SafeAreaView>
           );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    }, scrollView:{
        width:"100%"
    }
});
