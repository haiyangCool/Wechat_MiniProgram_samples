// pages/post/post-detail/post-detail.js

import {DBPost} from '../../../db/DBPost.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'isPlayingMusic':false,
  },
  /**
   * 业务逻辑
  */
  // 播放背景音乐
  onMusicTap: function(event) {
    var isPlaying = this.data.isPlayingMusic;
    if (isPlaying) {
      // 暂停
      wx.pauseBackgroundAudio();
      this.setData({

        isPlayingMusic: false,
      })

    }else{
      var postData = this.dbPost.getPostItemById();
      var musicData = postData.data.music;
      console.log("音频信息 ", musicData);
      // 播放
      wx.playBackgroundAudio({
        dataUrl: musicData.url,
        title: musicData.title,
        coverImgUrl: musicData.coverImgUrl,
      })
      this.setData({
        musicId: musicData.postId,
        isPlayingMusic: true,
      })

      app.globalData.g_currentPlayingMusicId = musicData.postId;
    }


  },

  // 喜欢点赞 Like
  onLove: function(event) {
    console.log("喜欢点赞");
    var newPostData = this.dbPost.like();
    this.setData({
      'post.upNum': newPostData.upNum,
      'post.upStatus': newPostData.upStatus,
    });

    // toast
    wx.showToast({
      title: newPostData.upStatus ? "点赞成功" : "取消赞",
      duration: 1000,
      icon: "success",
      mask: true,
    })
  },

  // 评论
  onComment: function(event) {
    console.log("评论");
    // 跳转到评论页面
    var postId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: '../post-comment/post-comment?id='+postId,
    })
  },

  // 收藏
  onCollection: function(event) {
    console.log("收藏");
    // DBPost 的对象已经在 onLoad 函数中被保存在了this中，所以这里可以直接使用了
    var newPostData = this.dbPost.collect();
    // 重新绑定数据，这里要注意，不需要把整个的数据全部更新，只需要有选择的更新变动数据即可
    this.setData ({
      'post.collectionStatus': newPostData.collectionStatus,
      'post.collectionNum': newPostData.collectionNum,
    });
    /** toast
     * title : 用来显示一个标题
     * duration： 显示时间
     * icon: "success" 和 “loading” 两种， success 显示系统定义的 对号，loading 显示菊花
     * mask: 默认为false, true 时，作为蒙层，以防后边的视图接收点击事件，造成误操作
     * */ 
    wx.showToast({
      title: newPostData.collectionStatus ? "收藏成功" : "取消收藏",
      duration: 1000,
      icon: "success",
      mask: true,
    })
  },

  // 阅读量自增
  incrementReadNum: function (event) {
    this.dbPost.addReadingNum();

  },

  /** 添加播放监听
   * 
  */
  setMusicMonitor: function(event) {
    var that = this;
    wx.onBackgroundAudioPlay(function() {
      console.log("背景音乐播放")
    })
    wx.onBackgroundAudioPause(function() {
      console.log("背景音乐暂停")
    })

    wx.onBackgroundAudioStop(function() {
      console.log("背景音乐结束")
      that.setData({
        isPlayingMusic:false,
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentPlayingMusicId = null;
    })
  },

  // 初始播放状态
  initPlayStatu: function(event) {
    var isPlay = app.globalData.g_isPlayingMusic;
    var musicId = app.globalData.g_currentPlayingMusicId;
    if (isPlay) {
      this.setData({
        isPlayingMusic: true,
      })
    }
    console.log("播放状态",isPlay+"\n id",musicId);
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 这里的id变量名必须和传递过来的变量名一致
    var id = options.id;
    console.log("onLoad 详情文章 id  = ",id);
  

    // 使用new 实例化 DBPost时，直接保存到this中，以后直接使用this.dbPost即可引用该对象
    this.dbPost = new DBPost(id);

    this.postData = this.dbPost.getPostItemById();

    console.log("详情数据",this.postData);

    this.setData({
      post: this.postData.data,
    });

    // 页面每打开一次添加一次阅读计数 onLoad 函数在page的整个声明周期只会执行一次
    this.incrementReadNum();
    // 初始播放状态
    this.initPlayStatu();
    // 添加播放监听
    this.setMusicMonitor();
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
    wx.stopBackgroundAudio();
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