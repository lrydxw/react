var React=require("react");
var ReactDOM=require("react-dom");
var Home=require("./projs/Home");
var HomeHeader=require("./projs/HomeHeader");
var MainFoot=require("./projs/MainFoot");
var Main=React.createClass({
	render:function(){
		return(
			<div className="rootBox">
				<header id="header">header</header>
				<section id="content"></section>
				<footer id="footer"></footer>
			</div>
		)
	}
})
