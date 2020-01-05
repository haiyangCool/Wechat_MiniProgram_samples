// pages/post/post-detail/post-detail.js

import {DBPost} from '../../../db/DBPost.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 这里的id变量名必须和传递过来的变量名一致
    var id = options.id;
    console.log("详情文章 id = name = ",id);

    // 使用new 实例化 DBPost时，直接保存到this中，以后直接使用this.dbPost即可引用该对象
    this.dbPost = new DBPost(id);

    this.postData = this.dbPost.getPostItemById();

    console.log("详情数据",this.postData);

    this.setData({
      post: this.postData.data,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 官方文档指出设置标题必须在 onReady 之后, 
    /**
     * 因为 onReady 在 onShow 之后才会被调用，如果在onShow时设置了标题
     * 当 调用了 onReady后，会重新渲染页面，导致标题一闪而过，希望后续
     * 微信团队对此作出修改 
     * 注： 最新版本的ide中 在onShow中设置也可以了，但是仍然建议在onReady
     * 中设置，以防后续微信的修改
    */
    console.log("标题");
    wx.setNavigationBarTitle({
      title: this.postData.data.title,
    })
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