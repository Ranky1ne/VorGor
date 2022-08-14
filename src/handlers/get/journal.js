import { query } from "../../repository/query.js";
import { connection } from "../../repository/connection.js";
import { createObjectCsvWriter } from 'csv-writer';
import { _dirname } from "../../../dirname.js"; 

export const journal = async (request, response) => {
   const result = await query(connection, 'SELECT * FROM journal');
   const csvWriter = createObjectCsvWriter({
    path: './static/journal.csv',
    header: [
        {id: 'Номер Заявки', title: 'Номер Заявки'},
        {id: 'Номер ТТН', title: 'Номер ТТН'},
        {id: 'Заказчик', title: 'Заказчик'},
        {id: 'Перевозчик', title: 'Перевозчик'},
        {id: 'Объем', title: 'Объем'},
        {id: 'Марка машины', title: 'Марка машины'},
        {id: 'Номер машины', title: 'Номер машины'},
        {id: 'Сырье', title: 'Сырье'},
        {id: 'Дата\\Время', title: 'Дата\\Время'}
    ]
    
});
await csvWriter.writeRecords(result)       // returns a promise
    .then(() => {
        console.log('...Done');
    });
 _dirname(response,'/static/journal.csv')
}