## Getting Started

```bash
# Install dependencies
$ yarn

# configure .env
$ copy .env.example .env

- Fill key value by your firebaseConfig.
- Setup your db name, password, etc.

# prepare datase
$ yarn db migrate:up
$ yarn db seed:run

# Run the app
$ yarn dev
```