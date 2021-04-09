import {login, signUp} from "./graphql";
import {TestContext} from "./testSetup/testContext";
import {graphqlTestContext} from "./testSetup/graphqlTestContext";
import {prismaTestContext} from "./testSetup/prismaTestContext";

const graphqlContext = graphqlTestContext(6002);
const prismaContext = prismaTestContext();

let context = {} as TestContext;

beforeAll(async (): Promise<void> => {
  const client = await graphqlContext.before();
  const db = await prismaContext.before();

  Object.assign(context, {
    client,
    db,
  });
});

afterAll(async (): Promise<void> => {
  await graphqlContext.after();
  await prismaContext.after();
});

describe("Auth", (): void => {
  const testUser = "TestUser";
  const testUserEmail = "testuser@gmail.com";

  const userSignUpMutationVariables = {
    user: {
      email: testUserEmail,
      username: testUser,
      password: "SuperCoolPassword"
    }
  };

  it("should create user on sign up", async (): Promise<void> => {
    const signUpResponse = await context.client.request(signUp, userSignUpMutationVariables);

    expect(signUpResponse).toHaveProperty("signup");
    expect(signUpResponse.signup.user.username).toBe(testUser);
    expect(signUpResponse.signup.user.email).toBe(testUserEmail);
  });

  it("should return `Email already taken!` error when attempting to create user with email that is already taken",
    async (): Promise<void> => {
      const signUpResponse = async () => {
        await context.client.request(signUp, userSignUpMutationVariables)
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
      await context.client.request(signUp, invalidMutationInput)
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
        await context.client.request(signUp, invalidMutationInput)
      };

      await expect(signUpResponse).rejects.toThrow("Password has to be at least 6 characters long");
    });

  const userLoginMutationVariables = {
    user: {
      email: testUserEmail,
      password: "SuperCoolPassword"
    }
  };

  it("should successfully login the user", async (): Promise<void> => {
    const loginResponse = await context.client.request(login, userLoginMutationVariables);

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
      await context.client.request(login, wrongEmailUserLogin)
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
        await context.client.request(login, wrongCredentialsUserLogin)
      };

      await expect(loginResponse).rejects.toThrow("Provided credentials are invalid!");
    });
});
