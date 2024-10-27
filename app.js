//TASK 2 - Configure the JavaScript for Drawing Context

//Get the canvas element from the HTML and set up a 2D drawing context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let drawing = false; //Tracks if the mouse is currently pressed down
let startX = 0; //X coordinate where drawing starts
let startY = 0;  //Y coordinate where drawing starts
let tool = 'line';  //Default drawing tool
let color = '#000000'; //Default drawing color

//tool selection - add event listeners to each radio button to set the drawing tool
document.querySelectorAll('input[name ="tool"]').forEach((input) =>  {
    input.addEventListener('change', (e) => {
        tool = e.target.value;
    });
});

//color selection: update the color variable when the color picker value changes
document.getElementById('colorPicker').addEventListener('input', (e) => {
    color = e.target.value; //set color to the selected value
});

//mouse events for drawing shapes on the canvas
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    //record the starting coordinates of the shape
    startX = e.offsetX;
    startY = e.offsetY;
});

canvas.addEventListener('mouseup', () => {
     //stop drawing when mouse button is released
    drawing = false;
    ctx.beginPath(); //reset the path to prepare for a new shape
});

canvas.addEventListener('mousemove', (e) => {
    //draw only if the mouse is pressed down (drawing state is true)
    if (drawing) {
        drawShape(e.offsetX, e.offsetY); //draw the shape based on current mouse position
    }
});

//function to draw shapes based on selected tool and coordinates
function drawShape(x, y) {
    ctx.strokeStyle = color; //set the drawing color
    ctx.beginPath(); //begin a new path for the shape

    //draw shape based on selected tool
    if (tool === 'line') {
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
    }
    ctx.stroke();
}