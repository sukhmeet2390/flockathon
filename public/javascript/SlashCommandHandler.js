var url="https://api.flock-staging.co/v1/chat.sendMessage";
var botToken = "u:14hqdwaw9bhkw44d";
var HttpClient = require('./HttpClient');
var Authorize = require('./Authorize');
var Util = require('./Util');

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
            case 'add':
                this.handleAdd(state,subText);
                break;
            default:
                break;

        }
    },
    _sendTextMessage: function (userId,msg) {
        console.log('Sending msg', msg);
        var body= {
            message:{
                to: botToken,
                text: msg
            }
        };
        HttpClient.doPost(Authorize.getUserToken(userId),url,body);
    },
    _sendHtmlMessage: function (userId,body) {
        console.log('Sending html msg', body);
        var body= {
            id: "03240904"+Math.random()*1000,
            title: "Title",
            description: "Something",
            appId: "5b657a91-6860-49ad-9fa1-b6ba89a26e16",
            message: {
                to: botToken,
                text: "msg",
                attachments: [{
                    views: {
                        html: {
                            inline: "<div>test</div>"
                        }
                    }
                }]
            }
        };
        HttpClient.doPost(Authorize.getUserToken(userId),url,body);
    },
    _stopAndLogCurrentTask: function(user) {
        console.log('stoping and logging current task ' ,user);
        if (user.taskId) {
            var task = user.data.getTask(user.taskId);
            user.endTime = new Date().getTime();
            task.timeWorked += user.endTime - user.startTime;
            user.taskId = null;
            task.currentlyWorkingOn=false;
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
                var time = Util.convertTime(task.timeWorked);
                outText+="TaskID: "+task.taskId+",Description: "+task.description+",Time Worked: "+time;
                if(task.completed){
                    outText+="(DONE)";
                }
                if(task.currentlyWorkingOn){
                    outText+="(currentlyTask)";
                }
                outText+="\n";
            });
        }
        this._sendHtmlMessage(state.userId,outText);
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
            user.startTime= new Date().getTime();
            user.startTime= new Date();
            newTask.currentlyWorkingOn=true;
            this._sendTextMessage(state.userId,"Current Task: "+newTask.description);
        }
        else{
            this._sendTextMessage(state.userId,"Incorrect TaskId");
        }
    },
    handleStop: function (state) {
        var user = Users[state.userId];
        if(!this._stopAndLogCurrentTask(user)){
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
        var text = "/workingAt help - List of commands"+
                "/workingAt list - List of tasks currently working on"+
                "/workingAt start - Start working on current task"+
                "/workingAt stop - End current Task allocation"+
                "/workingAt what - List the current task";

        this._sendTextMessage(state.userId, text);
    },
    handleAdd: function (state, text) {se
        var user = Users[state.userId];
        var task = user.data.addToList({
            description:text,
            userId: state.userId
        });
        this._sendTextMessage(state.userId,"Task created TaskID: "+task.taskId+", Task Description: "+task.description);
    }
};
module.exports = SlashCommandHandler;