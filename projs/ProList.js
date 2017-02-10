var React = require("react");
var ReactDOM = require("react-dom");


var myScroll;
var pageCode = 0;

var ProList = React.createClass({
	getInitialState:function(){
		console.log("test",this.props.mountType)
		return {
			mountType:this.props.mountType,
			proList:""
		}
	},
	iscrollFn:function(){
		var that = this;
		console.log("滚轮")
		myScroll = new IScroll("#wrapperlo",{
						/*需要使用iscroll-probe.js才能生效probeType：1  滚动不繁忙的时候触发
						probeType：2  滚动时每隔一定时间触发
						probeType：3  每滚动一像素触发一次*/
						probeType: 3,
						//        momentum: false,//关闭惯性滑动
						mouseWheel: true, //鼠标滑轮开启
		//				scrollbars: true, //滚动条可见
		////				fadeScrollbars: true, //滚动条渐隐
		//				interactiveScrollbars: true, //滚动条可拖动
						shrinkScrollbars: 'scale', // 当滚动边界之外的滚动条是由少量的收缩
						useTransform: true, //CSS转化
						useTransition: true, //CSS过渡
						bounce: true, //反弹
						freeScroll: false, //只能在一个方向上滑动
						startX: 0,
						startY: 0,
					});
		myScroll.on("scroll",positionJudge);
		myScroll.on("scrollEnd",action);
		var pullDownFlag;
		var pullUpFlag;
		function positionJudge(){
//			console.log("hha")
//			console.log(myScroll.y)
//			console.log(myScroll.maxScrollY)
			//45就是下拉刷新的高度
			if(myScroll.y > 40){
				pullDownFlag = 1;
				$("#pullDown").html("松开即可刷新");
			}else if(myScroll.y < (myScroll.maxScrollY - 45)){
				pullUpFlag = 1;
				$("#pullUp").html("松开即可加载");
			}
		}
		
		function action(){
//			console.log("over")
			
			if(pullDownFlag == 1){
				console.log("刷新");
				pageCode = 0;
				that.loadData(pageCode,6);
				$("#pullDown").html("下拉刷新");
				pullDownFlag = 0;
			}else if(pullUpFlag == 1){
				console.log("加载");
				pageCode++;
				that.loadData(pageCode,6);
				$("#pullUp").html("上啦加载");
				pullUpFlag = 0;
			}
		}
	},
	loadData:function(pageCode,linenumber){
		var that = this;
		$.ajax({
			method:"get",
			url:"http://datainfo.duapp.com/shopdata/getGoods.php?callback=",
			data:{
				pageCode:pageCode,
				linenumber:linenumber
			},
			dataType:"JSONP",
			success:function(data){
				
				var result = data;
				var data = eval(result);
				console.log(data)
				var len = data.length;
				var arr ;
				if(that.state.proList == "" || pageCode == 0){
					arr = [];
				}else{
					arr = that.state.proList;
				}
				
				for(var i = 0; i　< len; i++){
					arr.push(<li key={that.props.mountType+data[i].goodsID} data-type={that.state.mountType} className="proItem" data-goodsID = {data[i].goodsID}>
					<div className="proImg">
						<img src={data[i].goodsListImg}/>
					</div>
					<div className="proInfo">
						<p>{data[i].goodsName}</p>
						<p><span>￥<b>{data[i].discount==0?data[i].price:data[i].price*data[i].discount/10}</b></span> <del>￥{data[i].price}</del></p>
						<p>{data[i].discount == 0 ? "不打": data[i].discount}折</p>
						<span className="cartBtn" data-goodsID = {data[i].goodsID}><i className="iconfont">&#xe602;</i></span>
					</div>
				</li>)
				}
				that.setState({
					proList:arr
				})
			}
		})
	},
	componentWillMount:function(){
		pageCode = 0;//必须写,避免冲突,此函数调用几次执行几次
		this.loadData(pageCode,6);
//		var that = this;
//		$.ajax({
//			method:"get",
//			url:"http://datainfo.duapp.com/shopdata/getGoods.php?callback=",
//			data:{
//				pageCode:pageCode,
//				linenumber:6
//			},
//			dataType:"JSONP",
//			success:function(data){
//				
//				var result = data;
//				var data = eval(result);
//				console.log(data)
//				var len = data.length;
//				var arr = [];
//				for(var i = 0; i　< len; i++){
//					arr.push(<li key={'item0'+i}  data-type={that.state.mountType} className="proItem" data-goodsID = {data[i].goodsID}>
//					<div className="proImg">
//						<img src={data[i].goodsListImg}/>
//					</div>
//					<div className="proInfo">
//						<p>{data[i].goodsName}</p>
//						<p><span>￥<b>{data[i].discount==0?data[i].price:data[i].price*data[i].discount/10}</b></span> <del>￥{data[i].price}</del></p>
//						<p>{data[i].discount == 0 ? "不打": data[i].discount}折</p>
//						<span className="cartBtn" data-goodsID = {data[i].goodsID}><i className="iconfont">&#xe602;</i></span>
//					</div>
//				</li>)
//				}
//				that.setState({
//					proList:arr
//				})
//			}
//		})
	},
	render:function(){
		return (
			<div id="wrapperlo">
				<div id="iscroll">
					<div id="pullDown">下拉刷新</div>
					<ul id="proList">
						{this.state.proList}
					</ul>
					<div id="pullUp">上啦加载</div>
				</div>
			</div>
			
		)
	},
	componentDidUpdate:function(){
		var that = this;
		this.iscrollFn();
		$(".proItem").on("click",function(){
			
			console.log("that",that.state.mountType)
			console.log($(this).attr("data-goodsID"))
			var goodsID = $(this).attr("data-goodsID")*1;
			var mountType = $(this).attr("data-type");
			var Detail = require("./Detail");
			var DetailHeader = require("./DetailHeader");
			ReactDOM.unmountComponentAtNode(document.getElementById("content"));
			ReactDOM.render(<Detail goodsID = {goodsID}/>,document.getElementById("content"));
			ReactDOM.unmountComponentAtNode(document.getElementById("header"));
//			if(this.state.mountType == "home"){
//				ReactDOM.render(<DetailHeader type="home" />,document.getElementById("header"));
//			}else if(this.state.mountType == "kind"){
//				ReactDOM.render(<DetailHeader type="kind" />,document.getElementById("header"));
//			}
			ReactDOM.render(<DetailHeader type={that.state.mountType} />,document.getElementById("header"));
			
		});
		$(".cartBtn").on("click",function(e){
			e.stopPropagation()
			var goodsID = $(this).attr("data-goodsID");
//			alert(2)
		})
	}
});

module.exports = ProList;