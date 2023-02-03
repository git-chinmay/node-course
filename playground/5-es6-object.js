//object property shorthand

const name = "John";
const userAge = 35

const user1 = {
    name: name,
    age: userAge,
    loaction: "Dublin"
}

//Above can also be wriiten in shorthand form
//Shrthand only possible if property name get it value from a varible with same name
const user2 = {
    name,
    age: userAge,
    loaction: "Dublin"
}

//Object Destructuring // accessing or assigning  the object properties
const product = {
    label: "Red Notebook",
    price: 100,
    stock: 203,
    salePrice: undefined
}

//Traditiona way
// const label = product.label;
// const price = product.price;

//ES6 way
const {label, price, rating} = product
console.log(label, price, rating); //program will not crash as rating not defined. we will get undefined

//If we want to use different lable for properties
const {label:productLabel, price:cost} = product 
console.log(productLabel, cost);

//We can use default value for an undefined property
//If value is defined then default value will be overplaced by definded value in object
const {lable:l, price:c, stars=4} = product
console.log(l, c, stars);

//We can destructure the object when passing as an argument to a function
const transaction = (type, {label, price}) => {
    console.log(type, label, price);
}

transaction('buy', product);


