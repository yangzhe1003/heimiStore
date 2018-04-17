//app.js
App({

  //用户登录方法
	getUserCode() {
		wx.login({
			success: res => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				console.log('用户登录信息:', res);
				wx.setStorage({
					key: "code",
					data: res.code
        });
        wx.request({
          url: this.globalData.apiUrl + '/appwx/getUserCode',
          data: {
            code: res.code
          },
          success: res => {
            let { id } =  res.data.data[0];

            this.globalData.userId = id;
          },
          fail: err => {
            console.log(err);
          }
        })
				//获取用户详细信息
				wx.getUserInfo({
					success: res => {
						console.log('获取用户详细信息', res);
						wx.setStorageSync("encryptedData",res.encryptedData);
						wx.setStorageSync("iv",res.iv);
						wx.setStorageSync("rawData",res.rawData);
						wx.setStorageSync("signature",res.signature);
						wx.setStorageSync("userInfo",res.userInfo);
						
					},
					fail: err => {
						wx.showModal({
							title: '警告',
							mask: true,
							content: '取消授权将无法正常使用小程序! 点击确定重新授权。',
							success: res => {
								if (res.confirm) {
									wx.openSetting({
										success: () => {
											wx.getUserInfo({
												success: res => {
													console.log('再次获取:', res);

												},
												fail: err => {
													console.log('授权失败');
													wx.showModal({
														title: '提示',
														mask: true,
														content: '后期使用小程序需要在微信【发现】--【小程序】--删掉【黑米商城】，重新搜索授权登录，方可使用。',
													})
												}
											});
										}

									});
								} else {
									console.log('授权失败');
									wx.showModal({
										title: '提示',
										mask: true,
										content: '后期使用小程序需要在微信【发现】--【小程序】--删掉【黑米商城】，重新搜索授权登录，方可使用。',
									})
								}
							}

						})
					}

				})
			}
		})
	},

  onLaunch: function () { 
    this.getUserCode();
    // 登录
    // wx.login({
      // success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log("code:",res);
        // wx.request({
        //   url: 'https://api.weixin.qq.com/sns/jscode2session',
        //   data: {
        //     appid: 'wxab529bcb173f0b46',
        //     secret: '3d66a42f8807f01f6e83224b775e2b89',
        //     js_code: res.code,
        //     grant_type: 'authorization_code'
        //   },
        //   success: res => {
        //     console.log(res);
        //   }
        // })
        // wx.request({
        //   url: this.globalData.apiUrl + '/login/getUserCode',
        //   data: {
        //     code: res.code
        //   },
        //   success: res => {
        //     console.log(res);
        //     this.globalData.userId = res.data[0].id;
        //   },
        //   fail: err => {
        //     console.log(err);
        //   }
        // })
      // }
    // })
   
  },
  globalData: {
    userInfo: null,
    // apiUrl: 'http://192.168.0.102:3000',
    apiUrl: 'http://127.0.0.1:3100',
    userId: null,
    curNav: 1
  }
})

