var Task = require('./Task');
function TaskList(){
    this.taskList = [];
}
TaskList.prototype.addToList = function(props){
    var task = new Task(props);
    this.taskList.push(task);
    return this.taskList;
};
module.exports = TaskList;