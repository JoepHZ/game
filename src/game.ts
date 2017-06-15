/**
 * This is the main class of the game.
 * 
 * @author BugSlayer
 */
class Game
{
    intervalSetting = 50;       // The desired interval in ms
    previousIterationStart = 0; //The time the previous iteration started
    intervalSeconds = 0;        // The calculated interval between the start of the last iteration and the current one

    balls : Array<Ball> = [];
    coins : Array<Coin> = [];
    maxCoins : number = 1;
    gameover : boolean = false;

    window : WindowListener;
    keyboard : KeyListener;
    mouse: MouseListener;
    
    scene : HTMLElement;
    scoreCounter : ScoreCounter;
    spaceship : Spaceship;

    /**
     * Construct a new Game
     * 
     * @param scene The HTMLElement that represents the game scene
     */
    constructor(scene: HTMLElement)
    {
        this.window = new WindowListener();
        this.keyboard = new KeyListener();
        this.mouse = new MouseListener();
        this.scene = scene;
        this.scoreCounter = new ScoreCounter(scene, "fps1");
        this.spaceship = new Spaceship(this, scene, "spaceship");
    }

    /**
     * Start the game. This method should only be called once!
     */
    public start() {
       this.animate();
    }

    /**
     * Lambda that performs one iteration, and sets a timeout for the next.
     */
    animate = () => {
        // find the timing data
        var loopStart = window.performance.now();
        if (this.previousIterationStart == 0) {
            this.intervalSeconds = this.intervalSetting / 1000;
        } else {
            this.intervalSeconds = (loopStart - this.previousIterationStart) / 1000;
        }
        this.previousIterationStart = loopStart;
        
        // The steps of the game loop
        this.listen(this.intervalSeconds);
        this.move(this.intervalSeconds);
        this.draw(this.intervalSeconds);
        this.spawn(this.intervalSeconds);
        this.checkVoid(this.intervalSeconds);
        this.checkCollision(this.intervalSeconds);
        this.checkScore(this.intervalSeconds);
        this.garbageCollect(this.intervalSeconds);
        // compute the time to wait for the next iteration
        var diff = (window.performance.now() - loopStart);

        // set the timout for the next iteration
        setTimeout(this.animate, this.intervalSetting - diff);
    }

    /**
     * Listen and act to game inputs and other stuff like mouse, keyboard, screen size, network.
     * 
     * @param interval the time interval in seconds between this call and the previous
     */
    private listen(interval: number) : void
    {
        this.window.listen(interval);
    }

    /**
     * Accelerate and move the game objects according to the laws of physics. Thank you sir Isaac Newton.
     * 
     * @param interval the time interval in seconds between this call and the previous
     */
    private move(interval: number) : void
    {
        this.spaceship.move(interval);
        this.spaceship.shoot(interval);

        this.balls.forEach(ball => {
            ball.move(interval);
        });

        this.coins.forEach(coin => {
            coin.move(interval);
        })
    }

    /**
     * This translates the game state into a graphical representation on the screen.
     * 
     * @param interval the time interval in seconds between this call and the previous
     */
    private draw(interval: number) : void
    {
        this.spaceship.draw(interval);
        this.scoreCounter.draw(interval);

        this.balls.forEach(ball => {
            ball.draw(interval);
        });

        this.coins.forEach(coin => {
            coin.draw(interval);
        })
    }

    private spawn(interval: number) : void
    {
        if(this.coins.length < this.maxCoins){
            if(Math.random() > 0.25){
                if(Math.random() > 0.75){
                    this.coins.push(new Bitcoin(this, this.scene, 'bitcoin'));
                }else{
                    this.coins.push(new Euro(this, this.scene, 'euro'));
                }
            }
        }
    }

    private checkVoid(interval: number) : void
    {
        this.balls.forEach(ball => {
            ball.checkVoid(interval);
        })

        this.coins.forEach(coin => {
            coin.checkVoid(interval);
        })
    }

    private checkCollision(interval: number) : void
    {
        this.balls.forEach(ball => {
            ball.checkCollision(interval);
        });
    }

    private checkScore(interval: number) : void
    {
        if(this.scoreCounter.score > this.maxCoins * 5){
            this.maxCoins++;
        }else{
            if(this.maxCoins <= 1){
                this.maxCoins = 1;
            }else{
                this.maxCoins--;
            }
        }     

        if(this.scoreCounter.score >= 420 && this.gameover != true){
            this.gameover = true;
            window.location.replace("congratulations.html");
        }   
    }

    private garbageCollect(interval: number) : void
    {
        this.balls.forEach(ball => {
            if(ball.state == "dead"){
                if(ball.html.parentNode != null){
                    ball.html.parentNode.removeChild(ball.html);
                    this.balls.splice(this.balls.indexOf(ball), 1);
                }
            }
        })

        this.coins.forEach(coin => {
            if(coin.state == "dead"){
                if(coin.html.parentNode != null){
                    coin.html.parentNode.removeChild(coin.html);
                    this.coins.splice(this.coins.indexOf(coin), 1);
                }
            }
        })
    }
}