import React from 'react';
import Header from './utility/header';
import img404 from './utility/404.png';
import Footer from './utility/footer';

const Err404 = () => {
	let [opn, setOpn] = React.useState(false)
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


	return(
		<main>
	{nav}
		<div className="wrapper">
		<Header />
		<div id="content" className="container">
			 <center>
			 <div style={{marginTop: "200px", marginBottom: "150px"}}><img src={img404} alt="404" /><h6>{"...The page you're looking for was not found"}</h6></div>
			 </center>
			 <br/>
			 
			 <Footer />
			 </div>
		</div>
</main>
		)

}

export default Err404