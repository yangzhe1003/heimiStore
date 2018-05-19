// pages/detail/detail.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
const IMGHeader = app.globalData.IMGHeader;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    detailList: [],
    good: '',
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodDetail();
  },

  //获取商品详情
  getGoodDetail(){
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: apiUrl + '/appwx/getGoodById',
      data: {
        id: app.globalData.goodId
      },
      success: res => {
        console.log(res);
        res.data.data[0].img_url1 = IMGHeader+res.data.data[0].img_url1;
        res.data.data[0].img_url2 = IMGHeader+res.data.data[0].img_url2;
        res.data.data[0].img_url3 = IMGHeader+res.data.data[0].img_url3;
        res.data.data[0].detail_url1 = IMGHeader+res.data.data[0].detail_url1;
        res.data.data[0].detail_url2 = IMGHeader+res.data.data[0].detail_url2;
        res.data.data[0].detail_url3 = IMGHeader+res.data.data[0].detail_url3;

        this.setData({
          good: res.data.data[0]
        });
        let arr = [];
        if (res.data.data[0].img_url1) { arr.push(res.data.data[0].img_url1) };
        if (res.data.data[0].img_url2) { arr.push(res.data.data[0].img_url2) };
        if (res.data.data[0].img_url3) { arr.push(res.data.data[0].img_url3)};
        this.getBannerList(arr);
        let arr2 = [];
        arr2.push(res.data.data[0].detail_url1);
        arr2.push(res.data.data[0].detail_url2);
        arr2.push(res.data.data[0].detail_url3);
        this.getDetailList(arr2);
        wx.hideLoading();
      },
      fail: err => {
        console.log(err);
      }
    })
  },

  //将banner图存入数组
  getBannerList(temp){
    this.setData({
      bannerList: temp
    });
  },

  //将详情图存入数组
  getDetailList(temp){
    this.setData({
      detailList: temp
    });
  },

  //跳转到首页
  jumpHome(e){
    wx.switchTab({
      url: '../home/home',
    })
  },

  //跳转到购物车
  jumpCart(){
    wx.switchTab({
      url: '../cart/cart',
    })
  },

  addCart(){
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    let user = { id: app.globalData.userId };
    wx.request({
      url: apiUrl + '/appwx/addCart',
      method: 'post',
      data: {
        good: this.data.good,
        user : user
      },
      success: res => {
        wx.hideLoading();
        wx.showToast({
          title: '加入购物车成功',
          icon: 'success',
          duration: 2000
        })
        console.log(res);
      },
      fail: err => {
        wx.hideLoading();
        wx.showToast({
          title: '加入购物车失败',
          // icon: '',
          duration: 2000
        })
        console.log(res);
      }
    })
  }

})