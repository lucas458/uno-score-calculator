


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}



const MAX_PLAYERS = 50;


const CARTAS = [

    "red_0_A", "red_1_A", "red_2_A", "red_3_A", "red_4_A", "red_5_A", "red_6_A", "red_7_A", "red_8_A", "red_9_A",
    "red_1_B", "red_2_B", "red_3_B", "red_4_B", "red_5_B", "red_6_B", "red_7_B", "red_8_B", "red_9_B",
    "red_draw2_A", "red_draw2_B",
    "red_interdit_A", "red_interdit_B",
    "red_revers_A", "red_revers_B",
    
    
    "green_0_A", "green_1_A", "green_2_A", "green_3_A", "green_4_A", "green_5_A", "green_6_A", "green_7_A", "green_8_A", "green_9_A",
    "green_1_B", "green_2_B", "green_3_B", "green_4_B", "green_5_B", "green_6_B", "green_7_B", "green_8_B", "green_9_B", 
    "green_draw2_A", "green_draw2_B",
    "green_interdit_A", "green_interdit_B",
    "green_revers_A", "green_revers_B",
    

    "blue_0_A", "blue_1_A", "blue_2_A", "blue_3_A", "blue_4_A", "blue_5_A", "blue_6_A", "blue_7_A", "blue_8_A", "blue_9_A",
    "blue_1_B", "blue_2_B", "blue_3_B", "blue_4_B", "blue_5_B", "blue_6_B", "blue_7_B", "blue_8_B", "blue_9_B",
    "blue_draw2_A", "blue_draw2_B",
    "blue_interdit_A",  "blue_interdit_B",
    "blue_revers_A", "blue_revers_B",
    

    "yellow_0_A", "yellow_1_A", "yellow_2_A", "yellow_3_A", "yellow_4_A", "yellow_5_A", "yellow_6_A", "yellow_7_A", "yellow_8_A",
    "yellow_9_A", "yellow_1_B", "yellow_2_B", "yellow_3_B", "yellow_4_B", "yellow_5_B", "yellow_6_B", "yellow_7_B", "yellow_8_B", "yellow_9_B",
    "yellow_draw2_A","yellow_draw2_B", 
    "yellow_interdit_A", "yellow_interdit_B",
    "yellow_revers_A","yellow_revers_B",


    "wild_+4_A", "wild_+4_B", "wild_+4_C", "wild_+4_D",
    "wild_color_A", "wild_color_B", "wild_color_C", "wild_color_D",

];



const CARD_BASES = ['red_base.png', 'green_base.png', 'blue_base.png', 'yellow_base.png'];



var JOGADORES = [

    // {
    //     'nome': 'alex',
    //     'avatar_index': 0,
    //     'cartas': ["blue_0_A", "blue_1_A", "red_3_A"],
    //     'score': 0
    // },

    // {
    //     'nome': 'maria',
    //     'avatar_index': 3,
    //     'cartas': ["yellow_draw2_A","wild_+4_A"],
    //     'score': 0
    // },

    // {
    //     'nome': 'joao',
    //     'avatar_index': 2,
    //     'cartas': ["yellow_3_A", "yellow_4_A","wild_color_C","green_2_A", "yellow_interdit_A"],
    //     'score': 0
    // },

];



function salvarEstado(){
    localStorage.setItem('jogadores', JSON.stringify(JOGADORES));
}

function carregarEstado(){
    const data = localStorage.getItem('jogadores');
    if ( data ){
        JOGADORES = JSON.parse(data);
        playerSortAZ();
        generatePlayerList(false);
    }
}




var player_search_input = document.getElementById("player_search_input");
var players_list        = document.getElementById("players_list");


var addEditPlayer_avatar_input = document.getElementById("addEditPlayer_avatar_input");
var addEditPlayer_avatar_list  = document.getElementById("addEditPlayer_avatar_list");



var can_save_player = false;
var player_index_option = -1;



// Get Index Avatar
function hasAvatarIndex( index ){
    return JOGADORES.findIndex(e => e.avatar_index == index);
}


// Get Index Name
function hasName( nome = '' ){
    return JOGADORES.findIndex(e => e.nome == nome);
}










// Open/Close Modal By ID
function toggleModalById(id, state = false){

    let el = document.getElementById( id );

    if ( state ){
        el.classList.toggle("modal_active", state);
        setTimeout(()=>{
            el.querySelector(".modal_window").style.transform = 'scale(1)';
        }, 1);
        return;
    }
    
    el.querySelector(".modal_window").style.transform = 'scale(0)';
    setTimeout(()=>{
        el.classList.toggle("modal_active", state);
    }, 250); 
    

}





// Close All Modal
function closeAllModal(){
    document.querySelectorAll(".modal_active").forEach( e => {
        e.classList.remove("modal_active");
    });
}






// Set Modal Dialog Contents
function setModalDialogContents( header = '', content = '', actions = [] ){

    let el = document.getElementById("modal_dialogBox");
    el.querySelector(".modal_header").innerHTML = header;
    el.querySelector(".modal_content").innerHTML = content;

    el.querySelectorAll(".modal_footer > .modal_button").forEach((e, i)=>{
        e.onclick = actions[i];
    });
    
}





// Toggle Screen By ID
function toggleScreenById(id, state = false){

    if ( id == "screen_main" ){
        const isDisabled = JOGADORES.length == 0;
        document.querySelectorAll(".menu_button")[1].disabled = isDisabled; // Calcular
        document.querySelectorAll(".menu_button")[2].disabled = isDisabled; // Reset
    }

    if ( id == "screen_players" ){
        const MAX_PLAYERS = 50;
        toggleAddButton( JOGADORES.length < MAX_PLAYERS );
    }

    document.getElementById( id ).classList.toggle("screen_active", state);
}



// Close All Screen
function closeAllScreen(){
    document.querySelectorAll(".screen_active").forEach( e => {
        e.classList.remove("screen_active");
    });
}








// Players Button
function onClickMenuPlayers(){
    closeAllScreen();
    toggleScreenById("screen_players", true);
    generatePlayerList();
}




// Back Screen Players to Menu
function onClickMenuPlayersBack(){
    closeAllScreen();
    toggleScreenById("screen_players", false);
    toggleScreenById("screen_main", true);
}




// Back Screen Cards to Players
function onClickCardsBack(){
    toggleScreenById("screen_players", true);
    toggleScreenById("screen_cards", false);
    generatePlayerList();
}



// Save Selected Cards
function onClickCardSave(){
    onClickCardsBack();

    const selectedCardList = document.querySelectorAll("#screen_cards input:checked ~ .card");
    const tempCards = Array.from(selectedCardList).map(e => e.getAttribute("card-name"));

    if ( JOGADORES[player_index_option] ){
        JOGADORES[player_index_option].cartas = tempCards;
        JOGADORES[player_index_option].score = getScoreByCardList(tempCards);
        salvarEstado();
    }

}
 


// Card Clear Selection
function onClickCardClearSelection(){
    document.querySelectorAll("#screen_cards input:checked").forEach(e => {
        e.checked = false;
    });
}







// Reset Button
function onClickMenuReset(){ 

    setModalDialogContents("Deletar?", "deseja apagar tudo?", [

        // NO
        ()=>{ toggleModalById("modal_dialogBox", false); },

        // YES
        ()=>{ 
            toggleModalById("modal_dialogBox", false);
            JOGADORES = [];
            salvarEstado();
        }
    
    ]);

    toggleModalById("modal_dialogBox", true);

}






 


// Add Player Button
function onClickAddPlayer(){
    
    if ( JOGADORES.length < 20 ){
        console.log("add");

        toggleAddButton(false);

        document.getElementById("modal_addEditPlayer").querySelector(".modal_header").innerHTML = "Adicionar";
        document.getElementById("modal_addEditPlayer").setAttribute("mode", "add");

        generateAvatarButton();

        addEditPlayer_avatar_input.value = '';
        document.getElementById("addEditPlayer_avatar_input_helper_wrapper").firstElementChild.style.visibility = "hidden";
        document.getElementById("addEditPlayer_avatar_input_helper_wrapper").lastElementChild.innerHTML = (addEditPlayer_avatar_input.value.length) + '/' +  addEditPlayer_avatar_input.maxLength;

        toggleModalById("modal_addEditPlayer", true);
        
        addEditPlayer_avatar_list.scrollLeft = 0;
        return;
    }
    
    showPopupSnack('Limite de 20 atingido', 4000);
    

    
    
}




function toggleAddButton( state = false ){
    document.getElementById("button_add").style.transform = (state)? 'scale(1)' : 'scale(0)';
}







function toggleSnack( state = false ){

    if ( state ){
        document.getElementById("snack").style.display = 'block';
        setTimeout(()=>{
            document.getElementById("snack_label").style.transform = 'none';
        }, 1);
        return;
    }

    document.getElementById("snack_label").style.transform = 'translateY(200%)';
    setTimeout(()=>{
        document.getElementById("snack").style.display = 'none';
    }, 200);

}


let snack_timer = null;

function showPopupSnack( content , duration ){

    document.getElementById("snack_label").innerHTML = content;
    toggleSnack(true);

    snack_timer = setTimeout(()=>{
        toggleSnack(false);
    }, duration);

}


function onClickSnack(){
    clearTimeout(snack_timer);
    snack_timer = null;
    toggleSnack(false);
}











// Get Selected Avatar (ADD/EDIT) INDEX
function getAvatarSelectedIndex(){
    return Array.from(document.querySelectorAll("#addEditPlayer_avatar_list .addEditPlayer_avatar")).findIndex(e => e.classList.contains("addEditPlayer_avatar_selected"));
}



// Scroll to Selected Avatar (ADD/EDIT) INDEX
function scroll_avatar_list(){

    const selectedAvatarIndex = getAvatarSelectedIndex();

    if ( selectedAvatarIndex >= 0 ){
        addEditPlayer_avatar_list.scrollTo({
            left: addEditPlayer_avatar_list.children[selectedAvatarIndex].offsetLeft - 50,
            behavior: 'smooth'
        });
    }
}








// Sort Player Array A-Z
function playerSortAZ(){
    JOGADORES.sort((a, b) => a.nome.localeCompare(b.nome));
}




function createPlayer( nome = '', avatar_index = 0 ){
    if ( !can_save_player || avatar_index < 0 ){
        return;
    } 
    
    JOGADORES.push({
        'nome': nome,
        'avatar_index': avatar_index,
        'cartas': [],
        'score': 0
    });

    salvarEstado();
    toggleAddButton( JOGADORES.length < MAX_PLAYERS );
}

function editPlayerByIndex( index = -1, nome = '', avatar_index = 0, score = 0 ){

    if ( JOGADORES[index] != null && index >= 0 && avatar_index >= 0 ){ 
        JOGADORES[index].nome = nome;
        JOGADORES[index].avatar_index = avatar_index;
        JOGADORES[index].score = score;
        salvarEstado();
    }

}


// ADD/EDIT PLAYER -- SAVE BUTTON
function onClickSaveAddEditPlayer(){

    const modalMode             = document.getElementById("modal_addEditPlayer").getAttribute("mode");
    const usedNamePlayerIndex   = hasName(addEditPlayer_avatar_input.value.trim());
    const avatarSelectedIndex   = getAvatarSelectedIndex();

    // ADD PLAYER
    if ( modalMode == "add" ){

        can_save_player = document.querySelector("#addEditPlayer_avatar_list .addEditPlayer_avatar_selected") != null;

        if ( addEditPlayer_avatar_input.value.length == 0 ){
            document.getElementById("addEditPlayer_avatar_input_helper_wrapper").firstElementChild.innerHTML = 'Não pode estar vázio'; 
            can_save_player = false;
        }else if ( usedNamePlayerIndex >= 0 ){
            document.getElementById("addEditPlayer_avatar_input_helper_wrapper").firstElementChild.innerHTML = 'Nome já existe'; 
            can_save_player = false;
        }

        createPlayer( addEditPlayer_avatar_input.value.trim(), avatarSelectedIndex );

    }

    // EDIT PLAYER
    else{ 

        if ( addEditPlayer_avatar_input.value.length == 0 ){
            document.getElementById("addEditPlayer_avatar_input_helper_wrapper").firstElementChild.innerHTML = 'Não pode estar vázio'; 
            can_save_player = false;
        }else if ( usedNamePlayerIndex >= 0 && usedNamePlayerIndex != player_index_option ){
            document.getElementById("addEditPlayer_avatar_input_helper_wrapper").firstElementChild.innerHTML = 'Nome já existe'; 
            can_save_player = false;
        }else{
            can_save_player = true;
        }

        editPlayerByIndex( player_index_option, 
                            addEditPlayer_avatar_input.value.trim(), 
                            avatarSelectedIndex, 
                            JOGADORES[player_index_option].score );

    }


    document.getElementById("addEditPlayer_avatar_input_helper_wrapper").firstElementChild.style.visibility = (can_save_player)? "hidden" : "visible";

    if ( (can_save_player && player_index_option >= 0) || (can_save_player && avatarSelectedIndex >= 0) ){
        toggleAddButton(true);
        toggleModalById('modal_addEditPlayer', false);
        
        playerSortAZ();
        generatePlayerList(false);
        
        addEditPlayer_avatar_input.value = '';
        document.getElementById("addEditPlayer_avatar_input_helper_wrapper").firstElementChild.style.visibility = "hidden";
        can_save_player = false;

    }


}















// ADD/EDIT PLAYER -- INPUT
addEditPlayer_avatar_input.oninput = () => {

    document.getElementById("addEditPlayer_avatar_input_helper_wrapper").lastElementChild.innerHTML = (addEditPlayer_avatar_input.value.length) + '/' +  addEditPlayer_avatar_input.maxLength;

    const modalMode = document.getElementById("modal_addEditPlayer").getAttribute("mode");
    const usedNamePlayerIndex = hasName(addEditPlayer_avatar_input.value.trim());
    
    can_save_player = document.querySelector("#addEditPlayer_avatar_list .addEditPlayer_avatar_selected") != null;
    

    if ( addEditPlayer_avatar_input.value.length == 0 ){
        document.getElementById("addEditPlayer_avatar_input_helper_wrapper").firstElementChild.innerHTML = 'Não pode estar vázio'; 
        can_save_player = false;
    }else if ( usedNamePlayerIndex >= 0 ){
        if ( modalMode == "add" || (modalMode != "add" && usedNamePlayerIndex != player_index_option ) ){
            document.getElementById("addEditPlayer_avatar_input_helper_wrapper").firstElementChild.innerHTML = 'Nome já existe'; 
            can_save_player = false;
        }
    }else{
        document.getElementById("addEditPlayer_avatar_input_helper_wrapper").firstElementChild.innerHTML = ''; 
    }
    
    document.getElementById("addEditPlayer_avatar_input_helper_wrapper").firstElementChild.style.visibility = "visible";

};



// ADD/EDIT PLAYER -- INPUT FOCUS
addEditPlayer_avatar_input.onfocus = () => {
    document.querySelector("#modal_addEditPlayer .modal_wrapper").style.height = '75%';
};


addEditPlayer_avatar_input.onblur = () => {
    document.querySelector("#modal_addEditPlayer .modal_wrapper").style.height = '50%';
};

 

// ADD/EDIT PLAYER -- INPUT KEYDOWN
addEditPlayer_avatar_input.onkeydown = (evt) => {
    if ( evt.key == 'Enter' ){
        onClickSaveAddEditPlayer();
    }
};













// SEARCH INPUT TEXT
player_search_input.oninput = () => {


    if ( player_search_input.value.length > 0 ){
        document.getElementById("player_search_button").innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
        `;

        players_list.innerHTML = '';

        const searchTerm = player_search_input.value.toLowerCase();

        JOGADORES.forEach(e => {
            if ( e.nome.toLowerCase().includes(searchTerm) ){
                addPlayerToList(e, false);
            }
        });
        
    }else{
        document.getElementById("player_search_button").innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
        `;
        
        generatePlayerList(false);
    }

    document.getElementById("player_search_button").disabled = !( player_search_input.value.length > 0 );

};







// CLEAR SEARCH BAR
document.getElementById("player_search_button").onclick = () => {

    player_search_input.value = '';
    document.getElementById("player_search_button").innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
    </svg>
    `;
    document.getElementById("player_search_button").disabled = true;

    generatePlayerList(false);
    
    player_search_input.focus();
};







// ADD/EDIT -- GEN AVATAR IMAGE
function generateAvatarButton( idx_selected = -1 ){

    addEditPlayer_avatar_list.innerHTML = '';

    for (let i = 0; i < MAX_PLAYERS; i++){
        const avatarX = Math.trunc(i % 10);
        const avatarY = Math.trunc(i / 10);

        const avatar = document.createElement('button');
        avatar.classList.add("addEditPlayer_avatar");
        avatar.style.backgroundPosition = `calc(-50px * ${avatarX}) calc(-51px * ${avatarY})`;
        avatar.disabled = hasAvatarIndex(i) >= 0 && (idx_selected != i);

        if ( idx_selected >= 0 ){
            addEditPlayer_avatar_list.querySelectorAll("button").forEach((e, j) => e.classList.toggle("addEditPlayer_avatar_selected", idx_selected==j) );
        }

        addEditPlayer_avatar_list.appendChild(avatar);

    }

}




// ADD/EDIT -- SELECT AVATAR
addEditPlayer_avatar_list.onmousedown = () => {
    for (let i = 0; i < addEditPlayer_avatar_list.children.length; i++){
        addEditPlayer_avatar_list.children[i].onclick = () => {
            console.log("click avatar", i);
            addEditPlayer_avatar_list.querySelectorAll("button").forEach((e, j) => e.classList.toggle("addEditPlayer_avatar_selected", i==j) );
            scroll_avatar_list();
        };
    }
};









// JOGADORES -- OPTION CLICK
players_list.onmousedown = () => {

    for (let i = 0; i < players_list.children.length; i++){

        // EDIT (BUTTON)
        players_list.children[i].querySelector(".player_edit").onclick = () => {

            let idx = hasName( players_list.children[i].querySelector(".player_name").innerHTML );
            player_index_option = idx;
            document.getElementById("modal_addEditPlayer").querySelector(".modal_header").innerHTML = "Editar";
            document.getElementById("modal_addEditPlayer").setAttribute("mode", "edit");
            generateAvatarButton( JOGADORES[idx].avatar_index );
            addEditPlayer_avatar_input.value = JOGADORES[idx].nome;
            document.getElementById("addEditPlayer_avatar_input_helper_wrapper").firstElementChild.style.visibility = "hidden";
            document.getElementById("addEditPlayer_avatar_input_helper_wrapper").lastElementChild.innerHTML = (addEditPlayer_avatar_input.value.length) + '/' +  addEditPlayer_avatar_input.maxLength;
            toggleAddButton(false);
            toggleModalById("modal_addEditPlayer", true);
            addEditPlayer_avatar_list.scrollLeft = 0;

            setTimeout(()=>{
                scroll_avatar_list();
            }, 100);
            
        };





        // SHOW CARDS (BUTTON)
        players_list.children[i].querySelector(".player_cards").onclick = () => {
            player_index_option = hasName( players_list.children[i].querySelector(".player_name").innerHTML );
            generateCards();
            toggleScreenById("screen_players", false);
            toggleScreenById("screen_cards", true);
        };






        // DELETE (BUTTON)
        players_list.children[i].querySelector(".player_delete").onclick = () => {
            player_index_option = hasName( players_list.children[i].querySelector(".player_name").innerHTML );

            setModalDialogContents("Deletar?", "deseja apagar?", [
                // NO
                ()=>{ toggleModalById("modal_dialogBox", false); },
        
                // YES
                ()=>{ 
                    toggleModalById("modal_dialogBox", false);
                    JOGADORES.splice(player_index_option, 1);
                    players_list.children[i].style.opacity = 0;
                    players_list.children[i].style.transform = "translateX(100%)";
                    setTimeout(()=>{
                        players_list.children[i].remove()
                    }, 250);
                    salvarEstado();
                    toggleAddButton( JOGADORES.length < MAX_PLAYERS );
                }
            ]);
        
            toggleModalById("modal_dialogBox", true);

        };

    }

};









// ADD PLAYER
function addPlayerToList( obj, animate = true ){

    const player_wraper = document.createElement('div');
    player_wraper.classList.add("player_wrapper"); 

    const avatarX = Math.trunc(obj.avatar_index % 10);
    const avatarY = Math.trunc(obj.avatar_index / 10);

    player_wraper.innerHTML = `
    <div class="player_avatar" style="background-position: calc(-50px * ${avatarX}) calc(-51px * ${avatarY});"></div>

    <div class="player_content">
        <div class="player_name">${obj.nome}</div>
        <div class="player_cards_qty">Cartas ${obj.cartas.length}</div>
    </div>

    <div class="player_options">

        <button class="player_icon player_edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
        </button>

        <button class="player_icon player_cards" >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
            </svg>
        </button>

        <button class="player_icon player_delete" style="color: #dc3545;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg>
        </button>

    </div>
    `;


    if ( animate ){
        player_wraper.style.transform = 'translateX(100%)'; 
        setTimeout(()=>{
            player_wraper.style.transform = 'translateX(0%)';
        }, 200);
    } 
    
    players_list.appendChild( player_wraper );

}






// GEN PLAYERS ALL
function generatePlayerList( animate = true ){

    players_list.innerHTML = '';
    let speed = 150; 

    JOGADORES.forEach((e, i) => {

        if ( animate ){
            setTimeout(()=>{
                addPlayerToList(e);
                speed -= 10;
                if ( speed < 10 ){ speed = 10; }    
            }, speed*i);
        }
        else{
            addPlayerToList(e, false);
        }

    });

}







function cardIsUsed( card_name ){
    return JOGADORES.findIndex(jogador => jogador.cartas.includes(card_name));
}







 


// GEN CARDS
function generateCards(){
    
    const card_list_wrapper = document.querySelectorAll("#screen_cards .card_list_wrapper > .card_list");

    card_list_wrapper.forEach(e => {
        e.innerHTML = '';
        e.scrollLeft = 0;
    });


    for (let i = 0; i < CARTAS.length; i++) {
        const currentY = Math.trunc(i/25);

        const card_wrapper = document.createElement('label');
        card_wrapper.classList.add("card_wrapper");
        card_wrapper.innerHTML = `
        <input type="checkbox">
        <div class="card" card-name="${CARTAS[i]}"></div>`;

        const idx_card_player = cardIsUsed(CARTAS[i]);

        card_wrapper.firstElementChild.disabled = (idx_card_player >= 0 && idx_card_player != player_index_option );
        card_wrapper.firstElementChild.checked = idx_card_player == player_index_option;

        if ( currentY == 4 ){
            card_wrapper.querySelector(".card").style.backgroundImage = `url("assets/_${(CARTAS[i].split('_')[1] == "+4")?"wild_draw":"wild"}.png")`;
        }else{
            card_wrapper.querySelector(".card").style.backgroundImage = `url("assets/_${CARTAS[i].split('_')[1]}.png"), url("assets/${CARD_BASES[currentY]}")`;
        }
        
        card_list_wrapper[currentY].appendChild( card_wrapper );
        
    }


}














// TELA CALCULAR



function onClickMenuCalculate(){
    closeAllScreen();
    toggleScreenById("screen_calculate", true);

    screen_calculate.querySelector(".screen_content").innerHTML = '';

    const tempJogadores = JSON.parse(JSON.stringify(JOGADORES));
    tempJogadores.sort((a, b) => b.score - a.score).forEach(e => generateCalculatedPlayer(e));

}

function onClickMenuCalculateBack(){
    closeAllScreen();
    toggleScreenById("screen_calculate", false);
    toggleScreenById("screen_main", true);
    
    setTimeout(() => {
        screen_calculate.querySelector(".screen_content").innerHTML = '';
    }, 200);
}



calculate_save_button.onclick = () => {

    console.warn("GERANDO...");


};




function getScoreByCardName( card_name ){
    const cardParts = card_name.split("_");

    if ( cardParts[0] == 'wild' ){
        return 50;
    }

    if ( !isNaN(cardParts[1]) ){
        return parseInt(cardParts[1]);
    }

    return 20;

}


function getScoreByCardList( card_list ){
    return card_list.map(e => getScoreByCardName(e)).reduce((a,b)=> a+b, 0);
}





function generateCalculatedPlayer( playerObject = JOGADORES[0] ){
    const calc_player_wrapper = document.createElement("div");
    calc_player_wrapper.classList.add("calc_player_wrapper");

    const avatarX = Math.trunc(playerObject.avatar_index % 10);
    const avatarY = Math.trunc(playerObject.avatar_index / 10);

    calc_player_wrapper.innerHTML = `
    <div class="player_wrapper">
        <div class="player_avatar" style="background-position: calc(-50px * ${avatarX}) calc(-51px * ${avatarY});"></div>
        <div class="player_content">
            <div class="player_name">${playerObject.nome}</div>
            <div class="player_cards_qty">Cartas ${playerObject.cartas.length}</div>
        </div>
    </div>
    
    <div class="calc_player_controls">
        <div class="calc_player_score_wrapper">
            <div>SCORE:</div>
            <div>${playerObject.score}</div>
        </div>
        <button class="calc_player_expand_button">CARTAS</button>
    </div>
    
    <div class="calc_player_card_list">
        <div class="card_list"></div>
    </div>
    `;



    playerObject.cartas.forEach((carta, index) => {
        const cardParts = carta.split("_");
        const calc_card_wrapper = document.createElement("div");
        calc_card_wrapper.classList.add("calc_card_wrapper");
        calc_card_wrapper.innerHTML = `
        <div class="card" card-name="${carta}" style="background-image: url('assets/_0.png'), url('assets/red_base.png');"></div>
        <div class="calc_card_score">${getScoreByCardName(carta)}</div>`;
        calc_player_wrapper.querySelector(".card_list").appendChild(calc_card_wrapper);

        
        if ( cardParts[0] == 'wild' ){
            calc_card_wrapper.querySelector(".card").style.backgroundImage = `url("assets/_${(cardParts[1] == "+4")?"wild_draw":"wild"}.png")`;
        }else{
            calc_card_wrapper.querySelector(".card").style.backgroundImage = `url("assets/_${cardParts[1]}.png"), url("assets/${cardParts[0]}_base.png")`;
        }

        if ( index < playerObject.cartas.length - 1 ){
            const calc_plus = document.createElement("div");
            calc_plus.classList.add("calc_plus");
            calc_plus.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>`;
            calc_player_wrapper.querySelector(".card_list").appendChild(calc_plus);
        }

    });




    
    calc_player_wrapper.querySelector(".calc_player_expand_button").onclick = () => {
        calc_player_wrapper.querySelector(".calc_player_card_list").classList.toggle("calc_player_card_list_visible");
        calc_player_wrapper.querySelector(".card_list").scrollLeft = 0;
    };

    screen_calculate.querySelector(".screen_content").appendChild(calc_player_wrapper);

}






document.querySelectorAll(".calc_player_wrapper").forEach(e => {
    e.querySelector(".calc_player_expand_button").onclick = () => {
        e.querySelector(".calc_player_card_list").classList.toggle("calc_player_card_list_visible");
    };
});




onload = () => {
    carregarEstado();
    generateCards();
    playerSortAZ();
    generatePlayerList();
    toggleScreenById("screen_main", true);
};

