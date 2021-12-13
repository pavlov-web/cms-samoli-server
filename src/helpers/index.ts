import slugify from 'slugify';

export const titleToSlug = (title: string): string => {
  return `${((Math.random() * Math.pow(36, 6)) | 0).toString(36)}-${slugify(
    title,
    { lower: true },
  )}`;
};
