/*global $*/

$("document").ready(function(){
    $.getJSON("api/todos")
    .then(addTodos)
    .catch(function(error){
      console.log(error);
    })
    
    $("#todoInput").keypress(function(event) {
      if(event.which === 13) {
        createTodo();
      }
    });
    
    $('.list').on('click', 'li', function() {
      updateTodo($(this));
    })
    
    $(".list").on("click", 'span', function(event) {
      event.stopPropagation();
      
      removeTodo($(this).parent());
    })
});

function removeTodo(todo) {
  var selectedId = todo.data('id');
  var deleteUrl = '/api/todos/' + selectedId;

  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
  .then(function(data) {
    todo.remove();
  })
  .catch(function(error) {
    console.log(error);
  })
}

function addTodos(todos) {
  todos.forEach(function(todo) {
    addTodo(todo);
  })
}

function addTodo(todo) {
  var newTodo = $('<li class="task">'+todo.name+'<span>X</span></li>');
  newTodo.data('id', todo._id);
  newTodo.data('completed', todo.completed);

  if(todo.completed) {
    newTodo.addClass('done');
  }

  $(".list").append(newTodo);
}

function createTodo() {
  var userInput = $("#todoInput").val();
  $.post('./api/todos', {name: userInput})
    .then(function(newTodo) {
      $("#todoInput").val('');
      addTodo(newTodo);
    })
    .catch(function(error) {
      console.log(error);
    })
}

function updateTodo(todo) {
  var updateUrl = '/api/todos/' + todo.data('id');
  var isDone = !todo.data('completed');
  var updateData = {completed: isDone};
  
  console.log(updateData);
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData    
  })
  .then(function(updatedTodo) {
    todo.toggleClass('done');
    todo.data('completed', isDone);
  })
}