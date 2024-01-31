export function convertTime(timestamp: string): string {
  const date: Date = new Date(timestamp);
  const today: Date = new Date();

  const diff: number = Math.floor(
    (today.getTime() - date.getTime()) / (1000 * 60),
  );

  const days: number = Math.floor(diff / (24 * 60));
  const hours: number = Math.floor((diff % (24 * 60)) / 60);
  const mins: number = diff % 60;

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  else if (hours > 0) return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  else return `${mins} min${mins > 1 ? "s" : ""} ago`;
}

export function getGreeting(): string {
  const hours = new Date().getHours();
  if (hours >= 4 && hours < 12) {
    return "Good Morning!";
  } else if (hours >= 12 && hours < 17) {
    return "Good Afternoon!";
  } else if (hours >= 17 && hours < 20) {
    return "Good Evening!";
  } else {
    return "Good Night!";
  }
}

export function formatTime(time: number): string {
  const sec = Math.round(time);
  var mins = Math.floor(sec / 60) || 0;
  var secs = sec - mins * 60 || 0;

  return mins + ":" + (secs < 10 ? "0" : "") + secs;
}
