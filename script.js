$(document).ready(function() {
$.ajax({
    type: 'GET',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=274',
    dataType: 'json',
    success: function (response, textStatus) {
        response.tasks.forEach(function (task) {
            $('#todo-list').append('<p>' + task.content + '</p>');
          })
        },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
});