import { StatusBar } from 'expo-status-bar';
import React,{ useEffect, useState, useRef, useReducer } from 'react'
import * as db from './db'
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Linking } from 'react-native'
import { ListItems } from './components/ListItems'
import { Selector } from './components/Selector'
import { NewItem } from './components/NewItem'
import { Title } from './components/Title'
import { EmptyList } from './components/EmptyList'
import { AppLoading } from 'expo';
import { Menu } from './components/Menu'
import * as Util from './util'

const reducer=(state, action) => {
    switch(action.type) {
    case 'appLoaded':
        return {...state,loaded:true}

    case 'setListItems':
        return {...state,refresh:false,items:action.items}

    case 'toggleMenuOpen':
        return {...state,menuOpen:!state.menuOpen}

    case 'setSelectedOnly':
        return {...state,selectedOnly:action.selectedOnly}

    case 'deleteItem':
        db.deleteItem(action.id);
        return {...state,refresh:true}

    case 'toggleItem':
        db.toggleItem(action.id);
        return {...state,refresh:true}

    case 'selectAll':
        db.selectAll();
        return {...state,refresh:true}

    case 'deselectAll':
        db.deselectAll();
        return {...state,refresh:true}

    case 'removeAll':
        db.removeAll();
        return {...state,refresh:true}

    case 'addItem':
        db.addItem(action.text)
        return {...state,refresh:true}

    case 'showPrivacyPolicy':
        Linking.openURL('http://select-list.co.uk.s3.eu-west-2.amazonaws.com/privacy-policy.html');
        return state
    }
}

export default function App() {

    const [ state, dispatch ] = useReducer(reducer, {refresh:true,selectedOnly:false})

    // migrate the database on startup
    useEffect(() => {
        db.migrate()
    },[])

    // refresh the list of items on startup and after inserting a new item
    useEffect(() => {
        if(state.refresh){
            db.getListItems((items) =>  {
                dispatch({type:'setListItems',items:items})
            })
        }},[state.refresh])

    // if we have the list items, we're loaded
    useEffect(() => {
        if(!state.loaded && state.items) {
            dispatch({type:'appLoaded'})
        }
    },[state.refresh,state.items])

    const visibleItems = state.items ? state.items.filter(item=>item.selected===1||state.selectedOnly===false) : []

    const flatList = useRef()

    const listView = visibleItems.length>0?
          <ListItems items={visibleItems}
                     ref={flatList}
                     dispatch={dispatch}/> : <EmptyList selectedOnly={state.selectedOnly}/>

    return (!state.loaded? <AppLoading/> :
            <SafeAreaView style={styles.container}>
              <StatusBar style="auto" />
              <Menu menuOpen={state.menuOpen}
                    dispatch={dispatch}/>
              <Title dispatch={dispatch}/>
              {listView}
              <Selector items={[{id:1,title:"All"},
                                {id:0,title:"Selected"}]}
                        selectedId={state.selectedOnly?0:1}
                        dispatch={dispatch}/>
              <NewItem dispatch={dispatch}/>
            </SafeAreaView>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    scrollView:{
        width:"100%"
    }
});
