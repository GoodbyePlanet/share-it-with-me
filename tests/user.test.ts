import {GraphQLClient} from "graphql-request";
import {AddressInfo} from "net";
import {App} from "../src/startServer";
import {login, users} from "./graphql";
import {cleanUsers, createUsers} from "./testData";

let getHost = (): string => "";
let graphQLClient: GraphQLClient;

beforeAll(async (): Promise<void> => {
  const app = await App();
  const {port} = app.address() as AddressInfo;
  getHost = () => `http://localhost:${port}/graphql`;
  await createUsers();
});

afterAll(async (): Promise<void> => {
  await cleanUsers();
});

beforeEach((): void => {
  graphQLClient = new GraphQLClient(getHost());
});

describe("User", (): void => {

  it("should be able to get all users if user is logged in and if it has role `ADMIN`",
    async (): Promise<void> => {
      const adminUserEmail = "perica@gmail.com";
      const userLoginMutationVariables = {
        user: {
          email: adminUserEmail,
          password: "password"
        }
      };
      const loginResponse = await graphQLClient.request(login, userLoginMutationVariables);

      graphQLClient.setHeader('authorization', 'Bearer ' + loginResponse.login.token);

      const usersQueryResult = await graphQLClient.request(users);
      expect(usersQueryResult).toHaveProperty("users");
    });

  it("should not be able to get all users if user is not logged in",
    async (): Promise<void> => {
      const usersQueryResult = async () => {
        await graphQLClient.request(users);
      };

      await expect(usersQueryResult).rejects.toThrow("Not Authorised!");
    });

  it("should not be able to get all users if user does not have role `ADMIN`",
    async (): Promise<void> => {
      const userEmail = "jovica@gmail.com";
      const userLoginMutationVariables = {
        user: {
          email: userEmail,
          password: "password"
        }
      };
      const loginResponse = await graphQLClient.request(login, userLoginMutationVariables);

      graphQLClient.setHeader('authorization', 'Bearer ' + loginResponse.login.token)

      const usersQueryResult = async () => {
        await graphQLClient.request(users)
      };
      await expect(usersQueryResult).rejects.toThrow("Not Authorised!");
    });
});