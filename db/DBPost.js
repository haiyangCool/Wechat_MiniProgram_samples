// 构造函数
// var DBPost=function() {
//   this.storageKeyName = 'postList';
// }

// // 不使用ES6 编写的 数据库操作类 使用prototype原型链的方式
// DBPost.prototype={
//   // 得到全部文章信息
//   getAllPostData: function() {
//     var cacheData = wx.getStorageSync(this.storageKeyName);
//     if (!cacheData) {
//       cacheData = require('../data/data.js').postList;
//       this.execSetStorageSync(cacheData);
//     }
//     return cacheData;
//   },
//   //success: res => 
//   execSetStorageSync: function(data) {
//     wx.setStorageSync(this.storageKeyName, data);
//   },
// };

// module.exports = {
//   DBPost: DBPost
// };

// 使用ES6 方式编写数据库操作类

class DBPost {

  constructor(postId){
    this.storageKeyName = 'postList';
    this.postId = postId;
  }

  // 获取全部数据
  getAllPostData() {
    var cacheData = wx.getStorageSync(this.storageKeyName);
    if (!cacheData) {
      console.log("缓存为空",cacheData);
      cacheData = wx.getStorageSync(this.storageKeyName);
      this.execSetStorageSync(cacheData);
    }
    return cacheData;
  }

  // 保存或更新数据库数据
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data);
  }

  // 获取对应文章id的详情数据
  getPostItemById() {
    var postDataList = this.getAllPostData();
    console.log("id = ", this.postId, "\n  postData = ",postDataList);
    var length = postDataList.length;
    for (var i = 0; i < length; i++) {
        if (postDataList[i].postId == this.postId) {
          // 放回键值对数据
          return {
            index: i, // 列表中的第几篇文章
            data: postDataList[i] // 文章数据
          }
        }
    }
  }

  // 收藏文章
  collect() {
    return this.updataPostData('collect');
  }
  updataPostData(category, newComment) {
    var itemData = this.getPostItemById(), 
    postData = itemData.data, 
    allPostData = this.getAllPostData();

    switch (category) {

        case "collect":
          // 处理收藏
          if (postData.collectionStatus) {
            // 如果当前为收藏状态 取消收藏 计数 -1
            postData.collectionNum --;
            postData.collectionStatus = false;
          }else {
            postData.collectionNum++;
            postData.collectionStatus = true;
          }
          break;
        case "like": 
          if (postData.upStatus) {
            // 当前为赞状态，取消赞 计数 -1
            postData.upNum--;
            postData.upStatus = false;
          }else {
            postData.upNum++;
            postData.upStatus = true;
          }
          break;
        case "comment":
          postData.comments.push(newComment);
          postData.commentNum++;
          break;

        case "reading":
          postData.readNum++;
          break;
        default:
          break;
    }

    allPostData[itemData.index] = postData;
    console.log("after change = ", postData);

    this.execSetStorageSync(allPostData);
    console.log("all data = ",allPostData);
    return postData;
  }

  // 点赞功能
  like() {
    return this.updataPostData('like');
  }

  // 获取评论数据
  getComments() {
    var postData = this.getPostItemById(),
      commentData = postData.data.comments;
    
    console.log("评论",commentData);
    if (commentData) {
      return commentData;
    }else {
      return null
    }

  }

  // 发表评论
  publishNewComment(newComment) {
    return this.updataPostData('comment',newComment);
  }

  // 阅读量自增
  addReadingNum() {
    this.updataPostData('reading');
  }

}

export {DBPost}