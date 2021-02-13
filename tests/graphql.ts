export const signUp = /* GraphQL */ `
  mutation signup($user: CreateUserInput!) {
    signup(user: $user) {
      token
      user {
        username
        email
        username
        role
      }
    }
  }
`

export const login = /* GraphQL */ `
  mutation login($user: LoginUserInput!) {
    login(user: $user) {
      token
      user {
        username
        email
        username
        role
      }
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

export const users = /* GraphQL */ `
  {
  users {
    id
    username
    email
  }
}
`