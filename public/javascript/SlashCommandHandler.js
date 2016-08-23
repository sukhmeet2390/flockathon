var url="http://mockbin.com/request";
var botToken = "";
var HttpClient = require('./HttpClient');
var SlashCommandHandler = {
    handleGeneralText: function (state) {
        var text = state.text;
        var handler = text.split(' ')[0];
        var subText = text.split(' ')[1];
        switch (handler) {
            case 'help':
                this.handleHelp(state);
                break;

            case 'list':
                this.handleList(state);
                break;

            case 'start':
                this.handleStart(state,subText);
                break;

            case 'stop':
                this.handleStop(state);
                break;

            case 'what':
                this.handleWhat(state,subText);
                break;

            default:
                break;

        }
    },
    _sendTextMessage: function (userId,msg) {
        var body= {
            message:{
                to: userId,
                text: msg
            }
        };
        HttpClient.doPost(botToken,url,body);
    },
    _stopAndLogCurrentTask: function(user) {
        if (user.taskId) {
            var task = user.data.getTask(user.taskId);
            user.endTime = new Date();
            task.timeWorked += user.endTime - user.startTime;
            user.taskId = null;
            return true;
        }
        else
            return false;
    },
    handleList: function (state) {
        var user =  Users[state.userId];
        var outText="";
        var tasklist = user.data.getList();
        if(tasklist.length==0){
            outText = "No task listed use command add to insert a task"
        }
        else{
            tasklist.forEach(function (task) {
                outText+="TaskID: "+task.taskId+",Description: "+task.description+",Hours Worked: "+task.timeWorked;
                if(task.completed){
                    outText+="(DONE)";
                }
                if(task.currentlyWorkingOn){
                    outText+="(currentlyTask)";
                }
                outText+="\n";
            });
        }
        this._sendTextMessage(state.userId,outText);
    },
    handleStart: function (state,subText) {
        var user = Users[state.userId];
        var newTask = user.data.getTask(subText);
        if(newTask) {
            if (user.taskId) {
                this._stopAndLogCurrentTask(user);
            }
            user.taskId = subText;
            user.startTime= new Date();
            this._sendTextMessage(state.userId,"Current Task: "+newTask.description);
        }
        else{
            this._sendTextMessage(state.userId,"Incorrect TaskId");
        }
    },
    handleStop: function (state) {
        var user = Users[state.userId];
        if(this._stopAndLogCurrentTask(user)){
            this._sendTextMessage(state.userId,"No Current Task");
        }
        else{
            this._sendTextMessage(state.userId,"Task Stopped");
        }
    },
    handleWhat: function(state){
        var user = Users[state.userId];
        if(!user.taskId){
            this._sendTextMessage(state.userId,"No Current Task");
        }
        else{
            var task = user.data.getTask(user.taskId);
            this._sendTextMessage(state.userId,"Current TaskID: "+task.taskId+", Task Description: "+task.description);
        }
    },
    handleHelp: function (state) {
        // this.initMockData();
        // var url = 'http://mockbin.com/request';
        // var body = {"parameter": 23, "foo": "bar"};
        // console.log('handling help');
        // return HttpClient.doPost(TOKEN, url, body).then(function (response) {
        //     console.log(response);
        //     return Users['user-guid'];
        // });
        var message="help message";
        this._sendTextMessage(state.userId,message);
    }
};
module.exports = SlashCommandHandler;