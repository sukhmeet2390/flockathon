var __id = 0;
function Task(props){ // {description: , userId: }
    this.taskId = __id++;// ID should be somehow related to task description
    this.description = props.description;
    this.userId = props.userId;
    this.currentlyWorkingOn = false;
    this.completed = false;
}
Task.prototype.toggleCompleted = function(){
    this.completed = !this.completed;
}

module.exports = Task;
