export default (url) => {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl) return true;
  } catch (error) {
    return false;
  }
};