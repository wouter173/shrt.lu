export async function handleRequest(request: Request, headers: Record<string, string>): Promise<Response> {
  const url = new URL(request.url).searchParams.get('url');
  if (url == null) return new Response(JSON.stringify({ Error: 'No url defined!' }), { headers });

  const body = {
    dynamicLinkInfo: {
      domainUriPrefix: 'https://shrt.lu',
      link: url,
    },
    suffix: {
      option: 'SHORT',
    },
  };

  let res = await fetch(`https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${GOOGLE_API_KEY}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  let data = await res.json();
  if (data.error)
    return new Response(JSON.stringify({ Error: data.error.message.split('[https://f')[0].slice(0, -1) }), { headers });
  else return new Response(JSON.stringify({ link: data.shortLink }), { headers });
}
