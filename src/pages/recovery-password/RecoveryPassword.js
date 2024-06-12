export const RecoveryPassword = (token) => {
  if (!token) {
    return `
        <h1>Token Page</h1>
        <p>No token provided.</p>
    `
  }

  return `
    <h1>Token Page</h1>
    <p>The provided token is: ${token}</p>
`
}
