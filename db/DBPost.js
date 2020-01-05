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
    console.log("now缓存为空", cacheData);

    return cacheData;
  }

  // 保存或更新数据库数据
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data);
  }

  // 获取对应文章id的详情数据
  getPostItemById() {
    var postDataList = this.getAllPostData();
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
}

export {DBPost}