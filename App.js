import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState,useRef} from 'react'
import * as db from './db'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import {ListItems} from './components/ListItems'
import {Selector} from './components/Selector'
import {NewItem} from './components/NewItem'
import {Title} from './components/Title'
import {EmptyList} from './components/EmptyList'
import {usePrevious} from './hooks/usePrevious'

export default function App() {
    const [listItems,setListItems]=useState({});
    const flatList=useRef()
    useEffect(()=>{
        console.log('initialising')
        db.migrate();
        db.getListItems((items)=>{
            setListItems(items)
        })},[]);
    const [selectedOnly,setSelectedOnly]=useState(false)
    const items=Object.values(listItems).filter(item=>item.selected===1||selectedOnly===false)
    const listView=items.length>0?
          <ListItems items={items}
                     ref={flatList}
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
                     }}/> : <EmptyList selectedOnly={selectedOnly}/>
    return (<SafeAreaView style={styles.container}>
              <StatusBar style="auto" />
              <Title/>
              <Selector items={[{id:1,title:"All"},
                                {id:0,title:"Selected"}]}
                        selectedId={selectedOnly?0:1}
                        onPress={(id)=>{
                            if(id===0){
                                setSelectedOnly(true)
                            } else if (id===1) {
                                setSelectedOnly(false)
                            }
                        }}/>
              {listView}
              <NewItem onAdd={(text)=>{
                  db.addItem(text,(id)=> setListItems((items)=>{
                      return {...items, [id]:{id:id,title:text,selected:1}}
                  }))
                  setTimeout(()=>{if(flatList.current!==undefined){flatList.current.scrollToEnd()}},100);
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
