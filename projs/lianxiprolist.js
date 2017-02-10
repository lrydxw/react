var React=require("react");
var ReactDOM=require("react-dom");
var myScroll;
var pageCode=0;
var ProList=React.createClass({
	getInitialState:function(){
		console.log("test",this.props.mounType)
		return {
			mounType:this.props.mountType,
			proList:''
		}
	},
	iscrollFn:function(){
		var that=this;
		myScroll=new IScroll("#wrapperlo",{
			probeType:3,
			mouseWheel:true,
			shrinkScrollbars:'scale',
			useTransform:true,
			useTranstion:true,
			bounce:true,
			freeScroll:false,
			startX:0,
			startY:0,
			
		});
		myScroll.on("scroll",positionJudge);
		myScroll.on("scrollEnd",action);
		var pullDownFlag;
		var pullUpFlag;
		function positionJudge(){
			if(myScroll.y>40){
				pullDownFlag=1;
				$("#pullDown").html("松开即可刷新");
				
			}else if(myScroll.y<(myScroll.maxScrollY-45)){
				pullUpFlag=1;
				$("#pullUp").html("松开即可加载");
			}
		}
		function action(){
			if(pullDownFlag==1){
				pageCode=0;
				that.loadData(pageCode,6);
				$("pullDown").html("下拉刷新");
				pullDownFlag=0;
			}else if(pullUpFlag==1){
				pageCode++;
				that.loadData(pageCode,6);
				$("#pullUp").html("上拉加载");
				pullUpFlag=0;
			}
		}
	},
	loadData:function(pageCode,linenumber){
		var that=this;
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/getGoods.php?callback=",
			data:{
				pageCode:pageCode,
				linenumber:linenumber
			},
			datatype:"JSONP",
			success:function(data){
				var result=data;
				var data=eval(result);
				var len=data.length;
				var arr;
				if(that.state.proList==""||pageCode==0){
					arr=[];
				}else{
					arr=that.state.prolist;
				}
				for(var i=0;i<len;i++){
					arr.push(<li key={that.props.mountType+data[i].goodsID} data-type={that.state.mountType} calssName="proItem" data-goodsID={data[i].goodsID} )
					<div className="proImg">
						<img src={data[i].goodsListImg/>}
					</div>
					<div className="proInfo">
						<p>{data[i].goodsName}</p>
						<p><span>￥<b>{data[i].discount==0?data[i].price:data[i].price*data[i].discount/10}</b><del>￥{data[i].price}</del></p>
						<p>{data[i].discount==0?"不打":data[i].discount}折</p>
						<span className="carBtn" data-goodsID={data[i].goodsID}><i className="iconfont">&#xe602;</i></span>
					</div>
				</li>
				
				}
				that.setState({
					proList:arr
				})
			}
		});
	},
	componentWillMount:function(){
		pageCode=0;
		this.loadData(pageCode,6);
		var that=this;
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
				<div id="pullUp">上拉刷新</div>
			</div>
		</div>
	)
},
componentDidUpdate:function(){
	var that-this;
	this.iscrollFn();
	$(".proItem").on("click",function(){
		console.log("that",that.state.mountType)
		console.log($(this).attr("data-goodsID"))
		var goodsID=$(this).attr("data-goodsID")*1;
		var mountType=$(this).attr("data-type");
		var Detail=require("./Detail");
		var DetailHeader=require("./DetailHeader");
		ReactDOM.unmountComponentAtNode(document.getElementById("content"));
		ReactDOM.render(<Detail goodsID = {goodsID}/>,document.getElementById("content"));
		ReactDOM.unmountComponentAtNode(document.getElementById("header"));
		ReactDOM.render(<DetailHeader type={that.state.mountType}/>,document.getElementById("header"));
	});
	$(".cartBtn").on("click",function(e){
			e.stopPropagation()
			var goodsID=$(this).attr("data-goodsID");
			
	})
}
})
module.exports=ProList;