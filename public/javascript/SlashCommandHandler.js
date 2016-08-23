var SlashCommandHandler = {
    handleGeneralText: function (state) {
        var text = state.text;
        var handler = text.split(' ')[0];
        var subText = text.split(' ')[1];
        switch (handler) {
            case 'help':
                this.handleHelp();
                break;

            case 'list':
                this.handleList();
                break;

            case 'start':
                this.handleStart();
                break;

            case 'stop':
                this.handleStop();
                break;

            case 'what':
                this.handleWhat();
                break;

            default:
                break;

        }
    },
    handleList: function (state) {
        var data =  Users[state.userId];

    },
    handleStart: function () {

    },
    handleStop: function () {

    },
    handleWhat: function(){

    },
    handleHelp: function () {
        this.initMockData();
        var url = 'http://mockbin.com/request';
        var body = {"parameter": 23, "foo": "bar"};
        console.log('handling help');
        return HttpClient.doPost(TOKEN, url, body).then(function (response) {
            console.log(response);
            return Users['user-guid'];
        });
    },
    handleList: function (props) {
        var guid = props.guid;

    }

}
module.exports = SlashCommandHandler;