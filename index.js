// if this was a react project then: 
//import redux from 'redux'
const redux = require('redux')
const createStore = redux.createStore
const combineReducers = redux.combineReducers

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'



//STEP5: CREATE ACTIONS
function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}
function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}
function orderIcecream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}
function restockIcecream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}




//STEP1: CREATE INTIAL STATE
const initialCakeState = {
    numOfCakes: 10
}
const initialIcecreamState = {
    numOfIcecreams: 20
}





//STEP2: CREATE REDUCER
// (previousState, action) => newState
const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state, //we add this line so that if the object contains other properties, they are not changed, just numOfCakes changes
                numOfCakes: state.numOfCakes - 1
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state
    }
}
const icecreamReducer = (state = initialIcecreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state, //we add this line so that if the object contains other properties, they are not changed, just numOfCakes changes
                numOfIcecreams: state.numOfIcecreams - 1
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIcecreams: state.numOfIcecreams + action.payload
            }
        default:
            return state
    }
}





//STEP3: COMBINE ALL REDUCERS INTO ONE OBJECT AND PASS IT TO STORE
const rootReducer = combineReducers({
    cake: cakeReducer,
    icecream: icecreamReducer
})



//STEP4: CONNECT REDUCER TO STORE
const store = createStore(rootReducer)

console.log('Initial State: ', store.getState())

const unsubscribe = store.subscribe(() => console.log('Uppdated state: ', store.getState())) // runs everytime state is updated, return an unsubscribe method


//STEP6: CALL YOUR ACTIONS
store.dispatch(orderCake()) //dispatch method is used to call your action functions
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(restockCake(4))
store.dispatch(orderIcecream())
store.dispatch(orderIcecream())
store.dispatch(orderIcecream())
store.dispatch(orderIcecream())
store.dispatch(restockIcecream(4))

unsubscribe()

store.dispatch(orderCake()) //now console.log('Updated State') does not run as we unsubscribed
console.log('Final State: ', store.getState())