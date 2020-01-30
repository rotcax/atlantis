var game = new Phaser.Game(1136, 640, Phaser.CANVAS);

this.firstMouseDown = false;

GamePlayManager = {  
  init() {
    scaleScenary(game);
  },
  preload() {
    loadResource(game);
  },
  create() {
    this.horse = prepareScenary(game);
    game.input.onDown.add(this.onTap, this);
  },
  onTap() {
    this.firstMouseDown = true;
  },
  update() {
    keyAction(game, this.horse, this.firstMouseDown);
  }
}

game.state.add('gameplay', GamePlayManager);
game.state.start('gameplay');