var game = new Phaser.Game(1136, 640, Phaser.CANVAS);
var AMOUNT_DIAMONDS = 30;

GamePlayManager = {  
  init() {
    scaleScenary(game);
  },
  preload() {
    loadResource(game);
  },
  create() {
    this.horse = prepareScenary(game);

    this.firstMouseDown = false;
    game.input.onDown.add(this.onTap, this);

    this.diamonds = [];

    for(let i = 0; i < AMOUNT_DIAMONDS; i++) {
      const diamond = addMultipleElement(game);
      this.diamonds[i] = diamond;
  
      let rectCurrentDiamond = this.getBoundsDiamond(diamond);
      let rectHorse = this.getBoundsDiamond(this.horse);
  
      while(this.isOverlapingOtherDiamond(i, rectCurrentDiamond) || this.isRectanglesOverlapping(rectHorse, rectCurrentDiamond)) {
        diamond.x = game.rnd.integerInRange(50, 1050);
        diamond.y = game.rnd.integerInRange(50, 600);

        rectCurrentDiamond = this.getBoundsDiamond(diamond);
      }
    }
  },
  onTap() {
    this.firstMouseDown = true;
  },
  getBoundsDiamond(currentDiamond) {
    return new Phaser.Rectangle(currentDiamond.left, currentDiamond.top, currentDiamond.width, currentDiamond.height);
  },
  isRectanglesOverlapping(rect1, rect2) {
    if(rect1.x > rect2.x + rect2.width || rect2.x > rect1.x + rect1.width) {
      return false;
    }

    if(rect1.y > rect2.y + rect2.height || rect2.y > rect1.y + rect1.height) {
      return false;
    }

    return true;
  },
  isOverlapingOtherDiamond(index, rect2) {
    for(let i = 0; i < index; i++) {
      const rect1 = this.getBoundsDiamond(this.diamonds[i]);
      if(this.isRectanglesOverlapping(rect1, rect2)) {
        return true;
      }
    }

    return false;
  },
  update() {
    keyAction(game, this.horse, this.firstMouseDown);
  }
}

game.state.add('gameplay', GamePlayManager);
game.state.start('gameplay');