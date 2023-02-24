export const formatTime = date => {
  const parsedDate = new Date(date);
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const currentTime = new Date();
  const timeDiff = currentTime - parsedDate;

  if (timeDiff < msPerMinute) {
    return 'now';
  } else if (timeDiff < msPerHour) {
    const minutes = Math.round(timeDiff / msPerMinute);
    return `${minutes} ${minutes === 1 ? 'min' : 'mins'} ago`;
  } else if (timeDiff < msPerDay) {
    const hours = Math.round(timeDiff / msPerHour);
    return `${hours} ${hours === 1 ? 'hr' : 'hrs'} ago`;
  } else {
    const days = Math.round(timeDiff / msPerDay);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }
};
