export const abstractText = (start: string, end: string, content: string) => {
  return content.split(start)[1].split(end)[0].trim();
};
