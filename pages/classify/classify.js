const app = getApp();
const apiUrl = app.globalData.apiUrl;
const IMGHeader = app.globalData.IMGHeader;



Page({
	data: {
		classify: [],
		goods: [],
		curNav: 1,
		curIndex: 1,
	
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getAllClassify();
		if(app.globalData.curNav != '0'){
			this.getGoodsByClassify(app.globalData.curNav);
		}else {
			this.setData({
				curNav: 0,
				curIndex: 0,
			});
			this.getSearch();
		}
		
	},

	onShow(){
		this.onLoad();
	},
	
	getSearch(){
		wx.request({
			url: apiUrl + '/appwx/getAllGoods',
			data: {
				keyword: app.globalData.searchValue
			},
			success: res => {
				res.data.data.map(item => {
					item.small_img = IMGHeader+item.small_img;
				});
				this.setData({
					goods: res.data.data
				});
			},
			fail: err => {
				console.log(err);
			}
		})
	},

	//点击改变类别事件 
	switchRightTab: function (e) {
		// 获取item项的id，和数组的下标值  
		let id = e.target.dataset.id,
			index = parseInt(e.target.dataset.index);
		// 把点击到的某一项，设为当前index  
		app.globalData.curNav = id;
		app.globalData.curIndex = index;
		this.setData({
			curNav: id,
			curIndex: index,
		})
	

		//请求数据
		if(id != '0'){
			this.getGoodsByClassify(id);
		}else {
			this.getSearch();
		}
		
	},



	//获取所有分类
	getAllClassify() {
		wx.request({
			url: apiUrl + '/appwx/getAllClassify',
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
			url: apiUrl + '/appwx/getGoodsByClassify',
			data: {
				id: id
			},
			success: res => {
				wx.hideLoading();
				console.log(res.data.data);
				res.data.data.map(item => {
					item.small_img = IMGHeader+item.small_img;
				});
				// let children = "classify[" + (id - 1) + "].children";
				// this.setData({
				// 	[children]: res.data.data
				// });
				this.setData({
					goods: res.data.data
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
