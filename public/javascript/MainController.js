var HttpClient = require('./HttpClient');
var TaskList = require('./TaskList');
var Authorize = require('./Authorize');
var SlashCommandHandler = require('./SlashCommandHandler');
var User = require('./User');

Users = {};
var TOKEN = '123';

var SLASH_COMMAND = 'workingAt';
var Controller = {
    initMockData: function () {
        var taskList = new TaskList();
        taskList.addToList('Hello world ', 'my-user-userId');
        taskList.addToList('Foo bar ', 'my-user-userId');
        var data = {
            userId: 'this-is-some-userId',
            taskId: 'currently-working-on-taskId',
            startTime: 'start Date',
            endTime: 'end date',
            data: taskList
        };
        Users['user-guid'] = data;
    },
    init: function () {
        // set up app Key and token here
    },
    initUser: function (state) {
        console.log('state ---- ', state);
        Users[state.userId] = new User(state);
        console.log(User[state.userId]);
    },


    handleSlashCommand: function (state) {
        var command = state.command;
        if(!Users[state.userId]){
            this.initUser(state);
        }
        switch (state.command) {
            case SLASH_COMMAND:
                SlashCommandHandler.handleGeneralText(state);
                break;
            
            default:
                console.log('some random command');
                break;

        }
    },
    handleAppInstall: function(state){
        Authorize.saveUserInfo(state);

    },
    handleAppUnInstall: function(state){

    }

};

module.exports = Controller;