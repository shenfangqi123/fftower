
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f3bc9CQlNRD6plaPVQ+7BK9', 'Game');
// scripts/Game.js

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
var common = require("Common");

var gameProvider = require("GameProvider");

cc._Dictionary = require("Dictionary");
cc.Class({
  "extends": gameProvider,
  properties: {
    // 这个属性引用了预制资源
    playerPrefab: {
      "default": [],
      type: cc.Prefab
    },
    audios: {
      "default": [],
      type: cc.AudioClip
    }
  },
  ctor: function ctor() {
    console.log("-----ctor----");
    this.bufferLen = 30;
  },
  goback: function goback(event, customEventData) {
    this.syncTimeout();
    cc.director.loadScene('menu');
  },
  onLoad: function onLoad() {
    console.log("---------onLoad--------");
    /*
            if (typeof (wx) !== "undefined") {
                let self = this;
                wx.onShow(function () {
                    console.log("wx onshow.");
                    if (self.isShared && self.shareTag == "keys") {
                        let curTime = new Date().getTime();
                        if (curTime - self.closeTime >= 3000) {
                            //分享成功
                            console.log("分享成功");
                            //self.isShared = false;
                            //self.shareTag = "";
                            //self.closeTime = curTime;
                        }
                    }
                })
            }
    */

    var _parent = this;

    this.netErrDisp = false;
    var size = cc.visibleRect;
    var name = this.getRandomCharName();
    this.nick = name;
    this.canvasNode = this.node.parent;
    this.resultOp = this.node.getChildByName("Result").getComponent("Result");
    this.gameCountDown = 150; //2:30
    //up user or down user.

    this.mainPlayer = -1;
    this.roomId = "";
    this.baseAttackDuraRec = [];
    this.agentMoveStepRec = [];
    this._defaultBases = ["base1", "base2", "base3", "base4", "base5", "base6"];
    this.gameStartTime = 0;
    this.gameCycleTime = 90;
    this.gameOver = false;
    this.addJuice = 10; //each heart add up to magic juice bar

    this.npcInfo = new cc._Dictionary();
    this.removedNpcInfo = new cc._Dictionary();
    this.setUser(this.getPersistantData());
    console.log("name:" + name);
    this.socketHandle(this.nick);
    this.putSele = [];
    this.dragingItem = "";
    this.clickSele = {};
    this.magicAmount = 0; //red alert area should not be entered by hero.

    this.maskType = "seleMask3";

    var canvasPt = this.node._parent.getPosition();

    var layoutPt = this.node.getPosition();
    var cnode, pl;
    var magicCost = 0;
    var role;
    var selParams, selNode;
    var innerId;
    this.node.on(cc.Node.EventType.TOUCH_END, function (params) {
      if (_parent.gameStartTime == 0) {
        return;
      }

      var pt = params.getLocation();

      _parent.clickProcessor(pt);
    });
    /*
            this.listener = cc.EventListener.create({
                event: cc.EventListener.CUSTOM,  
                eventName: "event_effect",
                callback: function (event) {
                    cc.log("event = "+event.getUserData());
                }
            });
            cc.eventManager.addListener(this.listener, 1);
    */

    this.initEventListener();
  },
  getPersistantData: function getPersistantData() {
    var node = cc.find('GameData').getComponent('GameData');
    return node.getData();
  },
  setUser: function setUser(def) {
    var node = cc.find('GameData').getComponent('GameData');
    var titlenode = this.node.parent.getChildByName("banner").getChildByName("title");
    var levelLabel = this.node.parent.getChildByName("banner").getChildByName("level").getChildByName("levelword").getComponent("cc.Label");
    var nameLabel = titlenode.getChildByName("name").getComponent("cc.Label");
    var scoreLabel = titlenode.getChildByName("score").getComponent("cc.Label");
    nameLabel.string = node.getNick();
    levelLabel.string = def.level;
    scoreLabel.string = def.myscore;
  },
  setConnFailInfo: function setConnFailInfo() {
    this.netErrDisp = true;
    var msgLabel = this.node.getChildByName("putWait").getChildByName("msg").getComponent("cc.Label");
    var retBut = this.node.getChildByName("putWait").getChildByName("retBut");
    retBut.active = true;
    msgLabel.string = "ネット障害";
  },
  setBuffDisp: function setBuffDisp(buffType) {
    var canvasNode = this.node.parent;
    this.buffType = buffType;

    if (buffType == "heal") {
      canvasNode.getChildByName("buffHeal").active = true;
    } else if (buffType == "thunder") {
      canvasNode.getChildByName("buffThunder").active = true;
    }
  },

  /*
      doBuff: function(event, customEventData) {
          console.log("sssss:" + customEventData);
          var buffType = customEventData;
          if(buffType == 1) {
          }
      },
  */
  setParam: function setParam(param, timestamp) {
    console.log("----param----");
    console.log(param);
    console.log(timestamp);
    var curTime = new Date().getTime();
    console.log("duration:" + (curTime - timestamp));
    this.setMyCards(param);
    this.dispCharSele();
  },
  setMyCards: function setMyCards(param) {
    var sx = -230;
    var sy = -590;
    var mx, my;
    var card, cardNode, cost;
    var moveTo; //var allCards = ["log","bomb","ske","ir"];

    var allCards = param;
    var rowItems = 0;
    var rows = 0;
    var cols = 0;
    var canvasNode = this.node.parent;
    var head = "sel";

    for (var i = 0; i < allCards.length; i++) {
      card = cc.instantiate(this.playerPrefab[21]);
      card._name = head + (i + 1);
      cardNode = card.getComponent('SelCard');

      if (allCards[i]) {
        cost = 1;
        cardNode.setRole(allCards[i].seleRole, allCards[i].magicCost, allCards[i].roleLevel);
      } //this.myCardNodes.push(cardNode);                


      cols = i % 6;
      mx = sx + cols * 105;
      my = sy;
      moveTo = cc.v2(mx, my);
      card.setPosition(moveTo);
      canvasNode.addChild(card);
    }

    for (var i = allCards.length; i < 6; i++) {
      cols = i % 6;
      mx = sx + cols * 105;
      my = sy;
      card = cc.instantiate(this.playerPrefab[22]);
      moveTo = cc.v2(mx, my);
      card.setPosition(moveTo);
      canvasNode.addChild(card);
    }
  },
  dispCharSele: function dispCharSele() {
    var charSele = this.node.parent.getChildByName("charSele");
    charSele.zIndex = 9999;
    charSele.active = false;
    console.log(charSele);
  },
  gameOverProcessor: function gameOverProcessor(mainPlayer, data) {
    if (mainPlayer == 1) {
      if (data.win == 1) {
        console.log("my win11");
        this.killBases("up");
      } else if (data.win == 0) {
        console.log("my lose11");
        this.killBases("down");
      }
    } else if (mainPlayer == 2) {
      if (data.win == 1) {
        console.log("my lose11");
        this.killBases("down");
      } else if (data.win == 0) {
        console.log("my win11");
        this.killBases("up");
      }
    }
  },
  clickProcessor: function clickProcessor(clickPt) {
    var _parent = this;

    var canvasPt = this.canvasNode.getPosition();
    var layoutPt = this.node.getPosition();
    var innerId; //note that pt is the postion in canvas node.

    var pt = clickPt;
    var pt1 = {};
    var magicCost = _parent.clickSele.magicCost;
    var level = _parent.clickSele.level;
    var role = _parent.clickSele.role;

    if (role === undefined || role == "") {
      return;
    }

    var selCard = _parent.clickSele.params.target;
    var selNode = _parent.clickSele.node;
    var pl = selNode.parent.getPosition(); //sel card node.

    var yOffset;

    if (_parent.mainPlayer == 1) {
      yOffset = -20;
    } else {
      yOffset = 40;
    } //pointer position


    pt1.x = layoutPt.x + pt.x - pl.x - 10;
    pt1.y = layoutPt.y + pt.y - pl.y - (canvasPt.y + layoutPt.y); //position in layout

    pt.x = pt.x / _parent.node.scaleX - (canvasPt.x + layoutPt.x);
    pt.y = pt.y / _parent.node.scaleY - (canvasPt.y + layoutPt.y) + yOffset;

    if (!this.ifNotMaskRole(role)) {
      this.showMask(this.maskType, 1);
    }

    if (!this.isValidPutPoint(pt) && !this.ifNotMaskRole(role)) {
      console.log("invalid postion.");
      this.putErrorMsg();
      return;
    }

    innerId = _parent.putClickItem(selCard, selNode, pt1);

    _parent.sendSodier(magicCost, role, pt, innerId, level);
  },
  isValidPutPoint: function isValidPutPoint(point) {
    var pt = {};
    pt.x = point.x;
    pt.y = point.y;

    if (this.mainPlayer == 2) {
      pt.y = point.y - 40;
    }

    if (this.maskType == "seleMask1") {
      if (pt.x >= 30 && pt.x <= 570 && pt.y > 0 && pt.y < 650) {
        return true;
      } else {
        return false;
      }
    } else if (this.maskType == "seleMask12") {
      if (pt.x >= 30 && pt.x <= 570 && pt.y > 0 && pt.y < 420 || pt.x >= 285 && pt.x <= 570 && pt.y > 420 && pt.y < 650) {
        return true;
      } else {
        return false;
      }
    } else if (this.maskType == "seleMask13") {
      if (pt.x >= 30 && pt.x <= 570 && pt.y > 0 && pt.y < 420 || pt.x >= 30 && pt.x <= 285 && pt.y > 420 && pt.y < 650) {
        return true;
      } else {
        return false;
      }
    } else if (this.maskType == "seleMask3") {
      if (pt.x >= 30 && pt.x <= 570 && pt.y > 0 && pt.y < 420) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  },
  ifNotMaskRole: function ifNotMaskRole(role) {
    if (role == "bomb" || role == "thunder" || role == "heal") {
      return true;
    }

    return false;
  },
  initEventListener: function initEventListener() {
    this.node.on("event_effect", this.onEventEffect.bind(this));
  },
  onEventEffect: function onEventEffect() {
    console.log("listening effect loaded....");
  },
  setCountDown: function setCountDown(counter) {
    var min = parseInt(counter / 60);
    var sec = counter % 60; //console.log(min +":"+ sec);

    var timeNode = this.canvasNode.getChildByName("banner").getChildByName("time");
    var cdNode = timeNode.getChildByName("countDown").getComponent("cc.Label");

    if (sec < 10) {
      sec = "0" + sec;
    }

    cdNode.string = min + ":" + sec;
  },
  doubleMagicDisp: function doubleMagicDisp() {
    var dispnode = this.node.getChildByName("doubleMagic");
    dispnode.active = true;
  },
  setTimeCounter: function setTimeCounter(cnt) {
    //use to compare if timeout, only for pk mode.
    this.gameNowTime = cnt;
    this.setCountDown(cnt);

    if (cnt == 60) {
      console.log("magic charge speed up");
      this.doubleMagicDisp();
      this.addJuice = 20;
    }

    this.setMagicBar(); //counter1.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("num_8.png"));
    //3 second is the ai page loading time.

    var count_down = this.gameCycleTime - cnt;

    if (count_down < 0) {
      this.gameOver = true;
      return;
    }

    var tens = parseInt(count_down / 10);
    var ones = count_down % 10; //console.log(tens +":::"+ ones);
  },
  startTraceTimer: function startTraceTimer() {
    //refer to server interval setting, must a little shorter than that in server
    this.interval = 30;
    var then = Date.now();

    var _parent = this; // 30 mini seconds a game cycle.


    var game_cycle = this.gameCycleTime * 1000;
    var game_cycle_then = Date.now();
    var cycle_cnt = 0;

    if (!this.traceTimer) {
      this.traceTimer = function () {
        var now = Date.now();
        var delta = now - then; //when net traffic happened, idle for 5's will halt
        //not tested yet.

        var game_cycle_delta = now - _parent.gameStartTime; // if within game cycle time

        if (!_parent.gameOver && game_cycle_delta > cycle_cnt * 1000) {
          cycle_cnt++; // if no response for 5s, then timeout

          if (Math.abs(cycle_cnt - _parent.gameNowTime) > 5) {
            this.syncTimeout();
          }
        }

        if (delta > _parent.interval) {
          then = now - delta % _parent.interval;

          _parent.mainGameCycle();
        }
      }.bind(this);
    }

    this.schedule(this.traceTimer, 0);
  },
  mainGameCycle: function mainGameCycle() {
    var _parent = this;

    var data, agents, bullets, bases, forts, rollLogs, agentsFuture, fortsFuture;

    if (this.gameTraceStack.length > this.bufferLen) {
      this.gameTraceStack.shift();
      data = this.gameTraceStack[0]; //data = this.gameTraceStack[this.gameTraceStack.length - 10];

      agents = data.agents;
      agentsFuture = this.gameTraceStack[29].agents;
      fortsFuture = this.gameTraceStack[29].forts;
      bullets = data.bullets;
      bases = data.bases;
      forts = data.forts;
      rollLogs = data.rollLogs;

      _parent.playBullets(bullets);

      _parent.playLogs(rollLogs);

      _parent.playAgents(agents, agentsFuture);

      _parent.playBases(bases);

      _parent.playForts(forts);

      _parent.bulletProcess(bullets);

      _parent.logProcess(rollLogs);

      _parent.agentProcess(agents);

      _parent.fortProcess(forts, fortsFuture);

      _parent.baseProcess(bases);
    } //var event = new cc.Event.EventCustom("event_effect", true);
    //event.detail = "123";
    //this.node.dispatchEvent(event);

  },
  syncTimeout: function syncTimeout() {
    this.gameOver = true;
    this.stopTraceTimer();
    MY_SOCKET.disconnect();
    console.log("网络断开"); //this.goPrevious();                 
  },
  stopTraceTimer: function stopTraceTimer() {
    if (this.traceTimer) {
      this.unschedule(this.traceTimer);
    }
  },
  playSnd: function playSnd(sndType) {
    if (sndType == "base") {
      cc.audioEngine.play(this.audios[0], false, 1);
    } else if (sndType == "fireSend") {
      cc.audioEngine.play(this.audios[1], false, 1);
    } else if (sndType == "bomb") {
      cc.audioEngine.play(this.audios[2], false, 1);
    } else if (sndType == "ske") {
      cc.audioEngine.play(this.audios[3], false, 1);
    } else if (sndType == "hr") {
      cc.audioEngine.play(this.audios[4], false, 1);
    } else if (sndType == "lr") {
      cc.audioEngine.play(this.audios[5], false, 1);
    } else if (sndType == "gi") {
      cc.audioEngine.play(this.audios[6], false, 1);
    } else if (sndType == "put1") {
      cc.audioEngine.play(this.audios[7], false, 1);
    } else if (sndType == "wizfire") {
      cc.audioEngine.play(this.audios[2], false, 1);
    } else if (sndType == "lm") {
      cc.audioEngine.play(this.audios[8], false, 1);
    } else if (sndType == "gun") {
      cc.audioEngine.play(this.audios[9], false, 1);
    } else if (sndType == "thunder") {
      cc.audioEngine.play(this.audios[10], false, 1);
    } else if (sndType == "heal") {
      cc.audioEngine.play(this.audios[11], false, 1);
    } else if (sndType == "log") {
      cc.audioEngine.play(this.audios[12], false, 1);
    }
  },
  playEffect: function playEffect(role, x, y) {
    var bd; //play effect.
    //should destroy when finish.

    if (role == "hr") {
      bd = cc.instantiate(this.playerPrefab[13]);
      bd.x = x;
      bd.y = y + 20;
      this.node.addChild(bd);
    }

    if (role == "lm") {
      this.playSnd("lm");
      bd = cc.instantiate(this.playerPrefab[15]);
      bd.x = x;
      bd.y = y - 40;
      this.node.addChild(bd);
    } else if (role == "base") {
      this.playSnd("base");
      bd = cc.instantiate(this.playerPrefab[10]);
      bd.x = x;
      bd.y = y;
      this.node.addChild(bd);
    } //fortA
    else if (role == "fa") {
        bd = cc.instantiate(this.playerPrefab[10]);
        bd.x = x;
        bd.y = y;
        this.node.addChild(bd);
      } else if (role == "log") {
        bd = cc.instantiate(this.playerPrefab[10]);
        bd.scaleX = 0.8;
        bd.scaleY = 0.8;
        bd.x = x + 10;
        bd.y = y;
        this.node.addChild(bd);
      } else if (role == "bomb") {
        this.playSnd("bomb"); //shake the screen

        this.startSceneJitter();
        bd = cc.instantiate(this.playerPrefab[6]);
        bd.active = true;
        bd.x = x;
        bd.y = y;
        this.node.addChild(bd);
      } else if (role == "wizfire") {
        this.playSnd("wizfire");
        bd = cc.instantiate(this.playerPrefab[19]);
        bd.active = true;
        bd.x = x;
        bd.y = y;
        this.node.addChild(bd);
      }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0dhbWUuanMiXSwibmFtZXMiOlsiY29tbW9uIiwicmVxdWlyZSIsImdhbWVQcm92aWRlciIsImNjIiwiX0RpY3Rpb25hcnkiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJwbGF5ZXJQcmVmYWIiLCJ0eXBlIiwiUHJlZmFiIiwiYXVkaW9zIiwiQXVkaW9DbGlwIiwiY3RvciIsImNvbnNvbGUiLCJsb2ciLCJidWZmZXJMZW4iLCJnb2JhY2siLCJldmVudCIsImN1c3RvbUV2ZW50RGF0YSIsInN5bmNUaW1lb3V0IiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJvbkxvYWQiLCJfcGFyZW50IiwibmV0RXJyRGlzcCIsInNpemUiLCJ2aXNpYmxlUmVjdCIsIm5hbWUiLCJnZXRSYW5kb21DaGFyTmFtZSIsIm5pY2siLCJjYW52YXNOb2RlIiwibm9kZSIsInBhcmVudCIsInJlc3VsdE9wIiwiZ2V0Q2hpbGRCeU5hbWUiLCJnZXRDb21wb25lbnQiLCJnYW1lQ291bnREb3duIiwibWFpblBsYXllciIsInJvb21JZCIsImJhc2VBdHRhY2tEdXJhUmVjIiwiYWdlbnRNb3ZlU3RlcFJlYyIsIl9kZWZhdWx0QmFzZXMiLCJnYW1lU3RhcnRUaW1lIiwiZ2FtZUN5Y2xlVGltZSIsImdhbWVPdmVyIiwiYWRkSnVpY2UiLCJucGNJbmZvIiwicmVtb3ZlZE5wY0luZm8iLCJzZXRVc2VyIiwiZ2V0UGVyc2lzdGFudERhdGEiLCJzb2NrZXRIYW5kbGUiLCJwdXRTZWxlIiwiZHJhZ2luZ0l0ZW0iLCJjbGlja1NlbGUiLCJtYWdpY0Ftb3VudCIsIm1hc2tUeXBlIiwiY2FudmFzUHQiLCJnZXRQb3NpdGlvbiIsImxheW91dFB0IiwiY25vZGUiLCJwbCIsIm1hZ2ljQ29zdCIsInJvbGUiLCJzZWxQYXJhbXMiLCJzZWxOb2RlIiwiaW5uZXJJZCIsIm9uIiwiTm9kZSIsIkV2ZW50VHlwZSIsIlRPVUNIX0VORCIsInBhcmFtcyIsInB0IiwiZ2V0TG9jYXRpb24iLCJjbGlja1Byb2Nlc3NvciIsImluaXRFdmVudExpc3RlbmVyIiwiZmluZCIsImdldERhdGEiLCJkZWYiLCJ0aXRsZW5vZGUiLCJsZXZlbExhYmVsIiwibmFtZUxhYmVsIiwic2NvcmVMYWJlbCIsInN0cmluZyIsImdldE5pY2siLCJsZXZlbCIsIm15c2NvcmUiLCJzZXRDb25uRmFpbEluZm8iLCJtc2dMYWJlbCIsInJldEJ1dCIsImFjdGl2ZSIsInNldEJ1ZmZEaXNwIiwiYnVmZlR5cGUiLCJzZXRQYXJhbSIsInBhcmFtIiwidGltZXN0YW1wIiwiY3VyVGltZSIsIkRhdGUiLCJnZXRUaW1lIiwic2V0TXlDYXJkcyIsImRpc3BDaGFyU2VsZSIsInN4Iiwic3kiLCJteCIsIm15IiwiY2FyZCIsImNhcmROb2RlIiwiY29zdCIsIm1vdmVUbyIsImFsbENhcmRzIiwicm93SXRlbXMiLCJyb3dzIiwiY29scyIsImhlYWQiLCJpIiwibGVuZ3RoIiwiaW5zdGFudGlhdGUiLCJfbmFtZSIsInNldFJvbGUiLCJzZWxlUm9sZSIsInJvbGVMZXZlbCIsInYyIiwic2V0UG9zaXRpb24iLCJhZGRDaGlsZCIsImNoYXJTZWxlIiwiekluZGV4IiwiZ2FtZU92ZXJQcm9jZXNzb3IiLCJkYXRhIiwid2luIiwia2lsbEJhc2VzIiwiY2xpY2tQdCIsInB0MSIsInVuZGVmaW5lZCIsInNlbENhcmQiLCJ0YXJnZXQiLCJ5T2Zmc2V0IiwieCIsInkiLCJzY2FsZVgiLCJzY2FsZVkiLCJpZk5vdE1hc2tSb2xlIiwic2hvd01hc2siLCJpc1ZhbGlkUHV0UG9pbnQiLCJwdXRFcnJvck1zZyIsInB1dENsaWNrSXRlbSIsInNlbmRTb2RpZXIiLCJwb2ludCIsIm9uRXZlbnRFZmZlY3QiLCJiaW5kIiwic2V0Q291bnREb3duIiwiY291bnRlciIsIm1pbiIsInBhcnNlSW50Iiwic2VjIiwidGltZU5vZGUiLCJjZE5vZGUiLCJkb3VibGVNYWdpY0Rpc3AiLCJkaXNwbm9kZSIsInNldFRpbWVDb3VudGVyIiwiY250IiwiZ2FtZU5vd1RpbWUiLCJzZXRNYWdpY0JhciIsImNvdW50X2Rvd24iLCJ0ZW5zIiwib25lcyIsInN0YXJ0VHJhY2VUaW1lciIsImludGVydmFsIiwidGhlbiIsIm5vdyIsImdhbWVfY3ljbGUiLCJnYW1lX2N5Y2xlX3RoZW4iLCJjeWNsZV9jbnQiLCJ0cmFjZVRpbWVyIiwiZGVsdGEiLCJnYW1lX2N5Y2xlX2RlbHRhIiwiTWF0aCIsImFicyIsIm1haW5HYW1lQ3ljbGUiLCJzY2hlZHVsZSIsImFnZW50cyIsImJ1bGxldHMiLCJiYXNlcyIsImZvcnRzIiwicm9sbExvZ3MiLCJhZ2VudHNGdXR1cmUiLCJmb3J0c0Z1dHVyZSIsImdhbWVUcmFjZVN0YWNrIiwic2hpZnQiLCJwbGF5QnVsbGV0cyIsInBsYXlMb2dzIiwicGxheUFnZW50cyIsInBsYXlCYXNlcyIsInBsYXlGb3J0cyIsImJ1bGxldFByb2Nlc3MiLCJsb2dQcm9jZXNzIiwiYWdlbnRQcm9jZXNzIiwiZm9ydFByb2Nlc3MiLCJiYXNlUHJvY2VzcyIsInN0b3BUcmFjZVRpbWVyIiwiTVlfU09DS0VUIiwiZGlzY29ubmVjdCIsInVuc2NoZWR1bGUiLCJwbGF5U25kIiwic25kVHlwZSIsImF1ZGlvRW5naW5lIiwicGxheSIsInBsYXlFZmZlY3QiLCJiZCIsInN0YXJ0U2NlbmVKaXR0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQSxJQUFJQyxZQUFZLEdBQUdELE9BQU8sQ0FBQyxjQUFELENBQTFCOztBQUNBRSxFQUFFLENBQUNDLFdBQUgsR0FBaUJILE9BQU8sQ0FBQyxZQUFELENBQXhCO0FBRUFFLEVBQUUsQ0FBQ0UsS0FBSCxDQUFTO0FBQ0wsYUFBU0gsWUFESjtBQUdMSSxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBQyxJQUFBQSxZQUFZLEVBQUU7QUFDVixpQkFBUyxFQURDO0FBRVZDLE1BQUFB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R0FBT0EsQ0FBUDtBQUNBdUUsUUFBQUEsRUFBRSxDQUFDdEUsQ0FBSCxHQUFPQSxDQUFQO0FBQ0EsYUFBS3pHLElBQUwsQ0FBVTJGLFFBQVYsQ0FBbUJvRixFQUFuQjtBQUNIO0FBQ0o7QUE3a0JJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbnZhciBjb21tb24gPSByZXF1aXJlKFwiQ29tbW9uXCIpO1xudmFyIGdhbWVQcm92aWRlciA9IHJlcXVpcmUoXCJHYW1lUHJvdmlkZXJcIik7XG5jYy5fRGljdGlvbmFyeSA9IHJlcXVpcmUoXCJEaWN0aW9uYXJ5XCIpO1xuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogZ2FtZVByb3ZpZGVyLFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyDov5nkuKrlsZ7mgKflvJXnlKjkuobpooTliLbotYTmupBcbiAgICAgICAgcGxheWVyUHJlZmFiOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuICAgICAgICBhdWRpb3M6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY3RvcigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0tLWN0b3ItLS0tXCIpO1xuICAgICAgICB0aGlzLmJ1ZmZlckxlbiA9IDMwO1xuICAgIH0sXG5cbiAgICBnb2JhY2s6IGZ1bmN0aW9uIChldmVudCwgY3VzdG9tRXZlbnREYXRhKSB7XG4gICAgICAgIHRoaXMuc3luY1RpbWVvdXQoKTtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdtZW51Jyk7XG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLW9uTG9hZC0tLS0tLS0tXCIpO1xuXG4vKlxuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHd4Lm9uU2hvdyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3eCBvbnNob3cuXCIpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmlzU2hhcmVkICYmIHNlbGYuc2hhcmVUYWcgPT0gXCJrZXlzXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1clRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1clRpbWUgLSBzZWxmLmNsb3NlVGltZSA+PSAzMDAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WIhuS6q+aIkOWKn1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLliIbkuqvmiJDlip9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlbGYuaXNTaGFyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VsZi5zaGFyZVRhZyA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlbGYuY2xvc2VUaW1lID0gY3VyVGltZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiovXG5cbiAgICAgICAgdmFyIF9wYXJlbnQgPSB0aGlzO1xuICAgICAgICB0aGlzLm5ldEVyckRpc3AgPSBmYWxzZTtcbiAgICAgICAgdmFyIHNpemUgPSBjYy52aXNpYmxlUmVjdDtcbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmdldFJhbmRvbUNoYXJOYW1lKCk7XG4gICAgICAgIHRoaXMubmljayA9IG5hbWU7XG5cbiAgICAgICAgdGhpcy5jYW52YXNOb2RlID0gdGhpcy5ub2RlLnBhcmVudDtcbiAgICAgICAgdGhpcy5yZXN1bHRPcCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlJlc3VsdFwiKS5nZXRDb21wb25lbnQoXCJSZXN1bHRcIik7XG5cbiAgICAgICAgdGhpcy5nYW1lQ291bnREb3duID0gMTUwOyAvLzI6MzBcbiAgICAgICAgLy91cCB1c2VyIG9yIGRvd24gdXNlci5cbiAgICAgICAgdGhpcy5tYWluUGxheWVyID0gLTE7XG4gICAgICAgIHRoaXMucm9vbUlkID0gXCJcIjtcblxuICAgICAgICB0aGlzLmJhc2VBdHRhY2tEdXJhUmVjID0gW107XG4gICAgICAgIHRoaXMuYWdlbnRNb3ZlU3RlcFJlYyA9IFtdO1xuICAgICAgICB0aGlzLl9kZWZhdWx0QmFzZXMgPSBbXCJiYXNlMVwiLFwiYmFzZTJcIixcImJhc2UzXCIsXCJiYXNlNFwiLFwiYmFzZTVcIixcImJhc2U2XCJdO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5nYW1lU3RhcnRUaW1lID0gMDtcbiAgICAgICAgdGhpcy5nYW1lQ3ljbGVUaW1lID0gOTA7XG4gICAgICAgIHRoaXMuZ2FtZU92ZXI9ZmFsc2U7XG4gICAgICAgIHRoaXMuYWRkSnVpY2UgPSAxMDsgIC8vZWFjaCBoZWFydCBhZGQgdXAgdG8gbWFnaWMganVpY2UgYmFyXG5cbiAgICAgICAgdGhpcy5ucGNJbmZvID0gbmV3IGNjLl9EaWN0aW9uYXJ5KCk7XG4gICAgICAgIHRoaXMucmVtb3ZlZE5wY0luZm8gPSBuZXcgY2MuX0RpY3Rpb25hcnkoKTtcbiAgICAgICAgdGhpcy5zZXRVc2VyKHRoaXMuZ2V0UGVyc2lzdGFudERhdGEoKSk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJuYW1lOlwiICsgbmFtZSk7XG4gICAgICAgIHRoaXMuc29ja2V0SGFuZGxlKHRoaXMubmljayk7XG5cbiAgICAgICAgdGhpcy5wdXRTZWxlID0gW107XG4gICAgICAgIHRoaXMuZHJhZ2luZ0l0ZW0gPSBcIlwiO1xuXG4gICAgICAgIHRoaXMuY2xpY2tTZWxlID0ge307XG4gICAgICAgIHRoaXMubWFnaWNBbW91bnQgPSAwO1xuXG4gICAgICAgIC8vcmVkIGFsZXJ0IGFyZWEgc2hvdWxkIG5vdCBiZSBlbnRlcmVkIGJ5IGhlcm8uXG4gICAgICAgIHRoaXMubWFza1R5cGUgPSBcInNlbGVNYXNrM1wiO1xuXG4gICAgICAgIHZhciBjYW52YXNQdCA9IHRoaXMubm9kZS5fcGFyZW50LmdldFBvc2l0aW9uKCk7XG4gICAgICAgIHZhciBsYXlvdXRQdCA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICB2YXIgY25vZGUsIHBsO1xuICAgICAgICB2YXIgbWFnaWNDb3N0ID0gMDtcbiAgICAgICAgdmFyIHJvbGU7XG4gICAgICAgIHZhciBzZWxQYXJhbXMsIHNlbE5vZGU7XG4gICAgICAgIHZhciBpbm5lcklkO1xuXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgICAgIGlmKF9wYXJlbnQuZ2FtZVN0YXJ0VGltZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHB0ID0gcGFyYW1zLmdldExvY2F0aW9uKCk7XG4gICAgICAgICAgICBfcGFyZW50LmNsaWNrUHJvY2Vzc29yKHB0KTtcbiAgICAgICAgfSk7XG5cbi8qXG4gICAgICAgIHRoaXMubGlzdGVuZXIgPSBjYy5FdmVudExpc3RlbmVyLmNyZWF0ZSh7XG4gICAgICAgICAgICBldmVudDogY2MuRXZlbnRMaXN0ZW5lci5DVVNUT00sICBcbiAgICAgICAgICAgIGV2ZW50TmFtZTogXCJldmVudF9lZmZlY3RcIixcbiAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJldmVudCA9IFwiK2V2ZW50LmdldFVzZXJEYXRhKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmFkZExpc3RlbmVyKHRoaXMubGlzdGVuZXIsIDEpO1xuKi9cblxuICAgICAgICB0aGlzLmluaXRFdmVudExpc3RlbmVyKCk7XG4gICAgfSxcblxuICAgIGdldFBlcnNpc3RhbnREYXRhOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5maW5kKCdHYW1lRGF0YScpLmdldENvbXBvbmVudCgnR2FtZURhdGEnKTtcbiAgICAgICAgcmV0dXJuIG5vZGUuZ2V0RGF0YSgpO1xuICAgIH0sXG5cbiAgICBzZXRVc2VyOiBmdW5jdGlvbihkZWYpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5maW5kKCdHYW1lRGF0YScpLmdldENvbXBvbmVudCgnR2FtZURhdGEnKTtcbiAgICAgICAgdmFyIHRpdGxlbm9kZSA9IHRoaXMubm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJiYW5uZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXRsZVwiKTtcbiAgICAgICAgdmFyIGxldmVsTGFiZWwgPSB0aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKFwiYmFubmVyXCIpLmdldENoaWxkQnlOYW1lKFwibGV2ZWxcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbHdvcmRcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIik7XG4gICAgICAgIHZhciBuYW1lTGFiZWwgPSB0aXRsZW5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJuYW1lXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpO1xuICAgICAgICB2YXIgc2NvcmVMYWJlbCA9IHRpdGxlbm9kZS5nZXRDaGlsZEJ5TmFtZShcInNjb3JlXCIpLmdldENvbXBvbmVudChcImNjLkxhYmVsXCIpO1xuXG4gICAgICAgIG5hbWVMYWJlbC5zdHJpbmcgPSBub2RlLmdldE5pY2soKTtcbiAgICAgICAgbGV2ZWxMYWJlbC5zdHJpbmcgPSBkZWYubGV2ZWw7XG4gICAgICAgIHNjb3JlTGFiZWwuc3RyaW5nID0gZGVmLm15c2NvcmU7XG4gICAgfSxcblxuICAgIHNldENvbm5GYWlsSW5mbzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubmV0RXJyRGlzcCA9IHRydWU7XG4gICAgICAgIHZhciBtc2dMYWJlbCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInB1dFdhaXRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJtc2dcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIik7XG4gICAgICAgIHZhciByZXRCdXQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwdXRXYWl0XCIpLmdldENoaWxkQnlOYW1lKFwicmV0QnV0XCIpO1xuICAgICAgICByZXRCdXQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgbXNnTGFiZWwuc3RyaW5nID0gXCLjg43jg4Pjg4jpmpzlrrNcIjtcbiAgICB9LFxuXG4gICAgc2V0QnVmZkRpc3A6IGZ1bmN0aW9uKGJ1ZmZUeXBlKSB7XG4gICAgICAgIHZhciBjYW52YXNOb2RlID0gdGhpcy5ub2RlLnBhcmVudDtcbiAgICAgICAgdGhpcy5idWZmVHlwZSA9IGJ1ZmZUeXBlO1xuICAgICAgICBpZihidWZmVHlwZSA9PSBcImhlYWxcIikge1xuICAgICAgICAgICAgY2FudmFzTm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ1ZmZIZWFsXCIpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihidWZmVHlwZSA9PSBcInRodW5kZXJcIikge1xuICAgICAgICAgICAgY2FudmFzTm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ1ZmZUaHVuZGVyXCIpLmFjdGl2ZSA9IHRydWU7ICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9LFxuXG4vKlxuICAgIGRvQnVmZjogZnVuY3Rpb24oZXZlbnQsIGN1c3RvbUV2ZW50RGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInNzc3NzOlwiICsgY3VzdG9tRXZlbnREYXRhKTtcbiAgICAgICAgdmFyIGJ1ZmZUeXBlID0gY3VzdG9tRXZlbnREYXRhO1xuICAgICAgICBpZihidWZmVHlwZSA9PSAxKSB7XG4gICAgICAgIH1cbiAgICB9LFxuKi9cblxuICAgIHNldFBhcmFtOiBmdW5jdGlvbihwYXJhbSwgdGltZXN0YW1wKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLXBhcmFtLS0tLVwiKTtcbiAgICAgICAgY29uc29sZS5sb2cocGFyYW0pO1xuICAgICAgICBjb25zb2xlLmxvZyh0aW1lc3RhbXApO1xuXG4gICAgICAgIHZhciBjdXJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJkdXJhdGlvbjpcIiArIChjdXJUaW1lIC0gdGltZXN0YW1wKSk7XG5cbiAgICAgICAgdGhpcy5zZXRNeUNhcmRzKHBhcmFtKTtcbiAgICAgICAgdGhpcy5kaXNwQ2hhclNlbGUoKTtcbiAgICB9LFxuXG4gICAgc2V0TXlDYXJkczogZnVuY3Rpb24ocGFyYW0pIHtcbiAgICAgICAgdmFyIHN4ID0gLTIzMDtcbiAgICAgICAgdmFyIHN5ID0gLTU5MDtcbiAgICAgICAgdmFyIG14LCBteTtcbiAgICAgICAgdmFyIGNhcmQsIGNhcmROb2RlLCBjb3N0O1xuICAgICAgICB2YXIgbW92ZVRvO1xuICAgICAgICAvL3ZhciBhbGxDYXJkcyA9IFtcImxvZ1wiLFwiYm9tYlwiLFwic2tlXCIsXCJpclwiXTtcbiAgICAgICAgdmFyIGFsbENhcmRzID0gcGFyYW07XG4gICAgICAgIHZhciByb3dJdGVtcyA9IDA7XG4gICAgICAgIHZhciByb3dzID0gMDtcbiAgICAgICAgdmFyIGNvbHMgPSAwO1xuICAgICAgICB2YXIgY2FudmFzTm9kZSA9IHRoaXMubm9kZS5wYXJlbnQ7XG4gICAgICAgIHZhciBoZWFkID0gXCJzZWxcIjtcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGFsbENhcmRzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGNhcmQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsyMV0pO1xuICAgICAgICAgICAgY2FyZC5fbmFtZSA9IGhlYWQgKyAoaSsxKTtcbiAgICAgICAgICAgIGNhcmROb2RlID0gY2FyZC5nZXRDb21wb25lbnQoJ1NlbENhcmQnKTtcbiAgICAgICAgICAgIGlmKGFsbENhcmRzW2ldKSB7XG4gICAgICAgICAgICAgICAgY29zdCA9IDE7XG4gICAgICAgICAgICAgICAgY2FyZE5vZGUuc2V0Um9sZShhbGxDYXJkc1tpXS5zZWxlUm9sZSwgYWxsQ2FyZHNbaV0ubWFnaWNDb3N0LCBhbGxDYXJkc1tpXS5yb2xlTGV2ZWwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3RoaXMubXlDYXJkTm9kZXMucHVzaChjYXJkTm9kZSk7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgY29scyA9IGklNjtcbiAgICAgICAgICAgIG14ID0gc3grKGNvbHMqMTA1KTtcbiAgICAgICAgICAgIG15ID0gc3k7XG4gICAgICAgICAgICBtb3ZlVG8gPSBjYy52MihteCwgbXkpO1xuICAgICAgICAgICAgY2FyZC5zZXRQb3NpdGlvbihtb3ZlVG8pO1xuICAgICAgICAgICAgY2FudmFzTm9kZS5hZGRDaGlsZChjYXJkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcih2YXIgaT1hbGxDYXJkcy5sZW5ndGg7aTw2O2krKykge1xuICAgICAgICAgICAgY29scyA9IGklNjtcbiAgICAgICAgICAgIG14ID0gc3grKGNvbHMqMTA1KTtcbiAgICAgICAgICAgIG15ID0gc3k7XG4gICAgICAgICAgICBjYXJkID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMjJdKTtcbiAgICAgICAgICAgIG1vdmVUbyA9IGNjLnYyKG14LCBteSk7XG4gICAgICAgICAgICBjYXJkLnNldFBvc2l0aW9uKG1vdmVUbyk7XG4gICAgICAgICAgICBjYW52YXNOb2RlLmFkZENoaWxkKGNhcmQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGRpc3BDaGFyU2VsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjaGFyU2VsZSA9IHRoaXMubm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJjaGFyU2VsZVwiKTtcbiAgICAgICAgY2hhclNlbGUuekluZGV4ID0gOTk5OTtcbiAgICAgICAgY2hhclNlbGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGNvbnNvbGUubG9nKGNoYXJTZWxlKTtcbiAgICB9LFxuXG4gICAgZ2FtZU92ZXJQcm9jZXNzb3I6ZnVuY3Rpb24obWFpblBsYXllciwgZGF0YSkge1xuICAgICAgICBpZihtYWluUGxheWVyID09IDEpIHtcbiAgICAgICAgICAgIGlmKGRhdGEud2luID09IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm15IHdpbjExXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMua2lsbEJhc2VzKFwidXBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGRhdGEud2luID09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm15IGxvc2UxMVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmtpbGxCYXNlcyhcImRvd25cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihtYWluUGxheWVyID09IDIpIHtcbiAgICAgICAgICAgIGlmKGRhdGEud2luID09IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm15IGxvc2UxMVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmtpbGxCYXNlcyhcImRvd25cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGRhdGEud2luID09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm15IHdpbjExXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMua2lsbEJhc2VzKFwidXBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY2xpY2tQcm9jZXNzb3I6ZnVuY3Rpb24gKGNsaWNrUHQpIHtcbiAgICAgICAgdmFyIF9wYXJlbnQgPSB0aGlzO1xuICAgICAgXG4gICAgICAgIHZhciBjYW52YXNQdCA9IHRoaXMuY2FudmFzTm9kZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICB2YXIgbGF5b3V0UHQgPSB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgdmFyIGlubmVySWQ7XG5cbiAgICAgICAgLy9ub3RlIHRoYXQgcHQgaXMgdGhlIHBvc3Rpb24gaW4gY2FudmFzIG5vZGUuXG4gICAgICAgIHZhciBwdCA9IGNsaWNrUHQ7XG4gICAgICAgIHZhciBwdDEgPSB7fTtcblxuICAgICAgICB2YXIgbWFnaWNDb3N0ID0gX3BhcmVudC5jbGlja1NlbGUubWFnaWNDb3N0O1xuICAgICAgICB2YXIgbGV2ZWwgPSBfcGFyZW50LmNsaWNrU2VsZS5sZXZlbDtcbiAgICAgICAgdmFyIHJvbGUgPSBfcGFyZW50LmNsaWNrU2VsZS5yb2xlO1xuXG4gICAgICAgIGlmKHJvbGUgPT09IHVuZGVmaW5lZCB8fCByb2xlID09IFwiXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSAgXG5cbiAgICAgICAgdmFyIHNlbENhcmQgPSBfcGFyZW50LmNsaWNrU2VsZS5wYXJhbXMudGFyZ2V0O1xuICAgICAgICB2YXIgc2VsTm9kZSA9IF9wYXJlbnQuY2xpY2tTZWxlLm5vZGU7XG5cbiAgICAgICAgdmFyIHBsID0gc2VsTm9kZS5wYXJlbnQuZ2V0UG9zaXRpb24oKTsgIC8vc2VsIGNhcmQgbm9kZS5cbiAgICAgICAgdmFyIHlPZmZzZXQ7XG5cbiAgICAgICAgaWYoX3BhcmVudC5tYWluUGxheWVyPT0xKSB7XG4gICAgICAgICAgICB5T2Zmc2V0PS0yMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHlPZmZzZXQ9NDA7XG4gICAgICAgIH1cblxuICAgICAgICAvL3BvaW50ZXIgcG9zaXRpb25cbiAgICAgICAgcHQxLnggPSAobGF5b3V0UHQueCArIHB0LnggLSBwbC54KS0xMDtcbiAgICAgICAgcHQxLnkgPSAobGF5b3V0UHQueSArIHB0LnkgLSBwbC55KS0oY2FudmFzUHQueSArIGxheW91dFB0LnkpO1xuXG4gICAgICAgIC8vcG9zaXRpb24gaW4gbGF5b3V0XG4gICAgICAgIHB0LnggPSBwdC54L19wYXJlbnQubm9kZS5zY2FsZVggLSAoY2FudmFzUHQueCArIGxheW91dFB0LngpO1xuICAgICAgICBwdC55ID0gcHQueS9fcGFyZW50Lm5vZGUuc2NhbGVZIC0gKGNhbnZhc1B0LnkgKyBsYXlvdXRQdC55KSArIHlPZmZzZXQ7XG5cbiAgICAgICAgaWYoIXRoaXMuaWZOb3RNYXNrUm9sZShyb2xlKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93TWFzayh0aGlzLm1hc2tUeXBlLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCF0aGlzLmlzVmFsaWRQdXRQb2ludChwdCkgJiYgIXRoaXMuaWZOb3RNYXNrUm9sZShyb2xlKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbnZhbGlkIHBvc3Rpb24uXCIpO1xuICAgICAgICAgICAgdGhpcy5wdXRFcnJvck1zZygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5uZXJJZCA9IF9wYXJlbnQucHV0Q2xpY2tJdGVtKHNlbENhcmQsIHNlbE5vZGUsIHB0MSk7XG4gICAgICAgIF9wYXJlbnQuc2VuZFNvZGllcihtYWdpY0Nvc3QsIHJvbGUsIHB0LCBpbm5lcklkLCBsZXZlbCk7XG4gICAgfSxcblxuICAgIGlzVmFsaWRQdXRQb2ludDogZnVuY3Rpb24ocG9pbnQpIHtcbiAgICAgICAgdmFyIHB0ID0ge307XG4gICAgICAgIHB0LnggPSBwb2ludC54O1xuICAgICAgICBwdC55ID0gcG9pbnQueTtcbiAgICAgICAgaWYodGhpcy5tYWluUGxheWVyID09IDIpIHtcbiAgICAgICAgICAgIHB0LnkgPSBwb2ludC55LTQwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5tYXNrVHlwZSA9PSBcInNlbGVNYXNrMVwiKSB7XG4gICAgICAgICAgICBpZihwdC54ID49IDMwICYmIHB0LnggPD0gNTcwICYmIHB0LnkgPiAwICYmIHB0LnkgPCA2NTApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodGhpcy5tYXNrVHlwZSA9PSBcInNlbGVNYXNrMTJcIikge1xuICAgICAgICAgICAgaWYoKHB0LnggPj0gMzAgJiYgcHQueCA8PSA1NzAgJiYgcHQueSA+IDAgJiYgcHQueSA8IDQyMCkgfHwgKHB0LnggPj0gMjg1ICYmIHB0LnggPD0gNTcwICYmIHB0LnkgPiA0MjAgJiYgcHQueSA8IDY1MCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodGhpcy5tYXNrVHlwZSA9PSBcInNlbGVNYXNrMTNcIikge1xuICAgICAgICAgICAgaWYoKHB0LnggPj0gMzAgJiYgcHQueCA8PSA1NzAgJiYgcHQueSA+IDAgJiYgcHQueSA8IDQyMCkgfHwgKHB0LnggPj0gMzAgJiYgcHQueCA8PSAyODUgJiYgcHQueSA+IDQyMCAmJiBwdC55IDwgNjUwKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0aGlzLm1hc2tUeXBlID09IFwic2VsZU1hc2szXCIpIHtcbiAgICAgICAgICAgIGlmKHB0LnggPj0gMzAgJiYgcHQueCA8PSA1NzAgJiYgcHQueSA+IDAgJiYgcHQueSA8IDQyMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBpZk5vdE1hc2tSb2xlOiBmdW5jdGlvbiAocm9sZSkge1xuICAgICAgICBpZihyb2xlID09IFwiYm9tYlwiIHx8IHJvbGUgPT0gXCJ0aHVuZGVyXCIgIHx8IHJvbGUgPT0gXCJoZWFsXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgaW5pdEV2ZW50TGlzdGVuZXI6ZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm5vZGUub24oXCJldmVudF9lZmZlY3RcIiwgdGhpcy5vbkV2ZW50RWZmZWN0LmJpbmQodGhpcykpO1xuICAgIH0sXG5cbiAgICBvbkV2ZW50RWZmZWN0OmZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImxpc3RlbmluZyBlZmZlY3QgbG9hZGVkLi4uLlwiKTtcbiAgICB9LFxuXG4gICAgc2V0Q291bnREb3duOmZ1bmN0aW9uKGNvdW50ZXIpIHtcbiAgICAgICAgdmFyIG1pbiA9IHBhcnNlSW50KGNvdW50ZXIvNjApO1xuICAgICAgICB2YXIgc2VjID0gY291bnRlciU2MDtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhtaW4gK1wiOlwiKyBzZWMpO1xuICAgICAgICB2YXIgdGltZU5vZGUgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiYW5uZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ0aW1lXCIpO1xuICAgICAgICB2YXIgY2ROb2RlID0gdGltZU5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjb3VudERvd25cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIik7XG4gICAgICAgIGlmKHNlYzwxMCkge1xuICAgICAgICAgICAgc2VjID0gXCIwXCIgKyBzZWM7XG4gICAgICAgIH1cbiAgICAgICAgY2ROb2RlLnN0cmluZyA9IChtaW4gK1wiOlwiKyBzZWMpO1xuICAgIH0sXG5cbiAgICBkb3VibGVNYWdpY0Rpc3A6ZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkaXNwbm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImRvdWJsZU1hZ2ljXCIpO1xuICAgICAgICBkaXNwbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBzZXRUaW1lQ291bnRlcjpmdW5jdGlvbihjbnQpIHtcbiAgICAgICAgLy91c2UgdG8gY29tcGFyZSBpZiB0aW1lb3V0LCBvbmx5IGZvciBwayBtb2RlLlxuICAgICAgICB0aGlzLmdhbWVOb3dUaW1lID0gY250O1xuICAgICAgICB0aGlzLnNldENvdW50RG93bihjbnQpO1xuICAgICAgICBpZihjbnQgPT0gNjApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWFnaWMgY2hhcmdlIHNwZWVkIHVwXCIpO1xuICAgICAgICAgICAgdGhpcy5kb3VibGVNYWdpY0Rpc3AoKTtcbiAgICAgICAgICAgIHRoaXMuYWRkSnVpY2UgPSAyMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0TWFnaWNCYXIoKTtcblxuICAgICAgICAvL2NvdW50ZXIxLnNldFNwcml0ZUZyYW1lKGNjLnNwcml0ZUZyYW1lQ2FjaGUuZ2V0U3ByaXRlRnJhbWUoXCJudW1fOC5wbmdcIikpO1xuICAgICAgICAvLzMgc2Vjb25kIGlzIHRoZSBhaSBwYWdlIGxvYWRpbmcgdGltZS5cbiAgICAgICAgdmFyIGNvdW50X2Rvd24gPSB0aGlzLmdhbWVDeWNsZVRpbWUtY250O1xuXG4gICAgICAgIGlmKGNvdW50X2Rvd248MCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lT3Zlcj10cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRlbnMgPSBwYXJzZUludChjb3VudF9kb3duLzEwKTtcbiAgICAgICAgdmFyIG9uZXMgPSBjb3VudF9kb3duJTEwO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2codGVucyArXCI6OjpcIisgb25lcyk7XG4gICAgfSxcblxuICAgIHN0YXJ0VHJhY2VUaW1lcjpmdW5jdGlvbigpIHtcbiAgICAgICAgLy9yZWZlciB0byBzZXJ2ZXIgaW50ZXJ2YWwgc2V0dGluZywgbXVzdCBhIGxpdHRsZSBzaG9ydGVyIHRoYW4gdGhhdCBpbiBzZXJ2ZXJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IDMwO1xuICAgICAgICB2YXIgdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHZhciBfcGFyZW50ID0gdGhpcztcblxuICAgICAgICAvLyAzMCBtaW5pIHNlY29uZHMgYSBnYW1lIGN5Y2xlLlxuICAgICAgICB2YXIgZ2FtZV9jeWNsZSA9IHRoaXMuZ2FtZUN5Y2xlVGltZSoxMDAwOyBcbiAgICAgICAgdmFyIGdhbWVfY3ljbGVfdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHZhciBjeWNsZV9jbnQgPSAwO1xuXG4gICAgICAgIGlmKCF0aGlzLnRyYWNlVGltZXIpIHtcbiAgICAgICAgICAgIHRoaXMudHJhY2VUaW1lciA9IGZ1bmN0aW9uKCkgeyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICB2YXIgZGVsdGEgPSBub3cgLSB0aGVuO1xuXG4gICAgICAgICAgICAgICAgLy93aGVuIG5ldCB0cmFmZmljIGhhcHBlbmVkLCBpZGxlIGZvciA1J3Mgd2lsbCBoYWx0XG4gICAgICAgICAgICAgICAgLy9ub3QgdGVzdGVkIHlldC5cbiAgICAgICAgICAgICAgICB2YXIgZ2FtZV9jeWNsZV9kZWx0YSA9IG5vdyAtIF9wYXJlbnQuZ2FtZVN0YXJ0VGltZTtcbiAgICAgICAgICAgICAgICAvLyBpZiB3aXRoaW4gZ2FtZSBjeWNsZSB0aW1lXG4gICAgICAgICAgICAgICAgaWYoIV9wYXJlbnQuZ2FtZU92ZXIgJiYgZ2FtZV9jeWNsZV9kZWx0YSA+IGN5Y2xlX2NudCoxMDAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGN5Y2xlX2NudCsrO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIG5vIHJlc3BvbnNlIGZvciA1cywgdGhlbiB0aW1lb3V0XG4gICAgICAgICAgICAgICAgICAgIGlmKE1hdGguYWJzKGN5Y2xlX2NudC1fcGFyZW50LmdhbWVOb3dUaW1lKSA+IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3luY1RpbWVvdXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGRlbHRhPl9wYXJlbnQuaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhlbiA9IG5vdyAtIChkZWx0YSVfcGFyZW50LmludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgX3BhcmVudC5tYWluR2FtZUN5Y2xlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnRyYWNlVGltZXIsMCk7XG4gICAgfSxcblxuICAgIG1haW5HYW1lQ3ljbGU6ZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfcGFyZW50ID0gdGhpcztcbiAgICAgICAgdmFyIGRhdGEsYWdlbnRzLGJ1bGxldHMsYmFzZXMsZm9ydHMscm9sbExvZ3MsYWdlbnRzRnV0dXJlLGZvcnRzRnV0dXJlO1xuXG4gICAgICAgIGlmKHRoaXMuZ2FtZVRyYWNlU3RhY2subGVuZ3RoID4gdGhpcy5idWZmZXJMZW4pIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZVRyYWNlU3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmdhbWVUcmFjZVN0YWNrWzBdO1xuICAgICAgICAgICAgLy9kYXRhID0gdGhpcy5nYW1lVHJhY2VTdGFja1t0aGlzLmdhbWVUcmFjZVN0YWNrLmxlbmd0aCAtIDEwXTtcbiAgICAgICAgICAgIGFnZW50cyA9IGRhdGEuYWdlbnRzO1xuICAgICAgICAgICAgYWdlbnRzRnV0dXJlID0gdGhpcy5nYW1lVHJhY2VTdGFja1syOV0uYWdlbnRzO1xuICAgICAgICAgICAgZm9ydHNGdXR1cmUgPSB0aGlzLmdhbWVUcmFjZVN0YWNrWzI5XS5mb3J0cztcbiAgICAgICAgICAgIGJ1bGxldHMgPSBkYXRhLmJ1bGxldHM7XG4gICAgICAgICAgICBiYXNlcyA9IGRhdGEuYmFzZXM7XG4gICAgICAgICAgICBmb3J0cyA9IGRhdGEuZm9ydHM7XG4gICAgICAgICAgICByb2xsTG9ncyA9IGRhdGEucm9sbExvZ3M7XG5cbiAgICAgICAgICAgIF9wYXJlbnQucGxheUJ1bGxldHMoYnVsbGV0cyk7XG4gICAgICAgICAgICBfcGFyZW50LnBsYXlMb2dzKHJvbGxMb2dzKTtcblxuICAgICAgICAgICAgX3BhcmVudC5wbGF5QWdlbnRzKGFnZW50cywgYWdlbnRzRnV0dXJlKTtcbiAgICAgICAgICAgIF9wYXJlbnQucGxheUJhc2VzKGJhc2VzKTtcbiAgICAgICAgICAgIF9wYXJlbnQucGxheUZvcnRzKGZvcnRzKTtcblxuICAgICAgICAgICAgX3BhcmVudC5idWxsZXRQcm9jZXNzKGJ1bGxldHMpO1xuICAgICAgICAgICAgX3BhcmVudC5sb2dQcm9jZXNzKHJvbGxMb2dzKTtcbiAgICAgICAgICAgIF9wYXJlbnQuYWdlbnRQcm9jZXNzKGFnZW50cyk7XG4gICAgICAgICAgICBfcGFyZW50LmZvcnRQcm9jZXNzKGZvcnRzLCBmb3J0c0Z1dHVyZSk7XG4gICAgICAgICAgICBfcGFyZW50LmJhc2VQcm9jZXNzKGJhc2VzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vdmFyIGV2ZW50ID0gbmV3IGNjLkV2ZW50LkV2ZW50Q3VzdG9tKFwiZXZlbnRfZWZmZWN0XCIsIHRydWUpO1xuICAgICAgICAvL2V2ZW50LmRldGFpbCA9IFwiMTIzXCI7XG4gICAgICAgIC8vdGhpcy5ub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH0sXG5cbiAgICBzeW5jVGltZW91dDpmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5nYW1lT3Zlcj10cnVlO1xuICAgICAgICB0aGlzLnN0b3BUcmFjZVRpbWVyKCk7XG4gICAgICAgIE1ZX1NPQ0tFVC5kaXNjb25uZWN0KCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCLnvZHnu5zmlq3lvIBcIik7XG4gICAgICAgIC8vdGhpcy5nb1ByZXZpb3VzKCk7ICAgICAgICAgICAgICAgICBcbiAgICB9LFxuXG4gICAgc3RvcFRyYWNlVGltZXI6ZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKHRoaXMudHJhY2VUaW1lcikge1xuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMudHJhY2VUaW1lcik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcGxheVNuZDpmdW5jdGlvbihzbmRUeXBlKSB7XG4gICAgICAgIGlmKHNuZFR5cGUgPT0gXCJiYXNlXCIpIHtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hdWRpb3NbMF0sIGZhbHNlLCAxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHNuZFR5cGUgPT0gXCJmaXJlU2VuZFwiKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9zWzFdLCBmYWxzZSwgMSk7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYoc25kVHlwZSA9PSBcImJvbWJcIikge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvc1syXSwgZmFsc2UsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoc25kVHlwZSA9PSBcInNrZVwiKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9zWzNdLCBmYWxzZSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihzbmRUeXBlID09IFwiaHJcIikge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvc1s0XSwgZmFsc2UsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoc25kVHlwZSA9PSBcImxyXCIpIHtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hdWRpb3NbNV0sIGZhbHNlLCAxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHNuZFR5cGUgPT0gXCJnaVwiKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9zWzZdLCBmYWxzZSwgMSk7XG4gICAgICAgIH0gIFxuICAgICAgICBlbHNlIGlmKHNuZFR5cGUgPT0gXCJwdXQxXCIpIHtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hdWRpb3NbN10sIGZhbHNlLCAxKTtcbiAgICAgICAgfSAgXG4gICAgICAgIGVsc2UgaWYoc25kVHlwZSA9PSBcIndpemZpcmVcIikge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvc1syXSwgZmFsc2UsIDEpO1xuICAgICAgICB9ICBcbiAgICAgICAgZWxzZSBpZihzbmRUeXBlID09IFwibG1cIikge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvc1s4XSwgZmFsc2UsIDEpO1xuICAgICAgICB9ICBcbiAgICAgICAgZWxzZSBpZihzbmRUeXBlID09IFwiZ3VuXCIpIHtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hdWRpb3NbOV0sIGZhbHNlLCAxKTtcbiAgICAgICAgfSAgXG4gICAgICAgIGVsc2UgaWYoc25kVHlwZSA9PSBcInRodW5kZXJcIikge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvc1sxMF0sIGZhbHNlLCAxKTtcbiAgICAgICAgfSAgXG4gICAgICAgIGVsc2UgaWYoc25kVHlwZSA9PSBcImhlYWxcIikge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvc1sxMV0sIGZhbHNlLCAxKTtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBpZihzbmRUeXBlID09IFwibG9nXCIpIHtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hdWRpb3NbMTJdLCBmYWxzZSwgMSk7XG4gICAgICAgIH0gXG4gICAgfSxcblxuICAgIHBsYXlFZmZlY3Q6IGZ1bmN0aW9uKHJvbGUsIHgsIHkpIHtcbiAgICAgICAgdmFyIGJkO1xuICAgICAgICAvL3BsYXkgZWZmZWN0LlxuICAgICAgICAvL3Nob3VsZCBkZXN0cm95IHdoZW4gZmluaXNoLlxuICAgICAgICBpZihyb2xlID09IFwiaHJcIikge1xuICAgICAgICAgICAgYmQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsxM10pO1xuICAgICAgICAgICAgYmQueCA9IHg7XG4gICAgICAgICAgICBiZC55ID0geSsyMDtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChiZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYocm9sZSA9PSBcImxtXCIpIHtcbiAgICAgICAgICAgIHRoaXMucGxheVNuZChcImxtXCIpO1xuICAgICAgICAgICAgYmQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsxNV0pO1xuICAgICAgICAgICAgYmQueCA9IHg7XG4gICAgICAgICAgICBiZC55ID0geS00MDtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChiZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyb2xlID09IFwiYmFzZVwiKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlTbmQoXCJiYXNlXCIpO1xuICAgICAgICAgICAgYmQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsxMF0pO1xuICAgICAgICAgICAgYmQueCA9IHg7XG4gICAgICAgICAgICBiZC55ID0geTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChiZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9mb3J0QVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJmYVwiKSB7XG4gICAgICAgICAgICBiZCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzEwXSk7XG4gICAgICAgICAgICBiZC54ID0geDtcbiAgICAgICAgICAgIGJkLnkgPSB5O1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGJkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJsb2dcIikge1xuICAgICAgICAgICAgYmQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsxMF0pO1xuICAgICAgICAgICAgYmQuc2NhbGVYID0gMC44O1xuICAgICAgICAgICAgYmQuc2NhbGVZID0gMC44O1xuICAgICAgICAgICAgYmQueCA9IHgrMTA7XG4gICAgICAgICAgICBiZC55ID0geTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChiZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyb2xlID09IFwiYm9tYlwiKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlTbmQoXCJib21iXCIpO1xuICAgICAgICAgICAgLy9zaGFrZSB0aGUgc2NyZWVuXG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2NlbmVKaXR0ZXIoKTtcbiAgICAgICAgICAgIGJkID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbNl0pO1xuICAgICAgICAgICAgYmQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJkLnggPSB4O1xuICAgICAgICAgICAgYmQueSA9IHk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoYmQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYocm9sZSA9PSBcIndpemZpcmVcIikge1xuICAgICAgICAgICAgdGhpcy5wbGF5U25kKFwid2l6ZmlyZVwiKTtcbiAgICAgICAgICAgIGJkID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMTldKTtcbiAgICAgICAgICAgIGJkLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBiZC54ID0geDtcbiAgICAgICAgICAgIGJkLnkgPSB5O1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGJkKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbn0pO1xuIl19