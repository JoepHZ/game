/** Class representing a collision */
class Collision{

  private _game: Game;

  /**
  * Create a collisionListener
  * @param {Game} - the calling Game object
  */
  constructor(game: Game){
    this._game = game;
  }

  /**
  * What to do if objects collide
  */
  public collide(){
    const window = this._game.window;
    const bitcoin = document.getElementById('bitcoin');

    if(bitcoin != null){
      if(bitcoin.offsetLeft + bitcoin.offsetWidth <= 0 || bitcoin.offsetLeft >= window.windowWidth || bitcoin.offsetTop + bitcoin.offsetHeight == 0 || bitcoin.offsetTop >= window.windowHeight){
        bitcoin.parentNode.removeChild(bitcoin);
      }
    }
  }

}
