// import {GraphQLClient} from "graphql-request";
// import {AddressInfo} from "net";
// import {App} from "../src/startServer";
import {login, users} from "./graphql";
import {createTestContext, TestContext} from "./__helpers";
import {createUsers} from "./testData";

let context: TestContext;

beforeAll(async (): Promise<void> => {
  context = await createTestContext();
});

describe("User", (): void => {

  it("should be able to get all users if user is logged in and if it has role `ADMIN`",
    async (): Promise<void> => {
      await createUsers(context);
      const adminUserEmail = "jovica@gmail.com";
      const userLoginMutationVariables = {
        user: {
          email: adminUserEmail,
          password: "jovica"
        }
      };
      const loginResponse = await context.client.request(login, userLoginMutationVariables);
      console.log("LOGIN RESPONSE ", loginResponse);

      context.client.setHeader('authorization', 'Bearer ' + loginResponse.login.token);

      const usersQueryResult = await context.client.request(users);
      expect(usersQueryResult).toHaveProperty("users");
    });

  // it("should not be able to get all users if user is not logged in",
  //   async (): Promise<void> => {
  //     const usersQueryResult = async () => {
  //       await graphQLClient.request(users);
  //     };
  //
  //     await expect(usersQueryResult).rejects.toThrow("Not Authorised!");
  //   });

  // it("should not be able to get all users if user does not have role `ADMIN`",
  //   async (): Promise<void> => {
  //     const userEmail = "jovica@gmail.com";
  //     const userLoginMutationVariables = {
  //       user: {
  //         email: userEmail,
  //         password: "password"
  //       }
  //     };
  //     const loginResponse = await graphQLClient.request(login, userLoginMutationVariables);
  //
  //     graphQLClient.setHeader('authorization', 'Bearer ' + loginResponse.login.token)
  //
  //     const usersQueryResult = async () => {
  //       await graphQLClient.request(users)
  //     };
  //     await expect(usersQueryResult).rejects.toThrow("Not Authorised!");
  //   });
});