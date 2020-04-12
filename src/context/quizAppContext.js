import React, {createContext, useState, useEffect} from 'react'
export const QuizAppContext = createContext()

export const QuizAppContextProvider = props => {
	const [user, setUser] = useState({});
	const [index, setIndex] = useState(0);
	const [userLoading, setUserLoading] = useState(true)
	const [authErr, setAuthErr] = useState("")
	const [authLoading, setAuthLoading] = useState(false)
	const [editLoading, setEditLoading] = useState(false)
	const [editErr, setEditErr] = useState("")
	const [questions, setQuestions] = useState([
{id: 1, question: "Which of the following Attribute is used to include External JS code inside your HTML Document?", correctAnswer: "src", options: ["src", "script", "link", "ext"]},
{id: 2, question: "A proper scripting language is a __________?", correctAnswer: "High level programming language", options: ["Assembly level programming language", "High level programming language", "Machine level programming language", "Low level programming language"]},
{id: 3, question: "The setTimeout() belongs to which object?", correctAnswer: "Window", options: ["Position", "Window", "Element", "Location"]},
{id: 4, question: "The “var” and “function” are __________?", correctAnswer: "Declaration statements", options: ["Prototypes", " Keywords", "Data Types", "Declaration statements"]},
{id: 5, question: "Among the following, which one is a ternary operator?", correctAnswer: "?", options: ["+", "-", "?", "="]},
{id: 6, question: "Which of the following is not a framework?", correctAnswer: "Javascript", options: ["jQuery", "Javascript", ".NET", "Cocoa"]},
{id: 7, question: "Which function among the following lets to register a function to be invoked once?", correctAnswer: "setTimeout()", options: ["settime()", "setInterval()", "setTotaltime()", "setTimeout()"]},
{id: 8, question: "What will happen if we call setTimeout() with a time of 0 ms?", correctAnswer: "Placed in queue", options: ["Will execute immediately", "Placed in stack", "Placed in queue", "Will run continuously"]},
{id: 9, question: "Which function among the following lets to register a function to be invoked repeatedly after a certain time?", correctAnswer: "setInterval()", options: ["settime()", "setInterval()", "setTotaltime()", "setTimeout()"]},
{id: 10, question: "To which object does the location property belong?", correctAnswer: "Window", options: ["Position", "Window", "Element", "Location"]}
		])

	const [currentQuestion, setCurrentQuestion] = useState(questions[index]);
	const [questionsAnsweredCount, setQuestionsCount] = useState(0)
	const [correct, setCorrect] = useState(0)
	const [resultLoading, setResultLoading] = useState(false)

	
	const mark = 100 / questions.length

	const submit = () => {
		const score = Math.ceil( mark * correct)
		setResultLoading(true)
		fetch("https://ay-quiz-app-server.herokuapp.com/results/submit", {
			method: "POST",
			headers: {"content-type": "application/json"},
			body: JSON.stringify({
				score: score,
				token: localStorage.getItem('usertoken')
			})
		}).then(res => res.json())
		.then(res => {
			if(res){
						alert(res.status)
						getUser(localStorage.getItem("usertoken"))
						setResultLoading(false)
						setCorrect()
						setCurrentQuestion()
						setIndex()
						setQuestionsCount()
						setCompleted(false)
			
			}
		}).then(err => {
			if(err){
				alert('connection error Please try again')
				setResultLoading(false)
			}
		})
	}

	const add = (val) => {
	if(val === currentQuestion.correctAnswer){
		setCorrect(correct + 1)
	}
	else{
		return null
	}
}
	const [completed, setCompleted] = useState(false)
		const answer = (value) => {
			if(index + 1 < questions.length){
				add(value)
				setIndex(index + 1)
				setCurrentQuestion(questions[index + 1])		
	}
		else{
				setCompleted(true)
				add(value)

	}
						}


const getUser = (token) => {
	fetch(`https://ay-quiz-app-server.herokuapp.com/user`, {
			method: "POST", 
			headers: {"content-type": "application/json"},
			body: JSON.stringify({
				token: token
			})
		}).then(res => res.json()
		).then(data => {
			setUser(data)
		setUserLoading(false)
	})
		
}

const login = (emailAd, pass) => {
setAuthLoading(true)
	fetch("https://ay-quiz-app-server.herokuapp.com/login", {
		method: "POST", 
		headers: {"content-type": "application/json"},
		body: JSON.stringify({
			email: emailAd,
			password: pass
		})
	})
	.then(res => res.json()
		)
	.then(res => {
		if(res.err){
			setAuthErr(res.err)
			setAuthLoading(false)
		}
		else if(res.token){
		localStorage.setItem('usertoken', res.token)
		setAuthLoading(false)
		setAuthErr("")
		}

}).then(() => {
	if(localStorage.getItem('usertoken')){
		getUser(localStorage.getItem('usertoken'))
	}
}).catch(err => {
	if(err){
		
		setAuthErr("connection error")
		setAuthLoading(false)
	}
})
	}



useEffect(() => {
	const tok = localStorage.getItem('usertoken');
if(tok){
	getUser(tok)
}
}, [])


const update = (val, url, item) => {
	if(item === "email"){
		setEditLoading(true)
		if(!val){
			setEditLoading(false)
			alert("Please input email")
		}else{
				fetch(url, {
					method: "POST",
					headers: {"content-type": "application/json"},
					body: JSON.stringify({
					token: localStorage.getItem('usertoken'),
					email: val})
				}).then(res => res.json())
				.then(res => {
					if(res.status){
					getUser(localStorage.getItem('usertoken'))
					alert(res.status)
					setEditLoading(false)
				}else if(res.err){
					setEditErr(res.err)
					setEditLoading(false)
				}
				}).catch(err => {
					if(err){
						setEditErr("connection error")
						setEditLoading(false)

					}
				})
			}
	}

	if(item === "username"){
		setEditLoading(true)
		if(!val){
			setEditLoading(false)
			alert("Please enter username")
		}else{
				fetch(url, {
					method: "POST",
					headers: {"content-type": "application/json"},
					body: JSON.stringify({
					token: localStorage.getItem('usertoken'),
					username: val})
				}).then(res => res.json())
				.then(res => {
					if(res){
					getUser(localStorage.getItem('usertoken'))
					alert("Updated user info successfully")
					setEditLoading(false)
				}
				}).catch(err => {
					if(err){
						setEditErr("connection error")
						setEditLoading(false)

					}
				})
			}
	}

	if(item === "fullname"){
		setEditLoading(true)
		if(!val){
			setEditLoading(false)
			alert("Please enter your full name")
		}else{
				fetch(url, {
					method: "POST",
					headers: {"content-type": "application/json"},
					body: JSON.stringify({
					token: localStorage.getItem('usertoken'),
					fullname: val})
				}).then(res => res.json())
				.then(res => {
					if(res){
					getUser(localStorage.getItem('usertoken'))
					alert("Updated user info successfully")
					setEditLoading(false)
				}
				}).catch(err => {
					if(err){
						setEditErr("connection error")
						setEditLoading(false)

					}
				})
			}
	}

	if(item === "gender"){
		setEditLoading(true)
		if(val === "--select gender--" || !val){
			setEditLoading(false)
			alert("Please select gender")
		}else{
				fetch(url, {
					method: "POST",
					headers: {"content-type": "application/json"},
					body: JSON.stringify({
					token: localStorage.getItem('usertoken'),
					gender: val})
				}).then(res => res.json())
				.then(res => {
					if(res){
					getUser(localStorage.getItem('usertoken'))
					alert("user info updated successfully")
					setEditLoading(false)
				}
				}).catch(err => {
					if(err){
						setEditErr("connection error")
						setEditLoading(false)

					}
				})}
	}

	if(item === "nationality"){
		setEditLoading(true)
		if(!val){
			setEditLoading(false)
			alert("Please enter your nationality")
		}else{
				fetch(url, {
					method: "POST",
					headers: {"content-type": "application/json"},
					body: JSON.stringify({
					token: localStorage.getItem('usertoken'),
					nationality: val})
				}).then(res => res.json())
				.then(res => {
					if(res){
					getUser(localStorage.getItem('usertoken'))
					alert("user info Updated successfully")
					setEditLoading(false)
				}
				}).catch(err => {
					if(err){
						setEditErr("connection error")
						setEditLoading(false)

					}
				})
			}
	}

	if(item === "dob"){
		setEditLoading(true)
		if(!val){
			setEditLoading(false)
			alert("Please enter date of birth")
		}else{
				fetch(url, {
					method: "POST",
					headers: {"content-type": "application/json"},
					body: JSON.stringify({
					token: localStorage.getItem('usertoken'),
					dob: val})
				}).then(res => res.json())
				.then(res => {
					if(res){
					getUser(localStorage.getItem('usertoken'))
					alert("user info Updated successfully")
					setEditLoading(false)
				}
				}).catch(err => {
					if(err){
						setEditErr("connection error")
						setEditLoading(false)
					}
				})
			}
		}
}


	return(
		<QuizAppContext.Provider
		 value={{
		 user,
		 submit,
		 completed, 
		 login, 
		 questions, 
		 setUser, 
		 index, 
		 correct, 
		 currentQuestion, 
		 questionsAnsweredCount, 
		 answer,
		 userLoading,
		 authLoading,
		 authErr,
		 setAuthErr,
		 update,
		 editErr,
		 editLoading,
		 setEditErr,
		 resultLoading
		 }} >
		{props.children}
		</QuizAppContext.Provider>
		)
	}

