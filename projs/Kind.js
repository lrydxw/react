var React = require("react");
var ProList = require("./ProList");
var Kind = React.createClass({
	render:function(){
		
		return (
			<div className="kindContent">
			<ProList mountType="kind"/>
			</div>
			
		)
	}
});

module.exports = Kind;