var React = require("react");
var ReactDOM = require("react-dom");
var DetailHeader = React.createClass({
	backHandler:function(){
		console.log(this.props.type)
		var content = document.getElementById("content");
		var header = document.getElementById("header");
		if(this.props.type == "home"){
			var Home = require("./Home");
				var HomeHeader = require("./HomeHeader");
				ReactDOM.unmountComponentAtNode(header);
				ReactDOM.render(<HomeHeader/>,header);
				ReactDOM.unmountComponentAtNode(content);
				ReactDOM.render(<Home/>,content);
		}else if(this.props.type == "kind"){
			var Kind = require("./Kind");
				var KindHeader = require("./KindHeader");
				ReactDOM.unmountComponentAtNode(header);
				ReactDOM.render(<KindHeader/>,header);
				ReactDOM.unmountComponentAtNode(content);
				ReactDOM.render(<Kind/>,content);
		}
	},
	render:function(){
		return (
			<ul >
				<li className="logo" id="back" onClick={this.backHandler}>
					<i className="iconfont">&#xe600;</i>
				</li>
				<li>
					产品详情
				</li>
				<li>
					
				</li>
			</ul>
			
		)
	}
});

module.exports = DetailHeader;