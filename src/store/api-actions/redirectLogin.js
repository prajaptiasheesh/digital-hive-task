export default function redirectLogin(ownProps){

    localStorage.clear()

    ownProps.history.push("/blank_screen");
    
}