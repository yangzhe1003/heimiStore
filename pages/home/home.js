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
    // this.getAllGoods();
    this.getBanners();
  },

  //获取商品信息
  // getAllGoods(){
  //   wx.request({
  //     url: apiUrl + '/goods/getAllGoods',
  //     success: res => {
  //       console.log(res);
  //       this.setData({
  //         goods: res.data,
  //       });
  //     },
  //     fail: err => {
  //       console.log(err);
  //     }
  //   })
  // },

  //获取banner图
  getBanners(){
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: apiUrl + '/appwx/getBanners',
      success: res => {
        wx.hideLoading();
        res.data.data.map((item)=>{
            item.img_url = "http://127.0.0.1:3100/"+item.img_url
        });
        this.setData({
          banners: res.data.data
        });
      },
      fail: err => {
        console.log(err);
      }
    })
  },

  //跳转到分类页面
  jumpClassify(e){
    console.log(e);
    app.globalData.curNav = e.target.dataset.id;
    wx.switchTab({
      url: '../classify/classify'
    })
  }
  


})