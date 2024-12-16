/**
 * https://en.wikipedia.org/wiki/Turing_machine
 */

let instructionTable = [
    [[],[],[]],
    [[],[],[]]
]
let headPosition = 0
let currentState = 0
let tape = [0]

let halted = false

let currentInstruction = []

/**
 * instructionTable formatted as below:
 * Each row represents the symbol that the tape is reading:
 * Each entry in a row represents a specific state, and contains 3 details:
 * - Write Symbol: The symbol that's being written to the tape
 * - Move Tape: -1 for move left, 1 for move right
 * - Next State: Listed in table as index into the given symbol's row
 *      HALT state is listed as -1
 * 
 * busy beaver example:
 * [
 * [[1,1,1],[1,-1,0],[1,-1,1]],
 * [[1,-1,2],[1,1,1],[1,1,-1]]
 * ]
 */

function displayTape()
{
    if(document.getElementById("CustomTable"))
        document.getElementById("CustomTable").remove()

    const table = document.createElement('table')
    table.id = "CustomTable"
    
    const tableRow1 = table.insertRow()
    for(const ind in tape){
        const cell = tableRow1.insertCell()
        cell.textContent = tape[ind]
    }
    
    const tableRow2 = table.insertRow()
    for(const ind in tape){
        const cell = tableRow2.insertCell()
        if(ind == headPosition)
            cell.textContent = '^'
    }

    document.getElementById("results").appendChild(table);
}

function readInstruction()
{
    let instruction = instructionTable[tape[headPosition]][currentState]
    if(instruction.length === 0)
        console.log("BAD")
        
    else if(instruction[2] != "H"){
        document.getElementById("RunningInstruction").innerText = "Current Instruction: " + (instruction[0]+instruction[1]+instruction[2])

        console.log(tape + " | Head: " + headPosition + " | State: " + currentState)

        tape[headPosition] = instruction[0]

        headPosition += (instruction[1] == "R")?1:-1

        switch(instruction[2]){
            case "A":
                currentState = 0
                break
            case "B":
                currentState = 1
                break
            case "C":
                currentState = 2
                break
            case "H":
                currentState = -1
                break
            default:
                break
        }

        if(headPosition == -1){
            tape.unshift(0)
            headPosition = 0
        }

        if(headPosition == tape.length){
            tape.push(0)
            headPosition = tape.length - 1
        }

        console.log(tape + " | Head: " + headPosition + " | State: " + currentState)

        displayTape()

        instruction = instructionTable[tape[headPosition]][currentState]
        document.getElementById("NextInstruction").innerText = "Next Instruction: " + (instruction[0]+instruction[1]+instruction[2])
    }
    else{
        document.getElementById("RunningInstruction").innerText = "Current Instruction: " + (instruction[0]+instruction[1]+instruction[2])
        halted = true
        console.log("HALTED!")
        
        document.getElementById("NextInstruction").innerText = "No More Instructions"
    }
}

function resetTape()
{
    headPosition = 0
    currentState = 0
    tape = [0]
    
    halted = false

    document.getElementById("RunningInstruction").innerText = ""
    document.getElementById("RunningInstruction").innerHTML = "<br>"

    document.getElementById("NextInstruction").innerText = ""
    document.getElementById("NextInstruction").innerHTML = "<br>"

    loadPreset(2)
}

function loadInstructions()
{
    for(i = 0; i < 2; i++){
        for(j = 0; j < 3; j++){
            var write = document.getElementById("writeSymbol"+(3*i+j+1))
            var move = document.getElementById("moveDirection"+(3*i+j+1))
            var state = document.getElementById("stateChange"+(3*i+j+1))

            instructionTable[i][j] = [write.value, move.value, state.value]
        }
    }
}

function testFunction()
{
    instructionTable = [
        [["1","R","B"],["1","L","A"],["1","L","B"]],
        [["1","L","C"],["1","R","B"],["1","R","H"]]
    ]

    for(i = 0; i < 2; i++){
        for(j = 0; j < 3; j++){
            var write = document.getElementById("writeSymbol"+(3*i+j+1))
            write.value = instructionTable[i][j][0]

            var move = document.getElementById("moveDirection"+(3*i+j+1))
            move.value = instructionTable[i][j][1]

            var state = document.getElementById("stateChange"+(3*i+j+1))
            state.value = instructionTable[i][j][2]
        }
    }
}

function loadPreset(instr)
{
    let listOfInstructionSets = [
        [
            [["1","R","B"],["1","L","A"],["1","L","B"]],
            [["1","L","C"],["1","R","B"],["1","R","H"]]
        ],
        [
            [["0","R","B"],["1","R","A"],["0","L","A"]],
            [["0","L","A"],["0","L","A"],["0","L","A"]]
        ],
        [
            [["0","L","A"],["0","L","A"],["0","L","A"]],
            [["0","L","A"],["0","L","A"],["0","L","A"]]
        ]
    ]

    currentInstruction = listOfInstructionSets[instr]

    for(i = 0; i < 2; i++){
        for(j = 0; j < 3; j++){
            var write = document.getElementById("writeSymbol"+(3*i+j+1))
            write.value = currentInstruction[i][j][0]

            var move = document.getElementById("moveDirection"+(3*i+j+1))
            move.value = currentInstruction[i][j][1]

            var state = document.getElementById("stateChange"+(3*i+j+1))
            state.value = currentInstruction[i][j][2]
        }
    }

    loadInstructions()
    displayTape()
}

function returnToDefaults()
{
    instructionTable = [
        [["0","L","A"],["0","L","A"],["0","L","A"]],
        [["0","L","A"],["0","L","A"],["0","L","A"]]
    ]

    for(i = 0; i < 2; i++){
        for(j = 0; j < 3; j++){
            var write = document.getElementById("writeSymbol"+(3*i+j+1))
            write.value = instructionTable[i][j][0]

            var move = document.getElementById("moveDirection"+(3*i+j+1))
            move.value = instructionTable[i][j][1]

            var state = document.getElementById("stateChange"+(3*i+j+1))
            state.value = instructionTable[i][j][2]
        }
    }
}

//MAIN CODE GOES HERE
window.onload = function() {
    // Your function to run on page refresh
    returnToDefaults();
};

loadInstructions()
displayTape()