export function timeSince(date:Date) {
    //@ts-ignore
    var seconds = Math.floor((new Date() - date) / 1000) * -1;
    
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }

export  function countDecimals(value) {
    let count = 0;
    while (value % 1 !== 0) {
        value *= 10;
        count++;
    }
    return count;
}