//alert("Hello") // alert whn reloading the page - good test to see if connected properly

const today = document.querySelector(".today");

const options = {weekday: "long", year: "numeric", month: "short", day: "numeric"}

const todayDate = new Date().toLocaleDateString("en-AU", options)

today.innerHTML = todayDate;


const url = "http://localhost:3000/todos"

async function getTodos() {
    try {

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }

        const response = await fetch(url, options);

        const todos = await response.json();

        //console.log(todos);

        todos.forEach((todo) => {
            console.log(todo);
            const todoContainer = document.querySelector(".todo-items");

            const newTask = document.createElement("li");
            newTask.innerHTML = todo.text                       //innerHTML refers to the text

            const buttonDiv = document.createElement("div");
            buttonDiv.classList.add("btns");

            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";
            const updateButton = document.createElement("button");
            updateButton.innerHTML = "Update";


            buttonDiv.appendChild(deleteButton)
            buttonDiv.appendChild(updateButton)

            newTask.appendChild(buttonDiv);


            todoContainer.appendChild(newTask)


            //delete button event listener
            deleteButton.addEventListener("click", function(){
                //console.log("delete button clicked")
                deleteItem(todo._id);
            });

            updateButton.addEventListener("click",
                function(){
                    console.log("got clicked")
                    updateItem(todo)
                })

        });
    } catch (error) {
        console.log(error)
    }
}

getTodos();

let isUpdating; //


let todo;
const input = document.querySelector(".new-task");
input.addEventListener("change", function(event) {
    event.preventDefault();
    //console.log(event.target.value)
    todo = event.target.value  //the value we are passing into the input field
})

const addButton = document.querySelector(".submit-btn")
addButton.addEventListener("click", function() {
    //postHandler();
    if(!isUpdating){
        postHandler()
    } else {
        updateItem(newItem)
        window.location.reload();
    }
});

async function postHandler() {
    try {
        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: todo
            }),
        };

        // console.log(JSON.stringify({text: todo}))
        const response = await fetch(url, option);

        if (response.ok) {
            console.log("Successful");
            window.location.reload();
        } else {
                console.log("Post request unsuccessful")
                }
        

    } catch (error) {

        console.log(error)
    }
}



// Delete request

async function deleteItem(id){

    console.log(id)

    //url parameters
    const deleteUrl = `http://localhost:3000/todos/${id}`;
    //console.log(url)

    try {
        const option = {
            method: "DELETE"
        }

        const ItemToBeDeleted = await fetch(deleteUrl, option);

        window.location.reload();
        

        if (ItemToBeDeleted.ok){
            console.log("Item is deleted")
        } else {
            console.log("Delete failed")
        }

    } catch (error) {
        console.log(error);
    }
}



async function updateItem(itemToUpdate) {
    console.log(itemToUpdate)

    const {_id, text} = itemToUpdate //destructure the item

    isUpdating = true;

    const updateURL = `http://localhost:3000/todos/${_id}`;

    input.value = text;

    newItem = itemToUpdate; // so itemToUpdate can be called outside of the function

    try {
        
        const option = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: todo
            })
        }

        const response = await fetch(updateURL, option);
        

        if (response.ok) {
            console.log("Upate Successfull")
            
        }  else {
            console.log("Update failed")
        }
    } catch (error) {
        console.log(error);
        
    }
    
}