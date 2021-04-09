import {login, users} from "./graphql";
import {createTestContext} from "./testSetup/testContext";

const context = createTestContext(6000);

describe("User", (): void => {
  it("should be able to get all users if it is logged in and if it has role `ADMIN`",
    async (): Promise<void> => {
      await context.db.user.create({
        data: {
          id: "user-id-1",
          email: "jovica@gmail.com",
          username: "Jovica",
          password: "$2y$10$FrvIQ92.gA0rc9OjnZVkku8ZeRjP0duL86Pb.kVXsJejmwgdVNkG.",
          role: "ADMIN"
        }
      });

      const adminUserEmail = "jovica@gmail.com";
      const userLoginMutationVariables = {
        user: {
          email: adminUserEmail,
          password: "jovica"
        }
      };
      const loginResponse = await context.client.request(login, userLoginMutationVariables);

      context.client.setHeader('authorization', 'Bearer ' + loginResponse.login.token);

      const usersQueryResult = await context.client.request(users);
      expect(usersQueryResult).toHaveProperty("users");
    });

  it("should not be able to get all users if user not have role `ADMIN`",
    async (): Promise<void> => {
      const userEmail = "pero@gmail.com";

      await context.db.user.create({
        data: {
          id: "user-id-2",
          email: userEmail,
          username: "Pero",
          password: "$2y$10$bBTAQ16zOlAOks964dzPnufFu8yZ1jNX4NOeNdxJ8a.S2yy0hzW6G",
          role: "USER"
        }
      });
      const userLoginMutationVariables = {
        user: {
          email: userEmail,
          password: "pero"
        }
      };
      const loginResponse = await context.client.request(login, userLoginMutationVariables);

      context.client.setHeader('authorization', 'Bearer ' + loginResponse.login.token)

      const usersQueryResult = async () => {
        await context.client.request(users)
      };
      await expect(usersQueryResult).rejects.toThrow("Not Authorised!");
    });

  it("should not be able to get all users if it is not logged in",
    async (): Promise<void> => {
      const usersQueryResult = async () => {
        await context.client.request(users);
      };

      await expect(usersQueryResult).rejects.toThrow("Not Authorised!");
    });
});