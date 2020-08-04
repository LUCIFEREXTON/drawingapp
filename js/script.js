let paintarea = false;
let paint = true;
let linewidth = 1;
let paintcolor = "black";
let mouse = {
    x: 0,
    y: 0
};


//load saved drawing 
if (localStorage.getItem("canvasdrawing") != null) {
    let drawing = new Image();
    drawing.onload = () => {
        canvas.drawImage(drawing, 0, 0);
    };
    drawing.src = localStorage.getItem("canvasdrawing");
}
//defining erase button 
$(".erase").click(() => {
    $(".erase").text(($(".erase").text() == "Paint") ? "Erase" : "Paint");
    paint = (paint == true) ? false : true;
    $("canvas").css("cursor", ($("canvas").css("cursor") == "crosshair") ? "grab" : "crosshair");


});


//changing height and width of canvas
document.getElementById("canvas").height = $(".area").height();;
document.getElementById("canvas").width = $(".area").width();;
let canvas = document.getElementById("canvas").getContext("2d");

canvas.lineWidth = linewidth;
canvas.lineJoin = "round";
canvas.lineCap = "round";


//change brush size
document.getElementById("slider").oninput = function() {
    $("#box").width(this.value);
    $("#box").height(this.value);
    linewidth = this.value;
};

//choose brush color
document.getElementById("color").addEventListener("input", changecolor, false);

function changecolor(event) {
    paint = true;
    $(".erase").text("Erase");
    $("canvas").css("cursor", "crosshair");
    $("#box").css("background-color", event.target.value);
    paintcolor = event.target.value;
};


//when mouse leave canvas area
$("canvas").mouseleave(function() {
    paintarea = false;
});

//get touch poistion
let cX;
let cY;

//when ouse is painting or erasing
$("canvas").mousedown(function(e) {
    e.preventDefault();
    paintarea = true;
    canvas.lineWidth = linewidth;
    mouse.x = e.clientX - this.offsetLeft;
    mouse.y = e.clientY - this.offsetTop + $(window).scrollTop();
    canvas.beginPath();
    canvas.moveTo(mouse.x, mouse.y);
});
document.getElementById("canvas").addEventListener("touchstart", function(e) {
    cX = e.touches[0].clientX;
    cY = e.touches[0].clientY;
    paintarea = true;
    canvas.lineWidth = linewidth;
    mouse.x = cX - this.offsetLeft;
    mouse.y = cY - this.offsetTop + $(window).scrollTop();
    canvas.beginPath();
    canvas.moveTo(mouse.x, mouse.y);
});

//when ending stoke
$("canvas").mouseup(function() {
    paintarea = false;
});

document.getElementById("canvas").addEventListener("touchend", function(e) {
    paintarea = false;
}, false);

//while painting
$("canvas").mousemove(function(e) {

    e.preventDefault();
    mouse.x = e.clientX - this.offsetLeft;
    mouse.y = e.clientY - this.offsetTop + $(window).scrollTop();

    canvas.lineWidth = linewidth;
    if (paintarea) {
        if (paint) {
            canvas.strokeStyle = paintcolor;
        } else {
            canvas.strokeStyle = "white";
        }
        canvas.lineTo(mouse.x, mouse.y);
        canvas.stroke();
    }
});

document.getElementById("canvas").addEventListener("touchmove", function(e) {
    e.preventDefault();
    cX = e.touches[0].clientX;
    cY = e.touches[0].clientY;
    mouse.x = cX - this.offsetLeft;
    mouse.y = cY - this.offsetTop + $(window).scrollTop();

    canvas.lineWidth = linewidth;
    if (paintarea) {
        if (paint) {
            canvas.strokeStyle = paintcolor;
        } else {
            canvas.strokeStyle = "white";
        }
        canvas.lineTo(mouse.x, mouse.y);
        canvas.stroke();
    }
});

//defining save button
$(".save").click(function() {
    if (typeof(localStorage) != null) {
        localStorage.setItem("canvasdrawing", document.getElementById("canvas").toDataURL());
    } else {
        alert("Your browser doesn't support temprory storage");
    }
});

$(".reset").click(() => {
    location.reload();
});