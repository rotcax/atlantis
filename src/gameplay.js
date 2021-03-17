var game = new Phaser.Game(1136, 640, Phaser.CANVAS);
var AMOUNT_DIAMONDS = 30;

GamePlayManager = {  
  init: () => scaleScenary(game),
  preload: () => loadResource(game),
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

    this.explosion = game.add.sprite(100, 100, 'explosion');

    this.explosion.tweenScale = game.add.tween(this.explosion.scale).to({
      x: [0.4, 0.8, 0.4],
      y: [0.4, 0.8, 0.4]
    }, 600, Phaser.Easing.Exponential.Out, false, 0, 0, false);

    this.explosion.tweenAlpha = game.add.tween(this.explosion).to({
      alpha: [1, 0.6, 0]
    }, 600, Phaser.Easing.Exponential.Out, false, 0, 0, false);

    this.explosion.anchor.setTo(0.5);
    this.explosion.visible = false;
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
  getBoundsHorse() {
    const x0 = this.horse.x - Math.abs(this.horse.width / 2);
    const width = this.horse.width;
    const y0 = this.horse.y - this.horse.height / 2;
    const height = this.horse.height;

    return new Phaser.Rectangle(x0, y0, width, height);
  },
  update() {
    if(this.firstMouseDown) {
      const pointerX = game.input.x;
      const pointerY = game.input.y;
    
      const distX = pointerX - this.horse.x;
      const distY = pointerY - this.horse.y;
    
      if(distX > 0) {
        this.horse.scale.setTo(1, 1);
      } else {
        this.horse.scale.setTo(-1, 1);
      }
    
      this.horse.x += distX * 0.02;
      this.horse.y += distY * 0.02;

      for(var i = 0; i < AMOUNT_DIAMONDS; i++) {
        const rectHorse = this.getBoundsHorse();
        const rectDiamond = this.getBoundsDiamond(this.diamonds[i])
  
        if(this.diamonds[i].visible && this.isRectanglesOverlapping(rectHorse, rectDiamond)) {
          this.diamonds[i].visible = false;

          this.explosion.visible = true;
          this.explosion.x = this.diamonds[i].x;
          this.explosion.y = this.diamonds[i].y;

          this.explosion.tweenScale.start();
          this.explosion.tweenAlpha.start();
        }
      }
    }
  }
}

game.state.add('gameplay', GamePlayManager);
game.state.start('gameplay');
