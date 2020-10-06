import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db.db");

export const migrate = () => {
    console.log('executing transaction')
    db.transaction(tx => {
        console.log('creating table')
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
