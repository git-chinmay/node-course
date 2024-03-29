const users = [];

const addUser = ({id, username, room}) => {
    //Clean the data
    username = username.trim().toLowerCase();
    room     = room.trim().toLowerCase();

    //Validate the data
    if(!username || !room){
        return {
            error: "username and room are required."
        }
    }

    //Check for existing user
    const existingUser = users.find((user)=>{
        return user.room === room && user.username === username
    })

    //Validate username
    if(existingUser){
        return {
            error: "username is in use."
        }
    }

    //Store user
    const user = {id, username, room}
    users.push(user);
    return {user};


}


// Remove user
const removeUser = (id) => {
    const index = users.findIndex((user)=>{
        return user.id === id;
    })

    if(index !== -1){
        return users.splice(index, 1)[0]; //Bcz splice return an array
    }
}


// Get User by id
const getUser = (id) => {
    // const findUser = users.find((user)=>{
    //     return user.id === id;
    // })
    // return findUser;
    return users.find((user) => user.id === id);
}


// Get all users in a room
const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase();
    const roomUserList = users.filter((user) => user.room === room)
    return roomUserList;

    // NOT REQUIRED
    // const userList = []
    // roomUserList.forEach((user)=>userList.push(user.username))
    // return userList;
}


module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
