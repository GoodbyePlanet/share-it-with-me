export const signup = /* GraphQL */ `
  mutation signup($user: { $email: String!, $username: String!, $password: String! }) {
    signup(user: $user) {
     token
      user {
        id
        username
        email
        role
        createdAt
      }
    }
  }
`

export const login = /* GraphQL */ `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export const posts = /* GraphQL */ `
  {
  posts {
    id
    title
    content
  }
}
`