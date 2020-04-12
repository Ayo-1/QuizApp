import React, {useContext, useState} from 'react';
import Header from './utility/header';
import Footer from './utility/footer';
import {QuizAppContext} from '../context/quizAppContext';
import {Redirect} from 'react-router-dom'

const Instructions = (props) => {
  let [opn, setOpn] = useState(false)
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
const {userLoading, user} = useContext(QuizAppContext)

if(userLoading){
  return(
    <div style={{marginTop: "45vh"}}>
  <div id="circleG">
    <div id="circleG_1" className="circleG"></div>
    <div id="circleG_2" className="circleG"></div>
    <div id="circleG_3" className="circleG"></div>
  </div>
</div>
)
}else{

  return(
<main>
{nav}
    <div className="wrapper">
    <Header />
    <div  id="content">
  <center className="px-3">
  <ul className="col-md-9 breadcrumb mt-3 bg-dark text-light">
  <li className="breadcrumbs-item text-capitalize">Quiz App{props.location.pathname}</li>
  </ul>
       <div className="card col-md-6 mt-5 py-3 px-2" style={{marginBottom: "10px"}}>
                <div className="callout callout-danger">
                  <h5>Instructions</h5>

                  <p>You are to answer all questions. Your result will be available on completion of the Quiz.</p>
                  <ul className="list-group">
                  <h6 className="float-left">Grading</h6>
                  <li className="list-group-item text-success">70 - 100 : A</li>
                  <li className="list-group-item text-primary">60 - 69 : B</li>
                  <li className="list-group-item text-info">50 - 59 : C</li>
                  <li className="list-group-item text-warning">40 - 49 : D</li>
                  <li className="list-group-item text-danger">0 - 39 : F</li>
                  </ul>
                </div>
                <center>
                <button className="btn btn-sm w-50 mt-3 mb-3 btn-outline-dark" onClick={() => props.history.push('/quiz')}>To Quiz</button>
               </center>
               </div>
             </center>
             <br/>
             <Footer />
           </div>

    </div>
</main>
    )
  }
}

export default Instructions