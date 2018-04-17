const app = getApp();
const apiUrl = app.globalData.apiUrl;

Page({
	data: {
		classify: [],
		curNav: 1,
		curIndex: 0,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getAllClassify();
		this.getGoodsByClassify(app.globalData.curNav);
	},

	//点击改变类别事件 
	switchRightTab: function (e) {
		// 获取item项的id，和数组的下标值  
		let id = e.target.dataset.id,
			index = parseInt(e.target.dataset.index);
		// 把点击到的某一项，设为当前index  
		this.setData({
			curNav: id,
			curIndex: index,
		})

		//请求数据
		this.getGoodsByClassify(id);
	},

	//获取所有分类
	getAllClassify() {
		wx.request({
			url: apiUrl + '/goods/getAllClassify',
			success: res => {
				console.log(res);
				this.setData({
					classify: res.data.data
				});
			},
			fail: err => {
				console.log(err);
			}
		})
	},

	//通过类型获取产品
	getGoodsByClassify(id) {
		wx.showLoading({
			title: '加载中',
		});
		wx.request({
			url: apiUrl + '/goods/getGoodsByClassify',
			data: {
				id: id
			},
			success: res => {
				wx.hideLoading();
				console.log(res.data.data);
				res.data.data.map(item => {
					item.small_img = "http://127.0.0.1:3100/"+item.small_img;
				});
				let children = "classify[" + (id - 1) + "].children";
				this.setData({
					[children]: res.data.data
				});
			},
			fail: err => {
				console.log(err);
			}
		})
	},

	jumpPage(e) {
		console.log(e);
		app.globalData.goodId = e.currentTarget.dataset.id;
		console.log(app.globalData.goodId);
	}

})
