// pages/post/post-comment/post-comment.js

import {DBPost} from '../../../db/DBPost.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    'useKeyboardFlag': true,
  },

  // 切换输入方式
  switchInputType: function(event) {
    this.setData({
      useKeyboardFlag: !this.data.useKeyboardFlag,
    });
  },

  // 输入事件
  bindCommentInput: function(event) {
    var inputTxt = event.detail.value;
    console.log("文字变化",inputTxt);
    this.data.keyboardInputValue = inputTxt;
  },

  // 发送
  submitCommit: function(event) {
    var txt = this.data.keyboardInputValue;
    console.log("发送",txt);
    // 测试代码  
    /** Hard Code Test Code */
    var testComment = {
      avator: "/image/post/short.png",
      name: "辛弃疾",
      type: "text",
      content: {
        txt: "各位前辈好，我也赋诗一首吧，献丑了.\n 醉里挑灯看剑，梦回吹角连营。\n八百里分麾下炙，五十弦翻塞外声。沙场秋点兵。\n马作的卢飞快，弓如霹雳弦惊。\n了却君王天下事，赢得生前身后名。可怜白发生！",
        images: null,
        audio: null,
      },
    };

    if (!testComment.content.txt) {
      return;
    }
    // 首先写入缓存
    this.dbpost.publishNewComment(testComment);
    // 弹框
    this.showCommentSuccessToast();
    // 重新绑定评论数据
    this.reBindCommentData()
    // 重置所有状态
    this.resetAllDefaultStatus();
  },

  /**重置所有状态*/
  resetAllDefaultStatus: function() {
    // 清空输入框 需要在输入框input中定义一个字段接收 显示的数据，这里使用value="{{keyboardInputValue}}" 
    this.setData({
      'keyboardInputValue': '',
    })
  },

  /**
   * 在小程序开发中和HTML 开发有所不同，小程序中并没有 Dom 树，数据绑定是单向的，每次更新数据
   * 都需要重新绑定
  */
  reBindCommentData: function() {

    var comments = this.dbpost.getComments();
    this.setData({
      'comments': comments,
    })
  },

  // 写评论成功后弹窗
  showCommentSuccessToast: function() {
    wx.showToast({
      title: '发布成功',
      icon:'success',
      duration: 1000,
    })
  },

  // 图片预览
  previewImg: function(event) {

    // 获取第几条评论index
    var commentIndex = event.currentTarget.dataset.commentIdx;
    // 第几章图片
    var imageIndex = event.currentTarget.dataset.imgIdx;

    var images = this.data.comments[commentIndex].content.images;

    console.log("图片集",images);
    wx:wx.previewImage({
      current: images[imageIndex],
      urls: images,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.dbpost = new DBPost(id);

    var commentData = this.dbpost.getComments();

    console.log("评论数据",commentData);
    this.setData({

      'comments': commentData,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    var postData = this.dbpost.getPostItemById().data;
    wx.setNavigationBarTitle({
      title: postData.title,
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