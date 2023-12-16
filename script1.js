console.log("st")
const gameBoard = document.querySelector("#gameBoard");
const userName = document.querySelector(".userName");
const info = document.querySelector(".infoDiv");
const width = 8;
let player_turn = "white";
userName.textContent = "white";

const startPieces = [
    rook ,knight ,bishop , queen, king, bishop, knight, rook,
    pawn ,pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    "","","","","","","","",
    "","","","","","","","",
    "","","","","","","","",
    "","","","","","","","",
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight ,rook
]

function createBoard()
{
    startPieces.forEach((p,i)=>{
        let square = document.createElement("div");
        square.classList.add("square");
        square.innerHTML = p;
        square.setAttribute("square-id",i);
        square.firstChild?.setAttribute("draggable",true);
        let row = Math.floor((63-i)/8) + 1;
        if(row%2===0)
        {
               square.classList.add(i%2===0?"light":"brown")
        }else{
            square.classList.add(i%2===0?"brown":"light");
        }

        if(i<=15)
        {
          square.firstChild.firstChild.classList.add("white")
        }
        if(i>=48)
        {
          square.firstChild.firstChild.classList.add("black")
        }

        gameBoard.appendChild(square)

    })
}
createBoard()

const squares = document.querySelectorAll(".square");

squares.forEach((sq)=>{
      sq.addEventListener("dragstart",dragStartFun);
      sq.addEventListener("dragover",dragOverFun);
      sq.addEventListener("drop",dropFun)
})

let draggedElement;
let startPosition;

function dragStartFun(e)
{
    draggedElement = e.target;
    startPosition = e.target.parentNode.getAttribute("square-id");
}

function dragOverFun(e)
{
  e.preventDefault()
}

function dropFun(e)
{
  e.stopPropagation();
    console.log("target",e.target)
  const taken = e.target.classList.contains("square")?e.target.firstChild?.classList.contains("piece"):e.target.classList.contains("piece");
  const opponent_turn = player_turn==="black"?"white":"black";
  const opponent_taken = e.target.classList.contains("square")?e.target.firstChild?.firstChild.classList.contains(opponent_turn):e.target.firstChild?.classList.contains(opponent_turn);
  const correct_turn = draggedElement.firstChild.classList.contains(player_turn);
  const valid = validFun(e.target);
  console.log(valid)

  if(correct_turn)
  {
     if(opponent_taken && valid)
     {
      e.target.parentNode.appendChild(draggedElement);
      e.target.classList.contains("square")?e.target.firstChild.remove():e.target.remove();
      checkForWin()
      
      console.log("valid",valid);
    console.log("opp taken",opponent_taken)
    console.log("taken",taken)
    changePlayer();
      return
     }
     if(!opponent_taken && taken)
     {
      info.textContent = "you cannot kill you piece";
      setTimeout(()=>{
        info.textContent = ""
      },2000)
     }
     if (valid && !taken) {
       e.target.append(draggedElement);
       
       console.log("valid",valid);
       console.log("opp taken",opponent_taken)
       console.log("taken",taken)
       changePlayer();
       return;
     }
  }
    
  console.log(e.target)

}

function validFun(target)
{
   const target_id = Number(target.getAttribute("square-id")) || Number(target.parentNode.getAttribute("square-id"));

   const start_id = Number(startPosition);
   const piece = draggedElement.id;

   console.log("target",target_id)
   console.log("start",start_id)
   console.log("piece",piece)

   switch (piece) {
     case "pawn":
       const start_positions = [8, 9, 10, 11, 12, 13, 14, 15];
       if (
         (start_positions.includes(start_id) && start_id + 16 === target_id) ||
         start_id + 8 === target_id ||
         (start_id + width - 1 === target_id &&
           document.querySelector(`[square-id="${start_id + width - 1}"]`)
             .firstChild) ||
         (start_id + width + 1 === target_id &&
           document.querySelector(`[square-id="${start_id + width + 1}"]`)
             .firstChild)
       ) {
         return true;
       }
       break;

     case "knight":
      if(start_id + width * 2 +1===target_id || start_id+width*2-1 === target_id || start_id-width*2-1===target_id ||start_id-width*2+1===target_id 
        || start_id + width - 2 === target_id || start_id + width + 2 === target_id || start_id - width - 2 === target_id || start_id - width + 2 === target_id)
      {
        return true
      }
      break;
    case "bishop":
      if (
         start_id + width + 1 === target_id ||
        (start_id + width * 2 + 2 === target_id &&!document.querySelector(`[square-id="${start_id + width + 1}"]`).firstChild) ||
        (start_id + width * 3 + 3 === target_id &&!document.querySelector(`[square-id="${start_id + width + 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 2 + 2}"]`).firstChild) ||
        (start_id + width * 4 + 4 === target_id &&!document.querySelector(`[square-id="${start_id + width + 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 2 + 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 3 + 3}"]`).firstChild) ||
        (start_id + width * 5 + 5 === target_id &&!document.querySelector(`[square-id="${start_id + width + 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 2 + 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 3 + 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 4 + 4}"]`).firstChild) ||
        (start_id + width * 6 + 6 === target_id &&!document.querySelector(`[square-id="${start_id + width + 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 2 + 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 3 + 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 4 + 4}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 5 + 5}"]`).firstChild) ||
        (start_id + width * 7 + 7 === target_id &&!document.querySelector(`[square-id="${start_id + width + 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 2 + 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 3 + 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 4 + 4}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 5 + 5}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 6 + 6}"]`).firstChild) ||

         start_id - width - 1 === target_id ||
        (start_id - width * 2 - 2 === target_id &&!document.querySelector(`[square-id="${start_id - width - 1}"]`).firstChild) ||
        (start_id - width * 3 - 3 === target_id &&!document.querySelector(`[square-id="${start_id - width - 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 2 - 2}"]`).firstChild) ||
        (start_id - width * 4 - 4 === target_id &&!document.querySelector(`[square-id="${start_id - width - 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 2 - 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 3 - 3}"]`).firstChild) ||
        (start_id - width * 5 - 5 === target_id &&!document.querySelector(`[square-id="${start_id - width - 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 2 - 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 3 - 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 4 - 4}"]`).firstChild) ||
        (start_id - width * 6 - 6 === target_id &&!document.querySelector(`[square-id="${start_id - width - 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 2 - 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 3 - 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 4 - 4}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 5 - 5}"]`).firstChild) ||
        (start_id - width * 7 - 7 === target_id &&!document.querySelector(`[square-id="${start_id - width - 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 2 - 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 3 - 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 4 - 4}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 5 - 5}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 6 - 6}"]`).firstChild)||

        start_id - width + 1 === target_id ||
        (start_id - width * 2 + 2 === target_id &&!document.querySelector(`[square-id="${start_id - width + 1}"]`).firstChild) ||
        (start_id - width * 3 + 3 === target_id &&!document.querySelector(`[square-id="${start_id - width + 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 2 + 2}"]`).firstChild) ||
        (start_id - width * 4 + 4 === target_id &&!document.querySelector(`[square-id="${start_id - width + 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 2 + 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 3 + 3}"]`).firstChild) ||
        (start_id - width * 5 + 5 === target_id &&!document.querySelector(`[square-id="${start_id - width + 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 2 + 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 3 + 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 4 + 4}"]`).firstChild) ||
        (start_id - width * 6 + 6 === target_id &&!document.querySelector(`[square-id="${start_id - width + 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 2 + 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 3 + 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 4 + 4}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 5 + 5}"]`).firstChild) ||
        (start_id - width * 7 + 7 === target_id &&!document.querySelector(`[square-id="${start_id - width + 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 2 + 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 3 + 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 4 + 4}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 5 + 5}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 6 + 6}"]`).firstChild)||

         start_id + width - 1 === target_id ||
        (start_id + width * 2 - 2 === target_id &&!document.querySelector(`[square-id="${start_id + width - 1}"]`).firstChild) ||
        (start_id + width * 3 - 3 === target_id &&!document.querySelector(`[square-id="${start_id + width - 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 2 - 2}"]`).firstChild) ||
        (start_id + width * 4 - 4 === target_id &&!document.querySelector(`[square-id="${start_id + width - 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 2 - 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 3 - 3}"]`).firstChild) ||
        (start_id + width * 5 - 5 === target_id &&!document.querySelector(`[square-id="${start_id + width - 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 2 - 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 3 - 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 4 - 4}"]`).firstChild) ||
        (start_id + width * 6 - 6 === target_id &&!document.querySelector(`[square-id="${start_id + width - 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 2 - 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 3 - 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 4 - 4}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 5 - 5}"]`).firstChild) ||
        (start_id + width * 7 - 7 === target_id &&!document.querySelector(`[square-id="${start_id + width - 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 2 - 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 3 - 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 4 - 4}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 5 - 5}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 6 - 6}"]`).firstChild)
      ){
        return true;
      }
      break;

      case "rook":
        if(
           start_id + width === target_id ||
           (start_id + width * 2 === target_id && !document.querySelector(`[square-id="${start_id + width}"]`).firstChild)||
           (start_id + width * 3 === target_id && !document.querySelector(`[square-id="${start_id + width}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 2}"]`).firstChild) ||
           (start_id + width * 4 === target_id && !document.querySelector(`[square-id="${start_id + width}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 3}"]`).firstChild)||
           (start_id + width * 5 === target_id && !document.querySelector(`[square-id="${start_id + width}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 4}"]`).firstChild)||
           (start_id + width * 6 === target_id && !document.querySelector(`[square-id="${start_id + width}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 5}"]`).firstChild)||
           (start_id + width * 7 === target_id && !document.querySelector(`[square-id="${start_id + width}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 6}"]`).firstChild) ||

            start_id - width === target_id ||
           (start_id - width * 2 === target_id && !document.querySelector(`[square-id="${start_id - width}"]`).firstChild)||
           (start_id - width * 3 === target_id && !document.querySelector(`[square-id="${start_id - width}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 2}"]`).firstChild) ||
           (start_id - width * 4 === target_id && !document.querySelector(`[square-id="${start_id - width}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 3}"]`).firstChild)||
           (start_id - width * 5 === target_id && !document.querySelector(`[square-id="${start_id - width}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 4}"]`).firstChild)||
           (start_id - width * 6 === target_id && !document.querySelector(`[square-id="${start_id - width}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 5}"]`).firstChild)||
           (start_id - width * 7 === target_id && !document.querySelector(`[square-id="${start_id - width}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 6}"]`).firstChild) ||

           start_id + 1 === target_id ||
           (start_id + 2 === target_id && !document.querySelector(`[square-id="${start_id + 1}"]`).firstChild)||
           (start_id + 3 === target_id && !document.querySelector(`[square-id="${start_id + 1}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 2}"]`).firstChild) ||
           (start_id + 4 === target_id && !document.querySelector(`[square-id="${start_id + 1}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 3}"]`).firstChild)||
           (start_id + 5 === target_id && !document.querySelector(`[square-id="${start_id + 1}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 4}"]`).firstChild)||
           (start_id + 6 === target_id && !document.querySelector(`[square-id="${start_id + 1}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 4}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 5}"]`).firstChild)||
           (start_id + 7 === target_id && !document.querySelector(`[square-id="${start_id + 1}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 4}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 5}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 6}"]`).firstChild) ||

            start_id - 1 === target_id ||
           (start_id - 2 === target_id && !document.querySelector(`[square-id="${start_id - 1}"]`).firstChild)||
           (start_id - 3 === target_id && !document.querySelector(`[square-id="${start_id - 1}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 2}"]`).firstChild) ||
           (start_id - 4 === target_id && !document.querySelector(`[square-id="${start_id - 1}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 3}"]`).firstChild)||
           (start_id - 5 === target_id && !document.querySelector(`[square-id="${start_id - 1}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 4}"]`).firstChild)||
           (start_id - 6 === target_id && !document.querySelector(`[square-id="${start_id - 1}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 4}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 5}"]`).firstChild)||
           (start_id - 7 === target_id && !document.querySelector(`[square-id="${start_id - 1}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 4}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 5}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 6}"]`).firstChild)
        ){
          return true;
        }

     case "queen":
      if(
        /* rook moves */  
        (start_id + width === target_id) ||
        (start_id + width * 2 === target_id && !document.querySelector(`[square-id="${start_id + width}"]`).firstChild)||
        (start_id + width * 3 === target_id && !document.querySelector(`[square-id="${start_id + width}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 2}"]`).firstChild) ||
        (start_id + width * 4 === target_id && !document.querySelector(`[square-id="${start_id + width}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 3}"]`).firstChild)||
        (start_id + width * 5 === target_id && !document.querySelector(`[square-id="${start_id + width}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 4}"]`).firstChild)||
        (start_id + width * 6 === target_id && !document.querySelector(`[square-id="${start_id + width}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 5}"]`).firstChild)||
        (start_id + width * 7 === target_id && !document.querySelector(`[square-id="${start_id + width}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${start_id + width * 6}"]`).firstChild) ||

         (start_id - width === target_id) ||
        (start_id - width * 2 === target_id && !document.querySelector(`[square-id="${start_id - width}"]`).firstChild)||
        (start_id - width * 3 === target_id && !document.querySelector(`[square-id="${start_id - width}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 2}"]`).firstChild) ||
        (start_id - width * 4 === target_id && !document.querySelector(`[square-id="${start_id - width}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 3}"]`).firstChild)||
        (start_id - width * 5 === target_id && !document.querySelector(`[square-id="${start_id - width}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 4}"]`).firstChild)||
        (start_id - width * 6 === target_id && !document.querySelector(`[square-id="${start_id - width}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 5}"]`).firstChild)||
        (start_id - width * 7 === target_id && !document.querySelector(`[square-id="${start_id - width}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${start_id - width * 6}"]`).firstChild) ||

        (start_id + 1 === target_id) ||
        (start_id + 2 === target_id && !document.querySelector(`[square-id="${start_id + 1}"]`).firstChild)||
        (start_id + 3 === target_id && !document.querySelector(`[square-id="${start_id + 1}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 2}"]`).firstChild) ||
        (start_id + 4 === target_id && !document.querySelector(`[square-id="${start_id + 1}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 3}"]`).firstChild)||
        (start_id + 5 === target_id && !document.querySelector(`[square-id="${start_id + 1}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 4}"]`).firstChild)||
        (start_id + 6 === target_id && !document.querySelector(`[square-id="${start_id + 1}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 4}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 5}"]`).firstChild)||
        (start_id + 7 === target_id && !document.querySelector(`[square-id="${start_id + 1}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 4}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 5}"]`).firstChild && !document.querySelector(`[square-id="${start_id + 6}"]`).firstChild) ||

        (start_id - 1 === target_id) ||
        (start_id - 2 === target_id && !document.querySelector(`[square-id="${start_id - 1}"]`).firstChild)||
        (start_id - 3 === target_id && !document.querySelector(`[square-id="${start_id - 1}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 2}"]`).firstChild) ||
        (start_id - 4 === target_id && !document.querySelector(`[square-id="${start_id - 1}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 3}"]`).firstChild)||
        (start_id - 5 === target_id && !document.querySelector(`[square-id="${start_id - 1}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 4}"]`).firstChild)||
        (start_id - 6 === target_id && !document.querySelector(`[square-id="${start_id - 1}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 4}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 5}"]`).firstChild)||
        (start_id - 7 === target_id && !document.querySelector(`[square-id="${start_id - 1}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 2}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 3}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 4}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 5}"]`).firstChild && !document.querySelector(`[square-id="${start_id - 6}"]`).firstChild) || 

      /* bishop moves */

      (start_id + width + 1 === target_id) ||
      (start_id + width * 2 + 2 === target_id &&!document.querySelector(`[square-id="${start_id + width + 1}"]`).firstChild) ||
      (start_id + width * 3 + 3 === target_id &&!document.querySelector(`[square-id="${start_id + width + 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 2 + 2}"]`).firstChild) ||
      (start_id + width * 4 + 4 === target_id &&!document.querySelector(`[square-id="${start_id + width + 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 2 + 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 3 + 3}"]`).firstChild) ||
      (start_id + width * 5 + 5 === target_id &&!document.querySelector(`[square-id="${start_id + width + 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 2 + 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 3 + 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 4 + 4}"]`).firstChild) ||
      (start_id + width * 6 + 6 === target_id &&!document.querySelector(`[square-id="${start_id + width + 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 2 + 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 3 + 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 4 + 4}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 5 + 5}"]`).firstChild) ||
      (start_id + width * 7 + 7 === target_id &&!document.querySelector(`[square-id="${start_id + width + 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 2 + 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 3 + 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 4 + 4}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 5 + 5}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 6 + 6}"]`).firstChild) ||

       start_id - width - 1 === target_id ||
      (start_id - width * 2 - 2 === target_id &&!document.querySelector(`[square-id="${start_id - width - 1}"]`).firstChild) ||
      (start_id - width * 3 - 3 === target_id &&!document.querySelector(`[square-id="${start_id - width - 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 2 - 2}"]`).firstChild) ||
      (start_id - width * 4 - 4 === target_id &&!document.querySelector(`[square-id="${start_id - width - 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 2 - 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 3 - 3}"]`).firstChild) ||
      (start_id - width * 5 - 5 === target_id &&!document.querySelector(`[square-id="${start_id - width - 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 2 - 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 3 - 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 4 - 4}"]`).firstChild) ||
      (start_id - width * 6 - 6 === target_id &&!document.querySelector(`[square-id="${start_id - width - 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 2 - 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 3 - 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 4 - 4}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 5 - 5}"]`).firstChild) ||
      (start_id - width * 7 - 7 === target_id &&!document.querySelector(`[square-id="${start_id - width - 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 2 - 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 3 - 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 4 - 4}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 5 - 5}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 6 - 6}"]`).firstChild)||

      start_id - width + 1 === target_id ||
      (start_id - width * 2 + 2 === target_id &&!document.querySelector(`[square-id="${start_id - width + 1}"]`).firstChild) ||
      (start_id - width * 3 + 3 === target_id &&!document.querySelector(`[square-id="${start_id - width + 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 2 + 2}"]`).firstChild) ||
      (start_id - width * 4 + 4 === target_id &&!document.querySelector(`[square-id="${start_id - width + 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 2 + 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 3 + 3}"]`).firstChild) ||
      (start_id - width * 5 + 5 === target_id &&!document.querySelector(`[square-id="${start_id - width + 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 2 + 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 3 + 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 4 + 4}"]`).firstChild) ||
      (start_id - width * 6 + 6 === target_id &&!document.querySelector(`[square-id="${start_id - width + 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 2 + 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 3 + 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 4 + 4}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 5 + 5}"]`).firstChild) ||
      (start_id - width * 7 + 7 === target_id &&!document.querySelector(`[square-id="${start_id - width + 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 2 + 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 3 + 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 4 + 4}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 5 + 5}"]`).firstChild &&!document.querySelector(`[square-id="${start_id - width * 6 + 6}"]`).firstChild)||

       start_id + width - 1 === target_id ||
      (start_id + width * 2 - 2 === target_id &&!document.querySelector(`[square-id="${start_id + width - 1}"]`).firstChild) ||
      (start_id + width * 3 - 3 === target_id &&!document.querySelector(`[square-id="${start_id + width - 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 2 - 2}"]`).firstChild) ||
      (start_id + width * 4 - 4 === target_id &&!document.querySelector(`[square-id="${start_id + width - 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 2 - 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 3 - 3}"]`).firstChild) ||
      (start_id + width * 5 - 5 === target_id &&!document.querySelector(`[square-id="${start_id + width - 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 2 - 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 3 - 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 4 - 4}"]`).firstChild) ||
      (start_id + width * 6 - 6 === target_id &&!document.querySelector(`[square-id="${start_id + width - 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 2 - 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 3 - 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 4 - 4}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 5 - 5}"]`).firstChild) ||
      (start_id + width * 7 - 7 === target_id &&!document.querySelector(`[square-id="${start_id + width - 1}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 2 - 2}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 3 - 3}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 4 - 4}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 5 - 5}"]`).firstChild &&!document.querySelector(`[square-id="${start_id + width * 6 - 6}"]`).firstChild)
        
        ){
          return true;
        }
        break;
     
     case "king":
            if(
              (start_id + width === target_id) || (start_id + width + 1 === target_id) || (start_id + width - 1 === target_id)
              || (start_id - width === target_id) || (start_id - width + 1 === target_id) || (start_id - width -1 === target_id)||
              (start_id + 1 === target_id) || (start_id - 1 === target_id)
            ){
              return true;
            }
       break;
   }
     
}

function changePlayer()
{
  if(player_turn==="white")
  {
    reverseId()
    player_turn="black";
    userName.textContent = "black"
  }else{
    
    NormalId()
    player_turn = "white";
    userName.textContent = "white"
  }
}

function reverseId()
{
  squares.forEach((sq,i)=>{
    sq.setAttribute("square-id",63-i)
  })
}

function NormalId()
{
  squares.forEach((sq,i)=>{
    sq.setAttribute("square-id",i)
  })
}

/* check for win */

function checkForWin(){
  const both_kings = Array.from(document.querySelectorAll("#king"));
  console.log(both_kings)

  if(both_kings.length === 1)
  {
    let winner = both_kings[0].firstChild.className;
    console.log("winner ",winner.baseVal);
    info.textContent = `${winner.baseVal} wins`
  }

}