const boxes = document.querySelectorAll(".box");
const reset = document.querySelector("#reset");
const winPattern = ["123","456","789","147","258","369","159","357"];
const mark = ["x","o"];

let gameRunning = true;

let idx = 0;

//For alternating the X and O clicks 


//Reset btn functionality - it resets event div to its original state
reset.addEventListener("click", ()=>{
    boxes.forEach(element => {
        element.setAttribute("class", "box");
        element.innerHTML = null;
        document.querySelector("#news").innerHTML = "";
        gameRunning = true;
        idx = 0;
    });
})


for (const box of boxes) {
    box.addEventListener("click", ()=>{
        if(!gameRunning){
            return;
        }
        if(!box.innerHTML){
            box.innerHTML = `${mark[idx]}`;
            box.classList.add(`${mark[idx]}-mark`);
        
            //Function will be called to check winning.
            checkWin(idx);

            idx = idx>0 ? 0 : 1;
        }
    })
}


let checkWin = (i) =>{
    let text = "";
    if(i===0){
        let set = document.querySelectorAll(".x-mark");
        set.forEach(element => {
            text += element.getAttribute("id");
        });
        console.log(text);

        //Logic - if the winning pattern matches in the text sequence, then 'X' wins
        for (const pattern of winPattern) {
            if(isSubsequence(pattern,text)){
                document.querySelector("#news").innerHTML = "X won";
                gameRunning = false;
            }
        }

    }
    else{
        let set = document.querySelectorAll(".o-mark");
        set.forEach(element => {
            text += element.getAttribute("id");
        });
        console.log(text);

        //Logic - if the winning pattern matches in the text sequence, then 'O' wins
        for (const pattern of winPattern) {
            if(isSubsequence(pattern,text)){
                document.querySelector("#news").innerHTML = "O won";
                gameRunning = false;
            }
        }
    }
}

//self-developed function to search for a particular seq in a string.
function isSubsequence(pattern, text) {
  let i = 0; // pattern pointer
  let j = 0; // text pointer

  while (i < pattern.length && j < text.length) {
    if (pattern[i] === text[j]) {
      i++;
    }
    j++;
  }

  return i === pattern.length;
}



