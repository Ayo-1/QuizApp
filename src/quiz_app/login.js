import React, {useContext, useState} from 'react';
import {QuizAppContext} from '../context/quizAppContext.js';
import {Link, withRouter, Redirect} from 'react-router-dom';
import AlertErr from './utility/alertErr'
const Login = (props) => {
	const loader = <div className="spinner spinner-border spinner-fast spinner-dark"></div>

	const [email, setEmail] = useState("")
	const {login, authErr, authLoading, setAuthErr} = useContext(QuizAppContext)
	const [password, setPassword] = useState("")
	const handleSubmit = (e) => {
			e.preventDefault()
			login(email, password)
			if(localStorage.getItem('usertoken')){
						setEmail("")
						setPassword("")}
	}
	if(localStorage.getItem('usertoken')){
		return <Redirect to="/instructions" />
	}else{

	return(

		<div className="container">
			<center>
			<div className="col-sm-4 mt-3 mb-2 pt-1 pt-2"> {authErr? <AlertErr msg={authErr}  close={() => setAuthErr("")} err={authErr}/> : null}</div>
				<div className="col-sm-4 mt-5 mb-5 pt-5 pb-5 bg-dark">
					<form onSubmit={handleSubmit}>
					<input type="email" className="form-control mt-3 mb-" id="rad" name="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="email address" required/>
					<input type="password" className="form-control mt-3 mb-3" id="rad2" name="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password" required/>
					<button type="submit" className="primarybtn">{authLoading? loader : "Login"}</button>
					</form>
					<hr/>
					<p className="text-secondary">Not a Member?</p>
					<Link to="/register" className="nav-link h6 text-light">Sign Up</Link>
				</div>
			</center>
	</div>

		)
	}
}

export default withRouter(Login)
