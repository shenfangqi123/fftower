
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/SelLayout.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '82e7bMCmi1Ex52PP3o8kNpv', 'SelLayout');
// scripts/SelLayout.js

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
// 定义一个判断函数
String.prototype.inArray = function (arr) {
  // 不是数组则抛出异常
  if (!arr) {
    console.log("ERR(in_array):Input is not an array");
  } // 遍历是否在数组中


  for (var i = 0, k = arr.length; i < k; i++) {
    if (this == arr[i]) {
      return true;
    }
  } // 如果不在数组中就会返回false


  return false;
};

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
    // 这个属性引用了预制资源
    playerPrefab: {
      "default": [],
      type: cc.Prefab
    },
    startBut1: cc.Button,
    startBut2: cc.Button,
    startBut3: cc.Button
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  onLoad: function onLoad() {
    var _self = this;

    this.startBut1.getComponent(cc.Button).interactable = false;
    this.startBut2.getComponent(cc.Button).interactable = false;
    this.startBut3.getComponent(cc.Button).interactable = false;
    var choosenCard = {};
    this.allCardNodes = [];
    this.myCardNodes = [];
    this.agentsDef = this.getPersistantData();
    this.node.on(cc.Node.EventType.TOUCH_END, function (params) {
      _self.unselect();
    });
    var node = cc.find('GameData').getComponent('GameData');
    var dataobj;
    this.username = node.getName(); //default roles for a user. other may need to get via video or relay.

    this.baseRoles = ["bee", "ske", "ir", "lr", "log", "lm", "hr"];
    this.wxRelayTime;
    node.httpPost(this.username, "").then(function (data) {
      console.log("------------GameData------------------");
      console.log(data);
      dataobj = JSON.parse(data);
      _self.agentsDef = dataobj;
      node.setData(dataobj);

      _self.setMyCards();

      _self.setAllCards();

      _self.setScore();

      _self.setUser();

      setTimeout(function () {
        _self.startBut1.getComponent(cc.Button).interactable = true;
        _self.startBut2.getComponent(cc.Button).interactable = true;
        _self.startBut3.getComponent(cc.Button).interactable = true;
      }, 2000);
    }, function (err) {
      //if no connection then use default data for test.
      data = "{\"name\":null,\"level\":1,\"myscore\":1000,\"nextscore\":1500,\"basescore\":20,\"allList\":[\"log\",\"bomb\",\"ske\",\"ir\",\"hr\",\"bee\",\"gi\",\"lm\",\"lr\",\"wiz\"],\"myList\":[\"log\",\"hr\",\"bee\",\"ske\",\"wiz\"],\"log\":{\"disp\":\"\u30DE\u30EB\u30BF\",\"level\":1,\"cost\":3},\"bomb\":{\"disp\":\"\u30DF\u30B5\u30A4\u30EB\",\"level\":1,\"cost\":4},\"ske\":{\"disp\":\"\u30B9\u30B1\u30EB\",\"level\":1,\"cost\":1},\"ir\":{\"disp\":\"\u30CA\u30A4\u30C8\",\"level\":1,\"cost\":3},\"hr\":{\"disp\":\"\u30EC\u30C3\u30C9\",\"level\":1,\"cost\":4},\"bee\":{\"disp\":\"\u30D0\u30C1\",\"level\":1,\"cost\":1},\"gi\":{\"disp\":\"\u77F3\u30DE\u30F3\",\"level\":1,\"cost\":4},\"lm\":{\"disp\":\"\u30BD\u30EB\",\"level\":1,\"cost\":3},\"lr\":{\"disp\":\"\u30A2\u30FC\u30C1\u30E3\u30FC\",\"level\":1,\"cost\":2},\"wiz\":{\"disp\":\"\u30A6\u30A3\u30BA\",\"level\":1,\"cost\":5}}";
      dataobj = JSON.parse(data);
      _self.agentsDef = dataobj;
      node.setData(dataobj);

      _self.setMyCards();

      _self.setAllCards();

      _self.setScore();

      _self.setUser();

      _self.startBut1.getComponent(cc.Button).interactable = true;
      _self.startBut2.getComponent(cc.Button).interactable = true;
      _self.startBut3.getComponent(cc.Button).interactable = true;
    });
  },
  start: function start() {
    var node = cc.find('GameData').getComponent('GameData');
    console.log("upgraded:" + node.isUpgrade);
    /*
            var _self = this;
            //var name = this.getRandomCharName();
            var node = cc.find('GameData').getComponent('GameData');
            var dataobj;
            this.username = node.getName();
    
            node.httpPost(this.username, "").then((data) => {
                console.log("------------GameData------------------");
                console.log(data);
                dataobj = JSON.parse(data);
                _self.agentsDef = dataobj;
                node.setData(dataobj);
                _self.setMyCards();
                _self.setAllCards();
                _self.setScore();
                _self.setUser();
    
                _self.startBut1.getComponent(cc.Button).interactable = true;
            }, (err) => {   //if no connection then use default data for test.
                _self.setMyCards();
                _self.setAllCards();
                _self.setScore();
                _self.setUser();
            });
    */
  },
  getRandomCharName: function getRandomCharName() {
    var aphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var nick = "";

    for (var i = 0; i < 6; i++) {
      nick += aphabets[Math.floor(Math.random() * aphabets.length)];
    }

    return nick;
  },
  setScore: function setScore() {
    var myscore = this.agentsDef.myscore;
    var nextscore = this.agentsDef.nextscore;
    var wallNode = this.node.getChildByName("clanWall");
    var myScoreLabel = wallNode.getChildByName("wordbg").getChildByName("myScore").getComponent("cc.Label");
    var nextScoreLabel = wallNode.getChildByName("wordbg").getChildByName("nextScore").getComponent("cc.Label");
    myScoreLabel.string = myscore;
    nextScoreLabel.string = "/" + nextscore;
  },
  setUser: function setUser() {
    var wonode = this.node.getChildByName("wobanner");
    var userLabel = wonode.getChildByName("username").getComponent("cc.Label");
    var levelLabel = wonode.getChildByName("userlevel").getComponent("cc.Label");
    userLabel.string = this.agentsDef.name;
    levelLabel.string = this.agentsDef.level;
  },
  setMyCards: function setMyCards() {
    var sx = -295;
    var sy = 24;
    var mx, my;
    var card, cardNode, cost, level;
    var moveTo;
    var allCards = this.agentsDef.myList;
    var rowItems = 0;
    var rows = 0;
    var cols = 0;
    var wallNode = this.node.getChildByName("clanWall");
    /*
            for(var i=0;i<6;i++) {
                cols = i%6;
                mx = sx+(cols*124);
                my = sy;
                card = cc.instantiate(this.playerPrefab[2]);
                moveTo = cc.v2(mx, my);
                card.setPosition(moveTo);
                wallNode.addChild(card);
            }
    */

    for (var i = 0; i < 6; i++) {
      card = cc.instantiate(this.playerPrefab[1]);
      cardNode = card.getComponent('SelCard');

      if (allCards[i]) {
        cost = this.agentsDef[allCards[i]].cost;
        level = this.agentsDef.level;
        cardNode.setRole(allCards[i], cost, level);
      }

      this.myCardNodes.push(cardNode);
      cols = i % 6;
      mx = sx + cols * 124;
      my = sy;
      moveTo = cc.v2(mx, my);
      card.setPosition(moveTo);
      wallNode.addChild(card);
    }
  },
  setRelayUI: function setRelayUI(role) {
    if (CC_WECHATGAME && !role.inArray(this.baseRoles)) {
      //if wechat platform
      wx.shareAppMessage({
        title: "中古战纪",
        imageUrl: "https://www.asobee.mobi/fftower/res/acLogo2.jpg"
      });
      this.wxRelayTime = new Date().getTime();
    }
  },
  ifWxValidRelay: function ifWxValidRelay() {
    var cur = new Date().getTime();

    if (cur - this.wxRelayTime < 3000) {
      return false;
    }

    return true;
  },
  seleOneCard: function seleOneCard(role) {
    var card;

    for (var i = 0; i < this.allCardNodes.length; i++) {
      card = this.allCardNodes[i];

      if (card.seleRole !== role) {
        this.choosenCard = this.agentsDef[role];
        this.choosenCard.role = role;
        card.grey(true);
      }
    }

    this.shakeMyCards(true);
    this.setRelayUI(role);
    this.dispWxRelayWarn(false);
  },
  dispWxRelayWarn: function dispWxRelayWarn(flag) {
    var warn = this.node.getChildByName("wxRelayWarn");
    warn.active = flag;
  },
  getNowAgents: function getNowAgents() {
    var cNodes = this.node.getChildByName("clanWall")._children;

    var tn;
    var ret = [];
    var agentsList = [];
    var ad = {};
    var role, cost, level;

    for (var i = 0; i < cNodes.length; i++) {
      if (cNodes[i]._name == "SelCard") {
        role = cNodes[i].getComponent("SelCard").seleRole;
        cost = cNodes[i].getComponent("SelCard").magicCost;
        level = cNodes[i].getComponent("SelCard").roleLevel;

        if (cost > 0) {
          ad = {
            "seleRole": role,
            "magicCost": cost,
            "roleLevel": level
          };
          agentsList.push(role);
          ret.push(ad);
        }
      }
    }

    var node = cc.find('GameData').getComponent('GameData');
    node.setMyList(agentsList);
    return ret;
  },
  getPersistantData: function getPersistantData(param) {
    var node = cc.find('GameData').getComponent('GameData');
    return node.getData();
  },
  setCardsStatus: function setCardsStatus(nowAgents) {
    var card;
    var sumMyCards = 0;
    var sumCost = 0;
    var average = 0;
    var wallNode = this.node.getChildByName("clanWall");
    var averageLabel = wallNode.getChildByName("wordboardbg").getChildByName("averageCos").getComponent("cc.Label");
    var myCardsNumLabel = wallNode.getChildByName("wordbg").getChildByName("cardBut").getChildByName("myCardNum").getComponent("cc.Label");
    var allCardsNumLabel = wallNode.getChildByName("wordbg").getChildByName("cardBut").getChildByName("allCardNum").getComponent("cc.Label");

    for (var i = 0; i < this.allCardNodes.length; i++) {
      card = this.allCardNodes[i];
      card.setCardStatus(card.seleRole.inArray(nowAgents));
    } //for average magicCost display


    for (var i = 0; i < this.myCardNodes.length; i++) {
      if (this.myCardNodes[i].magicCost != 0) {
        sumMyCards++;
        sumCost += this.myCardNodes[i].magicCost;
      }
    }

    average = sumCost / sumMyCards;
    averageLabel.string = average.toFixed(2); //我的兵牌显示

    myCardsNumLabel.string = sumMyCards;
    allCardsNumLabel.string = "/" + this.allCardNodes.length;
  },
  shakeMyCards: function shakeMyCards(flag) {
    var card;

    for (var i = 0; i < this.myCardNodes.length; i++) {
      card = this.myCardNodes[i];

      if (flag) {
        card.startCardJitter();
      } else {
        card.stopCardJitter();
      }
    }
  },
  unselect: function unselect() {
    var card;
    this.choosenCard = {};

    for (var i = 0; i < this.allCardNodes.length; i++) {
      card = this.allCardNodes[i];
      card.grey(false);
    }

    this.shakeMyCards(false); //this.dispWxRelayWarn(false);
  },
  setAllCards: function setAllCards() {
    var sx = -200;
    var sy = -400;
    var mx, my;
    var card, cardNode, cost, disp, icon;
    var moveTo;
    var allCards = this.agentsDef.allList;
    var rowItems = 0;
    var rows = 0;
    var cols = 0;

    for (var i = 0; i < allCards.length; i++) {
      cost = this.agentsDef[allCards[i]].cost;
      disp = this.agentsDef[allCards[i]].disp;
      rows = Math.floor(i / 4);
      cols = i % 4;
      my = sy - rows * 200;
      mx = sx + cols * 170;
      card = cc.instantiate(this.playerPrefab[0]);
      cardNode = card.getComponent('AllCard');
      cardNode.setRole(allCards[i], cost, disp);

      if (CC_WECHATGAME && !allCards[i].inArray(this.baseRoles)) {
        icon = cc.instantiate(this.playerPrefab[3]);
        icon.setPosition(cc.v2(38, 68));
        icon.scaleX = 0.6;
        icon.scaleY = 0.6;
        card.addChild(icon);
      }

      moveTo = cc.v2(mx, my);
      card.setPosition(moveTo);
      this.allCardNodes.push(cardNode);
      this.node.addChild(card);
    }

    this.setCardsStatus(this.agentsDef.myList);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1NlbExheW91dC5qcyJdLCJuYW1lcyI6WyJTdHJpbmciLCJwcm90b3R5cGUiLCJpbkFycmF5IiwiYXJyIiwiY29uc29sZSIsImxvZyIsImkiLCJrIiwibGVuZ3RoIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJwbGF5ZXJQcmVmYWIiLCJ0eXBlIiwiUHJlZmFiIiwic3RhcnRCdXQxIiwiQnV0dG9uIiwic3RhcnRCdXQyIiwic3RhcnRCdXQzIiwib25Mb2FkIiwiX3NlbGYiLCJnZXRDb21wb25lbnQiLCJpbnRlcmFjdGFibGUiLCJjaG9vc2VuQ2FyZCIsImFsbENhcmROb2RlcyIsIm15Q2FyZE5vZGVzIiwiYWdlbnRzRGVmIiwiZ2V0UGVyc2lzdGFudERhdGEiLCJub2RlIiwib24iLCJOb2RlIiwiRXZlbnRUeXBlIiwiVE9VQ0hfRU5EIiwicGFyYW1zIiwidW5zZWxlY3QiLCJmaW5kIiwiZGF0YW9iaiIsInVzZXJuYW1lIiwiZ2V0TmFtZSIsImJhc2VSb2xlcyIsInd4UmVsYXlUaW1lIiwiaHR0cFBvc3QiLCJ0aGVuIiwiZGF0YSIsIkpTT04iLCJwYXJzZSIsInNldERhdGEiLCJzZXRNeUNhcmRzIiwic2V0QWxsQ2FyZHMiLCJzZXRTY29yZSIsInNldFVzZXIiLCJzZXRUaW1lb3V0IiwiZXJyIiwic3RhcnQiLCJpc1VwZ3JhZGUiLCJnZXRSYW5kb21DaGFyTmFtZSIsImFwaGFiZXRzIiwibmljayIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIm15c2NvcmUiLCJuZXh0c2NvcmUiLCJ3YWxsTm9kZSIsImdldENoaWxkQnlOYW1lIiwibXlTY29yZUxhYmVsIiwibmV4dFNjb3JlTGFiZWwiLCJzdHJpbmciLCJ3b25vZGUiLCJ1c2VyTGFiZWwiLCJsZXZlbExhYmVsIiwibmFtZSIsImxldmVsIiwic3giLCJzeSIsIm14IiwibXkiLCJjYXJkIiwiY2FyZE5vZGUiLCJjb3N0IiwibW92ZVRvIiwiYWxsQ2FyZHMiLCJteUxpc3QiLCJyb3dJdGVtcyIsInJvd3MiLCJjb2xzIiwiaW5zdGFudGlhdGUiLCJzZXRSb2xlIiwicHVzaCIsInYyIiwic2V0UG9zaXRpb24iLCJhZGRDaGlsZCIsInNldFJlbGF5VUkiLCJyb2xlIiwiQ0NfV0VDSEFUR0FNRSIsInd4Iiwic2hhcmVBcHBNZXNzYWdlIiwidGl0bGUiLCJpbWFnZVVybCIsIkRhdGUiLCJnZXRUaW1lIiwiaWZXeFZhbGlkUmVsYXkiLCJjdXIiLCJzZWxlT25lQ2FyZCIsInNlbGVSb2xlIiwiZ3JleSIsInNoYWtlTXlDYXJkcyIsImRpc3BXeFJlbGF5V2FybiIsImZsYWciLCJ3YXJuIiwiYWN0aXZlIiwiZ2V0Tm93QWdlbnRzIiwiY05vZGVzIiwiX2NoaWxkcmVuIiwidG4iLCJyZXQiLCJhZ2VudHNMaXN0IiwiYWQiLCJfbmFtZSIsIm1hZ2ljQ29zdCIsInJvbGVMZXZlbCIsInNldE15TGlzdCIsInBhcmFtIiwiZ2V0RGF0YSIsInNldENhcmRzU3RhdHVzIiwibm93QWdlbnRzIiwic3VtTXlDYXJkcyIsInN1bUNvc3QiLCJhdmVyYWdlIiwiYXZlcmFnZUxhYmVsIiwibXlDYXJkc051bUxhYmVsIiwiYWxsQ2FyZHNOdW1MYWJlbCIsInNldENhcmRTdGF0dXMiLCJ0b0ZpeGVkIiwic3RhcnRDYXJkSml0dGVyIiwic3RvcENhcmRKaXR0ZXIiLCJkaXNwIiwiaWNvbiIsImFsbExpc3QiLCJzY2FsZVgiLCJzY2FsZVkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxPQUFqQixHQUEyQixVQUFTQyxHQUFULEVBQWE7QUFDcEM7QUFDQSxNQUFHLENBQUNBLEdBQUosRUFBUTtBQUNIQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxxQ0FBWjtBQUNKLEdBSm1DLENBS3BDOzs7QUFDQSxPQUFJLElBQUlDLENBQUMsR0FBQyxDQUFOLEVBQVFDLENBQUMsR0FBQ0osR0FBRyxDQUFDSyxNQUFsQixFQUF5QkYsQ0FBQyxHQUFDQyxDQUEzQixFQUE2QkQsQ0FBQyxFQUE5QixFQUFpQztBQUM3QixRQUFHLFFBQU1ILEdBQUcsQ0FBQ0csQ0FBRCxDQUFaLEVBQWlCO0FBQ2IsYUFBTyxJQUFQO0FBQ0g7QUFDSixHQVZtQyxDQVdwQzs7O0FBQ0EsU0FBTyxLQUFQO0FBQ0gsQ0FiRDs7QUFlQUcsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsWUFBWSxFQUFFO0FBQ1YsaUJBQVMsRUFEQztBQUVWQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGQyxLQWpCTjtBQXFCUkMsSUFBQUEsU0FBUyxFQUFFUCxFQUFFLENBQUNRLE1BckJOO0FBc0JSQyxJQUFBQSxTQUFTLEVBQUVULEVBQUUsQ0FBQ1EsTUF0Qk47QUF1QlJFLElBQUFBLFNBQVMsRUFBRVYsRUFBRSxDQUFDUTtBQXZCTixHQUhQO0FBNkJMO0FBRUE7QUFFQUcsRUFBQUEsTUFqQ0ssb0JBaUNLO0FBQ04sUUFBSUMsS0FBSyxHQUFHLElBQVo7O0FBQ0EsU0FBS0wsU0FBTCxDQUFlTSxZQUFmLENBQTRCYixFQUFFLENBQUNRLE1BQS9CLEVBQXVDTSxZQUF2QyxHQUFzRCxLQUF0RDtBQUNBLFNBQUtMLFNBQUwsQ0FBZUksWUFBZixDQUE0QmIsRUFBRSxDQUFDUSxNQUEvQixFQUF1Q00sWUFBdkMsR0FBc0QsS0FBdEQ7QUFDQSxTQUFLSixTQUFMLENBQWVHLFlBQWYsQ0FBNEJiLEVBQUUsQ0FBQ1EsTUFBL0IsRUFBdUNNLFlBQXZDLEdBQXNELEtBQXREO0FBRUEsUUFBSUMsV0FBVyxHQUFHLEVBQWxCO0FBRUEsU0FBS0MsWUFBTCxHQUFvQixFQUFwQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsRUFBbkI7QUFFQSxTQUFLQyxTQUFMLEdBQWlCLEtBQUtDLGlCQUFMLEVBQWpCO0FBRUEsU0FBS0MsSUFBTCxDQUFVQyxFQUFWLENBQWFyQixFQUFFLENBQUNzQixJQUFILENBQVFDLFNBQVIsQ0FBa0JDLFNBQS9CLEVBQTBDLFVBQVVDLE1BQVYsRUFBa0I7QUFDeERiLE1BQUFBLEtBQUssQ0FBQ2MsUUFBTjtBQUNILEtBRkQ7QUFJQSxRQUFJTixJQUFJLEdBQUdwQixFQUFFLENBQUMyQixJQUFILENBQVEsVUFBUixFQUFvQmQsWUFBcEIsQ0FBaUMsVUFBakMsQ0FBWDtBQUNBLFFBQUllLE9BQUo7QUFDQSxTQUFLQyxRQUFMLEdBQWdCVCxJQUFJLENBQUNVLE9BQUwsRUFBaEIsQ0FuQk0sQ0FxQk47O0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixDQUFDLEtBQUQsRUFBTyxLQUFQLEVBQWEsSUFBYixFQUFrQixJQUFsQixFQUF1QixLQUF2QixFQUE2QixJQUE3QixFQUFrQyxJQUFsQyxDQUFqQjtBQUNBLFNBQUtDLFdBQUw7QUFFQVosSUFBQUEsSUFBSSxDQUFDYSxRQUFMLENBQWMsS0FBS0osUUFBbkIsRUFBNkIsRUFBN0IsRUFBaUNLLElBQWpDLENBQXNDLFVBQUNDLElBQUQsRUFBVTtBQUM1Q3hDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHdDQUFaO0FBQ0FELE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZdUMsSUFBWjtBQUNBUCxNQUFBQSxPQUFPLEdBQUdRLElBQUksQ0FBQ0MsS0FBTCxDQUFXRixJQUFYLENBQVY7QUFDQXZCLE1BQUFBLEtBQUssQ0FBQ00sU0FBTixHQUFrQlUsT0FBbEI7QUFDQVIsTUFBQUEsSUFBSSxDQUFDa0IsT0FBTCxDQUFhVixPQUFiOztBQUNBaEIsTUFBQUEsS0FBSyxDQUFDMkIsVUFBTjs7QUFDQTNCLE1BQUFBLEtBQUssQ0FBQzRCLFdBQU47O0FBQ0E1QixNQUFBQSxLQUFLLENBQUM2QixRQUFOOztBQUNBN0IsTUFBQUEsS0FBSyxDQUFDOEIsT0FBTjs7QUFFQUMsTUFBQUEsVUFBVSxDQUFDLFlBQVc7QUFDbEIvQixRQUFBQSxLQUFLLENBQUNMLFNBQU4sQ0FBZ0JNLFlBQWhCLENBQTZCYixFQUFFLENBQUNRLE1BQWhDLEVBQXdDTSxZQUF4QyxHQUF1RCxJQUF2RDtBQUNBRixRQUFBQSxLQUFLLENBQUNILFNBQU4sQ0FBZ0JJLFlBQWhCLENBQTZCYixFQUFFLENBQUNRLE1BQWhDLEVBQXdDTSxZQUF4QyxHQUF1RCxJQUF2RDtBQUNBRixRQUFBQSxLQUFLLENBQUNGLFNBQU4sQ0FBZ0JHLFlBQWhCLENBQTZCYixFQUFFLENBQUNRLE1BQWhDLEVBQXdDTSxZQUF4QyxHQUF1RCxJQUF2RDtBQUNILE9BSlMsRUFJUCxJQUpPLENBQVY7QUFNSCxLQWpCRCxFQWlCRyxVQUFDOEIsR0FBRCxFQUFTO0FBQUk7QUFDWlQsTUFBQUEsSUFBSSxHQUFHLDQyQkFBUDtBQUNBUCxNQUFBQSxPQUFPLEdBQUdRLElBQUksQ0FBQ0MsS0FBTCxDQUFXRixJQUFYLENBQVY7QUFDQXZCLE1BQUFBLEtBQUssQ0FBQ00sU0FBTixHQUFrQlUsT0FBbEI7QUFDQVIsTUFBQUEsSUFBSSxDQUFDa0IsT0FBTCxDQUFhVixPQUFiOztBQUNBaEIsTUFBQUEsS0FBSyxDQUFDMkIsVUFBTjs7QUFDQTNCLE1BQUFBLEtBQUssQ0FBQzRCLFdBQU47O0FBQ0E1QixNQUFBQSxLQUFLLENBQUM2QixRQUFOOztBQUNBN0IsTUFBQUEsS0FBSyxDQUFDOEIsT0FBTjs7QUFFQTlCLE1BQUFBLEtBQUssQ0FBQ0wsU0FBTixDQUFnQk0sWUFBaEIsQ0FBNkJiLEVBQUUsQ0FBQ1EsTUFBaEMsRUFBd0NNLFlBQXhDLEdBQXVELElBQXZEO0FBQ0FGLE1BQUFBLEtBQUssQ0FBQ0gsU0FBTixDQUFnQkksWUFBaEIsQ0FBNkJiLEVBQUUsQ0FBQ1EsTUFBaEMsRUFBd0NNLFlBQXhDLEdBQXVELElBQXZEO0FBQ0FGLE1BQUFBLEtBQUssQ0FBQ0YsU0FBTixDQUFnQkcsWUFBaEIsQ0FBNkJiLEVBQUUsQ0FBQ1EsTUFBaEMsRUFBd0NNLFlBQXhDLEdBQXVELElBQXZEO0FBQ0gsS0E5QkQ7QUFpQ0gsR0EzRkk7QUE2RkwrQixFQUFBQSxLQTdGSyxtQkE2Rkk7QUFDTCxRQUFJekIsSUFBSSxHQUFHcEIsRUFBRSxDQUFDMkIsSUFBSCxDQUFRLFVBQVIsRUFBb0JkLFlBQXBCLENBQWlDLFVBQWpDLENBQVg7QUFDQWxCLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQWN3QixJQUFJLENBQUMwQixTQUEvQjtBQUdSOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCSyxHQTVISTtBQThITEMsRUFBQUEsaUJBQWlCLEVBQUUsNkJBQVc7QUFDMUIsUUFBSUMsUUFBUSxHQUFFLENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxHQUFULEVBQWEsR0FBYixFQUFpQixHQUFqQixFQUFxQixHQUFyQixFQUF5QixHQUF6QixFQUE2QixHQUE3QixFQUFpQyxHQUFqQyxFQUFxQyxHQUFyQyxFQUF5QyxHQUF6QyxFQUE2QyxHQUE3QyxFQUFpRCxHQUFqRCxFQUFxRCxHQUFyRCxFQUF5RCxHQUF6RCxFQUE2RCxHQUE3RCxFQUFpRSxHQUFqRSxFQUFxRSxHQUFyRSxFQUF5RSxHQUF6RSxFQUE2RSxHQUE3RSxFQUFpRixHQUFqRixFQUFxRixHQUFyRixFQUF5RixHQUF6RixFQUE2RixHQUE3RixFQUFpRyxHQUFqRyxFQUFxRyxHQUFyRyxDQUFkO0FBQ0EsUUFBSUMsSUFBSSxHQUFHLEVBQVg7O0FBQ0EsU0FBSSxJQUFJcEQsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxHQUFDLENBQWQsRUFBZ0JBLENBQUMsRUFBakIsRUFBcUI7QUFDakJvRCxNQUFBQSxJQUFJLElBQUlELFFBQVEsQ0FBQ0UsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFjSixRQUFRLENBQUNqRCxNQUFsQyxDQUFELENBQWhCO0FBQ0g7O0FBQ0QsV0FBT2tELElBQVA7QUFDSCxHQXJJSTtBQXVJTFIsRUFBQUEsUUFBUSxFQUFFLG9CQUFXO0FBQ2pCLFFBQUlZLE9BQU8sR0FBRyxLQUFLbkMsU0FBTCxDQUFlbUMsT0FBN0I7QUFDQSxRQUFJQyxTQUFTLEdBQUcsS0FBS3BDLFNBQUwsQ0FBZW9DLFNBQS9CO0FBRUEsUUFBSUMsUUFBUSxHQUFHLEtBQUtuQyxJQUFMLENBQVVvQyxjQUFWLENBQXlCLFVBQXpCLENBQWY7QUFDQSxRQUFJQyxZQUFZLEdBQUdGLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixRQUF4QixFQUFrQ0EsY0FBbEMsQ0FBaUQsU0FBakQsRUFBNEQzQyxZQUE1RCxDQUF5RSxVQUF6RSxDQUFuQjtBQUNBLFFBQUk2QyxjQUFjLEdBQUdILFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixRQUF4QixFQUFrQ0EsY0FBbEMsQ0FBaUQsV0FBakQsRUFBOEQzQyxZQUE5RCxDQUEyRSxVQUEzRSxDQUFyQjtBQUVBNEMsSUFBQUEsWUFBWSxDQUFDRSxNQUFiLEdBQXNCTixPQUF0QjtBQUNBSyxJQUFBQSxjQUFjLENBQUNDLE1BQWYsR0FBd0IsTUFBTUwsU0FBOUI7QUFDSCxHQWpKSTtBQW1KTFosRUFBQUEsT0FBTyxFQUFFLG1CQUFXO0FBQ2hCLFFBQUlrQixNQUFNLEdBQUcsS0FBS3hDLElBQUwsQ0FBVW9DLGNBQVYsQ0FBeUIsVUFBekIsQ0FBYjtBQUNBLFFBQUlLLFNBQVMsR0FBR0QsTUFBTSxDQUFDSixjQUFQLENBQXNCLFVBQXRCLEVBQWtDM0MsWUFBbEMsQ0FBK0MsVUFBL0MsQ0FBaEI7QUFDQSxRQUFJaUQsVUFBVSxHQUFHRixNQUFNLENBQUNKLGNBQVAsQ0FBc0IsV0FBdEIsRUFBbUMzQyxZQUFuQyxDQUFnRCxVQUFoRCxDQUFqQjtBQUVBZ0QsSUFBQUEsU0FBUyxDQUFDRixNQUFWLEdBQW1CLEtBQUt6QyxTQUFMLENBQWU2QyxJQUFsQztBQUNBRCxJQUFBQSxVQUFVLENBQUNILE1BQVgsR0FBb0IsS0FBS3pDLFNBQUwsQ0FBZThDLEtBQW5DO0FBQ0gsR0ExSkk7QUE0Skx6QixFQUFBQSxVQUFVLEVBQUUsc0JBQVc7QUFDbkIsUUFBSTBCLEVBQUUsR0FBRyxDQUFDLEdBQVY7QUFDQSxRQUFJQyxFQUFFLEdBQUcsRUFBVDtBQUNBLFFBQUlDLEVBQUosRUFBUUMsRUFBUjtBQUNBLFFBQUlDLElBQUosRUFBVUMsUUFBVixFQUFvQkMsSUFBcEIsRUFBMEJQLEtBQTFCO0FBQ0EsUUFBSVEsTUFBSjtBQUNBLFFBQUlDLFFBQVEsR0FBRyxLQUFLdkQsU0FBTCxDQUFld0QsTUFBOUI7QUFDQSxRQUFJQyxRQUFRLEdBQUcsQ0FBZjtBQUNBLFFBQUlDLElBQUksR0FBRyxDQUFYO0FBQ0EsUUFBSUMsSUFBSSxHQUFHLENBQVg7QUFDQSxRQUFJdEIsUUFBUSxHQUFHLEtBQUtuQyxJQUFMLENBQVVvQyxjQUFWLENBQXlCLFVBQXpCLENBQWY7QUFDUjs7Ozs7Ozs7Ozs7O0FBV1EsU0FBSSxJQUFJM0QsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxHQUFDLENBQWQsRUFBZ0JBLENBQUMsRUFBakIsRUFBcUI7QUFDakJ3RSxNQUFBQSxJQUFJLEdBQUdyRSxFQUFFLENBQUM4RSxXQUFILENBQWUsS0FBSzFFLFlBQUwsQ0FBa0IsQ0FBbEIsQ0FBZixDQUFQO0FBQ0FrRSxNQUFBQSxRQUFRLEdBQUdELElBQUksQ0FBQ3hELFlBQUwsQ0FBa0IsU0FBbEIsQ0FBWDs7QUFDQSxVQUFHNEQsUUFBUSxDQUFDNUUsQ0FBRCxDQUFYLEVBQWdCO0FBQ1owRSxRQUFBQSxJQUFJLEdBQUcsS0FBS3JELFNBQUwsQ0FBZXVELFFBQVEsQ0FBQzVFLENBQUQsQ0FBdkIsRUFBNEIwRSxJQUFuQztBQUNBUCxRQUFBQSxLQUFLLEdBQUcsS0FBSzlDLFNBQUwsQ0FBZThDLEtBQXZCO0FBQ0FNLFFBQUFBLFFBQVEsQ0FBQ1MsT0FBVCxDQUFpQk4sUUFBUSxDQUFDNUUsQ0FBRCxDQUF6QixFQUE4QjBFLElBQTlCLEVBQW9DUCxLQUFwQztBQUNIOztBQUVELFdBQUsvQyxXQUFMLENBQWlCK0QsSUFBakIsQ0FBc0JWLFFBQXRCO0FBQ0FPLE1BQUFBLElBQUksR0FBR2hGLENBQUMsR0FBQyxDQUFUO0FBQ0FzRSxNQUFBQSxFQUFFLEdBQUdGLEVBQUUsR0FBRVksSUFBSSxHQUFDLEdBQWQ7QUFDQVQsTUFBQUEsRUFBRSxHQUFHRixFQUFMO0FBQ0FNLE1BQUFBLE1BQU0sR0FBR3hFLEVBQUUsQ0FBQ2lGLEVBQUgsQ0FBTWQsRUFBTixFQUFVQyxFQUFWLENBQVQ7QUFDQUMsTUFBQUEsSUFBSSxDQUFDYSxXQUFMLENBQWlCVixNQUFqQjtBQUNBakIsTUFBQUEsUUFBUSxDQUFDNEIsUUFBVCxDQUFrQmQsSUFBbEI7QUFDSDtBQUNKLEdBbk1JO0FBcU1MZSxFQUFBQSxVQUFVLEVBQUUsb0JBQVNDLElBQVQsRUFBZTtBQUN2QixRQUFJQyxhQUFhLElBQUksQ0FBQ0QsSUFBSSxDQUFDNUYsT0FBTCxDQUFhLEtBQUtzQyxTQUFsQixDQUF0QixFQUFvRDtBQUFLO0FBQ3JEd0QsTUFBQUEsRUFBRSxDQUFDQyxlQUFILENBQW1CO0FBQ2ZDLFFBQUFBLEtBQUssRUFBRSxNQURRO0FBRWZDLFFBQUFBLFFBQVEsRUFBRTtBQUZLLE9BQW5CO0FBSUEsV0FBSzFELFdBQUwsR0FBbUIsSUFBSTJELElBQUosR0FBV0MsT0FBWCxFQUFuQjtBQUNIO0FBQ0osR0E3TUk7QUErTUxDLEVBQUFBLGNBQWMsRUFBRSwwQkFBVztBQUN2QixRQUFJQyxHQUFHLEdBQUcsSUFBSUgsSUFBSixHQUFXQyxPQUFYLEVBQVY7O0FBQ0EsUUFBSUUsR0FBRyxHQUFHLEtBQUs5RCxXQUFYLEdBQXlCLElBQTdCLEVBQW1DO0FBQy9CLGFBQU8sS0FBUDtBQUNIOztBQUNELFdBQU8sSUFBUDtBQUNILEdBck5JO0FBdU5MK0QsRUFBQUEsV0FBVyxFQUFFLHFCQUFTVixJQUFULEVBQWU7QUFDeEIsUUFBSWhCLElBQUo7O0FBQ0EsU0FBSSxJQUFJeEUsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxHQUFDLEtBQUttQixZQUFMLENBQWtCakIsTUFBaEMsRUFBdUNGLENBQUMsRUFBeEMsRUFBNEM7QUFDeEN3RSxNQUFBQSxJQUFJLEdBQUcsS0FBS3JELFlBQUwsQ0FBa0JuQixDQUFsQixDQUFQOztBQUNBLFVBQUd3RSxJQUFJLENBQUMyQixRQUFMLEtBQWtCWCxJQUFyQixFQUEyQjtBQUN2QixhQUFLdEUsV0FBTCxHQUFtQixLQUFLRyxTQUFMLENBQWVtRSxJQUFmLENBQW5CO0FBQ0EsYUFBS3RFLFdBQUwsQ0FBaUJzRSxJQUFqQixHQUF3QkEsSUFBeEI7QUFDQWhCLFFBQUFBLElBQUksQ0FBQzRCLElBQUwsQ0FBVSxJQUFWO0FBQ0g7QUFDSjs7QUFDRCxTQUFLQyxZQUFMLENBQWtCLElBQWxCO0FBQ0EsU0FBS2QsVUFBTCxDQUFnQkMsSUFBaEI7QUFDQSxTQUFLYyxlQUFMLENBQXFCLEtBQXJCO0FBQ0gsR0FwT0k7QUFzT0xBLEVBQUFBLGVBQWUsRUFBRSx5QkFBU0MsSUFBVCxFQUFlO0FBQzVCLFFBQUlDLElBQUksR0FBRyxLQUFLakYsSUFBTCxDQUFVb0MsY0FBVixDQUF5QixhQUF6QixDQUFYO0FBQ0E2QyxJQUFBQSxJQUFJLENBQUNDLE1BQUwsR0FBY0YsSUFBZDtBQUNILEdBek9JO0FBMk9MRyxFQUFBQSxZQUFZLEVBQUUsd0JBQVc7QUFDckIsUUFBSUMsTUFBTSxHQUFHLEtBQUtwRixJQUFMLENBQVVvQyxjQUFWLENBQXlCLFVBQXpCLEVBQXFDaUQsU0FBbEQ7O0FBQ0EsUUFBSUMsRUFBSjtBQUNBLFFBQUlDLEdBQUcsR0FBRyxFQUFWO0FBQ0EsUUFBSUMsVUFBVSxHQUFHLEVBQWpCO0FBQ0EsUUFBSUMsRUFBRSxHQUFHLEVBQVQ7QUFDQSxRQUFJeEIsSUFBSixFQUFVZCxJQUFWLEVBQWdCUCxLQUFoQjs7QUFDQSxTQUFJLElBQUluRSxDQUFDLEdBQUMsQ0FBVixFQUFZQSxDQUFDLEdBQUMyRyxNQUFNLENBQUN6RyxNQUFyQixFQUE0QkYsQ0FBQyxFQUE3QixFQUFpQztBQUM3QixVQUFHMkcsTUFBTSxDQUFDM0csQ0FBRCxDQUFOLENBQVVpSCxLQUFWLElBQW1CLFNBQXRCLEVBQWlDO0FBQzdCekIsUUFBQUEsSUFBSSxHQUFHbUIsTUFBTSxDQUFDM0csQ0FBRCxDQUFOLENBQVVnQixZQUFWLENBQXVCLFNBQXZCLEVBQWtDbUYsUUFBekM7QUFDQXpCLFFBQUFBLElBQUksR0FBR2lDLE1BQU0sQ0FBQzNHLENBQUQsQ0FBTixDQUFVZ0IsWUFBVixDQUF1QixTQUF2QixFQUFrQ2tHLFNBQXpDO0FBQ0EvQyxRQUFBQSxLQUFLLEdBQUd3QyxNQUFNLENBQUMzRyxDQUFELENBQU4sQ0FBVWdCLFlBQVYsQ0FBdUIsU0FBdkIsRUFBa0NtRyxTQUExQzs7QUFFQSxZQUFHekMsSUFBSSxHQUFHLENBQVYsRUFBYTtBQUNUc0MsVUFBQUEsRUFBRSxHQUFHO0FBQUMsd0JBQVd4QixJQUFaO0FBQWtCLHlCQUFZZCxJQUE5QjtBQUFvQyx5QkFBWVA7QUFBaEQsV0FBTDtBQUNBNEMsVUFBQUEsVUFBVSxDQUFDNUIsSUFBWCxDQUFnQkssSUFBaEI7QUFDQXNCLFVBQUFBLEdBQUcsQ0FBQzNCLElBQUosQ0FBUzZCLEVBQVQ7QUFDSDtBQUNKO0FBQ0o7O0FBRUQsUUFBSXpGLElBQUksR0FBR3BCLEVBQUUsQ0FBQzJCLElBQUgsQ0FBUSxVQUFSLEVBQW9CZCxZQUFwQixDQUFpQyxVQUFqQyxDQUFYO0FBQ0FPLElBQUFBLElBQUksQ0FBQzZGLFNBQUwsQ0FBZUwsVUFBZjtBQUNBLFdBQU9ELEdBQVA7QUFDSCxHQW5RSTtBQXFRTHhGLEVBQUFBLGlCQUFpQixFQUFFLDJCQUFTK0YsS0FBVCxFQUFnQjtBQUMvQixRQUFJOUYsSUFBSSxHQUFHcEIsRUFBRSxDQUFDMkIsSUFBSCxDQUFRLFVBQVIsRUFBb0JkLFlBQXBCLENBQWlDLFVBQWpDLENBQVg7QUFDQSxXQUFPTyxJQUFJLENBQUMrRixPQUFMLEVBQVA7QUFDSCxHQXhRSTtBQTBRTEMsRUFBQUEsY0FBYyxFQUFFLHdCQUFTQyxTQUFULEVBQW9CO0FBQ2hDLFFBQUloRCxJQUFKO0FBQ0EsUUFBSWlELFVBQVUsR0FBRyxDQUFqQjtBQUNBLFFBQUlDLE9BQU8sR0FBRyxDQUFkO0FBQ0EsUUFBSUMsT0FBTyxHQUFHLENBQWQ7QUFDQSxRQUFJakUsUUFBUSxHQUFHLEtBQUtuQyxJQUFMLENBQVVvQyxjQUFWLENBQXlCLFVBQXpCLENBQWY7QUFDQSxRQUFJaUUsWUFBWSxHQUFHbEUsUUFBUSxDQUFDQyxjQUFULENBQXdCLGFBQXhCLEVBQXVDQSxjQUF2QyxDQUFzRCxZQUF0RCxFQUFvRTNDLFlBQXBFLENBQWlGLFVBQWpGLENBQW5CO0FBQ0EsUUFBSTZHLGVBQWUsR0FBR25FLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixRQUF4QixFQUFrQ0EsY0FBbEMsQ0FBaUQsU0FBakQsRUFBNERBLGNBQTVELENBQTJFLFdBQTNFLEVBQXdGM0MsWUFBeEYsQ0FBcUcsVUFBckcsQ0FBdEI7QUFDQSxRQUFJOEcsZ0JBQWdCLEdBQUdwRSxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0NBLGNBQWxDLENBQWlELFNBQWpELEVBQTREQSxjQUE1RCxDQUEyRSxZQUEzRSxFQUF5RjNDLFlBQXpGLENBQXNHLFVBQXRHLENBQXZCOztBQUVBLFNBQUksSUFBSWhCLENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsR0FBQyxLQUFLbUIsWUFBTCxDQUFrQmpCLE1BQWhDLEVBQXVDRixDQUFDLEVBQXhDLEVBQTRDO0FBQ3hDd0UsTUFBQUEsSUFBSSxHQUFHLEtBQUtyRCxZQUFMLENBQWtCbkIsQ0FBbEIsQ0FBUDtBQUNBd0UsTUFBQUEsSUFBSSxDQUFDdUQsYUFBTCxDQUFtQnZELElBQUksQ0FBQzJCLFFBQUwsQ0FBY3ZHLE9BQWQsQ0FBc0I0SCxTQUF0QixDQUFuQjtBQUNILEtBYitCLENBZWhDOzs7QUFDQSxTQUFJLElBQUl4SCxDQUFDLEdBQUMsQ0FBVixFQUFZQSxDQUFDLEdBQUMsS0FBS29CLFdBQUwsQ0FBaUJsQixNQUEvQixFQUFzQ0YsQ0FBQyxFQUF2QyxFQUEyQztBQUN2QyxVQUFHLEtBQUtvQixXQUFMLENBQWlCcEIsQ0FBakIsRUFBb0JrSCxTQUFwQixJQUFnQyxDQUFuQyxFQUFzQztBQUNsQ08sUUFBQUEsVUFBVTtBQUNWQyxRQUFBQSxPQUFPLElBQUksS0FBS3RHLFdBQUwsQ0FBaUJwQixDQUFqQixFQUFvQmtILFNBQS9CO0FBQ0g7QUFDSjs7QUFFRFMsSUFBQUEsT0FBTyxHQUFHRCxPQUFPLEdBQUNELFVBQWxCO0FBQ0FHLElBQUFBLFlBQVksQ0FBQzlELE1BQWIsR0FBc0I2RCxPQUFPLENBQUNLLE9BQVIsQ0FBZ0IsQ0FBaEIsQ0FBdEIsQ0F4QmdDLENBMEJoQzs7QUFDQUgsSUFBQUEsZUFBZSxDQUFDL0QsTUFBaEIsR0FBeUIyRCxVQUF6QjtBQUNBSyxJQUFBQSxnQkFBZ0IsQ0FBQ2hFLE1BQWpCLEdBQTBCLE1BQU0sS0FBSzNDLFlBQUwsQ0FBa0JqQixNQUFsRDtBQUNILEdBdlNJO0FBeVNMbUcsRUFBQUEsWUFBWSxFQUFFLHNCQUFTRSxJQUFULEVBQWU7QUFDekIsUUFBSS9CLElBQUo7O0FBQ0EsU0FBSSxJQUFJeEUsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxHQUFDLEtBQUtvQixXQUFMLENBQWlCbEIsTUFBL0IsRUFBc0NGLENBQUMsRUFBdkMsRUFBMkM7QUFDdkN3RSxNQUFBQSxJQUFJLEdBQUcsS0FBS3BELFdBQUwsQ0FBaUJwQixDQUFqQixDQUFQOztBQUNBLFVBQUd1RyxJQUFILEVBQVM7QUFDTC9CLFFBQUFBLElBQUksQ0FBQ3lELGVBQUw7QUFDSCxPQUZELE1BRU87QUFDSHpELFFBQUFBLElBQUksQ0FBQzBELGNBQUw7QUFDSDtBQUNKO0FBQ0osR0FuVEk7QUFxVExyRyxFQUFBQSxRQUFRLEVBQUUsb0JBQVc7QUFDakIsUUFBSTJDLElBQUo7QUFDQSxTQUFLdEQsV0FBTCxHQUFtQixFQUFuQjs7QUFDQSxTQUFJLElBQUlsQixDQUFDLEdBQUMsQ0FBVixFQUFZQSxDQUFDLEdBQUMsS0FBS21CLFlBQUwsQ0FBa0JqQixNQUFoQyxFQUF1Q0YsQ0FBQyxFQUF4QyxFQUE0QztBQUN4Q3dFLE1BQUFBLElBQUksR0FBRyxLQUFLckQsWUFBTCxDQUFrQm5CLENBQWxCLENBQVA7QUFDQXdFLE1BQUFBLElBQUksQ0FBQzRCLElBQUwsQ0FBVSxLQUFWO0FBQ0g7O0FBQ0QsU0FBS0MsWUFBTCxDQUFrQixLQUFsQixFQVBpQixDQVF6QjtBQUNLLEdBOVRJO0FBZ1VMMUQsRUFBQUEsV0FBVyxFQUFFLHVCQUFXO0FBQ3BCLFFBQUl5QixFQUFFLEdBQUcsQ0FBQyxHQUFWO0FBQ0EsUUFBSUMsRUFBRSxHQUFHLENBQUMsR0FBVjtBQUNBLFFBQUlDLEVBQUosRUFBUUMsRUFBUjtBQUNBLFFBQUlDLElBQUosRUFBVUMsUUFBVixFQUFvQkMsSUFBcEIsRUFBMEJ5RCxJQUExQixFQUFnQ0MsSUFBaEM7QUFDQSxRQUFJekQsTUFBSjtBQUNBLFFBQUlDLFFBQVEsR0FBRyxLQUFLdkQsU0FBTCxDQUFlZ0gsT0FBOUI7QUFDQSxRQUFJdkQsUUFBUSxHQUFHLENBQWY7QUFDQSxRQUFJQyxJQUFJLEdBQUcsQ0FBWDtBQUNBLFFBQUlDLElBQUksR0FBRyxDQUFYOztBQUVBLFNBQUksSUFBSWhGLENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsR0FBQzRFLFFBQVEsQ0FBQzFFLE1BQXZCLEVBQThCRixDQUFDLEVBQS9CLEVBQW1DO0FBQy9CMEUsTUFBQUEsSUFBSSxHQUFHLEtBQUtyRCxTQUFMLENBQWV1RCxRQUFRLENBQUM1RSxDQUFELENBQXZCLEVBQTRCMEUsSUFBbkM7QUFDQXlELE1BQUFBLElBQUksR0FBRyxLQUFLOUcsU0FBTCxDQUFldUQsUUFBUSxDQUFDNUUsQ0FBRCxDQUF2QixFQUE0Qm1JLElBQW5DO0FBQ0FwRCxNQUFBQSxJQUFJLEdBQUcxQixJQUFJLENBQUNDLEtBQUwsQ0FBV3RELENBQUMsR0FBQyxDQUFiLENBQVA7QUFDQWdGLE1BQUFBLElBQUksR0FBR2hGLENBQUMsR0FBQyxDQUFUO0FBRUF1RSxNQUFBQSxFQUFFLEdBQUdGLEVBQUUsR0FBRVUsSUFBSSxHQUFDLEdBQWQ7QUFDQVQsTUFBQUEsRUFBRSxHQUFHRixFQUFFLEdBQUVZLElBQUksR0FBQyxHQUFkO0FBRUFSLE1BQUFBLElBQUksR0FBR3JFLEVBQUUsQ0FBQzhFLFdBQUgsQ0FBZSxLQUFLMUUsWUFBTCxDQUFrQixDQUFsQixDQUFmLENBQVA7QUFDQWtFLE1BQUFBLFFBQVEsR0FBR0QsSUFBSSxDQUFDeEQsWUFBTCxDQUFrQixTQUFsQixDQUFYO0FBQ0F5RCxNQUFBQSxRQUFRLENBQUNTLE9BQVQsQ0FBaUJOLFFBQVEsQ0FBQzVFLENBQUQsQ0FBekIsRUFBOEIwRSxJQUE5QixFQUFvQ3lELElBQXBDOztBQUVBLFVBQUcxQyxhQUFhLElBQUksQ0FBQ2IsUUFBUSxDQUFDNUUsQ0FBRCxDQUFSLENBQVlKLE9BQVosQ0FBb0IsS0FBS3NDLFNBQXpCLENBQXJCLEVBQTBEO0FBQ3REa0csUUFBQUEsSUFBSSxHQUFHakksRUFBRSxDQUFDOEUsV0FBSCxDQUFlLEtBQUsxRSxZQUFMLENBQWtCLENBQWxCLENBQWYsQ0FBUDtBQUNBNkgsUUFBQUEsSUFBSSxDQUFDL0MsV0FBTCxDQUFpQmxGLEVBQUUsQ0FBQ2lGLEVBQUgsQ0FBTSxFQUFOLEVBQVMsRUFBVCxDQUFqQjtBQUNBZ0QsUUFBQUEsSUFBSSxDQUFDRSxNQUFMLEdBQWMsR0FBZDtBQUNBRixRQUFBQSxJQUFJLENBQUNHLE1BQUwsR0FBYyxHQUFkO0FBQ0EvRCxRQUFBQSxJQUFJLENBQUNjLFFBQUwsQ0FBYzhDLElBQWQ7QUFDSDs7QUFFRHpELE1BQUFBLE1BQU0sR0FBR3hFLEVBQUUsQ0FBQ2lGLEVBQUgsQ0FBTWQsRUFBTixFQUFVQyxFQUFWLENBQVQ7QUFDQUMsTUFBQUEsSUFBSSxDQUFDYSxXQUFMLENBQWlCVixNQUFqQjtBQUVBLFdBQUt4RCxZQUFMLENBQWtCZ0UsSUFBbEIsQ0FBdUJWLFFBQXZCO0FBQ0EsV0FBS2xELElBQUwsQ0FBVStELFFBQVYsQ0FBbUJkLElBQW5CO0FBQ0g7O0FBRUQsU0FBSytDLGNBQUwsQ0FBb0IsS0FBS2xHLFNBQUwsQ0FBZXdELE1BQW5DO0FBQ0gsR0F4V0ksQ0EwV0w7O0FBMVdLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbi8vIOWumuS5ieS4gOS4quWIpOaWreWHveaVsFxuU3RyaW5nLnByb3RvdHlwZS5pbkFycmF5ID0gZnVuY3Rpb24oYXJyKXvCoMKgXG7CoMKgICAvLyDkuI3mmK/mlbDnu4TliJnmipvlh7rlvILluLhcbsKgwqAgIGlmKCFhcnIpe1xuICAgICAgICAgY29uc29sZS5sb2coXCJFUlIoaW5fYXJyYXkpOklucHV0IGlzIG5vdCBhbiBhcnJheVwiKTtcbsKgwqAgIH1cbsKgwqAgIC8vIOmBjeWOhuaYr+WQpuWcqOaVsOe7hOS4rVxuwqDCoCAgZm9yKHZhciBpPTAsaz1hcnIubGVuZ3RoO2k8aztpKyspe1xuwqDCoMKgICAgIMKgaWYodGhpcz09YXJyW2ldKSB7XG7CoMKgwqDCoMKgICDCoCAgICByZXR1cm4gdHJ1ZTvCoCBcbsKgwqDCoMKgICAgIH1cbsKgwqAgIH1cbsKgwqAgIC8vIOWmguaenOS4jeWcqOaVsOe7hOS4reWwseS8mui/lOWbnmZhbHNlXG7CoMKgICByZXR1cm4gZmFsc2U7XG59O1xuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyDov5nkuKrlsZ7mgKflvJXnlKjkuobpooTliLbotYTmupBcbiAgICAgICAgcGxheWVyUHJlZmFiOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuICAgICAgICBzdGFydEJ1dDE6IGNjLkJ1dHRvbixcbiAgICAgICAgc3RhcnRCdXQyOiBjYy5CdXR0b24sXG4gICAgICAgIHN0YXJ0QnV0MzogY2MuQnV0dG9uLFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8vIG9uTG9hZCAoKSB7fSxcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHZhciBfc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuc3RhcnRCdXQxLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YXJ0QnV0Mi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGFydEJ1dDMuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIGNob29zZW5DYXJkID0ge307XG5cbiAgICAgICAgdGhpcy5hbGxDYXJkTm9kZXMgPSBbXTtcbiAgICAgICAgdGhpcy5teUNhcmROb2RlcyA9IFtdO1xuXG4gICAgICAgIHRoaXMuYWdlbnRzRGVmID0gdGhpcy5nZXRQZXJzaXN0YW50RGF0YSgpO1xuXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgICAgIF9zZWxmLnVuc2VsZWN0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBub2RlID0gY2MuZmluZCgnR2FtZURhdGEnKS5nZXRDb21wb25lbnQoJ0dhbWVEYXRhJyk7XG4gICAgICAgIHZhciBkYXRhb2JqO1xuICAgICAgICB0aGlzLnVzZXJuYW1lID0gbm9kZS5nZXROYW1lKCk7XG5cbiAgICAgICAgLy9kZWZhdWx0IHJvbGVzIGZvciBhIHVzZXIuIG90aGVyIG1heSBuZWVkIHRvIGdldCB2aWEgdmlkZW8gb3IgcmVsYXkuXG4gICAgICAgIHRoaXMuYmFzZVJvbGVzID0gW1wiYmVlXCIsXCJza2VcIixcImlyXCIsXCJsclwiLFwibG9nXCIsXCJsbVwiLFwiaHJcIl07XG4gICAgICAgIHRoaXMud3hSZWxheVRpbWU7XG5cbiAgICAgICAgbm9kZS5odHRwUG9zdCh0aGlzLnVzZXJuYW1lLCBcIlwiKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLUdhbWVEYXRhLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBkYXRhb2JqID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgIF9zZWxmLmFnZW50c0RlZiA9IGRhdGFvYmo7XG4gICAgICAgICAgICBub2RlLnNldERhdGEoZGF0YW9iaik7XG4gICAgICAgICAgICBfc2VsZi5zZXRNeUNhcmRzKCk7XG4gICAgICAgICAgICBfc2VsZi5zZXRBbGxDYXJkcygpO1xuICAgICAgICAgICAgX3NlbGYuc2V0U2NvcmUoKTtcbiAgICAgICAgICAgIF9zZWxmLnNldFVzZXIoKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBfc2VsZi5zdGFydEJ1dDEuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTsgXG4gICAgICAgICAgICAgICAgX3NlbGYuc3RhcnRCdXQyLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7IFxuICAgICAgICAgICAgICAgIF9zZWxmLnN0YXJ0QnV0My5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlOyBcbiAgICAgICAgICAgIH0sIDIwMDApO1xuXG4gICAgICAgIH0sIChlcnIpID0+IHsgICAvL2lmIG5vIGNvbm5lY3Rpb24gdGhlbiB1c2UgZGVmYXVsdCBkYXRhIGZvciB0ZXN0LlxuICAgICAgICAgICAgZGF0YSA9ICd7XCJuYW1lXCI6bnVsbCxcImxldmVsXCI6MSxcIm15c2NvcmVcIjoxMDAwLFwibmV4dHNjb3JlXCI6MTUwMCxcImJhc2VzY29yZVwiOjIwLFwiYWxsTGlzdFwiOltcImxvZ1wiLFwiYm9tYlwiLFwic2tlXCIsXCJpclwiLFwiaHJcIixcImJlZVwiLFwiZ2lcIixcImxtXCIsXCJsclwiLFwid2l6XCJdLFwibXlMaXN0XCI6W1wibG9nXCIsXCJoclwiLFwiYmVlXCIsXCJza2VcIixcIndpelwiXSxcImxvZ1wiOntcImRpc3BcIjpcIlxcdTMwZGVcXHUzMGViXFx1MzBiZlwiLFwibGV2ZWxcIjoxLFwiY29zdFwiOjN9LFwiYm9tYlwiOntcImRpc3BcIjpcIlxcdTMwZGZcXHUzMGI1XFx1MzBhNFxcdTMwZWJcIixcImxldmVsXCI6MSxcImNvc3RcIjo0fSxcInNrZVwiOntcImRpc3BcIjpcIlxcdTMwYjlcXHUzMGIxXFx1MzBlYlwiLFwibGV2ZWxcIjoxLFwiY29zdFwiOjF9LFwiaXJcIjp7XCJkaXNwXCI6XCJcXHUzMGNhXFx1MzBhNFxcdTMwYzhcIixcImxldmVsXCI6MSxcImNvc3RcIjozfSxcImhyXCI6e1wiZGlzcFwiOlwiXFx1MzBlY1xcdTMwYzNcXHUzMGM5XCIsXCJsZXZlbFwiOjEsXCJjb3N0XCI6NH0sXCJiZWVcIjp7XCJkaXNwXCI6XCJcXHUzMGQwXFx1MzBjMVwiLFwibGV2ZWxcIjoxLFwiY29zdFwiOjF9LFwiZ2lcIjp7XCJkaXNwXCI6XCJcXHU3N2YzXFx1MzBkZVxcdTMwZjNcIixcImxldmVsXCI6MSxcImNvc3RcIjo0fSxcImxtXCI6e1wiZGlzcFwiOlwiXFx1MzBiZFxcdTMwZWJcIixcImxldmVsXCI6MSxcImNvc3RcIjozfSxcImxyXCI6e1wiZGlzcFwiOlwiXFx1MzBhMlxcdTMwZmNcXHUzMGMxXFx1MzBlM1xcdTMwZmNcIixcImxldmVsXCI6MSxcImNvc3RcIjoyfSxcIndpelwiOntcImRpc3BcIjpcIlxcdTMwYTZcXHUzMGEzXFx1MzBiYVwiLFwibGV2ZWxcIjoxLFwiY29zdFwiOjV9fSc7XG4gICAgICAgICAgICBkYXRhb2JqID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgIF9zZWxmLmFnZW50c0RlZiA9IGRhdGFvYmo7XG4gICAgICAgICAgICBub2RlLnNldERhdGEoZGF0YW9iaik7XG4gICAgICAgICAgICBfc2VsZi5zZXRNeUNhcmRzKCk7XG4gICAgICAgICAgICBfc2VsZi5zZXRBbGxDYXJkcygpO1xuICAgICAgICAgICAgX3NlbGYuc2V0U2NvcmUoKTtcbiAgICAgICAgICAgIF9zZWxmLnNldFVzZXIoKTtcblxuICAgICAgICAgICAgX3NlbGYuc3RhcnRCdXQxLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICBfc2VsZi5zdGFydEJ1dDIuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIF9zZWxmLnN0YXJ0QnV0My5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgICAgICB9KTtcblxuXG4gICAgfSxcblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5maW5kKCdHYW1lRGF0YScpLmdldENvbXBvbmVudCgnR2FtZURhdGEnKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJ1cGdyYWRlZDpcIiArIG5vZGUuaXNVcGdyYWRlKTtcblxuXG4vKlxuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzO1xuICAgICAgICAvL3ZhciBuYW1lID0gdGhpcy5nZXRSYW5kb21DaGFyTmFtZSgpO1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmZpbmQoJ0dhbWVEYXRhJykuZ2V0Q29tcG9uZW50KCdHYW1lRGF0YScpO1xuICAgICAgICB2YXIgZGF0YW9iajtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IG5vZGUuZ2V0TmFtZSgpO1xuXG4gICAgICAgIG5vZGUuaHR0cFBvc3QodGhpcy51c2VybmFtZSwgXCJcIikudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS1HYW1lRGF0YS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgZGF0YW9iaiA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICBfc2VsZi5hZ2VudHNEZWYgPSBkYXRhb2JqO1xuICAgICAgICAgICAgbm9kZS5zZXREYXRhKGRhdGFvYmopO1xuICAgICAgICAgICAgX3NlbGYuc2V0TXlDYXJkcygpO1xuICAgICAgICAgICAgX3NlbGYuc2V0QWxsQ2FyZHMoKTtcbiAgICAgICAgICAgIF9zZWxmLnNldFNjb3JlKCk7XG4gICAgICAgICAgICBfc2VsZi5zZXRVc2VyKCk7XG5cbiAgICAgICAgICAgIF9zZWxmLnN0YXJ0QnV0MS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgICAgICB9LCAoZXJyKSA9PiB7ICAgLy9pZiBubyBjb25uZWN0aW9uIHRoZW4gdXNlIGRlZmF1bHQgZGF0YSBmb3IgdGVzdC5cbiAgICAgICAgICAgIF9zZWxmLnNldE15Q2FyZHMoKTtcbiAgICAgICAgICAgIF9zZWxmLnNldEFsbENhcmRzKCk7XG4gICAgICAgICAgICBfc2VsZi5zZXRTY29yZSgpO1xuICAgICAgICAgICAgX3NlbGYuc2V0VXNlcigpO1xuICAgICAgICB9KTtcbiovXG4gICAgfSxcblxuICAgIGdldFJhbmRvbUNoYXJOYW1lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFwaGFiZXRzID1bXCJhXCIsXCJiXCIsXCJjXCIsXCJkXCIsXCJlXCIsXCJmXCIsXCJnXCIsXCJoXCIsXCJpXCIsXCJqXCIsXCJrXCIsXCJsXCIsXCJtXCIsXCJuXCIsXCJvXCIsXCJwXCIsXCJxXCIsXCJyXCIsXCJzXCIsXCJ0XCIsXCJ1XCIsXCJ2XCIsXCJ3XCIsXCJ4XCIsXCJ5XCIsXCJ6XCJdO1xuICAgICAgICB2YXIgbmljayA9IFwiXCI7XG4gICAgICAgIGZvcih2YXIgaT0wO2k8NjtpKyspIHtcbiAgICAgICAgICAgIG5pY2sgKz0gYXBoYWJldHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKmFwaGFiZXRzLmxlbmd0aCldO1xuICAgICAgICB9IFxuICAgICAgICByZXR1cm4gbmljaztcbiAgICB9LFxuXG4gICAgc2V0U2NvcmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbXlzY29yZSA9IHRoaXMuYWdlbnRzRGVmLm15c2NvcmU7XG4gICAgICAgIHZhciBuZXh0c2NvcmUgPSB0aGlzLmFnZW50c0RlZi5uZXh0c2NvcmU7XG5cbiAgICAgICAgdmFyIHdhbGxOb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY2xhbldhbGxcIik7XG4gICAgICAgIHZhciBteVNjb3JlTGFiZWwgPSB3YWxsTm9kZS5nZXRDaGlsZEJ5TmFtZShcIndvcmRiZ1wiKS5nZXRDaGlsZEJ5TmFtZShcIm15U2NvcmVcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIik7XG4gICAgICAgIHZhciBuZXh0U2NvcmVMYWJlbCA9IHdhbGxOb2RlLmdldENoaWxkQnlOYW1lKFwid29yZGJnXCIpLmdldENoaWxkQnlOYW1lKFwibmV4dFNjb3JlXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpO1xuXG4gICAgICAgIG15U2NvcmVMYWJlbC5zdHJpbmcgPSBteXNjb3JlO1xuICAgICAgICBuZXh0U2NvcmVMYWJlbC5zdHJpbmcgPSBcIi9cIiArIG5leHRzY29yZTtcbiAgICB9LFxuXG4gICAgc2V0VXNlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB3b25vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ3b2Jhbm5lclwiKTtcbiAgICAgICAgdmFyIHVzZXJMYWJlbCA9IHdvbm9kZS5nZXRDaGlsZEJ5TmFtZShcInVzZXJuYW1lXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpO1xuICAgICAgICB2YXIgbGV2ZWxMYWJlbCA9IHdvbm9kZS5nZXRDaGlsZEJ5TmFtZShcInVzZXJsZXZlbFwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKTtcblxuICAgICAgICB1c2VyTGFiZWwuc3RyaW5nID0gdGhpcy5hZ2VudHNEZWYubmFtZTtcbiAgICAgICAgbGV2ZWxMYWJlbC5zdHJpbmcgPSB0aGlzLmFnZW50c0RlZi5sZXZlbDtcbiAgICB9LFxuXG4gICAgc2V0TXlDYXJkczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzeCA9IC0yOTU7XG4gICAgICAgIHZhciBzeSA9IDI0O1xuICAgICAgICB2YXIgbXgsIG15O1xuICAgICAgICB2YXIgY2FyZCwgY2FyZE5vZGUsIGNvc3QsIGxldmVsO1xuICAgICAgICB2YXIgbW92ZVRvO1xuICAgICAgICB2YXIgYWxsQ2FyZHMgPSB0aGlzLmFnZW50c0RlZi5teUxpc3Q7XG4gICAgICAgIHZhciByb3dJdGVtcyA9IDA7XG4gICAgICAgIHZhciByb3dzID0gMDtcbiAgICAgICAgdmFyIGNvbHMgPSAwO1xuICAgICAgICB2YXIgd2FsbE5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjbGFuV2FsbFwiKTtcbi8qXG4gICAgICAgIGZvcih2YXIgaT0wO2k8NjtpKyspIHtcbiAgICAgICAgICAgIGNvbHMgPSBpJTY7XG4gICAgICAgICAgICBteCA9IHN4Kyhjb2xzKjEyNCk7XG4gICAgICAgICAgICBteSA9IHN5O1xuICAgICAgICAgICAgY2FyZCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzJdKTtcbiAgICAgICAgICAgIG1vdmVUbyA9IGNjLnYyKG14LCBteSk7XG4gICAgICAgICAgICBjYXJkLnNldFBvc2l0aW9uKG1vdmVUbyk7XG4gICAgICAgICAgICB3YWxsTm9kZS5hZGRDaGlsZChjYXJkKTtcbiAgICAgICAgfVxuKi9cbiAgICAgICAgZm9yKHZhciBpPTA7aTw2O2krKykge1xuICAgICAgICAgICAgY2FyZCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzFdKTtcbiAgICAgICAgICAgIGNhcmROb2RlID0gY2FyZC5nZXRDb21wb25lbnQoJ1NlbENhcmQnKTtcbiAgICAgICAgICAgIGlmKGFsbENhcmRzW2ldKSB7XG4gICAgICAgICAgICAgICAgY29zdCA9IHRoaXMuYWdlbnRzRGVmW2FsbENhcmRzW2ldXS5jb3N0O1xuICAgICAgICAgICAgICAgIGxldmVsID0gdGhpcy5hZ2VudHNEZWYubGV2ZWw7XG4gICAgICAgICAgICAgICAgY2FyZE5vZGUuc2V0Um9sZShhbGxDYXJkc1tpXSwgY29zdCwgbGV2ZWwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm15Q2FyZE5vZGVzLnB1c2goY2FyZE5vZGUpOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbHMgPSBpJTY7XG4gICAgICAgICAgICBteCA9IHN4Kyhjb2xzKjEyNCk7XG4gICAgICAgICAgICBteSA9IHN5O1xuICAgICAgICAgICAgbW92ZVRvID0gY2MudjIobXgsIG15KTtcbiAgICAgICAgICAgIGNhcmQuc2V0UG9zaXRpb24obW92ZVRvKTtcbiAgICAgICAgICAgIHdhbGxOb2RlLmFkZENoaWxkKGNhcmQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldFJlbGF5VUk6IGZ1bmN0aW9uKHJvbGUpIHtcbiAgICAgICAgaWYgKENDX1dFQ0hBVEdBTUUgJiYgIXJvbGUuaW5BcnJheSh0aGlzLmJhc2VSb2xlcykpIHsgICAgLy9pZiB3ZWNoYXQgcGxhdGZvcm1cbiAgICAgICAgICAgIHd4LnNoYXJlQXBwTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi5Lit5Y+k5oiY57qqXCIsXG4gICAgICAgICAgICAgICAgaW1hZ2VVcmw6IFwiaHR0cHM6Ly93d3cuYXNvYmVlLm1vYmkvZmZ0b3dlci9yZXMvYWNMb2dvMi5qcGdcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMud3hSZWxheVRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpZld4VmFsaWRSZWxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjdXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgaWYgKGN1ciAtIHRoaXMud3hSZWxheVRpbWUgPCAzMDAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIHNlbGVPbmVDYXJkOiBmdW5jdGlvbihyb2xlKSB7XG4gICAgICAgIHZhciBjYXJkO1xuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuYWxsQ2FyZE5vZGVzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGNhcmQgPSB0aGlzLmFsbENhcmROb2Rlc1tpXTtcbiAgICAgICAgICAgIGlmKGNhcmQuc2VsZVJvbGUgIT09IHJvbGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNob29zZW5DYXJkID0gdGhpcy5hZ2VudHNEZWZbcm9sZV07XG4gICAgICAgICAgICAgICAgdGhpcy5jaG9vc2VuQ2FyZC5yb2xlID0gcm9sZTtcbiAgICAgICAgICAgICAgICBjYXJkLmdyZXkodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaGFrZU15Q2FyZHModHJ1ZSk7XG4gICAgICAgIHRoaXMuc2V0UmVsYXlVSShyb2xlKTtcbiAgICAgICAgdGhpcy5kaXNwV3hSZWxheVdhcm4oZmFsc2UpO1xuICAgIH0sXG5cbiAgICBkaXNwV3hSZWxheVdhcm46IGZ1bmN0aW9uKGZsYWcpIHtcbiAgICAgICAgdmFyIHdhcm4gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ3eFJlbGF5V2FyblwiKTtcbiAgICAgICAgd2Fybi5hY3RpdmUgPSBmbGFnO1xuICAgIH0sXG5cbiAgICBnZXROb3dBZ2VudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY05vZGVzID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY2xhbldhbGxcIikuX2NoaWxkcmVuO1xuICAgICAgICB2YXIgdG47XG4gICAgICAgIHZhciByZXQgPSBbXTtcbiAgICAgICAgdmFyIGFnZW50c0xpc3QgPSBbXTtcbiAgICAgICAgdmFyIGFkID0ge307XG4gICAgICAgIHZhciByb2xlLCBjb3N0LCBsZXZlbDtcbiAgICAgICAgZm9yKHZhciBpPTA7aTxjTm9kZXMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgaWYoY05vZGVzW2ldLl9uYW1lID09IFwiU2VsQ2FyZFwiKSB7XG4gICAgICAgICAgICAgICAgcm9sZSA9IGNOb2Rlc1tpXS5nZXRDb21wb25lbnQoXCJTZWxDYXJkXCIpLnNlbGVSb2xlO1xuICAgICAgICAgICAgICAgIGNvc3QgPSBjTm9kZXNbaV0uZ2V0Q29tcG9uZW50KFwiU2VsQ2FyZFwiKS5tYWdpY0Nvc3Q7XG4gICAgICAgICAgICAgICAgbGV2ZWwgPSBjTm9kZXNbaV0uZ2V0Q29tcG9uZW50KFwiU2VsQ2FyZFwiKS5yb2xlTGV2ZWw7XG5cbiAgICAgICAgICAgICAgICBpZihjb3N0ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBhZCA9IHtcInNlbGVSb2xlXCI6cm9sZSwgXCJtYWdpY0Nvc3RcIjpjb3N0LCBcInJvbGVMZXZlbFwiOmxldmVsfTtcbiAgICAgICAgICAgICAgICAgICAgYWdlbnRzTGlzdC5wdXNoKHJvbGUpO1xuICAgICAgICAgICAgICAgICAgICByZXQucHVzaChhZCk7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbm9kZSA9IGNjLmZpbmQoJ0dhbWVEYXRhJykuZ2V0Q29tcG9uZW50KCdHYW1lRGF0YScpO1xuICAgICAgICBub2RlLnNldE15TGlzdChhZ2VudHNMaXN0KTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuXG4gICAgZ2V0UGVyc2lzdGFudERhdGE6IGZ1bmN0aW9uKHBhcmFtKSB7XG4gICAgICAgIHZhciBub2RlID0gY2MuZmluZCgnR2FtZURhdGEnKS5nZXRDb21wb25lbnQoJ0dhbWVEYXRhJyk7XG4gICAgICAgIHJldHVybiBub2RlLmdldERhdGEoKTtcbiAgICB9LFxuXG4gICAgc2V0Q2FyZHNTdGF0dXM6IGZ1bmN0aW9uKG5vd0FnZW50cykge1xuICAgICAgICB2YXIgY2FyZDtcbiAgICAgICAgdmFyIHN1bU15Q2FyZHMgPSAwO1xuICAgICAgICB2YXIgc3VtQ29zdCA9IDA7XG4gICAgICAgIHZhciBhdmVyYWdlID0gMDtcbiAgICAgICAgdmFyIHdhbGxOb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY2xhbldhbGxcIik7XG4gICAgICAgIHZhciBhdmVyYWdlTGFiZWwgPSB3YWxsTm9kZS5nZXRDaGlsZEJ5TmFtZShcIndvcmRib2FyZGJnXCIpLmdldENoaWxkQnlOYW1lKFwiYXZlcmFnZUNvc1wiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKVxuICAgICAgICB2YXIgbXlDYXJkc051bUxhYmVsID0gd2FsbE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ3b3JkYmdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkQnV0XCIpLmdldENoaWxkQnlOYW1lKFwibXlDYXJkTnVtXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpXG4gICAgICAgIHZhciBhbGxDYXJkc051bUxhYmVsID0gd2FsbE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ3b3JkYmdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkQnV0XCIpLmdldENoaWxkQnlOYW1lKFwiYWxsQ2FyZE51bVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKVxuXG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5hbGxDYXJkTm9kZXMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgY2FyZCA9IHRoaXMuYWxsQ2FyZE5vZGVzW2ldO1xuICAgICAgICAgICAgY2FyZC5zZXRDYXJkU3RhdHVzKGNhcmQuc2VsZVJvbGUuaW5BcnJheShub3dBZ2VudHMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vZm9yIGF2ZXJhZ2UgbWFnaWNDb3N0IGRpc3BsYXlcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLm15Q2FyZE5vZGVzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGlmKHRoaXMubXlDYXJkTm9kZXNbaV0ubWFnaWNDb3N0ICE9MCkge1xuICAgICAgICAgICAgICAgIHN1bU15Q2FyZHMrKztcbiAgICAgICAgICAgICAgICBzdW1Db3N0ICs9IHRoaXMubXlDYXJkTm9kZXNbaV0ubWFnaWNDb3N0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYXZlcmFnZSA9IHN1bUNvc3Qvc3VtTXlDYXJkcztcbiAgICAgICAgYXZlcmFnZUxhYmVsLnN0cmluZyA9IGF2ZXJhZ2UudG9GaXhlZCgyKTtcblxuICAgICAgICAvL+aIkeeahOWFteeJjOaYvuekulxuICAgICAgICBteUNhcmRzTnVtTGFiZWwuc3RyaW5nID0gc3VtTXlDYXJkcztcbiAgICAgICAgYWxsQ2FyZHNOdW1MYWJlbC5zdHJpbmcgPSBcIi9cIiArIHRoaXMuYWxsQ2FyZE5vZGVzLmxlbmd0aDtcbiAgICB9LFxuXG4gICAgc2hha2VNeUNhcmRzOiBmdW5jdGlvbihmbGFnKSB7XG4gICAgICAgIHZhciBjYXJkO1xuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMubXlDYXJkTm9kZXMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgY2FyZCA9IHRoaXMubXlDYXJkTm9kZXNbaV07XG4gICAgICAgICAgICBpZihmbGFnKSB7XG4gICAgICAgICAgICAgICAgY2FyZC5zdGFydENhcmRKaXR0ZXIoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FyZC5zdG9wQ2FyZEppdHRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVuc2VsZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNhcmQ7XG4gICAgICAgIHRoaXMuY2hvb3NlbkNhcmQgPSB7fTtcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLmFsbENhcmROb2Rlcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICBjYXJkID0gdGhpcy5hbGxDYXJkTm9kZXNbaV07XG4gICAgICAgICAgICBjYXJkLmdyZXkoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hha2VNeUNhcmRzKGZhbHNlKTtcbi8vdGhpcy5kaXNwV3hSZWxheVdhcm4oZmFsc2UpO1xuICAgIH0sXG5cbiAgICBzZXRBbGxDYXJkczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzeCA9IC0yMDA7XG4gICAgICAgIHZhciBzeSA9IC00MDA7XG4gICAgICAgIHZhciBteCwgbXk7XG4gICAgICAgIHZhciBjYXJkLCBjYXJkTm9kZSwgY29zdCwgZGlzcCwgaWNvbjtcbiAgICAgICAgdmFyIG1vdmVUbztcbiAgICAgICAgdmFyIGFsbENhcmRzID0gdGhpcy5hZ2VudHNEZWYuYWxsTGlzdDtcbiAgICAgICAgdmFyIHJvd0l0ZW1zID0gMDtcbiAgICAgICAgdmFyIHJvd3MgPSAwO1xuICAgICAgICB2YXIgY29scyA9IDA7XG5cbiAgICAgICAgZm9yKHZhciBpPTA7aTxhbGxDYXJkcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICBjb3N0ID0gdGhpcy5hZ2VudHNEZWZbYWxsQ2FyZHNbaV1dLmNvc3Q7XG4gICAgICAgICAgICBkaXNwID0gdGhpcy5hZ2VudHNEZWZbYWxsQ2FyZHNbaV1dLmRpc3A7XG4gICAgICAgICAgICByb3dzID0gTWF0aC5mbG9vcihpLzQpO1xuICAgICAgICAgICAgY29scyA9IGklNDtcblxuICAgICAgICAgICAgbXkgPSBzeS0ocm93cyoyMDApO1xuICAgICAgICAgICAgbXggPSBzeCsoY29scyoxNzApO1xuXG4gICAgICAgICAgICBjYXJkID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMF0pO1xuICAgICAgICAgICAgY2FyZE5vZGUgPSBjYXJkLmdldENvbXBvbmVudCgnQWxsQ2FyZCcpO1xuICAgICAgICAgICAgY2FyZE5vZGUuc2V0Um9sZShhbGxDYXJkc1tpXSwgY29zdCwgZGlzcCk7XG5cbiAgICAgICAgICAgIGlmKENDX1dFQ0hBVEdBTUUgJiYgIWFsbENhcmRzW2ldLmluQXJyYXkodGhpcy5iYXNlUm9sZXMpKSB7XG4gICAgICAgICAgICAgICAgaWNvbiA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzNdKTtcbiAgICAgICAgICAgICAgICBpY29uLnNldFBvc2l0aW9uKGNjLnYyKDM4LDY4KSk7XG4gICAgICAgICAgICAgICAgaWNvbi5zY2FsZVggPSAwLjY7XG4gICAgICAgICAgICAgICAgaWNvbi5zY2FsZVkgPSAwLjY7XG4gICAgICAgICAgICAgICAgY2FyZC5hZGRDaGlsZChpY29uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW92ZVRvID0gY2MudjIobXgsIG15KTtcbiAgICAgICAgICAgIGNhcmQuc2V0UG9zaXRpb24obW92ZVRvKTtcblxuICAgICAgICAgICAgdGhpcy5hbGxDYXJkTm9kZXMucHVzaChjYXJkTm9kZSk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoY2FyZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldENhcmRzU3RhdHVzKHRoaXMuYWdlbnRzRGVmLm15TGlzdCk7XG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=