class FPSCounter
{
    html : HTMLElement;
    fps : number;

    /**
     * @param scene The HTMLElement that representats the scene of the game
     */
    constructor(scene: HTMLElement, name : string)
    {
        this.html = document.createElement("div");
        this.html.id = name;
        this.html.className = "fps";
        scene.appendChild(this.html);
    }

    /**
     * Render the ball on the correct position on the screen
     * 
     * @param interval the time interval to move over
     */
    public draw(interval: number) : void
    {
        this.html.innerHTML = Math.round(1 / interval) + "fps";
    }

}