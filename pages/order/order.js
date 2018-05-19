// pages/order/order.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
const IMGHeader = app.globalData.IMGHeader;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    isHaveList: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCartList();
  },

  //获取订单列表
  getCartList(){
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: apiUrl + '/appwx/getAllOrder',
      data: {
        userId : app.globalData.userId
      },
      success: res=> {
        
        if(res.data.data[0].goods_id){
          res.data.data[0].goods_id = res.data.data[0].goods_id.split(',');
        }
        this.setData({
          orderList: res.data.data,
          isHaveList: true
        });
        wx.hideLoading();
      },
      fail: err => {
        console.log(err);
      }
    })
  },

  //获取列表订单详情
  getGoodsByOrder(){
    wx.request({
      url: apiUrl + '/cart/getGoodsByOrder',
      data: {
        
      }
    })
  },

  //跳转到首页
  jumpHome() {
    wx.switchTab({
      url: '../home/home',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})