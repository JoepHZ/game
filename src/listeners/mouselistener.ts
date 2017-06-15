/**
 * This class handles the mouse events. It knows the last know state of the mouse position
 * and left button (other buttons cannot be handled).
 * 
 * Some parts of this class are pretty complex, but the class itself is fairly easy to use.
 * 
 * @author BugSlayer
 */
class MouseListener
{
    inWindow : boolean;   // true if the mouse is in the game window
    position : Vector;    // holds the last known position of the mouse
    buttonDown : boolean; // true if the left button is down
                          // other buttons cannot be handled

    /**
     * Constructs a new MouseListener.
     */
    constructor() {
        this.position = new Vector();
        this.inWindow = true;
        window.addEventListener("mousedown", this.mouseDown);
        window.addEventListener("mouseup", this.mouseUp);
        window.addEventListener("mousemove", this.mouseMove);
        document.addEventListener("mouseenter", this.mouseEnter);
        document.addEventListener("mouseleave", this.mouseLeave);
    }

    /**
     * Listen to the mouse state.
     * 
     * @param interval the time interval between this call and the previous
     */
    public listen(interval: number) : void
    {
        // Nothing to do. Mouse events are handled somewhere else
    }

    /**
     * Lambda that catches mouseDown events
     */
    mouseDown = (ev: MouseEvent) => {
        this.buttonDown = true;
    }

    /**
     * Lambda that catches mouseUp events
     */
    mouseUp = (ev: MouseEvent) => {
        this.buttonDown = false;
    }

    /**
     * Lambda that catches mouseMove events
     */
    mouseMove = (ev: MouseEvent) => {
       	this.position = new Vector(ev.clientX, ev.clientY);
    }

    /**
     * Lambda that catches mouseEnter events
     */
    mouseEnter = (ev: MouseEvent) => {
        this.inWindow = true;
    }

    /**
     * Lambda that catches mouseLeave events
     */
    mouseLeave = (ev: MouseEvent) => {
        this.inWindow = true;
    }

}