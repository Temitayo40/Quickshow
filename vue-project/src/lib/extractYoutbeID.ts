export const extractYouTubeId = (url: string) => {
  const regExp = /^.*(?:youtu\.be\/|v\/|embed\/|watch\?v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length === 11 ? match[1] : null;
};
