
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/EffectSprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0VmZmVjdFNwcml0ZS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInJvbGUiLCJzdGFydCIsIm5vZGUiLCJ6SW5kZXgiLCJzcGluRWZmZWN0RW5kRXZ0IiwiZGVzdHJveSIsIndpemZpcmVFZmZlY3RFbmRFdnQiLCJsaWdodEVmZmVjdEVuZEV2dCIsImZkX2ZyYW1lNUV2dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSDtBQUNJLGFBQVNELEVBQUUsQ0FBQ0UsU0FEaEI7QUFHSUMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLElBQUksRUFBQztBQURHLEdBSGhCO0FBT0k7QUFFQTtBQUVBQyxFQUFBQSxLQVhKLG1CQVdhO0FBQ0w7QUFDQSxRQUFHLEtBQUtELElBQUwsSUFBYSxJQUFoQixFQUFzQjtBQUNsQixXQUFLRSxJQUFMLENBQVVDLE1BQVYsR0FBbUIsSUFBbkI7QUFDSCxLQUZELE1BR0ssSUFBRyxLQUFLSCxJQUFMLElBQWEsWUFBaEIsRUFBOEI7QUFDL0IsV0FBS0UsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLElBQW5CO0FBQ0gsS0FGSSxDQUdMO0FBSEssU0FJQSxJQUFHLEtBQUtILElBQUwsSUFBYSxPQUFoQixFQUF5QjtBQUMxQixhQUFLRSxJQUFMLENBQVVDLE1BQVYsR0FBbUIsSUFBbkI7QUFDSCxPQUZJLE1BR0EsSUFBRyxLQUFLSCxJQUFMLElBQWEsYUFBaEIsRUFBK0I7QUFDaEMsYUFBS0UsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLElBQW5CO0FBQ0g7QUFDSixHQTFCTDtBQTRCSUMsRUFBQUEsZ0JBQWdCLEVBQUUsNEJBQVc7QUFDekIsU0FBS0YsSUFBTCxDQUFVRyxPQUFWO0FBQ0gsR0E5Qkw7QUFnQ0lDLEVBQUFBLG1CQUFtQixFQUFFLCtCQUFXO0FBQzVCLFNBQUtKLElBQUwsQ0FBVUcsT0FBVjtBQUNILEdBbENMO0FBb0NJRSxFQUFBQSxpQkFBaUIsRUFBRSw2QkFBVztBQUMxQixTQUFLTCxJQUFMLENBQVVHLE9BQVY7QUFDSCxHQXRDTDtBQXdDSUcsRUFBQUEsWUFBWSxFQUFFLHdCQUFXO0FBQ3JCLFNBQUtOLElBQUwsQ0FBVUMsTUFBVixHQUFtQixJQUFuQjtBQUNIO0FBMUNMLDhDQTRDa0Isd0JBQVc7QUFDckIsT0FBS0QsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLENBQUMsQ0FBcEI7QUFDSCxDQTlDTCxpREFnRHFCLDJCQUFXO0FBQ3hCLE9BQUtELElBQUwsQ0FBVUcsT0FBVjtBQUNILENBbERMLHFEQW9EeUIsK0JBQVc7QUFDNUIsT0FBS0gsSUFBTCxDQUFVRyxPQUFWO0FBQ0gsQ0F0REwiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHJvbGU6XCJcIixcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIC8vZmlyZSBkcm9wIGVmZmVjdFxuICAgICAgICBpZih0aGlzLnJvbGUgPT0gXCJmZFwiKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gOTk5OTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMucm9sZSA9PSBcImZpcmVjaXJjbGVcIikge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IDk5OTk7XG4gICAgICAgIH1cbiAgICAgICAgLy9saWdodG1hbiBhdHRhY2sgZWZmZWN0XG4gICAgICAgIGVsc2UgaWYodGhpcy5yb2xlID09IFwibGlnaHRcIikge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IDk5OTk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0aGlzLnJvbGUgPT0gXCJkb3VibGVNYWdpY1wiKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gOTk5OTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzcGluRWZmZWN0RW5kRXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgd2l6ZmlyZUVmZmVjdEVuZEV2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIGxpZ2h0RWZmZWN0RW5kRXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgZmRfZnJhbWU1RXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IDk5OTk7XG4gICAgfSxcblxuICAgIGZkX2ZyYW1lNUV2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAtMTtcbiAgICB9LFxuXG4gICAgZmRfRWZmZWN0RW5kRXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgZG91YmxlTWFnaWNfZGlzcEVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=