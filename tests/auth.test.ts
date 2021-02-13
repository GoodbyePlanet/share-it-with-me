import {App} from "../src/startServer";
import request from "graphql-request";
import {AddressInfo} from "net";
import {login, signUp} from "./graphql";
import {CreateUserInput, LoginUserInput} from "../resolvers-example";
import {cleanTestData} from "./testData";

let getHost = (): string => "";

beforeAll(async () => {
  const app = await App();
  const {port} = app.address() as AddressInfo;
  getHost = () => `http://localhost:${port}/graphql`;
});

afterAll(async () => {
  await cleanTestData();
});

describe("Auth", (): void => {

  describe("SignUp", (): void => {
    const testUser = "TestUser";
    const testUserEmail = "testuser@gmail.com";

    const userSignUpMutationVariables = {
      user: {
        email: testUserEmail,
        username: testUser,
        password: "SuperCoolPassword"
      } as CreateUserInput
    };

    it("should create user", async (): Promise<void> => {
      const signUpResponse = await request(getHost(), signUp, userSignUpMutationVariables);

      expect(signUpResponse).toHaveProperty("signup");
      expect(signUpResponse.signup.user.username).toBe(testUser);
      expect(signUpResponse.signup.user.email).toBe(testUserEmail);
    });

    it("should return `Email already taken!` error when attempting to create user with email that is already taken",
      async (): Promise<void> => {
        const signUpResponse = async () => {
          await request(getHost(), signUp, userSignUpMutationVariables)
        };

        await expect(signUpResponse).rejects.toThrow("Email already taken!");
      });

    it("should return `Please use valid email` error if email is not valid", async (): Promise<void> => {
      const invalidMutationInput = {
        ...userSignUpMutationVariables,
        user: {
          ...userSignUpMutationVariables.user,
          email: "test@test"
        }
      }
      const signUpResponse = async () => {
        await request(getHost(), signUp, invalidMutationInput)
      };

      await expect(signUpResponse).rejects.toThrow("Please use valid email");
    });

    it("should return `Password has to be at least 6 characters long` error if password does not have valid length",
      async (): Promise<void> => {
        const invalidMutationInput = {
          ...userSignUpMutationVariables,
          user: {
            ...userSignUpMutationVariables.user,
            password: "Pass"
          }
        }
        const signUpResponse = async () => {
          await request(getHost(), signUp, invalidMutationInput)
        };

        await expect(signUpResponse).rejects.toThrow("Password has to be at least 6 characters long");
      });
  });

  describe("Login", (): void => {
    const testUserEmail = "testuser@gmail.com";
    const userLoginMutationVariables = {
      user: {
        email: testUserEmail,
        password: "SuperCoolPassword"
      } as LoginUserInput
    };

    it("should successfully login the user", async (): Promise<void> => {
      const loginResponse = await request(getHost(), login, userLoginMutationVariables);

      expect(loginResponse).toHaveProperty("login");
      expect(loginResponse.login.token).not.toBeNull();
      expect(loginResponse.login.user.email).toBe(testUserEmail);
    });

    it("should return `User not found!` error if user does not exists", async (): Promise<void> => {
      const wrongEmailUserLogin = {
        ...userLoginMutationVariables,
        user: {
          ...userLoginMutationVariables.user,
          email: "wrongemail@gmail.com"
        }
      };

      const loginResponse = async () => {
        await request(getHost(), login, wrongEmailUserLogin)
      };

      await expect(loginResponse).rejects.toThrow("User not found!");
    });

    it("should return `Provided credentials are invalid!` error if password is incorrect",
      async (): Promise<void> => {
        const wrongCredentialsUserLogin = {
          ...userLoginMutationVariables,
          user: {
            ...userLoginMutationVariables.user,
            password: "super cool password"
          },
        };

        const loginResponse = async () => {
          await request(getHost(), login, wrongCredentialsUserLogin)
        };

        await expect(loginResponse).rejects.toThrow("Provided credentials are invalid!");
      });
  });
});