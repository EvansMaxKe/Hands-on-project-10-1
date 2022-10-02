// global variables
var onTop;
var loc = [];
var origin;


// operations to be carried out when the page first loads
function setUpPage() {
   var puzzlePieces = document.querySelectorAll("#pieces div");
   onTop = puzzlePieces.length + 1;
   for (var i = 0; i < puzzlePieces.length; i++) {
      if (puzzlePieces[i].addEventListener) {
         puzzlePieces[i].addEventListener("mousedown", startDrag, false);
         puzzlePieces[i].addEventListener("touchstart", startDrag, false);
      } else if (puzzlePieces[i].attachEvent) {
         puzzlePieces[i].attachEvent("onmousedown", startDrag);
      }
   }
}

// determine the event locations
function getCoords(event) {
   var coords = []; //local variable

   if (event.targetTouches && event.targetTouches.length) {
      var thisTouch = event.targetTouches[0];
          coords[0] = thisTouch.clientX;
          coords[1] = thisTouch.clientY;

    } else {      
          coords[0] = event.clientX;
          coords[1] = event.clientY;
    }
          return coords;
}

// implement event listener to move the element when the user starts dragging
function startDrag(event) {
      this.style.zIndex = onTop; // setting z-index to move selected element on top of other elements
      onTop++; // increment z-index counter to enable next selected element to be on top of other elements
      event.preventDefault();

      //add conditional statement for mouse events
   if (event.type !== "mousedown") {
      this.addEventListener("touchmove", moveDrag, false);
      this.addEventListener("touchend", removeTouchListener, false);
   
  } else {
      this.addEventListener("mousemove", moveDrag, false);
      this.addEventListener("mouseup", removeDragListener, false);
  }
      loc = [this.offsetLeft,this.offsetTop];
      origin = getCoords(event);
}

// calculate new location of dragged object
function moveDrag(event) {
   var currentPos = getCoords(event);
   var deltaX = currentPos[0] - origin[0];
   var deltaY = currentPos[1] - origin[1];
    this.style.left = (loc[0] + deltaX) + "px";
    this.style.top  = (loc[1] + deltaY) + "px";
}

//clear the touch event lister when user stops touching the element of the picture
function removeTouchListener() {
   this.removeEventListener("touchmove", moveDrag, false);
   this.removeEventListener("touchend", removeTouchListener, false);
}

// clear the mouse event listener when the user stops dragging the element
function removeDragListener() {
    this.removeEventListener("mousemove", moveDrag, false);
    this.removeEventListener("mouseup", removeDragListener, false);
}

// execute the setUpPage() function when the pages finishes loading
if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
}
