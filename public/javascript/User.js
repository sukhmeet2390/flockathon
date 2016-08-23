var TaskList = require('./TaskList');
function User(props){ // {description: , userId: }
    this.userId = props.userId;
    this.data = new TaskList();
    this.taskId=null;
    this.startTime= 0;
    this.endTime=0;
}
User.prototype.getUserID = function(){
    return this.userId;
};

module.exports = User;
