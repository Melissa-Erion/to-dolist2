$(document).ready(function() {
    var getAndDisplayAllTasks = function () {
        $.ajax({
          type: 'GET',
          url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=274',
          dataType: 'json',
          success: function (response, textStatus) {
            $('#todo-list').empty();
            var filteredTasks = response.tasks;
    
            if (filterPreference === 'completed') {
              filteredTasks = filteredTasks.filter(function(task) {
                return task.completed;
              });
            } else if (filterPreference === 'active') {
              filteredTasks = filteredTasks.filter(function(task) {
                return !task.completed;
              });
            }
    
            filteredTasks.forEach(function (task) {
              $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? ' checked' : '') + '></div>');
            });
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
      };

  var createTask = function () {
    $.ajax({
      type: 'POST',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=274',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#new-task-content').val() 
        }
      }),
      success: function (response, textStatus) {
        console.log(response);
        $('#new-task-content').val('');
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  var deleteTask = function (id) {
    $.ajax({
      type: 'DELETE',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=274',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  
  $('#create-task').on('submit', function (e) {
    e.preventDefault();
    createTask();
  });

  $(document).on('click', '.delete', function () {
    deleteTask($(this).data('id'));
  });
});