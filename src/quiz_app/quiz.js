import React, {useContext, useState} from 'react';
import Header from './utility/header';
import {QuizAppContext} from '../context/quizAppContext.js';
import Footer from './utility/footer';
import {Link, withRouter} from 'react-router-dom';

const Quiz = (props) => {
	let [opn, setOpn] = useState(false)
	const show = () => {
	document.getElementById("sidebar").classList.toggle('active')
	setOpn(!opn)
}
	const {currentQuestion, questions, answer, submit, completed, user, userLoading, resultLoading} = useContext(QuizAppContext)
	const answerQuestion = (e) => {
answer(e.target.value)
	}
	var subVar = <h6 style={{textTransform: "italic" }} className="px-2 py-3">All questions answered, Please submit</h6>
const options =  currentQuestion? currentQuestion.options.map(answer => <input onClick={answerQuestion} key={answer} className="btn btn-outline-secondary my-2 mx-2" value={answer} readOnly/>) : null
	

	const nav = <div className="bg-dark navbar text-light" id="brnd">
		<h3 className="brnd mx-2">Quiz App</h3>
		<button type="button" id="sidebarCollapse" onClick={show} className="btn btn-outline-light mx-2 my-1 float-right">
             <i className={opn? "fas fa-times": "fas fa-bars"}></i>     
            </button>
        </div>;

if(userLoading){
	return(<div style={{marginTop: "45vh"}}>
	<div id="circleG">
		<div id="circleG_1" className="circleG"></div>
		<div id="circleG_2" className="circleG"></div>
		<div id="circleG_3" className="circleG"></div>
	</div>
</div>
)
}else{      
if(user.result){
		return(
		<main>
		{nav}
		<div className="wrapper">
		<Header />
			<div className="container" id="content">
				<center>
				<ul className="col-md-9 breadcrumb mt-1 bg-dark text-light">
  <li className="breadcrumbs-item text-capitalize">Quiz App{props.location.pathname}</li>
  </ul>
  <div style={{marginTop: "200px", marginBottom: "200px"}}>
				<h3 className="text-success">Congratulations</h3><h4>You have successfully completed the quiz</h4><Link to="/result" className="nav-link">View result</Link>
		</div>		</center>
				<Footer />
			</div>
		</div>
		</main>
				)
}else if(questions.length === 0){
		return(
		<main>
		{nav}
		<div className="wrapper">
		<Header />
			<div className="container" id="content">
				<center>
				<ul className="col-md-9 breadcrumb mt-1 bg-dark text-light">
  <li className="breadcrumbs-item text-capitalize">Quiz App{props.location.pathname}</li>
  </ul>
				<h4 style={{marginTop: "200px",marginBottom:"200px"}}>No questions available</h4>
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
		<Header />
			<div className="container" id="content">
				<center>
				<ul className="col-md-9 breadcrumb mt-1 bg-dark text-light">
  <li className="breadcrumbs-item text-capitalize">Quiz App{props.location.pathname}</li>
  </ul>
					<Link to="/Instructions" className="nav-link text-success mt-2 mb-1">View Instructions</Link>
					<div className="col-md-4 mb-3 pt-5 pb-5 quizcontainer">

						<span className="num">{currentQuestion? currentQuestion.id : <i className="spinner spinner-sm spinner-border spinner-success"></i>}</span>
						<p className="question h6">{currentQuestion? currentQuestion.question: <i className="spinner spinner-sm spinner-border spinner-success"></i>}</p>
						<hr/>
					{completed ? subVar :  options}
					
					</div>	

					{completed? <button className="btn btn-dark" onClick={resultLoading? null: submit}>{resultLoading? "Loading..." : "submit"}</button> :  <button className="btn btn-dark"><i className="fas fa-lock mx-2"></i>submit</button>}
		</center>
<Footer />
	</div>
		</div>
</main>
		)

}
	}
}

export default withRouter(Quiz)
