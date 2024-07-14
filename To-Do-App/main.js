/**
 * TO-DO:
 * - Find ways to make code more adaptable
 * - Refactor Code
 * - CSS
 */

const entryList = []
const submit = document.querySelector('.entryList')
const entries = document.querySelector('.todoList')

const displayEntryListAsTable = () => {
    document.getElementById("displayEntries").innerHTML = ""

    let result = ""
    let index = 0

    if(entryList.length > 0){
        result += "<table id='entryTable'><thead><tr><th>Task</th><th>Date</th><th id='hideRows'></th><th id='hideRows'></th></tr></thead><tbody>"
        entryList.forEach(e => {
            result += "<tr>"

            if(!e[2]){
                result += "<td id='entry"+index+"'>" + e[0] + "</td>"
                result += "<td id='date"+index+"'>" + e[1] + "</td>"
                result += "<td id='hideRows'><button id='edit_Button_"+index+"'>Edit</button></td>"
                result += "<td id='hideRows'><button id='clear_Button_"+index+"'>Clear</button></td>"
            }else{
                result += "<td id='inputRow'><input type='text' id='editTextBox"+index+"' value='" + e[0] + "'></td>"
                result += "<td><input type='date' id='editDateBox"+index+"' value='" + e[1] + "'></td>"
                result += "<td id='hideRows'><button class='saveButton' id='save_Button_"+index+"'>Save</button></td>"
                result += "<td id='hideRows'><button class='cancelButton' id='cancel_Button_"+index+"'>Cancel</button></td>"
            }
            result += "</tr>"
            index++
        });
        result += "</tbody></table>"
    }

    document.getElementById("displayEntries").innerHTML = result
}

submit.addEventListener('click', e => {
    if (e.target.matches('button')){
        const buttonClicked = e.target.id.split("_")
        const buttonType = buttonClicked[0]

        if(buttonType === "submit"){
            const entry = document.getElementById("primaryTextBox")
            const date = document.getElementById("primaryDateBox")
            const currentDate = new Date().toJSON().slice(0, 10)

            if(
                entry.value !== "" && 
                date.value !== "" && 
                date.value >= currentDate
            ) {
                entryList[entryList.length] = [entry.value, date.value, false]
                entry.value = ""
                date.value = ""
            }
        }
        
        if(buttonType === "sort"){
            const sortMode = buttonClicked[2]
            /**
             * Sort Modes:
             * 1 -> Sort By Entry, A-Z
             * 2 -> Sort By Entry, Z-A
             * 3 -> Sort By Date, Soonest
             * 4 -> Sort By Date, Latest
             */
            entryList.sort((a, b) => {
                return ( ( 
                    ((sortMode <= 2)?a[0].toUpperCase():a[1]) <
                    ((sortMode <= 2)?b[0].toUpperCase():b[1]) 
                )?-1:1 )*(sortMode%2!=0?1:-1)
            })

        }

        displayEntryListAsTable()
    }
})

entries.addEventListener('click', e => {
    if (e.target.matches('button')){
        const buttonClicked = e.target.id.split("_")
        const buttonType = buttonClicked[0]
        const index = buttonClicked[2]

        if(buttonType === "edit" || buttonType === "cancel")
            entryList[index][2] = !entryList[index][2]
        
        if(buttonType === "clear")
            entryList.splice(index, 1)
        else{
            if(buttonType === "edit")
                for(let i = 0; i < document.getElementById("sort_Options").children.length; i++)
                    document.getElementById("sort_Options").children[i].disabled = true
            else
                if(document.getElementsByClassName("saveButton").length == 1)
                    for(let i = 0; i < document.getElementById("sort_Options").children.length; i++)
                        document.getElementById("sort_Options").children[i].disabled = false
        }
        
        if(buttonType === "save" && document.getElementById("editTextBox"+index).value !== "" && document.getElementById("editDateBox"+index).value !== "")
            entryList[index] = [document.getElementById("editTextBox"+index).value,document.getElementById("editDateBox"+index).value,false]
        

        displayEntryListAsTable()
    }
})