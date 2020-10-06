import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react'
import * as db from './db'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import {ListItems} from './components/ListItems'
import {Selector} from './components/Selector'

export default function App() {
    const [listItems,setListItems]=useState([])
    const [refreshList, setRefreshList]=useState(0)
    useEffect(()=>db.migrate(),[])
    useEffect(()=>db.getListItems((items)=>{
        setListItems(items)
    }),[refreshList])
    const [selectedOnly,setSelectedOnly]=useState(false)
    return (<SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <Selector
            items={[{id:0,title:"Selected"},
                    {id:1,title:"All"}]}
            selectedId={selectedOnly?0:1}
            onPress={(id)=>{
                if(id===0){
                    setSelectedOnly(true)
                } else if (id===1) {
                    setSelectedOnly(false)
                }
            }}/>
            <ListItems items={listItems} selectedOnly={selectedOnly} onPress={(id)=>{
                db.toggleItem(id);
                setRefreshList((i)=>i+1)
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
