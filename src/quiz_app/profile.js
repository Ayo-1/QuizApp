import React, {useContext, useState} from 'react';
import maleAvatar from './utility/maleAvatar.png';
import femaleAvatar from './utility/femaleAvatar.png';
import Header from './utility/header';
import Footer from './utility/footer';
import {withRouter} from 'react-router-dom';
import {QuizAppContext} from '../context/quizAppContext'
import Modal from 'react-bootstrap/Modal'
import AlertErr from './utility/alertErr'
const Profile = (props) => {
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
const clr = () => {
	setEditErr("")
	setEditItem("")
}
        const {user, userLoading, update, editErr, editLoading, setEditErr} = useContext(QuizAppContext);
        const [isOpen, setIsOpen] = useState(false)
        const [email, setEmail] = useState("")
        const [dob, setDob] = useState("")
        const [username, setUsername] = useState("")
        const [fullname, setFullname] = useState("")
        const [gender, setGender] = useState("")
        const [nationality, setNationality] = useState("")
        const [editItem, setEditItem] = useState()
        const showModal = (e) => {
        	setIsOpen(true)
        	setEditItem(e.target.id)
        }

        const hideModal = () => {
        	setIsOpen(false)
        	clr()
        }
        const submit = (e) => {
        	e.preventDefault()
        	if(editErr){
        		setEditErr("")
        	}
        	const emailUrl = "https://ay-quiz-app-server.herokuapp.com/update/email" 
        	const fullnameUrl = "https://ay-quiz-app-server.herokuapp.com/update/fullname"
        	const usernameUrl = "https://ay-quiz-app-server.herokuapp.com/update/username"
        	const nationalityUrl = "https://ay-quiz-app-server.herokuapp.com/update/nationality"
        	const genderUrl = "https://ay-quiz-app-server.herokuapp.com/update/gender"
        	const dobUrl = "https://ay-quiz-app-server.herokuapp.com/update/dob"
         if(editItem === "email"){
               update(email, emailUrl, editItem)
       }  
       else if(editItem === "username"){
              update(username, usernameUrl, editItem)
       }
       else if(editItem === "fullname"){
               update(fullname, fullnameUrl, editItem)
       }
        else if(editItem === "gender"){
               update(gender, genderUrl, editItem)
       }        	     	       	
        else if(editItem === "nationality"){
               update(nationality, nationalityUrl, editItem)
       }        	
        else if(editItem === "dob"){
               update(dob, dobUrl, editItem)
       }
 	
      	setEmail("")
      	setUsername("")
      	setFullname("")
      	setDob("")
      	setGender("")
      	setNationality("")

        }


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
}
else{
	return(
<main>
{nav}
<div className="wrapper">
<Header />
<div id="content" className="py-2 px-2">
<center>
<ul className="col-md-9 breadcrumb mt-3 bg-dark text-light">
  <li className="breadcrumbs-item text-capitalize">Quiz App{props.location.pathname}</li>
  </ul>
<div className="card ">
<center>

  <img src={user.gender === "Male" || user.gender === "male"? maleAvatar : femaleAvatar} alt="John" className="img-thumbnail mt-2" height="30%" width="30%"/></center>
 
  <p className="title">{user.userName}</p>

  <p>
	<strong style={{fontWeight: "bold", color: "#ff4d52"}} className="h5">Full Name</strong>: {user.fullName} <i className="fas fa-pen" onClick={showModal} style={{cursor: "pointer"}} id="fullname"></i>
	</p>
	<p>
	<strong style={{fontWeight: "bold", color: "#ff4d52"}} className="h5">Username</strong>: {user.userName} <i className="fas fa-pen" onClick={showModal} style={{cursor: "pointer"}} id="username"></i>
	</p>
	<p >
	<strong style={{fontWeight: "bold", color: "#ff4d52"}} className="h5">Email</strong>: {user.email} <i className="fas fa-pen" onClick={showModal} style={{cursor: "pointer"}} id="email"></i>
	</p>
	<p>
	<strong style={{fontWeight: "bold", color: "#ff4d52"}} className="h5">Nationality</strong>: {user.nationality} <i className="fas fa-pen" onClick={showModal} style={{cursor: "pointer"}} id="nationality"></i>
	</p>
	<p>
	<strong style={{fontWeight: "bold", color: "#ff4d52"}} className="h5">Gender</strong>: {user.gender} <i className="fas fa-pen" onClick={showModal} style={{cursor: "pointer"}} id="gender"></i>
	</p>
	<p>
	<strong style={{fontWeight: "bold", color: "#ff4d52"}} className="h5">DOB</strong>: {user.dob} <i className="fas fa-pen" onClick={showModal} style={{cursor: "pointer"}} id="dob"></i>
	</p>
	</div>
</center>
<Footer/>
 </div>
<Modal show={isOpen} onHide={hideModal} size="md">
<Modal.Header><p>Edit <b className="text-capitalize">{editItem}</b></p></Modal.Header>
<Modal.Body>
{editErr ? <div className="mt-1 mb-1"><AlertErr msg={editErr} close={() => setEditErr("")} err={editErr} msg={editErr}/></div> : null}
<form onSubmit={submit}>
{(() => { if(editItem === "email"){
return(
<input type="email" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter new email"/>
)
}
else if(editItem === "fullname"){
	return(
<input type="text" className="form-control" name="fullName" value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder="Enter full name"/>
)
}
else if(editItem === "username"){
	return(
	<input type="text" className="form-control" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter new username"/>
	)
}
else if(editItem === "nationality"){
	return(
<input type="text" className="form-control" name="nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} placeholder="enter nationality eg. Nigerian, Russian.."/>
	)
}
else if(editItem === "gender"){
	return(
	<select className="custom-select" onChange={(e) => setGender(e.target.value)} value={gender} required>
	<option>--select gender--</option>
	<option value="male">Male</option>
	<option value="female">Female</option>
	</select>
	)
}
else if(editItem === "dob"){
	return(
	<input type="date" className="form-control" name="dob" value={dob} onChange={(e) => setDob(e.target.value)} placeholder="Enter new date of birth"/>
	)
}
})()
}

<center>
<br/>
<button type={editLoading? "": "submit"} className="btn btn-sm btn-danger">{editLoading? "Loading...": "Submit"}</button>
</center>
</form></Modal.Body>
<Modal.Footer><span className="btn btn-outline-dark btn-sm"><i className="fas fa-times" onClick={hideModal}></i></span></Modal.Footer>
</Modal>
</div>
</main>

		)}
}

export default withRouter(Profile)
