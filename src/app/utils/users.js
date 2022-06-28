// This script tracks joining and leaving users

const users = [];

const addUser = ({id, username, roomName})=>{
    username = username.trim().toLowerCase();
    roomName = roomName.trim().toLowerCase();

    if(!username || !roomName) return {error: "Username and Room Name are required"};

    const userExists = users.find((user)=>{
        return user.username === username && user.roomName === roomName;
    })

    if(userExists) return {error: "Username has already been taken in this particular Chat room"}

    const user = {id, username, roomName}
    users.push(user);
    return {user}
};

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (roomName) => {
    roomName = roomName.trim().toLowerCase()
    return users.filter((user) => user.roomName === roomName)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}