import AWS from "aws-sdk"
const sqs = new AWS.SQS()

async function sendMail(event, context) {

  console.log(process.env.MAIL_QUEUE_URL)

  const data = JSON.parse(event.body)

  const { message: { nome, telefone, id } } = data

  if ((nome) && (telefone)) {

    try {
      await sqs.sendMessage({
        QueueUrl: process.env.MAIL_QUEUE_URL,
        MessageBody: event.body
      }).promise()

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: event.body,
      };
    } catch (error) {
      console.error(error)
    }
  } else {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ message: "todos os campos precisam ser completados" }),
    }
  }
}


export const handler = sendMail;


