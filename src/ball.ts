/**
 * This class represents a basic circular moving shape.
 * 
 * @author BugSlayer
 */
class Ball 
{
    private name : String;
    html : HTMLElement;
    size : number;
    private _game: Game;
    position : Vector;
    state : String = "alive";

    /**
     * @param scene The HTMLElement that representats the scene of the game
     */
    constructor(game: Game, scene: HTMLElement, name : string, position : Vector)
    {
        this.html = document.createElement("div");
        this.html.id = name;
        this.html.className = "ball";
        scene.appendChild(this.html);
        this.position = position;
        this._game = game;
    }

    /**
     * Let the ball move over the specified interval
     * 
     * @param interval the time interval to move over
     */
    public move(interval: number) : void
    {
        let old_x = this.position.x();
        let old_y = this.position.y();
        this.position = new Vector(old_x, old_y - 20);
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
        this.html.style.left = "" + (this.position.x() - (this.size / 2)) + 'px';
        this.html.style.top = "" + this.position.y() + 'px';
    }

    public checkVoid(interval: number) : void
    {
        const window = this._game.window;
        if(this.html.offsetTop < 0 || this.html.offsetLeft < 0 || this.html.offsetLeft + this.html.offsetWidth > window.windowWidth || this.html.offsetTop + this.html.offsetHeight > window.windowHeight){
            this.state = "dead";
        }
    }

    public checkCollision(interval: number) : void
    {
        this._game.coins.forEach(coin => {
            if(true){
                //console.log(this.position.pythagoras(coin.position).x);
                if(this.position.pythagoras(coin.position).size() < (this.size/2 + coin.size/2)) {
                    this.state = "dead";
                    coin.state = "dead";
                    this._game.scoreCounter.score += coin.score;
                }
            }       
        });
    }

    public getSize() : number
    {
        return this.size;
    }
}