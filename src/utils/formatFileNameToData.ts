export const formatFileNameToData = (dateString: string) => {
  const removedExtensionDateText = dateString.replace('.md', '');
  const formatedFileNameToData = removedExtensionDateText.split('_').join('/');

  return formatedFileNameToData;
};
