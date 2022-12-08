var height;
var world = [height];
var snake;
var eatapple = 0;
var applesLvl;
var numLvl;
var wallsLvl;

if(localStorage.getItem('speed') === null){
    localStorage.setItem('speed',400);
}
var speed = 800 - localStorage.getItem('speed');

if(localStorage.getItem('headcolor') === null){
    localStorage.setItem('headcolor',"#ffffff");
}
var headcolor = localStorage.getItem('headcolor');

if(localStorage.getItem('snakecolor') === null){
    localStorage.setItem('snakecolor',"#f6b73c");
}
var snakecolor = localStorage.getItem('snakecolor');

if(localStorage.getItem('board_color1') === null){
    localStorage.setItem('board_color1', "#2eb82e");
}
var board_color1 = localStorage.getItem('board_color1');

if(localStorage.getItem('board_color2') === null){
    localStorage.setItem('board_color2',"#29a329");
}
var board_color2 = localStorage.getItem('board_color2');

if(localStorage.getItem('apple_color') === null){
    localStorage.setItem('apple_color', "#FFD700");
}
var apple_color = localStorage.getItem('apple_color');

//Initialisation des élements audio utilisés plus tard
var lose_audio = document.createElement("audio");
lose_audio.src = "assets/sounds/lose.wav";
var tenapple = document.createElement("audio");
tenapple.src = "assets/sounds/tenapple.wav";
var win_audio = document.createElement("audio");
win_audio.src = "assets/sounds/win.mp3";

document.getElementById('div_settings').setAttribute ('style','visibility: hidden');

//Initialisation du canvas pour pouvoir dessiner dessus
var canvas = document.getElementById('board');
var ctx = canvas.getContext('2d');

/* Gestion des évenements */

/*Ajout d'évenements sur les boutons de jeu libre
Ils font appel directement à la fonction run()*/
document.getElementById("button_free_giant").addEventListener('click',function(){
    run('giant');
});

document.getElementById("button_free_big").addEventListener('click',function(){
    run('big');
});

document.getElementById("button_free_mid").addEventListener('click',function(){
    run('mid');
});

document.getElementById("button_free_small").addEventListener('click',function(){
    run('small');
});

/*Ajout d'évenements sur les autres boutons du menu
Ils modifient le DOM pour faire apparaitre de nouveaux élements
Un texte d'explications et une menu de selection de levels dans le menu Aventure
Differentes options de personnalisations dans le menu Paramètres
Les credits des créateurs du jeu dans le menu Crédits*/
document.getElementById("button_adventure").addEventListener('click',function(){

    document.getElementsByTagName('html')[0].setAttribute('style','overflow: visible');
    
    document.getElementById('button_adventure').remove();
    document.getElementById('button_settings').remove();
    document.getElementById('button_credits').remove();
    document.getElementById('div_settings').innerHTML = "";
    document.getElementById('div_button').innerHTML = "";

    var presentation = document.createElement("div");
    presentation.setAttribute('id','presentation');
    document.getElementById('snakeit').appendChild(presentation);
    presentation.innerHTML="<p>Bonjour agent spatial snako et bienvenue dans votre nouvelle mission , 'SNAKE IT' !</p><p> Dans cette mission, vous allez etre lachés dans la galaxie lointaine ILMF13-1.</p><p> Votre but ? ramasser le plus de pommes dorées pour rammener cette richesse unique ici, sur terre.</p><p> Nous vous souhaitons bonne chance et a la prochaine .</p><p> Terminé !</p>";     

    /*Boucle pour afficher des boutons pour les levels
    Nous n'avons pas trouvé le moyen de savoir le nombre de fichiers dans le dossier JSON donc la boucle doit être modifiés à chaque ajout d'un level*/
    for(var i = 1; i <= 6; i++){

        var button = document.createElement("a");
        button.textContent = 'Level ' + i;
        button.setAttribute('class','button');
        button.setAttribute('href','#' + i);
        document.getElementById('div_button').appendChild(button);
    }
    createBackButton();
    
});

document.getElementById("button_settings").addEventListener('click',function(){
    document.getElementById('div_menu').innerHTML = "";
    document.getElementById('div_settings').setAttribute ('style','visibility: visible');
    document.getElementById("speed").setAttribute('value',localStorage.getItem('speed'));
    document.getElementById("headcolor").setAttribute('value',localStorage.getItem('headcolor'));
    document.getElementById("snakecolor").setAttribute('value',localStorage.getItem('snakecolor'));
    document.getElementById("board_color1").setAttribute('value',localStorage.getItem('board_color1'));
    document.getElementById("board_color2").setAttribute('value',localStorage.getItem('board_color2'));
    document.getElementById("apple_color").setAttribute('value',localStorage.getItem('apple_color'));
    createBackButton();
});

document.getElementById("button_credits").addEventListener('click', function(){
    document.getElementById('div_menu').innerHTML = "";
    document.getElementById('div_settings').innerHTML = "";

    var div = document.createElement("div");

    var graphiste = document.createElement("p");
    var programmeur = document.createElement("p");
    var levelDesigner = document.createElement("p");

    graphiste.textContent = "Graphiste : Noah MICHEL & Léo COSTE";
    programmeur.textContent = "Programmeurs : Noah MICHEL & Léo COSTE";
    levelDesigner.textContent = "Level Designer : Noah MICHEL & Léo COSTE";

    div.appendChild(graphiste);
    div.appendChild(programmeur);
    div.appendChild(levelDesigner);

    document.getElementById("div_menu").appendChild(div);

    createBackButton();
});

/*Ajout d'évenements sur les paramètres pouvant être modifiés dans le menu Paramètres
Ils stockent les nouveaux paramètres s'ils ont été modifiés dans le stockage du navigateur*/
document.getElementById("speed").addEventListener("change", function(){
    localStorage.setItem('speed',document.getElementById("speed").value);
});

document.getElementById("headcolor").addEventListener("change", function(){
    localStorage.setItem('headcolor',document.getElementById("headcolor").value);
});

document.getElementById("snakecolor").addEventListener("change", function(){
    localStorage.setItem('snakecolor',document.getElementById("snakecolor").value);
});

document.getElementById("board_color1").addEventListener("change", function(){
    localStorage.setItem('board_color1',document.getElementById("board_color1").value);
});

document.getElementById("board_color2").addEventListener("change", function(){
    localStorage.setItem('board_color2',document.getElementById("board_color2").value);
});

document.getElementById("apple_color").addEventListener("change", function(){
    localStorage.setItem('apple_color',document.getElementById("apple_color").value);
});

/*Ajout d'un listener sur la fenêtre pour la gestion des niveaux
Si l'url change il récupère ce qui a été ajouté et le stocke dans la variable numLvl
On lance ensuite le jeu en mode aventure en appellant la fonction run()*/
window.addEventListener('hashchange',function(){
    numLvl = window.location.hash.slice(1);
    document.getElementById('presentation').remove();
    run('adventure');
});

//Fonction createBackButton() pour créer et inserer un bouton de retour à la page d'accueil a différents endroits de la page
function createBackButton(){
    var button = document.createElement('a');
    button.textContent = 'Retour';
    button.setAttribute('class','button');
    button.setAttribute('href','');
    document.getElementsByTagName('body')[0].appendChild(button);
}

/* Initialisation du jeu */

/*Fonction run() qui va vider la page et afficher le canvas: drawBoard()
Elle va ensuite créer le snake et l'insérer dans la variable world: createSnake()
Et enfin lancer le mouvement du snake: step()*/
function run(gameMode){
    document.getElementById("snakeit").remove();
    document.getElementById("div_menu").remove();
    document.getElementById("div_settings").remove();
    //Test si la partie est lancé en mode aventure, alors on récupère le fichier JSON et ce qu'il contient pour ensuite créer la partie
    if(gameMode === 'adventure'){
        apple_color= "red";
        (async function(){
            try{           
                var response = await fetch("levels/level" + numLvl + ".json");
                
                if (response.ok){
                    var data = await response.json();
                    speed = data.speed;
                    height = data.dimensions;
                    snake = data.snake;
                    applesLvl = data.food;
                    wallsLvl = data.walls;
                } else{
                    throw ("Err " + response.status);
                }
            } catch(err){
                console.log(err);
            }
        
            drawBoard(gameMode);
            createSnake(gameMode);

            step(gameMode);
        })();
    }//Sinon on affiche le score, initialise une variable snake vide et lance le jeu
    else{
        document.getElementById('score').textContent = 0;
        snake = new Array(4);

        drawBoard(gameMode);
        createSnake(gameMode);

        createBackButton();
        
        step(gameMode);
    }
}

//Fonction drawBoard() qui va remplir la variable world de case 'EMPTY' et appeler updateBoard() pour ajouter les pommes et les murs si besoin
function drawBoard(gameMode) {
    switch (gameMode) {
        case 'small':
            height = 6;//6
            break;

        case 'mid':
            height = 10;//10
            break;

        case 'big':
            height = 18;//18
            break;

        case 'giant':
            height = 24;//24
            break;

        default:
            break;
    }
    for(var i = 0; i < height; i++){
        world[i] = [height];
        for(var j = 0; j < height; j++){
            world[i][j]='EMPTY';
        }
    }
    document.getElementById("board").setAttribute("width",500);
    document.getElementById("board").setAttribute("height",500);
    updateBoard(gameMode);
}

/*Fonction createSnake() qui va remplir le plateau et la variable world du serpent
Si le mode de jeu est libre, il est placé vers le centre du plateau en forme de L pour laisser le temps au joueur de débuter la partie*/
function createSnake(gameMode){
    var i;
    if(gameMode === 'adventure'){
        for(i = 0; i < (snake.length)-1; i++){
            world[snake[i][0]][snake[i][1]] = 'SNAKE';
        }
        world[snake[i][0]][snake[i][1]] = 'HEAD';
    }
    else{
        for(i = 0; i < snake.length; i++){
            switch(i){
                case 0:
                    world[i+Math.floor((height)/2)][Math.floor((height)/2)] = 'HEAD';
                    snake[snake.length - 1 - i]=[i+Math.floor((height)/2),Math.floor((height)/2)];
                    break;
                case 1:
                    world[i+Math.floor((height)/2)][Math.floor((height)/2)] = 'SNAKE';
                    snake[snake.length - 1 - i]=[i+Math.floor((height)/2),Math.floor((height)/2)];
                    break;
                case 2:
                case 3:
                    world[i-1+Math.floor((height)/2)][1+Math.floor((height)/2)]='SNAKE';
                    snake[snake.length - 1 - i]=[i-1+Math.floor((height)/2),1+Math.floor((height)/2)];
                    break;
            }
        }
    }
}

/* Dessin plateau */

//Fonction drawCase() qui dessine le cadre autour de la zone de jeu, le plateau de jeu, le serpent, les pommes et les murs
function drawCase() {
    //Cadre autour de la zone de jeu
    ctx.fillStyle = "#a66f00";
    ctx.fillRect(0, 0, (canvas.width), (canvas.width));
    ctx.fillStyle = "#916201";
    ctx.fillRect(10, 10, (canvas.width - 20), (canvas.width - 20));
    //Fin cadre
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < height; j++) {
            //Si la case est vide
            if (world[i][j] === 'EMPTY') {
                if ((j + i) % 2 !== 0) ctx.fillStyle = board_color1;
                else ctx.fillStyle = board_color2;
                ctx.fillRect((j) * ((canvas.width-50) / height) + 25, (i) * ((canvas.width-50) / height) + 25, ((canvas.width-50) / height), ((canvas.width-50) / height));
            }

            /*Si la case comporte une pomme
            Appel de la fonction drawApple()*/
            if (world[i][j] === 'FOOD') {
                if ((j + i) % 2 !== 0) ctx.fillStyle = board_color1;
                else ctx.fillStyle = board_color2;
                ctx.fillRect((j) * ((canvas.width-50) / height) + 25, (i) * ((canvas.width-50) / height) + 25, ((canvas.width-50) / height), ((canvas.width-50) / height));
                drawApple((j) * ((canvas.width-50) / height) + ((canvas.width-50) / height)/2 + 25, (i) * ((canvas.width-50) / height) + ((canvas.width-50) / height)/2 + 25,);
                
            }

            //Si la case comporte un mur
            if (world[i][j] === 'WALLS') {
                ctx.fillStyle = "#842e1b";
                ctx.fillRect((j) * ((canvas.width-50) / height) + 25, (i) * ((canvas.width-50) / height) + 25, ((canvas.width-50) / height), ((canvas.width-50) / height));
                ctx.fillStyle = "#913420";
                ctx.fillRect((j) * ((canvas.width-50) / height) + 25, (i) * ((canvas.width-50) / height) + 25, ((canvas.width-50) / height)/1.5, ((canvas.width-50) / height)/1.5);
                ctx.fillStyle = "#9c3924";
                ctx.fillRect((j) * ((canvas.width-50) / height) + 25, (i) * ((canvas.width-50) / height) + 25, ((canvas.width-50) / height)/2, ((canvas.width-50) / height)/2);
                ctx.fillStyle = "#ab452e";
                ctx.fillRect((j) * ((canvas.width-50) / height) + 25, (i) * ((canvas.width-50) / height) + 25, ((canvas.width-50) / height)/3, ((canvas.width-50) / height)/3);

            }

            //Si la case est un morceau du serpent
            if (world[i][j] === 'SNAKE') {
                ctx.fillStyle = snakecolor;
                ctx.fillRect((j) * ((canvas.width-50) / height) + 25, (i) * ((canvas.width-50) / height) + 25, ((canvas.width-50) / height), ((canvas.width-50) / height));
            }

            //Si la case est la tête du serpent
            if (world[i][j] === 'HEAD') {
                ctx.fillStyle = headcolor;
                ctx.fillRect((j) * ((canvas.width-50) / height) + 25, (i) * ((canvas.width-50) / height) + 25, ((canvas.width-50) / height), ((canvas.width-50) / height));
            }
        }
    }
}

//Fonction drawApple() qui connais la position d'un pomme sur le canvas et va la dessiner
function drawApple(xp, yp) {
    ctx.fillStyle = apple_color;
    ctx.beginPath();
    ctx.arc(xp + (canvas.width/height)/25, yp, (canvas.width/height)/5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.arc(xp - 1, yp, (canvas.width/height)/5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "brown";
    ctx.beginPath();
    ctx.moveTo(xp, yp - (canvas.width/height)/5);
    ctx.lineTo(xp, yp - (canvas.width/height)/2.5);
    ctx.lineTo(xp + (canvas.width/height)/10, yp - (canvas.width/height)/2.5);
    ctx.fill();
}

/* Déroulement de la partie*/

/*Fonction placeApple() qui va placer aléatoirement une pomme sur le plateau dans le mode de jeu libre
Elle boucle tant que la pomme en train d'être placée est sur un mur ou le serpent*/
function placeApple(nbApple) {
    for (var y = 0; y < nbApple; y++) {
        var xApple;
        var yApple;
        do {
            xApple = Math.floor(Math.random() * (height - 0)) + 0;
            yApple = Math.floor(Math.random() * (height - 0)) + 0;
        }
        while (world[xApple][yApple] === 'SNAKE' || world[xApple][yApple] === 'FOOD');

        world[xApple][yApple] = 'FOOD';
        
    }
    drawCase();
}

//Fonction nbApple() pour déterminer combien de pomme il y a sur le plateau
function nbApple() {
    var nbApple = 0;
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < height; j++) {
            if (world[i][j] === 'FOOD') nbApple++;
        }
    }
    return nbApple;
}

/*Fonction updateBoard() qui va remplir le plateau et la variable world de pommes et de murs
Si le mode de jeu est libre, le nombre de pomme à placer est déterminer par la taille du serpent*/
function updateBoard(gameMode) {
    if(gameMode === 'adventure'){
        for(var i=0; i<applesLvl.length; i++){
            world[applesLvl[i][0]][applesLvl[i][1]] = 'FOOD';
        }
        for(var j=0; j<wallsLvl.length; j++){
            world[wallsLvl[j][0]][wallsLvl[j][1]] = 'WALLS';
        }
        drawCase();
    }
    else{
        var nbcase = world.length * world.length;
        if (snake.length < nbcase / 128) {
            placeApple(8 - nbApple());

        }
        else if (snake.length < (nbcase / 64)) {
            placeApple(7 - nbApple());
        }


        else if (snake.length < (nbcase / 32)) {
            placeApple(6 - nbApple());

        }


        else if (snake.length < (nbcase / 16)) {
            placeApple(5 - nbApple());

        }


        else if (snake.length < (nbcase / 8)) {
            placeApple(4 - nbApple());

        }


        else if (snake.length < (nbcase / 4)) {
            placeApple(3 - nbApple());

        }


        else if (snake.length < (nbcase / 2)) {
            placeApple(2 - nbApple());

        }


        else{
            placeApple(1 - nbApple());
        }
    }
}

//Fonction step() qui recoit les imput du joueur, fait avancer le serpent en fonction de sa direction et verifie les collisions
function step(gameMode){
    var direction = 1;
    var newDirection = 1;
    var interval = setInterval(function(){
        window.addEventListener('keydown',function(ev){
            switch(ev.key){
                case 'ArrowLeft':
                    newDirection = 0;
                    break;
                case 'ArrowUp':
                    newDirection = 1;
                    break;
                case 'ArrowRight':
                    newDirection = 2;
                    break;
                case 'ArrowDown':
                    newDirection = 3;
                    break;
            }
        });

        if(newDirection - direction !== 2 && direction - newDirection !== 2){
            direction = newDirection;
        }

        var snakeHead;
        switch(direction){
            case 0:
                snakeHead = [snake[snake.length-1][0],snake[snake.length-1][1]-1];
                world[snakeHead[0]][snakeHead[1]+1] = 'SNAKE';
                break;
            case 1:
                snakeHead = [snake[snake.length-1][0]-1,snake[snake.length-1][1]];
                world[snakeHead[0]+1][snakeHead[1]] = 'SNAKE';
                break;
            case 2:
                snakeHead = [snake[snake.length-1][0],snake[snake.length-1][1]+1];
                world[snakeHead[0]][snakeHead[1]-1] = 'SNAKE';
                break;
            case 3:
                snakeHead = [snake[snake.length-1][0]+1,snake[snake.length-1][1]];
                world[snakeHead[0]-1][snakeHead[1]] = 'SNAKE';
                break;
        }
        if(snakeHead[0] < 0 || snakeHead[0] > height-1 || snakeHead[1] < 0 || snakeHead[1] > height-1){
            clearInterval(interval);
            return gameOver();
        }
        else if(world[snakeHead[0]][snakeHead[1]] === 'SNAKE' || world[snakeHead[0]][snakeHead[1]] === 'WALLS'){
            clearInterval(interval);
            return gameOver();
        }
        else if(world[snakeHead[0]][snakeHead[1]] === 'FOOD'){
            eatapple++;
            snake.push(snakeHead);
            world[snakeHead[0]][snakeHead[1]] = 'HEAD';
            if(gameMode === 'adventure'){
                for(var i = 0; i < applesLvl.length; i++){
                    if(applesLvl[i].toString()===snakeHead.toString()){
                        applesLvl.splice(i,1);
                    }
                }
            }
        }
        else{
            world[snake[0][0]][snake[0][1]] = 'EMPTY';
            snake.push(snakeHead);
            snake.shift();
            world[snakeHead[0]][snakeHead[1]] = 'HEAD';
        }
        ctx.clearRect(0,0,canvas.width,canvas.height);
        
        if(gameMode === 'adventure'){
            if(applesLvl.length <= 0){
                clearInterval(interval);
                updateBoard(gameMode);
                return gameWin();
            }
        }
        else{
            printScore();
        }
        updateBoard(gameMode);
    },speed);
}

/*Fonction gameOver() appelée lorsqu'un check de collision renvoie true
Elle affiche une image par dessus le canvas et joue un son de défaite*/
function gameOver(){
    var image = document.createElement('img');
    image.setAttribute('class','endscreen');
    image.setAttribute('src','assets/losescreen.png');
    document.getElementById('canvas_container').appendChild(image);
    document.getElementById('board').remove();
    lose_audio.play();
}

/*Fonction gameWin() appelée lorsque toute les pommes ont été mangées dans le mode aventure
Elle affiche une image par dessus le canvas et joue un son de victoire*/
function gameWin(){
    var image = document.createElement('img');
    image.setAttribute('class','endscreen');
    image.setAttribute('src','assets/winscreen.png');
    document.getElementById('canvas_container').appendChild(image);
    document.getElementById('board').remove();
    win_audio.play();
}

/*Fonction printScore() appelée lors d'une partie libre à chaque pas effectué, pour afficher le score du joueur
Un son est joué toutes les 10 pommes mangées*/
function printScore(){
    document.getElementById('score').setAttribute("style","visibility : visible");
    if((eatapple !== parseInt(document.getElementById('score').textContent)) && eatapple%10===0)tenapple.play();
    document.getElementById('score').textContent = eatapple;
    
}
