
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/WizSprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '65407smWQ1HBIUtleJMXxyA', 'WizSprite');
// scripts/WizSprite.js

"use strict";

var mySprite = require("MySprite");

var common = require("Common");

cc.Class({
  "extends": mySprite,
  properties: {
    role: "wiz"
  },
  start: function start() {
    this._animation = this.getComponent(cc.Animation);
    this._animation.WrapMode = cc.WrapMode.Loop;
  },
  remove: function remove() {
    this._animation.play("dieoff2");

    this.shadow.destroy();
    this.blood.destroy();
  },
  dieStart: function dieStart() {
    console.log("die start");
  },
  dieEnd: function dieEnd() {
    console.log("die end");

    this._animation.play("footprint");
  },
  //ske clip ske_bomb, foot print start evt
  footStart: function footStart() {
    console.log("foot start");
  },
  footEnd: function footEnd() {
    console.log("foot end");
    this.node.destroy();
  },
  //ske clip ske_bomb, foot print start evt
  footPrint: function footPrint() {
    this.node.zIndex = -1;
    this.node.scaleX = 1;
    this.node.scaleY = 1;
  },
  //ske clip ske_bomb, called by first frame of ske_bomb
  beforeKill: function beforeKill() {//this.shadow.destroy();
  },
  //ske clip ske_bomb, called by last frame of ske_bomb
  afterKill: function afterKill() {
    console.log("--remove archer node--");
    this.node.destroy();
  },
  frame1Evt: function frame1Evt() {
    this.dispShadow(1);
  },
  frame2Evt: function frame2Evt() {
    this.dispShadow(2);
  },
  frame3Evt: function frame3Evt() {
    this.dispShadow(3);
  },
  frame4Evt: function frame4Evt() {
    this.dispShadow(4);
  },
  frame5Evt: function frame5Evt() {
    this.dispShadow(5);
  },
  frame6Evt: function frame6Evt() {
    this.dispShadow(6);
  },
  frame7Evt: function frame7Evt() {
    this.dispShadow(7);
  },
  aFrame1Evt: function aFrame1Evt() {
    this.dispShadow(1);
  },
  aFrame2Evt: function aFrame2Evt() {
    this.dispShadow(3);
  },
  aFrame3Evt: function aFrame3Evt() {
    this.dispShadow(5);
  },
  aFrame4Evt: function aFrame4Evt() {},
  aFrame5Evt: function aFrame5Evt() {
    this.dispShadow(7);
  },
  playAni: function playAni(agent, agentFuture, isMainPlayer) {
    this.playAngleAnimationRemote(agent, agentFuture, isMainPlayer);
  },
  isEnemyBase: function isEnemyBase(baseId) {
    if (baseId == 1 || baseId == 2 || baseId == 3) {
      return true;
    } else {
      return false;
    }
  },
  isEnemyFort: function isEnemyFort(isAgentHero, mainPlayer) {
    if (isAgentHero && mainPlayer == 2) {
      return true;
    }

    if (!isAgentHero && mainPlayer == 1) {
      return true;
    }

    return false;
  },
  playBaseWarriorAnimationDefault: function playBaseWarriorAnimationDefault(actType, baseId) {
    var actName;

    if (this.isEnemyBase(baseId)) {
      actName = "lr_s_walk";
    } else {
      actName = "lr_n_walk";
    }

    if (actType == "move" && this.lastAct == actName) {
      return;
    }

    var randomTime = Math.ceil(Math.random() * 125) / 100;

    this._animation.play(actName, randomTime);

    this.lastAct = actName;
  },
  playFortWarriorAnimationDefault: function playFortWarriorAnimationDefault(actType, isAgentHero, mainPlayer) {
    var actName;

    if (this.isEnemyFort(isAgentHero, mainPlayer)) {
      actName = "lr_s_walk";
    } else {
      actName = "lr_n_walk";
    }

    if (actType == "move" && this.lastAct == actName) {
      return;
    }

    var randomTime = Math.ceil(Math.random() * 125) / 100;

    this._animation.play(actName, randomTime);

    this.lastAct = actName;
  },
  playBaseWarriorAnimation: function playBaseWarriorAnimation(agent, isMainPlayer, actType) {
    var fx, fy;
    var targetYOffset = common.attackTargetYOffset;
    var ex, ey;
    var angle;
    var x = agent.mypos.x;
    var y = agent.mypos.y;
    var startPos, targetPos, startEPos, targetEPos, vt, vtE;
    var randomTime = Math.ceil(Math.random() * 125) / 100;
    var actName = "";
    var then;
    var angleInfo; // user to control the up and down user Y postion offset.

    var offsetDir = 1;

    if (isMainPlayer == 1) {
      offsetDir = 1;
    } else if (isMainPlayer == 2) {
      offsetDir = -1;
    }

    ex = agent.enemypos.x;
    ey = agent.enemypos.y; // dir according to enemy position

    startPos = cc.v2(x * 30, y * 30);
    targetPos = cc.v2(ex * 30, ey * 30 + targetYOffset * offsetDir);
    vt = startPos.sub(targetPos);

    if (vt.x == 0 && vt.y == 0) {
      return;
    } //if dir no changed, vt.x or vt.y is 0, atan value should be invaild


    if (vt.x == 0) {
      vt.x = 0.1;
    }

    if (vt.y == 0) {
      vt.y = 0.1;
    } //if postion not changed, do nothing, or the math.atan will do error.


    if (vt.x != 0 && vt.y != 0) {
      var ag = 180 / Math.PI * Math.atan(vt.x / vt.y);
      angle = ag;

      if (vt.y >= 0) {
        //when down to up
        angle = ag + 180;
      }
    }

    if (this._animation) {
      angleInfo = this.getActnameByAngle(angle, actType);
      actName = angleInfo.actName; //used to mirror a sprite.

      this.node.scaleX = angleInfo.scaleX; //if already in attack mode, just skip the animation

      if (this.lastAct != actName || actType == "sa") {
        if (actType == "sa") {
          this._animation.stop();

          this._animation.play(actName);
        } else {
          //walking action.
          this._animation.play(actName, randomTime);
        }

        this.angle = angle;
        this.lastAct = actName;
        this.lastScaleX = angleInfo.scaleX;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1dpelNwcml0ZS5qcyJdLCJuYW1lcyI6WyJteVNwcml0ZSIsInJlcXVpcmUiLCJjb21tb24iLCJjYyIsIkNsYXNzIiwicHJvcGVydGllcyIsInJvbGUiLCJzdGFydCIsIl9hbmltYXRpb24iLCJnZXRDb21wb25lbnQiLCJBbmltYXRpb24iLCJXcmFwTW9kZSIsIkxvb3AiLCJyZW1vdmUiLCJwbGF5Iiwic2hhZG93IiwiZGVzdHJveSIsImJsb29kIiwiZGllU3RhcnQiLCJjb25zb2xlIiwibG9nIiwiZGllRW5kIiwiZm9vdFN0YXJ0IiwiZm9vdEVuZCIsIm5vZGUiLCJmb290UHJpbnQiLCJ6SW5kZXgiLCJzY2FsZVgiLCJzY2FsZVkiLCJiZWZvcmVLaWxsIiwiYWZ0ZXJLaWxsIiwiZnJhbWUxRXZ0IiwiZGlzcFNoYWRvdyIsImZyYW1lMkV2dCIsImZyYW1lM0V2dCIsImZyYW1lNEV2dCIsImZyYW1lNUV2dCIsImZyYW1lNkV2dCIsImZyYW1lN0V2dCIsImFGcmFtZTFFdnQiLCJhRnJhbWUyRXZ0IiwiYUZyYW1lM0V2dCIsImFGcmFtZTRFdnQiLCJhRnJhbWU1RXZ0IiwicGxheUFuaSIsImFnZW50IiwiYWdlbnRGdXR1cmUiLCJpc01haW5QbGF5ZXIiLCJwbGF5QW5nbGVBbmltYXRpb25SZW1vdGUiLCJpc0VuZW15QmFzZSIsImJhc2VJZCIsImlzRW5lbXlGb3J0IiwiaXNBZ2VudEhlcm8iLCJtYWluUGxheWVyIiwicGxheUJhc2VXYXJyaW9yQW5pbWF0aW9uRGVmYXVsdCIsImFjdFR5cGUiLCJhY3ROYW1lIiwibGFzdEFjdCIsInJhbmRvbVRpbWUiLCJNYXRoIiwiY2VpbCIsInJhbmRvbSIsInBsYXlGb3J0V2FycmlvckFuaW1hdGlvbkRlZmF1bHQiLCJwbGF5QmFzZVdhcnJpb3JBbmltYXRpb24iLCJmeCIsImZ5IiwidGFyZ2V0WU9mZnNldCIsImF0dGFja1RhcmdldFlPZmZzZXQiLCJleCIsImV5IiwiYW5nbGUiLCJ4IiwibXlwb3MiLCJ5Iiwic3RhcnRQb3MiLCJ0YXJnZXRQb3MiLCJzdGFydEVQb3MiLCJ0YXJnZXRFUG9zIiwidnQiLCJ2dEUiLCJ0aGVuIiwiYW5nbGVJbmZvIiwib2Zmc2V0RGlyIiwiZW5lbXlwb3MiLCJ2MiIsInN1YiIsImFnIiwiUEkiLCJhdGFuIiwiZ2V0QWN0bmFtZUJ5QW5nbGUiLCJzdG9wIiwibGFzdFNjYWxlWCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxRQUFRLEdBQUdDLE9BQU8sQ0FBQyxVQUFELENBQXRCOztBQUNBLElBQUlDLE1BQU0sR0FBR0QsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBRUFFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0osUUFESjtBQUdMSyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsSUFBSSxFQUFDO0FBREcsR0FIUDtBQU9MQyxFQUFBQSxLQVBLLG1CQU9JO0FBQ0wsU0FBS0MsVUFBTCxHQUFrQixLQUFLQyxZQUFMLENBQWtCTixFQUFFLENBQUNPLFNBQXJCLENBQWxCO0FBQ0EsU0FBS0YsVUFBTCxDQUFnQkcsUUFBaEIsR0FBMkJSLEVBQUUsQ0FBQ1EsUUFBSCxDQUFZQyxJQUF2QztBQUNILEdBVkk7QUFZTEMsRUFBQUEsTUFBTSxFQUFFLGtCQUFXO0FBQ2YsU0FBS0wsVUFBTCxDQUFnQk0sSUFBaEIsQ0FBcUIsU0FBckI7O0FBQ0EsU0FBS0MsTUFBTCxDQUFZQyxPQUFaO0FBQ0EsU0FBS0MsS0FBTCxDQUFXRCxPQUFYO0FBQ0gsR0FoQkk7QUFrQkxFLEVBQUFBLFFBQVEsRUFBRSxvQkFBVztBQUNqQkMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksV0FBWjtBQUNILEdBcEJJO0FBc0JMQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVc7QUFDZkYsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksU0FBWjs7QUFDQSxTQUFLWixVQUFMLENBQWdCTSxJQUFoQixDQUFxQixXQUFyQjtBQUNILEdBekJJO0FBMkJMO0FBQ0FRLEVB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QUFTLEdBQUcsS0FBS1EsaUJBQUwsQ0FBdUJuQixLQUF2QixFQUE4QmYsT0FBOUIsQ0FBWjtBQUNBQyxNQUFBQSxPQUFPLEdBQUd5QixTQUFTLENBQUN6QixPQUFwQixDQUZnQixDQUloQjs7QUFDQSxXQUFLaEMsSUFBTCxDQUFVRyxNQUFWLEdBQW1Cc0QsU0FBUyxDQUFDdEQsTUFBN0IsQ0FMZ0IsQ0FPaEI7O0FBQ0EsVUFBRyxLQUFLOEIsT0FBTCxJQUFnQkQsT0FBaEIsSUFBMkJELE9BQU8sSUFBSSxJQUF6QyxFQUErQztBQUMzQyxZQUFHQSxPQUFPLElBQUksSUFBZCxFQUFvQjtBQUNoQixlQUFLL0MsVUFBTCxDQUFnQmtGLElBQWhCOztBQUNBLGVBQUtsRixVQUFMLENBQWdCTSxJQUFoQixDQUFxQjBDLE9BQXJCO0FBQ0gsU0FIRCxNQUdPO0FBQ0g7QUFDQSxlQUFLaEQsVUFBTCxDQUFnQk0sSUFBaEIsQ0FBcUIwQyxPQUFyQixFQUE4QkUsVUFBOUI7QUFDSDs7QUFDRCxhQUFLWSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFLYixPQUFMLEdBQWVELE9BQWY7QUFDQSxhQUFLbUMsVUFBTCxHQUFrQlYsU0FBUyxDQUFDdEQsTUFBNUI7QUFDSDtBQUNKO0FBRUo7QUE5T0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG15U3ByaXRlID0gcmVxdWlyZShcIk15U3ByaXRlXCIpO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoXCJDb21tb25cIik7XG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBteVNwcml0ZSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcm9sZTpcIndpelwiLFxuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbiA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbi5XcmFwTW9kZSA9IGNjLldyYXBNb2RlLkxvb3A7XG4gICAgfSxcblxuICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5KFwiZGllb2ZmMlwiKTtcbiAgICAgICAgdGhpcy5zaGFkb3cuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLmJsb29kLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgZGllU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImRpZSBzdGFydFwiKTtcbiAgICB9LFxuXG4gICAgZGllRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJkaWUgZW5kXCIpO1xuICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShcImZvb3RwcmludFwiKTtcbiAgICB9LFxuXG4gICAgLy9za2UgY2xpcCBza2VfYm9tYiwgZm9vdCBwcmludCBzdGFydCBldnRcbiAgICBmb290U3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImZvb3Qgc3RhcnRcIik7XG4gICAgfSxcblxuICAgIGZvb3RFbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImZvb3QgZW5kXCIpO1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICAvL3NrZSBjbGlwIHNrZV9ib21iLCBmb290IHByaW50IHN0YXJ0IGV2dFxuICAgIGZvb3RQcmludDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAtMTtcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IDE7XG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVkgPSAxO1xuICAgIH0sXG5cbiAgICAvL3NrZSBjbGlwIHNrZV9ib21iLCBjYWxsZWQgYnkgZmlyc3QgZnJhbWUgb2Ygc2tlX2JvbWJcbiAgICBiZWZvcmVLaWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy90aGlzLnNoYWRvdy5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIC8vc2tlIGNsaXAgc2tlX2JvbWIsIGNhbGxlZCBieSBsYXN0IGZyYW1lIG9mIHNrZV9ib21iXG4gICAgYWZ0ZXJLaWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCItLXJlbW92ZSBhcmNoZXIgbm9kZS0tXCIpO1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICBmcmFtZTFFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coMSk7XG4gICAgfSxcblxuICAgIGZyYW1lMkV2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdygyKTtcbiAgICB9LFxuXG4gICAgZnJhbWUzRXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDMpO1xuICAgIH0sXG5cbiAgICBmcmFtZTRFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coNCk7XG4gICAgfSxcblxuICAgIGZyYW1lNUV2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdyg1KTtcbiAgICB9LFxuXG4gICAgZnJhbWU2RXZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwU2hhZG93KDYpO1xuICAgIH0sXG5cbiAgICBmcmFtZTdFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coNyk7XG4gICAgfSxcblxuXG4gICAgYUZyYW1lMUV2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdygxKTtcbiAgICB9LFxuXG4gICAgYUZyYW1lMkV2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdygzKTtcbiAgICB9LFxuXG4gICAgYUZyYW1lM0V2dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcFNoYWRvdyg1KTtcbiAgICB9LFxuXG4gICAgYUZyYW1lNEV2dDogZnVuY3Rpb24oKSB7XG4gICAgfSxcblxuICAgIGFGcmFtZTVFdnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BTaGFkb3coNyk7XG4gICAgfSxcblxuICAgIHBsYXlBbmk6IGZ1bmN0aW9uKGFnZW50LCBhZ2VudEZ1dHVyZSwgaXNNYWluUGxheWVyKSB7XG4gICAgICAgIHRoaXMucGxheUFuZ2xlQW5pbWF0aW9uUmVtb3RlKGFnZW50LCBhZ2VudEZ1dHVyZSwgaXNNYWluUGxheWVyKTtcbiAgICB9LFxuXG4gICAgaXNFbmVteUJhc2U6IGZ1bmN0aW9uKGJhc2VJZCkge1xuICAgICAgICBpZihiYXNlSWQgPT0gMSB8fCBiYXNlSWQgPT0gMiB8fCBiYXNlSWQgPT0gMykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNFbmVteUZvcnQ6IGZ1bmN0aW9uKGlzQWdlbnRIZXJvLCBtYWluUGxheWVyKSB7XG4gICAgICAgIGlmKGlzQWdlbnRIZXJvICYmIG1haW5QbGF5ZXIgPT0gMikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gXG4gICAgICAgIGlmKCFpc0FnZW50SGVybyAmJiBtYWluUGxheWVyID09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IFxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHBsYXlCYXNlV2FycmlvckFuaW1hdGlvbkRlZmF1bHQ6IGZ1bmN0aW9uKGFjdFR5cGUsIGJhc2VJZCkge1xuICAgICAgICB2YXIgYWN0TmFtZTtcblxuICAgICAgICBpZih0aGlzLmlzRW5lbXlCYXNlKGJhc2VJZCkpIHtcbiAgICAgICAgICAgIGFjdE5hbWUgPSBcImxyX3Nfd2Fsa1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0TmFtZSA9IFwibHJfbl93YWxrXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiICYmIHRoaXMubGFzdEFjdCA9PSBhY3ROYW1lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmFuZG9tVGltZSA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpKjEyNSkvMTAwO1xuICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lLCByYW5kb21UaW1lKTtcbiAgICAgICAgdGhpcy5sYXN0QWN0ID0gYWN0TmFtZTtcbiAgICB9LFxuXG4gICAgcGxheUZvcnRXYXJyaW9yQW5pbWF0aW9uRGVmYXVsdDogZnVuY3Rpb24oYWN0VHlwZSwgaXNBZ2VudEhlcm8sIG1haW5QbGF5ZXIpIHtcbiAgICAgICAgdmFyIGFjdE5hbWU7XG5cbiAgICAgICAgaWYodGhpcy5pc0VuZW15Rm9ydChpc0FnZW50SGVybywgbWFpblBsYXllcikpIHtcbiAgICAgICAgICAgIGFjdE5hbWUgPSBcImxyX3Nfd2Fsa1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0TmFtZSA9IFwibHJfbl93YWxrXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiICYmIHRoaXMubGFzdEFjdCA9PSBhY3ROYW1lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmFuZG9tVGltZSA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpKjEyNSkvMTAwO1xuICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lLCByYW5kb21UaW1lKTtcbiAgICAgICAgdGhpcy5sYXN0QWN0ID0gYWN0TmFtZTtcbiAgICB9LFxuXG4gICAgcGxheUJhc2VXYXJyaW9yQW5pbWF0aW9uOiBmdW5jdGlvbihhZ2VudCwgaXNNYWluUGxheWVyLCBhY3RUeXBlKSB7XG4gICAgICAgIHZhciBmeCxmeTtcbiAgICAgICAgdmFyIHRhcmdldFlPZmZzZXQgPSBjb21tb24uYXR0YWNrVGFyZ2V0WU9mZnNldDtcbiAgICAgICAgdmFyIGV4LCBleTtcbiAgICAgICAgdmFyIGFuZ2xlO1xuICAgICAgICB2YXIgeCA9IGFnZW50Lm15cG9zLng7IFxuICAgICAgICB2YXIgeSA9IGFnZW50Lm15cG9zLnk7IFxuXG4gICAgICAgIHZhciBzdGFydFBvcyx0YXJnZXRQb3Msc3RhcnRFUG9zLCB0YXJnZXRFUG9zLCB2dCwgdnRFO1xuXG4gICAgICAgIHZhciByYW5kb21UaW1lID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkqMTI1KS8xMDA7XG4gICAgICAgIHZhciBhY3ROYW1lID0gXCJcIjtcbiAgICAgICAgdmFyIHRoZW47XG4gICAgICAgIHZhciBhbmdsZUluZm87XG5cbiAgICAgICAgLy8gdXNlciB0byBjb250cm9sIHRoZSB1cCBhbmQgZG93biB1c2VyIFkgcG9zdGlvbiBvZmZzZXQuXG4gICAgICAgIHZhciBvZmZzZXREaXIgPSAxO1xuXG4gICAgICAgIGlmKGlzTWFpblBsYXllciA9PSAxKSB7XG4gICAgICAgICAgICBvZmZzZXREaXIgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoaXNNYWluUGxheWVyID09IDIpIHtcbiAgICAgICAgICAgIG9mZnNldERpciA9IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgZXggPSBhZ2VudC5lbmVteXBvcy54OyBcbiAgICAgICAgZXkgPSBhZ2VudC5lbmVteXBvcy55OyBcblxuICAgICAgICAvLyBkaXIgYWNjb3JkaW5nIHRvIGVuZW15IHBvc2l0aW9uXG4gICAgICAgIHN0YXJ0UG9zICA9IGNjLnYyKCh4KSozMCwgKHkpKjMwKTtcbiAgICAgICAgdGFyZ2V0UG9zID0gY2MudjIoKGV4KSozMCwgKGV5KSozMCt0YXJnZXRZT2Zmc2V0Km9mZnNldERpcik7XG4gICAgICAgIHZ0ID0gc3RhcnRQb3Muc3ViKHRhcmdldFBvcyk7XG5cbiAgICAgICAgaWYodnQueCA9PSAwICYmIHZ0LnkgPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9pZiBkaXIgbm8gY2hhbmdlZCwgdnQueCBvciB2dC55IGlzIDAsIGF0YW4gdmFsdWUgc2hvdWxkIGJlIGludmFpbGRcbiAgICAgICAgaWYodnQueCA9PSAwKSB7XG4gICAgICAgICAgICB2dC54ID0gMC4xO1xuICAgICAgICB9XG4gICAgICAgIGlmKHZ0LnkgPT0gMCkge1xuICAgICAgICAgICAgdnQueSA9IDAuMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vaWYgcG9zdGlvbiBub3QgY2hhbmdlZCwgZG8gbm90aGluZywgb3IgdGhlIG1hdGguYXRhbiB3aWxsIGRvIGVycm9yLlxuICAgICAgICBpZih2dC54ICE9IDAgJiYgdnQueSAhPSAwKSB7XG4gICAgICAgICAgICB2YXIgYWcgPSAxODAvTWF0aC5QSSAqIE1hdGguYXRhbih2dC54L3Z0LnkpO1xuICAgICAgICAgICAgYW5nbGUgPSBhZztcbiAgICAgICAgICAgIGlmKHZ0LnkgPj0gMCkge1xuICAgICAgICAgICAgICAgIC8vd2hlbiBkb3duIHRvIHVwXG4gICAgICAgICAgICAgICAgYW5nbGUgPSBhZyArIDE4MDtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH0gXG5cbiAgICAgICAgaWYodGhpcy5fYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICBhbmdsZUluZm8gPSB0aGlzLmdldEFjdG5hbWVCeUFuZ2xlKGFuZ2xlLCBhY3RUeXBlKTtcbiAgICAgICAgICAgIGFjdE5hbWUgPSBhbmdsZUluZm8uYWN0TmFtZTtcblxuICAgICAgICAgICAgLy91c2VkIHRvIG1pcnJvciBhIHNwcml0ZS5cbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSBhbmdsZUluZm8uc2NhbGVYO1xuXG4gICAgICAgICAgICAvL2lmIGFscmVhZHkgaW4gYXR0YWNrIG1vZGUsIGp1c3Qgc2tpcCB0aGUgYW5pbWF0aW9uXG4gICAgICAgICAgICBpZih0aGlzLmxhc3RBY3QgIT0gYWN0TmFtZSB8fCBhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5KGFjdE5hbWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vd2Fsa2luZyBhY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5KGFjdE5hbWUsIHJhbmRvbVRpbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0QWN0ID0gYWN0TmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RTY2FsZVggPSBhbmdsZUluZm8uc2NhbGVYO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9LFxuXG59KTtcbiJdfQ==