/**
 * This class represents a basic circular moving shape.
 * 
 * @author BugSlayer
 */
class Spaceship 
{
    private name : String;
    private html : HTMLElement;
    size : number;
    private _keyboardListener: KeyListener;
    position : Vector;
    private _game: Game;
    private _canShoot : boolean = true;
    private _shootTimer : number = 0;


    /**
     * @param scene The HTMLElement that representats the scene of the game
     */
    constructor(game:Game, scene: HTMLElement, name : string)
    {
        this._game = game;
        this.html = document.createElement("div");
        this.html.id = name;
        this.html.className = "spaceship";
        scene.appendChild(this.html);
        this.position = new Vector((this._game.window.windowWidth / 2), this._game.window.windowHeight - this.html.offsetHeight);
        this._keyboardListener = new KeyListener(); //append a keyboardListener
    }

    /**
     * Let the ball move over the specified interval
     * 
     * @param interval the time interval to move over
     */
    public move(interval: number) : void
    {
        const window = this._game.window;
        const spaceship = this.html;
        const currentMovement = this._keyboardListener.keyevents;
        let old_x = this.position.x();
        let old_y = this.position.y();
        
        if(currentMovement.right == true && (spaceship.offsetLeft + 80) <= window.windowWidth - 5){
            this.position = new Vector(old_x + 7.5, old_y);
        }else if(currentMovement.left == true && spaceship.offsetLeft >= 5){
            this.position = new Vector(old_x - 7.5, old_y);
        }
    }

    /**
     * Render the ball on the correct position on the screen
     * 
     * @param interval the time interval to move over
     */
    public draw(interval: number) : void
    {
        let rect = this.html.getBoundingClientRect();
        this.size = rect.width;
        this.html.style.left = "" + this.position.x() + 'px';
        this.html.style.top = "" + this.position.y() + 'px';
    }

    public shoot(interval: number) : void
    {
        const currentMovement = this._keyboardListener.keyevents;

        if(this._shootTimer > 0){
            this._shootTimer -= 1;
        }
        if(this._shootTimer == 0){
                this._canShoot = true;
            }else{
                this._canShoot = false;
            }
            if(currentMovement.space == true && this._canShoot == true){
                this._shootTimer = 12;
                this._canShoot = false;
                this._game.balls.push(new Ball(this._game, this._game.scene, 'ball', new Vector(this.position.x(), this.position.y())));
            }
    }
}