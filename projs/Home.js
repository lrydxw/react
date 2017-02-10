var React = require("react");

var ProList = require("./ProList");


var Home = React.createClass({
	getInitialState:function(){
		return {
			imgsList:""
		}
	},
	componentWillMount:function(){
		var that = this;
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/getBanner.php?callback=",
			dataType:"JSONP",
			success:function(data){
				
				var result = data;
				console.log("result",typeof result);//string
				var data = eval(result);
				console.log("data",data);//obj
				
				var len = data.length;
				console.log("Data",JSON.parse(data[0].goodsBenUrl)[0]);
				var arr = [];
				for(var i = 0; i　< len; i++){
					arr.push(<div className="swiper-slide" key={'banner'+i}><img src={JSON.parse(data[i].goodsBenUrl)[0]}/></div>)
				}
				that.setState({
					imgsList:arr
				})
			}
		});
	},
	
	render:function(){
		return (
			<div className="homeContent">
				
						<div className="swiper-container">
							<div className="swiper-wrapper">
								{this.state.imgsList}
							</div>
							<div className="swiper-pagination"></div>
						</div>
						<ProList mountType="home"/>
						
			</div>
			
		)
	},
	componentDidUpdate:function(){
		var swiper = new Swiper(".swiper-container",{
			"pagination":".swiper-pagination",
			autoplay:2000,
			loop:true,
			autoplayDisableOnInteraction:false
		});

	}
});

module.exports = Home;