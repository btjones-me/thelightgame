var ASSOCIATIONSDICT = {};
var ELEMENTLIST;
var NUMASSOCIATIONS;
var NUMBUTTONS;

function onStartGame(startBtn){

    document.getElementById("start").innerHTML = "Restart Game";

    //On starting the game, reset the previous one if necessary
    if(document.getElementById("start").innerHTML == "Restart Game"){
        var paras = document.getElementsByClassName('gamebutton');
        while(paras[0]){
            paras[0].parentNode.removeChild(paras[0]);
        }
        ASSOCIATIONSDICT = {}
    }

    //Grab the number of buttons and associations. No fancy way to do this without JQuery 
    NUMBUTTONS = parseInt(document.getElementById("numButtons").value[0]);
    NUMASSOCIATIONS = parseInt(document.getElementById("numAssociations").value[0]);

    //Add the buttons
    for (let i = 1; i < NUMBUTTONS +1; i++){
        let button = document.createElement("button");
        button.id = i;
        button.classList.add("on", "gamebutton");
        button.onclick = onButtonClick;
        document.getElementById("buttonArea").appendChild(button);
    }

    //Generate a list of the buttons for easier use later
    ELEMENTLIS = document.getElementsByClassName("gamebutton");

    setAssociation()
}


function setAssociation(){

    //Generate a list of all Ids for use later
    const allIds = [] 
    for(let i = 0; i < ELEMENTLIS.length; i++){
        allIds.push(ELEMENTLIS[i].id)
    }

    //for all the ids, go through each and add the association id(s) (potentially more than one per button)
    for(let i = 0; i < ELEMENTLIS.length; i++){ 
        //Get a copy of the list of all the ids, then remove the current element because that's not a valid id
        let listOfValidIds = allIds.slice()
        removeValueFromArray(listOfValidIds, ELEMENTLIS[i].id) 
        for(let j = 0; j < NUMASSOCIATIONS; j++){ //Add the number of associations asked for ie. 1, 2, 3 etc
            //get a random id from the list of valid ids
            //A list of valid ids to associate to is any id that aren't the current id, or any ids it's already chosen
            const randomId = listOfValidIds[Math.floor(Math.random() * listOfValidIds.length)];
            removeValueFromArray(listOfValidIds, randomId) //remove the random id from the list of valid ids for this button

            //add the random associated button id to the dictionary containing the associations
            if (ELEMENTLIS[i].id in ASSOCIATIONSDICT){
                ASSOCIATIONSDICT[ELEMENTLIS[i].id].push(randomId)  //add it to the list
            }
            else{ 
                ASSOCIATIONSDICT[ELEMENTLIS[i].id] = [randomId] //initialise the list if this is the first association
                
            }
        }
    }
}

function removeValueFromArray(array, value){ //This doesn't exist in JS??? I've broken it up for readability
    const i = array.indexOf(value);
        if(i != -1) {
            array.splice(i, 1);
        }
    
}

function flipColorButton(button) {
    if(button.className == 'off gamebutton'){
        button.className = 'on gamebutton';
    }
    else{
        button.className = 'off gamebutton';
    }

}

function won(){
    if(document.getElementsByClassName("on gamebutton").length == 0){
            return true;
    }
    return false;
}


function onButtonClick(btn){
    //Get its association(s)
    const btnAssociations = ASSOCIATIONSDICT[this.id]

    flipColorButton(this);
    for(let i = 0; i < btnAssociations.length; i++){
        flipColorButton(document.getElementById(btnAssociations[i]))
    }

    if (won()){ 
        alert("Congratulations, you did it!\nTry again?"); //Couldn't easily get this to appear after redrawing the buttons without JQuery- apologies
    }

 }

