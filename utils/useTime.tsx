export function convertTime(timestamp: string): string {
  const date: Date = new Date(timestamp);
  const today: Date = new Date();

  if (
    date.getUTCFullYear() === today.getUTCFullYear() &&
    date.getUTCMonth() === today.getUTCMonth() &&
    date.getUTCDate() === today.getUTCDate()
  ) {
    const diff: number = Math.floor(
      (today.getTime() - date.getTime()) / (1000 * 60),
    );

    const days: number = Math.floor(diff / (24 * 60));
    const hours: number = Math.floor((diff % (24 * 60)) / 60);
    const minutes: number = diff % 60;

    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hrs ${minutes} mins ago`;
    } else {
      return `${minutes} mins ago`;
    }
  } else {
    return timestamp;
  }
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
