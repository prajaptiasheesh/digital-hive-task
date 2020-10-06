import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
class Logout extends Component {


    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log(this.props.user);
    }
    signOut=()=>{

         let { history } = this.props

         localStorage.clear()

         history.push("/login")
    }

    getName = ()=>{

          let user = this.props.user

          if(user){

              return `${ user['first_name'] } ${ user['last_name'] }`
          }else{
              return '';
          }
    }

    render() {
        return (
            <div>
               
                <div className="logout">
                    <span className="text-success" >{this.getName()}</span>
                    <button onClick={this.signOut} className="text-uppercase">Sign Out</button>
                </div>
            </div>
        );
    }
}

export default Logout = withRouter(Logout );