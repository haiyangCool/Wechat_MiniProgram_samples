
var dataObj = require("../../data/data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /* 初始化数据绑定*/
    // object: {
    //   date: "2020年1月3日",
    // },
    // title: "小时候的冰棍和雪糕",
    // postImg: "/image/post/contact.png",
    // headImg: "/image/post/watch.png",
    // content: "以前的冰糕和冰棍就好像现在的老北京冰棍，颜色透明一毛或者5分钱一根，时过境迁……",
    // readNum: 192,
    // collectionNum: {
    //     array:[111]
    // },
    // commentNum: 32,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onload 页面加载")
    // setData 更新数据
    // this.setData({
    //   /**
    //    * title 会改变 data 中title的数据（小时候的冰棍和雪糕）
    //   */
    //   title: "其实这不是一个有关冰棍的文章",
    //   /**
    //    * key 也可以这么写“title”*/
    //   "readNum": 120,
    //   // 甚至这样
    //   "collectionNum.array[0]": 2,

    // }) 

    // 通过setData 初始化数据
    // 定义一个 数据jSON
    // var postList = [
    //   {
    //     object: {
    //       date: "2020年1月3日",
    //     },
    //     title: "小时候的冰棍和雪糕",
    //     postImg: "/image/post/contact.png",
    //     headImg: "/image/post/watch.png",
    //     content: "以前的冰糕和冰棍就好像现在的老北京冰棍，颜色透明一毛或者5分钱一根，时过境迁……",
    //     readNum: 192,
    //     collectionNum: {
    //       array: [111]
    //     },
    //     commentNum: 32,
    //   },
    //   {
    //     object: {
    //       date: "2020年1月4日",
    //     },
    //     title: "河里游泳",
    //     postImg: "/image/post/watch.png",
    //     headImg: "/image/post/watch.png",
    //     content: "小时候，家门前有一个清澈的小池塘，大人们在岸边洗着衣服，水中央一群小孩子在游泳,旁边漂浮着几个汽车的充气轮胎。",
    //     readNum: 928,
    //     collectionNum: {
    //       array: [71]
    //     },
    //     commentNum: 64,
    //   }
    // ]
    
    this.setData({
      /**
       * 因为在这里使用了 postData 作为 data 的替换，所以在 wxml中 需要把data也替换成 postData
       * 负责页面没有数据 比如：postData.readNum 、postData.title
      */
      postList: dataObj.postList 
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady 页面渲染完成")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow 页面显示")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide 页面隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnLoad 页面卸载")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh 下拉刷新操作")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom 上拉触底")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("onShareAppMessage 分享")
  }
})