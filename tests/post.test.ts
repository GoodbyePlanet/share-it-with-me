import {GraphQLClient} from 'graphql-request';
import {posts as postsQuery} from './graphql';
import {AddressInfo} from "net";
import {App} from "../src/startServer";
import {cleanPosts, createPosts} from "./testData";

let graphQLClient: GraphQLClient;
let getHost = (): string => "";

beforeAll(async () => {
  const app = await App();
  const {port} = app.address() as AddressInfo;
  getHost = () => `http://localhost:${port}/graphql`;
  await createPosts();
});

afterAll(async () => {
  await cleanPosts();
});

beforeEach((): void => {
  graphQLClient = new GraphQLClient(getHost());
});

describe.skip("Posts", (): void => {

  it("should get all posts", async (): Promise<void> => {
    const postsQueryResult = await graphQLClient.request(postsQuery);

    expect(postsQueryResult).not.toBeNull();
    expect(postsQueryResult).toHaveProperty("posts");
    expect(postsQueryResult.posts.length).toBe(2);
  });
});