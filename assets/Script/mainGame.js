const pieces = require("config")
var mainGame = cc.Class({
  extends: cc.Component,

  ctor: function () {
    this.matrixPoint = []
    this.valueSlot1 = null
    this.valueSlot2 = null
    this.valueSlot3 = null
    this.score = 0
    this.isStartGame = true
  },

  properties: {
    defaultPiece: {
      default: null,
      type: cc.Node
    },
    piece1: {
      default: null,
      type: cc.Node
    },
    piece21: {
      default: null,
      type: cc.Node
    },
    piece22: {
      default: null,
      type: cc.Node
    },
    piece31: {
      default: null,
      type: cc.Node
    },
    piece32: {
      default: null,
      type: cc.Node
    },
    piece33: {
      default: null,
      type: cc.Node
    },
    piece51: {
      default: null,
      type: cc.Node
    },
    piece52: {
      default: null,
      type: cc.Node
    },
    piece53: {
      default: null,
      type: cc.Node
    },
    piece54: {
      default: null,
      type: cc.Node
    },
    piece55: {
      default: null,
      type: cc.Node
    },
    piece56: {
      default: null,
      type: cc.Node
    },
    piece57: {
      default: null,
      type: cc.Node
    },
    piece58: {
      default: null,
      type: cc.Node
    },
    piece61: {
      default: null,
      type: cc.Node
    },
    piece62: {
      default: null,
      type: cc.Node
    },
    piece63: {
      default: null,
      type: cc.Node
    },
    piece8: {
      default: null,
      type: cc.Node
    },
    scoreLabel: cc.Label,
    highScoreLabel: cc.Label,
    gameScoreLabel: cc.Label,
    popupLoser: cc.Node
  },


  statics: {
    instance: null
  },

  onLoad: function () {
    mainGame.instance = this
    this.restartGame()
    this.getHighScore()
    this.popupLoser.zIndex = 1000
  },

  randomThreePiece: function () {
    let total = 0
    let num1, num2, num3 = 0
    while (total <= 0 || total > 18) {
      total = 0
      num1 = Math.floor(Math.random() * 7 + 1)
      num2 = Math.floor(Math.random() * 7 + 1)
      num3 = Math.floor(Math.random() * 7 + 1)
      total = num1 + num2 + num3
    }
    return [num1, num2, num3]
  },

  getBlock: function (num) {
    switch (num) {
      case 1:
        return {block: this.piece1, value: 1}
      case 2:
        let rand = Math.floor(Math.random() + 1)
        return {block: this["piece2" + rand], value: 1 + rand}
      case 3:
        let rand1 = Math.floor(Math.random() * 2 + 1)
        return {block: this["piece3" + rand1], value: 3 + rand1}
      case 4:
        let rand2 = Math.floor(Math.random() * 7 + 1)
        return {block: this["piece5" + rand2], value: 6 + rand2}
      case 5:
        let rand3 = Math.floor(Math.random() * 7 + 1)
        return {block: this["piece5" + rand3], value: 6 + rand3}
      case 6:
        let rand4 = Math.floor(Math.random() * 2 + 1)
        return {block: this["piece6" + rand4], value: 14 + rand4}
      case 7:
        let rand5 = Math.floor(Math.random() * 2 + 1)
        return {block: this["piece6" + rand5], value: 14 + rand5}
      case 8:
        return {block: this["piece8"], value: 18}
      default:
        return {block: this.piece1, value: 1}
    }
  },

  drawBlock: function (block1, block2, block3) {
    let piece = cc.instantiate(block1.block)
    let color1 = this.randomColor()
    if (piece.children.length > 0) {
      for (let i = 0; i < piece.children.length; i++) {
        piece.children[i].color = new cc.Color(color1[0], color1[1], color1[2]);
      }
    } else {
      piece.color = new cc.Color(color1[0], color1[1], color1[2]);
    }
    let item = piece.getComponent("TouchDragger")
    item.init(block1.value, 1, color1)
    piece.active = true
    piece.setPosition(-200, -350)
    this.node.addChild(piece)

    let piece1 = cc.instantiate(block2.block)
    let color2 = this.randomColor()

    if (piece1.children.length > 0) {
      for (let i = 0; i < piece1.children.length; i++) {
        piece1.children[i].color = new cc.Color(color2[0], color2[1], color2[2]);
      }
    } else {
      piece1.color = new cc.Color(color2[0], color2[1], color2[2]);
    }

    let item1 = piece1.getComponent("TouchDragger")
    item1.init(block2.value, 2, color2)
    piece1.active = true
    piece1.setPosition(0, -350)
    this.node.addChild(piece1)

    let piece2 = cc.instantiate(block3.block)
    let color3 = this.randomColor()

    if (piece2.children.length > 0) {
      for (let i = 0; i < piece2.children.length; i++) {
        piece2.children[i].color = new cc.Color(color3[0], color3[1], color3[2]);
      }
    } else {
      piece2.color = new cc.Color(color3[0], color3[1], color3[2]);
    }

    let item2 = piece2.getComponent("TouchDragger")
    item2.init(block3.value, 3, color3)
    piece2.active = true
    piece2.setPosition(200, -350)
    this.node.addChild(piece2)

    this.valueSlot1 = piece
    this.valueSlot2 = piece1
    this.valueSlot3 = piece2

    this.toaDoViTri1 = item
    this.toaDoViTri2 = item1
    this.toaDoViTri3 = item2
  },

  randomColor: function () {
    let rand = Math.floor(Math.random() * 5)
    switch (rand) {
      case 0:
        return [218, 101, 84]
      case 1:
        return [236, 149, 72]
      case 2:
        return [90, 190, 226]
      case 3:
        return [87, 202, 132]
      case 4:
        return [153, 220, 83]
      case 5:
        return [230, 106, 130]
      default:
        return [218, 101, 84]
    }
  },

  caculatorDrop: function (x, y, value, position, color) {
      let positionBlock = pieces['piece' + value]
      let arrayPositionInBoard = []
      let numNodeValid = 0;
      for (let k = 0; k < 10; k++) {
        for (let j = 0; j < 10; j++) {
          let valueMatrix = this.matrixPoint[k * 10 + j]
          if (valueMatrix.value === null) {
            for (let i = 0; i < positionBlock.length; i++) {
              if (
                  (x + positionBlock[i][0] <= valueMatrix.x + 15)
                  && (x + positionBlock[i][0] >= valueMatrix.x - 15)
                  && (y + positionBlock[i][1] <= valueMatrix.y + 15)
                  && (y + positionBlock[i][1] >= valueMatrix.y - 15)
              ) {
                arrayPositionInBoard.push(k * 10 + j)
                numNodeValid++
              }
            }
          }
        }
      }
      if (numNodeValid === positionBlock.length && this.isStartGame) {
        for (let j = 0; j < arrayPositionInBoard.length; j++) {
          let node = cc.instantiate(this.defaultPiece);
          node.color = new cc.Color(color[0], color[1], color[2]);
          let x = -230 + Math.floor(arrayPositionInBoard[j] / 10) * 52
          let y = -230 + (arrayPositionInBoard[j] % 10) * 52
          node.setPosition(x, y)
          this.node.addChild(node)
          this.matrixPoint[arrayPositionInBoard[j]].value = node
          if (this["valueSlot" + position]) {
            this["valueSlot" + position].destroy()
            this["valueSlot" + position] = null
            this["toaDoViTri" + position] = null
          }
        }

        // check thẳng hàng ngang
        let nodeHangNgang = []
        let nodeHangDoc = []
        for (let k = 0; k < 10; k++) {
          nodeHangDoc = []
          nodeHangNgang = []
          for (let j = 0; j < 10; j++) {
            let valueMatrix = this.matrixPoint[k * 10 + j]
            if (valueMatrix.value !== null) {
              nodeHangDoc.push(valueMatrix.value)
            }

            let valueMatrixNgang = this.matrixPoint[j * 10 + k]
            if (valueMatrixNgang.value !== null) {
              nodeHangNgang.push(valueMatrixNgang.value)
            }

          }
          if (nodeHangDoc.length === 10) {
            for (let i = 0; i < 10; i++) {
              if (this.matrixPoint[k * 10 + i].value) {
                this.matrixPoint[k * 10 + i].value.destroy()
                this.matrixPoint[k * 10 + i].value = null
              }
            }
            cc.log("Them diem")
            this.score += 1
            this.scoreLabel.string = this.score
          }

          if (nodeHangNgang.length === 10) {
            for (let i = 0; i < 10; i++) {
              if (this.matrixPoint[i * 10 + k].value) {
                this.matrixPoint[i * 10 + k].value.destroy()
                this.matrixPoint[i * 10 + k].value = null
              }
            }
            cc.log("Them diem")
            this.score += 1
            this.scoreLabel.string = this.score
          }
        }


      } else {
        let move = cc.spawn(cc.moveBy(0.2, (position - 2) * 200 - x, -350 - y), null)
        this["valueSlot" + position].runAction(move)
        setTimeout(() => {
          this["valueSlot" + position].scale = 0.6
        }, 0.2)
      }

      if (!this.valueSlot1 && !this.valueSlot2 && !this.valueSlot3) {
        let listBlock = this.randomThreePiece()
        let block1 = this.getBlock(listBlock[0])
        let block2 = this.getBlock(listBlock[1])
        let block3 = this.getBlock(listBlock[2])
        this.drawBlock(block1, block2, block3)
      }

      if (numNodeValid === positionBlock.length && this.isStartGame) {
        // check end game

        let value1 = this.toaDoViTri1 ? this.toaDoViTri1.getValue() : null
        let value2 = this.toaDoViTri2 ? this.toaDoViTri2.getValue() : null
        let value3 = this.toaDoViTri3 ? this.toaDoViTri3.getValue() : null

        let endGame = true
        for (let k = 0; k < 100; k++) {
          if (value1) {
            let value = pieces['piece' + value1]
            let deltaX = 0
            let deltaY = 0
            let arrValid = 0
            if (value) {
              for (let i = 0; i < value.length; i++) {
                if (value[i][0] % 54 !== 0) deltaX = 27
                if (value[i][1] % 54 !== 0) deltaY = 27
                let positionNeighbor = k + ((value[i][0] + deltaX) / 54)*10 - (value[i][1] + deltaY) / 54
                if (positionNeighbor >= 0 && positionNeighbor < 100 && this.matrixPoint[positionNeighbor].value === null) {
                  arrValid++
                }
              }
              cc.log(arrValid, value.length)
              if (arrValid === value.length) {
                endGame = false
                break
              }
            }
          }

          if (value2) {
            let value = pieces['piece' + value2]
            let deltaX = 0
            let deltaY = 0
            let arrValid = 0
            if (value) {
              for (let i = 0; i < value.length; i++) {
                if (value[i][0] % 54 !== 0) deltaX = 27
                if (value[i][1] % 54 !== 0) deltaY = 27
                let positionNeighbor = k + ((value[i][0] + deltaX) / 54)*10 - (value[i][1] + deltaY) / 54
                if (positionNeighbor >= 0 && positionNeighbor < 100 && this.matrixPoint[positionNeighbor].value === null) {
                  arrValid++
                }
              }
              cc.log(arrValid, value.length)
              if (arrValid === value.length) {
                endGame = false
                break
              }
            }
          }

          if (value3) {
            let value = pieces['piece' + value3]
            let deltaX = 0
            let deltaY = 0
            let arrValid = 0
            if (value) {
              for (let i = 0; i < value.length; i++) {
                if (value[i][0] % 54 !== 0) deltaX = 27
                if (value[i][1] % 54 !== 0) deltaY = 27
                let positionNeighbor = k + ((value[i][0] + deltaX) / 54)*10 - (value[i][1] + deltaY) / 54
                if (positionNeighbor >= 0 && positionNeighbor < 100 && this.matrixPoint[positionNeighbor].value === null) {
                  arrValid++
                }
              }
              cc.log(arrValid, value.length)
              if (arrValid === value.length) {
                endGame = false
                break
              }
            }
          }

        }

        cc.log(endGame)
        if (endGame) {
          cc.log("Hết nước đi, trò chơi kết thúc");
          this.gameScoreLabel.string = 'Your Score ' + this.score
          this.popupLoser.active = true
          this.isStartGame = false
        }

      }
  },

  closePopupLoser: function (){
    this.popupLoser.active = false
    this.setHighScore()
    this.restartGame()
  },

  restartGame: function (){
    this.matrixPoint = []
    if(this.valueSlot1) this.valueSlot1.destroy()
    if(this.valueSlot2) this.valueSlot2.destroy()
    if(this.valueSlot3) this.valueSlot3.destroy()
    this.valueSlot1 = null
    this.valueSlot2 = null
    this.valueSlot3 = null
    this.score = 0
    this.isStartGame = true

    this.toaDoViTri1 = null
    this.toaDoViTri2 = null
    this.toaDoViTri2 = null

    for (let k = 0; k < 10; k++) {
      for (let j = 0; j < 10; j++) {
        let node = cc.instantiate(this.defaultPiece);
        let x = -230 + k * 52
        let y = -230 + j * 52
        this.matrixPoint.push({x, y, value: null})
        node.setPosition(x, y)
        this.node.addChild(node)
      }
    }

    let listBlock = this.randomThreePiece()
    let block1 = this.getBlock(listBlock[0])
    let block2 = this.getBlock(listBlock[1])
    let block3 = this.getBlock(listBlock[2])

    this.drawBlock(block1, block2, block3)
    this.scoreLabel.string = this.score
  },

  setHighScore: function (){
      let hightScore = cc.sys.localStorage.getItem('highScore')
      if(!hightScore) hightScore = 0
      if(this.score > hightScore){
        cc.sys.localStorage.setItem('highScore', this.score)
        this.highScoreLabel.string = 'Highest:' + this.score
      }
  },

  getHighScore: function (){
    let hightScore = cc.sys.localStorage.getItem('highScore')
    if(!hightScore) hightScore = 0
    this.highScoreLabel.string = 'Highest:' + hightScore
  },

  // called every frame
  update: function (dt) {
  },
});
