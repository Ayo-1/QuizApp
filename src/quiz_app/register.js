import React, {useContext, useState} from 'react';
import {Link, withRouter, Redirect} from 'react-router-dom';
import {QuizAppContext} from '../context/quizAppContext'
import AlertErr from './utility/alertErr'
const Register = (props) => {
const [loading, setLoading] = useState(false)
const [err, setErr] = useState("")
const {getUser} = useContext(QuizAppContext);
const [email, setEmail] = useState("")
const [dob, setDob] = useState("")
const [username, setUsername] = useState("")
const [fullname, setFullname] = useState("")
const [gender, setGender] = useState("")
const [nationality, setNationality] = useState("")
const [password, setPassword] = useState('')
const [pass2, setPass2] = useState("")

const clr = () => {
    setErr("")
    setEmail("")
    setDob("")
    setUsername("")
    setFullname("")
    setGender("")
    setPass2("")
    setPassword("")
}

const submit = (e) => {
e.preventDefault()
setLoading(true)

if(password !== pass2){
    setLoading(false)
    alert("passwords don't match")
}
else if(!gender){
    setLoading(false)
    alert("select gender")

}
else if(password === pass2){
fetch("https://ay-quiz-app-server.herokuapp.com/register", {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({
        fullname: fullname,
        username: username,
        password: password,
        gender: gender,
        nationality: nationality,
        email: email,
        dob: dob
    })

}).then(res => res.json())
    .then(res =>{ 
            if(res.err){
                setLoading(false)
                setErr(res.err)
            }
            else{
                setLoading(false)
                alert(res.status)
                props.history.push('/')
                setErr("")
                clr()

            }
        })
}
}

if(localStorage.getItem('usertoken')){
return <Redirect to={"/quiz"} />
} 
	else{
		return(
<main className="my-form">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8">
                    <div className="card mt-3">
                        <div className="card-header bg-dark text-light h5">Register</div>
                        <div className="card-body">
                        {err? <AlertErr close={() => {setErr("")}} msg={err} err={err} /> : null }
                            <form onSubmit={submit}>
                                <div className="form-group row">
                                    <label htmlFor="full_name" className="col-md-4 col-form-label text-md-right">Full Name</label>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" value={fullname} onChange={(e) => setFullname(e.target.value)}  name="full-name" required/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="email_address" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} name="email-address" required/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="user_name" className="col-md-4 col-form-label text-md-right">User Name</label>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)}  name="username"  required/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="nationality" className="col-md-4 col-form-label text-md-right">Nationality</label>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" value={nationality} onChange={(e) => setNationality(e.target.value)}   required/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="gender" className="col-md-4 col-form-label text-md-right" value={gender} onChange={(e) => setGender(e.target.value)} required>Gender</label>
                                    <div className="col-md-6">
                                       <select className="custom-select" value={gender} onChange={(e) => setGender(e.target.value)}required>
                                       			<option>--select gender--</option>
                                       			<option value="male">Male</option>
                                       			<option value="female">Female</option>
                                       </select>
                                    </div>
                                </div>

                                 <div className="form-group row">
                                    <label htmlFor="dob" className="col-md-4 col-form-label text-md-right">Date of birth</label>
                                    <div className="col-md-6">
                                     <input type="date" className="form-control" value={dob} onChange={(e) => setDob(e.target.value)}  required/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="pass" className="col-md-4 col-form-label text-md-right">Password</label>
                                    <div className="col-md-6">
                                     <input type="Password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}  required/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="confirm_pass" className="col-md-4 col-form-label text-md-right">Confirm Password</label>
                                    <div className="col-md-6">
                                     <input type="Password" className="form-control" value={pass2} onChange={(e) => setPass2(e.target.value)}  required/>
                                    </div>
                                </div>

                                    <div className="col-md-6 offset-md-4">
                                        {loading? <button className="btn btn-danger">
                                        Loading...
                                        </button>: 
                                    <button type="submit" className="btn btn-danger">
                                        Register
                                        </button>}
                                    </div>
                        
                            </form>
                            <hr />
                            <h6>Have an account? </h6>
                            <br />
                            <Link to="/" className="nav-link text-danger">Sign In</Link>
                        </div>
                    </div>
            </div>
        </div>
    </div>

</main>
		)
	}

	
}

export default withRouter(Register)
