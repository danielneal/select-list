import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState,useRef} from 'react'
import * as db from './db'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import {ListItems} from './components/ListItems'
import {Selector} from './components/Selector'
import {NewItem} from './components/NewItem'

export default function App() {
    const [listItems,setListItems]=useState([]);
    const [refreshList, setRefreshList]=useState(0);
    const refresh=()=>setRefreshList((i)=>i+1);
    const flatList=useRef()
    useEffect(()=>db.migrate(),[]);
    useEffect(()=>db.getListItems((items)=>{
        setListItems(items)
    }),[refreshList]);
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
                             refresh()
                         }}
                         onPress={(id)=>{
                             db.toggleItem(id);
                             refresh()
                         }}/>
              <NewItem onAdd={(text)=>{
                  db.addItem(text)
                  refresh();
                  setTimeout(()=>flatList.current.scrollToEnd(),200)
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
