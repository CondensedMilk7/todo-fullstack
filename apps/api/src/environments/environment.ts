export const environment = {
  production: false,
  randomBytesSize: 8,
  saltDivider: '.',
  cookieSessionKey: 'jdI52fjvdKE2ojoP',
  jwt: {
    secret: 'averylogphrasebiggerthanthirtytwochars',
    expiresIn: '1d',
  },
};

// Putting secret keys in environment files that are accessable within repository is bad practice.
// env files should be used that are ignored by git. Since it is just an example app, we don't mind it.
