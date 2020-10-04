import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import {ListItems} from './components/ListItems'
import {Selector} from './components/Selector'

export default function App() {
    const [selectedOnly,setSelectedOnly]=useState(false)
    return (<SafeAreaView style={styles.container}>
            <Selector
            items={[{id:0,title:"Selected"},
                    {id:1, title:"All"}]}
            selectedId={selectedOnly?0:1}
            onPress={(id)=>{
                if(id===0){
                    setSelectedOnly(true)
                } else if (id===1) {
                    setSelectedOnly(false)
                }
            }}/>
          <ListItems selectedOnly={selectedOnly}/>
          <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
