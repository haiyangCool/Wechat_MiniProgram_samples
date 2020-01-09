var postList = [
  {
    date: "2020年1月3日",
    title: "水调歌头",
    postImg: "/image/post/contact.png",
    headImg: "/image/post/watch.png",
    content: "丙辰中秋，欢饮达旦，大醉，作此篇，兼怀子由。明月几时有？把酒问青天。",
    readImg: "/image/post/read.png",
    readNum: 192,
    collectionNum: 111,
    collectionStatus: true,
    collectionImg: "/image/post/collection.png",
    collectionLightImg: "/image/post/collectionLight.png",
    commentNum: 32,
    commentImg: "/image/post/comment.png",
    commentLightImg: "/image/post/commentLight.png",
    comments: [{
      avator: "/image/post/short.png",
      name: "苏辙",
      type: "text",
      content: {
        txt: "老哥，写的太好了",
        images: null,
        audio: null,
      },
    },{
      avator: "/image/post/watch.png",
      name: "苏洵",
      type: "image",
      content: {
        txt: "臭小子，厉害了",
        images: ["/image/post/file.png", "/image/post/watch.png", "/image/post/short.png"],
        audio: null,
      },
        
    },{
      avator: "/image/post/file.png",
      name: "路人甲",
      type: "audio",
      content: {
        txt: null,
        images: null,
        audio: {url:"http://lurenjia.mp3",},
      },
      
    },
    {
      avator: "/image/post/short.png",
      name: "苏辙",
      type: "text",
      content: {
        txt: "老哥，写的太好，忍不住又来了看看",
        images: null,
        audio: null,
      },
      }, {
        avator: "/image/post/watch.png",
        name: "苏洵",
        type: "image",
        content: {
          txt: "臭小子,看你老弟来了又来，老子也来瞅瞅。",
          images: ["/image/post/file.png"],
          audio: {url:"http://test",timeLen:13},
        },

      }
    ],
    music: {
      url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
      title: "鸟语花香",
      coverImageUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578487631979&di=080cbb0139a6356202c6d118fbbd113f&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1503%2F08%2Fc14%2F3618369_3618369_1425815209098.jpg",
    },
    author: "苏轼",
    postId: 1,
    upStatus: true,
    upImg: "/image/post/like.png",
    upLightImg: "/image/post/likeLight.png",
    upNum: 29,
    detail: "丙辰中秋，欢饮达旦，大醉，作此篇，兼怀子由。\n明月几时有？把酒问青天。\n不知天上宫阙，今夕是何年。\n我欲乘风归去，又恐琼楼玉宇，高处不胜寒。\n起舞弄清影，何似在人间。\n转朱阁，低绮户，照无眠。不应有恨，何事长向别时圆？\n人有悲欢离合，月有阴晴圆缺，此事古难全。\n但愿人长久，千里共婵娟。",
  },
  {
    date: "2020年1月4日",
    title: "将进酒",
    postImg: "/image/post/watch.png",
    headImg: "/image/post/watch.png",
    content: "君不见，黄河之水天上来，奔流到海不复回。君不见，高堂明镜悲白发，朝如青丝暮成雪。",
    readNum: 928,
    readImg: "/image/post/read.png",
    collectionNum: 45,
    collectionStatus: true,
    collectionImg: "/image/post/collection.png",
    collectionLightImg: "/image/post/collectionLight.png",
    commentNum: 64,
    commentImg: "/image/post/comment.png",
    commentLightImg: "/image/post/commentLight.png",
    comments: [{
      avator: "/image/post/watch.png",
      name: "汪伦",
      type: "text",
      content: {
        txt: "老铁，还记得您当年写的诗吗，桃花潭水深千尺，不及‘王伦’送我情",
        images: null,
        audio: null,
      },
    }, {
      avator: "/image/post/file.png",
      name: "杜甫",
      type: "image",
      content: {
        txt: "男神，我们去修仙啊",
        images: ["/image/post/file.png", "/image/post/watch.png", "/image/post/short.png"],
        audio: null,
      },
      
    }, {
      avator: "/image/post/short.png",
      name: "白居易",
      type: "audio",
      content: {
        txt: null,
        images: null,
        audio: { url: "http://lurenjia.mp3", },
      },
  }],
    music: {
      url: "http://mirror.aarnet.edu.au/pub/TED-talks/911Mothers_2010W-480p.mp4",
      title: "TED",
      coverImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578487814045&di=52c78c839388b5fc81ec48b16c4dc5e9&imgtype=0&src=http%3A%2F%2Fa1874.phobos.apple.com%2Fus%2Fr30%2FPurple6%2Fv4%2Ffb%2F5c%2Fa0%2Ffb5ca01f-6ca7-7e76-3871-7e61a362ba34%2Fmzl.qvqmfkop.jpg",
    },
    author: "李白",
    postId: 2,
    upStatus: false,
    upImg: "/image/post/like.png",
    upLightImg: "/image/post/likeLight.png",
    upNum: 30,
    detail: "君不见，黄河之水天上来，奔流到海不复回。\n君不见，高堂明镜悲白发，朝如青丝暮成雪。\n人生得意须尽欢，莫使金樽空对月。\n天生我材必有用，千金散尽还复来。\n烹羊宰牛且为乐，会须一饮三百杯。\n岑夫子，丹丘生，将进酒，杯莫停。\n与君歌一曲，请君为我倾耳听。\n钟鼓馔玉不足贵，但愿长醉不复醒。\n古来圣贤皆寂寞，惟有饮者留其名。\n陈王昔时宴平乐，斗酒十千恣欢谑。\n主人何为言少钱，径须沽取对君酌。\n五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。",
  }
]

// 向外暴露数据接口
module.exports = {
  postList: postList
}