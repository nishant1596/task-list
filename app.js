//defining variables
const form_add=document.querySelector('#task-form');
const form_add_input=document.querySelector('#task');
const form_add_submit=document.querySelector('#add-task');
const collection_ul=document.querySelector('.collection');
const body=document.querySelector('body');
const clearTask=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
// console.log(form_add);
// console.log(form_add_input);
// console.log(form_add_submit);

form_add.addEventListener("submit",addTask);
collection_ul.addEventListener("click",removeTask);
clearTask.addEventListener('click',removeAll);
filter.addEventListener('keyup',filterTask);
getTask();
//addtask
function addTask(e) {
  if (form_add_input.value===''){
    alert('Please add a task');
return;
  }
  let li=document.createElement('li');
  li.className='collection-item';
  li.innerText=form_add_input.value;
  let link=document.createElement('a');
  link.className="delete-item secondary-content";
  link.innerHTML='<i class="fa fa-remove" style="cursor:pointer"></i>';
  li.appendChild(link);
  taskLocalStorage(form_add_input.value);
  collection_ul.appendChild(li);
  form_add_input.value='';
  e.preventDefault();
}

//removeTask
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function removeAll(e) {
  if(e.target.classList.contains('clear-tasks')){
    if (confirm('Do you want to delete all the tasks list ?')) {
      while(collection_ul.firstChild){
      collection_ul.removeChild(collection_ul.firstChild);
    }
    }
  }
}

function filterTask(e){
  const text=e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
  const item=task.firstChild.textContent;
  if(item.toLowerCase().indexOf(text)!=-1){
    task.style.display='block';
  }
  else{
    task.style.display='none';
  }
  });
}

//store task in local storage
function taskLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }
  else {
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}
function getTask(e){
  let tasklist=JSON.parse(localStorage.getItem('tasks'));
  for (i=0;i<tasklist.length;i++){
    let li=document.createElement('li');
    li.className='collection-item';
    li.innerText=tasklist[i];
    let link=document.createElement('a');
    link.className="delete-item secondary-content";
    link.innerHTML='<i class="fa fa-remove" style="cursor:pointer"></i>';
    li.appendChild(link);
    collection_ul.appendChild(li);
  }
}
