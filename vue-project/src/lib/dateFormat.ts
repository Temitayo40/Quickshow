export const dateFormat = (date: string) => {
  return new Date(date).toLocaleString("en-us", {
    weekday: "short",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
