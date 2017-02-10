module.exports = {
	entry:"./main.js",//入口文件
	output:{//输出路径
		path:"./",//输出路径
		filename:"bundle.js"//输出文件名称
	},
	module:{//依赖
		loaders:[
			{
				test:/\.js$/,//正则表达式，把我们的js结尾的文件按照我们的jsx-loader进行解析（如果你的组件后缀是jsx的，那么此时你就应该写/\.jsx$/）
				loader:"jsx-loader"//依赖的loader
				
			},{
				test:/\.less$/,
				loader:"style!css!less"
				
			},
			{   test:/\.(png|jpg)$/,
				loader:'url-loader?limit=10000'
			},//限制大小小于10k的
			{	//处理文字时使用
				test:/\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
				loader:'file-loader?name=[name].[ext]'
			}
		]
		
	}
}
