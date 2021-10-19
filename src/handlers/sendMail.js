import AWS from "aws-sdk"
const ses = new AWS.SES({ region: "sa-east-1" })

async function sendMail(event, context) {

  const data = JSON.parse(event.body)

  const { message: { nome, telefone, id } } = data

  if ((nome) && (telefone)) {

    const body = `A pessoa ${nome} do telefone ${telefone} pediu o item ${id}`

    const params = {
      Source: "levemenina27@gmail.com",
      Destination: {
        ToAddresses: ["levemenina27@gmail.com", "rafaelcmorais02@gmail.com"]
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
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(data),
      };
    } catch (error) {
      console.error(error)
    }
  }
  else {
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


