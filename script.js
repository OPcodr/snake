jQuery(document).ready(function($){
    var grid = [
    ]
    
    var width = 30;
    var height = 20;
    var spacechar = "░"; //░
    var snakechar = "█"; //█
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
        // console.log(grid);
        grid[y][x] = snakechar;
        replacegrid();
        // console.log('griddone');
    }

    var goners = [

    ]

    showgrid();
    function movement(){
        function move(){
            setInterval(function(){
                goners.push([snake_x,snake_y]);
                console.log(goners.length);
                // console.log(snake_x+" first "+snake_y);
                if(snake_x < 30 && snake_x >= 0 && snake_y < 20 && snake_y >= 0){
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
                    $('#box').append("game over ");
                }

                // console.log(snake_x+" second "+snake_y)
                grid[goners[0][1]][goners[0][0]] = "o";
                if(goners.length == 5){
                    goners.shift();

                }
            }, 100);
        }
        move();
    }
    movement();

    $(document).off('keyup');
    $(document).on('keydown', function(event) {
        if (event.keyCode == 37) {
            snake_dir = "left";
            console.log(snake_dir);
        }
        if (event.keyCode == 38) {
            snake_dir = "up";
            console.log(snake_dir);
        }
        if (event.keyCode == 39) {
            snake_dir = "right";
            console.log(snake_dir);
        }
        if (event.keyCode == 40) {
            snake_dir = "down";
            console.log(snake_dir);
        }
    });

});


