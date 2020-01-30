function prepareScenary(game) {
  game.add.sprite(0, 0, 'background');

  sprite = game.add.sprite(0, 0, 'horse');
  sprite.frame = 0;
  sprite.x = game.width / 2;
  sprite.y = game.height / 2;
  sprite.anchor.setTo(0.5);

  return sprite;
}
