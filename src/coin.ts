class Coin
{
    name : String;
    html : HTMLElement;
    size : number;
    game: Game;
    position : Vector;
    movingX : number;
    movingY : number;
    score : number;
    state : String = "alive";

    /**
     * @param scene The HTMLElement that representats the scene of the game
     */
    constructor(game: Game, scene: HTMLElement, name : string)
    {
        this.html = document.createElement("div");
        this.html.id = name;
        this.html.className = name;
        scene.appendChild(this.html);
        this.game = game;
        this.position = new Vector(Math.floor(Math.random() * this.game.window.windowWidth - 128) + 50, 1);
        this.movingX = Math.floor(Math.random() * (10 - -10 + 1)) + -10; // -10 - 10
        this.movingY = Math.floor(Math.random() * (7 - 5 + 1)) + 5; // 2- 10
    }

    /**
     * Let the coin move over the specified interval
     * 
     * @param interval the time interval to move over
     */
    public move(interval: number) : void
    {
        let old_x = this.position.x();
        let old_y = this.position.y();
        this.position = new Vector(old_x + this.movingX, old_y + this.movingY);
    }

    /**
     * Render the coin on the correct position on the screen
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

    public checkVoid(interval: number) : void
    {
        const coin = this.html;
        const window = this.game.window;
        if(this.html.offsetTop < 0 || this.html.offsetLeft < 0 || this.html.offsetLeft + this.html.offsetWidth > window.windowWidth || this.html.offsetTop + this.html.offsetHeight > window.windowHeight){
            this.state = "dead";
        }
    }

    public getSize() : number
    {
        return this.size;
    }
}