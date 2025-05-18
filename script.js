const questions = [
    "Baltodano Cubillo Jamil Jesús",
    "Bonilla García Keitty María",
    "Flores Medina Jazmín",
    "González Pérez Ashley Tatiana",
    "Hazera Díaz José Roberto",
    "Jara Gómez Alberto Antonio",
    "Marquett Elizondo Teresa Angie",
    "Medina Álvarez Ariana Poleth",
    "Miranda Jiménez Allison Fiorella",
    "Gisella Ortiz Castro",
    "Ginnette Quesada Quesada",
    "Ramírez Villalobos Marita",
    "Rodríguez Bermúdez Yasnna Suri",
    "Salas Pineda Marcela",
    "Sánchez Marín Josué",
    "Sequeira Hernández María Fabiola",
    "Solís Estrada Allyson Francinni",
    "Soto Zúñiga Kevin Javier",
    "Tenorio Aguilar Camila Tais",
    "Venegas Torres Rafael",
    "Villalobos Araya Alexandra"
];

const wheel = document.getElementById('wheel');
const ctx = wheel.getContext('2d');
const questionContainer = document.getElementById('question-container');
let angle = 0;
let spinning = false;

function drawWheel() {
    const numSegments = questions.length;
    const segmentAngle = 2 * Math.PI / numSegments;

    for (let i = 0; i < numSegments; i++) {
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 250, i * segmentAngle, (i + 1) * segmentAngle);
        ctx.closePath();
        ctx.fillStyle = i % 2 === 0 ? '#FFDDC1' : '#FFABAB';
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate((i + 0.5) * segmentAngle);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000';
        ctx.font = '16px Arial';
        ctx.fillText(questions[i], 240, 10);
        ctx.restore();
    }
}

function spinWheel() {
    if (spinning) return;
    spinning = true;
    const spinAngle = Math.random() * 10 + 10;
    const spinTime = 3000;
    const startTime = Date.now();

    function animate() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < spinTime) {
            angle += spinAngle * (1 - elapsedTime / spinTime);
            angle %= 2 * Math.PI;
            ctx.clearRect(0, 0, wheel.width, wheel.height);
            ctx.save();
            ctx.translate(250, 250);
            ctx.rotate(angle);
            ctx.translate(-250, -250);
            drawWheel();
            ctx.restore();
            requestAnimationFrame(animate);
        } else {
            spinning = false;
            const selectedSegment = Math.floor((angle / (2 * Math.PI)) * questions.length);
            questionContainer.textContent = questions[selectedSegment];
        }
    }

    animate();
}

drawWheel();
