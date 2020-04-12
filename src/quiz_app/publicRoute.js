import {Route, Redirect} from 'react-router-dom';
import React, {useContext} from 'react'
import {QuizAppContext} from '../context/quizAppContext'

const PublicRoute = ({component: Component, ...rest}) => {
	const {user} = useContext(QuizAppContext);
	return(
	<Route {...rest} render={(props) => user.userName? <Redirect to="/instructions"/>:<Component {...props}/>} />
	)
}
export default PublicRoute