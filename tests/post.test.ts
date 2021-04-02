import {posts as postsQuery} from './graphql';
import {createTestContext, TestContext} from "./__helpers";
import {createPosts} from "./testData";

let context: TestContext;

beforeAll(async (): Promise<void> => {
  context = await createTestContext();
});

describe("Posts", (): void => {

  it("should get all posts", async (): Promise<void> => {
    await createPosts(context);
    const postsQueryResult = await context.client.request(postsQuery);

    expect(postsQueryResult).toHaveProperty("posts");
    expect(postsQueryResult.posts.length).toBe(2);
  });
});