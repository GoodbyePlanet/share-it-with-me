import {request} from 'graphql-request';
import {posts as postsQuery} from './graphql';
import {AddressInfo} from "net";
import {App} from "../src/startServer";
import {createTestData} from "./testData";

let getHost = (): string => "";

beforeAll(async () => {
  const app = await App();
  const {port} = app.address() as AddressInfo;
  getHost = () => `http://localhost:${port}/graphql`;
  await createTestData();
});

describe("Posts", (): void => {

  it("should get all posts", async (): Promise<void> => {
    const queryResult = await request(getHost(), postsQuery);

    expect(queryResult).not.toBeNull();
    expect(queryResult).toHaveProperty("posts");
    expect(queryResult.posts.length).toBe(2);
  });
})