// pages/post/post-comment/post-comment.js

import {DBPost} from '../../../db/DBPost.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 控制 语音与文字切换输入
    'useKeyboardFlag': true,
    // 输入框的初始值
    'keyboardInputValue':"",
    // 图片/拍照UI
    'sendMoreMsgFlag':false,
    // 已选择的图片集
    'chooseFiles':[],
    // 要删除的图片的index
    'deleteIndex': -1,
    // 是否正在录音 recoding  为true ‘’为false
    'recodingClass':'',
  },

  // 切换输入方式
  switchInputType: function(event) {

    var isKeyboard = this.data.useKeyboardFlag;
    if (isKeyboard) {
      this.setData({
        'sendMoreMsgFlag': false,
      })
    }

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
    var imageArr = this.data.chooseFiles;
    var txt = this.data.keyboardInputValue;
    console.log("发送",txt);
    // 测试代码  
    /** Hard Code Test Code */
    var testComment = {
      avator: "/image/post/short.png",
      name: "辛弃疾",
      type: "text",
      content: {
        txt: txt,
        images: imageArr,
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
      chooseFiles:[],
      sendMoreMsgFlag: false,
    })
  },

  /** 显示、隐藏 发送更多内容UI
   * 
  */
  sendMoreMessage: function() {

    var isKeyboard = this.data.useKeyboardFlag;
    // 如果在语音状态下，要显示more ,则先把输入状态更改为文字输入
    var isShowingMore = this.data.sendMoreMsgFlag;
    if(!isShowingMore) {
      this.setData({
        useKeyboardFlag: true,
      })
    }

    this.setData({
      'sendMoreMsgFlag': !this.data.sendMoreMsgFlag,
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

  // 选择图片或者拍照
  chooseImage: function(event) {

    // 最多可选择3张图，可以分次选择
    var imageArr = this.data.chooseFiles;
    var length = 3 - imageArr.length;
    if (length <= 0) {
      return;
    }

    var categorys = [event.currentTarget.dataset.category];
    var that = this;
    /** 小程序提供的 选择图片和拍照的 API
     * category：接收要打开的方式 ['album'] 直接打开相册 ['camera'] 直接打开 相机
     *           ['album','camera'] 底部弹出 选择框
     * length: 最多可选择几张图
     * API 中的 res 中 tempFilePaths 作为最重要的字段包含了我们选择的图片的地址（本地临时地址）
     * */ 
    wx.chooseImage({
      sourceType: categorys,
      count: length,
      
      success: function(res) {
        // 可以分次选择图片,但不能超过3张
        that.setData({
          'chooseFiles': imageArr.concat(res.tempFilePaths),
        })
      },
    })
  },

  // 删除已选择的图片
  deleteImage: function(event) {

    var index = event.currentTarget.dataset.idx,
      that = this;
    // 删除动画 通过传递 要删除的 index
    that.setData({
      'deleteIndex': index,
    });

    // 删除方法  splice（index, count）从哪开始删除，删除几张
    that.data.chooseFiles.splice(index,1);
    setTimeout(function() {
      that.setData({
        'deleteIndex': -1,
        'chooseFiles': that.data.chooseFiles,
      });

    },500)
  },

  // 开始录音
  recordStart: function() {
    var that = this;
    this.setData({
      recodingClass:'recoding',
    });

    // 录音开始时间
    this.recordStartTime = new Date();
    // 调用wx API 进行录音
    wx.startRecord({
      success: function(res) {
        // 录音文件 res
        // 计算录音时长
        var diff = (that.recordEndTiem - that.recordStartTime) / 1000;
        diff = Math.ceil(diff);

        // 发布录音到评论
        that.submitAudioComment({url:res.tempFilePath, timeLen: diff});
      },
      fail: function(res) {
        console.log("录音失败",res);
      },
      complete: function(res) {
        console.log("录音完成（无论成功失败都会走到这里）");
      },
    })
  },
  // 结束录音
  recordEnd: function() {

    this.setData({
      recodingClass:'',
    });
    this.recordEndTiem = new Date();
    wx.stopRecord();
  },

  // 发布语音评论 （语音评论不包含文字，或者图片，所以这里单独拿出来写一个方法）
  submitAudioComment: function(audio) {

    var testComment = {
      avator: "/image/post/short.png",
      name: "白居易",
      type: "audio",
      content: {
        txt: null,
        images: null,
        audio: audio,
      },
    };

    // 首先写入缓存
    this.dbpost.publishNewComment(testComment);
    // 弹框
    this.showCommentSuccessToast();
    // 重新绑定评论数据
    this.reBindCommentData()

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

  // 播放评论中的语音
  /**
   * 小程序里面 关于播放音频的点
   * 1、播放 playVoice() 参数 filpath ,可以添加 success faild complete 方法
   *   一般我们只需要使用到complete 方法，播完完成，然后对数据状态做一些操作
   * 2、暂停 pauseVoice()， 暂停会自动记录播放时间，下一次播放该文件时，继续播放，暂停后，不会走complete方法
   * 3、停止 stopVoice() ， 清空对播放资源的记录，会走complete方法
  */
  playAudio: function(event) {
    var voiceUrl = event.currentTarget.dataset.url;

    // 如果正在播放 就暂停
    if (voiceUrl == this.data.currentPlayUrl) {
      wx.pauseVoice();
      this.data.currentPlayUrl = "";
    } else {
      // 播放
      this.data.currentPlayUrl = voiceUrl;
      wx.playVoice({
        filePath: voiceUrl,
        complete: function() {
          // 播放完成后 把当前播放地址置空
          this.data.currentPlayUrl = "";
        },

      });
  
    }
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