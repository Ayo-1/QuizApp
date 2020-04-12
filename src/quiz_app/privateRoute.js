import {Route, Redirect} from 'react-router-dom';
import React from 'react'



const PrivateRoute = ({component: Component, ...rest}) => {
	return(
		<Route {...rest} render={(props) => localStorage.getItem("usertoken")? <Component {...props} />: <Redirect to={{pathname: "/",
				state:{from: props.location.pathname }}}/>}/>
		) 
}

export default PrivateRoute