jQuery(document).ready(function($){
    var grid = [
    ]
    
    var width = 30;
    var height = 20;
    var applechar = "<span class='apple'>@</span>";
    var spacechar = "<span class='space'>░</span>"; //░
    var snakechar = "<span class='snake'>█</span>"; //█
    var wallchar = "<span class='wall'>▓</span>"; //▓
    var pathchar = "<span class='path'>▒</span>"; //▒
    var snake_length = 10;
    //populates the grid with empty space
    function givespace(){
        for(down=0;down<height;down++){
            grid.push([spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar,spacechar]);
        }
        // console.log(grid);
    }
    givespace();
    //appends the grid initially
    function showgrid(){
        for(i=0;i<grid.length;i++){
            $('#box').append(grid[i]);
            $('#box').append("<br>");
        }
    }

    function add_border(){
        for(let i=0;i<grid.length;i++){
            grid[i][0] = wallchar;
            grid[i][29] = wallchar;
            function longways_wall(){
                for(let horizontal=0;horizontal<29;horizontal++){
                    grid[0][horizontal] = wallchar;
                    grid[19][horizontal] = wallchar;
                }
            }
            longways_wall();
        }
    }
    add_border();

    function replacegrid(){
        $('#box').empty();
        for(i=0;i<grid.length;i++){
            $('#box').append(grid[i]);
            $('#box').append("<br>");
        }
    }
    
    snake_x = 10;
    snake_y = 10;
    snake_dir = "right";
    function addsnake(x,y){
        grid[y][x] = snakechar;
        replacegrid();
        // console.log('griddone');
    }
    
    console.log(grid);
    var goners = [

    ]

    function add_apple(){
        apple_x = Math.floor((Math.random() * width) + 0);
        apple_y = Math.floor((Math.random() * height) + 0);
        if(grid[apple_y][apple_x] == spacechar){
            grid[apple_y][apple_x] = applechar;
            console.log(apple_x+" , "+apple_y);
        }else{
            add_apple();
        }
    }
    add_apple();

    showgrid();
    function movement(){
            var timing = setInterval(function(){
                goners.push([snake_x,snake_y]);
                console.log(goners.length);
                // console.log(snake_x+" first "+snake_y);
                if(snake_x==apple_x && snake_y==apple_y){
                    var audio  = new Audio();
                    file = "sounds/apple.mp3";
                    audio.src = file;
                    audio.play();
                    snake_length = snake_length+3;
                    add_apple();
                }
                if(grid[snake_y][snake_x] == snakechar){
                    gameover();
                    clearInterval(timing);
                }
                if(snake_x < 29 && snake_x >= 1 && snake_y < 19 && snake_y >= 1){
                    if(snake_dir == "right"){
                        addsnake(snake_x++,snake_y);
                    }
                    if(snake_dir == "down"){
                        addsnake(snake_x,snake_y++);
                    }
                    if(snake_dir == "up"){
                        addsnake(snake_x,snake_y--);
                    }
                    if(snake_dir == "left"){
                        addsnake(snake_x--,snake_y);
                    }
                } else {
                    gameover();
                    clearInterval(timing);
                    console.log("oops");
                }
                // console.log(snake_x+" second "+snake_y)
                grid[goners[0][1]][goners[0][0]] = pathchar;
                if(goners.length == snake_length){
                    goners.shift();

                }
            }, 100);
        }
        movement();
        function gameover(){
            $('#fail').append("game over ");
            var audio  = new Audio();
            file = "sounds/fail.mp3";
            audio.src = file;
            audio.play();
        }
        
    // $(document).off('keyup');
    $(document).on('keydown', function(event) {
        if (event.keyCode == 37 && snake_dir !== "right") {
            snake_dir = "left";
            console.log(snake_dir);
        }
        if (event.keyCode == 38 && snake_dir !== "down") {
            snake_dir = "up";
            console.log(snake_dir);
        }
        if (event.keyCode == 39 && snake_dir !== "left") {
            snake_dir = "right";
            console.log(snake_dir);
        }
        if (event.keyCode == 40 && snake_dir !== "up") {
            snake_dir = "down";
            console.log(snake_dir);
        }
    });

});


