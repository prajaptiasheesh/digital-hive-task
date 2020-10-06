import React, { Component } from 'react';
import { connect } from "react-redux";
import Logout from '../../components/logout/Logout';

const mapStateToProps = (state, ) => ({
    user: state.user
})
const mapDispatchToProps = (dispatch, ownProps) => ({})
  
class Portal extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: null
        }
    }
    closeSidebar=()=>{
        this.props.closeSidebar()
    }

    componentDidMount(){

         let token = JSON.parse( localStorage.getItem("token"))

         this.setState({ user: token });
         if(!token){
             this.props.history.push("/login")
         }
    }

    logout = ()=>{
        localStorage.removeItem('token');
        this.props.history.push('/login');
    }

    render() {

        const { user } = this.state;

        return (
            <div className="container-fluid">
                <div className=" d-flex justify-content-between" >
                
                   Logged in
                   <Logout user={ this.state.user } />
                </div>
                <table class="table table-striped" style={{width: '50%'}} >
                    <tbody>
                        <tr>
                            <th >First Name</th>
                            <td>{ user && user.first_name ? user.first_name : 'N/A' }</td>
                        </tr>
                        <tr>
                            <th >Last Name</th>
                            <td>{ user && user.last_name ? user.last_name : 'N/A' }</td>
                        </tr>
                        <tr>
                            <th >Developer</th>
                            <td>{ user && user.isDeveloper ? "Yes" : 'No' }</td>
                        </tr>
                        <tr>
                            <th >Schooling</th>
                            <td>{ user && user.schooling ? user.schooling : 'N/A' }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Portal= connect(mapStateToProps, mapDispatchToProps)(Portal);
