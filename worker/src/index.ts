import { handleRequest } from './handler';

const allowedOrigins = ['https://shrt.lu'];
ENVIRONMENT === 'development' ? allowedOrigins.push('http://localhost:3000') : '';

addEventListener('fetch', (event) => {
  let origin = event.request.headers.get('origin') || '';
  if (origin && !allowedOrigins.includes(origin)) origin = '';

  const headers = {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': origin,
  };

  event.respondWith(handleRequest(event.request, headers));
});
