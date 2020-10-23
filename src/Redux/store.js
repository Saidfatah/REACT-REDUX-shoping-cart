import {createStore,applyMiddleware,compose,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {productsReducer} from './reducers/ProductReducer'
import {cartReducer} from './reducers/CartReducer'
import { authReducer } from './reducers/AuthReducer'
import { ordersReducer } from './reducers/OrdersReducer'
import { errorsReducer } from './reducers/ErrorsReducer'

const initialState={
    products:{
        items:[],
        filterdProducts:[]
    },
    cart:{
        items:[],
    },
    orders:{
        items:[],
        canOrder:true,
    },
    auth:{
        token:localStorage.getItem('token'),
        isAuthenticated:null,
        isLoading:false , 
        user:JSON.parse(localStorage.getItem('user')),
    },
    error:{
        msg:null,
        status:null,
        id:null
    }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose 

const  store = createStore(combineReducers({
        products: productsReducer,
        cart    : cartReducer ,
        orders  : ordersReducer ,
        auth    : authReducer,
        error   : errorsReducer ,
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)
export default store
