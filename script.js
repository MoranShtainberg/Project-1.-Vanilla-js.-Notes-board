//DOM

const form = document.querySelector('form')
const f_task_des = document.querySelector('#floatingTextarea')
const f_due_date = document.querySelector('#due_date')
const f_due_time = document.querySelector('#due_time')
const form_submit_btn = document.querySelector('#form_submit')
const row_div = document.querySelector('#row_id')

let single_note = {
  noteId: '',
  note_text: '',
  note_date: '',
  note_time: '',
}

let notesArr = []
if (localStorage.MyNotes) {
  notesArr = JSON.parse(localStorage.MyNotes)
}
console.log(notesArr);


form.addEventListener('submit', function(e){
  e.preventDefault()
  
  //Generate new element
    const c_x_btn = document.createElement("button")
    c_x_btn.className = "btn-close"    

    const c_p_des = document.createElement("p")
    c_p_des.className = "p_max_height"

    const c_p_date = document.createElement("p")
    c_p_date.className = "footer_date"
    
    const c_p_time = document.createElement("p")
    c_p_time.className = "footer_time"

    const c_div_footer = document.createElement("div")
    c_div_footer.className = "card-footer"

    const c_div_body = document.createElement("div")
    c_div_body.className = "card-body"

    const c_div_first = document.createElement("div")
    c_div_first.className = "card col-lg-3 col-md-4 col-sm-6 note_bg"
    c_div_first.id = 'id-'+ Math.random().toString().split('.')[1] // Generate random id per card    
    
  //Change the settings
    c_p_des.textContent = f_task_des.value
    c_p_date.textContent = f_due_date.value 
    c_p_time.textContent = f_due_time.value    
    
  //Append
    //Append to footer div
    c_div_footer.appendChild(c_p_date)
    c_div_footer.appendChild(c_p_time)
    //Append to card body div
    c_div_body.appendChild(c_x_btn)
    c_div_body.appendChild(c_p_des)
    c_div_body.appendChild(c_div_footer)
    //Append to card first div
    c_div_first.appendChild(c_div_body)
    //Append to card row div
    row_div.appendChild(c_div_first)
    
  // Create Notes array    
    single_note = {
      noteId: c_div_first.id,
      note_text: c_p_des.textContent,
      note_date: c_p_date.textContent,
      note_time: c_p_time.textContent,
    }
    notesArr.push(single_note);                       // Add single_note object to array (notesArr)
    console.log(notesArr);

  //Remuve relevant Child (note) when X is clicked
  const x_arr = document.querySelectorAll('.btn-close')     // X Buttons Array
    for(let i=0; i < x_arr.length; i++){
      x_arr[i].addEventListener('click',function(e){
        //console.dir(e.target);
        //console.log(e.target.parentElement.parentElement.id);
        //console.log(notesArr[i]["noteId"]);
        remuveNoteFrom_notesArr(e.target.parentElement.parentElement.id);    
        row_div.removeChild(e.target.parentElement.parentElement);        
      })
      localStorage.setItem('MyNotes',JSON.stringify(notesArr))  // Save (notesArr) to local storage
    }    
    
  
    console.log(notesArr);
    
  // X (Mouse events)
    c_div_first.addEventListener('mouseenter',function(e){
      //console.log("#"+e.target.id+" .btn-close");
      document.querySelector("#"+e.target.id+" .btn-close").style.display = "block"
    })
    c_div_first.addEventListener('mouseleave',function(e){
      //console.log("#"+e.target.id+" .btn-close");
     document.querySelector("#"+e.target.id+" .btn-close").style.display = "none"
    })    
      
  reset_form()      
})

// -------------------------------------------------------Reset form-----------------------------------------     
  function reset_form() {
    document.getElementById("task_form_id").reset();
  }      


// Remuve a note object from notesArr
function remuveNoteFrom_notesArr(noteId) {
  for (let i = 0; i < notesArr.length; i++) {
    if (notesArr[i]["noteId"] == noteId) {
      notesArr.splice(i,1) 
    }        
  }
  localStorage.setItem('MyNotes',JSON.stringify(notesArr))  // Save (notesArr) to local storage
}

//---------------------------------------------------------On load--------------------------------------------


 
document.addEventListener('DOMContentLoaded', function(){
  if (notesArr.length>0) {
    console.log(notesArr);
    for (let i = 0; i < notesArr.length; i++) {
        
      //Generate new element
        const c_x_btn = document.createElement("button")
        c_x_btn.className = "btn-close"    

        const c_p_des = document.createElement("p")
        c_p_des.className = "p_max_height"

        const c_p_date = document.createElement("p")
        c_p_date.className = "footer_date"
        
        const c_p_time = document.createElement("p")
        c_p_time.className = "footer_time"

        const c_div_footer = document.createElement("div")
        c_div_footer.className = "card-footer"

        const c_div_body = document.createElement("div")
        c_div_body.className = "card-body"

        const c_div_first = document.createElement("div")
        c_div_first.className = "card col-lg-3 col-md-4 col-sm-6 note_bg"
        
        
      //Change the settings    
        c_div_first.id = notesArr[i]["noteId"]           //'id-'+ Math.random().toString().split('.')[1] // Insted!!! of generating random id per card again
        c_p_des.textContent = notesArr[i]["note_text"]
        c_p_date.textContent = notesArr[i]["note_date"]
        c_p_time.textContent = notesArr[i]["note_time"]

      //Append
        //Append to footer div
        c_div_footer.appendChild(c_p_date)
        c_div_footer.appendChild(c_p_time)
        //Append to card body div
        c_div_body.appendChild(c_x_btn)
        c_div_body.appendChild(c_p_des)
        c_div_body.appendChild(c_div_footer)
        //Append to card first div
        c_div_first.appendChild(c_div_body)
        //Append to card row div
        row_div.appendChild(c_div_first)

        // X (Mouse events)
            c_div_first.addEventListener('mouseenter',function(e){
              //console.log("#"+e.target.id+" .btn-close");
              document.querySelector("#"+e.target.id+" .btn-close").style.display = "block"
            })
            c_div_first.addEventListener('mouseleave',function(e){
              //console.log("#"+e.target.id+" .btn-close");
              document.querySelector("#"+e.target.id+" .btn-close").style.display = "none"
            })
        
            c_x_btn.addEventListener('click',function(e){
              //console.dir(e.target);
              //console.log(e.target.parentElement.parentElement.id);
              //console.log(notesArr[i]["noteId"]);
              remuveNoteFrom_notesArr(e.target.parentElement.parentElement.id);    
              row_div.removeChild(e.target.parentElement.parentElement);        
            })

      } // Close for loop
    }  //close if
  })  // close DOMContentLoaded  