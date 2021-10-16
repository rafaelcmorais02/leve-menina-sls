async function sendMail(event, context) {

  const data = JSON.parse(event.body)

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(data),
  };
}

export const handler = sendMail;


