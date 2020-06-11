const moment = require('moment');
// Making sure that if the posts that users enter are too long, the words are truncated.
module.exports = {
  truncate: function(str, len){
    if (str.length > len && str.length > 0) {
      var new_str = str + " ";
      new_str = str.substring(0, len);
      new_str = str.substring(0, new_str.lastIndexOf(" "));
      new_str = (new_str.length > 0) ? new_str : str.substring(0, len);
      return new_str + '...';
    }
    return str;
  },
  realTime: function(str){
   let momentFormat = moment(str);
   return dateComponent = momentFormat.utc().format("MMM Do YY");
  },
  realDate: function (str){
    let momentFormat = new Date(str);
    // momentFormat = utc.setHours( utc.getHours() + 2)
    momentFormat = moment(momentFormat)
    timeComponent = momentFormat.utc().format("MMMM Do YYYY, h:mm:ss a");
    return newTime = moment([timeComponent], "MMMM Do YYYY, h:mm:ss a").fromNow()
  }
} 