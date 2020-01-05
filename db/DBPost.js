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

  constructor(url){
    this.storageKeyName = 'postList';
  }

  getAllPostData() {
    var cacheData = wx.getStorageSync(this.storageKeyName);
    if (!cacheData) {
      cacheData = wx.getStorageSync(this.storageKeyName);
      this.execSetStorageSync(cacheData);
    }
    return cacheData;
  }

  // 保存或更新数据库数据
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data);
  }
}

export {DBPost}