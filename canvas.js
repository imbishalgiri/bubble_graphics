let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});
const maxRadius = 40;
const minRadius = 4;
const colors = ['#75dddd', '#508991', '#f06449', '#944bbb', '#f7b05b', '#8cdedc'];

function Circle(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.angle = Math.PI * 2;
    this.draw = function() {

        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, this.angle, false);
        c.strokeStyle = "#f6ca83";
        c.stroke();
        c.fillStyle = this.color;
        c.fill();


    }
    this.update = function() {

        if (this.x + this.radius > innerWidth || this.x < this.radius) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y < this.radius) {
            this.dy = -this.dy;
        }

        this.y += this.dy
        this.x += this.dx;

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 2;
            }
        } else if (this.radius > minRadius) {
            this.radius -= 2;
        }

        this.draw();

    }
}

let circleArray = [];

for (let i = 0; i < 800; i++) {
    let radius = (Math.random() * 3) + 10;
    let x = Math.random() * innerWidth;
    let y = Math.random() * innerHeight;
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;


    circleArray.push(new Circle(x, y, radius, dx, dy));


}


function animate() {

    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
animate();