## Getting Started

```bash
# Install dependencies
$ yarn

# Create environment variable
$ copy .env.example .env

# Configure your db config on .env.local

# Setup firebaseCredential
- 'Get firebaseCredential on your firebase_console > project_settings > service_account > firebase_admin_sdk'
- Download firebaseCredential by click generate_new_private_key button
- Save that file on this root directory

# prepare datase
$ node ace migration:run
$ node ace db:seed

# Run the app
$ yarn dev
```