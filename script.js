"use strict";

let board = [];
let turn = 0;

let player_sign = "❌"
let enemy_sign = "⭕"

let player_wins = 0
let enemy_wins = 0

let multiplayer = false

let leftPanel = document.getElementById("leftScore")
let rightPanel = document.getElementById("rightScore")

let selectPlayer = document.getElementById("player");
let selectEnemy = document.getElementById("enemy");

let combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


let symbols = [
    "❌",
    "⭕",
    "🐸",
    "😄",
    "🌟",
    "🍀",
    "🦄",
    "🎮",
    "🌍",
    "💡",
    "🐱",
    "🚀",
    "📚"
]

init()
showDebug()

/**
 * true for player, false for enemy
 */
function changeSymbol(player, value){

    fillSymbolLists()

    if(player){
        for(let i = 0; i < 9; i++){
            if(board[i].innerHTML === player_sign){
                board[i].innerHTML = value
            }
        }
        player_sign = value
        leftPanel.innerHTML = `${player_sign} ${player_wins}`

        let partialSymbols = symbols.filter(emoji => emoji !== value)
    
        selectEnemy.innerHTML = ''

        for (let i = 0; i < partialSymbols.length; i++){
            let option = document.createElement("option");
            option.value = partialSymbols[i];
            option.innerHTML = partialSymbols[i];
            selectEnemy.appendChild(option);
        }

        selectPlayer.value = value
        selectEnemy.value = enemy_sign

    }else{
        for(let i = 0; i < 9; i++){
            if(board[i].innerHTML === enemy_sign){
                board[i].innerHTML = value
            }
        }
        enemy_sign = value
        rightPanel.innerHTML = `${enemy_sign} ${enemy_wins}`

        
        let partialSymbols = symbols.filter(emoji => emoji !== value)
    
        selectPlayer.innerHTML = ''
        for (let i = 0; i < partialSymbols.length; i++){
            let option = document.createElement("option");
            option.value = partialSymbols[i];
            option.innerHTML = partialSymbols[i];
            selectPlayer.appendChild(option);
        }
        selectEnemy.value = value
        selectPlayer.value = player_sign
    }
}

function showDebug(){
    for (let i = 0; i < 9; i++){
        board[i].innerHTML = board[i].id
    }
}

function init(){
    for (let i = 0; i < 9; i++){
        let cell = document.getElementById(i);
        board[i] = cell;
        cell.addEventListener("click", () => pick(cell));
    }

    leftPanel.innerHTML = `${player_sign} ${player_wins}`
    rightPanel.innerHTML = `${enemy_sign} ${enemy_wins}`

    fillSymbolLists()
}

function fillSymbolLists(){

    selectPlayer.innerHTML = ''
    selectEnemy.innerHTML = ''

    for (let i = 0; i < symbols.length; i++){
        let option = document.createElement("option");
        option.value = symbols[i];
        option.innerHTML = symbols[i];

        if(symbols[i] !== enemy_sign)
            selectPlayer.appendChild(option);

        if(symbols[i] !== player_sign)
            selectEnemy.appendChild(option.cloneNode(true));
    }

    selectEnemy.value = enemy_sign
    selectPlayer.value = player_sign
    leftPanel.innerHTML = `${player_sign} ${player_wins}`
    rightPanel.innerHTML = `${enemy_sign} ${enemy_wins}`
}


function reset(){
    for (let i = 0; i < 9; i++){
        board[i].innerHTML = ""
    }
    turn = 0
}

function check_win(cellType){
    for (let i = 0; i < combinations.length; i++){
        for (let j = 0; j < 3; j++){
            if(board[combinations[i][j]].innerHTML !== cellType){
                break
            }
            if(j === 2) return true
        }
    }
    return false
}

function check_if_about_to_win(){
    for (let i = 0; i < combinations.length; i++){

        let missingPieces = 0
        let missingCell = -1

        for (let j = 0; j < 3; j++){
            let element = board[combinations[i][j]].innerHTML

            if(element === player_sign){
                missingPieces = 0
                missingCell = -1
                break
            }

            if(empty(element)){
                missingPieces++
                missingCell = combinations[i][j]
            }
        }
        
        if(missingPieces === 1){
            return missingCell
        }
    }
    return -1
}

function pick(cell){
    if(!empty(cell)) return

    if(multiplayer){
        if(turn%2 === 0){
            cell.innerHTML = player_sign
            check_if_player_won()
        }else{
            cell.innerHTML = enemy_sign
            check_if_enemy_won()
        }
            
    }else{
        cell.innerHTML = player_sign
        turn++
        check_if_player_won()

        //ai turn
        let cellId = check_if_about_to_win()
        if(cellId >= 0){
            console.log(cellId)
            board[cellId].innerHTML = enemy_sign
        }else{
            do{
                cellId = Math.floor(Math.random() * 9)
            }while(!empty(board[cellId]))

            board[cellId].innerHTML = enemy_sign

            
        }
        check_if_enemy_won()
    }
    turn++
    if(turn === 9){
        alert("Draw")
        reset()
    }
    
}

function check_if_player_won(){
    if(check_win(player_sign)){
        player_wins++
        leftPanel.innerHTML = `${player_sign} ${player_wins}`
        reset()
    }
}

function check_if_enemy_won(){
    if(check_win(enemy_sign)){
        enemy_wins++
        rightPanel.innerHTML = `${enemy_sign} ${enemy_wins}`
        reset()
        return true
    }
}

function empty(cell){
    if (cell.innerHTML === undefined){ 
        return cell !== player_sign && cell !== enemy_sign
    }else{
        return cell.innerHTML !== player_sign && cell.innerHTML !== enemy_sign;
    }

    
}