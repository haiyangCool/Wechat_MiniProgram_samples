
// var dataObj = require("../../data/data.js");
// 使用数据库
// var DBPost =  require('../../db/DBPost.js').DBPost;
import {DBPost} from '../../db/DBPost.js';
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

  comeInDetail(event) {

    //  通过系统定义的 dataset 获取组件自定义的属性
    /**
     * event 事件是由 MINA 框架在组件上的事件传递时传递的参数，在event事件对象中，有一个currentTarget 代表事件绑定的当前组件， 其中重点是 dataset对象，dataset对象中包含当前组件中自定义的以 data-开头的自定义属性值，所以在event.currentTarget.dataset.postId 可以拿到当前组件的postid
     * 组件自定义属性的命名规则
     * 1、必须以 data- 开头
     * 2、多个字符之间以 - 开头
     * 3、单词中最好不要有大写字母，有的话，除了第一个外，其他的将会被转化为小写
     * 4、很重要：取值时，在js中获取自定义的属性时，多个单词将被转化为驼峰命名
     * 比如 我们定义的 属性 data-post-id 取值时，需要使用 postId ,否则取不到值
     * 传递多个值时
     *     url: 'post-detail/post-detail?id=&name='+postId+name,

    */
    var postId = event.currentTarget.dataset.postId;
    console.log(" 文章id",postId);
    wx.navigateTo({

      // 跳转传值时，类似 get 请求
      url: 'post-detail/post-detail?id='+postId,

      success: function() {
        console.log("success to detail")
      },
      fail: function() {
        console.log("fail to detail")
      }

    })
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
    var dbPost = new DBPost();

    this.setData({
      /**
       * 因为在这里使用了 postData 作为 data 的替换，所以在 wxml中 需要把data也替换成 postData
       * 负责页面没有数据 比如：postData.readNum 、postData.title
      */
      postList: dbPost.getAllPostData()
    });
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