import React, {useState, useContext} from 'react';
import {Alert} from 'react-bootstrap';
import {QuizAppContext} from '../../context/quizAppContext'

 const AlertErr = (props) => {
	const [show, setShow] = useState(true)
	const {authErr, setAuthErr, editErr, setEditErr} = useContext(QuizAppContext)
	if(props.err) {
		return(
			<Alert variant="danger"
			onClose={props.close} dismissible>
			<p className="text-danger px-1 py-1"style={{marginBottom: "0px"}}>{props.msg}!</p>
			</Alert>

			)
	}
	else{
		return null
	}
}
export default AlertErr