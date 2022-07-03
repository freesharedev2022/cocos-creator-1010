const mainGame = require("mainGame")
var TouchDragger = cc.Class({
  extends: cc.Component,

  ctor: function(){
    this.value = 0
    this.position = 0
    this.color = null
  },
  properties: {
    propagate: {
      default: false
    },
  },

  init: function(value, position, color){
    this.value = value
    this.position = position
    this.color = color
  },

  // use this for initialization
  onLoad: function () {
    this.node.opacity = 255;
    this.node.scale = 0.6;
    let self = this
    this.node.on(cc.Node.EventType.TOUCH_START, function () {
      cc.log('Drag stated ...');
      this.opacity = 255;
    }, this.node);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
      this.opacity = 255;
      this.scale = 1;
      var delta = event.touch.getDelta();
      this.x += delta.x;
      this.y += delta.y;
      if (this.getComponent(TouchDragger).propagate) event.stopPropagation();
    }, this.node);
    this.node.on(cc.Node.EventType.TOUCH_END, function () {
      this.scale = 1;
      this.opacity = 255;
      mainGame.instance.caculatorDrop(this.x, this.y, self.value, self.position, self.color)
    }, this.node);
  },

  getValue: function () {
    return this.value
  }
});
