"use strict";

let board = [];
let turn = 0;

let player_sign = "❌"
let enemy_sign = "⭕"

let multiplayer = false


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

init()
showDebug()

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
        alert(`${player_sign} wins!`)
        reset()
    }
}

function check_if_enemy_won(){
    if(check_win(enemy_sign)){
        alert(`${enemy_sign} wins!`)
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