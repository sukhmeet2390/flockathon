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
            case 'done':
                this.handleMarkAsDone(state, subText);
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
    _sendHtmlMessage: function (userId,bodyHTML, height) {
        console.log('Sending html msg', bodyHTML);
        var body= {
            id: "03240904"+Math.random()*1000,
            title: "Title",
            description: "Something",
            appId: "5b657a91-6860-49ad-9fa1-b6ba89a26e16",
            message: {
                to: botToken,
                text: "Here is your TASKS summary",
                attachments: [{
                    views: {
                        html: {
                            inline: bodyHTML,
                            height : height
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
        var tasklist = user.data.getList();
        if(tasklist.length==0){
            this._sendTextMessage(state.userId,"No task listed use command add to insert a task");
        }
        else{
            console.log("showing rich list");
            var html="<table>";
            html+="<style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%; font-size: small}td, th {border: 1px solid #dddddd;text-align: left;padding: 2px;} tr:nth-child(even) {background-color: #dddddd;} </style>"
            html+="<tr> <th>TaskID</th> <th>Description</th> <th>Time Worked</th> <th>Done</th> <th>Current Task</th></tr>";
            tasklist.forEach(function (task) {
                var time = Util.convertTime(task.timeWorked);
                var done = task.completed?"Yes":"No";
                var currentTask = task.currentlyWorkingOn?"Yes":"No";
                html+= "<tr> <td>"+task.taskId+"</td> <td>"+task.description+"</td> <td>"+time+"</td> <td>"+done+"</td> <td>"+currentTask+"</td></tr>";
            });
            html+="</table>";
            var height = tasklist.length*20+40;
            this._sendHtmlMessage(state.userId,html, height);
        }
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
            newTask.currentlyWorkingOn=true;
            this._sendTextMessage(state.userId,"You are now working on task -"+newTask.description);
        }
        else{
            this._sendTextMessage(state.userId,"Unable to find the task.Use `list` to get list of all the tasks");
        }
    },
    handleStop: function (state) {
        var user = Users[state.userId];
        if(!this._stopAndLogCurrentTask(user)){
            this._sendTextMessage(state.userId,"Currently not working on any task. Use `list` to get all tasks");
        }
        else{
            this._sendTextMessage(state.userId,"All tasked currently stopped");
        }
    },
    handleWhat: function(state){
        var user = Users[state.userId];
        if(!user.taskId){
            this._sendTextMessage(state.userId,"Not working on any task right now. Use `start` to start working on new task");
        }
        else{
            var task = user.data.getTask(user.taskId);
            this._sendTextMessage(state.userId,"Currently working on task- "+task.taskId+"  "+task.description);
        }
    },
    handleHelp: function (state) {
        var text = "/workingAt help - List of commands \n"+
                "/workingAt list - List of tasks currently working on \n"+
                "/workingAt start - Start working on current task \n"+
                "/workingAt stop - End current Task allocation \n"+
                "/workingAt done - Mark current task as completed \n"+
                "/workingAt what - List the current task \n";

        this._sendTextMessage(state.userId, text);
    },
    handleAdd: function (state, text) {
        var user = Users[state.userId];
        var task = user.data.addToList({
            description:text,
            userId: state.userId
        });
        this._sendTextMessage(state.userId,"You have added a new task, with task id "+task.taskId+" with description "+task.description);
    },
    handleMarkAsDone: function(state, subText){
        var user =  Users[state.userId];
        var task = user.data.getTask(subText);
        if(!task) this._sendTextMessage("Unable to find task. Type list for all the tasks.");
        task.completed = true;
        if (user.taskId) {
            this._stopAndLogCurrentTask(user);
        }

        user.taskId = null;
        this._sendTextMessage(state.userId,"Yay! Task completed "+task.taskId + " - " +task.description);


    }
};
module.exports = SlashCommandHandler;