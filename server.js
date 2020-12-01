// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.route('/api')
  .get(async (req, res) => {
    console.log('GET request detected');
    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const json = await data.json();
    console.log('data from fetch', json);
    res.json(json);
  })
  .post(async (req, res) => {
    console.log('POST request detected');
    console.log('Form data in res.body', req.body);

    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const json = await data.json();
    console.log('data from fetch', json);
    res.json(json);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

const dbSettings = {
  filename = './tmp/database.db', 
  driver: sqlite3.Database,
};

function databaseInitialize(){
  console.log(filename)
  var title = document.createElement("h2");
  title.innerHTML = "Food";

  var table = document.createElement("table");
  table.innerHTML = '<tr>'+
                      '<th>name</th> <th>category</th> <th>inspection_date</th>' +
                      '<th>inspection_results</th> <th>city</th> <th>state</th>' + 
                      '<th>zip</th> <th>owner</th> <th>type</th>' +
                    '</tr>'
}

app.route('/sql')
  .get(async (req, res) => {
    console.log('GET request detected');
    console.log('fetch request data', json);
  })
  .post(async (req, res) => {
    console.log('POST request detected');
    const json = await data.json();
    res.json(json);
  });

  function foodDataFetcher(){
    const data = await fetch("https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json");
    const json = await data.json();
    res.json(json);
  }

  function dataInput()