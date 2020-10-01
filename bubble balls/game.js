let width;
let height;
let canvas;
let ctx;
let isDown = false
var maxRadius = 50;

canvas = document.getElementById('game-area');
ctx = canvas.getContext('2d');

// var points = document.getElementById('points');
// points.innerHTML = '0';
// console.log(points);


width = window.innerWidth;
height = window.innerHeight;
canvas.width = width;
canvas.height = height;

var colorArr = [
    '#F4F1DE',
    '#E07A5F',
    '#3D405B',
    '#81B29A',
    '#F2CC8F',
];

var backgroundColorArr = [
    '#606c38',
    '#283618',
    '#dda15e',
    '#bc6c25',
];
// window.addEventListener('click', function newBG() {
//     var randomBG = backgroundColorArr[Math.floor(Math.random() * backgroundColorArr.length)];
//     canvas.style.backgroundColor = randomBG;
// });

var mouse = {
    x: undefined,
    y: undefined,
}

window.addEventListener('resize', function () {
    canvas.width = width;
    canvas.height = height;

    init();
});


window.addEventListener('click', function () {
    circleArr.forEach(circle => {
        if (mouse.x - circle.x < 100 && mouse.x - circle.x > -100 && mouse.y - circle.y < 100 && mouse.y - circle.y > -100 &&
            (circle.dx < 5 && circle.dy < 5 && circle.dx > -5 && circle.dy > -5)) {
            circle.dx = circle.dx * 40;
            circle.dy = circle.dy * 40;
        }
    })
});
//when mouse is clicked and held, if a circle is within the radius of the mouse: circle pos = mouse pos
window.addEventListener('mousedown', function () {
    circleArr.forEach(circle => {
        if (mouse.x - circle.x < 100 && mouse.x - circle.x > -100 && mouse.y - circle.y < 100 && mouse.y - circle.y > -100) {
            circle.x = mouse.x;
            circle.y = mouse.y;
            isDown = true;
        }
    })
})
//
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;

    circleArr.forEach(circle => {
        if (isDown && mouse.x - circle.x < 50 && mouse.x - circle.x > -50 && mouse.y - circle.y < 50 && mouse.y - circle.y > -50) {
            circle.x = mouse.x
            circle.y = mouse.y
        }
    });
});

window.addEventListener('mouseup', function () {
    isDown = false;
});

// window.addEventListener('keydown', function (event) {
//     console.log(event.key)
//     circleArr.forEach(circle => {
//         switch (event.key) {
//             case 'ArrowLeft':
//                 circle.dx -= 1;
//                 break;
//             case 'ArrowRight':
//                 circle.dx += 1;
//                 break;
//             case 'ArrowDown':
//                 circle.dy += 1;
//                 break;
//             case 'ArrowUp':
//                 circle.dy -= 1;
//                 break;
//         }
//     })
// })

class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = colorArr[Math.floor(Math.random() * colorArr.length)];
    }

    draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'teal';
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update = () => {
        if (this.x + this.radius > width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }


        this.x += this.dx;
        this.y += this.dy;

        //interactivity with mouse
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 10;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        if (this.dx > 2) {
            this.dx -= 2;
        } else if (this.dy > 2) {
            this.dy -= 2;
        }

        this.draw();
    }

}


//array of the circle objects
let circleArr = [];
//creating the balls
function init() {
    //clears circle arr
    circleArr = [];

    //creating the circles to add into circleArr
    for (let i = 0; i < 100; i++) {
        var radius = Math.random() * 5 + 3;
        var x = Math.random() * (width - radius * 2) + radius;
        var y = Math.random() * (height - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 3;
        var dy = (Math.random() - 0.5) * 3;

        circleArr.push(new Circle(x, y, dx, dy, radius));
    }
}

//animates constantly
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);

    circleArr.forEach(circle => {
        circle.update();
    });
}

init();
animate();