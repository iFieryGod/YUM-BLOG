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
  }
}