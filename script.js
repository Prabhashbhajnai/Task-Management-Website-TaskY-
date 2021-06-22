// From line 1-33 deals with adding a new card

const taskContainer = document.querySelector(".task_container");

const globalStore = [];                                 //Array to store data

const generateNewCard = (taskData) => `
    <div class="col-md-6 col-lg-4" id=${taskData.id}>
        <div class="card text-center">
            <div class="card-header d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
                <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
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

// Store data in local storage (Only 5 MB)

// API --> Aplication Programing Interface
// Local Storage -> Application