// pages/home/home.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    banners:[],
    indicatorDots: true,  //是否显示指示点
    autoplay: true,   //自动切换
    circular:true,  //是否衔接滑动
    interval: 3000,  //间隔时长
    duration: 1000,  //动画时长
    
    navsImages:[
      '/images/navs/nav-phone.jpg',
      '/images/navs/nav-tv.jpg',
      '/images/navs/nav-com.jpg',
      '/images/navs/nav-new.jpg',
      '/images/navs/nav-smart.jpg',      
    ],
    content_top: [
      '/images/content_top/MIX2.png',
      '/images/content_top/TV4.jpg',
    ]
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllGoods();
    this.getBanners();
  },

  getAllGoods(){
    wx.request({
      url: apiUrl + '/goods/getAllGoods',
      success: res => {
        console.log(res);
        this.setData({
          goods: res.data,
        });
      },
      fail: err => {
        console.log(err);
      }
    })
  },

  getBanners(){
    wx.request({
      url: apiUrl + '/goods/getBanners',
      success: res => {
        console.log(res.data);
        let banners = [];
        banners.push(res.data[0].img_url);
        banners.push(res.data[1].img_url);
        banners.push(res.data[2].img_url);
        this.setData({
          banners: banners
        });
      },
      fail: err => {
        console.log(err);
      }
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