var Task = require('./Task');
function TaskList(){
    this.taskList = [];
}
TaskList.prototype.addToList = function(props){
    var task = new Task(props);
    this.taskList.push(task);
    return this.taskList;
};
TaskList.prototype.getList = function () {
    return this.taskList;
};
TaskList.prototype.getTask = function (taskId) {
    var taskObj;
    this.taskList.forEach(function (task) {
        if(task.taskId==taskId){
            taskObj = task;
        }
    });
    return taskObj;
};
module.exports = TaskList;