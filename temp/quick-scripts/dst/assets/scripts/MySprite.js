
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/MySprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cd79aqd9HxCZLHw2ASr//Gc', 'MySprite');
// scripts/MySprite.js

"use strict";

var common = require("Common");

var agentObj = require("AgentObj");

cc.Class({
  "extends": agentObj,
  properties: {
    sprAtlas: cc.SpriteAtlas,
    wrapMode: cc.WrapMode.Loop,
    routes: [],
    lastAct: "",
    lastAngle: -1,
    life: -1,
    eid: -1
  },
  onLoad: function onLoad() {
    this.layoutOp = this.node.parent.getComponent("Game");
  },
  start: function start() {},
  ctor: function ctor() {},
  init: function init() {
    this.posX = 0;
    this.posY = 0;
    this.now = Date.now();
    this.angle = -999;
    this.groupKill = false;
    this.attacking = false;
    this._animation = this.getComponent(cc.Animation);
    this._animation.WrapMode = cc.WrapMode.Loop; //this._animation.on("lastframe", this.onend, this);
  },

  /*    
      setEnemy: function(enemyObj) {
          if(enemyObj) {
              this.eid = enemyObj.name;
              this.enemy = enemyObj;            
          } 
          else {
              this.eid = "";
              this.enemy = null;              
          }
      },
  
      onend: function(event) {
          var agentNode;
          if(this.enemy.isValid) {
              agentNode = this.enemy.getComponent('SkeSprite');
              agentNode.remove();
          } 
          //this.shootArrow(this.ox, this.oy, this.ex, this.ey, this.arrow);
      },
  */
  setInitPos: function setInitPos(px, py) {
    this.posX = px;
    this.posY = py;
    var pt = cc.v2(this.posX, this.posY);
    this.routes.push(pt);
  },
  updatePos: function updatePos(px, py) {
    var moveTo = cc.v2(px, py);
    var nx, ny;
    var ap = this.node.getAnchorPoint();
    var size = this.node.getContentSize();
    nx = (0.5 - ap.x) * size.width + px; //ny = (0.5-ap.y) * size.height + py;

    ny = py;
    var shadowMoveTo = cc.v2(nx, ny);
    this.node.setPosition(moveTo);

    if (this.shadow) {
      this.shadow.setPosition(moveTo);
    }

    return;
  },

  /*
      remove: function() {
          //this.node.scaleX = 0.3;
          //this.node.scaleY = 0.3;
          
          this._animation.play("dieoff2");
          this.shadow.destroy();
  
          //node destory in sprite afterkill func
          //this.node.destroy();
      },
  */
  dispShadow: function dispShadow(frameNo) {
    //shadow object may not ready in init() when playing
    if (!this.shadow) return;
    var shadowNode = this.shadow;
    var frameImg = "ske_shadow/e/ske_walk_e" + frameNo;
    var act = this.lastAct;
    if (!act) return;
    var actTmp = this.lastAct.split("_");
    var actDir = actTmp[1];
    var actType = actTmp[2];
    var scaleX = this.lastScaleX;

    if (actDir == "en1" || actDir == "en2" || actDir == "en3") {
      frameImg = "ske_shadow/en/ske_walk_en" + frameNo;
    } else if (actDir == "se1" || actDir == "se2" || actDir == "se3") {
      frameImg = "ske_shadow/se/ske_walk_se" + frameNo;
    } else if (actDir == "s") {
      frameImg = "ske_shadow/s/ske_walk_s" + frameNo;
    } else if (actDir == "n") {
      frameImg = "ske_shadow/n/ske_walk_n" + frameNo;
    } else if (actDir == "e") {
      frameImg = "ske_shadow/e/ske_walk_e" + frameNo;
    }

    this.shadow.active = true;
    cc.loader.loadRes(frameImg, cc.SpriteFrame, function (err, spriteFrame) {
      if (shadowNode) {
        try {
          if (shadowNode._name != "") {
            shadowNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          }
        } catch (e) {
          console.log(shadowNode);
          console.log(e);
        }
      }
    });
  },

  /*
      move: function(pt) {
          if(this.removeFlag) {
              return;
          }
  
          var len = this.routes.length;
          var moveTo;
  
          if(len == 0) return;
          if(len == 1) {
              moveTo = this.routes[0];
          } else {
              moveTo = this.routes.shift();     
          }
  
          this.node.setPosition(moveTo);
          if(this.shadow && this.shadow.isValid) {
              this.shadow.setPosition(moveTo);     
          }
      },
  
      setAction: function() {
          var eastAnimFrames = [],
              str = "",
              frame,
              animation;
  
          for (var i = 1; i <= 4; i++) {        
              str = "c5u" + i;
              frame = this.sprAtlas.getSpriteFrame(str);
              eastAnimFrames.push(frame);
          }
  
          //animation = new cc.Animation(eastAnimFrames);
  
          var clip = cc.AnimationClip.createWithSpriteFrames(eastAnimFrames,frames.length);
          clip.name = "anim_001";
          clip.speed = 0.08;
          clip.sample = 4;
          clip.wrapMode = this.wrapMode;
          this._animation.addClip(clip);
      },
  
      playAnimation: function (wrapMode = cc.WrapMode.Default, speed = 0.5, sample = 60) {
          if(this._animation) {
              var animState = this._animation.getAnimationState("anim_001");
              animState.clip.wrapMode = wrapMode;
              animState.clip.speed = speed;
              animState.clip.sample = sample;
              animState.repeatCount = Infinity;
              this._animation.play("anim_001");
          }
      },
  
      setInitAct: function(angle, actType) {
          var angleInfo = this.getActnameByAngle(angle, actType);
          this.lastAct = angleInfo.actName;
      },
  
      getActnameByAngle_bak: function(angle, actType) {
          var actName="";
          var scaleX = 1;
          var ret = {};
  
          if(angle>=0 && angle<=11.25*1) {
              if(actType == "move") {
                  actName = "n_walk";
              }
              else if(actType == "sa") {
                  actName = "n_attack";
              }
          }
          else if(angle>11.25*1 && angle<=11.25*3) {
              if(actType == "move") {
                  actName = "en3_walk";
              }
              else if(actType == "sa") {
                  actName = "en3_attack";
              }
          }
          else if(angle>11.25*3 && angle<=11.25*5) {
              if(actType == "move") {
                  actName = "en2_walk";
              }
              else if(actType == "sa") {
                  actName = "en2_attack";
              }
          }
          else if(angle>11.25*5 && angle<=11.25*7) {
              if(actType == "move") {
                  actName = "en1_walk";
              }
              else if(actType == "sa") {
                  actName = "en1_attack";
              }
          }
          else if(angle>11.25*7 && angle<=11.25*9) {
              if(actType == "move") {
                  actName = "e_walk";
              }
              else if(actType == "sa") {
                  actName = "e_attack";
              }
          }
          else if(angle>11.25*9 && angle<=11.25*11) {
              if(actType == "move") {
                  actName = "se1_walk";
              }
              else if(actType == "sa") {
                  actName = "se1_attack";
              }
          }
          else if(angle>11.25*11 && angle<=11.25*13) {
              if(actType == "move") {
                  actName = "se2_walk";
              }
              else if(actType == "sa") {
                  actName = "se2_attack";
              }
          }
          else if(angle>11.25*13 && angle<=11.25*15) {
              if(actType == "move") {
                  actName = "se3_walk";
              }
              else if(actType == "sa") {
                  actName = "se3_attack";
              }
          }
          else if(angle>11.25*15 || angle<=180) {
              if(actType == "move") {
                  actName = "s_walk";
              }
              else if(actType == "sa") {
                  actName = "s_attack";
              }
          }
  
  
          else if(angle<0 && angle>=11.25*-1) {
              if(actType == "move") {
                  actName = "n_walk";
              }
              else if(actType == "sa") {
                  actName = "n_attack";
              }
              //scaleX = -1;
          }
          else if(angle<11.25*-1 && angle>=11.25*-3) {
              if(actType == "move") {
                  actName = "en3_walk";
              }
              else if(actType == "sa") {
                  actName = "en3_attack";
              }
              //scaleX = -1;
          }
          else if(angle<11.25*-3 && angle>=11.25*-5) {
              if(actType == "move") {
                  actName = "en2_walk";
              }
              else if(actType == "sa") {
                  actName = "en2_attack";
              }
  
              //scaleX = -1;
          }
          else if(angle<11.25*-5 && angle>=11.25*-7) {
              if(actType == "move") {
                  actName = "en1_walk";
              }
              else if(actType == "sa") {
                  actName = "en1_attack";
              }
  
              //scaleX = -1;
          }
          else if(angle<11.25*-7 && angle>=11.25*-9) {
              if(actType == "move") {
                  actName = "e_walk";
              }
              else if(actType == "sa") {
                  actName = "e_attack";
              }
  
              scaleX = -1;
          }
          else if(angle<11.25*-9 && angle>=11.25*-11) {
              if(actType == "move") {
                  actName = "se1_walk";
              }
              else if(actType == "sa") {
                  actName = "se1_attack";
              }
  
              scaleX = -1;
          }
          else if(angle<11.25*-11 && angle>=11.25*-13) {
              if(actType == "move") {
                  actName = "se2_walk";
              }
              else if(actType == "sa") {
                  actName = "se2_attack";
              }
  
              scaleX = -1;
          }
          else if(angle<11.25*-13 && angle>=11.25*-15) {
              if(actType == "move") {
                  actName = "se3_walk";
              }
              else if(actType == "sa") {
                  actName = "se3_attack";
              }
  
              scaleX = -1;
          } 
          else if(angle<11.25*-15 && angle>-180) {
              if(actType == "move") {
                  actName = "s_walk";
              }
              else if(actType == "sa") {
                  actName = "s_attack";
              }
  
              scaleX = -1;
          }
  
          else {
              console.log("------:"+angle);
          }
  
          actName = this.role +"_"+ actName;
  
          ret.actName = actName;
          ret.scaleX = scaleX;
          return ret;
      },
  */
  getActnameByAngle: function getActnameByAngle(angle, actType) {
    var actName = "";
    var scaleX = 1;
    var ret = {};
    var specialActname = false;

    if (angle > 22.5 * -1 && angle <= 22.5 * 1) {
      if (actType == "move") {
        actName = "n_walk";
      } else if (actType == "sa") {
        actName = "n_attack";
      }
    } else if (angle > 22.5 * 1 && angle <= 22.5 * 3) {
      if (actType == "move") {
        actName = "en2_walk";
      } else if (actType == "sa") {
        actName = "en2_attack";
      }
    } else if (angle > 22.5 * 3 && angle <= 22.5 * 5) {
      if (actType == "move") {
        actName = "e_walk";
      } else if (actType == "sa") {
        actName = "e_attack";
      }
    } else if (angle > 22.5 * 5 && angle <= 22.5 * 7) {
      if (actType == "move") {
        actName = "se2_walk";
      } else if (actType == "sa") {
        actName = "se2_attack";
      }
    } else if (angle > 22.5 * 7 || angle < -22.5 * 9) {
      if (actType == "move") {
        actName = "s_walk";
      } else if (actType == "sa") {
        actName = "s_attack";
      }
    } else if (angle < 22.5 * -1 && angle >= 22.5 * -3) {
      if (actType == "move") {
        actName = "en2_walk";
      } else if (actType == "sa") {
        actName = "en2_attack";
      }

      scaleX = -1;
    } else if (angle < 22.5 * -3 && angle >= 22.5 * -5) {
      if (actType == "move") {
        actName = "e_walk";
      } else if (actType == "sa") {
        actName = "e_attack";
      }

      scaleX = -1;
    } else if (angle < 22.5 * -5 && angle >= 22.5 * -7) {
      if (actType == "move") {
        actName = "se2_walk";
      } else if (actType == "sa") {
        // start attack
        actName = "se2_attack";
      }

      scaleX = -1;
    } else if (angle < 22.5 * -7) {
      if (actType == "move") {
        actName = "s_walk";
      } else if (actType == "sa") {
        // start attack
        actName = "s_attack";
      }

      scaleX = -1;
    } else {
      console.log("----error angle--------------:" + angle);
    }

    actName = this.role + "_" + actName;
    specialActname = this.specialAct(actType);

    if (specialActname) {
      actName = specialActname;
    }

    ret.actName = actName;
    ret.scaleX = scaleX;
    return ret;
  },
  specialAct: function specialAct(actType) {
    // if just 1 vs 1 attack
    if (!this.groupKill) {
      return false;
    }

    if (actType == "sa" && this.role == "hr") {
      return "hr_all_kill";
    }

    return false;
  },
  setId: function setId(aid) {
    this.aid = aid; //var event = new cc.Event.EventCustom("event_effect", true);
    //event.detail = "123";
    //this.node.dispatchEvent(event);
  },
  hide: function hide() {
    this.node.active = false;
  },
  setShadow: function setShadow(shadow) {
    this.shadow = shadow;
    this.shadow.active = true;
  },
  getAgentAngle: function getAgentAngle(oPos, dPos, tanAngle) {
    var dx, dy, ox, oy;
    var angle;
    dx = dPos.x;
    dy = dPos.y;
    ox = oPos.x;
    oy = oPos.y;

    if (dx - ox > 0 && dy - oy > 0) {
      angle = tanAngle;
    } else if (dx - ox > 0 && dy - oy < 0) {
      angle = 180 - tanAngle;
    } else if (dx - ox < 0 && dy - oy < 0) {
      angle = 180 + tanAngle;
    } else if (dx - ox < 0 && dy - oy > 0) {
      angle = 0 - tanAngle;
    } else if (dx - ox == 0 && dy - oy > 0) {
      angle = 0;
    } else if (dx - ox == 0 && dy - oy < 0) {
      angle = 180;
    } else if (dy - oy == 0 && dx - ox > 0) {
      angle = 90;
    } else if (dy - oy == 0 && dx - ox < 0) {
      angle = -90;
    } else {
      console.log("wrong angle in Func MySprite->getAgentAngle()");
    }

    return angle;
  },
  ifFlyAgent: function ifFlyAgent(role) {
    if (role == "bee") {
      return true;
    }

    return false;
  },
  playAngleAnimationNear: function playAngleAnimationNear(agent, agentFuture, isMainPlayer) {
    if (this.attacking) {
      return;
    }

    var startPos = cc.v2(agent.mypos.x, agent.mypos.y);
    var enemyPos = cc.v2(agent.enemypos.x, agent.enemypos.y);
    var zorder = 1000 + parseInt(32 - agent.mypos.y);
    var randomTime = Math.ceil(Math.random() * 125) / 100;
    var actName = "";
    var actType = agent.actType;
    var fx,
        fy,
        vt,
        ag = 0,
        targetPos,
        angleInfo;
    var x = agent.mypos.x;
    var y = agent.mypos.y;
    var ex = agent.enemypos.x;
    var ey = agent.enemypos.y;
    var distance = startPos.sub(enemyPos).mag();
    var attackDistance; // fly agent should hover over any other agent.

    if (!this.ifFlyAgent(agent.role)) {
      this.node.zIndex = zorder;
    }

    this.node.scaleX = 1;

    if (this._animation) {
      attackDistance = this.getAttackDistance(agent); //1.5 is the distance ajustment variable, should be ajust according to each agent size.
      //attackDistance = (agent.size + agent.esize)*0.5*1.5;

      if (distance <= attackDistance) {
        // dir according to enemy position
        startPos = cc.v2(x, y);
        targetPos = cc.v2(ex, ey);
        vt = targetPos.sub(startPos); //if dir no changed, vt.x or vt.y is 0, atan value should be invaild

        if (vt.x == 0) {
          vt.x = 0.1;
        }

        if (vt.y == 0) {
          vt.y = 0.1;
        }

        if (vt.x != 0 && vt.y != 0) {
          ag = 180 / Math.PI * Math.atan(Math.abs(vt.x / vt.y));
        }

        ag = this.getAgentAngle(agent.mypos, {
          "x": ex,
          "y": ey
        }, ag);

        if (ag > 180) {
          ag = ag - 360;
        }

        angleInfo = this.getActnameByAngle(ag, "sa");
        actName = angleInfo.actName; //used to mirror a sprite.

        this.node.scaleX = angleInfo.scaleX;
      } else {
        if (agentFuture) {
          fx = agentFuture.enemypos.x;
          fy = agentFuture.enemypos.y;
        } else {
          fx = agent.enemypos.x;
          fy = agent.enemypos.y;
        }

        startPos = cc.v2(x, y);
        targetPos = cc.v2(fx, fy);
        vt = targetPos.sub(startPos); //if dir no changed, vt.x or vt.y is 0, atan value should be invaild

        if (vt.x == 0) {
          vt.x = 0.1;
        }

        if (vt.y == 0) {
          vt.y = 0.1;
        }

        if (vt.x != 0 && vt.y != 0) {
          ag = 180 / Math.PI * Math.atan(Math.abs(vt.x / vt.y));
        }

        ag = this.getAgentAngle(agent.mypos, {
          "x": fx,
          "y": fy
        }, ag);

        if (ag > 180) {
          ag = ag - 360;
        }

        angleInfo = this.getActnameByAngle(ag, "move");
        actName = angleInfo.actName; //used to mirror a sprite.

        this.node.scaleX = angleInfo.scaleX;
      } //blood bar may flip when agent flip, should make it back.


      this.blood.scaleX = this.node.scaleX;

      if (this.lastAct != actName) {
        if (distance <= attackDistance) {
          this._animation.play(actName); //if(this.playEffect !== undefined) {
          //    this.playEffect();
          //}

        } else if (!this.attacking) {
          this._animation.play(actName, randomTime);
        }

        this.lastAct = actName;
        this.lastScaleX = angleInfo.scaleX;
      }
    }
  },
  playAngleAnimationRemote: function playAngleAnimationRemote(agent, agentFuture, isMainPlayer) {
    var fx, fy, actType;
    var ag = 0;
    var x = agent.mypos.x;
    var y = agent.mypos.y;
    var ex = agent.enemypos.x;
    var ey = agent.enemypos.y;
    var startPos, targetPos, startEPos, targetEPos, vt, vtE;

    var _self = this;

    var zorder = 1000 + parseInt(32 - y); //total animator duration is 1.25s, so take a random time from 0-1.25 to prevent same action

    var randomTime = Math.ceil(Math.random() * 125) / 100;
    var actName = "";
    var then;
    var angleInfo;
    actType = agent.actType;

    if (actType == "ia" || actType == "ea") {
      return;
    }

    ag = agent.rot;
    this.node.zIndex = zorder;
    this.node.scaleX = 1;

    if (actType == "sa") {
      //start attack
      // dir according to enemy position
      startPos = cc.v2(x * 30, y * 30);
      targetPos = cc.v2(ex * 30, ey * 30);
      vt = targetPos.sub(startPos); //if dir no changed, vt.x or vt.y is 0, atan value should be invaild

      if (vt.x == 0) {
        vt.x = 0.1;
      }

      if (vt.y == 0) {
        vt.y = 0.1;
      }

      if (vt.x != 0 && vt.y != 0) {
        //ag = 180/Math.PI * Math.atan(Math.abs(vt.y/vt.x));
        ag = 180 / Math.PI * Math.atan(Math.abs(vt.x / vt.y));
        ag = this.getAgentAngle(agent.mypos, {
          "x": ex,
          "y": ey
        }, ag);
      }
    }

    if (actType == "move") {
      if (agentFuture) {
        fx = agentFuture.enemypos.x;
        fy = agentFuture.enemypos.y; //future acttype maybe ia instead of move or sa, in this case should not be handled.

        if (agentFuture && agentFuture.actType != "ia") {
          actType = agentFuture.actType;
        }
      } else {
        fx = agent.enemypos.x;
        fy = agent.enemypos.y;

        if (agentFuture && agentFuture.actType != "ia") {
          actType = agentFuture.actType;
        }
      }

      startPos = cc.v2(x * 30, y * 30);
      targetPos = cc.v2(fx * 30, fy * 30);
      vt = targetPos.sub(startPos); //if dir no changed, vt.x or vt.y is 0, atan value should be invaild

      if (vt.x == 0) {
        vt.x = 0.1;
      }

      if (vt.y == 0) {
        vt.y = 0.1;
      }

      if (vt.x != 0 && vt.y != 0) {
        ag = 180 / Math.PI * Math.atan(Math.abs(vt.x / vt.y));
        ag = this.getAgentAngle(agent.mypos, {
          "x": fx,
          "y": fy
        }, ag);
      }
    }

    if (this._animation) {
      angleInfo = this.getActnameByAngle(ag, actType);
      actName = angleInfo.actName; //used to mirror a sprite.

      this.node.scaleX = angleInfo.scaleX; //blood bar may flip when agent flip, should make it back.

      this.blood.scaleX = this.node.scaleX; //if already in attack mode, just skip the animation

      if (this.lastAct != actName || actType == "sa") {
        if (actType == "sa") {
          this._animation.stop();

          this._animation.play(actName);
        } else {
          //walking action.
          this._animation.play(actName, randomTime);
        }

        this.lastAct = actName;
        this.lastScaleX = angleInfo.scaleX;
      }
    }
    /*
            if(this._animation) {
                angleInfo = this.getActnameByAngle(angle, actType);
                actName = angleInfo.actName;
                this.node.scaleX = angleInfo.scaleX;
    
                //if already in attack mode, just skip the animation
                if(this.lastAct != actName) {
                    then = Date.now();
                    // to avoid changing dir frequently. agent would looks tremble otherwise.
                    if(then - this.now > 100) {
                        this._animation.play(actName, randomTime);
                        this.angle = angle;
                        this.now = then;
                    }
                }
    
                //if(this.lastAct != actName && actType=="sa") {
                //    var _self = this;
                //    var animState = this._animation.getAnimationState(actName);
                //    if (animState) {
                //        animState.on('lastframe', (event) => {}, this);
                //    }
                //}
    
                this.lastAct = actName;
    
                this.lastScaleX = angleInfo.scaleX;
            }
    */


    this.lastActType = actType;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL015U3ByaXRlLmpzIl0sIm5hbWVzIjpbImNvbW1vbiIsInJlcXVpcmUiLCJhZ2VudE9iaiIsImNjIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwic3ByQXRsYXMiLCJTcHJpdGVBdGxhcyIsIndyYXBNb2RlIiwiV3JhcE1vZGUiLCJMb29wIiwicm91dGVzIiwibGFzdEFjdCIsImxhc3RBbmdsZSIsImxpZmUiLCJlaWQiLCJvbkxvYWQiLCJsYXlvdXRPcCIsIm5vZGUiLCJwYXJlbnQiLCJnZXRDb21wb25lbnQiLCJzdGFydCIsImN0b3IiLCJpbml0IiwicG9zWCIsInBvc1kiLCJub3ciLCJEYXRlIiwiYW5nbGUiLCJncm91cEtpbGwiLCJhdHRhY2tpbmciLCJfYW5pbWF0aW9uIiwiQW5pbWF0aW9uIiwic2V0SW5pdFBvcyIsInB4IiwicHkiLCJwdCIsInYyIiwicHVzaCIsInVwZGF0ZVBvcyIsIm1vdmVUbyIsIm54IiwibnkiLCJhcCIsImdldEFuY2hvclBvaW50Iiwic2l6ZSIsImdldENvbnRlbnRTaXplIiwieCIsIndpZHRoIiwic2hhZG93TW92ZVRvIiwic2V0UG9zaXRpb24iLCJzaGFkb3ciLCJkaXNwU2hhZG93IiwiZnJhbWVObyIsInNoYWRvd05vZGUiLCJmcmFtZUltZyIsImFjdCIsImFjdFRtcCIsInNwbGl0IiwiYWN0RGlyIiwiYWN0VHlwZSIsInNjYWxlWCIsImxhc3RTY2FsZVgiLCJhY3RpdmUiLCJsb2FkZXIiLCJsb2FkUmVzIiwiU3ByaXRlRnJhbWUiLCJlcnIiLCJzcHJpdGVGcmFtZSIsIl9uYW1lIiwiU3ByaXRlIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJnZXRBY3RuYW1lQnlBbmdsZSIsImFjdE5hbWUiLCJyZXQiLCJzcGVjaWFsQWN0bmFtZSIsInJvbGUiLCJzcGVjaWFsQWN0Iiwic2V0SWQiLCJhaWQiLCJoaWRlIiwic2V0U2hhZG93IiwiZ2V0QWdlbnRBbmdsZSIsIm9Qb3MiLCJkUG9zIiwidGFuQW5nbGUiLCJkeCIsImR5Iiwib3giLCJveSIsInkiLCJpZkZseUFnZW50IiwicGxheUFuZ2xlQW5pbWF0aW9uTmVhciIsImFnZW50IiwiYWdlbnRGdXR1cmUiLCJpc01haW5QbGF5ZXIiLCJzdGFydFBvcyIsIm15cG9zIiwiZW5lbXlQb3MiLCJlbmVteXBvcyIsInpvcmRlciIsInBhcnNlSW50IiwicmFuZG9tVGltZSIsIk1hdGgiLCJjZWlsIiwicmFuZG9tIiwiZngiLCJmeSIsInZ0IiwiYWciLCJ0YXJnZXRQb3MiLCJhbmdsZUluZm8iLCJleCIsImV5IiwiZGlzdGFuY2UiLCJzdWIiLCJtYWciLCJhdHRhY2tEaXN0YW5jZSIsInpJbmRleCIsImdldEF0dGFja0Rpc3RhbmNlIiwiUEkiLCJhdGFuIiwiYWJzIiwiYmxvb2QiLCJwbGF5IiwicGxheUFuZ2xlQW5pbWF0aW9uUmVtb3RlIiwic3RhcnRFUG9zIiwidGFyZ2V0RVBvcyIsInZ0RSIsIl9zZWxmIiwidGhlbiIsInJvdCIsInN0b3AiLCJsYXN0QWN0VHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxNQUFNLEdBQUdDLE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUNBLElBQUlDLFFBQVEsR0FBR0QsT0FBTyxDQUFDLFVBQUQsQ0FBdEI7O0FBRUFFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0YsUUFESjtBQUdMRyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsUUFBUSxFQUFFSCxFQUFFLENBQUNJLFdBREw7QUFFUkMsSUFBQUEsUUFBUSxFQUFFTCxFQUFFLENBQUNNLFFBQUgsQ0FBWUMsSUFGZDtBQUdSQyxJQUFBQSxNQUFNLEVBQUMsRUFIQztBQUlSQyxJQUFBQSxPQUFPLEVBQUMsRUFKQTtBQUtSQyxJQUFBQSxTQUFTLEVBQUMsQ0FBQyxDQUxIO0FBTVJDLElBQUFBLElBQUksRUFBQyxDQUFDLENBTkU7QUFPUkMsSUFBQUEsR0FBRyxFQUFDLENBQUM7QUFQRyxHQUhQO0FBYUxDLEVBQUFBLE1BYkssb0JBYUs7QUFDTixTQUFLQyxRQUFMLEdBQWdCLEtBQUtDLElBQUwsQ0FBVUMsTUFBVixDQUFpQkMsWUFBakIsQ0FBOEIsTUFBOUIsQ0FBaEI7QUFDSCxHQWZJO0FBaUJMQyxFQUFBQSxLQWpCSyxtQkFpQkksQ0FDUixDQWxCSTtBQW9CTEMsRUFBQUEsSUFwQkssa0JBb0JFLENBQ04sQ0FyQkk7QUF1QkxDLEVBQUFBLElBQUksRUFBRSxnQkFBVztBQUNiLFNBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLENBQVo7QUFDQSxTQUFLQyxHQUFMLEdBQVdDLElBQUksQ0FBQ0QsR0FBTCxFQUFYO0FBQ0EsU0FBS0UsS0FBTCxHQUFhLENBQUMsR0FBZDtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBRUEsU0FBS0MsVUFBTCxHQUFrQixLQUFLWCxZQUFMLENBQWtCakIsRUFBRSxDQUFDNkIsU0FBckIsQ0FBbEI7QUFDQSxTQUFLRCxVQUFMLENBQWdCdEIsUUFBaEIsR0FBMkJOLEVBQUUsQ0FBQ00sUUFBSCxDQUFZQyxJQUF2QyxDQVRhLENBVWI7QUFDSCxHQWxDSTs7QUFvQ1Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCSXVCLEVBQUFBLFVBQVUsRUFBRSxvQkFBU0MsRUFBVCxFQUFhQyxFQUFiLEVBQWlCO0FBQ3pCLFNBQUtYLElBQUwsR0FBWVUsRUFBWjtBQUNBLFNBQUtULElBQUwsR0FBWVUsRUFBWjtBQUNBLFFBQUlDLEVBQUUsR0FBR2pDLEVBQUUsQ0FBQ2tDLEVBQUgsQ0FBTSxLQUFLYixJQUFYLEVBQWlCLEtBQUtDLElBQXRCLENBQVQ7QUFFQSxTQUFLZCxNQUFMLENBQVkyQixJQUFaLENBQWlCRixFQUFqQjtBQUNILEdBaEVJO0FBa0VMRyxFQUFBQSxTQUFTLEVBQUUsbUJBQVNMLEVBQVQsRUFBYUMsRUFBYixFQUFpQjtBQUN4QixRQUFJSyxNQUFNLEdBQUdyQyxFQUFFLENBQUNrQyxFQUFILENBQU1ILEVBQU4sRUFBVUMsRUFBVixDQUFiO0FBQ0EsUUFBSU0sRUFBSixFQUFPQyxFQUFQO0FBQ0EsUUFBSUMsRUFBRSxHQUFHLEtBQUt6QixJQUFMLENBQVUwQixjQUFWLEVBQVQ7QUFDQSxRQUFJQyxJQUFJLEdBQUcsS0FBSzNCLElBQUwsQ0FBVTRCLGNBQVYsRUFBWDtBQUVBTCxJQUFBQSxFQUFFLEdBQUcsQ0FBQyxNQUFJRSxFQUFFLENBQUNJLENBQVIsSUFBYUYsSUFBSSxDQUFDRyxLQUFsQixHQUEwQmQsRUFBL0IsQ0FOd0IsQ0FPeEI7O0FBQ0FRLElBQUFBLEVBQUUsR0FBR1AsRUFBTDtBQUVBLFFBQUljLFlBQVksR0FBRzlDLEVBQUUsQ0FBQ2tDLEVBQUgsQ0FBTUksRUFBTixFQUFVQyxFQUFWLENBQW5CO0FBRUEsU0FBS3hCLElBQUwsQ0FBVWdDLFdBQVYsQ0FBc0JWLE1BQXRCOztBQUVBLFFBQUcsS0FBS1csTUFBUixFQUFnQjtBQUNaLFdBQUtBLE1BQUwsQ0FBWUQsV0FBWixDQUF3QlYsTUFBeEI7QUFDSDs7QUFDRDtBQUNILEdBcEZJOztBQXNGVDs7Ozs7Ozs7Ozs7O0FBYUlZLEVBQUFBLFVBQVUsRUFBRSxvQkFBU0MsT0FBVCxFQUFrQjtBQUMxQjtBQUNBLFFBQUcsQ0FBQyxLQUFLRixNQUFULEVBQWlCO0FBRWpCLFFBQUlHLFVBQVUsR0FBRyxLQUFLSCxNQUF0QjtBQUNBLFFBQUlJLFFBQVEsR0FBRyw0QkFBMEJGLE9BQXpDO0FBQ0EsUUFBSUcsR0FBRyxHQUFHLEtBQUs1QyxPQUFmO0FBRUEsUUFBRyxDQUFDNEMsR0FBSixFQUFTO0FBRVQsUUFBSUMsTUFBTSxHQUFHLEtBQUs3QyxPQUFMLENBQWE4QyxLQUFiLENBQW1CLEdBQW5CLENBQWI7QUFFQSxRQUFJQyxNQUFNLEdBQUdGLE1BQU0sQ0FBQyxDQUFELENBQW5CO0FBQ0EsUUFBSUcsT0FBTyxHQUFHSCxNQUFNLENBQUMsQ0FBRCxDQUFwQjtBQUNBLFFBQUlJLE1BQU0sR0FBRyxLQUFLQyxVQUFsQjs7QUFFQSxRQUFHSCxNQUFNLElBQUksS0FBVixJQUFtQkEsTUFBTSxJQUFJLEtBQTdCLElBQXNDQSxNQUFNLElBQUksS0FBbkQsRUFBMEQ7QUFDdERKLE1BQUFBLFFBQVEsR0FBRyw4QkFBNEJGLE9BQXZDO0FBQ0gsS0FGRCxNQUdLLElBQUdNLE1BQU0sSUFBSSxLQUFWLElBQW1CQSxNQUFNLElBQUksS0FBN0IsSUFBc0NBLE1BQU0sSUFBSSxLQUFuRCxFQUEwRDtBQUMzREosTUFBQUEsUUFBUSxHQUFHLDhCQUE0QkYsT0FBdkM7QUFDSCxLQUZJLE1BR0EsSUFBR00sTUFBTSxJQUFJLEdBQWIsRUFBa0I7QUFDbkJKLE1BQUFBLFFBQVEsR0FBRyw0QkFBMEJGLE9BQXJDO0FBQ0gsS0FGSSxNQUdBLElBQUdNLE1BQU0sSUFBSSxHQUFiLEVBQWtCO0FBQ25CSixNQUFBQSxRQUFRLEdBQUcsNEJBQTBCRixPQUFyQztBQUNILEtBRkksTUFHQSxJQUFHTSxNQUFNLElBQUksR0FBYixFQUFrQjtBQUNuQkosTUFBQUEsUUFBUSxHQUFHLDRCQUEwQkYsT0FBckM7QUFDSDs7QUFFRCxTQUFLRixNQUFMLENBQVlZLE1BQVosR0FBcUIsSUFBckI7QUFDQTVELElBQUFBLEVBQUUsQ0FBQzZELE1BQUgsQ0FBVUMsT0FBVixDQUFrQlYsUUFBbEIsRUFBNEJwRCxFQUFFLENBQUMrRCxXQUEvQixFQUE0QyxVQUFVQyxHQUFWLEVBQWVDLFdBQWYsRUFBNEI7QUFDcEUsVUFBR2QsVUFBSCxFQUFlO0FBQ1gsWUFBSTtBQUNBLGNBQUdBLFVBQVUsQ0FBQ2UsS0FBWCxJQUFvQixFQUF2QixFQUEyQjtBQUN2QmYsWUFBQUEsVUFBVSxDQUFDbEMsWUFBWCxDQUF3QmpCLEVBQUUsQ0FBQ21FLE1BQTNCLEVBQW1DRixXQUFuQyxHQUFpREEsV0FBakQ7QUFDSDtBQUNKLFNBSkQsQ0FJRSxPQUFPRyxDQUFQLEVBQVU7QUFDUkMsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVluQixVQUFaO0FBQ0FrQixVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsQ0FBWjtBQUNIO0FBQ0o7QUFDSixLQVhEO0FBWUgsR0FoSkk7O0FBa0pUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdQSUcsRUFBQUEsaUJBQWlCLEVBQUUsMkJBQVM5QyxLQUFULEVBQWdCZ0MsT0FBaEIsRUFBeUI7QUFDeEMsUUFBSWUsT0FBTyxHQUFDLEVBQVo7QUFDQSxRQUFJZCxNQUFNLEdBQUcsQ0FBYjtBQUNBLFFBQUllLEdBQUcsR0FBRyxFQUFWO0FBQ0EsUUFBSUMsY0FBYyxHQUFHLEtBQXJCOztBQUVBLFFBQUdqRCxLQUFLLEdBQUMsT0FBSyxDQUFDLENBQVosSUFBaUJBLEtBQUssSUFBRSxPQUFLLENBQWhDLEVBQW1DO0FBQy9CLFVBQUdnQyxPQUFPLElBQUksTUFBZCxFQUFzQjtBQUNsQmUsUUFBQUEsT0FBTyxHQUFHLFFBQVY7QUFDSCxPQUZELE1BR0ssSUFBR2YsT0FBTyxJQUFJLElBQWQsRUFBb0I7QUFDckJlLFFBQUFBLE9BQU8sR0FBRyxVQUFWO0FBQ0g7QUFDSixLQVBELE1BUUssSUFBRy9DLEtBQUssR0FBQyxPQUFLLENBQVgsSUFBZ0JBLEtBQUssSUFBRSxPQUFLLENBQS9CLEVBQWtDO0FBQ25DLFVBQUdnQyxPQUFPLElBQUksTUFBZCxFQUFzQjtBQUNsQmUsUUFBQUEsT0FBTyxHQUFHLFVBQVY7QUFDSCxPQUZELE1BR0ssSUFBR2YsT0FBTyxJQUFJLElBQWQsRUFBb0I7QUFDckJlLFFBQUFBLE9BQU8sR0FBRyxZQUFWO0FBQ0g7QUFDSixLQVBJLE1BUUEsSUFBRy9DLEtBQUssR0FBQyxPQUFLLENBQVgsSUFBZ0JBLEtBQUssSUFBRSxPQUFLLENBQS9CLEVBQWtDO0FBQ25DLFVBQUdnQyxPQUFPLElBQUksTUFBZCxFQUFzQjtBQUNsQmUsUUFBQUEsT0FBTyxHQUFHLFFBQVY7QUFDSCxPQUZELE1BR0ssSUFBR2YsT0FBTyxJQUFJLElBQWQsRUFBb0I7QUFDckJlLFFBQUFBLE9BQU8sR0FBRyxVQUFWO0FBQ0g7QUFDSixLQVBJLE1BUUEsSUFBRy9DLEtBQUssR0FBQyxPQUFLLENBQVgsSUFBZ0JBLEtBQUssSUFBRSxPQUFLLENBQS9CLEVBQWtDO0FBQ25DLFVBQUdnQyxPQUFPLElBQUksTUFBZCxFQUFzQjtBQUNsQmUsUUFBQUEsT0FBTyxHQUFHLFVBQVY7QUFDSCxPQUZELE1BR0ssSUFBR2YsT0FBTyxJQUFJLElBQWQsRUFBb0I7QUFDckJlLFFBQUFBLE9BQU8sR0FBRyxZQUFWO0FBQ0g7QUFDSixLQVBJLE1BUUEsSUFBRy9DLEtBQUssR0FBQyxPQUFLLENBQVgsSUFBZ0JBLEtBQUssR0FBQyxDQUFDLElBQUQsR0FBTSxDQUEvQixFQUFrQztBQUNuQyxVQUFHZ0MsT0FBTyxJQUFJLE1BQWQsRUFBc0I7QUFDbEJlLFFBQUFBLE9BQU8sR0FBRyxRQUFWO0FBQ0gsT0FGRCxNQUdLLElBQUdmLE9BQU8sSUFBSSxJQUFkLEVBQW9CO0FBQ3JCZSxRQUFBQSxPQUFPLEdBQUcsVUFBVjtBQUNIO0FBQ0osS0FQSSxNQVNBLElBQUcvQyxLQUFLLEdBQUMsT0FBSyxDQUFDLENBQVosSUFBaUJBLEtBQUssSUFBRSxPQUFLLENBQUMsQ0FBakMsRUFBb0M7QUFDckMsVUFBR2dDLE9BQU8sSUFBSSxNQUFkLEVBQXNCO0FBQ2xCZSxRQUFBQSxPQUFPLEdBQUcsVUFBVjtBQUNILE9BRkQsTUFHSyxJQUFHZixPQUFPLElBQUksSUFBZCxFQUFvQjtBQUNyQmUsUUFBQUEsT0FBTyxHQUFHLFlBQVY7QUFDSDs7QUFFRGQsTUFBQUEsTUFBTSxHQUFHLENBQUMsQ0FBVjtBQUNILEtBVEksTUFVQSxJQUFHakMsS0FBSyxHQUFDLE9BQUssQ0FBQyxDQUFaLElBQWlCQSxLQUFLLElBQUUsT0FBSyxDQUFDLENBQWpDLEVBQW9DO0FBQ3JDLFVBQUdnQyxPQUFPLElBQUksTUFBZCxFQUFzQjtBQUNsQmUsUUFBQUEsT0FBTyxHQUFHLFFBQVY7QUFDSCxPQUZELE1BR0ssSUFBR2YsT0FBTyxJQUFJLElBQWQsRUFBb0I7QUFDckJlLFFBQUFBLE9BQU8sR0FBRyxVQUFWO0FBQ0g7O0FBRURkLE1BQUFBLE1BQU0sR0FBRyxDQUFDLENBQVY7QUFDSCxLQVRJLE1BVUEsSUFBR2pDLEtBQUssR0FBQyxPQUFLLENBQUMsQ0FBWixJQUFpQkEsS0FBSyxJQUFFLE9BQUssQ0FBQyxDQUFqQyxFQUFvQztBQUNyQyxVQUFHZ0MsT0FBTyxJQUFJLE1BQWQsRUFBc0I7QUFDbEJlLFFBQUFBLE9BQU8sR0FBRyxVQUFWO0FBQ0gsT0FGRCxNQUdLLElBQUdmLE9BQU8sSUFBSSxJQUFkLEVBQW9CO0FBQUc7QUFDeEJlLFFBQUFBLE9BQU8sR0FBRyxZQUFWO0FBQ0g7O0FBRURkLE1BQUFBLE1BQU0sR0FBRyxDQUFDLENBQVY7QUFDSCxLQVRJLE1BVUEsSUFBSWpDLEtBQUssR0FBQyxPQUFLLENBQUMsQ0FBaEIsRUFBa0I7QUFDbkIsVUFBR2dDLE9BQU8sSUFBSSxNQUFkLEVBQXNCO0FBQ2xCZSxRQUFBQSxPQUFPLEdBQUcsUUFBVjtBQUNILE9BRkQsTUFHSyxJQUFHZixPQUFPLElBQUksSUFBZCxFQUFvQjtBQUFJO0FBQ3pCZSxRQUFBQSxPQUFPLEdBQUcsVUFBVjtBQUNIOztBQUVEZCxNQUFBQSxNQUFNLEdBQUcsQ0FBQyxDQUFWO0FBQ0gsS0FUSSxNQVVBO0FBQ0RXLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1DQUFpQzdDLEtBQTdDO0FBQ0g7O0FBRUQrQyxJQUFBQSxPQUFPLEdBQUcsS0FBS0csSUFBTCxHQUFXLEdBQVgsR0FBZ0JILE9BQTFCO0FBRUFFLElBQUFBLGNBQWMsR0FBRyxLQUFLRSxVQUFMLENBQWdCbkIsT0FBaEIsQ0FBakI7O0FBQ0EsUUFBR2lCLGNBQUgsRUFBbUI7QUFDZkYsTUFBQUEsT0FBTyxHQUFHRSxjQUFWO0FBQ0g7O0FBRURELElBQUFBLEdBQUcsQ0FBQ0QsT0FBSixHQUFjQSxPQUFkO0FBQ0FDLElBQUFBLEdBQUcsQ0FBQ2YsTUFBSixHQUFhQSxNQUFiO0FBQ0EsV0FBT2UsR0FBUDtBQUNILEdBdmVJO0FBeWVMRyxFQUFBQSxVQUFVLEVBQUUsb0JBQVNuQixPQUFULEVBQWtCO0FBQzFCO0FBQ0EsUUFBRyxDQUFDLEtBQUsvQixTQUFULEVBQW9CO0FBQ2hCLGFBQU8sS0FBUDtBQUNIOztBQUNELFFBQUcrQixPQUFPLElBQUksSUFBWCxJQUFtQixLQUFLa0IsSUFBTCxJQUFhLElBQW5DLEVBQXlDO0FBQ3JDLGFBQU8sYUFBUDtBQUNIOztBQUNELFdBQU8sS0FBUDtBQUNILEdBbGZJO0FBb2ZMRSxFQUFBQSxLQUFLLEVBQUUsZUFBU0MsR0FBVCxFQUFjO0FBQ2pCLFNBQUtBLEdBQUwsR0FBV0EsR0FBWCxDQURpQixDQUdqQjtBQUNBO0FBQ0E7QUFDSCxHQTFmSTtBQTRmTEMsRUFBQUEsSUFBSSxFQUFFLGdCQUFXO0FBQ2IsU0FBS2hFLElBQUwsQ0FBVTZDLE1BQVYsR0FBbUIsS0FBbkI7QUFDSCxHQTlmSTtBQWdnQkxvQixFQUFBQSxTQUFTLEVBQUUsbUJBQVNoQyxNQUFULEVBQWlCO0FBQ3hCLFNBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtBLE1BQUwsQ0FBWVksTUFBWixHQUFxQixJQUFyQjtBQUNILEdBbmdCSTtBQXFnQkxxQixFQUFBQSxhQUFhLEVBQUUsdUJBQVNDLElBQVQsRUFBZUMsSUFBZixFQUFxQkMsUUFBckIsRUFBK0I7QUFDMUMsUUFBSUMsRUFBSixFQUFPQyxFQUFQLEVBQVVDLEVBQVYsRUFBYUMsRUFBYjtBQUNBLFFBQUkvRCxLQUFKO0FBRUE0RCxJQUFBQSxFQUFFLEdBQUdGLElBQUksQ0FBQ3ZDLENBQVY7QUFDQTBDLElBQUFBLEVBQUUsR0FBR0gsSUFBSSxDQUFDTSxDQUFWO0FBQ0FGLElBQUFBLEVBQUUsR0FBR0wsSUFBSSxDQUFDdEMsQ0FBVjtBQUNBNEMsSUFBQUEsRUFBRSxHQUFHTixJQUFJLENBQUNPLENBQVY7O0FBRUEsUUFBR0osRUFBRSxHQUFDRSxFQUFILEdBQU0sQ0FBTixJQUFXRCxFQUFFLEdBQUNFLEVBQUgsR0FBTSxDQUFwQixFQUF1QjtBQUNuQi9ELE1BQUFBLEtBQUssR0FBRzJELFFBQVI7QUFDSCxLQUZELE1BR0ssSUFBR0MsRUFBRSxHQUFDRSxFQUFILEdBQU0sQ0FBTixJQUFXRCxFQUFFLEdBQUNFLEVBQUgsR0FBTSxDQUFwQixFQUF1QjtBQUN4Qi9ELE1BQUFBLEtBQUssR0FBRyxNQUFJMkQsUUFBWjtBQUNILEtBRkksTUFHQSxJQUFHQyxFQUFFLEdBQUNFLEVBQUgsR0FBTSxDQUFOLElBQVdELEVBQUUsR0FBQ0UsRUFBSCxHQUFNLENBQXBCLEVBQXVCO0FBQ3hCL0QsTUFBQUEsS0FBSyxHQUFHLE1BQUkyRCxRQUFaO0FBQ0gsS0FGSSxNQUdBLElBQUdDLEVBQUUsR0FBQ0UsRUFBSCxHQUFNLENBQU4sSUFBV0QsRUFBRSxHQUFDRSxFQUFILEdBQU0sQ0FBcEIsRUFBdUI7QUFDeEIvRCxNQUFBQSxLQUFLLEdBQUcsSUFBRTJELFFBQVY7QUFDSCxLQUZJLE1BR0EsSUFBR0MsRUFBRSxHQUFDRSxFQUFILElBQU8sQ0FBUCxJQUFZRCxFQUFFLEdBQUNFLEVBQUgsR0FBTSxDQUFyQixFQUF3QjtBQUN6Qi9ELE1BQUFBLEtBQUssR0FBRyxDQUFSO0FBQ0gsS0FGSSxNQUdBLElBQUc0RCxFQUFFLEdBQUNFLEVBQUgsSUFBTyxDQUFQLElBQVlELEVBQUUsR0FBQ0UsRUFBSCxHQUFNLENBQXJCLEVBQXdCO0FBQ3pCL0QsTUFBQUEsS0FBSyxHQUFHLEdBQVI7QUFDSCxLQUZJLE1BR0EsSUFBRzZELEVBQUUsR0FBQ0UsRUFBSCxJQUFPLENBQVAsSUFBWUgsRUFBRSxHQUFDRSxFQUFILEdBQU0sQ0FBckIsRUFBd0I7QUFDekI5RCxNQUFBQSxLQUFLLEdBQUcsRUFBUjtBQUNILEtBRkksTUFHQSxJQUFHNkQsRUFBRSxHQUFDRSxFQUFILElBQU8sQ0FBUCxJQUFZSCxFQUFFLEdBQUNFLEVBQUgsR0FBTSxDQUFyQixFQUF3QjtBQUN6QjlELE1BQUFBLEtBQUssR0FBRyxDQUFDLEVBQVQ7QUFDSCxLQUZJLE1BRUU7QUFDSDRDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLCtDQUFaO0FBQ0g7O0FBRUQsV0FBTzdDLEtBQVA7QUFDSCxHQTFpQkk7QUE0aUJMaUUsRUFBQUEsVUFBVSxFQUFFLG9CQUFTZixJQUFULEVBQWU7QUFDdkIsUUFBR0EsSUFBSSxJQUFJLEtBQVgsRUFBa0I7QUFDZCxhQUFPLElBQVA7QUFDSDs7QUFDRCxXQUFPLEtBQVA7QUFDSCxHQWpqQkk7QUFtakJMZ0IsRUFBQUEsc0JBQXNCLEVBQUUsZ0NBQVNDLEtBQVQsRUFBZ0JDLFdBQWhCLEVBQTZCQyxZQUE3QixFQUEyQztBQUMvRCxRQUFHLEtBQUtuRSxTQUFSLEVBQW1CO0FBQ2Y7QUFDSDs7QUFFRCxRQUFJb0UsUUFBUSxHQUFHL0YsRUFBRSxDQUFDa0MsRUFBSCxDQUFNMEQsS0FBSyxDQUFDSSxLQUFOLENBQVlwRCxDQUFsQixFQUFxQmdELEtBQUssQ0FBQ0ksS0FBTixDQUFZUCxDQUFqQyxDQUFmO0FBQ0EsUUFBSVEsUUFBUSxHQUFHakcsRUFBRSxDQUFDa0MsRUFBSCxDQUFNMEQsS0FBSyxDQUFDTSxRQUFOLENBQWV0RCxDQUFyQixFQUF3QmdELEtBQUssQ0FBQ00sUUFBTixDQUFlVCxDQUF2QyxDQUFmO0FBQ0EsUUFBSVUsTUFBTSxHQUFHLE9BQUtDLFFBQVEsQ0FBQyxLQUFHUixLQUFLLENBQUNJLEtBQU4sQ0FBWVAsQ0FBaEIsQ0FBMUI7QUFDQSxRQUFJWSxVQUFVLEdBQUdDLElBQUksQ0FBQ0MsSUFBTCxDQUFVRCxJQUFJLENBQUNFLE1BQUwsS0FBYyxHQUF4QixJQUE2QixHQUE5QztBQUNBLFFBQUloQyxPQUFPLEdBQUcsRUFBZDtBQUNBLFFBQUlmLE9BQU8sR0FBR21DLEtBQUssQ0FBQ25DLE9BQXBCO0FBQ0EsUUFBSWdELEVBQUo7QUFBQSxRQUFPQyxFQUFQO0FBQUEsUUFBVUMsRUFBVjtBQUFBLFFBQWFDLEVBQUUsR0FBQyxDQUFoQjtBQUFBLFFBQWtCQyxTQUFsQjtBQUFBLFFBQTRCQyxTQUE1QjtBQUVBLFFBQUlsRSxDQUFDLEdBQUdnRCxLQUFLLENBQUNJLEtBQU4sQ0FBWXBELENBQXBCO0FBQ0EsUUFBSTZDLENBQUMsR0FBR0csS0FBSyxDQUFDSSxLQUFOLENBQVlQLENBQXBCO0FBQ0EsUUFBSXNCLEVBQUUsR0FBR25CLEtBQUssQ0FBQ00sUUFBTixDQUFldEQsQ0FBeEI7QUFDQSxRQUFJb0UsRUFBRSxHQUFHcEIsS0FBSyxDQUFDTSxRQUFOLENBQWVULENBQXhCO0FBRUEsUUFBSXdCLFFBQVEsR0FBR2xCLFFBQVEsQ0FBQ21CLEdBQVQsQ0FBYWpCLFFBQWIsRUFBdUJrQixHQUF2QixFQUFmO0FBQ0EsUUFBSUMsY0FBSixDQW5CK0QsQ0FxQi9EOztBQUNBLFFBQUcsQ0FBQyxLQUFLMUIsVUFBTCxDQUFnQkUsS0FBSyxDQUFDakIsSUFBdEIsQ0FBSixFQUFpQztBQUM3QixXQUFLNUQsSUFBTCxDQUFVc0csTUFBVixHQUFtQmxCLE1BQW5CO0FBQ0g7O0FBQ0QsU0FBS3BGLElBQUwsQ0FBVTJDLE1BQVYsR0FBbUIsQ0FBbkI7O0FBRUEsUUFBRyxLQUFLOUIsVUFBUixFQUFvQjtBQUNoQndGLE1BQUFBLGNBQWMsR0FBRyxLQUFLRSxpQkFBTCxDQUF1QjFCLEtBQXZCLENBQWpCLENBRGdCLENBR2hCO0FBQ0E7O0FBRUEsVUFBR3FCLFFBQVEsSUFBRUcsY0FBYixFQUE2QjtBQUN6QjtBQUNBckIsUUFBQUEsUUFBUSxHQUFJL0YsRUFBRSxDQUFDa0MsRUFBSCxDQUFNVSxDQUFOLEVBQVM2QyxDQUFULENBQVo7QUFDQW9CLFFBQUFBLFNBQVMsR0FBRzdHLEVBQUUsQ0FBQ2tDLEVBQUgsQ0FBTTZFLEVBQU4sRUFBVUMsRUFBVixDQUFaO0FBQ0FMLFFBQUFBLEVBQUUsR0FBR0UsU0FBUyxDQUFDSyxHQUFWLENBQWNuQixRQUFkLENBQUwsQ0FKeUIsQ0FNekI7O0FBQ0EsWUFBR1ksRUFBRSxDQUFDL0QsQ0FBSCxJQUFRLENBQVgsRUFBYztBQUNWK0QsVUFBQUEsRUFBRSxDQUFDL0QsQ0FBSCxHQUFPLEdBQVA7QUFDSDs7QUFDRCxZQUFHK0QsRUFBRSxDQUFDbEIsQ0FBSCxJQUFRLENBQVgsRUFBYztBQUNWa0IsVUFBQUEsRUFBRSxDQUFDbEIsQ0FBSCxHQUFPLEdBQVA7QUFDSDs7QUFFRCxZQUFHa0IsRUFBRSxDQUFDL0QsQ0FBSCxJQUFRLENBQVIsSUFBYStELEVBQUUsQ0FBQ2xCLENBQUgsSUFBUSxDQUF4QixFQUEyQjtBQUN2Qm1CLFVBQUFBLEVBQUUsR0FBRyxNQUFJTixJQUFJLENBQUNpQixFQUFULEdBQWNqQixJQUFJLENBQUNrQixJQUFMLENBQVVsQixJQUFJLENBQUNtQixHQUFMLENBQVNkLEVBQUUsQ0FBQy9ELENBQUgsR0FBSytELEVBQUUsQ0FBQ2xCLENBQWpCLENBQVYsQ0FBbkI7QUFDSDs7QUFDRG1CLFFBQUFBLEVBQUUsR0FBRyxLQUFLM0IsYUFBTCxDQUFtQlcsS0FBSyxDQUFDSSxLQUF6QixFQUFnQztBQUFDLGVBQUllLEVBQUw7QUFBUyxlQUFJQztBQUFiLFNBQWhDLEVBQWtESixFQUFsRCxDQUFMOztBQUNBLFlBQUdBLEVBQUUsR0FBRyxHQUFSLEVBQWE7QUFDVEEsVUFBQUEsRUFBRSxHQUFHQSxFQUFFLEdBQUcsR0FBVjtBQUNIOztBQUVERSxRQUFBQSxTQUFTLEdBQUcsS0FBS3ZDLGlCQUFMLENBQXVCcUMsRUFBdkIsRUFBMkIsSUFBM0IsQ0FBWjtBQUNBcEMsUUFBQUEsT0FBTyxHQUFHc0MsU0FBUyxDQUFDdEMsT0FBcEIsQ0F2QnlCLENBd0J6Qjs7QUFDQSxhQUFLekQsSUFBTCxDQUFVMkMsTUFBVixHQUFtQm9ELFNBQVMsQ0FBQ3BELE1BQTdCO0FBRUgsT0EzQkQsTUEyQk87QUFFSCxZQUFHbUMsV0FBSCxFQUFnQjtBQUNaWSxVQUFBQSxFQUFFLEdBQUdaLFdBQVcsQ0FBQ0ssUUFBWixDQUFxQnRELENBQTFCO0FBQ0E4RCxVQUFBQSxFQUFFLEdBQUdiLFdBQVcsQ0FBQ0ssUUFBWixDQUFxQlQsQ0FBMUI7QUFDSCxTQUhELE1BR087QUFDSGdCLFVBQUFBLEVBQUUsR0FBR2IsS0FBSyxDQUFDTSxRQUFOLENBQWV0RCxDQUFwQjtBQUNBOEQsVUFBQUEsRUFBRSxHQUFHZCxLQUFLLENBQUNNLFFBQU4sQ0FBZVQsQ0FBcEI7QUFDSDs7QUFDRE0sUUFBQUEsUUFBUSxHQUFJL0YsRUFBRSxDQUFDa0MsRUFBSCxDQUFNVSxDQUFOLEVBQVM2QyxDQUFULENBQVo7QUFDQW9CLFFBQUFBLFNBQVMsR0FBRzdHLEVBQUUsQ0FBQ2tDLEVBQUgsQ0FBTXVFLEVBQU4sRUFBVUMsRUFBVixDQUFaO0FBQ0FDLFFBQUFBLEVBQUUsR0FBR0UsU0FBUyxDQUFDSyxHQUFWLENBQWNuQixRQUFkLENBQUwsQ0FYRyxDQWFIOztBQUNBLFlBQUdZLEVBQUUsQ0FBQy9ELENBQUgsSUFBUSxDQUFYLEVBQWM7QUFDVitELFVBQUFBLEVBQUUsQ0FBQy9ELENBQUgsR0FBTyxHQUFQO0FBQ0g7O0FBQ0QsWUFBRytELEVBQUUsQ0FBQ2xCLENBQUgsSUFBUSxDQUFYLEVBQWM7QUFDVmtCLFVBQUFBLEVBQUUsQ0FBQ2xCLENBQUgsR0FBTyxHQUFQO0FBQ0g7O0FBRUQsWUFBR2tCLEVBQUUsQ0FBQy9ELENBQUgsSUFBUSxDQUFSLElBQWErRCxFQUFFLENBQUNsQixDQUFILElBQVEsQ0FBeEIsRUFBMkI7QUFDdkJtQixVQUFBQSxFQUFFLEdBQUcsTUFBSU4sSUFBSSxDQUFDaUIsRUFBVCxHQUFjakIsSUFBSSxDQUFDa0IsSUFBTCxDQUFVbEIsSUFBSSxDQUFDbUIsR0FBTCxDQUFTZCxFQUFFLENBQUMvRCxDQUFILEdBQUsrRCxFQUFFLENBQUNsQixDQUFqQixDQUFWLENBQW5CO0FBQ0g7O0FBRURtQixRQUFBQSxFQUFFLEdBQUcsS0FBSzNCLGFBQUwsQ0FBbUJXLEtBQUssQ0FBQ0ksS0FBekIsRUFBZ0M7QUFBQyxlQUFJUyxFQUFMO0FBQVMsZUFBSUM7QUFBYixTQUFoQyxFQUFrREUsRUFBbEQsQ0FBTDs7QUFDQSxZQUFHQSxFQUFFLEdBQUcsR0FBUixFQUFhO0FBQ1RBLFVBQUFBLEVBQUUsR0FBR0EsRUFBRSxHQUFHLEdBQVY7QUFDSDs7QUFFREUsUUFBQUEsU0FBUyxHQUFHLEtBQUt2QyxpQkFBTCxDQUF1QnFDLEVBQXZCLEVBQTJCLE1BQTNCLENBQVo7QUFDQXBDLFFBQUFBLE9BQU8sR0FBR3NDLFNBQVMsQ0FBQ3RDLE9BQXBCLENBL0JHLENBaUNIOztBQUNBLGFBQUt6RCxJQUFMLENBQVUyQyxNQUFWLEdBQW1Cb0QsU0FBUyxDQUFDcEQsTUFBN0I7QUFDSCxPQXBFZSxDQXNFaEI7OztBQUNBLFdBQUtnRSxLQUFMLENBQVdoRSxNQUFYLEdBQW9CLEtBQUszQyxJQUFMLENBQVUyQyxNQUE5Qjs7QUFFQSxVQUFHLEtBQUtqRCxPQUFMLElBQWdCK0QsT0FBbkIsRUFBNEI7QUFDeEIsWUFBR3lDLFFBQVEsSUFBRUcsY0FBYixFQUE2QjtBQUN6QixlQUFLeEYsVUFBTCxDQUFnQitGLElBQWhCLENBQXFCbkQsT0FBckIsRUFEeUIsQ0FFekI7QUFDQTtBQUNBOztBQUNILFNBTEQsTUFLTyxJQUFHLENBQUMsS0FBSzdDLFNBQVQsRUFBb0I7QUFDdkIsZUFBS0MsVUFBTCxDQUFnQitGLElBQWhCLENBQXFCbkQsT0FBckIsRUFBOEI2QixVQUE5QjtBQUNIOztBQUNELGFBQUs1RixPQUFMLEdBQWUrRCxPQUFmO0FBQ0EsYUFBS2IsVUFBTCxHQUFrQm1ELFNBQVMsQ0FBQ3BELE1BQTVCO0FBQ0g7QUFDSjtBQUNKLEdBcHFCSTtBQXNxQkxrRSxFQUFBQSx3QkFBd0IsRUFBRSxrQ0FBU2hDLEtBQVQsRUFBZ0JDLFdBQWhCLEVBQTZCQyxZQUE3QixFQUEyQztBQUNqRSxRQUFJVyxFQUFKLEVBQU9DLEVBQVAsRUFBVWpELE9BQVY7QUFDQSxRQUFJbUQsRUFBRSxHQUFHLENBQVQ7QUFDQSxRQUFJaEUsQ0FBQyxHQUFHZ0QsS0FBSyxDQUFDSSxLQUFOLENBQVlwRCxDQUFwQjtBQUNBLFFBQUk2QyxDQUFDLEdBQUdHLEtBQUssQ0FBQ0ksS0FBTixDQUFZUCxDQUFwQjtBQUNBLFFBQUlzQixFQUFFLEdBQUduQixLQUFLLENBQUNNLFFBQU4sQ0FBZXRELENBQXhCO0FBQ0EsUUFBSW9FLEVBQUUsR0FBR3BCLEtBQUssQ0FBQ00sUUFBTixDQUFlVCxDQUF4QjtBQUVBLFFBQUlNLFFBQUosRUFBYWMsU0FBYixFQUF1QmdCLFNBQXZCLEVBQWtDQyxVQUFsQyxFQUE4Q25CLEVBQTlDLEVBQWtEb0IsR0FBbEQ7O0FBQ0EsUUFBSUMsS0FBSyxHQUFHLElBQVo7O0FBQ0EsUUFBSTdCLE1BQU0sR0FBRyxPQUFLQyxRQUFRLENBQUMsS0FBR1gsQ0FBSixDQUExQixDQVZpRSxDQVlqRTs7QUFDQSxRQUFJWSxVQUFVLEdBQUdDLElBQUksQ0FBQ0MsSUFBTCxDQUFVRCxJQUFJLENBQUNFLE1BQUwsS0FBYyxHQUF4QixJQUE2QixHQUE5QztBQUNBLFFBQUloQyxPQUFPLEdBQUcsRUFBZDtBQUNBLFFBQUl5RCxJQUFKO0FBQ0EsUUFBSW5CLFNBQUo7QUFFQXJELElBQUFBLE9BQU8sR0FBR21DLEtBQUssQ0FBQ25DLE9BQWhCOztBQUNBLFFBQUdBLE9BQU8sSUFBSSxJQUFYLElBQW1CQSxPQUFPLElBQUksSUFBakMsRUFBd0M7QUFDcEM7QUFDSDs7QUFFRG1ELElBQUFBLEVBQUUsR0FBR2hCLEtBQUssQ0FBQ3NDLEdBQVg7QUFDQSxTQUFLbkgsSUFBTCxDQUFVc0csTUFBVixHQUFtQmxCLE1BQW5CO0FBQ0EsU0FBS3BGLElBQUwsQ0FBVTJDLE1BQVYsR0FBbUIsQ0FBbkI7O0FBRUEsUUFBR0QsT0FBTyxJQUFJLElBQWQsRUFBb0I7QUFBRztBQUNuQjtBQUNBc0MsTUFBQUEsUUFBUSxHQUFJL0YsRUFBRSxDQUFDa0MsRUFBSCxDQUFPVSxDQUFELEdBQUksRUFBVixFQUFlNkMsQ0FBRCxHQUFJLEVBQWxCLENBQVo7QUFDQW9CLE1BQUFBLFNBQVMsR0FBRzdHLEVBQUUsQ0FBQ2tDLEVBQUgsQ0FBTzZFLEVBQUQsR0FBSyxFQUFYLEVBQWdCQyxFQUFELEdBQUssRUFBcEIsQ0FBWjtBQUNBTCxNQUFBQSxFQUFFLEdBQUdFLFNBQVMsQ0FBQ0ssR0FBVixDQUFjbkIsUUFBZCxDQUFMLENBSmdCLENBTWhCOztBQUNBLFVBQUdZLEVBQUUsQ0FBQy9ELENBQUgsSUFBUSxDQUFYLEVBQWM7QUFDVitELFFBQUFBLEVBQUUsQ0FBQy9ELENBQUgsR0FBTyxHQUFQO0FBQ0g7O0FBQ0QsVUFBRytELEVBQUUsQ0FBQ2xCLENBQUgsSUFBUSxDQUFYLEVBQWM7QUFDVmtCLFFBQUFBLEVBQUUsQ0FBQ2xCLENBQUgsR0FBTyxHQUFQO0FBQ0g7O0FBRUQsVUFBR2tCLEVBQUUsQ0FBQy9ELENBQUgsSUFBUSxDQUFSLElBQWErRCxFQUFFLENBQUNsQixDQUFILElBQVEsQ0FBeEIsRUFBMkI7QUFDdkI7QUFDQW1CLFFBQUFBLEVBQUUsR0FBRyxNQUFJTixJQUFJLENBQUNpQixFQUFULEdBQWNqQixJQUFJLENBQUNrQixJQUFMLENBQVVsQixJQUFJLENBQUNtQixHQUFMLENBQVNkLEVBQUUsQ0FBQy9ELENBQUgsR0FBSytELEVBQUUsQ0FBQ2xCLENBQWpCLENBQVYsQ0FBbkI7QUFDQW1CLFFBQUFBLEVBQUUsR0FBRyxLQUFLM0IsYUFBTCxDQUFtQlcsS0FBSyxDQUFDSSxLQUF6QixFQUFnQztBQUFDLGVBQUllLEVBQUw7QUFBUyxlQUFJQztBQUFiLFNBQWhDLEVBQWtESixFQUFsRCxDQUFMO0FBQ0g7QUFDSjs7QUFFRCxRQUFHbkQsT0FBTyxJQUFJLE1BQWQsRUFBc0I7QUFDbEIsVUFBR29DLFdBQUgsRUFBZ0I7QUFDWlksUUFBQUEsRUFBRSxHQUFHWixXQUFXLENBQUNLLFFBQVosQ0FBcUJ0RCxDQUExQjtBQUNBOEQsUUFBQUEsRUFBRSxHQUFHYixXQUFXLENBQUNLLFFBQVosQ0FBcUJULENBQTFCLENBRlksQ0FHWjs7QUFDQSxZQUFHSSxXQUFXLElBQUlBLFdBQVcsQ0FBQ3BDLE9BQVosSUFBdUIsSUFBekMsRUFBK0M7QUFDM0NBLFVBQUFBLE9BQU8sR0FBR29DLFdBQVcsQ0FBQ3BDLE9BQXRCO0FBQ0g7QUFDSixPQVBELE1BT087QUFDSGdELFFBQUFBLEVBQUUsR0FBR2IsS0FBSyxDQUFDTSxRQUFOLENBQWV0RCxDQUFwQjtBQUNBOEQsUUFBQUEsRUFBRSxHQUFHZCxLQUFLLENBQUNNLFFBQU4sQ0FBZVQsQ0FBcEI7O0FBQ0EsWUFBR0ksV0FBVyxJQUFJQSxXQUFXLENBQUNwQyxPQUFaLElBQXVCLElBQXpDLEVBQStDO0FBQzNDQSxVQUFBQSxPQUFPLEdBQUdvQyxXQUFXLENBQUNwQyxPQUF0QjtBQUNIO0FBQ0o7O0FBQ0RzQyxNQUFBQSxRQUFRLEdBQUkvRixFQUFFLENBQUNrQyxFQUFILENBQU9VLENBQUQsR0FBSSxFQUFWLEVBQWU2QyxDQUFELEdBQUksRUFBbEIsQ0FBWjtBQUNBb0IsTUFBQUEsU0FBUyxHQUFHN0csRUFBRSxDQUFDa0MsRUFBSCxDQUFPdUUsRUFBRCxHQUFLLEVBQVgsRUFBZ0JDLEVBQUQsR0FBSyxFQUFwQixDQUFaO0FBQ0FDLE1BQUFBLEVBQUUsR0FBR0UsU0FBUyxDQUFDSyxHQUFWLENBQWNuQixRQUFkLENBQUwsQ0FqQmtCLENBbUJsQjs7QUFDQSxVQUFHWSxFQUFFLENBQUMvRCxDQUFILElBQVEsQ0FBWCxFQUFjO0FBQ1YrRCxRQUFBQSxFQUFFLENBQUMvRCxDQUFILEdBQU8sR0FBUDtBQUNIOztBQUNELFVBQUcrRCxFQUFFLENBQUNsQixDQUFILElBQVEsQ0FBWCxFQUFjO0FBQ1ZrQixRQUFBQSxFQUFFLENBQUNsQixDQUFILEdBQU8sR0FBUDtBQUNIOztBQUVELFVBQUdrQixFQUFFLENBQUMvRCxDQUFILElBQVEsQ0FBUixJQUFhK0QsRUFBRSxDQUFDbEIsQ0FBSCxJQUFRLENBQXhCLEVBQTJCO0FBQ3ZCbUIsUUFBQUEsRUFBRSxHQUFHLE1BQUlOLElBQUksQ0FBQ2lCLEVBQVQsR0FBY2pCLElBQUksQ0FBQ2tCLElBQUwsQ0FBVWxCLElBQUksQ0FBQ21CLEdBQUwsQ0FBU2QsRUFBRSxDQUFDL0QsQ0FBSCxHQUFLK0QsRUFBRSxDQUFDbEIsQ0FBakIsQ0FBVixDQUFuQjtBQUNBbUIsUUFBQUEsRUFBRSxHQUFHLEtBQUszQixhQUFMLENBQW1CVyxLQUFLLENBQUNJLEtBQXpCLEVBQWdDO0FBQUMsZUFBSVMsRUFBTDtBQUFTLGVBQUlDO0FBQWIsU0FBaEMsRUFBa0RFLEVBQWxELENBQUw7QUFDSDtBQUNKOztBQUVELFFBQUcsS0FBS2hGLFVBQVIsRUFBb0I7QUFDaEJrRixNQUFBQSxTQUFTLEdBQUcsS0FBS3ZDLGlCQUFMLENBQXVCcUMsRUFBdkIsRUFBMkJuRCxPQUEzQixDQUFaO0FBQ0FlLE1BQUFBLE9BQU8sR0FBR3NDLFNBQVMsQ0FBQ3RDLE9BQXBCLENBRmdCLENBSWhCOztBQUNBLFdBQUt6RCxJQUFMLENBQVUyQyxNQUFWLEdBQW1Cb0QsU0FBUyxDQUFDcEQsTUFBN0IsQ0FMZ0IsQ0FPaEI7O0FBQ0EsV0FBS2dFLEtBQUwsQ0FBV2hFLE1BQVgsR0FBb0IsS0FBSzNDLElBQUwsQ0FBVTJDLE1BQTlCLENBUmdCLENBVWhCOztBQUNBLFVBQUcsS0FBS2pELE9BQUwsSUFBZ0IrRCxPQUFoQixJQUEyQmYsT0FBTyxJQUFJLElBQXpDLEVBQStDO0FBQzNDLFlBQUdBLE9BQU8sSUFBSSxJQUFkLEVBQW9CO0FBQ2hCLGVBQUs3QixVQUFMLENBQWdCdUcsSUFBaEI7O0FBQ0EsZUFBS3ZHLFVBQUwsQ0FBZ0IrRixJQUFoQixDQUFxQm5ELE9BQXJCO0FBQ0gsU0FIRCxNQUdPO0FBQ0g7QUFDQSxlQUFLNUMsVUFBTCxDQUFnQitGLElBQWhCLENBQXFCbkQsT0FBckIsRUFBOEI2QixVQUE5QjtBQUNIOztBQUNELGFBQUs1RixPQUFMLEdBQWUrRCxPQUFmO0FBQ0EsYUFBS2IsVUFBTCxHQUFrQm1ELFNBQVMsQ0FBQ3BELE1BQTVCO0FBQ0g7QUFDSjtBQUVUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStCUSxTQUFLMEUsV0FBTCxHQUFtQjNFLE9BQW5CO0FBQ0gsR0EveUJJLENBaXpCTDs7QUFqekJLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBjb21tb24gPSByZXF1aXJlKFwiQ29tbW9uXCIpO1xudmFyIGFnZW50T2JqID0gcmVxdWlyZShcIkFnZW50T2JqXCIpO1xuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogYWdlbnRPYmosXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHNwckF0bGFzOiBjYy5TcHJpdGVBdGxhcyxcbiAgICAgICAgd3JhcE1vZGU6IGNjLldyYXBNb2RlLkxvb3AsXG4gICAgICAgIHJvdXRlczpbXSxcbiAgICAgICAgbGFzdEFjdDpcIlwiLFxuICAgICAgICBsYXN0QW5nbGU6LTEsXG4gICAgICAgIGxpZmU6LTEsXG4gICAgICAgIGVpZDotMSxcbiAgICB9LFxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5sYXlvdXRPcCA9IHRoaXMubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KFwiR2FtZVwiKTtcbiAgICB9LFxuXG4gICAgc3RhcnQgKCkge1xuICAgIH0sXG5cbiAgICBjdG9yKCkge1xuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5wb3NYID0gMDtcbiAgICAgICAgdGhpcy5wb3NZID0gMDtcbiAgICAgICAgdGhpcy5ub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLmFuZ2xlID0gLTk5OTtcbiAgICAgICAgdGhpcy5ncm91cEtpbGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hdHRhY2tpbmcgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9hbmltYXRpb24gPSB0aGlzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgICB0aGlzLl9hbmltYXRpb24uV3JhcE1vZGUgPSBjYy5XcmFwTW9kZS5Mb29wO1xuICAgICAgICAvL3RoaXMuX2FuaW1hdGlvbi5vbihcImxhc3RmcmFtZVwiLCB0aGlzLm9uZW5kLCB0aGlzKTtcbiAgICB9LFxuXG4vKiAgICBcbiAgICBzZXRFbmVteTogZnVuY3Rpb24oZW5lbXlPYmopIHtcbiAgICAgICAgaWYoZW5lbXlPYmopIHtcbiAgICAgICAgICAgIHRoaXMuZWlkID0gZW5lbXlPYmoubmFtZTtcbiAgICAgICAgICAgIHRoaXMuZW5lbXkgPSBlbmVteU9iajsgICAgICAgICAgICBcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVpZCA9IFwiXCI7XG4gICAgICAgICAgICB0aGlzLmVuZW15ID0gbnVsbDsgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uZW5kOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgYWdlbnROb2RlO1xuICAgICAgICBpZih0aGlzLmVuZW15LmlzVmFsaWQpIHtcbiAgICAgICAgICAgIGFnZW50Tm9kZSA9IHRoaXMuZW5lbXkuZ2V0Q29tcG9uZW50KCdTa2VTcHJpdGUnKTtcbiAgICAgICAgICAgIGFnZW50Tm9kZS5yZW1vdmUoKTtcbiAgICAgICAgfSBcbiAgICAgICAgLy90aGlzLnNob290QXJyb3codGhpcy5veCwgdGhpcy5veSwgdGhpcy5leCwgdGhpcy5leSwgdGhpcy5hcnJvdyk7XG4gICAgfSxcbiovXG5cbiAgICBzZXRJbml0UG9zOiBmdW5jdGlvbihweCwgcHkpIHtcbiAgICAgICAgdGhpcy5wb3NYID0gcHg7XG4gICAgICAgIHRoaXMucG9zWSA9IHB5O1xuICAgICAgICB2YXIgcHQgPSBjYy52Mih0aGlzLnBvc1gsIHRoaXMucG9zWSk7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXMucHVzaChwdCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZVBvczogZnVuY3Rpb24ocHgsIHB5KSB7XG4gICAgICAgIHZhciBtb3ZlVG8gPSBjYy52MihweCwgcHkpO1xuICAgICAgICB2YXIgbngsbnk7XG4gICAgICAgIHZhciBhcCA9IHRoaXMubm9kZS5nZXRBbmNob3JQb2ludCgpO1xuICAgICAgICB2YXIgc2l6ZSA9IHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpO1xuICAgICAgICBcbiAgICAgICAgbnggPSAoMC41LWFwLngpICogc2l6ZS53aWR0aCArIHB4O1xuICAgICAgICAvL255ID0gKDAuNS1hcC55KSAqIHNpemUuaGVpZ2h0ICsgcHk7XG4gICAgICAgIG55ID0gcHk7XG5cbiAgICAgICAgdmFyIHNoYWRvd01vdmVUbyA9IGNjLnYyKG54LCBueSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24obW92ZVRvKTtcblxuICAgICAgICBpZih0aGlzLnNoYWRvdykgeyBcbiAgICAgICAgICAgIHRoaXMuc2hhZG93LnNldFBvc2l0aW9uKG1vdmVUbyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH0sXG5cbi8qXG4gICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy90aGlzLm5vZGUuc2NhbGVYID0gMC4zO1xuICAgICAgICAvL3RoaXMubm9kZS5zY2FsZVkgPSAwLjM7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShcImRpZW9mZjJcIik7XG4gICAgICAgIHRoaXMuc2hhZG93LmRlc3Ryb3koKTtcblxuICAgICAgICAvL25vZGUgZGVzdG9yeSBpbiBzcHJpdGUgYWZ0ZXJraWxsIGZ1bmNcbiAgICAgICAgLy90aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG4qL1xuXG4gICAgZGlzcFNoYWRvdzogZnVuY3Rpb24oZnJhbWVObykge1xuICAgICAgICAvL3NoYWRvdyBvYmplY3QgbWF5IG5vdCByZWFkeSBpbiBpbml0KCkgd2hlbiBwbGF5aW5nXG4gICAgICAgIGlmKCF0aGlzLnNoYWRvdykgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzaGFkb3dOb2RlID0gdGhpcy5zaGFkb3c7XG4gICAgICAgIHZhciBmcmFtZUltZyA9IFwic2tlX3NoYWRvdy9lL3NrZV93YWxrX2VcIitmcmFtZU5vO1xuICAgICAgICB2YXIgYWN0ID0gdGhpcy5sYXN0QWN0O1xuXG4gICAgICAgIGlmKCFhY3QpIHJldHVybjtcblxuICAgICAgICB2YXIgYWN0VG1wID0gdGhpcy5sYXN0QWN0LnNwbGl0KFwiX1wiKTtcblxuICAgICAgICB2YXIgYWN0RGlyID0gYWN0VG1wWzFdO1xuICAgICAgICB2YXIgYWN0VHlwZSA9IGFjdFRtcFsyXTtcbiAgICAgICAgdmFyIHNjYWxlWCA9IHRoaXMubGFzdFNjYWxlWDtcblxuICAgICAgICBpZihhY3REaXIgPT0gXCJlbjFcIiB8fCBhY3REaXIgPT0gXCJlbjJcIiB8fCBhY3REaXIgPT0gXCJlbjNcIikge1xuICAgICAgICAgICAgZnJhbWVJbWcgPSBcInNrZV9zaGFkb3cvZW4vc2tlX3dhbGtfZW5cIitmcmFtZU5vO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYWN0RGlyID09IFwic2UxXCIgfHwgYWN0RGlyID09IFwic2UyXCIgfHwgYWN0RGlyID09IFwic2UzXCIpIHtcbiAgICAgICAgICAgIGZyYW1lSW1nID0gXCJza2Vfc2hhZG93L3NlL3NrZV93YWxrX3NlXCIrZnJhbWVObztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFjdERpciA9PSBcInNcIikge1xuICAgICAgICAgICAgZnJhbWVJbWcgPSBcInNrZV9zaGFkb3cvcy9za2Vfd2Fsa19zXCIrZnJhbWVObztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFjdERpciA9PSBcIm5cIikge1xuICAgICAgICAgICAgZnJhbWVJbWcgPSBcInNrZV9zaGFkb3cvbi9za2Vfd2Fsa19uXCIrZnJhbWVObztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFjdERpciA9PSBcImVcIikge1xuICAgICAgICAgICAgZnJhbWVJbWcgPSBcInNrZV9zaGFkb3cvZS9za2Vfd2Fsa19lXCIrZnJhbWVObztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2hhZG93LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKGZyYW1lSW1nLCBjYy5TcHJpdGVGcmFtZSwgZnVuY3Rpb24gKGVyciwgc3ByaXRlRnJhbWUpIHtcbiAgICAgICAgICAgIGlmKHNoYWRvd05vZGUpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZihzaGFkb3dOb2RlLl9uYW1lICE9IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYWRvd05vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2hhZG93Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcblxuLypcbiAgICBtb3ZlOiBmdW5jdGlvbihwdCkge1xuICAgICAgICBpZih0aGlzLnJlbW92ZUZsYWcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsZW4gPSB0aGlzLnJvdXRlcy5sZW5ndGg7XG4gICAgICAgIHZhciBtb3ZlVG87XG5cbiAgICAgICAgaWYobGVuID09IDApIHJldHVybjtcbiAgICAgICAgaWYobGVuID09IDEpIHtcbiAgICAgICAgICAgIG1vdmVUbyA9IHRoaXMucm91dGVzWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW92ZVRvID0gdGhpcy5yb3V0ZXMuc2hpZnQoKTsgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKG1vdmVUbyk7XG4gICAgICAgIGlmKHRoaXMuc2hhZG93ICYmIHRoaXMuc2hhZG93LmlzVmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hhZG93LnNldFBvc2l0aW9uKG1vdmVUbyk7ICAgICBcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWFzdEFuaW1GcmFtZXMgPSBbXSxcbiAgICAgICAgICAgIHN0ciA9IFwiXCIsXG4gICAgICAgICAgICBmcmFtZSxcbiAgICAgICAgICAgIGFuaW1hdGlvbjtcblxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSA0OyBpKyspIHsgICAgICAgIFxuICAgICAgICAgICAgc3RyID0gXCJjNXVcIiArIGk7XG4gICAgICAgICAgICBmcmFtZSA9IHRoaXMuc3ByQXRsYXMuZ2V0U3ByaXRlRnJhbWUoc3RyKTtcbiAgICAgICAgICAgIGVhc3RBbmltRnJhbWVzLnB1c2goZnJhbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9hbmltYXRpb24gPSBuZXcgY2MuQW5pbWF0aW9uKGVhc3RBbmltRnJhbWVzKTtcblxuICAgICAgICB2YXIgY2xpcCA9IGNjLkFuaW1hdGlvbkNsaXAuY3JlYXRlV2l0aFNwcml0ZUZyYW1lcyhlYXN0QW5pbUZyYW1lcyxmcmFtZXMubGVuZ3RoKTtcbiAgICAgICAgY2xpcC5uYW1lID0gXCJhbmltXzAwMVwiO1xuICAgICAgICBjbGlwLnNwZWVkID0gMC4wODtcbiAgICAgICAgY2xpcC5zYW1wbGUgPSA0O1xuICAgICAgICBjbGlwLndyYXBNb2RlID0gdGhpcy53cmFwTW9kZTtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uLmFkZENsaXAoY2xpcCk7XG4gICAgfSxcblxuICAgIHBsYXlBbmltYXRpb246IGZ1bmN0aW9uICh3cmFwTW9kZSA9IGNjLldyYXBNb2RlLkRlZmF1bHQsIHNwZWVkID0gMC41LCBzYW1wbGUgPSA2MCkge1xuICAgICAgICBpZih0aGlzLl9hbmltYXRpb24pIHtcbiAgICAgICAgICAgIHZhciBhbmltU3RhdGUgPSB0aGlzLl9hbmltYXRpb24uZ2V0QW5pbWF0aW9uU3RhdGUoXCJhbmltXzAwMVwiKTtcbiAgICAgICAgICAgIGFuaW1TdGF0ZS5jbGlwLndyYXBNb2RlID0gd3JhcE1vZGU7XG4gICAgICAgICAgICBhbmltU3RhdGUuY2xpcC5zcGVlZCA9IHNwZWVkO1xuICAgICAgICAgICAgYW5pbVN0YXRlLmNsaXAuc2FtcGxlID0gc2FtcGxlO1xuICAgICAgICAgICAgYW5pbVN0YXRlLnJlcGVhdENvdW50ID0gSW5maW5pdHk7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShcImFuaW1fMDAxXCIpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldEluaXRBY3Q6IGZ1bmN0aW9uKGFuZ2xlLCBhY3RUeXBlKSB7XG4gICAgICAgIHZhciBhbmdsZUluZm8gPSB0aGlzLmdldEFjdG5hbWVCeUFuZ2xlKGFuZ2xlLCBhY3RUeXBlKTtcbiAgICAgICAgdGhpcy5sYXN0QWN0ID0gYW5nbGVJbmZvLmFjdE5hbWU7XG4gICAgfSxcblxuICAgIGdldEFjdG5hbWVCeUFuZ2xlX2JhazogZnVuY3Rpb24oYW5nbGUsIGFjdFR5cGUpIHtcbiAgICAgICAgdmFyIGFjdE5hbWU9XCJcIjtcbiAgICAgICAgdmFyIHNjYWxlWCA9IDE7XG4gICAgICAgIHZhciByZXQgPSB7fTtcblxuICAgICAgICBpZihhbmdsZT49MCAmJiBhbmdsZTw9MTEuMjUqMSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcIm5fd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcIm5fYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZT4xMS4yNSoxICYmIGFuZ2xlPD0xMS4yNSozKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4zX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjNfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZT4xMS4yNSozICYmIGFuZ2xlPD0xMS4yNSo1KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4yX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjJfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZT4xMS4yNSo1ICYmIGFuZ2xlPD0xMS4yNSo3KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4xX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjFfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZT4xMS4yNSo3ICYmIGFuZ2xlPD0xMS4yNSo5KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZV93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZV9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjExLjI1KjkgJiYgYW5nbGU8PTExLjI1KjExKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UxX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTFfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZT4xMS4yNSoxMSAmJiBhbmdsZTw9MTEuMjUqMTMpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTJfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlMl9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjExLjI1KjEzICYmIGFuZ2xlPD0xMS4yNSoxNSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlM193YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UzX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU+MTEuMjUqMTUgfHwgYW5nbGU8PTE4MCkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIGVsc2UgaWYoYW5nbGU8MCAmJiBhbmdsZT49MTEuMjUqLTEpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJuX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJuX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9zY2FsZVggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPDExLjI1Ki0xICYmIGFuZ2xlPj0xMS4yNSotMykge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuM193YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4zX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9zY2FsZVggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPDExLjI1Ki0zICYmIGFuZ2xlPj0xMS4yNSotNSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuMl93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4yX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3NjYWxlWCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU8MTEuMjUqLTUgJiYgYW5nbGU+PTExLjI1Ki03KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZW4xX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjFfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vc2NhbGVYID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZTwxMS4yNSotNyAmJiBhbmdsZT49MTEuMjUqLTkpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzY2FsZVggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPDExLjI1Ki05ICYmIGFuZ2xlPj0xMS4yNSotMTEpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTFfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlMV9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NhbGVYID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZTwxMS4yNSotMTEgJiYgYW5nbGU+PTExLjI1Ki0xMykge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlMl93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UyX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzY2FsZVggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPDExLjI1Ki0xMyAmJiBhbmdsZT49MTEuMjUqLTE1KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UzX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTNfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjYWxlWCA9IC0xO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmKGFuZ2xlPDExLjI1Ki0xNSAmJiBhbmdsZT4tMTgwKSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic193YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic19hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NhbGVYID0gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tOlwiK2FuZ2xlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFjdE5hbWUgPSB0aGlzLnJvbGUgK1wiX1wiKyBhY3ROYW1lO1xuXG4gICAgICAgIHJldC5hY3ROYW1lID0gYWN0TmFtZTtcbiAgICAgICAgcmV0LnNjYWxlWCA9IHNjYWxlWDtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuKi9cblxuICAgIGdldEFjdG5hbWVCeUFuZ2xlOiBmdW5jdGlvbihhbmdsZSwgYWN0VHlwZSkge1xuICAgICAgICB2YXIgYWN0TmFtZT1cIlwiO1xuICAgICAgICB2YXIgc2NhbGVYID0gMTtcbiAgICAgICAgdmFyIHJldCA9IHt9O1xuICAgICAgICB2YXIgc3BlY2lhbEFjdG5hbWUgPSBmYWxzZTtcblxuICAgICAgICBpZihhbmdsZT4yMi41Ki0xICYmIGFuZ2xlPD0yMi41KjEpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJuX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJuX2F0dGFja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoYW5nbGU+MjIuNSoxICYmIGFuZ2xlPD0yMi41KjMpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjJfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuMl9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjIyLjUqMyAmJiBhbmdsZTw9MjIuNSo1KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZV93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZV9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGFuZ2xlPjIyLjUqNSAmJiBhbmdsZTw9MjIuNSo3KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UyX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJzZTJfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZT4yMi41KjcgfHwgYW5nbGU8LTIyLjUqOSkge1xuICAgICAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNfYXR0YWNrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmKGFuZ2xlPDIyLjUqLTEgJiYgYW5nbGU+PTIyLjUqLTMpIHtcbiAgICAgICAgICAgIGlmKGFjdFR5cGUgPT0gXCJtb3ZlXCIpIHtcbiAgICAgICAgICAgICAgICBhY3ROYW1lID0gXCJlbjJfd2Fsa1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcImVuMl9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NhbGVYID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZTwyMi41Ki0zICYmIGFuZ2xlPj0yMi41Ki01KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZV93YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwiZV9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NhbGVYID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhbmdsZTwyMi41Ki01ICYmIGFuZ2xlPj0yMi41Ki03KSB7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic2UyX3dhbGtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWN0VHlwZSA9PSBcInNhXCIpIHsgIC8vIHN0YXJ0IGF0dGFja1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBcInNlMl9hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NhbGVYID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYW5nbGU8MjIuNSotNyl7XG4gICAgICAgICAgICBpZihhY3RUeXBlID09IFwibW92ZVwiKSB7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic193YWxrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7ICAgLy8gc3RhcnQgYXR0YWNrXG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IFwic19hdHRhY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NhbGVYID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS1lcnJvciBhbmdsZS0tLS0tLS0tLS0tLS0tOlwiK2FuZ2xlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFjdE5hbWUgPSB0aGlzLnJvbGUgK1wiX1wiKyBhY3ROYW1lO1xuIFxuICAgICAgICBzcGVjaWFsQWN0bmFtZSA9IHRoaXMuc3BlY2lhbEFjdChhY3RUeXBlKTtcbiAgICAgICAgaWYoc3BlY2lhbEFjdG5hbWUpIHtcbiAgICAgICAgICAgIGFjdE5hbWUgPSBzcGVjaWFsQWN0bmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldC5hY3ROYW1lID0gYWN0TmFtZTtcbiAgICAgICAgcmV0LnNjYWxlWCA9IHNjYWxlWDtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuXG4gICAgc3BlY2lhbEFjdDogZnVuY3Rpb24oYWN0VHlwZSkge1xuICAgICAgICAvLyBpZiBqdXN0IDEgdnMgMSBhdHRhY2tcbiAgICAgICAgaWYoIXRoaXMuZ3JvdXBLaWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYWN0VHlwZSA9PSBcInNhXCIgJiYgdGhpcy5yb2xlID09IFwiaHJcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiaHJfYWxsX2tpbGxcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHNldElkOiBmdW5jdGlvbihhaWQpIHtcbiAgICAgICAgdGhpcy5haWQgPSBhaWQ7XG5cbiAgICAgICAgLy92YXIgZXZlbnQgPSBuZXcgY2MuRXZlbnQuRXZlbnRDdXN0b20oXCJldmVudF9lZmZlY3RcIiwgdHJ1ZSk7XG4gICAgICAgIC8vZXZlbnQuZGV0YWlsID0gXCIxMjNcIjtcbiAgICAgICAgLy90aGlzLm5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfSxcblxuICAgIGhpZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfSxcblxuICAgIHNldFNoYWRvdzogZnVuY3Rpb24oc2hhZG93KSB7XG4gICAgICAgIHRoaXMuc2hhZG93ID0gc2hhZG93O1xuICAgICAgICB0aGlzLnNoYWRvdy5hY3RpdmUgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBnZXRBZ2VudEFuZ2xlOiBmdW5jdGlvbihvUG9zLCBkUG9zLCB0YW5BbmdsZSkge1xuICAgICAgICB2YXIgZHgsZHksb3gsb3k7XG4gICAgICAgIHZhciBhbmdsZTtcblxuICAgICAgICBkeCA9IGRQb3MueDtcbiAgICAgICAgZHkgPSBkUG9zLnk7XG4gICAgICAgIG94ID0gb1Bvcy54O1xuICAgICAgICBveSA9IG9Qb3MueTtcblxuICAgICAgICBpZihkeC1veD4wICYmIGR5LW95PjApIHtcbiAgICAgICAgICAgIGFuZ2xlID0gdGFuQW5nbGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihkeC1veD4wICYmIGR5LW95PDApIHtcbiAgICAgICAgICAgIGFuZ2xlID0gMTgwLXRhbkFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZHgtb3g8MCAmJiBkeS1veTwwKSB7XG4gICAgICAgICAgICBhbmdsZSA9IDE4MCt0YW5BbmdsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGR4LW94PDAgJiYgZHktb3k+MCkge1xuICAgICAgICAgICAgYW5nbGUgPSAwLXRhbkFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZHgtb3g9PTAgJiYgZHktb3k+MCkge1xuICAgICAgICAgICAgYW5nbGUgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZHgtb3g9PTAgJiYgZHktb3k8MCkge1xuICAgICAgICAgICAgYW5nbGUgPSAxODA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihkeS1veT09MCAmJiBkeC1veD4wKSB7XG4gICAgICAgICAgICBhbmdsZSA9IDkwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZHktb3k9PTAgJiYgZHgtb3g8MCkge1xuICAgICAgICAgICAgYW5nbGUgPSAtOTA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIndyb25nIGFuZ2xlIGluIEZ1bmMgTXlTcHJpdGUtPmdldEFnZW50QW5nbGUoKVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhbmdsZTtcbiAgICB9LFxuXG4gICAgaWZGbHlBZ2VudDogZnVuY3Rpb24ocm9sZSkge1xuICAgICAgICBpZihyb2xlID09IFwiYmVlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgcGxheUFuZ2xlQW5pbWF0aW9uTmVhcjogZnVuY3Rpb24oYWdlbnQsIGFnZW50RnV0dXJlLCBpc01haW5QbGF5ZXIpIHtcbiAgICAgICAgaWYodGhpcy5hdHRhY2tpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGFydFBvcyA9IGNjLnYyKGFnZW50Lm15cG9zLngsIGFnZW50Lm15cG9zLnkpO1xuICAgICAgICB2YXIgZW5lbXlQb3MgPSBjYy52MihhZ2VudC5lbmVteXBvcy54LCBhZ2VudC5lbmVteXBvcy55KTtcbiAgICAgICAgdmFyIHpvcmRlciA9IDEwMDArcGFyc2VJbnQoMzItYWdlbnQubXlwb3MueSk7XG4gICAgICAgIHZhciByYW5kb21UaW1lID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkqMTI1KS8xMDA7XG4gICAgICAgIHZhciBhY3ROYW1lID0gXCJcIjtcbiAgICAgICAgdmFyIGFjdFR5cGUgPSBhZ2VudC5hY3RUeXBlO1xuICAgICAgICB2YXIgZngsZnksdnQsYWc9MCx0YXJnZXRQb3MsYW5nbGVJbmZvO1xuXG4gICAgICAgIHZhciB4ID0gYWdlbnQubXlwb3MueDtcbiAgICAgICAgdmFyIHkgPSBhZ2VudC5teXBvcy55O1xuICAgICAgICB2YXIgZXggPSBhZ2VudC5lbmVteXBvcy54O1xuICAgICAgICB2YXIgZXkgPSBhZ2VudC5lbmVteXBvcy55O1xuXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IHN0YXJ0UG9zLnN1YihlbmVteVBvcykubWFnKCk7XG4gICAgICAgIHZhciBhdHRhY2tEaXN0YW5jZTtcblxuICAgICAgICAvLyBmbHkgYWdlbnQgc2hvdWxkIGhvdmVyIG92ZXIgYW55IG90aGVyIGFnZW50LlxuICAgICAgICBpZighdGhpcy5pZkZseUFnZW50KGFnZW50LnJvbGUpKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gem9yZGVyO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAxO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5fYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICBhdHRhY2tEaXN0YW5jZSA9IHRoaXMuZ2V0QXR0YWNrRGlzdGFuY2UoYWdlbnQpO1xuXG4gICAgICAgICAgICAvLzEuNSBpcyB0aGUgZGlzdGFuY2UgYWp1c3RtZW50IHZhcmlhYmxlLCBzaG91bGQgYmUgYWp1c3QgYWNjb3JkaW5nIHRvIGVhY2ggYWdlbnQgc2l6ZS5cbiAgICAgICAgICAgIC8vYXR0YWNrRGlzdGFuY2UgPSAoYWdlbnQuc2l6ZSArIGFnZW50LmVzaXplKSowLjUqMS41O1xuXG4gICAgICAgICAgICBpZihkaXN0YW5jZTw9YXR0YWNrRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAvLyBkaXIgYWNjb3JkaW5nIHRvIGVuZW15IHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgc3RhcnRQb3MgID0gY2MudjIoeCwgeSk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0UG9zID0gY2MudjIoZXgsIGV5KTtcbiAgICAgICAgICAgICAgICB2dCA9IHRhcmdldFBvcy5zdWIoc3RhcnRQb3MpO1xuXG4gICAgICAgICAgICAgICAgLy9pZiBkaXIgbm8gY2hhbmdlZCwgdnQueCBvciB2dC55IGlzIDAsIGF0YW4gdmFsdWUgc2hvdWxkIGJlIGludmFpbGRcbiAgICAgICAgICAgICAgICBpZih2dC54ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdnQueCA9IDAuMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYodnQueSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZ0LnkgPSAwLjE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYodnQueCAhPSAwICYmIHZ0LnkgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBhZyA9IDE4MC9NYXRoLlBJICogTWF0aC5hdGFuKE1hdGguYWJzKHZ0LngvdnQueSkpO1xuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgYWcgPSB0aGlzLmdldEFnZW50QW5nbGUoYWdlbnQubXlwb3MsIHtcInhcIjpleCwgXCJ5XCI6ZXl9LCBhZyk7XG4gICAgICAgICAgICAgICAgaWYoYWcgPiAxODApIHtcbiAgICAgICAgICAgICAgICAgICAgYWcgPSBhZyAtIDM2MDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhbmdsZUluZm8gPSB0aGlzLmdldEFjdG5hbWVCeUFuZ2xlKGFnLCBcInNhXCIpO1xuICAgICAgICAgICAgICAgIGFjdE5hbWUgPSBhbmdsZUluZm8uYWN0TmFtZTtcbiAgICAgICAgICAgICAgICAvL3VzZWQgdG8gbWlycm9yIGEgc3ByaXRlLlxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSBhbmdsZUluZm8uc2NhbGVYO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgaWYoYWdlbnRGdXR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZnggPSBhZ2VudEZ1dHVyZS5lbmVteXBvcy54OyBcbiAgICAgICAgICAgICAgICAgICAgZnkgPSBhZ2VudEZ1dHVyZS5lbmVteXBvcy55O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZ4ID0gYWdlbnQuZW5lbXlwb3MueDtcbiAgICAgICAgICAgICAgICAgICAgZnkgPSBhZ2VudC5lbmVteXBvcy55O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdGFydFBvcyAgPSBjYy52Mih4LCB5KTtcbiAgICAgICAgICAgICAgICB0YXJnZXRQb3MgPSBjYy52MihmeCwgZnkpO1xuICAgICAgICAgICAgICAgIHZ0ID0gdGFyZ2V0UG9zLnN1YihzdGFydFBvcyk7XG5cbiAgICAgICAgICAgICAgICAvL2lmIGRpciBubyBjaGFuZ2VkLCB2dC54IG9yIHZ0LnkgaXMgMCwgYXRhbiB2YWx1ZSBzaG91bGQgYmUgaW52YWlsZFxuICAgICAgICAgICAgICAgIGlmKHZ0LnggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2dC54ID0gMC4xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih2dC55ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdnQueSA9IDAuMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZih2dC54ICE9IDAgJiYgdnQueSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGFnID0gMTgwL01hdGguUEkgKiBNYXRoLmF0YW4oTWF0aC5hYnModnQueC92dC55KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYWcgPSB0aGlzLmdldEFnZW50QW5nbGUoYWdlbnQubXlwb3MsIHtcInhcIjpmeCwgXCJ5XCI6Znl9LCBhZyk7XG4gICAgICAgICAgICAgICAgaWYoYWcgPiAxODApIHtcbiAgICAgICAgICAgICAgICAgICAgYWcgPSBhZyAtIDM2MDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhbmdsZUluZm8gPSB0aGlzLmdldEFjdG5hbWVCeUFuZ2xlKGFnLCBcIm1vdmVcIik7XG4gICAgICAgICAgICAgICAgYWN0TmFtZSA9IGFuZ2xlSW5mby5hY3ROYW1lO1xuXG4gICAgICAgICAgICAgICAgLy91c2VkIHRvIG1pcnJvciBhIHNwcml0ZS5cbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gYW5nbGVJbmZvLnNjYWxlWDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9ibG9vZCBiYXIgbWF5IGZsaXAgd2hlbiBhZ2VudCBmbGlwLCBzaG91bGQgbWFrZSBpdCBiYWNrLlxuICAgICAgICAgICAgdGhpcy5ibG9vZC5zY2FsZVggPSB0aGlzLm5vZGUuc2NhbGVYO1xuXG4gICAgICAgICAgICBpZih0aGlzLmxhc3RBY3QgIT0gYWN0TmFtZSkge1xuICAgICAgICAgICAgICAgIGlmKGRpc3RhbmNlPD1hdHRhY2tEaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgLy9pZih0aGlzLnBsYXlFZmZlY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGlzLnBsYXlFZmZlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCF0aGlzLmF0dGFja2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lLCByYW5kb21UaW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0QWN0ID0gYWN0TmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RTY2FsZVggPSBhbmdsZUluZm8uc2NhbGVYO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHBsYXlBbmdsZUFuaW1hdGlvblJlbW90ZTogZnVuY3Rpb24oYWdlbnQsIGFnZW50RnV0dXJlLCBpc01haW5QbGF5ZXIpIHtcbiAgICAgICAgdmFyIGZ4LGZ5LGFjdFR5cGU7XG4gICAgICAgIHZhciBhZyA9IDA7XG4gICAgICAgIHZhciB4ID0gYWdlbnQubXlwb3MueDsgXG4gICAgICAgIHZhciB5ID0gYWdlbnQubXlwb3MueTsgXG4gICAgICAgIHZhciBleCA9IGFnZW50LmVuZW15cG9zLng7IFxuICAgICAgICB2YXIgZXkgPSBhZ2VudC5lbmVteXBvcy55OyBcblxuICAgICAgICB2YXIgc3RhcnRQb3MsdGFyZ2V0UG9zLHN0YXJ0RVBvcywgdGFyZ2V0RVBvcywgdnQsIHZ0RTtcbiAgICAgICAgdmFyIF9zZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHpvcmRlciA9IDEwMDArcGFyc2VJbnQoMzIteSk7XG5cbiAgICAgICAgLy90b3RhbCBhbmltYXRvciBkdXJhdGlvbiBpcyAxLjI1cywgc28gdGFrZSBhIHJhbmRvbSB0aW1lIGZyb20gMC0xLjI1IHRvIHByZXZlbnQgc2FtZSBhY3Rpb25cbiAgICAgICAgdmFyIHJhbmRvbVRpbWUgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSoxMjUpLzEwMDtcbiAgICAgICAgdmFyIGFjdE5hbWUgPSBcIlwiO1xuICAgICAgICB2YXIgdGhlbjtcbiAgICAgICAgdmFyIGFuZ2xlSW5mbztcblxuICAgICAgICBhY3RUeXBlID0gYWdlbnQuYWN0VHlwZTtcbiAgICAgICAgaWYoYWN0VHlwZSA9PSBcImlhXCIgfHwgYWN0VHlwZSA9PSBcImVhXCIgKSB7IFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYWcgPSBhZ2VudC5yb3Q7XG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSB6b3JkZXI7XG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAxO1xuXG4gICAgICAgIGlmKGFjdFR5cGUgPT0gXCJzYVwiKSB7ICAvL3N0YXJ0IGF0dGFja1xuICAgICAgICAgICAgLy8gZGlyIGFjY29yZGluZyB0byBlbmVteSBwb3NpdGlvblxuICAgICAgICAgICAgc3RhcnRQb3MgID0gY2MudjIoKHgpKjMwLCAoeSkqMzApO1xuICAgICAgICAgICAgdGFyZ2V0UG9zID0gY2MudjIoKGV4KSozMCwgKGV5KSozMCk7XG4gICAgICAgICAgICB2dCA9IHRhcmdldFBvcy5zdWIoc3RhcnRQb3MpO1xuXG4gICAgICAgICAgICAvL2lmIGRpciBubyBjaGFuZ2VkLCB2dC54IG9yIHZ0LnkgaXMgMCwgYXRhbiB2YWx1ZSBzaG91bGQgYmUgaW52YWlsZFxuICAgICAgICAgICAgaWYodnQueCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdnQueCA9IDAuMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHZ0LnkgPT0gMCkge1xuICAgICAgICAgICAgICAgIHZ0LnkgPSAwLjE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHZ0LnggIT0gMCAmJiB2dC55ICE9IDApIHtcbiAgICAgICAgICAgICAgICAvL2FnID0gMTgwL01hdGguUEkgKiBNYXRoLmF0YW4oTWF0aC5hYnModnQueS92dC54KSk7XG4gICAgICAgICAgICAgICAgYWcgPSAxODAvTWF0aC5QSSAqIE1hdGguYXRhbihNYXRoLmFicyh2dC54L3Z0LnkpKTtcbiAgICAgICAgICAgICAgICBhZyA9IHRoaXMuZ2V0QWdlbnRBbmdsZShhZ2VudC5teXBvcywge1wieFwiOmV4LCBcInlcIjpleX0sIGFnKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH0gXG5cbiAgICAgICAgaWYoYWN0VHlwZSA9PSBcIm1vdmVcIikge1xuICAgICAgICAgICAgaWYoYWdlbnRGdXR1cmUpIHtcbiAgICAgICAgICAgICAgICBmeCA9IGFnZW50RnV0dXJlLmVuZW15cG9zLng7IFxuICAgICAgICAgICAgICAgIGZ5ID0gYWdlbnRGdXR1cmUuZW5lbXlwb3MueTtcbiAgICAgICAgICAgICAgICAvL2Z1dHVyZSBhY3R0eXBlIG1heWJlIGlhIGluc3RlYWQgb2YgbW92ZSBvciBzYSwgaW4gdGhpcyBjYXNlIHNob3VsZCBub3QgYmUgaGFuZGxlZC5cbiAgICAgICAgICAgICAgICBpZihhZ2VudEZ1dHVyZSAmJiBhZ2VudEZ1dHVyZS5hY3RUeXBlICE9IFwiaWFcIikge1xuICAgICAgICAgICAgICAgICAgICBhY3RUeXBlID0gYWdlbnRGdXR1cmUuYWN0VHlwZTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmeCA9IGFnZW50LmVuZW15cG9zLng7XG4gICAgICAgICAgICAgICAgZnkgPSBhZ2VudC5lbmVteXBvcy55O1xuICAgICAgICAgICAgICAgIGlmKGFnZW50RnV0dXJlICYmIGFnZW50RnV0dXJlLmFjdFR5cGUgIT0gXCJpYVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdFR5cGUgPSBhZ2VudEZ1dHVyZS5hY3RUeXBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXJ0UG9zICA9IGNjLnYyKCh4KSozMCwgKHkpKjMwKTtcbiAgICAgICAgICAgIHRhcmdldFBvcyA9IGNjLnYyKChmeCkqMzAsIChmeSkqMzApO1xuICAgICAgICAgICAgdnQgPSB0YXJnZXRQb3Muc3ViKHN0YXJ0UG9zKTtcblxuICAgICAgICAgICAgLy9pZiBkaXIgbm8gY2hhbmdlZCwgdnQueCBvciB2dC55IGlzIDAsIGF0YW4gdmFsdWUgc2hvdWxkIGJlIGludmFpbGRcbiAgICAgICAgICAgIGlmKHZ0LnggPT0gMCkge1xuICAgICAgICAgICAgICAgIHZ0LnggPSAwLjE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih2dC55ID09IDApIHtcbiAgICAgICAgICAgICAgICB2dC55ID0gMC4xO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih2dC54ICE9IDAgJiYgdnQueSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgYWcgPSAxODAvTWF0aC5QSSAqIE1hdGguYXRhbihNYXRoLmFicyh2dC54L3Z0LnkpKTtcbiAgICAgICAgICAgICAgICBhZyA9IHRoaXMuZ2V0QWdlbnRBbmdsZShhZ2VudC5teXBvcywge1wieFwiOmZ4LCBcInlcIjpmeX0sIGFnKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLl9hbmltYXRpb24pIHtcbiAgICAgICAgICAgIGFuZ2xlSW5mbyA9IHRoaXMuZ2V0QWN0bmFtZUJ5QW5nbGUoYWcsIGFjdFR5cGUpO1xuICAgICAgICAgICAgYWN0TmFtZSA9IGFuZ2xlSW5mby5hY3ROYW1lO1xuXG4gICAgICAgICAgICAvL3VzZWQgdG8gbWlycm9yIGEgc3ByaXRlLlxuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IGFuZ2xlSW5mby5zY2FsZVg7XG5cbiAgICAgICAgICAgIC8vYmxvb2QgYmFyIG1heSBmbGlwIHdoZW4gYWdlbnQgZmxpcCwgc2hvdWxkIG1ha2UgaXQgYmFjay5cbiAgICAgICAgICAgIHRoaXMuYmxvb2Quc2NhbGVYID0gdGhpcy5ub2RlLnNjYWxlWDtcblxuICAgICAgICAgICAgLy9pZiBhbHJlYWR5IGluIGF0dGFjayBtb2RlLCBqdXN0IHNraXAgdGhlIGFuaW1hdGlvblxuICAgICAgICAgICAgaWYodGhpcy5sYXN0QWN0ICE9IGFjdE5hbWUgfHwgYWN0VHlwZSA9PSBcInNhXCIpIHtcbiAgICAgICAgICAgICAgICBpZihhY3RUeXBlID09IFwic2FcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24uc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL3dhbGtpbmcgYWN0aW9uLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheShhY3ROYW1lLCByYW5kb21UaW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0QWN0ID0gYWN0TmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RTY2FsZVggPSBhbmdsZUluZm8uc2NhbGVYO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbi8qXG4gICAgICAgIGlmKHRoaXMuX2FuaW1hdGlvbikge1xuICAgICAgICAgICAgYW5nbGVJbmZvID0gdGhpcy5nZXRBY3RuYW1lQnlBbmdsZShhbmdsZSwgYWN0VHlwZSk7XG4gICAgICAgICAgICBhY3ROYW1lID0gYW5nbGVJbmZvLmFjdE5hbWU7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gYW5nbGVJbmZvLnNjYWxlWDtcblxuICAgICAgICAgICAgLy9pZiBhbHJlYWR5IGluIGF0dGFjayBtb2RlLCBqdXN0IHNraXAgdGhlIGFuaW1hdGlvblxuICAgICAgICAgICAgaWYodGhpcy5sYXN0QWN0ICE9IGFjdE5hbWUpIHtcbiAgICAgICAgICAgICAgICB0aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICAvLyB0byBhdm9pZCBjaGFuZ2luZyBkaXIgZnJlcXVlbnRseS4gYWdlbnQgd291bGQgbG9va3MgdHJlbWJsZSBvdGhlcndpc2UuXG4gICAgICAgICAgICAgICAgaWYodGhlbiAtIHRoaXMubm93ID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5wbGF5KGFjdE5hbWUsIHJhbmRvbVRpbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm93ID0gdGhlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vaWYodGhpcy5sYXN0QWN0ICE9IGFjdE5hbWUgJiYgYWN0VHlwZT09XCJzYVwiKSB7XG4gICAgICAgICAgICAvLyAgICB2YXIgX3NlbGYgPSB0aGlzO1xuICAgICAgICAgICAgLy8gICAgdmFyIGFuaW1TdGF0ZSA9IHRoaXMuX2FuaW1hdGlvbi5nZXRBbmltYXRpb25TdGF0ZShhY3ROYW1lKTtcbiAgICAgICAgICAgIC8vICAgIGlmIChhbmltU3RhdGUpIHtcbiAgICAgICAgICAgIC8vICAgICAgICBhbmltU3RhdGUub24oJ2xhc3RmcmFtZScsIChldmVudCkgPT4ge30sIHRoaXMpO1xuICAgICAgICAgICAgLy8gICAgfVxuICAgICAgICAgICAgLy99XG5cbiAgICAgICAgICAgIHRoaXMubGFzdEFjdCA9IGFjdE5hbWU7XG5cbiAgICAgICAgICAgIHRoaXMubGFzdFNjYWxlWCA9IGFuZ2xlSW5mby5zY2FsZVg7XG4gICAgICAgIH1cbiovXG5cbiAgICAgICAgdGhpcy5sYXN0QWN0VHlwZSA9IGFjdFR5cGU7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==