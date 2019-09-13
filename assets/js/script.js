(function () {
    //constant rendering or the game's looping logic || all browser support
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})

//variable declarations
const GAME_WIDTH = 700, GAME_HEIGHT = 300;
var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = GAME_WIDTH,
    height = GAME_HEIGHT,
    player = {
        x: 0,
        y: height - 100,
        width: 20,
        height: 20,
        speed: 3,
        velX: 0,
        velY: 0,
        jumping: false
    },
    floor = {
        x: 0,
        y: height - 150,
        width: GAME_WIDTH,
        height: 20
    }
    levels = 1,
    death = 0,
    keys = [],
    walls = [],
    friction = 0.8,
    gravity = 0.3,
    stageInit = true;
    developerMode = false;

//apply var WxH onto element's dimension
console.log(typeof(canvas));
canvas.width = width;
canvas.height = height;

function Wall(color, x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    var timeInterval= 300;		//time between 2 draw
    var thick = 3;     	//thickness of a line per loop instance
    var cpt = 0;
    
    this.draw = function(){
        context.fillStyle = "white";
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    function draw(){
        context.fillStyle = "white";
        context.fillRect(x, y, width, height);
    }

    this.update = function(){
        this.draw();
    }
}

function createWall(lvl){
    //reset walls every level
    walls = [];

    //when creating/testing new levels
    if(developerMode){
        walls.push(new Wall("white",140,floor.y-50,20,50));
        walls.push(new Wall("white",290,floor.y-50,20,50));
        walls.push(new Wall("white",450,floor.y-50,20,50));
        walls.push(new Wall("white",620,floor.y-50,20,50));
    }
    else{
        if(lvl == 1){
            walls.push(new Wall("white",300,floor.y-30,20,30));
        }else if(lvl == 2){
            walls.push(new Wall("white",200,floor.y-30,20,30));
            walls.push(new Wall("white",350,floor.y-30,20,30));
        }else if(lvl == 3){
            walls.push(new Wall("white",280,floor.y-30,20,30));
            walls.push(new Wall("white",300,floor.y-30,20,30));
            walls.push(new Wall("white",320,floor.y-30,20,30));
            walls.push(new Wall("white",340,floor.y-30,20,30));
        }else if(lvl == 4){
            walls.push(new Wall("white",280,floor.y-30,20,30));
            walls.push(new Wall("white",300,floor.y-30,20,30));
            walls.push(new Wall("white",320,floor.y-30,20,30));

            walls.push(new Wall("white",440,floor.y-30,20,30));
            walls.push(new Wall("white",460,floor.y-30,20,30));
            walls.push(new Wall("white",480,floor.y-30,20,30));
        }else if(lvl == 5){
            walls.push(new Wall("white",280,floor.y-30,20,30));
            walls.push(new Wall("white",300,floor.y-50,20,50));
            walls.push(new Wall("white",320,floor.y-30,20,30));

            walls.push(new Wall("white",440,floor.y-30,20,30));
            walls.push(new Wall("white",460,floor.y-50,20,50));
            walls.push(new Wall("white",480,floor.y-30,20,30));
        }else if(lvl == 6){
            walls.push(new Wall("white",180,floor.y-30,20,30));
            walls.push(new Wall("white",200,floor.y-50,20,50));
            walls.push(new Wall("white",220,floor.y-30,20,30));

            walls.push(new Wall("white",340,floor.y-30,20,30));
            walls.push(new Wall("white",360,floor.y-50,20,50));
            walls.push(new Wall("white",380,floor.y-30,20,30));

            walls.push(new Wall("white",500,floor.y-30,20,30));
            walls.push(new Wall("white",520,floor.y-50,20,50));
            walls.push(new Wall("white",540,floor.y-30,20,30));
        }else if(lvl == 7){
            walls.push(new Wall("white",130,floor.y-35,150,10));
            walls.push(new Wall("white",340,floor.y-10,50,10));
            walls.push(new Wall("white",550,floor.y-50,20,50));
        }else if(lvl == 8){
            walls.push(new Wall("white",180,floor.y-30,20,30));
            walls.push(new Wall("white",200,floor.y-40,20,40));
            walls.push(new Wall("white",220,floor.y-50,20,50));

            walls.push(new Wall("white",370,floor.y-50,20,50));
            walls.push(new Wall("white",390,floor.y-40,20,40));
            walls.push(new Wall("white",410,floor.y-30,20,30)); 

            walls.push(new Wall("white",560,floor.y-30,20,30));
            walls.push(new Wall("white",580,floor.y-40,20,40));
            walls.push(new Wall("white",600,floor.y-50,20,50)); 
        }else if(lvl == 9){
            walls.push(new Wall("white",180,floor.y-30,20,30));
            walls.push(new Wall("white",200,floor.y-50,20,50));
            walls.push(new Wall("white",220,floor.y-30,20,30));

            walls.push(new Wall("white",290,floor.y-35,150,10));

            walls.push(new Wall("white",520,floor.y-30,20,30));
            walls.push(new Wall("white",540,floor.y-50,20,50));
            walls.push(new Wall("white",560,floor.y-30,20,30));
        }else if(lvl == 10){
            walls.push(new Wall("white",140,floor.y-50,20,50));
            walls.push(new Wall("white",290,floor.y-50,20,50));
            walls.push(new Wall("white",450,floor.y-50,20,50));
            walls.push(new Wall("white",620,floor.y-50,20,50));
        }
    }
    
}

//where the fun begins
function updateGame() {

    if(levels > 10){
        var subText;
        context.clearRect(0, 0, width, height);

        context.fillStyle = "orange";
        context.fillRect(287, 95, 20, 20);
        context.fillRect(481, 95, 20, 20);

        context.fillStyle = "white";
        context.font = "60px Verdana";
        context.fillText("You died "+death+" times", 120, 150);
        if(death==0){
            subText = "Wow!!! Congrats!!! Press R to retry"
        }else{
            subText = "Can you do better? Press R to retry"
        }
        context.font = "30px Verdana";
        context.fillText(subText, 110, 190);
        
        return;
    }

    if(stageInit){
        setTimeout(function(){ 
            player.velX++;
            // stageInit = false;
        }, 1000);
    }
    
    //player movement mechanics
    player.velX *= friction;
    player.velY += gravity;
    
    player.x += player.velX;
    player.y += player.velY;

    // check for up keys
    if (keys[38] || keys[32]) {
        // up arrow or space
        if (!player.jumping) {
            player.jumping = true;
            player.velY = -player.speed * 2;
            console.log(player.velY);
        }
    }

    // floor collision
    if(player.y >= floor.y - player.height){
        player.y = floor.y - player.height;
        player.jumping = false;
    }

    // wall collision
    for(var i = 0; i < walls.length; i++){
        var w = walls[i];
        if(player.x+player.width >= w.x && 
            player.x <= w.x+w.width && 
            player.y+player.height >= w.y && 
            player.y <= w.y+w.height){
                console.log("collision");
                player.x = 0;
                death++;
        }
    }

    //player hits the end = new level
    if((player.x + player.width) >= width){
        player.x = 0;
        levels++;
    }

    createWall(levels);
    
    //draws the player onto the canvas
    context.clearRect(0, 0, width, height);

    context.fillStyle = "orange";
    context.fillRect(player.x, player.y, player.width, player.height);
    
    // context.fillStyle = "white";
    context.font = "20px Verdana";
    context.fillText("Death: "+death, 0, 20);
    context.fillText("Level: "+levels, 600, 20);
    context.fillText('Press "Space" to jump', GAME_WIDTH/2-110, GAME_HEIGHT-40);
    context.fillText('Press "R" to reset', GAME_WIDTH/2-90, GAME_HEIGHT-10);

    context.fillStyle = "white";
    context.fillRect(floor.x, floor.y, floor.width, floor.height);

    //loop
    requestAnimationFrame(updateGame);

    for(x=0;x<walls.length;x++){
        walls[x].update();
    }
}

//listener for when a key is pressed
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

//listener for when a key is released
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

//reload game on key R
document.addEventListener('keyup', function(e){
    if(e.keyCode == 82)
      window.location.reload();
});

//page load listener
window.addEventListener("load", function () {
    updateGame();
});



