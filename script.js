function shuffleChildren(parent) {
    let children = parent.children 
    let i = children.length, k, temp
    while (--i > 0) {
        k = Math.floor(Math.random()*(i+1)) //permet entier inférieur et random pour permet alétoire
        temp = children[k]
        children[k]= children[i]
        parent.appendChild(temp)  
    }
}
function showReaction(type, clickedBox) {
    clickedBox.classList.add(type)
    if (type !== "succes") {
       setTimeout(function () {
        clickedBox.classList.remove(type)
       },800) 
    }
}
const box = document.createElement("div");              //creéation un élemnt (enfant)
box.classList.add("box");                                           // ajouter element

const board = document.querySelector("#board");                 // declarer board (parent)

let nb = 1;
for (let i=1; i<=10; i++){                                       //boucle jusqu'à 10
    const newBox =box.cloneNode()
    newBox.innerText=i                                          // ecrire texte (i) dans chaque boite 
    board.appendChild(newBox)                                   // appeler l'enfant 

    newBox.addEventListener("click",function () {
         
        if (i == nb) {
            newBox.classList.add("box-clicked")     
            
            
            if (nb == board.children.length){              /* Si nb est égal au nombre de boites du jeu, c'est que le dernier clic était
                                                                sur la dernière boite   → victoire  du joueur ! (Il ne faut pas incrémenter nb avant !)*/
             board.querySelectorAll(".box").forEach(function(box){
                showReaction("success", box)
             }) 
            }
            nb++
        }
        else if(i > nb) {                              /* Si le numéro de la boite est supérieur à nb, c'est 
                                                        que le joueur a cliqué une boite trop élevée → game  over !*/                         
            showReaction("error", newBox)
            nb = 1
            board.querySelectorAll(".box-clicked").forEach(function(validBox){
                validBox.classList.remove("box-clicked")
            })
        }
        else{                                               /* Dernière possibilité : le joueur a cliqué sur une 
                                                                boite déjà grisée. On l'informe simplement de cela, le jeu ne redémarre pas.*/
            showReaction("notice", newBox)
        }
    })
}
shuffleChildren(board)

