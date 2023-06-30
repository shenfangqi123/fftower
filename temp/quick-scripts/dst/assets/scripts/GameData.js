
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/GameData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8204dK680RKmLHLtijslCkm', 'GameData');
// scripts/GameData.js

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
cc.Class({
  "extends": cc.Component,
  properties: {// foo: {
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
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    cc.game.addPersistRootNode(this.node);
    this.name = this.getRandomCharName();
    this.nick = this.name;
    this.isUpgrade = false;
    this.agentsDef = {
      "name": "test01",
      "level": 1,
      "myscore": 2300,
      "nextscore": 3500,
      "basescore": 15,
      //destroy one base will get that score
      "allList": ["log", "bomb", "ske", "ir", "hr", "bee", "gi", "lm", "lr", "wiz"],
      "myList": ["log", "hr", "bee", "ske"],
      "log": {
        "level": 1,
        "cost": 3
      },
      "bomb": {
        "level": 1,
        "cost": 4
      },
      "ske": {
        "level": 1,
        "cost": 1
      },
      "ir": {
        "level": 1,
        "cost": 3
      },
      "hr": {
        "level": 1,
        "cost": 4
      },
      "bee": {
        "level": 1,
        "cost": 1
      },
      "gi": {
        "level": 1,
        "cost": 4
      },
      "lm": {
        "level": 1,
        "cost": 3
      },
      "lr": {
        "level": 1,
        "cost": 2
      },
      "wiz": {
        "level": 1,
        "cost": 5
      }
    };
  },
  start: function start() {},
  getRandomCharName: function getRandomCharName() {
    var aphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var nick = "";

    for (var i = 0; i < 6; i++) {
      nick += aphabets[Math.floor(Math.random() * aphabets.length)];
    }

    return nick;
  },
  httpPost: function httpPost(user, params, fd, file) {
    //var url = "https://www.asobee.mobi/fftower/ffinfo.php?uid=" + user;
    //var url = "http://localhost/fftower/ffinfo.php?uid=" + user;
    var url = "http://35.77.248.155:10088/web_node/s2/ffinfo.php?uid=" + user;

    if (fd && file) {
      url += "&fd=" + fd + "&file=" + file;
    }

    return new Promise(function (resolve, reject) {
      var xhr = cc.loader.getXMLHttpRequest();

      xhr.onreadystatechange = function () {
        cc.log('xhr.readyState=' + xhr.readyState + '  xhr.status=' + xhr.status);

        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
          var respone = xhr.responseText;
          resolve(respone);
        } else if (xhr.readyState === 4 && xhr.status == 401) {
          reject("err");
        } else if (xhr.readyState === 4 && xhr.status == 0) {
          reject("err");
        }
      };

      xhr.open("GET", url, true); // note: In Internet Explorer, the timeout property may be set only after calling the open()
      // method and before calling the send() method.
      //xhr.timeout = 5000;// 5 seconds for timeout

      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(params);
    });
  },
  winScore: function winScore(score) {
    this.agentsDef.myscore += score;
    this.setMyScore(this.agentsDef.myscore);
  },
  setWxUser: function setWxUser(userInfo) {
    var uarr = userInfo.avatarUrl.split("/");
    var len = uarr.length;
    var ts = uarr[len - 2];
    var l1 = ts.substring(0, 6);
    var l2 = ts.substring(ts.length - 6);
    this.name = l1 + l2;
    this.nick = userInfo.nickName;
  },
  //自定义的两个函数。将值保存在this变量里
  setData: function setData(json) {
    this.agentsDef = json;
  },
  getName: function getName() {
    return this.name;
  },
  getNick: function getNick() {
    return this.nick;
  },
  getData: function getData() {
    return this.agentsDef;
  },
  setMyList: function setMyList(mylist) {
    this.agentsDef.myList = mylist;
    this.httpPost(this.name, "", "list", mylist).then(function (data) {
      console.log("------------setMyList------------------");
      console.log(data);
    }, function (err) {
      console.log(err);
    });
  },
  setUpgrade: function setUpgrade(val) {
    this.isUpgrade = false;
  },
  setMyScore: function setMyScore(score) {
    var _self = this;

    this.agentsDef.myscore = score;
    this.httpPost(this.name, "", "score", score).then(function (data) {
      console.log("------------setMyScore------------------");
      console.log(data);

      if (data == "uped") {
        _self.isUpgrade = true;
      }
    }, function (err) {
      console.log(err);
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0dhbWVEYXRhLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwiZ2FtZSIsImFkZFBlcnNpc3RSb290Tm9kZSIsIm5vZGUiLCJuYW1lIiwiZ2V0UmFuZG9tQ2hhck5hbWUiLCJuaWNrIiwiaXNVcGdyYWRlIiwiYWdlbnRzRGVmIiwic3RhcnQiLCJhcGhhYmV0cyIsImkiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsZW5ndGgiLCJodHRwUG9zdCIsInVzZXIiLCJwYXJhbXMiLCJmZCIsImZpbGUiLCJ1cmwiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInhociIsImxvYWRlciIsImdldFhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwibG9nIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbmUiLCJyZXNwb25zZVRleHQiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiLCJ3aW5TY29yZSIsInNjb3JlIiwibXlzY29yZSIsInNldE15U2NvcmUiLCJzZXRXeFVzZXIiLCJ1c2VySW5mbyIsInVhcnIiLCJhdmF0YXJVcmwiLCJzcGxpdCIsImxlbiIsInRzIiwibDEiLCJzdWJzdHJpbmciLCJsMiIsIm5pY2tOYW1lIiwic2V0RGF0YSIsImpzb24iLCJnZXROYW1lIiwiZ2V0TmljayIsImdldERhdGEiLCJzZXRNeUxpc3QiLCJteWxpc3QiLCJteUxpc3QiLCJ0aGVuIiwiZGF0YSIsImNvbnNvbGUiLCJlcnIiLCJzZXRVcGdyYWRlIiwidmFsIiwiX3NlbGYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRSxDQUNS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QzNELFNBQU4sR0FBa0IsSUFBbEI7QUFDSDtBQUNKLEtBTkQsRUFNRyxVQUFDd0QsR0FBRCxFQUFTO0FBQ1JELE1BQUFBLE9BQU8sQ0FBQ2pDLEdBQVIsQ0FBWWtDLEdBQVo7QUFDSCxLQVJEO0FBU0gsR0ExTEksQ0E0TEw7O0FBNUxLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBiYXI6IHtcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5nZXRSYW5kb21DaGFyTmFtZSgpO1xuICAgICAgICB0aGlzLm5pY2sgPSB0aGlzLm5hbWU7XG4gICAgICAgIHRoaXMuaXNVcGdyYWRlID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5hZ2VudHNEZWYgPSB7XG4gICAgICAgICAgICBcIm5hbWVcIjpcInRlc3QwMVwiLFxuICAgICAgICAgICAgXCJsZXZlbFwiOjEsXG4gICAgICAgICAgICBcIm15c2NvcmVcIjoyMzAwLFxuICAgICAgICAgICAgXCJuZXh0c2NvcmVcIjozNTAwLFxuICAgICAgICAgICAgXCJiYXNlc2NvcmVcIjoxNSwgICAvL2Rlc3Ryb3kgb25lIGJhc2Ugd2lsbCBnZXQgdGhhdCBzY29yZVxuICAgICAgICAgICAgXCJhbGxMaXN0XCI6W1wibG9nXCIsXCJib21iXCIsXCJza2VcIixcImlyXCIsXCJoclwiLFwiYmVlXCIsXCJnaVwiLFwibG1cIixcImxyXCIsXCJ3aXpcIl0sXG4gICAgICAgICAgICBcIm15TGlzdFwiOltcImxvZ1wiLFwiaHJcIixcImJlZVwiLFwic2tlXCJdLFxuXG4gICAgICAgICAgICBcImxvZ1wiOntcbiAgICAgICAgICAgICAgICBcImxldmVsXCI6MSxcbiAgICAgICAgICAgICAgICBcImNvc3RcIjozLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYm9tYlwiOntcbiAgICAgICAgICAgICAgICBcImxldmVsXCI6MSxcbiAgICAgICAgICAgICAgICBcImNvc3RcIjo0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2tlXCI6e1xuICAgICAgICAgICAgICAgIFwibGV2ZWxcIjoxLFxuICAgICAgICAgICAgICAgIFwiY29zdFwiOjEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJpclwiOntcbiAgICAgICAgICAgICAgICBcImxldmVsXCI6MSxcbiAgICAgICAgICAgICAgICBcImNvc3RcIjozLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaHJcIjp7XG4gICAgICAgICAgICAgICAgXCJsZXZlbFwiOjEsXG4gICAgICAgICAgICAgICAgXCJjb3N0XCI6NCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImJlZVwiOntcbiAgICAgICAgICAgICAgICBcImxldmVsXCI6MSxcbiAgICAgICAgICAgICAgICBcImNvc3RcIjoxLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2lcIjp7XG4gICAgICAgICAgICAgICAgXCJsZXZlbFwiOjEsXG4gICAgICAgICAgICAgICAgXCJjb3N0XCI6NCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImxtXCI6e1xuICAgICAgICAgICAgICAgIFwibGV2ZWxcIjoxLFxuICAgICAgICAgICAgICAgIFwiY29zdFwiOjMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJsclwiOntcbiAgICAgICAgICAgICAgICBcImxldmVsXCI6MSxcbiAgICAgICAgICAgICAgICBcImNvc3RcIjoyLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwid2l6XCI6e1xuICAgICAgICAgICAgICAgIFwibGV2ZWxcIjoxLFxuICAgICAgICAgICAgICAgIFwiY29zdFwiOjUsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgfSxcblxuICAgIGdldFJhbmRvbUNoYXJOYW1lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFwaGFiZXRzID1bXCJhXCIsXCJiXCIsXCJjXCIsXCJkXCIsXCJlXCIsXCJmXCIsXCJnXCIsXCJoXCIsXCJpXCIsXCJqXCIsXCJrXCIsXCJsXCIsXCJtXCIsXCJuXCIsXCJvXCIsXCJwXCIsXCJxXCIsXCJyXCIsXCJzXCIsXCJ0XCIsXCJ1XCIsXCJ2XCIsXCJ3XCIsXCJ4XCIsXCJ5XCIsXCJ6XCJdO1xuICAgICAgICB2YXIgbmljayA9IFwiXCI7XG4gICAgICAgIGZvcih2YXIgaT0wO2k8NjtpKyspIHtcbiAgICAgICAgICAgIG5pY2sgKz0gYXBoYWJldHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKmFwaGFiZXRzLmxlbmd0aCldO1xuICAgICAgICB9IFxuICAgICAgICByZXR1cm4gbmljaztcbiAgICB9LFxuXG4gICAgaHR0cFBvc3QodXNlcixwYXJhbXMsZmQsZmlsZSkge1xuICAgICAgICAvL3ZhciB1cmwgPSBcImh0dHBzOi8vd3d3LmFzb2JlZS5tb2JpL2ZmdG93ZXIvZmZpbmZvLnBocD91aWQ9XCIgKyB1c2VyO1xuICAgICAgICAvL3ZhciB1cmwgPSBcImh0dHA6Ly9sb2NhbGhvc3QvZmZ0b3dlci9mZmluZm8ucGhwP3VpZD1cIiArIHVzZXI7XG4gICAgICAgIHZhciB1cmwgPSBcImh0dHA6Ly8zNS43Ny4yNDguMTU1OjEwMDg4L3dlYl9ub2RlL3MyL2ZmaW5mby5waHA/dWlkPVwiICsgdXNlcjtcbiAgICAgICAgaWYoZmQgJiYgZmlsZSkge1xuICAgICAgICAgICAgdXJsICs9IFwiJmZkPVwiK2ZkICtcIiZmaWxlPVwiK2ZpbGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xuICAgICAgICAgICAgdmFyIHhociA9IGNjLmxvYWRlci5nZXRYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjYy5sb2coJ3hoci5yZWFkeVN0YXRlPScreGhyLnJlYWR5U3RhdGUrJyAgeGhyLnN0YXR1cz0nK3hoci5zdGF0dXMpO1xuICAgICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCAmJiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbmUgPSB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCAmJiB4aHIuc3RhdHVzID09IDQwMSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJlcnJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0ICYmIHhoci5zdGF0dXMgPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChcImVyclwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGhyLm9wZW4oXCJHRVRcIiwgdXJsLCB0cnVlKTtcbiAgICBcbiAgICAgICAgICAgIC8vIG5vdGU6IEluIEludGVybmV0IEV4cGxvcmVyLCB0aGUgdGltZW91dCBwcm9wZXJ0eSBtYXkgYmUgc2V0IG9ubHkgYWZ0ZXIgY2FsbGluZyB0aGUgb3BlbigpXG4gICAgICAgICAgICAvLyBtZXRob2QgYW5kIGJlZm9yZSBjYWxsaW5nIHRoZSBzZW5kKCkgbWV0aG9kLlxuICAgICAgICAgICAgLy94aHIudGltZW91dCA9IDUwMDA7Ly8gNSBzZWNvbmRzIGZvciB0aW1lb3V0XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpOyAgXG4gICAgICAgICAgICB4aHIuc2VuZChwYXJhbXMpO1xuICAgICAgICB9KSAgXG4gICAgfSxcblxuICAgIHdpblNjb3JlIDogZnVuY3Rpb24oc2NvcmUpIHtcbiAgICAgICAgdGhpcy5hZ2VudHNEZWYubXlzY29yZSArPSBzY29yZTtcbiAgICAgICAgdGhpcy5zZXRNeVNjb3JlKHRoaXMuYWdlbnRzRGVmLm15c2NvcmUpO1xuICAgIH0sXG5cbiAgICBzZXRXeFVzZXIgOiBmdW5jdGlvbih1c2VySW5mbykge1xuICAgICAgICB2YXIgdWFyciA9IHVzZXJJbmZvLmF2YXRhclVybC5zcGxpdChcIi9cIik7XG4gICAgICAgIHZhciBsZW4gPSB1YXJyLmxlbmd0aDtcbiAgICAgICAgdmFyIHRzID0gdWFycltsZW4tMl07XG4gICAgICAgIHZhciBsMSA9IHRzLnN1YnN0cmluZygwLDYpO1xuICAgICAgICB2YXIgbDIgPSB0cy5zdWJzdHJpbmcodHMubGVuZ3RoLTYpO1xuICAgICAgICB0aGlzLm5hbWUgPSBsMStsMjtcbiAgICAgICAgdGhpcy5uaWNrID0gdXNlckluZm8ubmlja05hbWU7XG4gICAgfSxcblxuICAgIC8v6Ieq5a6a5LmJ55qE5Lik5Liq5Ye95pWw44CC5bCG5YC85L+d5a2Y5ZyodGhpc+WPmOmHj+mHjFxuICAgIHNldERhdGEgOiBmdW5jdGlvbihqc29uKXtcbiAgICAgICAgdGhpcy5hZ2VudHNEZWYgPSBqc29uO1xuICAgIH0sXG5cbiAgICBnZXROYW1lIDogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9LFxuXG4gICAgZ2V0TmljayA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLm5pY2s7XG4gICAgfSxcblxuICAgIGdldERhdGEgOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5hZ2VudHNEZWY7ICBcbiAgICB9LFxuXG4gICAgc2V0TXlMaXN0IDogZnVuY3Rpb24obXlsaXN0KSB7XG4gICAgICAgIHRoaXMuYWdlbnRzRGVmLm15TGlzdCA9IG15bGlzdDtcblxuICAgICAgICB0aGlzLmh0dHBQb3N0KHRoaXMubmFtZSxcIlwiLFwibGlzdFwiLG15bGlzdCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS1zZXRNeUxpc3QtLS0tLS0tLS0tLS0tLS0tLS1cIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNldFVwZ3JhZGUgOiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgdGhpcy5pc1VwZ3JhZGUgPSBmYWxzZTsgICAgICAgICAgICAgICAgXG4gICAgfSxcblxuICAgIHNldE15U2NvcmUgOiBmdW5jdGlvbihzY29yZSkge1xuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmFnZW50c0RlZi5teXNjb3JlID0gc2NvcmU7XG5cbiAgICAgICAgdGhpcy5odHRwUG9zdCh0aGlzLm5hbWUsXCJcIixcInNjb3JlXCIsc2NvcmUpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tc2V0TXlTY29yZS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgaWYoZGF0YSA9PSBcInVwZWRcIikge1xuICAgICAgICAgICAgICAgIF9zZWxmLmlzVXBncmFkZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7Il19