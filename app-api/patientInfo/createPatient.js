import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "patients",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      patientId: uuid.v1(),
      patientName: data.name,
      patientAge: data.age,
      patientPlace: data.place,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
