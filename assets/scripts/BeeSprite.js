var mySprite = require("MySprite")

cc.Class({
    extends: mySprite,

    properties: {
        role:"bee",
    },

    start () {
    },

    shootArrow: function() {
    },  

    getAttackDistance: function(agent) {
        return (agent.size + agent.esize)*0.5*1.2;
    },

    playAni: function(agent, agentFuture, isMainPlayer) {
        this.node.zIndex = 9999;
        this.playAngleAnimationNear(agent, agentFuture, isMainPlayer);
    },

    remove: function() {
        this._animation.play("dieoff2");
        this.shadow.destroy();
        this.blood.destroy();
    },

    dieStart: function() {
        this.node.scaleX = 0.8;
        this.node.scaleY = 0.8;
    },

    dieEnd: function() {
        this._animation.play("footprint");
    },

    //ske clip ske_bomb, foot print start evt
    footStart: function() {
        this.node.zIndex = -1;
        //this.node.scaleX = 0.5;
        //this.node.scaleY = 0.5;
    },

    footEnd: function() {
        this.node.destroy();
    },

    //ske clip ske_bomb, called by first frame of ske_bomb
    beforeKill: function() {
        //this.shadow.destroy();
    },

    //ske clip ske_bomb, called by last frame of ske_bomb
    afterKill: function() {
        this.node.destroy();
    },

    frame1Evt: function() {
        //this.dispShadow(1);
    },

    frame2Evt: function() {
        //this.dispShadow(2);
    },

    frame3Evt: function() {
        //this.dispShadow(3);
    },

    frame4Evt: function() {
        //this.dispShadow(4);
    },

    frame5Evt: function() {
        //this.dispShadow(5);
    },

    frame6Evt: function() {
        //this.dispShadow(6);
    },

    frame7Evt: function() {
        //this.dispShadow(7);
    },

    // update (dt) {},
});
