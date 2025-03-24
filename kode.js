let button = document.getElementById("screenjumper"); // lager ancoren i htmlen til en knapp

let params = "width=495,height=450,left=500,top=200"; // hvor stor den skal være og hvor den skal starte
let popup;
let condition = true;

button.onclick = () => { // når du trykker på knappen
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