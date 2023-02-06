import logo from '../assets/logo.jpeg';

export const defaultImg = logo;

/** api url */
export const serverUrl = 'http://localhost:3006';
/** file upload api */
export const uploadActionUrl = serverUrl + '/common/upload';

/**
 * Set the token in session storage.
 * @param {string} token - The token to store in session storage.
 */
export const setToken = (token: string) => sessionStorage.setItem('hdf-token', token);

/**
 * Get the token from session storage.
 * @param [key='hdf-token'] - The key for the token in session storage.
 * @returns The retrieved token, or null if the key doesn't exist.
 */
export const getToken = (key: string = 'hdf-token') => sessionStorage.getItem(key);

/**
 * image handler
 */
export const delImg = (img: string) => {
  if (img) {
    if (img.startsWith('http')) return img;
    return serverUrl + img;
  }
  return defaultImg;
};
