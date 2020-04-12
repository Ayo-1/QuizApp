import React, {useContext, useState} from 'react';
import Header from './utility/header';
import Footer from './utility/footer';
import {Link, withRouter} from 'react-router-dom';
import {QuizAppContext} from '../context/quizAppContext.js';
import Answer from './utility/answer.png'
const Result = (props) => {
let [opn, setOpn] = useState(false)
const {user, userLoading} = useContext(QuizAppContext)
        const show = () => {
	document.getElementById("sidebar").classList.toggle('active')
	setOpn(!opn)
}
const nav = <div className="bg-dark navbar text-light" id="brnd">
		<h3 className="brnd mx-2">Quiz App</h3>
		<button type="button" id="sidebarCollapse" onClick={show} className="btn btn-outline-light mx-2 my-1 float-right">
               <i className={opn? "fas fa-times": "fas fa-bars"}></i>     
            </button>
        </div>;

if(userLoading){
	return(
<div style={{marginTop: "45vh"}}>
	<div id="circleG">
		<div id="circleG_1" className="circleG"></div>
		<div id="circleG_2" className="circleG"></div>
		<div id="circleG_3" className="circleG"></div>
	</div>
</div>)
}else if(!user.result){
return(
	<main>
{nav}
		<div className="wrapper">
		<Header/>
		<div className="container" id="content">
			<center>
			<ul className="col-md-9 breadcrumb mt-3 bg-dark text-light">
  <li className="breadcrumbs-item text-capitalize">Quiz App{props.location.pathname}</li>
  </ul>
<div style={{marginTop: "30vh", marginBottom: "10vh", padding: "40px"}} className="col-md-6"><img src={Answer} height="20%" width="20%" alt="noresult" /><h6>No result yet, please take</h6> <Link to="/quiz" className="nav-link h5">Quiz</Link></div>
</center>
<Footer />
</div>

</div>

</main>
)
}
else{
	return(
<main>
{nav}
		<div className="wrapper">
		<Header/>
		<div className="container" id="content">
			<center>
			<ul className="col-md-9 breadcrumb mt-3 bg-dark text-light">
  <li className="breadcrumbs-item text-capitalize">Quiz App{props.location.pathname}</li>
  </ul>

				<div className="col-md-5 px-3 py-3 my-5">
					<table className="table table-bordered table-hover" style={{border: "1px solid black"}}>
					<thead> 
					<tr>
						<td className="font-weight-bold" style={{color: "#ff4d52"}} >Full Name</td>
						<td>{user.fullName}</td>
					</tr>
					<tr>
						<td className="font-weight-bold" style={{color: "#ff4d52"}} >Username</td>
						<td>{user.userName}</td>
					</tr>
					<tr>
						<td className="font-weight-bold" style={{color: "#ff4d52"}} >Email Address</td>
						<td>{user.email}</td>
					</tr>
					<tr>
						<td className="font-weight-bold" style={{color: "#ff4d52"}} >Nationality</td>
						<td>{user.nationality}</td>
					</tr>
					<tr>
						<td className="font-weight-bold" style={{color: "#ff4d52"}} >Gender</td>
						<td>{user.gender}</td>
					</tr>
					<tr>
						<td className="font-weight-bold" style={{color: "#ff4d52"}} >Score</td>
						<td>{user.result.score}</td>
					</tr>
					<tr>
						<td className="font-weight-bold" style={{ color: "#ff4d52"}} >Grade</td>
						<td>{user.result.grade}</td>
					</tr>
					</thead>
					</table>
				</div>
				<br/>
				<br/>
				<Footer />
			</center>
			</div>
		</div>
</main>
		)}

}

export default withRouter(Result)