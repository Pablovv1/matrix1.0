const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");
const palabraInput = document.getElementById("palabraInput");
const colorInput = document.getElementById("colorInput");
const sizeInput = document.getElementById("sizeInput");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let palabra = "";
let fontSize = parseInt(sizeInput.value); // Obtiene el tamaño inicial
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(0);
const palabrasCayendo = [];

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = colorInput.value;
    ctx.font = `bold ${fontSize}px monospace`;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;

    palabrasCayendo.forEach((item, index) => {
        ctx.strokeText(item.text, item.x, item.y);
        ctx.fillText(item.text, item.x, item.y);
        item.y += fontSize * 0.5;

        if (item.y > canvas.height) {
            palabrasCayendo.splice(index, 1);
        }
    });

    for (let i = 0; i < drops.length; i++) {
        if (palabra) {
            ctx.strokeText(palabra, i * fontSize, drops[i] * fontSize);
            ctx.fillText(palabra, i * fontSize, drops[i] * fontSize);
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops.fill(0);
});

palabraInput.addEventListener("input", () => {
    palabra = palabraInput.value.trim().toUpperCase();
});

sizeInput.addEventListener("input", () => {
    fontSize = parseInt(sizeInput.value);
});

canvas.addEventListener("click", (event) => {
    if (palabra) {
        palabrasCayendo.push({
            text: palabra,
            x: event.clientX - (ctx.measureText(palabra).width / 2),
            y: event.clientY
        });
    }
});
