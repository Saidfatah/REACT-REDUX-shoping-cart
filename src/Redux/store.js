import {createStore,applyMiddleware,compose,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {productsReducer} from './reducers/ProductReducer'
import {cartReducer} from './reducers/CartReducer'

const initialState={
    products:{
        items:[],
        filterdProducts:[]
    },
    cart:{
        items:[]
    }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose 

const  store = createStore(combineReducers({
        products: productsReducer,
        cart    : cartReducer 
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)
export default store
