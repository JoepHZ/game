/** Class representing a keyboardListener */
class KeyListener
{
     private _keyevents : any = {left:false, right:false, space:false} //should be dynamic

    /**
     * Create a keyboardListener
     */
    constructor() {
        window.addEventListener("keydown", this.keyUpDownHandler);
        window.addEventListener("keyup", this.keyUpDownHandler);
    }

    /**
    * Keyboard handler
    * @param {KeyboardEvent} e - event object
    */
    private keyUpDownHandler = (e : KeyboardEvent) => {
      if(e.key == 'ArrowLeft' && e.type == 'keydown'){
        this._keyevents.left = true;
        this._keyevents.right = false;
        this._keyevents.space = false;
      }else if (e.key == 'ArrowRight' && e.type == 'keydown' ) {
        this._keyevents.right = true;
        this._keyevents.left = false;
        this._keyevents.space = false;
      }else if(e.key == " " && e.type == 'keydown'){
          this._keyevents.right = false;
          this._keyevents.left = false;
          this._keyevents.space = true;
      }else{
        this._keyevents.left = false;
        this._keyevents.right = false;
        this._keyevents.space = false;
      }
    }

    /**
    * Get the keyevents
    * @return {any} The keyevent value
    */
    get keyevents(): any{
      return this._keyevents;
    }

}
