const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.createOrdersFunction = async (event) => {
    try {
        console.log(event);
        const body = JSON.parse(event.body)
        const item = {
            id: body.id,
            name: body.name,
            address: body.address,
            phone: body.phone,
            description: body.description,
            createdAt: new Date().toISOString(),
        };

        await dynamo.put({
            TableName: process.env.ORDERS_TABLE,
            Item: item,
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'ok',
                dataCreated: item,
            }),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: e.message,
                dataCreated: null,
            }),
        };
    }
}
