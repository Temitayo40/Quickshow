const timeFormat = (minutes: string | number) => {
  const mins = typeof minutes === "string" ? parseInt(minutes, 10) : minutes;
  const hours = Math.floor(mins / 60);
  const minRemainder = mins % 60;
  return `${hours}h ${minRemainder}m`;
};

export default timeFormat;
