import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db.db");

export const migrate = () => {
    db.transaction(tx => {
        tx.executeSql(
            "create table if not exists list_items (id integer primary key not null, selected int, title text);");
    });
}

export const getListItems = (callback) => {
    db.transaction(tx => {
        tx.executeSql('select * from list_items',null,(tx,items)=>{
            callback(items.rows._array)
        })})
}

export const toggleItem = (id) => {
    db.transaction(tx => {
        tx.executeSql('update list_items set selected=not selected where id=?',[id])
    })
}

export const deleteItem = (id) => {
    db.transaction(tx => {
        tx.executeSql('delete from list_items where id=?',[id])
    })
}

export const addItem = (text) => {
    db.transaction(tx => {
        tx.executeSql('insert into list_items(selected,title) values (1,?)',[text])
    })
}
