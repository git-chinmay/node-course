function square(x){
    return x**2;
}

//Converting into arrow

//Type-1
// const sq = (x) => {
//     return x**2;
// }

//Type-2
// const sq = (x) => x**2;

// console.log(square(2));
// console.log(sq(2));


//Using arrow in an object
const party = {
    name: "Birth party",
    printGuestLists: function(){
        console.log(`Guest list of ${this.name}`);
    }
}


const party1 = {
    name: "Birth party",
    printGuestLists: () => {
        console.log(`Arrow: Guest list of ${this.name}`);
    }
}

party.printGuestLists();  //Guest list of Birth party
party1.printGuestLists(); //Guest list of undefined bcz arrow function dont have access to 'this' keyword
//So in object its advisable not to use arrow function like this. 
// There is no context for arrow here, it directly declared inside the object


//Another approach if using method inside an object: ES6 approach 
const evente = {
    name: "Birthday party",
    guestList: ['Angela', 'Ava'],
    printGuestLists(){
        console.log(`Guest List of ${this.name}`); //this: refer to evente
        console.log(this.guestList); //this: refers to events
        // this.guestList.forEach(function(guest){
        //     console.log(`${guest} attending the ${this.name}`); //this: callback function's this
        //     //Angela attending the undefined, bcz 'this' not evente here hence does not have 'name'
        // });

        //solution to above problem
        this.guestList.forEach((guest)=>{
            console.log(`${guest} attending the ${this.name}`); 
            //this: here arrow dot bind its own value instead it binds the value of the context under which it got created
            // Here the context is printGuestLists
            //Angela attending the Birthday party
        });
    }
}

evente.printGuestLists();