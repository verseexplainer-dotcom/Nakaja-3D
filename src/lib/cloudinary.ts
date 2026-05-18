const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
export const buildCloudinaryUrl = (path: string, transformations = 'f_auto,q_auto') => { if (!cloudName || !path) return path; return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${path.replace(/^\/+/, '')}`; };
