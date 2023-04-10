import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_DnWzjEsb4",
  ClientId: "2d7g1npljtq4b4ioi44j3p6o6o",
  AutoVerifiedAttributes: ["email"],
};

export const UserPool = new CognitoUserPool(poolData);
