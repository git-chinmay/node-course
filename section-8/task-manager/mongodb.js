//Practicing CRUD
// Reference for commands: https://mongodb.github.io/node-mongodb-native/5.0/


/*  NOTE: THIS CODE FROM COURSE NOT WORKING HENCE USE THE SECOND TYPE

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// Connection URL
const connectionURL = 'mongodb://127.0.0.1:27017'; //Do not type localhost bcz it sometimes cause issues

// DB Name
const databaseName = "task-manager-db";

MongoClient.connect(connectionURL, { useNewUrlParser: true}, 
    (error, client)=>{
    if (error){
        return console.log("Unable to connect to db.");
    }

    console.log("Connected to db.");
    const db = client.db(databaseName);
    db.collection('users').insertOne({
        name: "Andrew",
        age: 30
    }, (error, result) => {
        if(error){
            return console.log('Unbale to insert User.')
        }

        console.log(result.ops);
    })
})

*/


////////////////////////////////////////////////////////
/////// TYPE-2 FROM API DOCUMENT //////////////
//https://mongodb.github.io/node-mongodb-native/5.0/
///////////////////////////////////////////////////////

// const { MongoClient } = require('mongodb');
// // or as an es module:
// // import { MongoClient } from 'mongodb'

// // Connection URL
// const url = 'mongodb://127.0.0.1:27017';
// const client = new MongoClient(url);

// // Database Name
// const dbName = 'task-manager-db';

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName); // creating a db or collection
//   //const collection = db.collection('users'); //adding a table name user to collection

//   // insert one document(one row) at a time//
//   //const insertUser = await collection.insertOne({name: "Chinmay", age: 32})
//   //console.log("Inserted user document => ", insertUser);

//   // insert many document at a time
//   const manyUser = await collection.insertMany([{name: "Angela", age:34}, {name: "Dany", age: 34}])
//   console.log("Inserted user document => ", manyUser);



//   return 'done.';
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());



////////////////////////////////////////////////////////////////////////////
/////// TYPE-3 COMBINING APPROACH OF BOTH API DOC AND COURSE //////////////
//https://mongodb.github.io/node-mongodb-native/5.0/
////////////////////////////////////////////////////////////////////////////


// const { MongoClient } = require('mongodb');
// // or as an es module:
// // import { MongoClient } from 'mongodb'

// // Connection URL
// const url = 'mongodb://127.0.0.1:27017';
// const client = new MongoClient(url);

// // Database Name
// const dbName = 'task-manager-db';

// async function main() {

//     // Use connect method to connect to the server
//     await client.connect();
//     console.log('Connected successfully to server');
//     const db = client.db(dbName); // creating a db or collection

//     // await db.collection('users').insertOne({
//     //     name: "Jenny",
//     //     age: 20
//     // }, (error, result) => {
//     //     if(error){
//     //         return console.log("Unbale to insert User.")
//     //     }
//     //     console.log(result.ops);
//     // })

//     await db.collection('tasks').insertMany([{
//         task: "PHP Receipts",
//         complete: true
//     }, 
//     {
//         task: "Node course",
//         complete: false,
//     }, 
//     {
//         task: "Market analysis",
//         complete: false
//     }], (error, result) => {
//         if (error){
//             return console.log("Unable to insert doc.")
//         }
//         console.log(result.ops)
//     })

//   return 'done.';
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());


/// ITS ADVISABLE TO USE TYPE-2 THE API DOC APPROACH AS ITS UPDATED ONE ///
// Insert a record to 'user' document with id.
// But in real world rarely we do that as mongo db already inserting an id for us.


// const { MongoClient, ObjectId } = require('mongodb');

// //Getting GUID
// const objid = new ObjectId();
// id = objid.toString();
// console.log(`Genereted Id: ${id}`);
// // Connection URL
// const url = 'mongodb://127.0.0.1:27017';
// const client = new MongoClient(url);

// // Database Name
// const dbName = 'task-manager-db';

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   //const collection = db.collection('users')
//   const oneUser = await db.collection('users').insertOne({_id: id, name: "kunny", age:100})
//   console.log("Inserted user document => ", oneUser);

//   return 'done.';
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());



/// QUERYING DOCUMENTS ///

// const { MongoClient, ObjectId } = require('mongodb');

// // Connection URL
// const url = 'mongodb://127.0.0.1:27017';
// const client = new MongoClient(url);

// // Database Name
// const dbName = 'task-manager-db';

// async function main() {
//     // Use connect method to connect to the server
//     await client.connect();
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);
//     //Will fetch all records
//     //const findresult = await db.collection('users').find({}).toArray();

//     //Conditial fetch
//     //const findresult = await db.collection('users').find({ name: 'Dany' }).toArray();

//     // const findresult = await db.collection('users')
//     //                             .find({_id: new ObjectId("63f849bb54db4bb9d00d9084")})
//     //                             .toArray()

//     //Find multiple records
//     const findresult = await db.collection('tasks')
//                                 .find({complete: false})
//                                 .toArray()
                                

//     const resultCount = await db.collection('tasks')
//                                 .find({complete: false})
//                                 .count()

//     console.log('Found documents =>', findresult);
//     console.log('Document Count =>', resultCount);

//     return 'done.';
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());



//// UPDATING A RECORD IN DOCUMENT ////

// const { MongoClient, ObjectId } = require('mongodb');

// // Connection URL
// const url = 'mongodb://127.0.0.1:27017';
// const client = new MongoClient(url);

// // Database Name
// const dbName = 'task-manager-db';

// async function main() {
//     // Use connect method to connect to the server
//     await client.connect();
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);
    

//     const updateResult = await db.collection('users')
//                                 .updateOne({ name: "kunny" }, 
//                                            { $set: { age: 500 } });
    
//     console.log('Updated documents =>', updateResult);

//     // const findResult = await db.collection('users')
//     //                         .find({ name : "kunny"}) //toArray will not work with findOne()
//     //                         .toArray();
//     // console.log(findResult);

//     return 'done.';
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());



/////////////////////////////////////////////////////
////  USING THE FUNCTION LITTLE BIT DIFFERENTLY ///
//////////////////////////////////////////////////////

// const { MongoClient, ObjectId } = require('mongodb');

// // Connection URL
// const url = 'mongodb://127.0.0.1:27017';
// const client = new MongoClient(url);

// // Database Name
// const dbName = 'task-manager-db';


// // Use connect method to connect to the server
// //await client.connect();
// client.connect();
// console.log('Connected successfully to server');
// const db = client.db(dbName);

// // const updateResultPromise = db.collection('users')
// //                             .updateOne({ name: "kunny" }, 
// //                                        { $set: { age: 51 } });

// // console.log('Updated documents =>', updateResultPromise);


// //UpdateMany
// const updateResultPromise = db.collection('tasks')
//                             .updateMany({ complete: false }, 
//                                        { $set: { complete: true } });

// console.log('Updated documents =>', updateResultPromise);

// updateResultPromise.then((result)=>{
//     console.log("Modified count: ", result.modifiedCount);
// }).catch((error)=>{
//     console.log(error);
// }).finally(() => client.close());


//////////////////////////
/// DELETE DOCUMENTS ///
//////////////////////////

const { MongoClient, ObjectId } = require('mongodb');

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'task-manager-db';


// Use connect method to connect to the server
//await client.connect();
client.connect();
console.log('Connected successfully to server');
const db = client.db(dbName);

//DeleteMany
const deletedResultPromise = db.collection('users')
                            .deleteMany({ age: 3 });

console.log('Updated documents =>', deletedResultPromise);

deletedResultPromise.then((result)=>{
    console.log("Deleted Count", result.deletedCount);
}).catch((error)=>{
    console.log(error);
}).finally(() => client.close());


