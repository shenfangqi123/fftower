
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Welcome.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2a91cx8Yg9CyIhlOix85UiP', 'Welcome');
// scripts/Welcome.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
//var pp = require("acdata").AcWar;
cc.Class({
  "extends": cc.Component,
  properties: {
    // foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
    loading: cc.ProgressBar,
    loadLabel: cc.Label,
    startBut: cc.Button
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    //this.audioMng = this.audioMng.getComponent('AudioMng');
    //this.audioMng.playMusic();
    var _self = this;

    this.startBut.getComponent(cc.Button).interactable = false;
    cc.loader.downloader.loadSubpackage("resources", function (err) {
      if (err) {
        console.log(err);

        _self.goH5Load();
      } else {
        cc.loader.loadResDir("resources", function (err, res) {
          console.log("you can go now!!!!!!!!!");
          cc.director.preloadScene('menu', _self.onProgress.bind(_self), function () {
            cc.director.preloadScene('game', _self.onProgress.bind(_self), function () {
              //_self.wxlogin();
              _self.startBut.getComponent(cc.Button).interactable = true;
            });
          });
        });
      }
    });
  },
  wxlogin: function wxlogin() {
    //let exportJson = {};
    //window.wx.login({
    //    success: (userRes) => {
    //        exportJson.code = userRes.code;//向服务端传递code用于获取微信小游戏的用户唯一标识
    //    },
    //});
    var datanode = cc.find('GameData').getComponent('GameData');

    var _self = this;

    var exportJson = {};
    var sysInfo = window.wx.getSystemInfoSync(); //获取微信界面大小

    var width = sysInfo.screenWidth;
    var height = sysInfo.screenHeight; //_self.startBut.getComponent(cc.Button).interactable = false;

    window.wx.getSetting({
      success: function success(res) {
        console.log(res.authSetting);

        if (res.authSetting["scope.userInfo"]) {
          console.log("用户已授权");
          window.wx.getUserInfo({
            success: function success(res) {
              console.log(res);
              exportJson.userInfo = res.userInfo;
              datanode.setWxUser(res.userInfo); //此时可进行登录操作
              //_self.startBut.getComponent(cc.Button).interactable = true;

              _self.play();
            }
          });
        } else {
          console.log("用户未授权");
          _self.startBut.getComponent(cc.Button).interactable = true;
          var button = window.wx.createUserInfoButton({
            type: 'text',
            text: '',
            style: {
              left: 0,
              top: 0,
              width: width,
              height: height,
              backgroundColor: '#00000000',
              //最后两位为透明度
              color: '#ffffff',
              fontSize: 20,
              textAlign: "center",
              lineHeight: height
            }
          });
          button.onTap(function (res) {
            if (res.userInfo) {
              console.log("用户授权:", res);
              exportJson.userInfo = res.userInfo; //此时可进行登录操作

              datanode.setWxUser(res.userInfo);

              _self.play();

              button.destroy();
            } else {
              console.log("用户拒绝授权:", res);
            }
          });
        }
      }
    });
  },
  goH5Load: function goH5Load() {
    var _self = this;

    cc.director.preloadScene('menu', this.onProgress.bind(this), function () {
      cc.director.preloadScene('game', _self.onProgress.bind(_self), function () {
        _self.startBut.getComponent(cc.Button).interactable = true;
      });
    });
  },
  start: function start() {//this.loadProtobuf();
    //this.testProtobuf();
  },
  loadProtobuf: function loadProtobuf() {
    var myprotobuf = protobuf;
    var filename = "acdata.proto";
    myprotobuf.load(filename, function (err, root) {
      if (err) {
        throw err;
      }

      var acMessage = root.lookupType("AcWar.AcwarMessage");
      console.log(acMessage);
    });
  },
  testProtobuf: function testProtobuf() {
    if (cc.sys.isNative) {
      //在native上加载失败，是因为没有找到目录，我们在testProtobuf函数里面添加一个搜索目录:
      cc.log("jsb.fileUtils=" + jsb.fileUtils); //下面这段代码在PC window平台运行没问题，但是在android下面就出问题了
      //jsb.fileUtils.addSearchPath("res\\raw-assets\\resources", true);
      //需要改成这样：

      jsb.fileUtils.addSearchPath("res/raw-assets/resources", true); //坑太多了。。没办法
    }

    var filename1 = "acdata.proto"; // cc.loader.loadRes(filename1, cc.TextAsset, function (error, result) {//指定加载文本资源
    //     cc.log("loadRes error=" + error + ",result = " + result + ",type=" + typeof result);
    //     // callback(null, result);
    // });

    var protobufHere = protobuf; //require("protobuf");//导入为插件，直接使用

    protobufHere.load(filename1, function (err, root) {
      //Data/PbLobby.proto
      if (err) {
        console.log("load proto err:" + err);
        throw err;
      }
      /*
                  cc.log("root=" + root);
                  for (var i in root) {
                      cc.log("root." + i + "=" + root[i]);
                  }
                  //return;
      */


      cc.log("加载protobuf完毕，开始测试protobuf...");
      /*
                  var cmd = root.lookupEnum("PbLobby.Cmd");
                  cc.log(`cmd = ${JSON.stringify(cmd)}`);
                  cc.log("CMD_KEEPALIVED_C2S = "+cmd.values.CMD_KEEPALIVED_C2S);
      
                  //lookup 等价于 lookupTypeOrEnum 
                  //不同的是 lookup找不到返回null,lookupTypeOrEnum找不到则是抛出异常
                  var type1 = root.lookup("PbLobby.Cmd1");
                  cc.log("type1 = "+type1);
                  var type2 = root.lookup("PbLobby.Test1");
                  cc.log("type2 = "+type2);
      */

      /*
                  // Obtain a message type
                  var Test1Message = root.lookupType("AcWar.AcwarMessage");
                  cc.log("Test1Message = "+Test1Message);
      
                  // Exemplary payload
                  var payload = { id: 1,name:"hello protobuf" };
                  //var payload = { ids: 1,name:"hello protobuf" };
                  cc.log(`payload = ${JSON.stringify(payload)}`);
                  //过滤掉一些message中的不存在的字段
                  // Create a new message
                  var message = Test1Message.create(payload); // or use .fromObject if conversion is necessary
                  cc.log(`message = ${JSON.stringify(message)}`);
      
      
                  // Encode a message to an Uint8Array (browser) or Buffer (node)
                  var buffer = Test1Message.encode(message).finish();
                  cc.log("buffer1 = "+buffer);
                  cc.log(`buffer2 = ${Array.prototype.toString.call(buffer)}`);
                  // ... do something with buffer
      
                  // Decode an Uint8Array (browser) or Buffer (node) to a message
                  var decoded = Test1Message.decode(buffer);
                  cc.log("decoded1 = "+decoded);
                  cc.log(`decoded2 = ${JSON.stringify(decoded)}`);
                  // ... do something with message
      
                  // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.
      
                  //一般情况下，也不需要下面的转换
                  // Maybe convert the message back to a plain object
                  var object = Test1Message.toObject(decoded, {
                      longs: String,
                      enums: String,
                      bytes: String,
                      // see ConversionOptions
                  });
                  cc.log("object = "+JSON.stringify(object));
      */
    });
  },
  play: function play() {
    cc.director.loadScene('menu');
  },
  onProgress: function onProgress(completedCount, totalCount, item) {
    this.loading.progress = completedCount / totalCount;
    this.loadLabel.string = Math.floor(completedCount / totalCount * 100) + "%";
  } // update (dt) {},

});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1dlbGNvbWUuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsb2FkaW5nIiwiUHJvZ3Jlc3NCYXIiLCJsb2FkTGFiZWwiLCJMYWJlbCIsInN0YXJ0QnV0IiwiQnV0dG9uIiwib25Mb2FkIiwiX3NlbGYiLCJnZXRDb21wb25lbnQiLCJpbnRlcmFjdGFibGUiLCJsb2FkZXIiLCJkb3dubG9hZGVyIiwibG9hZFN1YnBhY2thZ2UiLCJlcnIiLCJjb25zb2xlIiwibG9nIiwiZ29INUxvYWQiLCJsb2FkUmVzRGlyIiwicmVzIiwiZGlyZWN0b3IiLCJwcmVsb2FkU2NlbmUiLCJvblByb2dyZXNzIiwiYmluZCIsInd4bG9naW4iLCJkYXRhbm9kZSIsImZpbmQiLCJleHBvcnRKc29uIiwic3lzSW5mbyIsIndpbmRvdyIsInd4IiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJ3aWR0aCIsInNjcmVlbldpZHRoIiwiaGVpZ2h0Iiwic2NyZWVuSGVpZ2h0IiwiZ2V0U2V0dGluZyIsInN1Y2Nlc3MiLCJhdXRoU2V0dGluZyIsImdldFVzZXJJbmZvIiwidXNlckluZm8iLCJzZXRXeFVzZXIiLCJwbGF5IiwiYnV0dG9uIiwiY3JlYXRlVXNlckluZm9CdXR0b24iLCJ0eXBlIiwidGV4dCIsInN0eWxlIiwibGVmdCIsInRvcCIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwiZm9udFNpemUiLCJ0ZXh0QWxpZ24iLCJsaW5lSGVpZ2h0Iiwib25UYXAiLCJkZXN0cm95Iiwic3RhcnQiLCJsb2FkUHJvdG9idWYiLCJteXByb3RvYnVmIiwicHJvdG9idWYiLCJmaWxlbmFtZSIsImxvYWQiLCJyb290IiwiYWNNZXNzYWdlIiwibG9va3VwVHlwZSIsInRlc3RQcm90b2J1ZiIsInN5cyIsImlzTmF0aXZlIiwianNiIiwiZmlsZVV0aWxzIiwiYWRkU2VhcmNoUGF0aCIsImZpbGVuYW1lMSIsInByb3RvYnVmSGVyZSIsImxvYWRTY2VuZSIsImNvbXBsZXRlZENvdW50IiwidG90YWxDb3VudCIsIml0ZW0iLCJwcm9ncmVzcyIsInN0cmluZyIsIk1hdGgiLCJmbG9vciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUMsSUFBQUEsT0FBTyxFQUFFSixFQUFFLENBQUNLLFdBakJKO0FBa0JSQyxJQUFBQSxTQUFTLEVBQUVOLEVBQUUsQ0FBQ08sS0FsQk47QUFtQlJDLElBQUFBLFFBQVEsRUFBRVIsRUFBRSxDQUFDUztBQW5CTCxHQUhQO0FBeUJMO0FBRUFDLEVBQUFBLE1BM0JLLG9CQTJCSztBQUNOO0FBQ0E7QUFDQSxRQUFJQyxLQUFLLEdBQUcsSUFBWjs7QUFFQSxTQUFLSCxRQUFMLENBQWNJLFlBQWQsQ0FBMkJaLEVBQUUsQ0FBQ1MsTUFBOUIsRUFBc0NJLFlBQXRDLEdBQXFELEtBQXJEO0FBRUFiLElBQUFBLEVBQUUsQ0FBQ2MsTUFBSCxDQUFVQyxVQUFWLENBQXFCQyxjQUFyQixDQUFvQyxXQUFwQyxFQUFpRCxVQUFDQyxHQUFELEVBQVE7QUFDckQsVUFBR0EsR0FBSCxFQUFRO0FBQ0pDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixHQUFaOztBQUNBTixRQUFBQSxLQUFLLENBQUNTLFFBQU47QUFDSCxPQUhELE1BR087QUFDSHBCLFFBQUFBLEVBQUUsQ0FBQ2MsTUFBSCxDQUFVTyxVQUFWLENBQXFCLFdBQXJCLEVBQWtDLFVBQUNKLEdBQUQsRUFBTUssR0FBTixFQUFhO0FBQzNDSixVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx5QkFBWjtB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QkFBUDtBQUVaOzs7Ozs7Ozs7Ozs7O0FBYUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdDUyxLQXJFRDtBQXNFSCxHQTdPSTtBQWdQTDBCLEVBQUFBLElBQUksRUFBRSxnQkFBVztBQUNiN0MsSUFBQUEsRUFBRSxDQUFDdUIsUUFBSCxDQUFZc0QsU0FBWixDQUFzQixNQUF0QjtBQUNILEdBbFBJO0FBb1BMcEQsRUFBQUEsVUFBVSxFQUFFLG9CQUFTcUQsY0FBVCxFQUF5QkMsVUFBekIsRUFBcUNDLElBQXJDLEVBQTBDO0FBQ2xELFNBQUs1RSxPQUFMLENBQWE2RSxRQUFiLEdBQXdCSCxjQUFjLEdBQUNDLFVBQXZDO0FBQ0EsU0FBS3pFLFNBQUwsQ0FBZTRFLE1BQWYsR0FBd0JDLElBQUksQ0FBQ0MsS0FBTCxDQUFXTixjQUFjLEdBQUNDLFVBQWYsR0FBNEIsR0FBdkMsSUFBOEMsR0FBdEU7QUFDSCxHQXZQSSxDQXlQTDs7QUF6UEssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuLy92YXIgcHAgPSByZXF1aXJlKFwiYWNkYXRhXCIpLkFjV2FyO1xuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuXG4gICAgICAgIGxvYWRpbmc6IGNjLlByb2dyZXNzQmFyLFxuICAgICAgICBsb2FkTGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBzdGFydEJ1dDogY2MuQnV0dG9uLFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIC8vdGhpcy5hdWRpb01uZyA9IHRoaXMuYXVkaW9NbmcuZ2V0Q29tcG9uZW50KCdBdWRpb01uZycpO1xuICAgICAgICAvL3RoaXMuYXVkaW9NbmcucGxheU11c2ljKCk7XG4gICAgICAgIHZhciBfc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5zdGFydEJ1dC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcblxuICAgICAgICBjYy5sb2FkZXIuZG93bmxvYWRlci5sb2FkU3VicGFja2FnZShcInJlc291cmNlc1wiLCAoZXJyKT0+IHtcbiAgICAgICAgICAgIGlmKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgX3NlbGYuZ29INUxvYWQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXNEaXIoXCJyZXNvdXJjZXNcIiwgKGVyciwgcmVzKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgY2FuIGdvIG5vdyEhISEhISEhIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKCdtZW51JywgX3NlbGYub25Qcm9ncmVzcy5iaW5kKF9zZWxmKSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoJ2dhbWUnLCBfc2VsZi5vblByb2dyZXNzLmJpbmQoX3NlbGYpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL19zZWxmLnd4bG9naW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZi5zdGFydEJ1dC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICB3eGxvZ2luOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy9sZXQgZXhwb3J0SnNvbiA9IHt9O1xuICAgICAgICAvL3dpbmRvdy53eC5sb2dpbih7XG4gICAgICAgIC8vICAgIHN1Y2Nlc3M6ICh1c2VyUmVzKSA9PiB7XG4gICAgICAgIC8vICAgICAgICBleHBvcnRKc29uLmNvZGUgPSB1c2VyUmVzLmNvZGU7Ly/lkJHmnI3liqHnq6/kvKDpgJJjb2Rl55So5LqO6I635Y+W5b6u5L+h5bCP5ri45oiP55qE55So5oi35ZSv5LiA5qCH6K+GXG4gICAgICAgIC8vICAgIH0sXG4gICAgICAgIC8vfSk7XG4gICAgICAgIGxldCBkYXRhbm9kZSA9IGNjLmZpbmQoJ0dhbWVEYXRhJykuZ2V0Q29tcG9uZW50KCdHYW1lRGF0YScpO1xuXG4gICAgICAgIGxldCBfc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBleHBvcnRKc29uID0ge307XG4gICAgICAgIGxldCBzeXNJbmZvID0gd2luZG93Lnd4LmdldFN5c3RlbUluZm9TeW5jKCk7XG4gICAgICAgIC8v6I635Y+W5b6u5L+h55WM6Z2i5aSn5bCPXG4gICAgICAgIGxldCB3aWR0aCA9IHN5c0luZm8uc2NyZWVuV2lkdGg7XG4gICAgICAgIGxldCBoZWlnaHQgPSBzeXNJbmZvLnNjcmVlbkhlaWdodDtcbiAgICAgICAgLy9fc2VsZi5zdGFydEJ1dC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcblxuICAgICAgICB3aW5kb3cud3guZ2V0U2V0dGluZyh7XG4gICAgICAgICAgICBzdWNjZXNzIChyZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuYXV0aFNldHRpbmcpO1xuICAgICAgICAgICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbXCJzY29wZS51c2VySW5mb1wiXSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIueUqOaIt+W3suaOiOadg1wiKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lnd4LmdldFVzZXJJbmZvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9ydEpzb24udXNlckluZm8gPSByZXMudXNlckluZm87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YW5vZGUuc2V0V3hVc2VyKHJlcy51c2VySW5mbyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+atpOaXtuWPr+i/m+ihjOeZu+W9leaTjeS9nFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vX3NlbGYuc3RhcnRCdXQuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZi5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55So5oi35pyq5o6I5p2DXCIpO1xuICAgICAgICAgICAgICAgICAgICBfc2VsZi5zdGFydEJ1dC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYnV0dG9uID0gd2luZG93Lnd4LmNyZWF0ZVVzZXJJbmZvQnV0dG9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwMDAwMDAwJywvL+acgOWQjuS4pOS9jeS4uumAj+aYjuW6plxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDIwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBidXR0b24ub25UYXAoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy51c2VySW5mbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55So5oi35o6I5p2DOlwiLCByZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9ydEpzb24udXNlckluZm8gPSByZXMudXNlckluZm87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mraTml7blj6/ov5vooYznmbvlvZXmk43kvZxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhbm9kZS5zZXRXeFVzZXIocmVzLnVzZXJJbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZi5wbGF5KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b24uZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55So5oi35ouS57ud5o6I5p2DOlwiLCByZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIGdvSDVMb2FkICgpIHtcbiAgICAgICAgdmFyIF9zZWxmID0gdGhpcztcbiAgICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKCdtZW51JywgdGhpcy5vblByb2dyZXNzLmJpbmQodGhpcyksIGZ1bmN0aW9uKCkgeyAgICBcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZSgnZ2FtZScsIF9zZWxmLm9uUHJvZ3Jlc3MuYmluZChfc2VsZiksIGZ1bmN0aW9uKCkgeyAgICBcbiAgICAgICAgICAgICAgICBfc2VsZi5zdGFydEJ1dC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIC8vdGhpcy5sb2FkUHJvdG9idWYoKTtcbiAgICAgICAgLy90aGlzLnRlc3RQcm90b2J1ZigpO1xuXG4gICAgfSxcblxuICAgIGxvYWRQcm90b2J1ZjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBteXByb3RvYnVmID0gcHJvdG9idWY7XG4gICAgICAgIHZhciBmaWxlbmFtZSA9IFwiYWNkYXRhLnByb3RvXCI7XG4gICAgICAgIG15cHJvdG9idWYubG9hZChmaWxlbmFtZSwgZnVuY3Rpb24oZXJyLCByb290KSB7XG4gICAgICAgICAgICBpZihlcnIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBhY01lc3NhZ2UgPSByb290Lmxvb2t1cFR5cGUoXCJBY1dhci5BY3dhck1lc3NhZ2VcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhY01lc3NhZ2UpO1xuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICB0ZXN0UHJvdG9idWY6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkgey8v5ZyobmF0aXZl5LiK5Yqg6L295aSx6LSl77yM5piv5Zug5Li65rKh5pyJ5om+5Yiw55uu5b2V77yM5oiR5Lus5ZyodGVzdFByb3RvYnVm5Ye95pWw6YeM6Z2i5re75Yqg5LiA5Liq5pCc57Si55uu5b2VOlxuICAgICAgICAgICAgY2MubG9nKFwianNiLmZpbGVVdGlscz1cIiArIGpzYi5maWxlVXRpbHMpO1xuXG4gICAgICAgICAgICAvL+S4i+mdoui/meauteS7o+eggeWcqFBDIHdpbmRvd+W5s+WPsOi/kOihjOayoemXrumimO+8jOS9huaYr+WcqGFuZHJvaWTkuIvpnaLlsLHlh7rpl67popjkuoZcbiAgICAgICAgICAgIC8vanNiLmZpbGVVdGlscy5hZGRTZWFyY2hQYXRoKFwicmVzXFxcXHJhdy1hc3NldHNcXFxccmVzb3VyY2VzXCIsIHRydWUpO1xuICAgICAgICAgICAgLy/pnIDopoHmlLnmiJDov5nmoLfvvJpcbiAgICAgICAgICAgIGpzYi5maWxlVXRpbHMuYWRkU2VhcmNoUGF0aChcInJlcy9yYXctYXNzZXRzL3Jlc291cmNlc1wiLCB0cnVlKTsvL+WdkeWkquWkmuS6huOAguOAguayoeWKnuazlVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZpbGVuYW1lMSA9IFwiYWNkYXRhLnByb3RvXCI7XG4gICAgICAgIC8vIGNjLmxvYWRlci5sb2FkUmVzKGZpbGVuYW1lMSwgY2MuVGV4dEFzc2V0LCBmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdCkgey8v5oyH5a6a5Yqg6L295paH5pys6LWE5rqQXG4gICAgICAgIC8vICAgICBjYy5sb2coXCJsb2FkUmVzIGVycm9yPVwiICsgZXJyb3IgKyBcIixyZXN1bHQgPSBcIiArIHJlc3VsdCArIFwiLHR5cGU9XCIgKyB0eXBlb2YgcmVzdWx0KTtcbiAgICAgICAgLy8gICAgIC8vIGNhbGxiYWNrKG51bGwsIHJlc3VsdCk7XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIHZhciBwcm90b2J1ZkhlcmUgPSBwcm90b2J1ZjsvL3JlcXVpcmUoXCJwcm90b2J1ZlwiKTsvL+WvvOWFpeS4uuaPkuS7tu+8jOebtOaOpeS9v+eUqFxuICAgICAgICBwcm90b2J1ZkhlcmUubG9hZChmaWxlbmFtZTEsIGZ1bmN0aW9uIChlcnIsIHJvb3QpIHsvL0RhdGEvUGJMb2JieS5wcm90b1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9hZCBwcm90byBlcnI6XCIgKyBlcnIpO1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH1cblxuLypcbiAgICAgICAgICAgIGNjLmxvZyhcInJvb3Q9XCIgKyByb290KTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gcm9vdCkge1xuICAgICAgICAgICAgICAgIGNjLmxvZyhcInJvb3QuXCIgKyBpICsgXCI9XCIgKyByb290W2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vcmV0dXJuO1xuKi9cblxuICAgICAgICAgICAgY2MubG9nKFwi5Yqg6L29cHJvdG9idWblrozmr5XvvIzlvIDlp4vmtYvor5Vwcm90b2J1Zi4uLlwiKVxuXG4vKlxuICAgICAgICAgICAgdmFyIGNtZCA9IHJvb3QubG9va3VwRW51bShcIlBiTG9iYnkuQ21kXCIpO1xuICAgICAgICAgICAgY2MubG9nKGBjbWQgPSAke0pTT04uc3RyaW5naWZ5KGNtZCl9YCk7XG4gICAgICAgICAgICBjYy5sb2coXCJDTURfS0VFUEFMSVZFRF9DMlMgPSBcIitjbWQudmFsdWVzLkNNRF9LRUVQQUxJVkVEX0MyUyk7XG5cbiAgICAgICAgICAgIC8vbG9va3VwIOetieS7t+S6jiBsb29rdXBUeXBlT3JFbnVtIFxuICAgICAgICAgICAgLy/kuI3lkIznmoTmmK8gbG9va3Vw5om+5LiN5Yiw6L+U5ZuebnVsbCxsb29rdXBUeXBlT3JFbnVt5om+5LiN5Yiw5YiZ5piv5oqb5Ye65byC5bi4XG4gICAgICAgICAgICB2YXIgdHlwZTEgPSByb290Lmxvb2t1cChcIlBiTG9iYnkuQ21kMVwiKTtcbiAgICAgICAgICAgIGNjLmxvZyhcInR5cGUxID0gXCIrdHlwZTEpO1xuICAgICAgICAgICAgdmFyIHR5cGUyID0gcm9vdC5sb29rdXAoXCJQYkxvYmJ5LlRlc3QxXCIpO1xuICAgICAgICAgICAgY2MubG9nKFwidHlwZTIgPSBcIit0eXBlMik7XG4qL1xuXG4vKlxuICAgICAgICAgICAgLy8gT2J0YWluIGEgbWVzc2FnZSB0eXBlXG4gICAgICAgICAgICB2YXIgVGVzdDFNZXNzYWdlID0gcm9vdC5sb29rdXBUeXBlKFwiQWNXYXIuQWN3YXJNZXNzYWdlXCIpO1xuICAgICAgICAgICAgY2MubG9nKFwiVGVzdDFNZXNzYWdlID0gXCIrVGVzdDFNZXNzYWdlKTtcblxuICAgICAgICAgICAgLy8gRXhlbXBsYXJ5IHBheWxvYWRcbiAgICAgICAgICAgIHZhciBwYXlsb2FkID0geyBpZDogMSxuYW1lOlwiaGVsbG8gcHJvdG9idWZcIiB9O1xuICAgICAgICAgICAgLy92YXIgcGF5bG9hZCA9IHsgaWRzOiAxLG5hbWU6XCJoZWxsbyBwcm90b2J1ZlwiIH07XG4gICAgICAgICAgICBjYy5sb2coYHBheWxvYWQgPSAke0pTT04uc3RyaW5naWZ5KHBheWxvYWQpfWApO1xuICAgICAgICAgICAgLy/ov4fmu6TmjonkuIDkupttZXNzYWdl5Lit55qE5LiN5a2Y5Zyo55qE5a2X5q61XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBuZXcgbWVzc2FnZVxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBUZXN0MU1lc3NhZ2UuY3JlYXRlKHBheWxvYWQpOyAvLyBvciB1c2UgLmZyb21PYmplY3QgaWYgY29udmVyc2lvbiBpcyBuZWNlc3NhcnlcbiAgICAgICAgICAgIGNjLmxvZyhgbWVzc2FnZSA9ICR7SlNPTi5zdHJpbmdpZnkobWVzc2FnZSl9YCk7XG5cblxuICAgICAgICAgICAgLy8gRW5jb2RlIGEgbWVzc2FnZSB0byBhbiBVaW50OEFycmF5IChicm93c2VyKSBvciBCdWZmZXIgKG5vZGUpXG4gICAgICAgICAgICB2YXIgYnVmZmVyID0gVGVzdDFNZXNzYWdlLmVuY29kZShtZXNzYWdlKS5maW5pc2goKTtcbiAgICAgICAgICAgIGNjLmxvZyhcImJ1ZmZlcjEgPSBcIitidWZmZXIpO1xuICAgICAgICAgICAgY2MubG9nKGBidWZmZXIyID0gJHtBcnJheS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChidWZmZXIpfWApO1xuICAgICAgICAgICAgLy8gLi4uIGRvIHNvbWV0aGluZyB3aXRoIGJ1ZmZlclxuXG4gICAgICAgICAgICAvLyBEZWNvZGUgYW4gVWludDhBcnJheSAoYnJvd3Nlcikgb3IgQnVmZmVyIChub2RlKSB0byBhIG1lc3NhZ2VcbiAgICAgICAgICAgIHZhciBkZWNvZGVkID0gVGVzdDFNZXNzYWdlLmRlY29kZShidWZmZXIpO1xuICAgICAgICAgICAgY2MubG9nKFwiZGVjb2RlZDEgPSBcIitkZWNvZGVkKTtcbiAgICAgICAgICAgIGNjLmxvZyhgZGVjb2RlZDIgPSAke0pTT04uc3RyaW5naWZ5KGRlY29kZWQpfWApO1xuICAgICAgICAgICAgLy8gLi4uIGRvIHNvbWV0aGluZyB3aXRoIG1lc3NhZ2VcblxuICAgICAgICAgICAgLy8gSWYgdGhlIGFwcGxpY2F0aW9uIHVzZXMgbGVuZ3RoLWRlbGltaXRlZCBidWZmZXJzLCB0aGVyZSBpcyBhbHNvIGVuY29kZURlbGltaXRlZCBhbmQgZGVjb2RlRGVsaW1pdGVkLlxuXG4gICAgICAgICAgICAvL+S4gOiIrOaDheWGteS4i++8jOS5n+S4jemcgOimgeS4i+mdoueahOi9rOaNolxuICAgICAgICAgICAgLy8gTWF5YmUgY29udmVydCB0aGUgbWVzc2FnZSBiYWNrIHRvIGEgcGxhaW4gb2JqZWN0XG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0gVGVzdDFNZXNzYWdlLnRvT2JqZWN0KGRlY29kZWQsIHtcbiAgICAgICAgICAgICAgICBsb25nczogU3RyaW5nLFxuICAgICAgICAgICAgICAgIGVudW1zOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgYnl0ZXM6IFN0cmluZyxcbiAgICAgICAgICAgICAgICAvLyBzZWUgQ29udmVyc2lvbk9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2MubG9nKFwib2JqZWN0ID0gXCIrSlNPTi5zdHJpbmdpZnkob2JqZWN0KSk7XG4qL1xuXG4gICAgICAgIH0pO1xuICAgIH0sXG5cblxuICAgIHBsYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ21lbnUnKTtcbiAgICB9LFxuXG4gICAgb25Qcm9ncmVzczogZnVuY3Rpb24oY29tcGxldGVkQ291bnQsIHRvdGFsQ291bnQsIGl0ZW0pe1xuICAgICAgICB0aGlzLmxvYWRpbmcucHJvZ3Jlc3MgPSBjb21wbGV0ZWRDb3VudC90b3RhbENvdW50O1xuICAgICAgICB0aGlzLmxvYWRMYWJlbC5zdHJpbmcgPSBNYXRoLmZsb29yKGNvbXBsZXRlZENvdW50L3RvdGFsQ291bnQgKiAxMDApICsgXCIlXCI7XG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=