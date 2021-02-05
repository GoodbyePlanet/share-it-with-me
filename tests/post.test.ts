import {request} from 'graphql-request';
import {posts as postsQuery} from './graphql';
import {AddressInfo} from "net";
import {App} from "../src/startServer";

let getHost = (): string => "";

beforeAll(async () => {
  const app = await App();
  const {port} = app.address() as AddressInfo;
  getHost = () => `http://localhost:${port}/graphql`;
});

describe("posts", () => {

  it("should get all posts", async () => {
    const posts = await request(getHost(), postsQuery);

    expect(posts).not.toBeNull();
  });
})

// test('successfully create a user', async () => {
//   // try {
//   // const user = {
//   //   email: 'u1@gmail.com',
//   //   username: 'Test user 1',
//   //   password: 'Password',
//   // }
//   console.log("HOST ", getHost());
//
//   const data = await request(getHost(), posts);
//   // const data = await request("http://localhost:8000/graphql", posts)
//   // expect(data).toEqual({signup: true});
//
//   console.log("DATA FROM TEST ", data);
//   // expect(data).toHaveProperty('signup')
//   // expect(data.signup.user.name).toEqual(user.name)
//   // } catch (e) {
//   //   console.log('error', e)
//   // }
// })

// test('successfully get token on login', async () => {
//   const credentials = {
//     email: 'u1@g.com',
//     password: 'user 1',
//   }
//   const data: any = await request(config.url, login, credentials)
//
//   expect(data).toHaveProperty('login')
//   expect(data.login.accessToken).toBeDefined()
// })