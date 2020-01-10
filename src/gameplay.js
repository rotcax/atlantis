var game = new Phaser.Game(1136, 640, Phaser.AUTO);

GamePlayManager = {
    init() {
        console.log('init')
    },
    preload() {
        console.log('preload')
    },
    create() {
        console.log('create')
    },
    update() {
        console.log('update')
    }
}

game.state.add('gameplay', GamePlayManager);
game.state.start('gameplay');