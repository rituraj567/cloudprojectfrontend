import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_7wZXFq8CX",
  ClientId: "7cu8kdpragd3cnuaubsjr2kdk7",
  AutoVerifiedAttributes: ["email"],
};

export const UserPool = new CognitoUserPool(poolData);
