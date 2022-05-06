console.log(`
  ACCESS_TOKEN_SECRET:
  ${require('crypto').randomBytes(64).toString('hex')}

  REFRESH_TOKEN_SECRET:
  ${require('crypto').randomBytes(64).toString('hex')}
`)
