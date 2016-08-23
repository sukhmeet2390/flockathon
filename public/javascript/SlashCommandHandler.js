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
        }
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
        }
        else{
            this._sendTextMessage(state.userId,"Incorrect TaskId");
        }
    }
    ,
    handleStop: function () {

    },
    handleWhat: function(){

    },
    handleHelp: function () {
        // this.initMockData();
        // var url = 'http://mockbin.com/request';
        // var body = {"parameter": 23, "foo": "bar"};
        // console.log('handling help');
        // return HttpClient.doPost(TOKEN, url, body).then(function (response) {
        //     console.log(response);
        //     return Users['user-guid'];
        // });
    }
};
module.exports = SlashCommandHandler;