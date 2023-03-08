const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'task-manager-db';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName); // creating a db or collection
  const collection = db.collection('users'); //adding a table name user to collection

  // the following code examples can be pasted here...
    //const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
    //console.log('Inserted documents =>', insertResult);
    const insertUser = await collection.insertOne({name: "Chinmay", age: 32}) //Inserting a row or document
    console.log("Inserted user document => ", insertUser);
//   db.collection('users').insertOne({
//     name: "Andrew",
//     age: 30
//     })

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());