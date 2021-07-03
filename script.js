// From line 1-33 deals with adding a new card

const taskContainer = document.querySelector(".task_container");

var globalStore = [];                                 //Array to store data

const generateNewCard = (taskData) => `
    <div class="col-md-6 col-lg-4" >
        <div class="card text-center">
            <div class="card-header d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-outline-success" id=${taskData.id} onclick="editCard.apply(this, arguments)"><i class="fas fa-pencil-alt" id=${taskData.id}></i></button>
                <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"><i class="fas fa-trash" id=${taskData.id}></i></button>
            </div>
            <img src=${taskData.imageUrl} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${taskData.taskTitle}</h5>
                <p class="card-text">${taskData.taskDescription}</p>
                <a href="#" class="btn btn-primary">${taskData.taskType}</a>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-outline-primary">Open Task</button>
            </div>
        </div>
    </div>
`;

const loadInitialCardData = () => {
    // call local storage to load tasky data
    const getCardData = localStorage.getItem("tasky");

    // then convert to normal object
    const {cards} = JSON.parse(getCardData);            //destructuring

    // then loop over array of tasky objects to create our cand and inject to dom
    cards.map((cardObject) => {
        //inject to dom
        taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));
        //update globalStorage
        globalStore.push(cardObject);
    });
    
    // then update globalStore

};

const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`, // return unique number for id
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value,
  };

  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

  globalStore.push(taskData);           /* Push taskData to globalStore array */

  localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));            /* tasky is id and JSON.stringify({cards:globalStore}) is data. JSON.stringify to convert globalStore to string from object. cards is an object created by us */

};

// Store data in local storage (Only 5 MB) [solved]

// API --> Aplication Programing Interface
// Local Storage -> Application

//Delete Card


const deleteCard = (event) => {

    event = window.event;
    //id
    const targetID = event.target.id;
    const tagname = event.target.tagName;

    // Match id of element with that of the one inside globalStore
    // if match found remove the card

    globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);           //updated array of card
    localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));

    //contact paprent i.e task_container

    if (tagname === "BUTTON") {
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }
    else{
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }
};

const editCard = (event) => {
    event = window.event;
    //id
    const targetID = event.target.id;
    const tagname = event.target.tagName;

    let parentElement;

    if(tagname === "BUTTON"){
        parentElement = event.target.parentNode.parentNode;
    }
    else{
        parentElement = event.target.parentNode.parentNode.parentNode;
    }

    let taskTitle = parentElement.childNodes[5].childNodes[1];
    let taskDescription = parentElement.childNodes[5].childNodes[3];
    let taskType = parentElement.childNodes[5].childNodes[5];
    // Save Button
    let submitButton = parentElement.childNodes[7].childNodes[1];
    // console.log(taskTitle);
    // console.log(taskDescription);
    // console.log(taskType);
    // console.log(parentElement.childNodes[7].childNodes[1]);

    taskTitle.setAttribute("contenteditable", "true");
    taskDescription.setAttribute("contenteditable", "true");
    taskType.setAttribute("contenteditable", "true");
    submitButton.innerHTML = "Save Changes";
    

    

    

};


//contenteditable = "True"
// setAtributeNode(contenteditable, true)