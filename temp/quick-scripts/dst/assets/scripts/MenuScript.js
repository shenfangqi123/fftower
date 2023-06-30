
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/MenuScript.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e35c8uvDYNJtZPrAAvt2uLh', 'MenuScript');
// scripts/MenuScript.js

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
    loadLabel: cc.Label //audioMng: cc.Node,

  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {//this.audioMng = this.audioMng.getComponent('AudioMng');
    //this.audioMng.playMusic();
  },
  start: function start() {},
  onProgress: function onProgress(completedCount, totalCount, item) {
    //console.log( Math.floor(completedCount/totalCount * 100) + "%");
    this.loading.progress = completedCount / totalCount;
    this.loadLabel.string = Math.floor(completedCount / totalCount * 100) + "%";
  },
  goRelay: function goRelay(event, customEventData) {
    this.isShared = true;
    this.shareTag = customEventData;
    this.closeTime = new Date().getTime();

    if (CC_WECHATGAME) {
      //if wechat platform
      wx.shareAppMessage({
        title: "中古战纪",
        imageUrl: "https://www.asobee.mobi/fftower/res/acLogo2.jpg"
      });
    }
  },
  play: function play(event, customEventData) {
    var _this = this;

    var buffType = customEventData;

    if (CC_WECHATGAME && (buffType == "heal" || buffType == "thunder")) {
      // 创建激励视频广告实例，提前初始化
      var videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-ebd5d981ced848c7'
      }); // 用户触发广告后，显示激励视频广告

      videoAd.show()["catch"](function () {
        // 失败重试
        videoAd.load().then(function () {
          return videoAd.show();
        })["catch"](function (err) {
          console.log('激励视频 广告显示失败');
        });
      });
      videoAd.onError(function () {
        console.log('激励视频 广告加载失败');

        _this.goGame(buffType);
      });
      videoAd.onClose(function (res) {
        // 用户点击了【关闭广告】按钮
        // 小于 2.1.0 的基础库版本，res 是一个 undefined
        if (res && res.isEnded || res === undefined) {
          //cc.director.loadScene('game', onSceneLaunched);
          _this.goGame(buffType);
        }
      });
    } else {
      //cc.director.loadScene('game', onSceneLaunched);
      this.goGame(buffType);
    }
  },
  goGame: function goGame(buffType) {
    var selLayout = this.getSelLayoutNode();
    var selLayoutNode = selLayout.getComponent("SelLayout");
    var myAgentsParam = selLayoutNode.getNowAgents();
    var curTime = new Date().getTime();

    var onSceneLaunched = function onSceneLaunched() {
      console.log(myAgentsParam);
      var gameObj = cc.director.getScene().getChildByName('Canvas').getChildByName('layout');
      var gameNode = gameObj.getComponent('Game');
      gameNode.setBuffDisp(buffType);
      gameNode.setParam(myAgentsParam, curTime);
    };

    cc.director.loadScene('game', onSceneLaunched);
  },
  getSelLayoutNode: function getSelLayoutNode() {
    var selLayout = this.node.getChildByName("SelScrollView").getChildByName("view").getChildByName("content").getChildByName("SelLayout");
    return selLayout;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL01lbnVTY3JpcHQuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsb2FkaW5nIiwiUHJvZ3Jlc3NCYXIiLCJsb2FkTGFiZWwiLCJMYWJlbCIsIm9uTG9hZCIsInN0YXJ0Iiwib25Qcm9ncmVzcyIsImNvbXBsZXRlZENvdW50IiwidG90YWxDb3VudCIsIml0ZW0iLCJwcm9ncmVzcyIsInN0cmluZyIsIk1hdGgiLCJmbG9vciIsImdvUmVsYXkiLCJldmVudCIsImN1c3RvbUV2ZW50RGF0YSIsImlzU2hhcmVkIiwic2hhcmVUYWciLCJjbG9zZVRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsIkNDX1dFQ0hBVEdBTUUiLCJ3eCIsInNoYXJlQXBwTWVzc2FnZSIsInRpdGxlIiwiaW1hZ2VVcmwiLCJwbGF5IiwiYnVmZlR5cGUiLCJ2aWRlb0FkIiwiY3JlYXRlUmV3YXJkZWRWaWRlb0FkIiwiYWRVbml0SWQiLCJzaG93IiwibG9hZCIsInRoZW4iLCJlcnIiLCJjb25zb2xlIiwibG9nIiwib25FcnJvciIsImdvR2FtZSIsIm9uQ2xvc2UiLCJyZXMiLCJpc0VuZGVkIiwidW5kZWZpbmVkIiwic2VsTGF5b3V0IiwiZ2V0U2VsTGF5b3V0Tm9kZSIsInNlbExheW91dE5vZGUiLCJnZXRDb21wb25lbnQiLCJteUFnZW50c1BhcmFtIiwiZ2V0Tm93QWdlbnRzIiwiY3VyVGltZSIsIm9uU2NlbmVMYXVuY2hlZCIsImdhbWVPYmoiLCJkaXJlY3RvciIsImdldFNjZW5lIiwiZ2V0Q2hpbGRCeU5hbWUiLCJnYW1lTm9kZSIsInNldEJ1ZmZEaXNwIiwic2V0UGFyYW0iLCJsb2FkU2NlbmUiLCJub2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUs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LENBQXVCLFdBQXZCLENBQXBCO0FBQ0EsUUFBSUMsYUFBYSxHQUFHRixhQUFhLENBQUNHLFlBQWQsRUFBcEI7QUFDQSxRQUFJQyxPQUFPLEdBQUcsSUFBSTlCLElBQUosR0FBV0MsT0FBWCxFQUFkOztBQUVBLFFBQUk4QixlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLEdBQVc7QUFDN0JmLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZVyxhQUFaO0FBQ0EsVUFBSUksT0FBTyxHQUFHeEQsRUFBRSxDQUFDeUQsUUFBSCxDQUFZQyxRQUFaLEdBQXVCQyxjQUF2QixDQUFzQyxRQUF0QyxFQUFnREEsY0FBaEQsQ0FBK0QsUUFBL0QsQ0FBZDtBQUNBLFVBQUlDLFFBQVEsR0FBR0osT0FBTyxDQUFDTCxZQUFSLENBQXFCLE1BQXJCLENBQWY7QUFDQVMsTUFBQUEsUUFBUSxDQUFDQyxXQUFULENBQXFCN0IsUUFBckI7QUFDQTRCLE1BQUFBLFFBQVEsQ0FBQ0UsUUFBVCxDQUFrQlYsYUFBbEIsRUFBaUNFLE9BQWpDO0FBQ0gsS0FORDs7QUFRQXRELElBQUFBLEVBQUUsQ0FBQ3lELFFBQUgsQ0FBWU0sU0FBWixDQUFzQixNQUF0QixFQUE4QlIsZUFBOUI7QUFDSCxHQTNHSTtBQTZHTE4sRUFBQUEsZ0JBQWdCLEVBQUUsNEJBQVc7QUFDekIsUUFBSUQsU0FBUyxHQUFHLEtBQUtnQixJQUFMLENBQVVMLGNBQVYsQ0FBeUIsZUFBekIsRUFBMENBLGNBQTFDLENBQXlELE1BQXpELEVBQWlFQSxjQUFqRSxDQUFnRixTQUFoRixFQUEyRkEsY0FBM0YsQ0FBMEcsV0FBMUcsQ0FBaEI7QUFDQSxXQUFPWCxTQUFQO0FBQ0gsR0FoSEksQ0FrSEw7O0FBbEhLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBiYXI6IHtcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sXG5cbiAgICAgICAgbG9hZGluZzogY2MuUHJvZ3Jlc3NCYXIsXG4gICAgICAgIGxvYWRMYWJlbDogY2MuTGFiZWwsXG5cbiAgICAgICAgLy9hdWRpb01uZzogY2MuTm9kZSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICAvL3RoaXMuYXVkaW9NbmcgPSB0aGlzLmF1ZGlvTW5nLmdldENvbXBvbmVudCgnQXVkaW9NbmcnKTtcbiAgICAgICAgLy90aGlzLmF1ZGlvTW5nLnBsYXlNdXNpYygpO1xuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgfSxcblxuICAgIG9uUHJvZ3Jlc3M6IGZ1bmN0aW9uKGNvbXBsZXRlZENvdW50LCB0b3RhbENvdW50LCBpdGVtKXtcbiAgICAgICAgLy9jb25zb2xlLmxvZyggTWF0aC5mbG9vcihjb21wbGV0ZWRDb3VudC90b3RhbENvdW50ICogMTAwKSArIFwiJVwiKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nLnByb2dyZXNzID0gY29tcGxldGVkQ291bnQvdG90YWxDb3VudDtcbiAgICAgICAgdGhpcy5sb2FkTGFiZWwuc3RyaW5nID0gTWF0aC5mbG9vcihjb21wbGV0ZWRDb3VudC90b3RhbENvdW50ICogMTAwKSArIFwiJVwiO1xuICAgIH0sXG5cbiAgICBnb1JlbGF5OiBmdW5jdGlvbihldmVudCwgY3VzdG9tRXZlbnREYXRhKSB7XG4gICAgICAgIHRoaXMuaXNTaGFyZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNoYXJlVGFnID0gY3VzdG9tRXZlbnREYXRhO1xuICAgICAgICB0aGlzLmNsb3NlVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICBpZiAoQ0NfV0VDSEFUR0FNRSkgeyAgICAvL2lmIHdlY2hhdCBwbGF0Zm9ybVxuICAgICAgICAgICAgd3guc2hhcmVBcHBNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLkuK3lj6TmiJjnuqpcIixcbiAgICAgICAgICAgICAgICBpbWFnZVVybDogXCJodHRwczovL3d3dy5hc29iZWUubW9iaS9mZnRvd2VyL3Jlcy9hY0xvZ28yLmpwZ1wiXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHBsYXk6IGZ1bmN0aW9uKGV2ZW50LCBjdXN0b21FdmVudERhdGEpIHtcbiAgICAgICAgdmFyIGJ1ZmZUeXBlID0gY3VzdG9tRXZlbnREYXRhO1xuXG4gICAgICAgIGlmKENDX1dFQ0hBVEdBTUUgJiYgKGJ1ZmZUeXBlID09IFwiaGVhbFwiIHx8IGJ1ZmZUeXBlID09IFwidGh1bmRlclwiKSkge1xuICAgICAgICAgICAgLy8g5Yib5bu65r+A5Yqx6KeG6aKR5bm/5ZGK5a6e5L6L77yM5o+Q5YmN5Yid5aeL5YyWXG4gICAgICAgICAgICBsZXQgdmlkZW9BZCA9IHd4LmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7XG4gICAgICAgICAgICAgICAgYWRVbml0SWQ6ICdhZHVuaXQtZWJkNWQ5ODFjZWQ4NDhjNydcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyDnlKjmiLfop6blj5Hlub/lkYrlkI7vvIzmmL7npLrmv4DlirHop4bpopHlub/lkYpcbiAgICAgICAgICAgIHZpZGVvQWQuc2hvdygpLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyDlpLHotKXph43or5VcbiAgICAgICAgICAgICAgICB2aWRlb0FkLmxvYWQoKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB2aWRlb0FkLnNob3coKSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+a/gOWKseinhumikSDlub/lkYrmmL7npLrlpLHotKUnKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZpZGVvQWQub25FcnJvcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+a/gOWKseinhumikSDlub/lkYrliqDovb3lpLHotKUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdvR2FtZShidWZmVHlwZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmlkZW9BZC5vbkNsb3NlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgLy8g55So5oi354K55Ye75LqG44CQ5YWz6Zet5bm/5ZGK44CR5oyJ6ZKuXG4gICAgICAgICAgICAgICAgLy8g5bCP5LqOIDIuMS4wIOeahOWfuuehgOW6k+eJiOacrO+8jHJlcyDmmK/kuIDkuKogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuaXNFbmRlZCB8fCByZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvL2NjLmRpcmVjdG9yLmxvYWRTY2VuZSgnZ2FtZScsIG9uU2NlbmVMYXVuY2hlZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ29HYW1lKGJ1ZmZUeXBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdnYW1lJywgb25TY2VuZUxhdW5jaGVkKTtcbiAgICAgICAgICAgIHRoaXMuZ29HYW1lKGJ1ZmZUeXBlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnb0dhbWU6IGZ1bmN0aW9uKGJ1ZmZUeXBlKSB7XG4gICAgICAgIHZhciBzZWxMYXlvdXQgPSB0aGlzLmdldFNlbExheW91dE5vZGUoKTtcbiAgICAgICAgdmFyIHNlbExheW91dE5vZGUgPSBzZWxMYXlvdXQuZ2V0Q29tcG9uZW50KFwiU2VsTGF5b3V0XCIpO1xuICAgICAgICB2YXIgbXlBZ2VudHNQYXJhbSA9IHNlbExheW91dE5vZGUuZ2V0Tm93QWdlbnRzKCk7XG4gICAgICAgIHZhciBjdXJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgdmFyIG9uU2NlbmVMYXVuY2hlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobXlBZ2VudHNQYXJhbSk7XG4gICAgICAgICAgICB2YXIgZ2FtZU9iaiA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoJ0NhbnZhcycpLmdldENoaWxkQnlOYW1lKCdsYXlvdXQnKTtcbiAgICAgICAgICAgIHZhciBnYW1lTm9kZSA9IGdhbWVPYmouZ2V0Q29tcG9uZW50KCdHYW1lJyk7XG4gICAgICAgICAgICBnYW1lTm9kZS5zZXRCdWZmRGlzcChidWZmVHlwZSk7XG4gICAgICAgICAgICBnYW1lTm9kZS5zZXRQYXJhbShteUFnZW50c1BhcmFtLCBjdXJUaW1lKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2dhbWUnLCBvblNjZW5lTGF1bmNoZWQpO1xuICAgIH0sXG5cbiAgICBnZXRTZWxMYXlvdXROb2RlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbExheW91dCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlNlbFNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIlNlbExheW91dFwiKTtcbiAgICAgICAgcmV0dXJuIHNlbExheW91dDtcbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==