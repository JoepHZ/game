class Bitcoin extends Coin
{
    score : number = 5;

    /**
     * @param scene The HTMLElement that representats the scene of the game
     */
    constructor(game: Game, scene: HTMLElement, name : string)
    {
        super(game, scene, name);
    }
}