class Field {
    type="b";
    neighbors=[];
}
class Score{
    seasonScores=[0,0,0,0];
    game=0;
}

addEventListener('load', function () {
    initBoard();
    printBoard();

    shuffle(SeasonElements);
    printElement(SeasonElements[0]);
    
    shuffle(missions);
    printMissions()
    highlightMissions();

    document.getElementById("seasonDisplay").innerHTML=seasons[0];

    //document.getElementById("board").addEventListener("mouseover",light);
    //document.getElementById("board").addEventListener("mouseout",lightoff);

    //document.querySelectorAll("td").addEventListener("mouseover",light);
    //document.querySelectorAll("td").addEventListener("mouseout",lightoff);

    //document.getElementById("board").addEventListener("click",cellClick);
    
    document.getElementById("rotate").addEventListener('click',function(){rotate(SeasonElements[0])});
    document.getElementById("mirror").addEventListener('click',function(){mirror(SeasonElements[0])});
    document.getElementById("skip").addEventListener('click',function(){
        elapseTime();
        SeasonElements.shift();
        clearElement();
        printElement(SeasonElements[0]);

    });
});

//global variables
const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false        
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
            rotation: 0,
            mirrored: false  
        },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,0],
                [1,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,1],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0,1,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [1,0,0],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,0,0],
                [1,1,1],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,1]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,0],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
];

let missions=[
    {
      title: "Az erdő széle",
      description: "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz.",
      source:"assets/missions_hun/erdoszele.png",
      getScore:evaluateErdoszele
    },
    {
      title: "Álmos-völgy",
      "description": "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz.",
      source:"assets/missions_hun/almosvolgy.png",
      getScore:evaluateAlmosVolgy
    },
    {
      title: "Krumpliöntözés",
      description: "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz.",
      source:"assets/missions_hun/krumpliontozes.png",
      getScore:evaluateKrumpliOntozes
    },
    {
      title: "Határvidék",
      description: "Minden teli sorért vagy oszlopért 6-6 pontot kapsz.",
      source:"assets/missions_hun/hatarvidek.png",
      getScore:evaluateHatarvidek
    },
    {
        title: "Gazdag város",
        description: "A legalább három különböző tereptípussal szomszédos falurégióidért három-három pontot kapsz.",
        source:"assets/missions_hun/gazdagvaros.png",
        getScore:evaluateGazdagVaros
    },
    {
        title: "Üres telek",
        description: "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz.",
        source:"assets/missions_hun/urestelek.png",
        getScore:evaluateUresTelek
    },
    {
        title: "Mágusok völgye",
        description: "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz.",
        source:"assets/missions_hun/magusokvolgye.png",
        getScore:evaluateMagusokVolgye
    },
    {
        title: "Öntözőcsatorna",
        description: "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte.",
        source:"assets/missions_hun/ontozocsatorna.png",
        getScore:evaluateOntozocsatorna
      },
      {
        title: "Fasor",
        description: "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért.",
        source:"assets/missions_hun/fasor.png",
        getScore:evaluateFasor
      },
      {
        title: "Sorház",
        description: "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz.",
        source:"assets/missions_hun/sorhaz.png",
        getScore:evaluateSorhaz
      },
      {
        title: "Páratlan silók",
        description: "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz.",
        source:"assets/missions_hun/paratlansilok.png",
        getScore:evaluateParatlanSilok
      },
      {
        title: "Gazdag vidék",
        description: "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz.",
        source:"assets/missions_hun/gazdagvidek.png",
        getScore:evaluateGazdagVidek
      }
];

const mountains=[
    {
        x:1,
        y:1
    },
    {
        x:3,
        y:8
    },
    {
        x:5,
        y:3
    },
    {
        x:8,
        y:9
    },
    {
        x:9,
        y:5
    },
];
let SeasonElements=elements.slice();
let gameMissions=missions.slice(0,4);
let board=[];
let time=7;
let seasons=["Tavasz (A-B)","Nyár (B-C)","Ősz (C-D)","Tél (D-A)"];
let isGameOver=false;
let score=new Score();


function initListeners(){
    const nodeList = document.querySelectorAll("#board>tbody>tr>td");
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].addEventListener("mouseover",light);
        nodeList[i].addEventListener("mouseout",lightoff);
        nodeList[i].addEventListener("click",cellClick);
        }
}

function initBoard(){
    for(let i=0;i<11;i++){
        board[i]=[];
        for(let j=0;j<11;j++){
            board[i][j]=new Field();
        }
    }
    for(let item of mountains)
    {
        board[item.x][item.y]=new Field();
        board[item.x][item.y].type="mountain";
    }
}

function printBoard(){
    let table=document.getElementById("board");

    for(let i=0;i<11;i++){
        let row=table.insertRow();
        
        for(let j=0;j<11;j++){
            let col=row.insertCell();

            switch(board[i][j].type){
                case "forest":
                    col.classList.add('fo');
                    break;
                case "water":
                    col.classList.add("w");
                    break;
                case "farm":
                    col.classList.add('fa');
                    break;
                case "town":
                    col.classList.add('t');
                    break;
                case "mountain":
                    col.classList.add('m');
                    break;
                default:
                    col.classList.add("b");
                    break;
            }
            //test water neighbors
            //col.innerHTML=board[i][j].neighbors.filter(x=>x.type=="water").length;
            //test not base neighbors
            //col.innerHTML=board[i][j].neighbors.filter(x=>x.type!="b").length;
        }
    }
    initListeners();
}

function printElement(element){
    let table = document.getElementById("elementDisplay");
    document.getElementById("timeDisplay").innerHTML=element.time;
    
    for(let i=0;i<3;i++){
        let row=table.insertRow();
        for(let j=0;j<3;j++){
            let col=row.insertCell();
            if(element.shape[i][j]==1){
                switch(element.type){
                    case "forest":
                        col.classList.add('fo');
                        break;
                    case "water":
                        col.classList.add("w");
                        break;
                    case "farm":
                        col.classList.add('fa');
                        break;
                    case "town":
                        col.classList.add('t');
                        break;
                }
            }
        }
    }
}
function printMissions(){
    let row = document.getElementById("missionsDisplay");
    let t=['A','B','C','D'];
    for(let i=0;i<4;i++){
        let div=document.createElement("div");
        let h4=document.createElement('h5');
        let img=document.createElement("img");

        h4.innerHTML=`${t[i]}: 0 pont`;
        h4.id=`mission${t[i]}`
        img.src=missions[i].source;
        img.classList.add("img-fluid");

        div.appendChild(h4);
        div.appendChild(img);
        div.classList.add("col-6");
        
        row.appendChild(div);
    }
}
function printMissionScores(){
    document.getElementById("missionMountains").innerHTML = `Körbekerített Hegy mező: ${evaluateMountains()} pont`;

    evaluateHatarvidek();
    document.getElementById("missionA").innerHTML=`A: ${missions[0].getScore()} pont`;

    document.getElementById("missionB").innerHTML=`B: ${missions[1].getScore()} pont`;

    document.getElementById("missionC").innerHTML=`C: ${missions[2].getScore()} pont`;

    document.getElementById("missionD").innerHTML=`D: ${missions[3].getScore()} pont`;
}

function highlightMissions(){
    document.getElementById("missionA").classList.remove("missionHighlight");
    document.getElementById("missionB").classList.remove("missionHighlight");
    document.getElementById("missionC").classList.remove("missionHighlight");
    document.getElementById("missionD").classList.remove("missionHighlight");

    if(seasons.length<2){
        //DA
        document.getElementById("missionD").classList.add("missionHighlight");
        document.getElementById("missionA").classList.add("missionHighlight");
    }
    else if(seasons.length<3){
        //CD
        document.getElementById("missionC").classList.add("missionHighlight");
        document.getElementById("missionD").classList.add("missionHighlight");
    }
    else if(seasons.length<4)
    {
        //BC
        document.getElementById("missionB").classList.add("missionHighlight");
        document.getElementById("missionC").classList.add("missionHighlight");
    }
    else
    {
        //AB
        document.getElementById("missionA").classList.add("missionHighlight");
        document.getElementById("missionB").classList.add("missionHighlight");
    }
}    


function clear(){
    document.getElementById("board").innerHTML="";
}
function clearElement(){
    document.getElementById("elementDisplay").innerHTML="";
}
function light(e){
    e.target.style="border: 5px dashed rgb(225,200,165)";
}
function lightoff(e){
    e.target.style="border: 4px solid white";
}

function rotate(element) {
    let N = 3;
    for (i = 0; i < parseInt(N / 2); i++) {
        for (j = i; j < N - i - 1; j++) {
            var temp = element.shape[i][j];
            element.shape[i][j] = element.shape[N - 1 - j][i];
            element.shape[N - 1 - j][i] = element.shape[N - 1 - i][N - 1 - j];
            element.shape[N - 1 - i][N - 1 - j] = element.shape[j][N - 1 - i];
            element.shape[j][N - 1 - i] = temp;
        }
    }
    clearElement();
    printElement(element);
}

function mirror(element){
    element.shape.map(function(arr){return arr.reverse();});
    clearElement();
    printElement(element);
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function cellClick(e){
    if(!isGameOver){
        let x=e.target.cellIndex;
        let y=e.target.parentElement.rowIndex;
        let shape = SeasonElements[0].shape;

        if(!canPlaceElement(x,y,shape)){
            return;
        }
        placeElement(x,y,shape);

        printMissionScores()
        clear();
        printBoard();

        elapseTime();

        SeasonElements.shift();
        clearElement();
        printElement(SeasonElements[0]);
    }
}
function canPlaceElement(x,y,shape){
    for(let dx=0;dx<3;dx++){
        for(let dy=0;dy<3;dy++){
            let a =y+dy;
            let b=x+dx;

            if(shape[dy][dx]==1 && !(board[a] && board[a][b]))
            {
                //alert("Out of bounds!");
                alert("Játékterületen kívüli lehelyezés!");
                return false;
            }
            else if(shape[dy][dx]==1 && board[a][b].type!="b")
            {
                //alert("Cant place here!");
                alert("Ide nem helyezhető elem!");
                return false;
            }
        }
    }
    return true;
}
function placeElement(x,y,shape){
    for(let dx=0;dx<3;dx++){
        for(let dy=0;dy<3;dy++)
        {
            let a=y+dy;
            let b=x+dx;
            
            if(shape[dy][dx]==1){
                board[a][b].type=SeasonElements[0].type;
                calculateNeighbors(a,b);
            }
        }
    }
}

function calculateNeighbors(a,b){
    board[a][b].neighbors=[];
    if(board[a-1]&&board[a-1][b]){board[a][b].neighbors.push(board[a-1][b]);}
    if(board[a]&&board[a][b+1]){board[a][b].neighbors.push(board[a][b+1]);}
    if(board[a+1]&&board[a+1][b]){board[a][b].neighbors.push(board[a+1][b]);}
    if(board[a]&&board[a][b-1]){board[a][b].neighbors.push(board[a][b-1]);}
}


function elapseTime(){
    time-=SeasonElements[0].time;
        if(time<=0){
                newSeason();
        }
        document.getElementById("elapsedTimeDisplay").innerHTML=time;
}

function newSeason(){
    getSeasonPoints();

    seasons.shift();
    if(seasons.length==0){
        gameOver();
        document.getElementById("seasonDisplay").innerHTML="Játék Vége!";
    }
    else{
        document.getElementById("seasonDisplay").innerHTML=seasons[0];
        highlightMissions();
        
        time=7;
        SeasonElements=elements.slice();
        shuffle(SeasonElements);
    }
    //console.log(SeasonElements);
}
function getSeasonPoints(){
    let currentSeason=4-seasons.length;
    
    let p=0;
    
    p += missions[currentSeason].getScore();
    if(currentSeason==3){
        p += missions[0].getScore();}
    else{
        p += missions[currentSeason+1].getScore();
    }
    score.seasonScores[currentSeason]=p;
    printSeasonScores(currentSeason,p);
}
function printSeasonScores(n,p){
    document.getElementById(`s${n}Display`).innerHTML=`${p} pont`;
}

function gameOver(){
    let end = document.createElement("h1");
    end.classList.add("p-5");
    end.innerHTML="Vége a játéknak!";
    document.getElementById("end").appendChild(end);
    score.game+=evaluateMountains();
    for(let i=0;i<4;i++){
        score.game+=score.seasonScores[i];
    }
    document.getElementById("gameScoreDisplay").innerHTML=`Összesen: ${score.game} pont`;

    isGameOver=true;
}

function evaluateMountains(){
    let points=0;
    for(let item of mountains)
    {
        calculateNeighbors(item.x,item.y);
        if(board[item.x][item.y].neighbors.filter(x=>x.type!="b").length == 4)
        points+=1;
    }

    return points;
}

function evaluateHatarvidek(){
    let validRows=[];
    let validCols=[];
    let points=0;

    for(let i=0;i<11;i++){
        let goodRow=true;
        for(let j=0;j<11;j++){
            if(board[i][j].type=="b")
            {
                goodRow=false;
            }
        }
        if(goodRow){
            validRows.push(i);
            points+=6;
            
        }
    }
    for(let i=0;i<11;i++){
        let goodCol=true;
        for(let j=0;j<11;j++){
            if(board[j][i].type=="b")
            {
                goodCol=false;
            }
        }
        if(goodCol){
            validCols.push(i);
            points+=6;
        }
    }
    return points;
}
function evaluateErdoszele(){
    let points=0;
    for(let i=0;i<11;i++){
        if(board[0][i].type=="forest"){
            points++;
        }
    }
    for(let i=0;i<11;i++){
        if(board[10][i].type=="forest"){
            points++;
        }
    }
    for(let i=1;i<10;i++){
        if(board[i][0].type=="forest"){
            points++;
        }
    }
    for(let i=1;i<10;i++){
        if(board[i][10].type=="forest"){
            points++;
        }
    }
    return points;
}

function evaluateAlmosVolgy(){
    let points=0;
    for(let i=0;i<11;i++){
        let actForestTiles=0;
        for(let j=0;j<11;j++){
            if(board[i][j].type=="forest"){
                actForestTiles++;
            }
        }
        if(actForestTiles==3){
            points+=4;
        }
    }
    return points;
}
function evaluateKrumpliOntozes(){
    let points=0;
    for(let i=0;i<11;i++){
        for(let j=0;j<11;j++){
            if(board[i][j].type=="farm")
            {
                let w = board[i][j].neighbors.filter(x=>x.type=="water").length;
                points+=w*2;
            }
        }
    }
    return points;
}
function evaluateGazdagVaros(){
    let points=0;
    for(let i=0;i<11;i++){
        for(let j=0;j<11;j++){
            if(board[i][j].type=="town"){
                let x = board[i][j].neighbors.filter(x=>x.type!="b");
                let y=[];
                for(let item of x){
                    y.push(item.type);
                }
                let p=countUnique(y);
                if(p>=3){points+=parseInt(p)*3;}
            }
        }
    }
    return points;
}
function countUnique(iterable) {
    return new Set(iterable).size;
}

function evaluateUresTelek(){
    let points=0;
    for(let i=0;i<11;i++){
        for(let j=0;j<11;j++){
            if(board[i][j].type=="town"){
                points += board[i][j].neighbors.filter(x=>x.type=="b").length *2;
            }
        }
    }
    return points;
}
function evaluateMagusokVolgye(){
    let points=0;
    for(let i=0;i<11;i++){
        for(let j=0;j<11;j++){
            if(board[i][j].type=="mountain"){
                points += board[i][j].neighbors.filter(x=>x.type=="water").length *3;
            }
        }
    }
    return points;

}
function evaluateOntozocsatorna(){
    let points=0;
    for(let j=0;j<11;j++){
        let farm=0;
        let water=0;
        for(let i=0;i<11;i++){
            if(board[i][j].type=="water"){
                water++;
            }
            else if(board[i][j].type=="farm"){
                farm++;
            }
        }
        if(water==farm && water+farm!=0){
            points+=4;
        }
    }
    return points;

}
function evaluateFasor(){
    let maxForest=0;
    for(let j = 0; j < 11; j++){
        let forestCol=0;
        for(let i = 1; i < 11; i++){
            if(board[i][j].type=="forest" && board[i-1][j].type=="forest"){
                forestCol++;
                if(forestCol>maxForest){
                    maxForest=forestCol;
                }
            }
            else{
                forestCol=0;
            }
        }
    }
    if(maxForest!=0){maxForest++;}
    return (maxForest)*2;
}
//TODO equal rows
function evaluateSorhaz(){
    let rows=[]
    let maxTown=0;
    for(let i = 0; i < 11; i++){
        let townRow=0;
        let max;
        for(let j = 1; j < 11; j++){
            max=0;
            if(board[i][j].type=="town" && board[i][j-1].type=="town"){
                townRow++;
                if(townRow>maxTown){
                    maxTown=townRow;
                }
            }
            else{
                townRow=0;
            }
        }
        rows.push(townRow);
    }
    console.log(rows);
    if(maxTown!=0){maxTown++;}
    return (maxTown)*2;
}
function evaluateParatlanSilok(){
    let points=0;
    for(let i=0;i<11;i++){
        let goodCol=true;
        for(let j=0;j<11;j++){
            if(board[j][i].type=="b")
            {
                goodCol=false;
            }
        }
        if(goodCol && (i+1) %2!=0){
            points+=10;
        }
    }
    return points;
}
function evaluateGazdagVidek(){
    let points=0;

    for(let i=0;i<11;i++){
        let goodRow=true;
        let row=[];
        for(let j=0;j<11;j++){
            row.push(board[i][j].type);
        }
        if(countUnique(row.filter(x=>x!="b"))==5){
            points+=4;
        }
    }

    return points;
}



    
    













