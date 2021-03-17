function prepareScenary(game) {
  game.add.sprite(0, 0, 'background');

  sprite = game.add.sprite(0, 0, 'horse');
  sprite.frame = 0;
  sprite.x = game.width / 2;
  sprite.y = game.height / 2;
  sprite.anchor.setTo(0.5);

  return sprite;
}

function addMultipleElement(game) {
  const element = game.add.sprite(100, 100, 'diamonds');
  element.frame = game.rnd.integerInRange(0, 3);
  element.scale.setTo(0.30 + game.rnd.frac());
  element.anchor.setTo(0.5);

  element.x = game.rnd.integerInRange(50, 1050);
  element.y = game.rnd.integerInRange(50, 600);

  return element;
}
