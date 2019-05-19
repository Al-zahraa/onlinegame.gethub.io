
// needed variables for the canvas
var canvas = document.getElementById("myGame");
var temp = canvas.getContext("2d");

// neded variables for seeting the ball and baddel
var ballX = canvas.width/2;
var ballY = canvas.height-5;
// needed varaibles for the ball
var ballRadius = 5;
var ballCOLOR = "#0095DD" ;
// needed varaibles for the baddle
var paddleHeight = 5;
var paddleWidth = 40;
var paddleX = (canvas.width-paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

// needed variables for brick
var brickWidth = 70;
var brickHeight = 15;
var Rstatus =1 ; Bstatus =1 ; Gstatus =1 ; Pstatus =1; Ystatus =1;

// needed variables for score
var score = 0;

//needed vaiables to move objects
var dx = 1;
var dy = -1;


function draw() {
	temp.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();
    drawScore();
    drawBricks();
    colosion();
	// to mek the ball bounce of the left and right edge
	if(ballX + dx > canvas.width-ballRadius || ballX + dx < ballRadius) {
    dx = -dx;
	}
	// to meke the ball bounce of the top and give game over in the bottom edge
	if(ballY + dy < ballRadius) {
    dy = -dy;
	} 
	// if it hit the bottom wall
	else if(ballY + dy > canvas.height-ballRadius) {
		// to make it bounce of the baddel
    	   if(ballX > paddleX && ballX < paddleX + paddleWidth) {
            dy = -dy;
    	   }
    	else {
        	alert("GAME OVER");
        	document.location.reload();
    	}
	}
	// to control the badddle
	if(rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 4;
	}
	else if(leftPressed && paddleX > 0) {
    paddleX -= 4;
	}

	// to change direction
	ballX += dx;
    ballY += dy;

}
var interval = setInterval(draw, 10);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
	

function drawBall(){
	temp.beginPath();
	temp.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
	temp.fillStyle = ballCOLOR;
	temp.fill();
	temp.closePath();
}
function drawPaddle() {
    temp.beginPath();
    temp.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    temp.fillStyle = "#0095DD";
    temp.fill();
    temp.closePath();
}
function drawBricks(){
    // the red brick 
    if(Rstatus != 0){
        temp.beginPath();
        temp.rect(25, 20, brickWidth, brickHeight);
        temp.fillStyle = "#FF0000";
        temp.fill();
        temp.closePath();
    }
    // the blue rectangle
    if(Bstatus != 0){
        temp.beginPath();
        temp.rect(115, 20, brickWidth, brickHeight);
        temp.fillStyle = "#0000e1";
        temp.fill();
        temp.closePath();
    }
    // the green rectangle
    if(Gstatus != 0){
        temp.beginPath();
        temp.rect(205, 20, brickWidth, brickHeight);
        temp.fillStyle = "#00e100";
        temp.fill();
        temp.closePath();
    }
    // the purble rectangle
    if(Pstatus != 0){
        temp.beginPath();
        temp.rect(70, 50, brickWidth, brickHeight);
        temp.fillStyle = "#a0308e";
        temp.fill();
        temp.closePath();
    }
    // the yellow rectangle
    if(Ystatus != 0){
        temp.beginPath();
        temp.rect(160, 50, brickWidth, brickHeight);
        temp.fillStyle = "#f9f300";
        temp.fill();
        temp.closePath();
    }
    // the black obstecle
    temp.beginPath();
    temp.rect(120, 90, brickWidth, 5);
    temp.fillStyle = "#000000";
    temp.fill();
    temp.closePath();
}

function drawScore() {
    temp.font = "10px Arial";
    temp.fillStyle = "#000000";
    temp.fillText("Score: "+score, 8, 15);
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function colosion(){
    //if it colides with the red
     if(ballX > 25 && ballX < 25+brickWidth && ballY > 20 && ballY < 20+brickHeight && Rstatus==1) {
        dy = -dy;
        Rstatus = 0;
        score+= 20;
        ballCOLOR = "#FF0000" ;
    }

    //if it colides with the blue
     if(ballX > 115 && ballX < 115+brickWidth && ballY > 20 && ballY < 20+brickHeight && Bstatus==1) {
        dy = -dy;
        Bstatus = 0;
        score+= 40 ;
        ballCOLOR = "#0000e1" ;  
    }

    //if it colides with the green
     if(ballX > 205 && ballX < 205+brickWidth && ballY > 20 && ballY < 20+brickHeight && Gstatus==1) {
        dy = -dy;
        Gstatus = 0;
        score+= 80;
        ballCOLOR = "#00e100" ;
    }

    //if it colides with the purble
     if(ballX > 70 && ballX < 70+brickWidth && ballY > 50 && ballY < 50+brickHeight && Pstatus==1) {
        dy = -dy;
        Pstatus = 0;
        score+=60;
        ballCOLOR = "#a0308e" ;
    }

    //if it colides with the yellow
     if(ballX > 160 && ballX < 160+brickWidth && ballY > 50 && ballY < 50+brickHeight && Ystatus==1) {
        dy = -dy;
        score+= 50;
        Ystatus = 0;
        ballCOLOR = "#f9f300" ;
    }

    //if it colides with the black
    if(ballX > 120 && ballX < 120+brickWidth && ballY > 90 && ballY < 90+brickHeight) {
        dy = -dy;

    }
    // to display a wining message if the brick are done
    if(score == 250) {
        alert("CONGRATULATIONS!");
        document.location.reload();
        clearInterval(interval); 
    }

}



