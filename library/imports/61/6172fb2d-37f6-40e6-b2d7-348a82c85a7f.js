"use strict";
cc._RF.push(module, '6172fstN/ZA5rLXNIqCyFp/', 'EffectSprite');
// scripts/EffectSprite.js

"use strict";

var _cc$Class;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
cc.Class((_cc$Class = {
  "extends": cc.Component,
  properties: {
    role: ""
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {
    //fire drop effect
    if (this.role == "fd") {
      this.node.zIndex = 9999;
    } else if (this.role == "firecircle") {
      this.node.zIndex = 9999;
    } //lightman attack effect
    else if (this.role == "light") {
        this.node.zIndex = 9999;
      } else if (this.role == "doubleMagic") {
        this.node.zIndex = 9999;
      }
  },
  spinEffectEndEvt: function spinEffectEndEvt() {
    this.node.destroy();
  },
  wizfireEffectEndEvt: function wizfireEffectEndEvt() {
    this.node.destroy();
  },
  lightEffectEndEvt: function lightEffectEndEvt() {
    this.node.destroy();
  },
  fd_frame5Evt: function fd_frame5Evt() {
    this.node.zIndex = 9999;
  }
}, _defineProperty(_cc$Class, "fd_frame5Evt", function fd_frame5Evt() {
  this.node.zIndex = -1;
}), _defineProperty(_cc$Class, "fd_EffectEndEvt", function fd_EffectEndEvt() {
  this.node.destroy();
}), _defineProperty(_cc$Class, "doubleMagic_dispEnd", function doubleMagic_dispEnd() {
  this.node.destroy();
}), _cc$Class));

cc._RF.pop();