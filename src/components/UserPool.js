import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_BvTJeu7gI",
  ClientId: "7afm8jrjvivcqr5esq2l22hb3g",
  AutoVerifiedAttributes: ["email"],
};

export const UserPool = new CognitoUserPool(poolData);
