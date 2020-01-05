// 引入本地数据模拟数据库缓存
// var dataObj = require("data/data.js")

//app.js
App({
  onLaunch: function () {

    // 使用同步方式缓存数据
    // wx.setStorageSync('postList', dataObj.postList);

    // wx.setStorage({
    //   key: 'postList',
    //   data: dataObj.postList,
    //   success: function() {
    //     console.log("缓存成功")
    //   },
    //   fail: function() {
    //     console.log("缓存失败")
    //   },
    //   complete: function() {
    //     console.log("完成")
    //   }
    // })
    var cacheData = wx.getStorageSync('postList');
    if (!cacheData) {
      console.log("缓存为空")
      // 缓存不存在，设置缓存
      var dataObj = require('data/data.js')
      wx.clearStorageSync()
      console.log("缓存为空，加载新的缓存数据",dataObj.postList)
      wx.setStorageSync('postList', dataObj.postList)
    }

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})