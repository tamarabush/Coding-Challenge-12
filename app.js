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



//TASK 3 - Implement Shape Drawing Logic:
 
function drawShape(x, y) {
    ctx.strokeStyle = color; //set the color for the shape outline
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas for smoother drawing
    ctx.beginPath();
    
    //determine which shape to draw based on the selected tool using case/break/switch
    switch (tool) {
        case 'line':
            //draw a line from the starting point to the current mouse position
            ctx.moveTo(startX, startY);
            ctx.lineTo(x, y);
            break;
        case 'rectangle':
            //draw a rectangle from the starting point to the current mouse position
            ctx.rect(startX, startY, x - startX, y - startY);
            break;
        case 'circle':
            //calculate the radius based on the distance between the starting and current position
            const radius = Math.hypot(x - startX, y - startY); 
            ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
            break;
    }
    
    ctx.stroke(); // Draw the selected shape
}
