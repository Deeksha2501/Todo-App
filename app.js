var cafeList = document.getElementById('cafe-list');
var form = document.getElementById('add-cafe-form');



//create an element and render cafe
function renderCafe(doc){
    var checkbox = document.createElement('input')
    checkbox.type = "checkbox";
    checkbox.id =  doc.id;
    checkbox.name = "check";
    var html =  //<input type="checkbox" name="check" id="${doc.id}>
    `<label for="${doc.id}"><div>&#10004;</div></label>`
    let ID  = doc.id;
    console.log(ID);
    let li = document.createElement('li');
    let todo = document.createElement('span');
    let motive = document.createElement('span');
    let cross = document.createElement('div');
    let update = document.createElement('div');
    li.setAttribute('data-id' , doc.id);
    todo.textContent = doc.data().todo;
    motive.textContent = doc.data().motive;
    cross.textContent = 'Remove';
    // update.textContent = '✏️';
    update.id = 'update';
    li.appendChild(checkbox);
    li.insertAdjacentHTML("beforeend" ,html);
    li.appendChild(todo);
    li.appendChild(motive);
    // li.appendChild(update);
    li.appendChild(cross);

    cafeList.appendChild(li);

    //deleting data
    cross.addEventListener('click' , (e)=>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
        getdata();
    });

    checkbox.addEventListener('click' , e=>{
        // e.target.parentElement.classList.toggle('a');
        // e.target.nextElementSibling.textContent = "ncjewknk"
        console.log(checkbox.checked);
    });


}

//getting data
// getdata = () =>{
// db.collection('cafes').get().then(snapshot => {
//     cafeList.textContent = '';
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc)
//     });
// });
// }

//saving data
form.addEventListener('submit' , e=>{
    e.preventDefault();
    let added_todo = form.todo.value;
    let added_motive = form.motive.value;
    let checked = false;
    if(!added_motive){
        added_motive = 'Stop all postponement';
    }
    if(added_todo){
    db.collection('cafes').add({
        todo : added_todo,
        motive: added_motive,
        checked : checked
    });
}
    form.todo.value = '';
    form.motive.value = '';
    form.todo.focus();
    getdata();
})

// getdata();

db.collection('cafes').onSnapshot((snapshot)=>{
    let changes = snapshot.docChanges();
    changes.forEach(change =>{
        if(change.type == 'added'){
            renderCafe(change.doc);
        }
        else if(change.type == 'removed'){
            let li = document.querySelector('[data-id=' + change.doc.id + ']');
            console.log(li);
            cafeList.removeChild(li);
        }

    })
})
