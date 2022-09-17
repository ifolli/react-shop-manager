export const timeSince = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 86400;
    if (interval >= 2) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval >= 2) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval >= 2) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }