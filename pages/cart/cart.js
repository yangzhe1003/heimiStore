// pages/cart/cart.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		hasGoods: false,
		goods: [],
		totalMoney: 0,
		isAllSelect: false,
		count: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getCart();
	},

	onShow() {
		this.onLoad();
	},

	//获取用户购物车信息
	getCart() {
		wx.showLoading({
			title: '加载中',
		});
		wx.request({
			url: apiUrl + '/appwx/getCart',
			data: {
				userId: app.globalData.userId
			},
			success: res => {
				console.log('购物车:', res.data.data);
				if (res.data.length != 0) {
					this.setData({
						hasGoods: true,
						goods: res.data.data,
					});
				}
				wx.hideLoading();
			},
			fail: err => {
				console.log(err);
			}
		})
	},
	//跳转到首页
	jumpHome() {
		wx.switchTab({
			url: '../home/home',
		})
	},

	//选择事件
	switchSelect(e) {
		console.log(e.target.dataset);
		let totalMoney = 0;
		let index = parseInt(e.target.dataset.index);
		// this.data.goods[index].isSelect = !this.data.goods[index].isSelect;
		let isSelect = 'goods[' + index + '].isSelect';
		this.setData({
			[isSelect]: !this.data.goods[index].isSelect
		}, () => {
			console.log(this.data.goods[index].isSelect);
			let count = this.data.count;
			this.setData({
				count: this.data.goods[index].isSelect ? count + 1 : count - 1
			}, () => {
				console.log('技术:', this.data.count);
				if (this.data.count == this.data.goods.length) {
					this.setData({
						isAllSelect: true
					});
				} else {
					this.setData({
						isAllSelect: false
					});
				}
			});

			if (this.data.goods[index].isSelect) {
				totalMoney = this.data.totalMoney + e.target.dataset.price;
			} else {
				totalMoney = this.data.totalMoney - e.target.dataset.price;
			}
			this.setData({
				totalMoney: totalMoney
			})
		});
	},

	//全选事件
	allSelect() {
		this.setData({
			isAllSelect: !this.data.isAllSelect
		}, () => {
			if (this.data.isAllSelect) {
				this.setData({
					count: this.data.goods.length
				});
				for (let i = 0; i < this.data.goods.length; i++) {
					let isSelect = 'goods[' + i + '].isSelect';
					if (!this.data.goods[i].isSelect) {
						this.setData({
							[isSelect]: true,
							totalMoney: this.data.totalMoney + this.data.goods[i].good_price
						});
					}
				}
			} else {
				this.setData({
					count: 0
				});
				for (let i = 0; i < this.data.goods.length; i++) {
					let isSelect = 'goods[' + i + '].isSelect';
					if (this.data.goods[i].isSelect) {
						this.setData({
							[isSelect]: false,
							totalMoney: this.data.totalMoney - this.data.goods[i].good_price
						});
					}
				}
			}
		});
	},

	//去结算
	toBuy() {
		let goods = [];
		for (let i = 0; i < this.data.goods.length; i++) {
			if (this.data.goods[i].isSelect) {
				goods.push(this.data.goods[i].good_id);
			}
		}

		goods = goods.toString();
		console.log('选中的:', goods);

		wx.request({
			url: apiUrl + '/appwx/toBuy',
			data: {
				userId: app.globalData.userId,
				goods: goods
			},
			success: res => {
				console.log(res);
			},
			fail: err => {
				console.log(err);
			}
		})

	}
})