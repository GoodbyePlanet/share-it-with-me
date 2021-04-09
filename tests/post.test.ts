import {posts as postsQuery} from './graphql';
import {createTestContext} from "./testSetup/testContext";

const context = createTestContext(6001);

describe("Posts", (): void => {

  it("should get all posts", async (): Promise<void> => {
    await context.db.post.create({
      data: {
        id: "post-id-1",
        title: "NodeJS in Action",
        content: "Some awesome content...",
        tags: {
          set: ["NodeJS"]
        },
        author: {
          create:
            {
              email: "postemail@gmail.com",
              password: "password",
              username: "PostUsername"
            }
        }
      }
    });
    const postsQueryResult = await context.client.request(postsQuery);

    expect(postsQueryResult).toHaveProperty("posts");
    expect(postsQueryResult.posts.length).toBe(1);
  });
});