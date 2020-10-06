import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Portal } from '../view/layout'
import BlankScreenComponent from '../view/components/BlankScreen';
import { Login } from '../view/auth-components';

export default class Routes extends Component {
   

    render() {
        return (
            <Switch>
                <Route exact={true} path="/" component={Login} />
                <Route path="/login" component={Login} />
                <Route path='/blank_screen' component={BlankScreenComponent} />
                <Route path="/user" render={(props)=>{
                    
                    let token = JSON.parse( localStorage.getItem("token"))
                    
                    if(token && token){
                    return <Portal {...props} />
                    }else{
                    return <Redirect from="/user" to="/login" />
                    }
                    } }/>
                <Route path="*" render={() => <h1>Page not found</h1>} />
            </Switch>
        )
    }
}
