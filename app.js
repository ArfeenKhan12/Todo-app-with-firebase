
  import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth, db } from './config.js';
import { collection, addDoc, getDocs , deleteDoc, doc, updateDoc} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";


const todo = document.getElementById('todo');
const form = document.querySelector('form');
const ul = document.querySelector('ul');
let arr = [];

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log( uid);

    } else {
        console.log("error occured");
    }
});




form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log(todo.value);


    try {
        const docRef = await addDoc(collection(db, "todos"), {
            todo:todo.value
        });
        console.log("Document written with ID: ", docRef.id);
        arr.push({
            todo:todo.value,
            id:docRef.id
        });
        rendertodo();
    } catch (e) {
        console.error("Error adding document: ", e);
    }

})



function rendertodo() {
    ul.innerHTML = '';

    arr.map((item) => [
        ul.innerHTML += `<li>${item.todo} <button class="editLi">Edit</button> <button class="deleteLi">Delete</button></li>`
    ])


    const editLi = document.querySelectorAll('.editLi');
    editLi.forEach((item, index) => {
        item.addEventListener('click', async () => {
            const editNewValue = prompt('Enter new todo');
            const todoUpdate = doc(db, "todos", arr[index].id);
            await updateDoc(todoUpdate, {
                todo: editNewValue,
              });
              arr[index].todo = editNewValue
            rendertodo();
        })
    });

    const deleteLi = document.querySelectorAll('.deleteLi');
    deleteLi.forEach((item, index) => {
        item.addEventListener('click',async () => {
            await deleteDoc(doc(db, "todos", arr[index].id));
            arr.splice(index, 1);
            rendertodo();
        })
    });



}


async function getData() {
    const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        arr.push({...doc.data(),id:doc.id})
    });
    rendertodo();
}


getData();