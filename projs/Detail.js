var React = require("react");
var Detail = React.createClass({
	componentWillMount:function(){
		$.ajax({
			method:"get",
			url:"http://datainfo.duapp.com/shopdata/getGoods.php?callback=",
			data:{
				goodsID:this.props.goodsID
			},
			dataType:"JSONP",
			success:function(data){
				var result = data;
				var data = eval(result);
				console.log("DETAIL",data)
			}
		})
	},
	render:function(){
		console.log(this.props.goodsID)
		return (
			<div>
			详情{this.props.goodsID}
			</div>
			
		)
	}
});

module.exports = Detail;