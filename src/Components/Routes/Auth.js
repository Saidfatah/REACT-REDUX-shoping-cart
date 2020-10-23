import React,{useState} from 'react'
import { connect } from 'react-redux'
import Logging from '../Auth/Logging'
import Account from '../Auth/Account'
import Registering from '../Auth/Registering'

const Auth=({isAuthenticated})=> {
    const [authToggle, setauthToggle] = useState(true)
    return (
        <div className="container page">
            {
                isAuthenticated
                ?<Account />
                :( authToggle
                   ?<Logging setauthToggle={setauthToggle}/>
                   :<Registering setauthToggle={setauthToggle} />
                )
            }
        </div>
    )
}

export default connect(state=>({isAuthenticated : state.auth.isAuthenticated }))(Auth)
