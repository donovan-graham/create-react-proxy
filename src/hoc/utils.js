import querystring from 'querystring';

export const generateFetchCacheKey = (service) => {
  const { method, uri, qs } = service;
  if (qs) {
    return `${method || 'GET'}__${uri}?${querystring.encode(qs)}`;
  }
  return `${method || 'GET'}__${uri}`;
};
