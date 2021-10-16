import AWS from "aws-sdk"
const ses = new AWS.SES({ region: "sa-east-1" })

async function sendMail(event, context) {

  const data = JSON.parse(event.body)

  const body = `A pessoa ${data.message.nome} do telefone ${data.message.telefone} pediu o item ${data.message.id}`
  const params = {
    Source: "rafaelcmorais02@gmail.com",
    Destination: {
      ToAddresses: ["emillie.sara1@hotmail.com"]
    },
    Message: {
      Body: {
        Text: {
          Data: body
        }

      },
      Subject: {
        Data: "Interesse de compra"
      },
    }
  }

  try {
    await ses.sendEmail(params).promise()
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    }
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error(error)
  }
}

export const handler = sendMail;


