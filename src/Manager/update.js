function keyAction(game, sprite, mouseDown) {
  if(mouseDown) {
    const pointerX = game.input.x;
    const pointerY = game.input.y;
  
    const distX = pointerX - sprite.x;
    const distY = pointerY - sprite.y;
  
    if(distX > 0) {
      sprite.scale.setTo(1, 1);
    } else {
      sprite.scale.setTo(-1, 1);
    }
  
    sprite.x += distX * 0.02;
    sprite.y += distY * 0.02;
  }
}