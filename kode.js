let button = document.getElementById("screenjumper").addEventListener("click", randomFunction); // lager ancoren i htmlen til en knapp

let params = "width=495,height=450,left=500,top=200"; // hvor stor den skal være og hvor den skal starte
let popup;
let condition = true;

function randomFunction() { // når du trykker på knappen
    popup = window.open("/bilder/cat explode.gif", "test", params); // lager popupen
    animatePopup(); // starter animasjonen
};

document.body.onkeyup = function(e) {
    if (e.keyCode == 32) { // Space bar
        condition = false; // stopper bevegelsen
    }
};

function animatePopup() {
    if (popup && !popup.closed && condition) { // hvis popupen er åpen og bevegelsen ikke er stoppet
        popup.moveBy(Math.random() * 15 - 6, Math.random() * 15 - 6); // hvor mye den skal bevege seg om gangen
        requestAnimationFrame(animatePopup); // fortsetter animasjonen
    }
}


//ALT UNDER LAGET AV CHATGPT
//ALT UNDER LAGET AV CHATGPT
//ALT UNDER LAGET AV CHATGPT
// const img = document.getElementById('Draggable');

//     let offsetX = 0;
//     let offsetY = 0;
//     let isDragging = false;

//     // When mouse is pressed down on the image
//     img.addEventListener('mousedown', function(event) {
//       isDragging = true;
//       // Calculate the offset from the top-left corner of the image
//       offsetX = event.clientX - img.offsetLeft;
//       offsetY = event.clientY - img.offsetTop;
//     });

//     // When mouse moves
//     document.addEventListener('mousemove', function(event) {
//       if (isDragging) {
//         // Move the image to follow the mouse cursor
//         img.style.left = (event.clientX - offsetX) + 'px';
//         img.style.top = (event.clientY - offsetY) + 'px';
//       }
//     });

//     // When mouse button is released
//     document.addEventListener('mouseup', function() {
//       isDragging = false;
//     });