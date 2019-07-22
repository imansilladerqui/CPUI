const initState = {
    user:[]
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        // case 'GET_USER': 
        //     return console.log(action.user)

        default:
            return state
    }
}

export default userReducer;