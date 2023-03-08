/* MongoDB object id also called GU ID- Global Unique Id
It is different from SQL ID. This GUID is unique globally. It will not match any othere mongodb id in the world.
To intrepret this id: https://www.mongodb.com/docs/manual/reference/method/ObjectId/
*/


// Generating mongodb object id
const mongodb = require('mongodb')
const objectId = mongodb.ObjectId;

const objid = new objectId(); //new keyword is optional. if we dont use mongo will add it iternaly
console.log(objid) //new ObjectId("63f8541fe9c885baa7ecf5a2")
console.log(objid.toString()); //63f8541fe9c885baa7ecf5a2
console.log(objid.getTimestamp()) //2023-02-24T06:11:48.000Z

