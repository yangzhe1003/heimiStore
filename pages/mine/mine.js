//mine.js
//获取应用实例
const app = getApp();

Page({
	data: {
		userInfo: {},
	},

	onLoad: function () {
		this.setData({
			userInfo: wx.getStorageSync('userInfo')
		});
	},


	//跳转我的订单
	myOrder() {
		wx.navigateTo({
			url: '../order/order'
		})
	}
})
