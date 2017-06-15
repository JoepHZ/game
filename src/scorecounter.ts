class ScoreCounter
{
    html : HTMLElement;
    fps : number;
    score : number = 0;

    /**
     * @param scene The HTMLElement that representats the scene of the game
     */
    constructor(scene: HTMLElement, name : string)
    {
        this.html = document.createElement("div");
        this.html.id = name;
        this.html.className = "score";
        scene.appendChild(this.html);
    }

    /**
     * Render the ball on the correct position on the screen
     * 
     * @param interval the time interval to move over
     */
    public draw(interval: number) : void
    {
        this.html.innerHTML = "Score: " + this.score;
    }

}