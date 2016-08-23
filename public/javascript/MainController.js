var HttpClient = require('./HttpClient');
var TaskList = require('./TaskList');
var SlashCommandHandler = require('./SlashCommandHandler');

var APP_ID = '';
var APP_SECRET= '';
var Users = {};
var TOKEN = '123';

var SLASH_COMMAND = '/workingOn';
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


    handleSlashCommand: function (state) {
        var command = state.command;
        switch (state.command) {
            case SLASH_COMMAND:
                console.log('My type of slash command');
                SlashCommandHandler.handleGeneralText(state);
                break;
            
            default:
                console.log('some random command');
                break;

        }
    },
    handleAppInstall: function(state){

    },
    handleAppUnInstall: function(state){

    }

};

module.exports = Controller;