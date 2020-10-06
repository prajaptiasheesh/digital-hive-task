import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoginApi } from '../../../store/api-actions/LoginApi';
import InputBox from '../../commonComponents/form/inputBox/InputBox';
import logo from '../../../assets/images/logo/logo.png';
import { Formik, getIn } from 'formik';
import { VALIDATION_SCHEMA } from '../../../constants/ValidationSchema';

const mapStateToProps = (state) => ({
    success: state.login.success,
    error: state.login.error,
    isLogging: state.login.isLogging
})

const mapDispatchToProps = (dispatch) => ({ login: (form) => dispatch(LoginApi(form)) })


class Login extends Component {

    constructor(props){
        super(props)

        this.state = {
            message:""
        }
    }

    componentWillUnmount(){

        this.setState({message:""})
    }

    handleSubmit=(values)=>{
        // console.log(values , this.props.login);
        
        
        let user = {}
        for(let key in values){
            user[key] = values[key]
        }
        

        this.props.login(user)
        
    }

    componentWillMount(){

        let token = JSON.parse( localStorage.getItem("token"))

        if(token){
            this.props.history.push('/user')
        }else{
            // this.handleSubmit({user_id:"999999999",password:'password'})
        }
    }

    componentWillReceiveProps(nextProps){
        let { success } = nextProps

        if(success){

            this.props.history.push('/user')
            
        }

    }
    
    render() {
        let { success, error } = this.props;
        

        return (
            <>
                <div className="login-panel d-flex align-items-center justify-content-center">
                    <div className="login-wrapper ">
                        <div className="header">
                            <div className="logo">
                                <img src={logo} alt="Dominion" className="w-100" />
                            </div>
                        </div>
                        <div className="body">
                        <span style={ (success) ? {color:"green"} :{color:"red"}} > {error} </span>
                        <Formik
                        initialValues={{ email: "", password: "" }}
                        onSubmit={this.handleSubmit}
                        validationSchema={VALIDATION_SCHEMA.LOGIN}
                        render={({ values, errors, handleChange, touched, handleBlur, handleSubmit, isSubmitting }) => (

                            <form onSubmit={handleSubmit} >
                            
                                <div className="login-form">
                                    <div className="username">
                                        <InputBox
                                            value={values.email}
                                            name="email"
                                            handleChange={handleChange}
                                            formWrapClass="login-input"
                                            type="text"
                                            errorText={getIn(touched, `email`) && getIn(errors, `email`)}
                                            inputClass="form-control"
                                            errorClass="input-error-text" />
                                    </div>
                                    <div className="password">
                                        <InputBox
                                            value={values.password}
                                            name="password"
                                            handleChange={handleChange}
                                            errorText={getIn(touched, `password`) && getIn(errors, `password`)}
                                            type="password"
                                            inputClass="form-control"
                                            errorClass="input-error-text" />
                                    </div>
                                </div>
                                <div className="footer">
                                    <div className="btn-wrapper">
                                        <button type="submit" disabled={Object.keys(errors).length ? true: false} className="button-primary">LOG IN</button>
                                    </div>
                                </div>
                           

                            </form>)}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Login = connect(mapStateToProps, mapDispatchToProps)(Login);;
