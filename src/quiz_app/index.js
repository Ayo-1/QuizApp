import React from 'react';
import PrivateRoute from './privateRoute';
import {QuizAppContextProvider} from '../context/quizAppContext'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './login';
import Register from './register';
import Instructions from './instructions';
import Quiz from './quiz';
import Result from './result';
import Profile from './profile';
import Err404 from './404';


import "./utility/header.css"
const Index = () => {

	return(
		<QuizAppContextProvider>
		
			<Router>
				<Switch>
					<Route path="/" exact component={Login} />
					<Route path="/register" exact component={Register} />
					<PrivateRoute path="/instructions" exact component={Instructions} />
					<PrivateRoute path="/quiz" exact component={Quiz} />
					<PrivateRoute path="/result" exact component={Result} />
					<PrivateRoute path="/profile" exact component={Profile} />
					<PrivateRoute path="/" component={Err404} />
				</Switch>
			</Router>
		</QuizAppContextProvider>
		)
}

export default Index