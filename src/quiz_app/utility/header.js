import React, {useContext} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {QuizAppContext} from '../../context/quizAppContext.js';
import "./header.css";
import maleAvatar from './maleAvatar.png';
import femaleAvatar from './femaleAvatar.png';
const Header = (props) => {
const {user} = useContext(QuizAppContext);
var unameStyle = {
	 textTransform: "uppercase",
    fontFamily: "monospace"
}
	return(


    <nav id="sidebar" className="text-light">
        <div className="sidebar-header">
            <h3>Programming Quiz</h3>
        </div>

        <ul className="list-unstyled components">
            <p style={unameStyle}><img src={user.gender === "Male" || user.gender === "male" ? maleAvatar: femaleAvatar} className="rounded-circle mx-1" alt="Profile" height="40px" width="40px"/>{user.userName}</p>
            <li className={props.location.pathname === "/quiz"? "active": null}>
                <Link to="/quiz" className="text-light"><i className="mx-1 fas fa-edit"></i>Quiz</Link>
          
            </li>
            <li className={props.location.pathname === "/result"? "active": null}>
                <Link to="/result" className="text-light"><i className="mx-1 fas fa-book"></i>Result</Link>
            </li>
          
            <li className={props.location.pathname === "/profile"? "active": null}>
                <Link to="/profile" className="text-light"><i className="mx-1 fas fa-user"></i>Profile</Link>
            </li>
            <li>
                <Link to="" onClick={() => {

                    localStorage.removeItem("usertoken")
                    props.history.push("/")
                }} className="text-light" style={{cursor: "pointer"}}><i className="mx-1 fas fa-lock"></i>Logout</Link>
            </li>
        </ul>
    </nav>

		
		)
}

export default withRouter(Header)