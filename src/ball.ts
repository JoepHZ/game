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
        this.position = new Vector(old_x, old_y - 5);
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

}