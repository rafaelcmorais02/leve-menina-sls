import AWS from "aws-sdk"
const ses = new AWS.SES({ region: "sa-east-1" })

async function sendMailQueue(event, context) {

    const record = event.Records[0]
    console.log(`Esse é o record ${record}`)

    const data = JSON.parse(record.body)

    const { message: { nome, telefone, title } } = data

    const body = `A pessoa ${nome} do telefone ${telefone} pediu o item de título: ${title}`

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

export const handler = sendMailQueue;


