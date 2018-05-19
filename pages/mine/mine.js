//mine.js
//获取应用实例
const app = getApp();

Page({
	data: {
		userInfo: {},
	},

	//获取用户头像回调
	onGotUserInfo(e){
		this.setData({
			userInfo: e.detail.userInfo
		});
	},

	onLoad: function () {
		// this.setData({
		// 	userInfo: wx.getStorageSync('userInfo')
		// });
		wx.getUserInfo({
			success: res => {
				console.log(res);
				this.setData({
					userInfo: res.userInfo
				});
			}
		});
	},


	//跳转我的订单
	myOrder() {
		wx.navigateTo({
			url: '../order/order'
		})
	}
})
