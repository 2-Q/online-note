## Getting Started

```bash
# Install dependencies
$ yarn

# configure .env
$ copy .env.example .env

- Fill key value by your firebaseConfig.
- Setup your db name, password, etc.

# prepare datase
$ node ace migration:run
$ node ace db:seed

# Run the app
$ yarn dev
```