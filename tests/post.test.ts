import {GraphQLClient} from 'graphql-request';
import {posts as postsQuery} from './graphql';
import {AddressInfo} from "net";
import {App} from "../src/startServer";
import {cleanTestData, createTestData} from "./testData";

let graphQLClient: GraphQLClient;
let getHost = (): string => "";

beforeAll(async () => {
  const app = await App();
  const {port} = app.address() as AddressInfo;
  getHost = () => `http://localhost:${port}/graphql`;
  await createTestData();
});

afterAll(async () => {
  await cleanTestData();
});

beforeEach((): void => {
  graphQLClient = new GraphQLClient(getHost());
});

describe("Posts", (): void => {

  it("should get all posts", async (): Promise<void> => {
    const postsQueryResult = await graphQLClient.request(postsQuery);

    expect(postsQueryResult).not.toBeNull();
    expect(postsQueryResult).toHaveProperty("posts");
    expect(postsQueryResult.posts.length).toBe(2);
  });
});