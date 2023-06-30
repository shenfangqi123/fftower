
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/GameProvider.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fbdd5ReyFxHioXVNcTwoYt5', 'GameProvider');
// scripts/GameProvider.js

"use strict";

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

Array.prototype.removeByValue = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) {
      this.splice(i, 1);
      break;
    }
  }
};

Array.prototype.minus = function (arr) {
  var result = new Array();
  var obj = {};

  for (var i = 0; i < arr.length; i++) {
    obj[arr[i]] = 1;
  }

  for (var j = 0; j < this.length; j++) {
    if (!obj[this[j]]) {
      obj[this[j]] = 1;
      result.push(this[j]);
    }
  }

  return result;
};

var socketProvider = require("SocketProvider");

cc.Class({
  "extends": socketProvider,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  // start () {},
  hideDragItem: function hideDragItem(innerId) {
    if (this.putSele[innerId]) {
      this.putSele[innerId].destroy();
      this.putSele[innerId] = null;
    }
  },
  createBuff: function createBuff(buff) {
    var myBuff, px, py;
    var canvasNode = this.node.parent;

    if (buff.typeId == 1) {
      this.playSnd("thunder");
      myBuff = cc.instantiate(this.playerPrefab[23]); //canvasNode.getChildByName("buffThunder").active = false;
    } else if (buff.typeId == 2) {
      this.playSnd("heal");
      myBuff = cc.instantiate(this.playerPrefab[24]); //canvasNode.getChildByName("buffHeal").active = false;
    } //hide select frame


    this.dispCharSele(); //remove buff icon

    if (this.putSele[buff.innerId]) {
      this.putSele[buff.innerId].parent.destroy();
    } //hide drag item disp
    //this.hideDragItem(buff.innerId);


    this.clickSele = {};
    px = buff.mypos.x * 30;
    py = buff.mypos.y * 30;
    var moveTo = cc.v2(px, py);
    myBuff.setPosition(moveTo);
    this.node.addChild(myBuff);
  },
  createAgents: function createAgents(agents) {
    var aid, myAgent, agent, agentNode;
    var px, py, eo; //var nodelist = cc.find("Canvas/layout");
    //console.log(nodelist);

    for (var i = 0; i < agents.length; i++) {
      agent = agents[i];
      aid = agent.aid;
      myAgent = this.npcInfo.objectForKey(aid);
      px = agent.mypos.x * 30;
      py = agent.mypos.y * 30;

      if (myAgent == null) {
        this.hideDragItem(agent.innerId);

        if (agent.role == "ske") {
          myAgent = cc.instantiate(this.playerPrefab[0]);
        } else if (agent.role == "ir") {
          myAgent = cc.instantiate(this.playerPrefab[20]);
        } else if (agent.role == "bee") {
          myAgent = cc.instantiate(this.playerPrefab[16]);
        } else if (agent.role == "wiz") {
          myAgent = cc.instantiate(this.playerPrefab[17]);
        } else if (agent.role == "hr") {
          myAgent = cc.instantiate(this.playerPrefab[12]);
        } else if (agent.role == "lm") {
          myAgent = cc.instantiate(this.playerPrefab[14]);
        } else if (agent.role == "lr") {
          myAgent = cc.instantiate(this.playerPrefab[3]);
        } else if (agent.role == "gi") {
          myAgent = cc.instantiate(this.playerPrefab[4]);
        } else {
          continue;
        }

        myAgent.name = aid;
        myAgent.type = "agent";
        myAgent.active = true;
        myAgent.role = agent.role;
        myAgent.size = agent.size;
        myAgent.level = agent.level;
        agentNode = this.getComponentByRole(myAgent);
        agentNode.init();
        agentNode.setId(aid); //shadow should set in layout, because its zindex should be lower than any agents.

        agentNode.setShadow(this.shadowForAgent());
        agentNode.setTotalLife(agent.life);
        agentNode.setBlood(this.bloodForAgent(myAgent)); //if init pos is in south, face to north, otherwise....

        if (this.mainPlayer == 1) {
          agent.rot = 180;
        } else if (this.mainPlayer == 2) {
          agent.rot = 0;
        }

        px = agent.mypos.x * 30;
        py = agent.mypos.y * 30;
        agentNode.updatePos(px, py);
        this.node.addChild(myAgent);
        this.npcInfo.setObject(myAgent, aid);
      }
    }
  },
  createBullets: function createBullets(bullets) {
    var aid, myBullet, bullet, agentNode;
    var px, py, eo, eDis;

    for (var i = 0; i < bullets.length; i++) {
      bullet = bullets[i];
      aid = bullet.aid;
      myBullet = this.npcInfo.objectForKey(aid);

      if (myBullet == null) {
        if (bullet.role == "bullet") {
          myBullet = cc.instantiate(this.playerPrefab[1]);
          myBullet.startPos = bullet.mypos;
          myBullet.active = false;
        } else if (bullet.role == "bomb") {
          console.log("bomb created");
          this.playSnd("fireSend");
          this.hideDragItem(bullet.innerId);
          myBullet = cc.instantiate(this.playerPrefab[5]);
          eDis = this.enemeyDistance(bullet.mypos.x, bullet.mypos.y, bullet.targetpos.x, bullet.targetpos.y);
          myBullet.startPos = bullet.mypos;
          myBullet.targetDis = eDis;
        } else if (bullet.role == "tama") {
          this.playSnd("gun");
          myBullet = cc.instantiate(this.playerPrefab[9]);
          myBullet.startPos = bullet.mypos;
          myBullet.active = false;
        } else if (bullet.role == "wizfire") {
          myBullet = cc.instantiate(this.playerPrefab[18]);
          myBullet.startPos = bullet.mypos;
          myBullet.active = false;
        } else {
          console.log("error, no bullet type.");
        }

        myBullet.name = aid;
        myBullet.type = "bullet"; //myBullet.active = true;

        myBullet.role = bullet.role;
        myBullet.updown = bullet.updown;
        myBullet.zIndex = 9999;
        agentNode = this.getComponentByRole(myBullet); // 将新增的节点添加到 Canvas 节点下面

        this.node.addChild(myBullet);
        px = -1000;
        py = -1000;
        var moveTo = cc.v2(px, py);
        var bulletRot = bullet.rot;

        if (this.mainPlayer == 1) {
          bulletRot += 180;
        } //since 2.1.1 setRotation is desperated.


        myBullet.angle = -1 * bulletRot; //myBullet.setRotation(bulletRot);  //bullet.rot+180

        myBullet.setPosition(moveTo);
        this.npcInfo.setObject(myBullet, aid);
      }
    }
  },
  createBases: function createBases(bases) {
    var aid, myAgent, agent, baseName, baseNode;

    for (var i = 0; i < bases.length; i++) {
      agent = bases[i];
      aid = agent.aid;
      myAgent = this.npcInfo.objectForKey(aid);

      if (myAgent == null) {
        myAgent = {};
        myAgent.name = aid;
        myAgent.type = "base";
        myAgent.active = true;
        myAgent.role = agent.role;
        myAgent.mypos = agent.mypos;
        myAgent.size = agent.size;
        baseName = "base" + agent.objectId;
        myAgent.baseObj = this.node.getChildByName(baseName);
        baseNode = myAgent.baseObj.getComponent("BaseSprite");
        baseNode.setTotalLife(agent.life);
        baseNode.setBlood(this.bloodForAgent(myAgent.baseObj));
        baseNode.setLife(agent.life);
        this.npcInfo.setObject(myAgent, aid);
      }
    }
  },
  createLogs: function createLogs(logs) {
    var aid, myAgent, agent, agentNode;
    var px, py; //this.playSnd("log");

    for (var i = 0; i < logs.length; i++) {
      agent = logs[i];
      aid = agent.aid;
      myAgent = this.npcInfo.objectForKey(aid);
      px = agent.mypos.x * 30;
      py = agent.mypos.y * 30;

      if (myAgent == null) {
        this.hideDragItem(agent.innerId);
        myAgent = cc.instantiate(this.playerPrefab[8]);
        myAgent.name = aid;
        myAgent.type = "log";
        myAgent.active = true;
        myAgent.role = agent.role;
        agentNode = this.getComponentByRole(myAgent);
        agentNode.setId(aid);
        agentNode.setShadow(this.shadowForLog());
        var moveTo = cc.v2(px, py);
        agentNode.move(moveTo); // 将新增的节点添加到 Canvas 节点下面

        this.node.addChild(myAgent);
        this.playSnd("log");
        this.npcInfo.setObject(myAgent, aid);
      }
    }
  },
  createForts: function createForts(forts) {
    var aid, myAgent, agent, agentNode;
    var px, py, eo, zorder; //var nodelist = cc.find("Canvas/layout");
    //console.log(nodelist);

    for (var i = 0; i < forts.length; i++) {
      agent = forts[i];
      aid = agent.aid;
      myAgent = this.npcInfo.objectForKey(aid);
      px = agent.mypos.x * 30;
      py = agent.mypos.y * 30;

      if (myAgent == null) {
        this.hideDragItem(agent.innerId);
        myAgent = cc.instantiate(this.playerPrefab[7]);
        myAgent.name = aid;
        myAgent.type = "fa";
        myAgent.spName = "FortASprite";
        myAgent.active = true;
        myAgent.role = agent.role;
        myAgent.size = agent.size; //1000:agent, 999:bullet 998:this;
        //fort base anchorY is middle, so y-2 is nessesary.

        if (this.mainPlayer == 1) {
          zorder = 1001 + parseInt(32 - agent.mypos.y - 1);
        } else if (this.mainPlayer == 2) {
          zorder = 1001 + parseInt(32 - agent.mypos.y - 1);
        }

        myAgent.zIndex = zorder;
        agentNode = this.getComponentByRole(myAgent);
        agentNode.setZIndex(zorder);
        /*                
                        //agentNode.init();
                        //agentNode.setId(aid);
                        //agentNode.setShadow(this.shadowForAgent());
        */

        agentNode.setTotalLife(agent.life);
        agentNode.setBlood(this.bloodForAgent(myAgent)); //if init pos is in south, face to north, otherwise....

        if (this.mainPlayer == 1) {
          agent.rot = 180;
        } else if (this.mainPlayer == 2) {
          agent.rot = 0;
        }

        var moveTo = cc.v2(px, py);
        myAgent.setPosition(moveTo); //agentNode.playAngleAnimation(agent, null, this.mainPlayer);
        // 将新增的节点添加到 Canvas 节点下面

        this.node.addChild(myAgent);
        this.npcInfo.setObject(myAgent, aid);
      }
    }
  },
  agentProcess: function agentProcess(agents) {
    var remoteAgents = [];
    var localAgents = [];
    var killAgents = [];
    var agentObj, agentNode;
    var agentId;

    for (var i = 0; i < agents.length; i++) {
      remoteAgents.push(agents[i].aid);
    }

    localAgents = this.npcInfo.allKeys();
    killAgents = localAgents.minus(remoteAgents);

    for (var _iterator = _createForOfIteratorHelperLoose(killAgents), _step; !(_step = _iterator()).done;) {
      agentId = _step.value;
      agentObj = this.npcInfo.objectForKey(agentId);

      if (agentObj.type == "agent") {
        agentNode = this.getComponentByRole(agentObj);
        agentNode.remove();
        this.removedNpcInfo.setObject(agentObj, agentId);
        this.npcInfo.removeObjectForKey(agentId);
      }
    }
  },
  baseProcess: function baseProcess(bases) {
    var remoteBases = [];
    var killBases = [];
    var enemyBases = [];
    var baseObj;
    var warriorName;
    var warriorObj;
    var baseName;

    for (var i = 0; i < bases.length; i++) {
      baseName = "base" + bases[i].objectId;
      remoteBases.push(baseName);
      enemyBases.push(baseName);
    } // todo list: should manage to remove the base record in npcInfo.


    killBases = this._defaultBases.minus(remoteBases);

    for (var _iterator2 = _createForOfIteratorHelperLoose(killBases), _step2; !(_step2 = _iterator2()).done;) {
      baseName = _step2.value;
      this.dispLayoutMask(enemyBases, baseName);

      this._defaultBases.removeByValue(baseName);

      baseObj = this.node.getChildByName(baseName); //this.plusBaseKillNum(baseName);

      this.node.removeChild(baseObj);
      this.playEffect("base", baseObj.x, baseObj.y);
    }
  },
  plusBaseKillNum: function plusBaseKillNum(baseName) {
    //todo: layout node must be set in init 
    var enemynum = this.node.getChildByName("upFlag").getChildByName("ringMark").getChildByName("killnum").getComponent("cc.Label");
    var mynum = this.node.getChildByName("downFlag").getChildByName("ringMark").getChildByName("killnum").getComponent("cc.Label");

    if (baseName.inArray(["base1", "base2", "base3"])) {
      enemynum.string = parseInt(enemynum.string) + 1;
    } else {
      mynum.string = parseInt(enemynum.string) + 1;
    }
  },
  //called when game is over
  killBases: function killBases(dir) {
    //todo: layout node must be set in init 
    //var enemynum = this.node.getChildByName("upFlag").getChildByName("ringMark").getChildByName("killnum").getComponent("cc.Label");
    //var mynum = this.node.getChildByName("downFlag").getChildByName("ringMark").getChildByName("killnum").getComponent("cc.Label");
    var killBases;
    var baseObj, bd;
    var baseName;

    if (dir == "up") {
      killBases = ["base1", "base2", "base3"]; //enemynum.string = 3;
    } else {
      killBases = ["base4", "base5", "base6"]; //mynum.string = 3;
    }

    for (var _iterator3 = _createForOfIteratorHelperLoose(killBases), _step3; !(_step3 = _iterator3()).done;) {
      baseName = _step3.value;
      //this._defaultBases.removeByValue(baseName);
      baseObj = this.node.getChildByName(baseName);

      if (baseObj) {
        this.playEffect("base", baseObj.x, baseObj.y);
        this.node.removeChild(baseObj);
      }
    }
  },
  undisplayMask: function undisplayMask(sel) {
    console.log(sel);
    this.node.getChildByName(sel).active = false;
  },
  dispLayoutMask: function dispLayoutMask(killEnemyBases, baseName) {
    var _self = this;

    if (baseName == "base4" || baseName == "base5" || baseName == "base6") {
      return;
    } //if("base1".inArray(killEnemyBases) && "base2".inArray(killEnemyBases) && "base3".inArray(killEnemyBases)) {
    //    return;
    //}


    if ("base1".inArray(killEnemyBases) && "base2".inArray(killEnemyBases)) {
      this.showMask("seleMask12", 2);
    } else if ("base1".inArray(killEnemyBases) && "base3".inArray(killEnemyBases)) {
      this.showMask("seleMask13", 2);
    } else if ("base1".inArray(killEnemyBases)) {
      this.showMask("seleMask1", 2);
    }
  },
  showDragMask: function showDragMask(role) {
    if (!this.ifNotMaskRole(role)) {
      this.node.getChildByName(this.maskType).active = true;
    }
  },
  unshowDragMask: function unshowDragMask() {
    this.node.getChildByName(this.maskType).active = false;
  },
  showMask: function showMask(maskType, delay) {
    var _self = this;

    this.maskType = maskType;
    this.node.getChildByName(maskType).active = true;
    this.scheduleOnce(function () {
      _self.undisplayMask(maskType);
    }, delay);
  },
  putErrorMsg: function putErrorMsg() {
    var _self = this;

    this.node.getChildByName("putError").active = true;
    this.scheduleOnce(function () {
      _self.undisplayPutErr();
    }, 1);
  },
  undisplayPutErr: function undisplayPutErr() {
    this.node.getChildByName("putError").active = false;
  },
  fortProcess: function fortProcess(forts, fortsFuture) {
    var remoteAgents = [];
    var localAgents = [];
    var killAgents = [];
    var agentObj, agentNode;
    var agentId, bd;

    for (var i = 0; i < forts.length; i++) {
      remoteAgents.push(forts[i].aid);
    }

    localAgents = this.npcInfo.allKeys();
    killAgents = localAgents.minus(remoteAgents);

    for (var _iterator4 = _createForOfIteratorHelperLoose(killAgents), _step4; !(_step4 = _iterator4()).done;) {
      agentId = _step4.value;
      agentObj = this.npcInfo.objectForKey(agentId);

      if (agentObj.type == "fa") {
        this.playEffect("fort", agentObj.x, agentObj.y); //agentNode = this.getComponentByRole(agentObj);
        //agentNode.remove();

        this.node.removeChild(agentObj);
        this.removedNpcInfo.setObject(agentObj, agentId);
        this.npcInfo.removeObjectForKey(agentId);
        this.playEffect("base", agentObj.x, agentObj.y);
      }
    }
  },
  logProcess: function logProcess(logs) {
    var remoteAgents = [];
    var localAgents = [];
    var killAgents = [];
    var agentObj, agentNode;
    var agentId, bd;

    for (var i = 0; i < logs.length; i++) {
      remoteAgents.push(logs[i].aid);
    }

    localAgents = this.npcInfo.allKeys();
    killAgents = localAgents.minus(remoteAgents);

    for (var _iterator5 = _createForOfIteratorHelperLoose(killAgents), _step5; !(_step5 = _iterator5()).done;) {
      agentId = _step5.value;
      agentObj = this.npcInfo.objectForKey(agentId);

      if (agentObj.role == "log") {
        this.playEffect("log", agentObj.x, agentObj.y);
        agentNode = this.getComponentByRole(agentObj);
        agentNode.remove();
        this.removedNpcInfo.setObject(agentObj, agentId);
        this.npcInfo.removeObjectForKey(agentId);
      }
    }
  },
  bulletProcess: function bulletProcess(bullets) {
    var remoteBullets = [];
    var localBullets = [];
    var killBullets = [];
    var agentObj, agentNode;
    var agentId;

    for (var i = 0; i < bullets.length; i++) {
      remoteBullets.push(bullets[i].aid);
    }

    localBullets = this.npcInfo.allKeys();
    killBullets = localBullets.minus(remoteBullets);

    for (var _iterator6 = _createForOfIteratorHelperLoose(killBullets), _step6; !(_step6 = _iterator6()).done;) {
      agentId = _step6.value;
      agentObj = this.npcInfo.objectForKey(agentId);

      if (agentObj.role == "bomb") {
        agentNode = this.getComponentByRole(agentObj);
        agentObj.destroy();
        this.removedNpcInfo.setObject(agentObj, agentId);
        this.npcInfo.removeObjectForKey(agentId);
        this.playEffect("bomb", agentObj.x, agentObj.y);
      }

      if (agentObj.role == "wizfire") {
        agentNode = this.getComponentByRole(agentObj);
        agentObj.destroy();
        this.removedNpcInfo.setObject(agentObj, agentId);
        this.npcInfo.removeObjectForKey(agentId);

        if (agentObj.x && agentObj.y) {
          this.playEffect("wizfire", agentObj.x, agentObj.y);
        }
      } else if (agentObj.role == "bullet" || agentObj.role == "tama") {
        agentNode = this.getComponentByRole(agentObj);
        agentObj.destroy();
        this.removedNpcInfo.setObject(agentObj, agentId);
        this.npcInfo.removeObjectForKey(agentId);
      }
    }
  },
  //shake the screen
  startSceneJitter: function startSceneJitter() {
    var sceneNode = this.node;
    var ox = sceneNode.x;
    var oy = sceneNode.y;
    var cnt = 0;
    var lower = -4;
    var upper = 4;

    var callBack = function callBack() {
      cnt++;
      var randomX = Math.floor(Math.random() * (upper - lower)) + lower;
      var randomY = Math.floor(Math.random() * (upper - lower)) + lower;
      sceneNode.x += randomX;
      sceneNode.y += randomY;

      if (cnt >= 10) {
        sceneNode.stopAllActions();
        sceneNode.x = ox;
        sceneNode.y = oy;
      }
    };

    var node = this.node; //场景常驻节点

    var del = cc.delayTime(1 / 30);
    var cal = cc.callFunc(callBack);
    var seq = cc.sequence(del, cal);
    node.runAction(cc.repeatForever(seq));
  },
  playBases: function playBases(bases) {
    var remoteBases = [];
    var baseObj, myAgent, agent;
    var warriorName;
    var warriorObj;
    var baseName, kingNode, agentNode, kingArrow, warrior;
    var actType, attackDura, now;
    var tmpB = {};
    var eoDead;
    var eo = null;

    for (var i = 0; i < bases.length; i++) {
      agent = bases[i];
      baseName = "base" + agent.objectId;
      attackDura = agent.attackDura;
      myAgent = this.npcInfo.objectForKey(agent.aid).baseObj;
      tmpB[agent.aid] = baseName;
      remoteBases.push(baseName);
      actType = agent.actType;

      if (myAgent) {
        myAgent.getComponent("BaseSprite").setLife(agent.life);
        warrior = myAgent.getChildByName("warrior");

        if (warrior) {
          warrior.role = "lr";
          agentNode = this.getComponentByRole(warrior); //if no enmey then standby

          if (myAgent && agent.actType == "wait") {
            agentNode.playBaseWarriorAnimationDefault("move", agent.objectId);
          } else if (myAgent && agent.actType == "sa") {
            agentNode.playBaseWarriorAnimation(agent, this.mainPlayer, "sa");
          }
        }

        warrior = myAgent.getChildByName("gun");

        if (warrior) {
          warrior.role = "gun";
          agentNode = this.getComponentByRole(warrior); //if no enmey then standby

          if (myAgent && agent.actType == "wait") {//agentNode.playFortWarriorAnimationDefault("move", this.mainPlayer, agent.objectId);
          } else if (myAgent && agent.actType == "sa") {
            agentNode.playBaseWarriorAnimation(agent, this.mainPlayer, "sa");
          }
        }
      }
    }
  },
  playAgents: function playAgents(agents, agentsFuture) {
    var myAgent;
    var px, py, aid;
    var agentNode,
        agent,
        eo = null;
    var eoDead;

    for (var i = 0; i < agents.length; i++) {
      agent = agents[i];
      myAgent = this.npcInfo.objectForKey(agent.aid);

      if (myAgent && myAgent.type == "agent") {
        agentNode = this.getComponentByRole(myAgent);
        agentNode.playAni(agent, this.getFutureAgent(agent.aid, agentsFuture), this.mainPlayer);
        agentNode.setLife(agent.life);
        agentNode.setGroupKill(agent.groupKill);
        px = Math.round(agent.mypos.x * 30);
        py = Math.round(agent.mypos.y * 30);
        agentNode.updatePos(px, py);
      }
    }
  },
  playForts: function playForts(forts) {
    var myAgent;
    var agentNode,
        agent,
        warrior = null;

    for (var i = 0; i < forts.length; i++) {
      agent = forts[i];
      myAgent = this.npcInfo.objectForKey(agent.aid);

      if (!myAgent) {
        continue;
      }

      myAgent.role = "fa";
      agentNode = this.getComponentByRole(myAgent);
      agentNode.setLife(agent.life);
      warrior = myAgent.getChildByName("warrior");
      warrior.role = "lr";
      agentNode = this.getComponentByRole(warrior); //if no enmey then standby

      if (myAgent && agent.actType == "move") {
        agentNode.playFortWarriorAnimationDefault("move", agent.isHero, this.mainPlayer);
      } else if (myAgent && agent.actType == "sa") {
        agentNode.playBaseWarriorAnimation(agent, this.mainPlayer, "sa");
      }
    }
  },
  playLogs: function playLogs(logs) {
    var agent, myAgent;
    var px, py, aid;
    var agentNode,
        bullet,
        eo = null;
    var sc;
    var moveTo;

    for (var i = 0; i < logs.length; i++) {
      agent = logs[i];
      myAgent = this.npcInfo.objectForKey(agent.aid);

      if (myAgent) {
        agentNode = this.getComponentByRole(myAgent);
        agentNode.move(agent.mypos);
      }
    }
  },
  playBullets: function playBullets(bullets) {
    var myBullet;
    var px, py, aid;
    var agentNode,
        bullet,
        eo = null;
    var sc;
    var moveTo, bulletRot;

    for (var i = 0; i < bullets.length; i++) {
      bullet = bullets[i];
      myBullet = this.npcInfo.objectForKey(bullet.aid);

      if (myBullet) {
        myBullet.active = true;
        agentNode = this.getComponentByRole(myBullet);

        if (myBullet.role == "bomb") {
          sc = this.getFireBombScale(bullet.mypos, bullet.targetpos, myBullet.targetDis, myBullet.startPos);
          myBullet.scaleX = sc;
          myBullet.scaleY = sc;
          /*
                              var randomTime = Math.ceil(Math.random()*40)-10;
                              var fh = myBullet.getChildByName("fireHead");
                              //fh.skewY = randomTime;
                              //fh.skewX = randomTime;
          
                              //fire bomb size changing according to the distance between target and origin.
                              sc = this.getFireBombScale(bullet.mypos, bullet.targetpos, myBullet.targetDis, myBullet.startPos);
                              agentNode.node.scaleX=sc;
                              agentNode.node.scaleY=sc;
                              myBullet.getComponent(cc.MotionStreak).stroke *= sc;
          */
        } //2 fort bullet emit the same time, only display the proper bullet.


        if (bullet.updown == "up" && this.mainPlayer == 2) {
          continue;
        }

        if (bullet.updown == "down" && this.mainPlayer == 1) {
          continue;
        }

        px = bullet.mypos.x * 30;
        py = bullet.mypos.y * 30;
        moveTo = cc.v2(px, py);
        bulletRot = bullet.rot;

        if (this.mainPlayer == 1) {
          bulletRot += 180;
        } //1000:agent, 999:this bullet 998:forts;
        //make bullet display under agent which is at same position.


        myBullet.zIndex = 1000 + parseInt(32 - bullet.mypos.y); //if bomb, then shake a little bit;

        if (myBullet.role == "bomb" || myBullet.role == "wizfire") {
          myBullet.zIndex = 9999; //var randomTime = Math.ceil(Math.random()*40)-10;
          //bulletRot += randomTime;
        } //since 2.1.1 setRotation is desperated.


        myBullet.angle = -1 * bulletRot; //myBullet.setRotation(bulletRot);

        myBullet.setPosition(moveTo);
      }
    }
  },
  getFireBombScale: function getFireBombScale(bulletPos, targetPos, targetDis, startPos) {
    var xDif, yDif;
    var midPos = {};
    midPos.x = startPos.x + (targetPos.x - startPos.x) / 2;
    midPos.y = startPos.y + (targetPos.y - startPos.y) / 2;
    var xDif = bulletPos.x - midPos.x;
    var yDif = bulletPos.y - midPos.y;
    var dis = Math.sqrt(xDif * xDif + yDif * yDif);
    var targetDis = targetDis * 0.5;
    return (targetDis - dis) * 0.7 / targetDis + 0.5; //scale from 0.5 -- 1.2
  },
  enemeyDistance: function enemeyDistance(px, py, ex, ey) {
    var xDif, yDif, dis;
    xDif = px - ex;
    yDif = py - ey;
    dis = Math.sqrt(xDif * xDif + yDif * yDif);
    return dis;
  },
  getComponentByRole: function getComponentByRole(agentObj) {
    var role = agentObj.role;

    if (role == "ske") {
      return agentObj.getComponent('SkeSprite');
    } else if (role == "ir") {
      return agentObj.getComponent('SkeSprite');
    } else if (role == "bee") {
      return agentObj.getComponent('BeeSprite');
    } else if (role == "wiz") {
      return agentObj.getComponent('WizSprite');
    } else if (role == "hr") {
      return agentObj.getComponent('HeroSprite');
    } else if (role == "lm") {
      return agentObj.getComponent('LightmanSprite');
    } else if (role == "lr") {
      return agentObj.getComponent('ArcSprite');
    } else if (role == "gi") {
      return agentObj.getComponent('GiantSprite');
    } else if (role == "bullet") {
      return agentObj.getComponent('Arrow');
    } else if (role == "bomb") {
      return agentObj.getComponent('BombScript');
    } else if (role == "log") {
      return agentObj.getComponent('LogSprite');
    } else if (role == "gun") {
      return agentObj.getComponent('GunSprite');
    } else if (role == "base") {
      return agentObj.getComponent('BaseSprite');
    } else if (role == "fa") {
      return agentObj.getComponent('BaseSprite');
    }
  },
  getKilledEnemies: function getKilledEnemies() {
    var aids = this.removedNpcInfo.allKeys();
    var aid;
    var killedEnemies = []; //when one attack cause multi kills occured in one frame, multi enemies must be handled. 

    for (var i = 0; i < aids.length; i++) {
      aid = aids[i];
      killedEnemies.push(this.removedNpcInfo.objectForKey(aid));
    }

    return killedEnemies;
  },
  getFutureAgent: function getFutureAgent(aid, agentsFuture) {
    for (var i = 0; i < agentsFuture.length; i++) {
      if (agentsFuture[i].aid == aid) {
        return agentsFuture[i];
      }
    }

    return null;
  },
  bloodForAgent: function bloodForAgent(agent) {
    var bloodObj = cc.instantiate(this.playerPrefab[11]);
    var bloodOp = bloodObj.getComponent("BloodBar");
    bloodOp.setBarLevel(agent.level);
    bloodObj.active = false;
    agent.addChild(bloodObj);
    return bloodObj;
  },
  shadowForAgent: function shadowForAgent() {
    var shadowObj = cc.instantiate(this.playerPrefab[2]);
    shadowObj.active = false;
    this.node.addChild(shadowObj);
    return shadowObj;
  },
  shadowForLog: function shadowForLog() {
    var shadowObj = cc.instantiate(this.playerPrefab[2]); // 将新增的节点添加到 Canvas 节点下面

    shadowObj.scaleX = 1;
    shadowObj.sacleY = 1;
    shadowObj.active = false;
    this.node.addChild(shadowObj);
    return shadowObj;
  },
  setClickItem: function setClickItem(select) {
    this.clickSele = select;
  },
  putClickItem: function putClickItem(selCard, node, pt) {
    var putNode = cc.instantiate(node);
    var innerId = this.nick + "_" + Number(new Date());
    putNode.x = pt.x;
    putNode.y = pt.y;
    putNode.name = innerId;
    putNode.active = true;
    selCard.addChild(putNode);
    this.putSele[innerId] = putNode;
    return innerId;
  },
  setDragItem: function setDragItem(params, node) {
    var card = params.target;
    var dragNode = cc.instantiate(node);
    var innerId = this.nick + "_" + Number(new Date());
    node.x = 0;
    node.y = 0;
    dragNode.name = innerId;
    dragNode.actvie = true;
    card.addChild(dragNode);
    this.putSele[innerId] = dragNode;
    this.draggingItem = innerId;
    return innerId;
  },
  unsetDragItem: function unsetDragItem(innerId) {
    this.unshowDragMask();
    this.draggingItem = "";
    this.putSele[innerId].destroy();
    this.putSele[innerId] = null;
  },
  moveDragItem: function moveDragItem(sel, delta) {
    if (this.putSele[this.draggingItem]) {
      this.putSele[this.draggingItem].x += delta.x;
      this.putSele[this.draggingItem].y += delta.y;

      if (this.putSele[this.draggingItem].y < 0) {//this.putSele[this.draggingItem].y = 0
      }
    }
  },
  clearDragItem: function clearDragItem(param, select) {
    var innerId;
    var card = param.target;
    var sel = card._name;
    var pt = {};
    var layoutPt = this.node.position;
    var yOffset = 0;
    var magicCost = select.magicCost;
    var level = select.level;
    var role = select.role;
    console.log("role:" + role);
    this.unshowDragMask();

    if (this.mainPlayer == 1) {
      yOffset = -50;
    } else {
      yOffset = 20;
    }

    if (this.putSele[this.draggingItem]) {
      innerId = this.putSele[this.draggingItem].name; //layout maybe scaled according to devices.

      pt.x = (this.putSele[this.draggingItem].x + card.x - layoutPt.x) / this.node.scaleX;
      pt.y = (this.putSele[this.draggingItem].y + card.y - layoutPt.y + yOffset) / this.node.scaleY;

      if (!this.isValidPutPoint(pt) && !this.ifNotMaskRole(role)) {
        console.log("invalid postion.");
        this.putSele[innerId].destroy();
        this.putSele[innerId] = null;
        this.putErrorMsg();
        return;
      }

      this.sendSodier(magicCost, role, pt, innerId, level);
      this.draggingItem = "";
    }
  },
  sendSodier: function sendSodier(magicCost, role, pt, innerId, level) {
    //var innerId = this.nick +"_"+ Number(new Date());
    var isHero = this.mainPlayer == 1;
    var bar = this.canvasNode.getChildByName("magicBar");
    var juice = bar.getChildByName("juice");
    var cost = this.useMagic(magicCost);
    this.playSnd("put1");

    if (cost) {
      juice.width = cost;
      MY_SOCKET.json.emit('cmd', {
        'isHero': isHero,
        'roomId': this.roomId,
        'innerId': innerId,
        'role': role,
        'pt': pt,
        'level': level
      });
    } else {
      this.putSele[innerId].destroy();
      this.putSele[innerId] = null;
    }
  },
  setMagicBar: function setMagicBar() {
    var bar = this.canvasNode.getChildByName("magicBar");
    var juice = bar.getChildByName("juice");

    if (juice.width < 600) {
      juice.width += this.addJuice;
    }

    if (juice.width % 50 == 0) {
      this.magicAmount = juice.width / 50;
      this.updateCardStatus();
    }
  },
  useMagic: function useMagic(amount) {
    var bar = this.canvasNode.getChildByName("magicBar");
    var juice = bar.getChildByName("juice");
    var afterUse = juice.width - amount * 50;

    if (afterUse >= 0) {
      return afterUse;
    }

    return false;
  },
  updateCardStatus: function updateCardStatus() {
    var head = "sel";
    var nodeName, selNode;
    var selSprite = null;

    for (var i = 1; i <= 7; i++) {
      nodeName = head + i;
      selNode = this.canvasNode.getChildByName(nodeName);

      if (selNode) {
        selSprite = selNode.getComponent('SelCard');

        if (selSprite) {
          if (selSprite.magicCost <= this.magicAmount) {
            selNode.color = new cc.Color(255, 255, 255);
          } else {
            selNode.color = new cc.Color(127, 127, 127);
          }
        }
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0dhbWVQcm92aWRlci5qcyJdLCJuYW1lcyI6WyJTdHJpbmciLCJwcm90b3R5cGUiLCJpbkFycmF5IiwiYXJyIiwiY29uc29sZSIsImxvZyIsImkiLCJrIiwibGVuZ3RoIiwiQXJyYXkiLCJyZW1vdmVCeVZhbHVlIiwidmFsIiwic3BsaWNlIiwibWludXMiLCJyZXN1bHQiLCJvYmoiLCJqIiwicHVzaCIsInNvY2tldFByb3ZpZGVyIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwiaGlkZURyYWdJdGVtIiwiaW5uZXJJZCIsInB1dFNlbGUiLCJkZXN0cm95IiwiY3JlYXRlQnVmZiIsImJ1ZmYiLCJteUJ1ZmYiLCJweCIsInB5IiwiY2FudmFzTm9kZSIsIm5vZGUiLCJwYXJlbnQiLCJ0eXBlSWQiLCJwbGF5U25kIiwiaW5zdGFudGlhdGUiLCJwbGF5ZXJQcmVmYWIiLCJkaXNwQ2hhclNlbGUiLCJjbGlja1NlbGUiLCJteXBvcyIsIngiLCJ5IiwibW92ZVRvIiwidjIiLCJzZXRQb3NpdGlvbiIsImFkZENoaWxkIiwiY3JlYXRlQWdlbnRzIiwiYWdlbnRzIiwiYWlkIiwibXlBZ2VudCIsImFnZW50IiwiYWdlbnROb2RlIiwiZW8iLCJucGNJbmZvIiwib2JqZWN0Rm9yS2V5Iiwicm9sZSIsIm5hbWUiLCJ0eXBlIiwiYWN0aXZlIiwic2l6ZSIsImxldmVsIiwiZ2V0Q29tcG9uZW50QnlSb2xlIiwiaW5pdCIsInNldElkIiwic2V0U2hhZG93Iiwic2hhZG93Rm9yQWdlbnQiLCJzZXRUb3RhbExpZmUiLCJsaWZlIiwic2V0Qmxvb2QiLCJibG9vZEZvckFnZW50IiwibWFpblBsYXllciIsInJvdCIsInVwZGF0ZVBvcyIsInNldE9iamVjdCIsImNyZWF0ZUJ1bGxldHMiLCJidWxsZXRzIiwibXlCdWxsZXQiLCJidWxsZXQiLCJlRGlzIiwic3RhcnRQb3MiLCJlbmVtZXlEaXN0YW5jZSIsInRhcmdldHBvcyIsInRhcmdldERpcyIsInVwZG93biIsInpJbmRleCIsImJ1bGxldFJvdCIsImFuZ2xlIiwiY3JlYXRlQmFzZXMiLCJiYXNlcyIsImJhc2VOYW1lIiwiYmFzZU5vZGUiLCJvYmplY3RJZCIsImJhc2VPYmoiLCJnZXRDaGlsZEJ5TmFtZSIsImdldENvbXBvbmVudCIsInNldExpZmUiLCJjcmVhdGVMb2dzIiwibG9ncyIsInNoYWRvd0ZvckxvZyIsIm1vdmUiLCJjcmVhdGVGb3J0cyIsImZvcnRzIiwiem9yZGVyIiwic3BOYW1lIiwicGFyc2VJbnQiLCJzZXRaSW5kZXgiLCJhZ2VudFByb2Nlc3MiLCJyZW1vdGVBZ2VudHMiLCJsb2NhbEFnZW50cyIsImtpbGxBZ2VudHMiLCJhZ2VudE9iaiIsImFnZW50SWQiLCJhbGxLZXlzIiwicmVtb3ZlIiwicmVtb3ZlZE5wY0luZm8iLCJyZW1vdmVPYmplY3RGb3JLZXkiLCJiYXNlUHJvY2VzcyIsInJlbW90ZUJhc2VzIiwia2lsbEJhc2VzIiwiZW5lbXlCYXNlcyIsIndhcnJpb3JOYW1lIiwid2Fycmlvck9iaiIsIl9kZWZhdWx0QmFzZXMiLCJkaXNwTGF5b3V0TWFzayIsInJlbW92ZUNoaWxkIiwicGxheUVmZmVjdCIsInBsdXNCYXNlS2lsbE51bSIsImVuZW15bnVtIiwibXludW0iLCJzdHJpbmciLCJkaXIiLCJiZCIsInVuZGlzcGxheU1hc2siLCJzZWwiLCJraWxsRW5lbXlCYXNlcyIsIl9zZWxmIiwic2hvd01hc2siLCJzaG93RHJhZ01hc2siLCJpZk5vdE1hc2tSb2xlIiwibWFza1R5cGUiLCJ1bnNob3dEcmFnTWFzayIsImRlbGF5Iiwic2NoZWR1bGVPbmNlIiwicHV0RXJyb3JNc2ciLCJ1bmRpc3BsYXlQdXRFcnIiLCJmb3J0UHJvY2VzcyIsImZvcnRzRnV0dXJlIiwibG9nUHJvY2VzcyIsImJ1bGxldFByb2Nlc3MiLCJyZW1vdGVCdWxsZXRzIiwibG9jYWxCdWxsZXRzIiwia2lsbEJ1bGxldHMiLCJzdGFydFNjZW5lSml0dGVyIiwic2NlbmVOb2RlIiwib3giLCJveSIsImNudCIsImxvd2VyIiwidXBwZXIiLCJjYWxsQmFjayIsInJhbmRvbVgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyYW5kb21ZIiwic3RvcEFsbEFjdGlvbnMiLCJkZWwiLCJkZWxheVRpbWUiLCJjYWwiLCJjYWxsRnVuYyIsInNlcSIsInNlcXVlbmNlIiwicnVuQWN0aW9uIiwicmVwZWF0Rm9yZXZlciIsInBsYXlCYXNlcyIsImtpbmdOb2RlIiwia2luZ0Fycm93Iiwid2FycmlvciIsImFjdFR5cGUiLCJhdHRhY2tEdXJhIiwibm93IiwidG1wQiIsImVvRGVhZCIsInBsYXlCYXNlV2FycmlvckFuaW1hdGlvbkRlZmF1bHQiLCJwbGF5QmFzZVdhcnJpb3JBbmltYXRpb24iLCJwbGF5QWdlbnRzIiwiYWdlbnRzRnV0dXJlIiwicGxheUFuaSIsImdldEZ1dHVyZUFnZW50Iiwic2V0R3JvdXBLaWxsIiwiZ3JvdXBLaWxsIiwicm91bmQiLCJwbGF5Rm9ydHMiLCJwbGF5Rm9ydFdhcnJpb3JBbmltYXRpb25EZWZhdWx0IiwiaXNIZXJvIiwicGxheUxvZ3MiLCJzYyIsInBsYXlCdWxsZXRzIiwiZ2V0RmlyZUJvbWJTY2FsZSIsInNjYWxlWCIsInNjYWxlWSIsImJ1bGxldFBvcyIsInRhcmdldFBvcyIsInhEaWYiLCJ5RGlmIiwibWlkUG9zIiwiZGlzIiwic3FydCIsImV4IiwiZXkiLCJnZXRLaWxsZWRFbmVtaWVzIiwiYWlkcyIsImtpbGxlZEVuZW1pZXMiLCJibG9vZE9iaiIsImJsb29kT3AiLCJzZXRCYXJMZXZlbCIsInNoYWRvd09iaiIsInNhY2xlWSIsInNldENsaWNrSXRlbSIsInNlbGVjdCIsInB1dENsaWNrSXRlbSIsInNlbENhcmQiLCJwdCIsInB1dE5vZGUiLCJuaWNrIiwiTnVtYmVyIiwiRGF0ZSIsInNldERyYWdJdGVtIiwicGFyYW1zIiwiY2FyZCIsInRhcmdldCIsImRyYWdOb2RlIiwiYWN0dmllIiwiZHJhZ2dpbmdJdGVtIiwidW5zZXREcmFnSXRlbSIsIm1vdmVEcmFnSXRlbSIsImRlbHRhIiwiY2xlYXJEcmFnSXRlbSIsInBhcmFtIiwiX25hbWUiLCJsYXlvdXRQdCIsInBvc2l0aW9uIiwieU9mZnNldCIsIm1hZ2ljQ29zdCIsImlzVmFsaWRQdXRQb2ludCIsInNlbmRTb2RpZXIiLCJiYXIiLCJqdWljZSIsImNvc3QiLCJ1c2VNYWdpYyIsIndpZHRoIiwiTVlfU09DS0VUIiwianNvbiIsImVtaXQiLCJyb29tSWQiLCJzZXRNYWdpY0JhciIsImFkZEp1aWNlIiwibWFnaWNBbW91bnQiLCJ1cGRhdGVDYXJkU3RhdHVzIiwiYW1vdW50IiwiYWZ0ZXJVc2UiLCJoZWFkIiwibm9kZU5hbWUiLCJzZWxOb2RlIiwic2VsU3ByaXRlIiwiY29sb3IiLCJDb2xvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE9BQWpCLEdBQTJCLFVBQVNDLEdBQVQsRUFBYTtBQUNoQztBQUNKLE1BQUcsQ0FBQ0EsR0FBSixFQUFRO0FBQ0pDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHFDQUFaO0FBQ0gsR0FKbUMsQ0FLcEM7OztBQUNBLE9BQUksSUFBSUMsQ0FBQyxHQUFDLENBQU4sRUFBUUMsQ0FBQyxHQUFDSixHQUFHLENBQUNLLE1BQWxCLEVBQXlCRixDQUFDLEdBQUNDLENBQTNCLEVBQTZCRCxDQUFDLEVBQTlCLEVBQWlDO0FBQzdCLFFBQUcsUUFBTUgsR0FBRyxDQUFDRyxDQUFELENBQVosRUFBaUI7QUFDYixhQUFPLElBQVA7QUFDSDtBQUNKLEdBVm1DLENBV3BDOzs7QUFDQSxTQUFPLEtBQVA7QUFDSCxDQWJEOztBQWVBRyxLQUFLLENBQUNSLFNBQU4sQ0FBZ0JTLGFBQWhCLEdBQWdDLFVBQVNDLEdBQVQsRUFBYztBQUMxQyxPQUFJLElBQUlMLENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsR0FBQyxLQUFLRSxNQUFuQixFQUEwQkYsQ0FBQyxFQUEzQixFQUErQjtBQUMzQixRQUFHLEtBQUtBLENBQUwsS0FBV0ss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RyxLQUFOLEdBQVlTLE1BQU0sR0FBQyxFQUFsQzs7QUFFQSxRQUFHQyxRQUFRLElBQUUsQ0FBYixFQUFnQjtBQUNaLGFBQU9BLFFBQVA7QUFDSDs7QUFDRCxXQUFPLEtBQVA7QUFDSCxHQXJqQ0k7QUF1akNMRixFQUFBQSxnQkFBZ0IsRUFBRSw0QkFBVztBQUN6QixRQUFJRyxJQUFJLEdBQUcsS0FBWDtBQUNBLFFBQUlDLFFBQUosRUFBY0MsT0FBZDtBQUNBLFFBQUlDLFNBQVMsR0FBRyxJQUFoQjs7QUFFQSxTQUFJLElBQUlwUSxDQUFDLEdBQUMsQ0FBVixFQUFZQSxDQUFDLElBQUUsQ0FBZixFQUFpQkEsQ0FBQyxFQUFsQixFQUFzQjtBQUNsQmtRLE1BQUFBLFFBQVEsR0FBR0QsSUFBSSxHQUFHalEsQ0FBbEI7QUFDQW1RLE1BQUFBLE9BQU8sR0FBRyxLQUFLek8sVUFBTCxDQUFnQitELGNBQWhCLENBQStCeUssUUFBL0IsQ0FBVjs7QUFDQSxVQUFHQyxPQUFILEVBQVk7QUFDUkMsUUFBQUEsU0FBUyxHQUFHRCxPQUFPLENBQUN6SyxZQUFSLENBQXFCLFNBQXJCLENBQVo7O0FBQ0EsWUFBRzBLLFNBQUgsRUFBYztBQUNWLGNBQUdBLFNBQVMsQ0FBQ3JCLFNBQVYsSUFBdUIsS0FBS2MsV0FBL0IsRUFBNEM7QUFDeENNLFlBQUFBLE9BQU8sQ0FBQ0UsS0FBUixHQUFnQixJQUFJdlAsRUFBRSxDQUFDd1AsS0FBUCxDQUFhLEdBQWIsRUFBaUIsR0FBakIsRUFBcUIsR0FBckIsQ0FBaEI7QUFDSCxXQUZELE1BRU87QUFDSEgsWUFBQUEsT0FBTyxDQUFDRSxLQUFSLEdBQWdCLElBQUl2UCxFQUFFLENBQUN3UCxLQUFQLENBQWEsR0FBYixFQUFpQixHQUFqQixFQUFxQixHQUFyQixDQUFoQjtBQUNIO0FBQ0o7QUFDSjtBQUNKO0FBQ0o7QUExa0NJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIOWumuS5ieS4gOS4quWIpOaWreWHveaVsFxuU3RyaW5nLnByb3RvdHlwZS5pbkFycmF5ID0gZnVuY3Rpb24oYXJyKXtcbiAgICAgICAgLy8g5LiN5piv5pWw57uE5YiZ5oqb5Ye65byC5bi4XG4gICAgaWYoIWFycil7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRVJSKGluX2FycmF5KTpJbnB1dCBpcyBub3QgYW4gYXJyYXlcIik7XG4gICAgfVxuICAgIC8vIOmBjeWOhuaYr+WQpuWcqOaVsOe7hOS4rVxuICAgIGZvcih2YXIgaT0wLGs9YXJyLmxlbmd0aDtpPGs7aSsrKXtcbiAgICAgICAgaWYodGhpcz09YXJyW2ldKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyDlpoLmnpzkuI3lnKjmlbDnu4TkuK3lsLHkvJrov5Tlm55mYWxzZVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbkFycmF5LnByb3RvdHlwZS5yZW1vdmVCeVZhbHVlID0gZnVuY3Rpb24odmFsKSB7XG4gICAgZm9yKHZhciBpPTA7aTx0aGlzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgaWYodGhpc1tpXSA9PSB2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5BcnJheS5wcm90b3R5cGUubWludXMgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheSgpO1xuICAgIHZhciBvYmogPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICBvYmpbYXJyW2ldXSA9IDE7XG4gICAgfVxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoIW9ialt0aGlzW2pdXSlcbiAgICAgICAge1xuICAgICAgICAgICAgb2JqW3RoaXNbal1dID0gMTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXNbal0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG52YXIgc29ja2V0UHJvdmlkZXIgPSByZXF1aXJlKFwiU29ja2V0UHJvdmlkZXJcIik7XG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBzb2NrZXRQcm92aWRlcixcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICAvLyBzdGFydCAoKSB7fSxcblxuICAgIGhpZGVEcmFnSXRlbTpmdW5jdGlvbiAoaW5uZXJJZCkge1xuICAgICAgICBpZih0aGlzLnB1dFNlbGVbaW5uZXJJZF0pIHtcbiAgICAgICAgICAgIHRoaXMucHV0U2VsZVtpbm5lcklkXS5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLnB1dFNlbGVbaW5uZXJJZF0gPSBudWxsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNyZWF0ZUJ1ZmY6ZnVuY3Rpb24oYnVmZikge1xuICAgICAgICB2YXIgbXlCdWZmLHB4LHB5O1xuICAgICAgICB2YXIgY2FudmFzTm9kZSA9IHRoaXMubm9kZS5wYXJlbnQ7XG5cbiAgICAgICAgaWYoYnVmZi50eXBlSWQgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5wbGF5U25kKFwidGh1bmRlclwiKTtcbiAgICAgICAgICAgIG15QnVmZiA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzIzXSk7XG4gICAgICAgICAgICAvL2NhbnZhc05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidWZmVGh1bmRlclwiKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGJ1ZmYudHlwZUlkID09IDIpIHtcbiAgICAgICAgICAgIHRoaXMucGxheVNuZChcImhlYWxcIik7XG4gICAgICAgICAgICBteUJ1ZmYgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsyNF0pO1xuICAgICAgICAgICAgLy9jYW52YXNOb2RlLmdldENoaWxkQnlOYW1lKFwiYnVmZkhlYWxcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vaGlkZSBzZWxlY3QgZnJhbWVcbiAgICAgICAgdGhpcy5kaXNwQ2hhclNlbGUoKTtcblxuICAgICAgICAvL3JlbW92ZSBidWZmIGljb25cbiAgICAgICAgaWYodGhpcy5wdXRTZWxlW2J1ZmYuaW5uZXJJZF0pIHtcbiAgICAgICAgICAgIHRoaXMucHV0U2VsZVtidWZmLmlubmVySWRdLnBhcmVudC5kZXN0cm95KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2hpZGUgZHJhZyBpdGVtIGRpc3BcbiAgICAgICAgLy90aGlzLmhpZGVEcmFnSXRlbShidWZmLmlubmVySWQpO1xuXG4gICAgICAgIHRoaXMuY2xpY2tTZWxlID0ge307XG5cbiAgICAgICAgcHggPSAoYnVmZi5teXBvcy54KSozMDtcbiAgICAgICAgcHkgPSAoYnVmZi5teXBvcy55KSozMDtcblxuICAgICAgICB2YXIgbW92ZVRvID0gY2MudjIocHgsIHB5KTtcbiAgICAgICAgbXlCdWZmLnNldFBvc2l0aW9uKG1vdmVUbyk7XG5cbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG15QnVmZik7XG4gICAgfSxcblxuICAgIGNyZWF0ZUFnZW50czpmdW5jdGlvbihhZ2VudHMpIHtcbiAgICAgICAgdmFyIGFpZCxteUFnZW50LGFnZW50LGFnZW50Tm9kZTtcbiAgICAgICAgdmFyIHB4LHB5LGVvO1xuICAgICAgICAvL3ZhciBub2RlbGlzdCA9IGNjLmZpbmQoXCJDYW52YXMvbGF5b3V0XCIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKG5vZGVsaXN0KTtcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGFnZW50cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICBhZ2VudCA9IGFnZW50c1tpXTtcblxuICAgICAgICAgICAgYWlkID0gYWdlbnQuYWlkO1xuICAgICAgICAgICAgbXlBZ2VudCA9IHRoaXMubnBjSW5mby5vYmplY3RGb3JLZXkoYWlkKTtcbiAgICAgICAgICAgIHB4ID0gKGFnZW50Lm15cG9zLngpKjMwO1xuICAgICAgICAgICAgcHkgPSAoYWdlbnQubXlwb3MueSkqMzA7XG5cbiAgICAgICAgICAgIGlmKG15QWdlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZURyYWdJdGVtKGFnZW50LmlubmVySWQpO1xuXG4gICAgICAgICAgICAgICAgaWYoYWdlbnQucm9sZSA9PSBcInNrZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG15QWdlbnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlswXSk7ICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGFnZW50LnJvbGUgPT0gXCJpclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG15QWdlbnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsyMF0pOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihhZ2VudC5yb2xlID09IFwiYmVlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbXlBZ2VudCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzE2XSk7ICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGFnZW50LnJvbGUgPT0gXCJ3aXpcIikge1xuICAgICAgICAgICAgICAgICAgICBteUFnZW50ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMTddKTsgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoYWdlbnQucm9sZSA9PSBcImhyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbXlBZ2VudCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzEyXSk7ICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGFnZW50LnJvbGUgPT0gXCJsbVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG15QWdlbnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsxNF0pOyAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihhZ2VudC5yb2xlID09IFwibHJcIikge1xuICAgICAgICAgICAgICAgICAgICBteUFnZW50ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbM10pOyAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihhZ2VudC5yb2xlID09IFwiZ2lcIikge1xuICAgICAgICAgICAgICAgICAgICBteUFnZW50ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbNF0pOyAgICBcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBteUFnZW50Lm5hbWUgPSBhaWQ7XG4gICAgICAgICAgICAgICAgbXlBZ2VudC50eXBlID0gXCJhZ2VudFwiO1xuICAgICAgICAgICAgICAgIG15QWdlbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBteUFnZW50LnJvbGUgPSBhZ2VudC5yb2xlO1xuICAgICAgICAgICAgICAgIG15QWdlbnQuc2l6ZSA9IGFnZW50LnNpemU7XG4gICAgICAgICAgICAgICAgbXlBZ2VudC5sZXZlbCA9IGFnZW50LmxldmVsO1xuXG4gICAgICAgICAgICAgICAgYWdlbnROb2RlID0gdGhpcy5nZXRDb21wb25lbnRCeVJvbGUobXlBZ2VudCk7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLmluaXQoKTtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUuc2V0SWQoYWlkKTtcblxuICAgICAgICAgICAgICAgIC8vc2hhZG93IHNob3VsZCBzZXQgaW4gbGF5b3V0LCBiZWNhdXNlIGl0cyB6aW5kZXggc2hvdWxkIGJlIGxvd2VyIHRoYW4gYW55IGFnZW50cy5cbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUuc2V0U2hhZG93KHRoaXMuc2hhZG93Rm9yQWdlbnQoKSk7XG5cbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUuc2V0VG90YWxMaWZlKGFnZW50LmxpZmUpO1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5zZXRCbG9vZCh0aGlzLmJsb29kRm9yQWdlbnQobXlBZ2VudCkpO1xuXG4gICAgICAgICAgICAgICAgLy9pZiBpbml0IHBvcyBpcyBpbiBzb3V0aCwgZmFjZSB0byBub3J0aCwgb3RoZXJ3aXNlLi4uLlxuICAgICAgICAgICAgICAgIGlmKHRoaXMubWFpblBsYXllciA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGFnZW50LnJvdCA9IDE4MDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLm1haW5QbGF5ZXIgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICBhZ2VudC5yb3QgPSAwOyAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHggPSAoYWdlbnQubXlwb3MueCkqMzA7XG4gICAgICAgICAgICAgICAgcHkgPSAoYWdlbnQubXlwb3MueSkqMzA7XG5cbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUudXBkYXRlUG9zKHB4LCBweSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobXlBZ2VudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ucGNJbmZvLnNldE9iamVjdChteUFnZW50LCBhaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNyZWF0ZUJ1bGxldHM6ZnVuY3Rpb24oYnVsbGV0cykge1xuICAgICAgICB2YXIgYWlkLG15QnVsbGV0LGJ1bGxldCxhZ2VudE5vZGU7XG4gICAgICAgIHZhciBweCxweSxlbyxlRGlzO1xuXG4gICAgICAgIGZvcih2YXIgaT0wO2k8YnVsbGV0cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICBidWxsZXQgPSBidWxsZXRzW2ldO1xuICAgICAgICAgICAgYWlkID0gYnVsbGV0LmFpZDtcbiAgICAgICAgICAgIG15QnVsbGV0ID0gdGhpcy5ucGNJbmZvLm9iamVjdEZvcktleShhaWQpO1xuXG4gICAgICAgICAgICBpZihteUJ1bGxldCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYoYnVsbGV0LnJvbGU9PVwiYnVsbGV0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbXlCdWxsZXQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsxXSk7XG4gICAgICAgICAgICAgICAgICAgIG15QnVsbGV0LnN0YXJ0UG9zID0gYnVsbGV0Lm15cG9zO1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihidWxsZXQucm9sZT09XCJib21iXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJib21iIGNyZWF0ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVNuZChcImZpcmVTZW5kXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVEcmFnSXRlbShidWxsZXQuaW5uZXJJZCk7XG4gICAgICAgICAgICAgICAgICAgIG15QnVsbGV0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbNV0pOyAgICBcbiAgICAgICAgICAgICAgICAgICAgZURpcyA9IHRoaXMuZW5lbWV5RGlzdGFuY2UoYnVsbGV0Lm15cG9zLngsIGJ1bGxldC5teXBvcy55LCBidWxsZXQudGFyZ2V0cG9zLngsIGJ1bGxldC50YXJnZXRwb3MueSk7XG4gICAgICAgICAgICAgICAgICAgIG15QnVsbGV0LnN0YXJ0UG9zID0gYnVsbGV0Lm15cG9zO1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldC50YXJnZXREaXMgPSBlRGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGJ1bGxldC5yb2xlPT1cInRhbWFcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlTbmQoXCJndW5cIik7XG4gICAgICAgICAgICAgICAgICAgIG15QnVsbGV0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbOV0pO1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldC5zdGFydFBvcyA9IGJ1bGxldC5teXBvcztcbiAgICAgICAgICAgICAgICAgICAgbXlCdWxsZXQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoYnVsbGV0LnJvbGU9PVwid2l6ZmlyZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG15QnVsbGV0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMThdKTtcbiAgICAgICAgICAgICAgICAgICAgbXlCdWxsZXQuc3RhcnRQb3MgPSBidWxsZXQubXlwb3M7XG4gICAgICAgICAgICAgICAgICAgIG15QnVsbGV0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciwgbm8gYnVsbGV0IHR5cGUuXCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG15QnVsbGV0Lm5hbWUgPSBhaWQ7XG4gICAgICAgICAgICAgICAgbXlCdWxsZXQudHlwZSA9IFwiYnVsbGV0XCI7XG4gICAgICAgICAgICAgICAgLy9teUJ1bGxldC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG15QnVsbGV0LnJvbGUgPSBidWxsZXQucm9sZTtcbiAgICAgICAgICAgICAgICBteUJ1bGxldC51cGRvd24gPSBidWxsZXQudXBkb3duO1xuXG4gICAgICAgICAgICAgICAgbXlCdWxsZXQuekluZGV4ID0gOTk5OTtcblxuICAgICAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKG15QnVsbGV0KTtcblxuICAgICAgICAgICAgICAgIC8vIOWwhuaWsOWinueahOiKgueCuea3u+WKoOWIsCBDYW52YXMg6IqC54K55LiL6Z2iXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG15QnVsbGV0KTtcblxuICAgICAgICAgICAgICAgIHB4ID0gLTEwMDA7XG4gICAgICAgICAgICAgICAgcHkgPSAtMTAwMDtcbiAgICAgICAgICAgICAgICB2YXIgbW92ZVRvID0gY2MudjIocHgsIHB5KTtcblxuICAgICAgICAgICAgICAgIHZhciBidWxsZXRSb3QgPSBidWxsZXQucm90O1xuICAgICAgICAgICAgICAgIGlmKHRoaXMubWFpblBsYXllciA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldFJvdCArPSAxODA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9zaW5jZSAyLjEuMSBzZXRSb3RhdGlvbiBpcyBkZXNwZXJhdGVkLlxuICAgICAgICAgICAgICAgIG15QnVsbGV0LmFuZ2xlID0gLTEqYnVsbGV0Um90O1xuICAgICAgICAgICAgICAgIC8vbXlCdWxsZXQuc2V0Um90YXRpb24oYnVsbGV0Um90KTsgIC8vYnVsbGV0LnJvdCsxODBcblxuICAgICAgICAgICAgICAgIG15QnVsbGV0LnNldFBvc2l0aW9uKG1vdmVUbyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5wY0luZm8uc2V0T2JqZWN0KG15QnVsbGV0LCBhaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNyZWF0ZUJhc2VzOmZ1bmN0aW9uKGJhc2VzKSB7XG4gICAgICAgIHZhciBhaWQsbXlBZ2VudCxhZ2VudCxiYXNlTmFtZSxiYXNlTm9kZTtcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGJhc2VzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGFnZW50ID0gYmFzZXNbaV07XG4gICAgICAgICAgICBhaWQgPSBhZ2VudC5haWQ7XG4gICAgICAgICAgICBteUFnZW50ID0gdGhpcy5ucGNJbmZvLm9iamVjdEZvcktleShhaWQpO1xuXG4gICAgICAgICAgICBpZihteUFnZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBteUFnZW50ID0ge307XG4gICAgICAgICAgICAgICAgbXlBZ2VudC5uYW1lID0gYWlkO1xuICAgICAgICAgICAgICAgIG15QWdlbnQudHlwZSA9IFwiYmFzZVwiO1xuICAgICAgICAgICAgICAgIG15QWdlbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBteUFnZW50LnJvbGUgPSBhZ2VudC5yb2xlO1xuICAgICAgICAgICAgICAgIG15QWdlbnQubXlwb3MgPSBhZ2VudC5teXBvcztcbiAgICAgICAgICAgICAgICBteUFnZW50LnNpemUgPSBhZ2VudC5zaXplO1xuXG4gICAgICAgICAgICAgICAgYmFzZU5hbWUgPSBcImJhc2VcIisgYWdlbnQub2JqZWN0SWQ7XG4gICAgICAgICAgICAgICAgbXlBZ2VudC5iYXNlT2JqID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKGJhc2VOYW1lKTtcblxuICAgICAgICAgICAgICAgIGJhc2VOb2RlID0gbXlBZ2VudC5iYXNlT2JqLmdldENvbXBvbmVudChcIkJhc2VTcHJpdGVcIik7XG4gICAgICAgICAgICAgICAgYmFzZU5vZGUuc2V0VG90YWxMaWZlKGFnZW50LmxpZmUpO1xuICAgICAgICAgICAgICAgIGJhc2VOb2RlLnNldEJsb29kKHRoaXMuYmxvb2RGb3JBZ2VudChteUFnZW50LmJhc2VPYmopKTtcbiAgICAgICAgICAgICAgICBiYXNlTm9kZS5zZXRMaWZlKGFnZW50LmxpZmUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ucGNJbmZvLnNldE9iamVjdChteUFnZW50LCBhaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNyZWF0ZUxvZ3M6ZnVuY3Rpb24obG9ncykge1xuICAgICAgICB2YXIgYWlkLG15QWdlbnQsYWdlbnQsYWdlbnROb2RlO1xuICAgICAgICB2YXIgcHgscHk7XG5cbiAgICAgICAgLy90aGlzLnBsYXlTbmQoXCJsb2dcIik7XG5cbiAgICAgICAgZm9yKHZhciBpPTA7aTxsb2dzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGFnZW50ID0gbG9nc1tpXTtcbiAgICAgICAgICAgIGFpZCA9IGFnZW50LmFpZDtcblxuICAgICAgICAgICAgbXlBZ2VudCA9IHRoaXMubnBjSW5mby5vYmplY3RGb3JLZXkoYWlkKTtcbiAgICAgICAgICAgIHB4ID0gKGFnZW50Lm15cG9zLngpKjMwO1xuICAgICAgICAgICAgcHkgPSAoYWdlbnQubXlwb3MueSkqMzA7XG5cbiAgICAgICAgICAgIGlmKG15QWdlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZURyYWdJdGVtKGFnZW50LmlubmVySWQpO1xuXG4gICAgICAgICAgICAgICAgbXlBZ2VudCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzhdKTtcbiAgICAgICAgICAgICAgICBteUFnZW50Lm5hbWUgPSBhaWQ7XG4gICAgICAgICAgICAgICAgbXlBZ2VudC50eXBlID0gXCJsb2dcIjtcbiAgICAgICAgICAgICAgICBteUFnZW50LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbXlBZ2VudC5yb2xlID0gYWdlbnQucm9sZTtcblxuICAgICAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKG15QWdlbnQpO1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5zZXRJZChhaWQpO1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5zZXRTaGFkb3codGhpcy5zaGFkb3dGb3JMb2coKSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbW92ZVRvID0gY2MudjIocHgsIHB5KTtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUubW92ZShtb3ZlVG8pO1xuXG4gICAgICAgICAgICAgICAgLy8g5bCG5paw5aKe55qE6IqC54K55re75Yqg5YiwIENhbnZhcyDoioLngrnkuIvpnaJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobXlBZ2VudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5U25kKFwibG9nXCIpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ucGNJbmZvLnNldE9iamVjdChteUFnZW50LCBhaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNyZWF0ZUZvcnRzOmZ1bmN0aW9uKGZvcnRzKSB7XG4gICAgICAgIHZhciBhaWQsbXlBZ2VudCxhZ2VudCxhZ2VudE5vZGU7XG4gICAgICAgIHZhciBweCxweSxlbyx6b3JkZXI7XG5cbiAgICAgICAgLy92YXIgbm9kZWxpc3QgPSBjYy5maW5kKFwiQ2FudmFzL2xheW91dFwiKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhub2RlbGlzdCk7XG5cbiAgICAgICAgZm9yKHZhciBpPTA7aTxmb3J0cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICBhZ2VudCA9IGZvcnRzW2ldO1xuICAgICAgICAgICAgYWlkID0gYWdlbnQuYWlkO1xuICAgICAgICAgICAgbXlBZ2VudCA9IHRoaXMubnBjSW5mby5vYmplY3RGb3JLZXkoYWlkKTtcbiAgICAgICAgICAgIHB4ID0gKGFnZW50Lm15cG9zLngpKjMwO1xuICAgICAgICAgICAgcHkgPSAoYWdlbnQubXlwb3MueSkqMzA7XG5cbiAgICAgICAgICAgIGlmKG15QWdlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZURyYWdJdGVtKGFnZW50LmlubmVySWQpO1xuXG4gICAgICAgICAgICAgICAgbXlBZ2VudCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiWzddKTsgICAgXG4gICAgICAgICAgICAgICAgbXlBZ2VudC5uYW1lID0gYWlkO1xuICAgICAgICAgICAgICAgIG15QWdlbnQudHlwZSA9IFwiZmFcIjtcbiAgICAgICAgICAgICAgICBteUFnZW50LnNwTmFtZSA9IFwiRm9ydEFTcHJpdGVcIjtcbiAgICAgICAgICAgICAgICBteUFnZW50LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbXlBZ2VudC5yb2xlID0gYWdlbnQucm9sZTtcbiAgICAgICAgICAgICAgICBteUFnZW50LnNpemUgPSBhZ2VudC5zaXplO1xuXG4gICAgICAgICAgICAgICAgLy8xMDAwOmFnZW50LCA5OTk6YnVsbGV0IDk5ODp0aGlzO1xuICAgICAgICAgICAgICAgIC8vZm9ydCBiYXNlIGFuY2hvclkgaXMgbWlkZGxlLCBzbyB5LTIgaXMgbmVzc2VzYXJ5LlxuICAgICAgICAgICAgICAgIGlmKHRoaXMubWFpblBsYXllciA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHpvcmRlciA9IDEwMDErcGFyc2VJbnQoMzItYWdlbnQubXlwb3MueS0xKTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5tYWluUGxheWVyID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgem9yZGVyID0gMTAwMStwYXJzZUludCgzMi1hZ2VudC5teXBvcy55LTEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBteUFnZW50LnpJbmRleCA9IHpvcmRlcjtcblxuICAgICAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKG15QWdlbnQpO1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5zZXRaSW5kZXgoem9yZGVyKTtcbi8qICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vYWdlbnROb2RlLmluaXQoKTtcbiAgICAgICAgICAgICAgICAvL2FnZW50Tm9kZS5zZXRJZChhaWQpO1xuICAgICAgICAgICAgICAgIC8vYWdlbnROb2RlLnNldFNoYWRvdyh0aGlzLnNoYWRvd0ZvckFnZW50KCkpO1xuKi9cblxuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5zZXRUb3RhbExpZmUoYWdlbnQubGlmZSk7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnNldEJsb29kKHRoaXMuYmxvb2RGb3JBZ2VudChteUFnZW50KSk7XG5cbiAgICAgICAgICAgICAgICAvL2lmIGluaXQgcG9zIGlzIGluIHNvdXRoLCBmYWNlIHRvIG5vcnRoLCBvdGhlcndpc2UuLi4uXG4gICAgICAgICAgICAgICAgaWYodGhpcy5tYWluUGxheWVyID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYWdlbnQucm90ID0gMTgwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMubWFpblBsYXllciA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGFnZW50LnJvdCA9IDA7ICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgbW92ZVRvID0gY2MudjIocHgsIHB5KTtcbiAgICAgICAgICAgICAgICBteUFnZW50LnNldFBvc2l0aW9uKG1vdmVUbyk7XG5cbiAgICAgICAgICAgICAgICAvL2FnZW50Tm9kZS5wbGF5QW5nbGVBbmltYXRpb24oYWdlbnQsIG51bGwsIHRoaXMubWFpblBsYXllcik7XG5cbiAgICAgICAgICAgICAgICAvLyDlsIbmlrDlop7nmoToioLngrnmt7vliqDliLAgQ2FudmFzIOiKgueCueS4i+mdolxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChteUFnZW50KTtcblxuICAgICAgICAgICAgICAgIHRoaXMubnBjSW5mby5zZXRPYmplY3QobXlBZ2VudCwgYWlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhZ2VudFByb2Nlc3M6IGZ1bmN0aW9uKGFnZW50cykge1xuICAgICAgICB2YXIgcmVtb3RlQWdlbnRzID0gW107XG4gICAgICAgIHZhciBsb2NhbEFnZW50cyA9IFtdO1xuICAgICAgICB2YXIga2lsbEFnZW50cyA9IFtdO1xuICAgICAgICB2YXIgYWdlbnRPYmosIGFnZW50Tm9kZTtcbiAgICAgICAgdmFyIGFnZW50SWQ7XG5cbiAgICAgICAgZm9yKHZhciBpPTA7aTxhZ2VudHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgcmVtb3RlQWdlbnRzLnB1c2goYWdlbnRzW2ldLmFpZCk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2NhbEFnZW50cyA9IHRoaXMubnBjSW5mby5hbGxLZXlzKCk7XG4gICAgICAgIGtpbGxBZ2VudHMgPSBsb2NhbEFnZW50cy5taW51cyhyZW1vdGVBZ2VudHMpO1xuXG4gICAgICAgIGZvcihhZ2VudElkIG9mIGtpbGxBZ2VudHMpIHtcbiAgICAgICAgICAgIGFnZW50T2JqID0gdGhpcy5ucGNJbmZvLm9iamVjdEZvcktleShhZ2VudElkKTtcbiAgICAgICAgICAgIGlmKGFnZW50T2JqLnR5cGUgPT0gXCJhZ2VudFwiKSB7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlID0gdGhpcy5nZXRDb21wb25lbnRCeVJvbGUoYWdlbnRPYmopO1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZWROcGNJbmZvLnNldE9iamVjdChhZ2VudE9iaiwgYWdlbnRJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ucGNJbmZvLnJlbW92ZU9iamVjdEZvcktleShhZ2VudElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBiYXNlUHJvY2VzczogZnVuY3Rpb24oYmFzZXMpIHtcbiAgICAgICAgdmFyIHJlbW90ZUJhc2VzID0gW107XG4gICAgICAgIHZhciBraWxsQmFzZXMgPSBbXTtcbiAgICAgICAgdmFyIGVuZW15QmFzZXMgPSBbXTtcbiAgICAgICAgdmFyIGJhc2VPYmo7XG4gICAgICAgIHZhciB3YXJyaW9yTmFtZTtcbiAgICAgICAgdmFyIHdhcnJpb3JPYmo7XG4gICAgICAgIHZhciBiYXNlTmFtZTtcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGJhc2VzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGJhc2VOYW1lID0gXCJiYXNlXCIrIGJhc2VzW2ldLm9iamVjdElkO1xuICAgICAgICAgICAgcmVtb3RlQmFzZXMucHVzaChiYXNlTmFtZSk7XG4gICAgICAgICAgICBlbmVteUJhc2VzLnB1c2goYmFzZU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdG9kbyBsaXN0OiBzaG91bGQgbWFuYWdlIHRvIHJlbW92ZSB0aGUgYmFzZSByZWNvcmQgaW4gbnBjSW5mby5cbiAgICAgICAga2lsbEJhc2VzID0gdGhpcy5fZGVmYXVsdEJhc2VzLm1pbnVzKHJlbW90ZUJhc2VzKTtcblxuICAgICAgICBmb3IoYmFzZU5hbWUgb2Yga2lsbEJhc2VzKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BMYXlvdXRNYXNrKGVuZW15QmFzZXMsIGJhc2VOYW1lKTtcblxuICAgICAgICAgICAgdGhpcy5fZGVmYXVsdEJhc2VzLnJlbW92ZUJ5VmFsdWUoYmFzZU5hbWUpO1xuICAgICAgICAgICAgYmFzZU9iaiA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShiYXNlTmFtZSk7XG5cbiAgICAgICAgICAgIC8vdGhpcy5wbHVzQmFzZUtpbGxOdW0oYmFzZU5hbWUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQ2hpbGQoYmFzZU9iaik7XG4gICAgICAgICAgICB0aGlzLnBsYXlFZmZlY3QoXCJiYXNlXCIsIGJhc2VPYmoueCwgYmFzZU9iai55KTtcbiAgICAgICAgfVxuICAgIH0sXG4gXG4gICAgcGx1c0Jhc2VLaWxsTnVtOiBmdW5jdGlvbihiYXNlTmFtZSkge1xuICAgICAgICAvL3RvZG86IGxheW91dCBub2RlIG11c3QgYmUgc2V0IGluIGluaXQgXG4gICAgICAgIHZhciBlbmVteW51bSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInVwRmxhZ1wiKS5nZXRDaGlsZEJ5TmFtZShcInJpbmdNYXJrXCIpLmdldENoaWxkQnlOYW1lKFwia2lsbG51bVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKTtcbiAgICAgICAgdmFyIG15bnVtID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZG93bkZsYWdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJyaW5nTWFya1wiKS5nZXRDaGlsZEJ5TmFtZShcImtpbGxudW1cIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIik7XG4gICAgICAgIFxuICAgICAgICBpZihiYXNlTmFtZS5pbkFycmF5KFtcImJhc2UxXCIsIFwiYmFzZTJcIiwgXCJiYXNlM1wiXSkpIHtcbiAgICAgICAgICAgIGVuZW15bnVtLnN0cmluZyA9IHBhcnNlSW50KGVuZW15bnVtLnN0cmluZykrMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG15bnVtLnN0cmluZyA9IHBhcnNlSW50KGVuZW15bnVtLnN0cmluZykrMTsgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL2NhbGxlZCB3aGVuIGdhbWUgaXMgb3ZlclxuICAgIGtpbGxCYXNlczpmdW5jdGlvbihkaXIpIHtcbiAgICAgICAgLy90b2RvOiBsYXlvdXQgbm9kZSBtdXN0IGJlIHNldCBpbiBpbml0IFxuICAgICAgICAvL3ZhciBlbmVteW51bSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInVwRmxhZ1wiKS5nZXRDaGlsZEJ5TmFtZShcInJpbmdNYXJrXCIpLmdldENoaWxkQnlOYW1lKFwia2lsbG51bVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKTtcbiAgICAgICAgLy92YXIgbXludW0gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJkb3duRmxhZ1wiKS5nZXRDaGlsZEJ5TmFtZShcInJpbmdNYXJrXCIpLmdldENoaWxkQnlOYW1lKFwia2lsbG51bVwiKS5nZXRDb21wb25lbnQoXCJjYy5MYWJlbFwiKTtcbiAgICAgIFxuICAgICAgICB2YXIga2lsbEJhc2VzO1xuICAgICAgICB2YXIgYmFzZU9iaiwgYmQ7XG4gICAgICAgIHZhciBiYXNlTmFtZTtcbiAgICAgICAgaWYoZGlyID09IFwidXBcIikge1xuICAgICAgICAgICAga2lsbEJhc2VzPSBbXCJiYXNlMVwiLCBcImJhc2UyXCIsIFwiYmFzZTNcIl07XG4gICAgICAgICAgICAvL2VuZW15bnVtLnN0cmluZyA9IDM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBraWxsQmFzZXM9IFtcImJhc2U0XCIsIFwiYmFzZTVcIiwgXCJiYXNlNlwiXTtcbiAgICAgICAgICAgIC8vbXludW0uc3RyaW5nID0gMztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihiYXNlTmFtZSBvZiBraWxsQmFzZXMpIHtcbiAgICAgICAgICAgIC8vdGhpcy5fZGVmYXVsdEJhc2VzLnJlbW92ZUJ5VmFsdWUoYmFzZU5hbWUpO1xuICAgICAgICAgICAgYmFzZU9iaiA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShiYXNlTmFtZSk7XG5cbiAgICAgICAgICAgIGlmKGJhc2VPYmopIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlFZmZlY3QoXCJiYXNlXCIsIGJhc2VPYmoueCwgYmFzZU9iai55KTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQ2hpbGQoYmFzZU9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5kaXNwbGF5TWFzazogZnVuY3Rpb24oc2VsKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHNlbCk7XG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShzZWwpLmFjdGl2ZT1mYWxzZTtcbiAgICB9LFxuXG4gICAgZGlzcExheW91dE1hc2s6IGZ1bmN0aW9uKGtpbGxFbmVteUJhc2VzLCBiYXNlTmFtZSkge1xuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzO1xuICAgICAgICBpZihiYXNlTmFtZSA9PSBcImJhc2U0XCIgfHwgYmFzZU5hbWUgPT0gXCJiYXNlNVwiIHx8IGJhc2VOYW1lID09IFwiYmFzZTZcIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9pZihcImJhc2UxXCIuaW5BcnJheShraWxsRW5lbXlCYXNlcykgJiYgXCJiYXNlMlwiLmluQXJyYXkoa2lsbEVuZW15QmFzZXMpICYmIFwiYmFzZTNcIi5pbkFycmF5KGtpbGxFbmVteUJhc2VzKSkge1xuICAgICAgICAvLyAgICByZXR1cm47XG4gICAgICAgIC8vfVxuXG4gICAgICAgIGlmKFwiYmFzZTFcIi5pbkFycmF5KGtpbGxFbmVteUJhc2VzKSAmJiBcImJhc2UyXCIuaW5BcnJheShraWxsRW5lbXlCYXNlcykpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd01hc2soXCJzZWxlTWFzazEyXCIsIDIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoXCJiYXNlMVwiLmluQXJyYXkoa2lsbEVuZW15QmFzZXMpICYmIFwiYmFzZTNcIi5pbkFycmF5KGtpbGxFbmVteUJhc2VzKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93TWFzayhcInNlbGVNYXNrMTNcIiwgMik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihcImJhc2UxXCIuaW5BcnJheShraWxsRW5lbXlCYXNlcykpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd01hc2soXCJzZWxlTWFzazFcIiwgMik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvd0RyYWdNYXNrOiBmdW5jdGlvbihyb2xlKSB7XG4gICAgICAgIGlmKCF0aGlzLmlmTm90TWFza1JvbGUocm9sZSkpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSh0aGlzLm1hc2tUeXBlKS5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1bnNob3dEcmFnTWFzazogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSh0aGlzLm1hc2tUeXBlKS5hY3RpdmU9ZmFsc2U7XG4gICAgfSxcblxuICAgIHNob3dNYXNrOiBmdW5jdGlvbihtYXNrVHlwZSwgZGVsYXkpIHtcbiAgICAgICAgdmFyIF9zZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5tYXNrVHlwZSA9IG1hc2tUeXBlO1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUobWFza1R5cGUpLmFjdGl2ZT10cnVlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF9zZWxmLnVuZGlzcGxheU1hc2sobWFza1R5cGUpO1xuICAgICAgICB9LCBkZWxheSk7XG4gICAgfSxcblxuICAgIHB1dEVycm9yTXNnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF9zZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicHV0RXJyb3JcIikuYWN0aXZlPXRydWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3NlbGYudW5kaXNwbGF5UHV0RXJyKCk7XG4gICAgICAgIH0sIDEpO1xuICAgIH0sXG5cbiAgICB1bmRpc3BsYXlQdXRFcnI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwdXRFcnJvclwiKS5hY3RpdmU9ZmFsc2U7XG4gICAgfSxcblxuICAgIGZvcnRQcm9jZXNzOiBmdW5jdGlvbihmb3J0cywgZm9ydHNGdXR1cmUpIHtcbiAgICAgICAgdmFyIHJlbW90ZUFnZW50cyA9IFtdO1xuICAgICAgICB2YXIgbG9jYWxBZ2VudHMgPSBbXTtcbiAgICAgICAgdmFyIGtpbGxBZ2VudHMgPSBbXTtcbiAgICAgICAgdmFyIGFnZW50T2JqLCBhZ2VudE5vZGU7XG4gICAgICAgIHZhciBhZ2VudElkLCBiZDtcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGZvcnRzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIHJlbW90ZUFnZW50cy5wdXNoKGZvcnRzW2ldLmFpZCk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2NhbEFnZW50cyA9IHRoaXMubnBjSW5mby5hbGxLZXlzKCk7XG4gICAgICAgIGtpbGxBZ2VudHMgPSBsb2NhbEFnZW50cy5taW51cyhyZW1vdGVBZ2VudHMpO1xuXG4gICAgICAgIGZvcihhZ2VudElkIG9mIGtpbGxBZ2VudHMpIHtcbiAgICAgICAgICAgIGFnZW50T2JqID0gdGhpcy5ucGNJbmZvLm9iamVjdEZvcktleShhZ2VudElkKTtcbiAgICAgICAgICAgIGlmKGFnZW50T2JqLnR5cGUgPT0gXCJmYVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5RWZmZWN0KFwiZm9ydFwiLCBhZ2VudE9iai54LCBhZ2VudE9iai55KTtcblxuICAgICAgICAgICAgICAgIC8vYWdlbnROb2RlID0gdGhpcy5nZXRDb21wb25lbnRCeVJvbGUoYWdlbnRPYmopO1xuICAgICAgICAgICAgICAgIC8vYWdlbnROb2RlLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVDaGlsZChhZ2VudE9iaik7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVkTnBjSW5mby5zZXRPYmplY3QoYWdlbnRPYmosIGFnZW50SWQpO1xuICAgICAgICAgICAgICAgIHRoaXMubnBjSW5mby5yZW1vdmVPYmplY3RGb3JLZXkoYWdlbnRJZCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlFZmZlY3QoXCJiYXNlXCIsIGFnZW50T2JqLngsIGFnZW50T2JqLnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGxvZ1Byb2Nlc3M6IGZ1bmN0aW9uKGxvZ3MpIHtcbiAgICAgICAgdmFyIHJlbW90ZUFnZW50cyA9IFtdO1xuICAgICAgICB2YXIgbG9jYWxBZ2VudHMgPSBbXTtcbiAgICAgICAgdmFyIGtpbGxBZ2VudHMgPSBbXTtcbiAgICAgICAgdmFyIGFnZW50T2JqLCBhZ2VudE5vZGU7XG4gICAgICAgIHZhciBhZ2VudElkLCBiZDtcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGxvZ3MubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgcmVtb3RlQWdlbnRzLnB1c2gobG9nc1tpXS5haWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9jYWxBZ2VudHMgPSB0aGlzLm5wY0luZm8uYWxsS2V5cygpO1xuICAgICAgICBraWxsQWdlbnRzID0gbG9jYWxBZ2VudHMubWludXMocmVtb3RlQWdlbnRzKTtcblxuICAgICAgICBmb3IoYWdlbnRJZCBvZiBraWxsQWdlbnRzKSB7XG4gICAgICAgICAgICBhZ2VudE9iaiA9IHRoaXMubnBjSW5mby5vYmplY3RGb3JLZXkoYWdlbnRJZCk7XG4gICAgICAgICAgICBpZihhZ2VudE9iai5yb2xlID09IFwibG9nXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlFZmZlY3QoXCJsb2dcIiwgYWdlbnRPYmoueCwgYWdlbnRPYmoueSk7XG5cbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEJ5Um9sZShhZ2VudE9iaik7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlZE5wY0luZm8uc2V0T2JqZWN0KGFnZW50T2JqLCBhZ2VudElkKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5wY0luZm8ucmVtb3ZlT2JqZWN0Rm9yS2V5KGFnZW50SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGJ1bGxldFByb2Nlc3M6IGZ1bmN0aW9uKGJ1bGxldHMpIHtcbiAgICAgICAgdmFyIHJlbW90ZUJ1bGxldHMgPSBbXTtcbiAgICAgICAgdmFyIGxvY2FsQnVsbGV0cyA9IFtdO1xuICAgICAgICB2YXIga2lsbEJ1bGxldHMgPSBbXTtcbiAgICAgICAgdmFyIGFnZW50T2JqLCBhZ2VudE5vZGU7XG4gICAgICAgIHZhciBhZ2VudElkO1xuXG4gICAgICAgIGZvcih2YXIgaT0wO2k8YnVsbGV0cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICByZW1vdGVCdWxsZXRzLnB1c2goYnVsbGV0c1tpXS5haWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9jYWxCdWxsZXRzID0gdGhpcy5ucGNJbmZvLmFsbEtleXMoKTtcbiAgICAgICAga2lsbEJ1bGxldHMgPSBsb2NhbEJ1bGxldHMubWludXMocmVtb3RlQnVsbGV0cyk7XG5cbiAgICAgICAgZm9yKGFnZW50SWQgb2Yga2lsbEJ1bGxldHMpIHtcbiAgICAgICAgICAgIGFnZW50T2JqID0gdGhpcy5ucGNJbmZvLm9iamVjdEZvcktleShhZ2VudElkKTtcbiAgICAgICAgICAgIGlmKGFnZW50T2JqLnJvbGUgPT0gXCJib21iXCIpIHtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEJ5Um9sZShhZ2VudE9iaik7XG4gICAgICAgICAgICAgICAgYWdlbnRPYmouZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlZE5wY0luZm8uc2V0T2JqZWN0KGFnZW50T2JqLCBhZ2VudElkKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5wY0luZm8ucmVtb3ZlT2JqZWN0Rm9yS2V5KGFnZW50SWQpO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUVmZmVjdChcImJvbWJcIiwgYWdlbnRPYmoueCwgYWdlbnRPYmoueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihhZ2VudE9iai5yb2xlID09IFwid2l6ZmlyZVwiKSB7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlID0gdGhpcy5nZXRDb21wb25lbnRCeVJvbGUoYWdlbnRPYmopO1xuICAgICAgICAgICAgICAgIGFnZW50T2JqLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZWROcGNJbmZvLnNldE9iamVjdChhZ2VudE9iaiwgYWdlbnRJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ucGNJbmZvLnJlbW92ZU9iamVjdEZvcktleShhZ2VudElkKTtcbiAgICAgICAgICAgICAgICBpZihhZ2VudE9iai54ICYmIGFnZW50T2JqLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5RWZmZWN0KFwid2l6ZmlyZVwiLCBhZ2VudE9iai54LCBhZ2VudE9iai55KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFnZW50T2JqLnJvbGUgPT0gXCJidWxsZXRcIiB8fCBhZ2VudE9iai5yb2xlID09IFwidGFtYVwiKSB7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlID0gdGhpcy5nZXRDb21wb25lbnRCeVJvbGUoYWdlbnRPYmopO1xuICAgICAgICAgICAgICAgIGFnZW50T2JqLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZWROcGNJbmZvLnNldE9iamVjdChhZ2VudE9iaiwgYWdlbnRJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ucGNJbmZvLnJlbW92ZU9iamVjdEZvcktleShhZ2VudElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL3NoYWtlIHRoZSBzY3JlZW5cbiAgICBzdGFydFNjZW5lSml0dGVyOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgc2NlbmVOb2RlID0gdGhpcy5ub2RlO1xuICAgICAgICB2YXIgb3ggPSBzY2VuZU5vZGUueDtcbiAgICAgICAgdmFyIG95ID0gc2NlbmVOb2RlLnk7XG5cbiAgICAgICAgdmFyIGNudCA9IDA7XG5cbiAgICAgICAgdmFyIGxvd2VyID0gLTQ7XG4gICAgICAgIHZhciB1cHBlciA9IDQ7XG4gICAgICAgIHZhciBjYWxsQmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjbnQrKztcbiAgICAgICAgICAgIHZhciByYW5kb21YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHVwcGVyIC0gbG93ZXIpKSArIGxvd2VyO1xuICAgICAgICAgICAgdmFyIHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodXBwZXIgLSBsb3dlcikpICsgbG93ZXI7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNjZW5lTm9kZS54ICs9IHJhbmRvbVg7XG4gICAgICAgICAgICBzY2VuZU5vZGUueSArPSByYW5kb21ZO1xuICAgICAgICAgICAgaWYoY250Pj0xMCkge1xuICAgICAgICAgICAgICAgIHNjZW5lTm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgICAgIHNjZW5lTm9kZS54ID0gb3g7XG4gICAgICAgICAgICAgICAgc2NlbmVOb2RlLnkgPSBveTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlOy8v5Zy65pmv5bi46am76IqC54K5XG4gICAgICAgIHZhciBkZWwgPSBjYy5kZWxheVRpbWUoMS8zMCk7XG4gICAgICAgIHZhciBjYWwgPSBjYy5jYWxsRnVuYyhjYWxsQmFjayk7XG4gICAgICAgIHZhciBzZXEgPSBjYy5zZXF1ZW5jZShkZWwsIGNhbCk7XG4gICAgICAgIG5vZGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoc2VxKSk7XG4gICAgfSxcblxuICAgIHBsYXlCYXNlczogZnVuY3Rpb24oYmFzZXMpIHtcbiAgICAgICAgdmFyIHJlbW90ZUJhc2VzID0gW107XG4gICAgICAgIHZhciBiYXNlT2JqLG15QWdlbnQsYWdlbnQ7XG4gICAgICAgIHZhciB3YXJyaW9yTmFtZTtcbiAgICAgICAgdmFyIHdhcnJpb3JPYmo7XG4gICAgICAgIHZhciBiYXNlTmFtZSwga2luZ05vZGUsIGFnZW50Tm9kZSwga2luZ0Fycm93LHdhcnJpb3I7XG4gICAgICAgIHZhciBhY3RUeXBlLCBhdHRhY2tEdXJhLCBub3c7XG4gICAgICAgIHZhciB0bXBCID0ge307XG4gICAgICAgIHZhciBlb0RlYWQ7XG4gICAgICAgIHZhciBlbyA9IG51bGw7XG5cbiAgICAgICAgZm9yKHZhciBpPTA7aTxiYXNlcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICBhZ2VudCA9IGJhc2VzW2ldO1xuXG4gICAgICAgICAgICBiYXNlTmFtZSA9IFwiYmFzZVwiKyBhZ2VudC5vYmplY3RJZDtcbiAgICAgICAgICAgIGF0dGFja0R1cmEgPSBhZ2VudC5hdHRhY2tEdXJhO1xuICAgICAgICAgICAgbXlBZ2VudCA9IHRoaXMubnBjSW5mby5vYmplY3RGb3JLZXkoYWdlbnQuYWlkKS5iYXNlT2JqO1xuXG4gICAgICAgICAgICB0bXBCW2FnZW50LmFpZF0gPSBiYXNlTmFtZTtcbiAgICAgICAgICAgIHJlbW90ZUJhc2VzLnB1c2goYmFzZU5hbWUpO1xuICAgICAgICAgICAgYWN0VHlwZSA9IGFnZW50LmFjdFR5cGU7XG5cbiAgICAgICAgICAgIGlmKG15QWdlbnQpIHtcbiAgICAgICAgICAgICAgICBteUFnZW50LmdldENvbXBvbmVudChcIkJhc2VTcHJpdGVcIikuc2V0TGlmZShhZ2VudC5saWZlKTtcblxuICAgICAgICAgICAgICAgIHdhcnJpb3IgPSBteUFnZW50LmdldENoaWxkQnlOYW1lKFwid2FycmlvclwiKTtcbiAgICAgICAgICAgICAgICBpZih3YXJyaW9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHdhcnJpb3Iucm9sZSA9IFwibHJcIjtcbiAgICAgICAgICAgICAgICAgICAgYWdlbnROb2RlID0gdGhpcy5nZXRDb21wb25lbnRCeVJvbGUod2Fycmlvcik7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9pZiBubyBlbm1leSB0aGVuIHN0YW5kYnlcbiAgICAgICAgICAgICAgICAgICAgaWYobXlBZ2VudCAmJiBhZ2VudC5hY3RUeXBlPT1cIndhaXRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWdlbnROb2RlLnBsYXlCYXNlV2FycmlvckFuaW1hdGlvbkRlZmF1bHQoXCJtb3ZlXCIsIGFnZW50Lm9iamVjdElkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKG15QWdlbnQgJiYgYWdlbnQuYWN0VHlwZT09XCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2VudE5vZGUucGxheUJhc2VXYXJyaW9yQW5pbWF0aW9uKGFnZW50LCB0aGlzLm1haW5QbGF5ZXIsIFwic2FcIik7XG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2FycmlvciA9IG15QWdlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJndW5cIik7XG4gICAgICAgICAgICAgICAgaWYod2Fycmlvcikge1xuICAgICAgICAgICAgICAgICAgICB3YXJyaW9yLnJvbGUgPSBcImd1blwiO1xuICAgICAgICAgICAgICAgICAgICBhZ2VudE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEJ5Um9sZSh3YXJyaW9yKTtcblxuICAgICAgICAgICAgICAgICAgICAvL2lmIG5vIGVubWV5IHRoZW4gc3RhbmRieVxuICAgICAgICAgICAgICAgICAgICBpZihteUFnZW50ICYmIGFnZW50LmFjdFR5cGU9PVwid2FpdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2FnZW50Tm9kZS5wbGF5Rm9ydFdhcnJpb3JBbmltYXRpb25EZWZhdWx0KFwibW92ZVwiLCB0aGlzLm1haW5QbGF5ZXIsIGFnZW50Lm9iamVjdElkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKG15QWdlbnQgJiYgYWdlbnQuYWN0VHlwZT09XCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2VudE5vZGUucGxheUJhc2VXYXJyaW9yQW5pbWF0aW9uKGFnZW50LCB0aGlzLm1haW5QbGF5ZXIsIFwic2FcIik7XG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcGxheUFnZW50czogZnVuY3Rpb24oYWdlbnRzLCBhZ2VudHNGdXR1cmUpIHtcbiAgICAgICAgdmFyIG15QWdlbnQ7XG4gICAgICAgIHZhciBweCwgcHksIGFpZDtcbiAgICAgICAgdmFyIGFnZW50Tm9kZSxhZ2VudCxlbz1udWxsO1xuICAgICAgICB2YXIgZW9EZWFkO1xuXG4gICAgICAgIGZvcih2YXIgaT0wO2k8YWdlbnRzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGFnZW50ID0gYWdlbnRzW2ldO1xuICAgICAgICAgICAgbXlBZ2VudCA9IHRoaXMubnBjSW5mby5vYmplY3RGb3JLZXkoYWdlbnQuYWlkKTtcblxuICAgICAgICAgICAgaWYobXlBZ2VudCAmJiBteUFnZW50LnR5cGU9PVwiYWdlbnRcIikge1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50QnlSb2xlKG15QWdlbnQpO1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5wbGF5QW5pKGFnZW50LCB0aGlzLmdldEZ1dHVyZUFnZW50KGFnZW50LmFpZCwgYWdlbnRzRnV0dXJlKSwgdGhpcy5tYWluUGxheWVyKTtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUuc2V0TGlmZShhZ2VudC5saWZlKTtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUuc2V0R3JvdXBLaWxsKGFnZW50Lmdyb3VwS2lsbCk7XG5cbiAgICAgICAgICAgICAgICBweCA9IE1hdGgucm91bmQoKGFnZW50Lm15cG9zLngpKjMwKTtcbiAgICAgICAgICAgICAgICBweSA9IE1hdGgucm91bmQoKGFnZW50Lm15cG9zLnkpKjMwKTtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUudXBkYXRlUG9zKHB4LCBweSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcGxheUZvcnRzOiBmdW5jdGlvbihmb3J0cykge1xuICAgICAgICB2YXIgbXlBZ2VudDtcbiAgICAgICAgdmFyIGFnZW50Tm9kZSxhZ2VudCx3YXJyaW9yPW51bGw7XG5cbiAgICAgICAgZm9yKHZhciBpPTA7aTxmb3J0cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICBhZ2VudCA9IGZvcnRzW2ldO1xuICAgICAgICAgICAgbXlBZ2VudCA9IHRoaXMubnBjSW5mby5vYmplY3RGb3JLZXkoYWdlbnQuYWlkKTtcbiAgICAgICAgICAgIGlmKCFteUFnZW50KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBteUFnZW50LnJvbGUgPSBcImZhXCI7XG4gICAgICAgICAgICBhZ2VudE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEJ5Um9sZShteUFnZW50KTtcbiAgICAgICAgICAgIGFnZW50Tm9kZS5zZXRMaWZlKGFnZW50LmxpZmUpO1xuXG4gICAgICAgICAgICB3YXJyaW9yID0gbXlBZ2VudC5nZXRDaGlsZEJ5TmFtZShcIndhcnJpb3JcIik7XG4gICAgICAgICAgICB3YXJyaW9yLnJvbGUgPSBcImxyXCI7XG4gICAgICAgICAgICBhZ2VudE5vZGUgPSB0aGlzLmdldENvbXBvbmVudEJ5Um9sZSh3YXJyaW9yKTtcblxuICAgICAgICAgICAgLy9pZiBubyBlbm1leSB0aGVuIHN0YW5kYnlcbiAgICAgICAgICAgIGlmKG15QWdlbnQgJiYgYWdlbnQuYWN0VHlwZT09XCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhZ2VudE5vZGUucGxheUZvcnRXYXJyaW9yQW5pbWF0aW9uRGVmYXVsdChcIm1vdmVcIiwgYWdlbnQuaXNIZXJvLCB0aGlzLm1haW5QbGF5ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihteUFnZW50ICYmIGFnZW50LmFjdFR5cGU9PVwic2FcIikge1xuICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5wbGF5QmFzZVdhcnJpb3JBbmltYXRpb24oYWdlbnQsIHRoaXMubWFpblBsYXllciwgXCJzYVwiKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcGxheUxvZ3M6IGZ1bmN0aW9uKGxvZ3MpIHtcbiAgICAgICAgdmFyIGFnZW50LG15QWdlbnQ7XG4gICAgICAgIHZhciBweCwgcHksIGFpZDtcbiAgICAgICAgdmFyIGFnZW50Tm9kZSxidWxsZXQsZW89bnVsbDtcbiAgICAgICAgdmFyIHNjO1xuICAgICAgICB2YXIgbW92ZVRvO1xuXG4gICAgICAgIGZvcih2YXIgaT0wO2k8bG9ncy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICBhZ2VudCA9IGxvZ3NbaV07XG4gICAgICAgICAgICBteUFnZW50ID0gdGhpcy5ucGNJbmZvLm9iamVjdEZvcktleShhZ2VudC5haWQpO1xuXG4gICAgICAgICAgICBpZihteUFnZW50KSB7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlID0gdGhpcy5nZXRDb21wb25lbnRCeVJvbGUobXlBZ2VudCk7XG4gICAgICAgICAgICAgICAgYWdlbnROb2RlLm1vdmUoYWdlbnQubXlwb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHBsYXlCdWxsZXRzOiBmdW5jdGlvbihidWxsZXRzKSB7XG4gICAgICAgIHZhciBteUJ1bGxldDtcbiAgICAgICAgdmFyIHB4LCBweSwgYWlkO1xuICAgICAgICB2YXIgYWdlbnROb2RlLGJ1bGxldCxlbz1udWxsO1xuICAgICAgICB2YXIgc2M7XG4gICAgICAgIHZhciBtb3ZlVG8sIGJ1bGxldFJvdDtcblxuICAgICAgICBmb3IodmFyIGk9MDtpPGJ1bGxldHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgYnVsbGV0ID0gYnVsbGV0c1tpXTtcblxuICAgICAgICAgICAgbXlCdWxsZXQgPSB0aGlzLm5wY0luZm8ub2JqZWN0Rm9yS2V5KGJ1bGxldC5haWQpO1xuICAgICAgICAgICAgaWYobXlCdWxsZXQpIHtcbiAgICAgICAgICAgICAgICBteUJ1bGxldC5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgYWdlbnROb2RlID0gdGhpcy5nZXRDb21wb25lbnRCeVJvbGUobXlCdWxsZXQpO1xuXG4gICAgICAgICAgICAgICAgaWYobXlCdWxsZXQucm9sZSA9PSBcImJvbWJcIikge1xuICAgICAgICAgICAgICAgICAgICBzYyA9IHRoaXMuZ2V0RmlyZUJvbWJTY2FsZShidWxsZXQubXlwb3MsIGJ1bGxldC50YXJnZXRwb3MsIG15QnVsbGV0LnRhcmdldERpcywgbXlCdWxsZXQuc3RhcnRQb3MpO1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldC5zY2FsZVg9c2M7XG4gICAgICAgICAgICAgICAgICAgIG15QnVsbGV0LnNjYWxlWT1zYztcbi8qXG4gICAgICAgICAgICAgICAgICAgIHZhciByYW5kb21UaW1lID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkqNDApLTEwO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmggPSBteUJ1bGxldC5nZXRDaGlsZEJ5TmFtZShcImZpcmVIZWFkXCIpO1xuICAgICAgICAgICAgICAgICAgICAvL2ZoLnNrZXdZID0gcmFuZG9tVGltZTtcbiAgICAgICAgICAgICAgICAgICAgLy9maC5za2V3WCA9IHJhbmRvbVRpbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9maXJlIGJvbWIgc2l6ZSBjaGFuZ2luZyBhY2NvcmRpbmcgdG8gdGhlIGRpc3RhbmNlIGJldHdlZW4gdGFyZ2V0IGFuZCBvcmlnaW4uXG4gICAgICAgICAgICAgICAgICAgIHNjID0gdGhpcy5nZXRGaXJlQm9tYlNjYWxlKGJ1bGxldC5teXBvcywgYnVsbGV0LnRhcmdldHBvcywgbXlCdWxsZXQudGFyZ2V0RGlzLCBteUJ1bGxldC5zdGFydFBvcyk7XG4gICAgICAgICAgICAgICAgICAgIGFnZW50Tm9kZS5ub2RlLnNjYWxlWD1zYztcbiAgICAgICAgICAgICAgICAgICAgYWdlbnROb2RlLm5vZGUuc2NhbGVZPXNjO1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldC5nZXRDb21wb25lbnQoY2MuTW90aW9uU3RyZWFrKS5zdHJva2UgKj0gc2M7XG4qL1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vMiBmb3J0IGJ1bGxldCBlbWl0IHRoZSBzYW1lIHRpbWUsIG9ubHkgZGlzcGxheSB0aGUgcHJvcGVyIGJ1bGxldC5cbiAgICAgICAgICAgICAgICBpZihidWxsZXQudXBkb3duPT1cInVwXCIgJiYgdGhpcy5tYWluUGxheWVyPT0yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihidWxsZXQudXBkb3duPT1cImRvd25cIiAmJiB0aGlzLm1haW5QbGF5ZXI9PTEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHggPSAoYnVsbGV0Lm15cG9zLngpKjMwO1xuICAgICAgICAgICAgICAgIHB5ID0gKGJ1bGxldC5teXBvcy55KSozMDtcblxuXG4gICAgICAgICAgICAgICAgbW92ZVRvID0gY2MudjIocHgsIHB5KTtcblxuICAgICAgICAgICAgICAgIGJ1bGxldFJvdCA9IGJ1bGxldC5yb3Q7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5tYWluUGxheWVyID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0Um90ICs9IDE4MDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLzEwMDA6YWdlbnQsIDk5OTp0aGlzIGJ1bGxldCA5OTg6Zm9ydHM7XG4gICAgICAgICAgICAgICAgLy9tYWtlIGJ1bGxldCBkaXNwbGF5IHVuZGVyIGFnZW50IHdoaWNoIGlzIGF0IHNhbWUgcG9zaXRpb24uXG4gICAgICAgICAgICAgICAgbXlCdWxsZXQuekluZGV4ID0gMTAwMCtwYXJzZUludCgzMi1idWxsZXQubXlwb3MueSk7XG5cbiAgICAgICAgICAgICAgICAvL2lmIGJvbWIsIHRoZW4gc2hha2UgYSBsaXR0bGUgYml0O1xuICAgICAgICAgICAgICAgIGlmKG15QnVsbGV0LnJvbGUgPT0gXCJib21iXCIgfHwgbXlCdWxsZXQucm9sZSA9PSBcIndpemZpcmVcIikge1xuICAgICAgICAgICAgICAgICAgICBteUJ1bGxldC56SW5kZXggPSA5OTk5O1xuICAgICAgICAgICAgICAgICAgICAvL3ZhciByYW5kb21UaW1lID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkqNDApLTEwO1xuICAgICAgICAgICAgICAgICAgICAvL2J1bGxldFJvdCArPSByYW5kb21UaW1lO1xuICAgICAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgICAgICAvL3NpbmNlIDIuMS4xIHNldFJvdGF0aW9uIGlzIGRlc3BlcmF0ZWQuXG4gICAgICAgICAgICAgICAgbXlCdWxsZXQuYW5nbGUgPSAtMSpidWxsZXRSb3Q7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vbXlCdWxsZXQuc2V0Um90YXRpb24oYnVsbGV0Um90KTtcbiAgICAgICAgICAgICAgICBteUJ1bGxldC5zZXRQb3NpdGlvbihtb3ZlVG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldEZpcmVCb21iU2NhbGU6IGZ1bmN0aW9uKGJ1bGxldFBvcywgdGFyZ2V0UG9zLCB0YXJnZXREaXMsIHN0YXJ0UG9zKSB7XG4gICAgICAgIHZhciB4RGlmLCB5RGlmO1xuICAgICAgICB2YXIgbWlkUG9zID0ge307XG4gICAgICAgIG1pZFBvcy54ID0gc3RhcnRQb3MueCArICh0YXJnZXRQb3MueCAtIHN0YXJ0UG9zLngpLzI7XG4gICAgICAgIG1pZFBvcy55ID0gc3RhcnRQb3MueSArICh0YXJnZXRQb3MueSAtIHN0YXJ0UG9zLnkpLzI7XG4gICAgICAgIHZhciB4RGlmID0gYnVsbGV0UG9zLnggLSBtaWRQb3MueDtcbiAgICAgICAgdmFyIHlEaWYgPSBidWxsZXRQb3MueSAtIG1pZFBvcy55O1xuICAgICAgICB2YXIgZGlzID0gTWF0aC5zcXJ0KCh4RGlmICogeERpZikgKyAoeURpZiAqIHlEaWYpKTtcbiAgICAgICAgdmFyIHRhcmdldERpcyA9IHRhcmdldERpcyAqIDAuNTtcblxuICAgICAgICByZXR1cm4gKHRhcmdldERpcy1kaXMpKjAuNy90YXJnZXREaXMrMC41OyAgIC8vc2NhbGUgZnJvbSAwLjUgLS0gMS4yXG4gICAgfSxcblxuICAgIGVuZW1leURpc3RhbmNlOmZ1bmN0aW9uKHB4LHB5LGV4LGV5KSB7XG4gICAgICAgIHZhciB4RGlmLCB5RGlmLCBkaXM7XG4gICAgICAgIHhEaWYgPSBweCAtIGV4O1xuICAgICAgICB5RGlmID0gcHkgLSBleTtcbiAgICAgICAgZGlzID0gTWF0aC5zcXJ0KCh4RGlmICogeERpZikgKyAoeURpZiAqIHlEaWYpKTtcbiAgICAgICAgcmV0dXJuIGRpcztcbiAgICB9LFxuXG4gICAgZ2V0Q29tcG9uZW50QnlSb2xlKGFnZW50T2JqKSB7XG4gICAgICAgIHZhciByb2xlID0gYWdlbnRPYmoucm9sZTtcbiAgICAgICAgaWYocm9sZSA9PSBcInNrZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWdlbnRPYmouZ2V0Q29tcG9uZW50KCdTa2VTcHJpdGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJpclwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWdlbnRPYmouZ2V0Q29tcG9uZW50KCdTa2VTcHJpdGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJiZWVcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50T2JqLmdldENvbXBvbmVudCgnQmVlU3ByaXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyb2xlID09IFwid2l6XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhZ2VudE9iai5nZXRDb21wb25lbnQoJ1dpelNwcml0ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYocm9sZSA9PSBcImhyXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhZ2VudE9iai5nZXRDb21wb25lbnQoJ0hlcm9TcHJpdGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJsbVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWdlbnRPYmouZ2V0Q29tcG9uZW50KCdMaWdodG1hblNwcml0ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYocm9sZSA9PSBcImxyXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhZ2VudE9iai5nZXRDb21wb25lbnQoJ0FyY1Nwcml0ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYocm9sZSA9PSBcImdpXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhZ2VudE9iai5nZXRDb21wb25lbnQoJ0dpYW50U3ByaXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyb2xlID09IFwiYnVsbGV0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhZ2VudE9iai5nZXRDb21wb25lbnQoJ0Fycm93Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyb2xlID09IFwiYm9tYlwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWdlbnRPYmouZ2V0Q29tcG9uZW50KCdCb21iU2NyaXB0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihyb2xlID09IFwibG9nXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhZ2VudE9iai5nZXRDb21wb25lbnQoJ0xvZ1Nwcml0ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYocm9sZSA9PSBcImd1blwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWdlbnRPYmouZ2V0Q29tcG9uZW50KCdHdW5TcHJpdGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJiYXNlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhZ2VudE9iai5nZXRDb21wb25lbnQoJ0Jhc2VTcHJpdGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHJvbGUgPT0gXCJmYVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWdlbnRPYmouZ2V0Q29tcG9uZW50KCdCYXNlU3ByaXRlJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0S2lsbGVkRW5lbWllczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhaWRzID0gdGhpcy5yZW1vdmVkTnBjSW5mby5hbGxLZXlzKCk7XG4gICAgICAgIHZhciBhaWQ7XG4gICAgICAgIHZhciBraWxsZWRFbmVtaWVzID0gW107XG4gICAgICAgIC8vd2hlbiBvbmUgYXR0YWNrIGNhdXNlIG11bHRpIGtpbGxzIG9jY3VyZWQgaW4gb25lIGZyYW1lLCBtdWx0aSBlbmVtaWVzIG11c3QgYmUgaGFuZGxlZC4gXG4gICAgICAgIGZvcih2YXIgaT0wO2k8YWlkcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICBhaWQgPSBhaWRzW2ldO1xuICAgICAgICAgICAga2lsbGVkRW5lbWllcy5wdXNoKHRoaXMucmVtb3ZlZE5wY0luZm8ub2JqZWN0Rm9yS2V5KGFpZCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGtpbGxlZEVuZW1pZXM7XG4gICAgfSxcblxuICAgIGdldEZ1dHVyZUFnZW50OiBmdW5jdGlvbihhaWQsIGFnZW50c0Z1dHVyZSkge1xuICAgICAgICBmb3IodmFyIGk9MDtpPGFnZW50c0Z1dHVyZS5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICBpZihhZ2VudHNGdXR1cmVbaV0uYWlkID09IGFpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhZ2VudHNGdXR1cmVbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIGJsb29kRm9yQWdlbnQ6IGZ1bmN0aW9uIChhZ2VudCkge1xuICAgICAgICB2YXIgYmxvb2RPYmogPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsxMV0pO1xuICAgICAgICB2YXIgYmxvb2RPcCA9IGJsb29kT2JqLmdldENvbXBvbmVudChcIkJsb29kQmFyXCIpO1xuICAgICAgICBibG9vZE9wLnNldEJhckxldmVsKGFnZW50LmxldmVsKTtcblxuICAgICAgICBibG9vZE9iai5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgYWdlbnQuYWRkQ2hpbGQoYmxvb2RPYmopO1xuICAgICAgICByZXR1cm4gYmxvb2RPYmo7XG4gICAgfSxcblxuICAgIHNoYWRvd0ZvckFnZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzaGFkb3dPYmogPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYlsyXSk7XG4gICAgICAgIHNoYWRvd09iai5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHNoYWRvd09iaik7XG4gICAgICAgIHJldHVybiBzaGFkb3dPYmo7XG4gICAgfSxcblxuICAgIHNoYWRvd0ZvckxvZzogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2hhZG93T2JqID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJQcmVmYWJbMl0pO1xuICAgICAgICAvLyDlsIbmlrDlop7nmoToioLngrnmt7vliqDliLAgQ2FudmFzIOiKgueCueS4i+mdolxuXG4gICAgICAgIHNoYWRvd09iai5zY2FsZVggPSAxO1xuICAgICAgICBzaGFkb3dPYmouc2FjbGVZID0gMTtcbiAgICAgICAgc2hhZG93T2JqLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoc2hhZG93T2JqKTtcbiAgICAgICAgcmV0dXJuIHNoYWRvd09iajtcbiAgICB9LFxuXG4gICAgc2V0Q2xpY2tJdGVtOiBmdW5jdGlvbiAoc2VsZWN0KSB7XG4gICAgICAgIHRoaXMuY2xpY2tTZWxlID0gc2VsZWN0O1xuICAgIH0sXG5cbiAgICBwdXRDbGlja0l0ZW06IGZ1bmN0aW9uIChzZWxDYXJkLCBub2RlLCBwdCkge1xuICAgICAgICB2YXIgcHV0Tm9kZSA9IGNjLmluc3RhbnRpYXRlKG5vZGUpO1xuICAgICAgICB2YXIgaW5uZXJJZCA9IHRoaXMubmljayArXCJfXCIrIE51bWJlcihuZXcgRGF0ZSgpKTtcblxuICAgICAgICBwdXROb2RlLnggPSBwdC54O1xuICAgICAgICBwdXROb2RlLnkgPSBwdC55O1xuICAgICAgICBwdXROb2RlLm5hbWUgPSBpbm5lcklkO1xuICAgICAgICBwdXROb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHNlbENhcmQuYWRkQ2hpbGQocHV0Tm9kZSk7XG5cbiAgICAgICAgdGhpcy5wdXRTZWxlW2lubmVySWRdID0gcHV0Tm9kZTtcblxuICAgICAgICByZXR1cm4gaW5uZXJJZDtcbiAgICB9LFxuXG4gICAgc2V0RHJhZ0l0ZW06IGZ1bmN0aW9uIChwYXJhbXMsIG5vZGUpIHtcbiAgICAgICAgdmFyIGNhcmQgPSBwYXJhbXMudGFyZ2V0O1xuICAgICAgICB2YXIgZHJhZ05vZGUgPSBjYy5pbnN0YW50aWF0ZShub2RlKTtcbiAgICAgICAgdmFyIGlubmVySWQgPSB0aGlzLm5pY2sgK1wiX1wiKyBOdW1iZXIobmV3IERhdGUoKSk7XG5cbiAgICAgICAgbm9kZS54ID0gMDtcbiAgICAgICAgbm9kZS55ID0gMDtcbiAgICAgICAgZHJhZ05vZGUubmFtZSA9IGlubmVySWQ7XG4gICAgICAgIGRyYWdOb2RlLmFjdHZpZSA9IHRydWU7XG4gICAgICAgIGNhcmQuYWRkQ2hpbGQoZHJhZ05vZGUpO1xuXG4gICAgICAgIHRoaXMucHV0U2VsZVtpbm5lcklkXSA9IGRyYWdOb2RlO1xuICAgICAgICB0aGlzLmRyYWdnaW5nSXRlbSA9IGlubmVySWQ7XG5cbiAgICAgICAgcmV0dXJuIGlubmVySWQ7XG4gICAgfSxcblxuICAgIHVuc2V0RHJhZ0l0ZW06IGZ1bmN0aW9uIChpbm5lcklkKSB7XG4gICAgICAgIHRoaXMudW5zaG93RHJhZ01hc2soKTtcbiAgICAgICAgdGhpcy5kcmFnZ2luZ0l0ZW0gPSBcIlwiO1xuICAgICAgICB0aGlzLnB1dFNlbGVbaW5uZXJJZF0uZGVzdHJveSgpO1xuICAgICAgICB0aGlzLnB1dFNlbGVbaW5uZXJJZF0gPSBudWxsOyAgICAgXG4gICAgfSxcblxuICAgIG1vdmVEcmFnSXRlbTogZnVuY3Rpb24oc2VsLCBkZWx0YSkge1xuICAgICAgICBpZih0aGlzLnB1dFNlbGVbdGhpcy5kcmFnZ2luZ0l0ZW1dKSB7XG4gICAgICAgICAgICB0aGlzLnB1dFNlbGVbdGhpcy5kcmFnZ2luZ0l0ZW1dLnggKz0gZGVsdGEueDtcbiAgICAgICAgICAgIHRoaXMucHV0U2VsZVt0aGlzLmRyYWdnaW5nSXRlbV0ueSArPSBkZWx0YS55OyAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZih0aGlzLnB1dFNlbGVbdGhpcy5kcmFnZ2luZ0l0ZW1dLnkgPCAwKSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLnB1dFNlbGVbdGhpcy5kcmFnZ2luZ0l0ZW1dLnkgPSAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY2xlYXJEcmFnSXRlbTogZnVuY3Rpb24ocGFyYW0sIHNlbGVjdCkge1xuICAgICAgICB2YXIgaW5uZXJJZDtcbiAgICAgICAgdmFyIGNhcmQgPSBwYXJhbS50YXJnZXQ7XG4gICAgICAgIHZhciBzZWwgPSBjYXJkLl9uYW1lO1xuICAgICAgICB2YXIgcHQ9e307XG4gICAgICAgIHZhciBsYXlvdXRQdCA9IHRoaXMubm9kZS5wb3NpdGlvbjtcbiAgICAgICAgdmFyIHlPZmZzZXQ9MDtcbiAgICAgICAgdmFyIG1hZ2ljQ29zdCA9IHNlbGVjdC5tYWdpY0Nvc3Q7XG4gICAgICAgIHZhciBsZXZlbCA9IHNlbGVjdC5sZXZlbDtcbiAgICAgICAgdmFyIHJvbGUgPSBzZWxlY3Qucm9sZTtcblxuY29uc29sZS5sb2coXCJyb2xlOlwiICsgcm9sZSk7XG5cbiAgICAgICAgdGhpcy51bnNob3dEcmFnTWFzaygpO1xuXG4gICAgICAgIGlmKHRoaXMubWFpblBsYXllcj09MSkge1xuICAgICAgICAgICAgeU9mZnNldD0tNTA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB5T2Zmc2V0PTIwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5wdXRTZWxlW3RoaXMuZHJhZ2dpbmdJdGVtXSkge1xuICAgICAgICAgICAgaW5uZXJJZCA9IHRoaXMucHV0U2VsZVt0aGlzLmRyYWdnaW5nSXRlbV0ubmFtZTtcblxuICAgICAgICAgICAgLy9sYXlvdXQgbWF5YmUgc2NhbGVkIGFjY29yZGluZyB0byBkZXZpY2VzLlxuICAgICAgICAgICAgcHQueCA9ICh0aGlzLnB1dFNlbGVbdGhpcy5kcmFnZ2luZ0l0ZW1dLngrY2FyZC54LWxheW91dFB0LngpL3RoaXMubm9kZS5zY2FsZVg7XG4gICAgICAgICAgICBwdC55ID0gKHRoaXMucHV0U2VsZVt0aGlzLmRyYWdnaW5nSXRlbV0ueStjYXJkLnktbGF5b3V0UHQueSt5T2Zmc2V0KS90aGlzLm5vZGUuc2NhbGVZO1xuXG4gICAgICAgICAgICBpZighdGhpcy5pc1ZhbGlkUHV0UG9pbnQocHQpICYmICF0aGlzLmlmTm90TWFza1JvbGUocm9sZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImludmFsaWQgcG9zdGlvbi5cIik7XG4gICAgICAgICAgICAgICAgdGhpcy5wdXRTZWxlW2lubmVySWRdLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB0aGlzLnB1dFNlbGVbaW5uZXJJZF0gPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMucHV0RXJyb3JNc2coKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2VuZFNvZGllcihtYWdpY0Nvc3QsIHJvbGUsIHB0LCBpbm5lcklkLCBsZXZlbCk7XG4gICAgICAgICAgICB0aGlzLmRyYWdnaW5nSXRlbSA9IFwiXCI7XG4gICAgICAgIH0gXG4gICAgfSxcblxuICAgIHNlbmRTb2RpZXI6IGZ1bmN0aW9uKG1hZ2ljQ29zdCwgcm9sZSwgcHQsIGlubmVySWQsIGxldmVsKSB7XG4gICAgICAgIC8vdmFyIGlubmVySWQgPSB0aGlzLm5pY2sgK1wiX1wiKyBOdW1iZXIobmV3IERhdGUoKSk7XG4gICAgICAgIHZhciBpc0hlcm8gPSAodGhpcy5tYWluUGxheWVyPT0xKTtcbiAgICAgICAgdmFyIGJhciA9IHRoaXMuY2FudmFzTm9kZS5nZXRDaGlsZEJ5TmFtZShcIm1hZ2ljQmFyXCIpO1xuICAgICAgICB2YXIganVpY2UgPSBiYXIuZ2V0Q2hpbGRCeU5hbWUoXCJqdWljZVwiKTtcbiAgICAgICAgdmFyIGNvc3QgPSB0aGlzLnVzZU1hZ2ljKG1hZ2ljQ29zdCk7XG5cbiAgICAgICAgdGhpcy5wbGF5U25kKFwicHV0MVwiKTtcblxuICAgICAgICBpZihjb3N0KSB7XG4gICAgICAgICAgICBqdWljZS53aWR0aCA9IGNvc3Q7XG4gICAgICAgICAgICBNWV9TT0NLRVQuanNvbi5lbWl0KCdjbWQnLCB7J2lzSGVybyc6aXNIZXJvLCAncm9vbUlkJzogdGhpcy5yb29tSWQsICdpbm5lcklkJzogaW5uZXJJZCwgJ3JvbGUnOiByb2xlLCAncHQnOnB0LCAnbGV2ZWwnOmxldmVsfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnB1dFNlbGVbaW5uZXJJZF0uZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5wdXRTZWxlW2lubmVySWRdID0gbnVsbDsgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRNYWdpY0JhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBiYXIgPSB0aGlzLmNhbnZhc05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJtYWdpY0JhclwiKTtcbiAgICAgICAgdmFyIGp1aWNlID0gYmFyLmdldENoaWxkQnlOYW1lKFwianVpY2VcIik7XG5cbiAgICAgICAgaWYoanVpY2Uud2lkdGg8NjAwKSB7XG4gICAgICAgICAgICBqdWljZS53aWR0aCs9dGhpcy5hZGRKdWljZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGp1aWNlLndpZHRoJTUwID09IDApIHtcbiAgICAgICAgICAgIHRoaXMubWFnaWNBbW91bnQgPSBqdWljZS53aWR0aC81MDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FyZFN0YXR1cygpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVzZU1hZ2ljOiBmdW5jdGlvbihhbW91bnQpIHtcbiAgICAgICAgdmFyIGJhciA9IHRoaXMuY2FudmFzTm9kZS5nZXRDaGlsZEJ5TmFtZShcIm1hZ2ljQmFyXCIpO1xuICAgICAgICB2YXIganVpY2UgPSBiYXIuZ2V0Q2hpbGRCeU5hbWUoXCJqdWljZVwiKTtcbiAgICAgICAgdmFyIGFmdGVyVXNlID0ganVpY2Uud2lkdGgtYW1vdW50KjUwO1xuXG4gICAgICAgIGlmKGFmdGVyVXNlPj0wKSB7XG4gICAgICAgICAgICByZXR1cm4gYWZ0ZXJVc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICB1cGRhdGVDYXJkU3RhdHVzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBcInNlbFwiO1xuICAgICAgICB2YXIgbm9kZU5hbWUsIHNlbE5vZGU7XG4gICAgICAgIHZhciBzZWxTcHJpdGUgPSBudWxsO1xuXG4gICAgICAgIGZvcih2YXIgaT0xO2k8PTc7aSsrKSB7XG4gICAgICAgICAgICBub2RlTmFtZSA9IGhlYWQgKyBpO1xuICAgICAgICAgICAgc2VsTm9kZSA9IHRoaXMuY2FudmFzTm9kZS5nZXRDaGlsZEJ5TmFtZShub2RlTmFtZSk7XG4gICAgICAgICAgICBpZihzZWxOb2RlKSB7XG4gICAgICAgICAgICAgICAgc2VsU3ByaXRlID0gc2VsTm9kZS5nZXRDb21wb25lbnQoJ1NlbENhcmQnKTtcbiAgICAgICAgICAgICAgICBpZihzZWxTcHJpdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsU3ByaXRlLm1hZ2ljQ29zdCA8PSB0aGlzLm1hZ2ljQW1vdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxOb2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKDI1NSwyNTUsMjU1KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbE5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoMTI3LDEyNywxMjcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIl19