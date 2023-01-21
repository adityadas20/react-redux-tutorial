const redux = require('redux')
const createStore = redux.createStore
//STEP0: IMPORT THUNK MIDDLEWARE
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')
const applyMiddleware = redux.applyMiddleware

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'


//STEP1: CREATE ACTIONS 
const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED
    }
}
const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users
    }
}
const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
}
const fetchUsers = () => { //ASYNC FUNCTION
    return function (dispatch) { // this function does have the dispatch method bcoz of thunk
        dispatch(fetchUsersRequest())
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                // response.data is the users
                const users = response.data.map(user => user.id)
                dispatch(fetchUsersSuccess(users)) //dispatch method is used to call your action functions
            })
            .catch(error => {
                // error.message is the error message
                dispatch(fetchUsersFailure(error.message))
            })
    }
}

//STEP2: CREATE REDUCERS
const reducer = (state = initialState, action) => {
    console.log(action.type)
    switch (action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCEEDED:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
    }
}


//STEP3: PASS THUNK TO STORE, THIS ALLOWS ACTION CREATORS TO RETURN A FUNCTION INSTEAD OF AN ACTION-OBJECT TO PERFORM ASYNC TASKS
const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => { // subscribe to console.log whenever state changes
    console.log(store.getState())
})

//STEP4: CALL YOUR ACTIONS
store.dispatch(fetchUsers())