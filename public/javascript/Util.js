function timeAgo(timeInSeconds){
    console.log('in time ago', timeInSeconds);
    timeInSeconds = parseInt(timeInSeconds);

    if(timeInSeconds< 60){
        return timeInSeconds+ " seconds";
    }
    if( timeInSeconds < 3600){
        var min = parseInt(timeInSeconds / 60);
        if (min === 1) return  min + " min";
        return min + " min";
    }
    if(timeInSeconds >= 3600 ){
        var hours = parseInt(timeInSeconds / 3600);
        if(hours === 1) return hours + " hr";
        return hours + " hrs";
    }

}

var Util = {
  convertTime: function(time){
      var time = timeAgo(time/1000);
      console.log('time '+ time);
      return time;
  }
};
module.exports = Util;