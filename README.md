<p align="center">
  <a href="https://github.com/yokoso-capstone/yokoso">
    <img src="https://user-images.githubusercontent.com/20251243/110607315-120f5800-8159-11eb-9df2-8a074944b681.png?raw=true" alt="Yōkoso logo" width="256" />
  </a>
</p>
<h3 align="center">ようこそ</h3>
<h1 align="center">Discover your new home</h1>

<br>

## Wiki

For more information about the project click [here](https://github.com/yokoso-capstone/yokoso/wiki/Y%C5%8Dkoso-Overview#general)

## Getting Started

Clone this repo and run `npm install` while in the repo root directory to install project dependencies.

The following commands are available:

```bash
# start a development server:
npm run dev

# create a production build (defaults to staging environment):
npm run build

# create a production build for staging environment:
npm run build:staging

# create a production build for production environment:
npm run build:production

# start a production server:
npm run start

# typecheck TypeScript
npm run typecheck

# format with Prettier
npm run format

# check formatting with Prettier
npm run format:check

# check for issues with ESLint
npm run lint

# fix linting issues with ESLint
npm run lint-fix

# run Firestore security rules unit tests
npm run test:unit:firestore
```

Note that Firestore security rules unit tests must be ran with the Firebase emulator installed and running for Firestore.
One quick way is to run `npx -y firebase-tools emulators:exec --only firestore "npm run test:unit:firestore"` which will install the emulator (if not already installed) and run the tests.
See the [Firebase documentation](https://firebase.google.com/docs/firestore/security/test-rules-emulator) for more details.

## Preview

Yōkoso is deployed to separate production and staging environments, based off the `main` and `develop` branches respectively.

Production:
- https://d1qhziiies987t.cloudfront.net/

Staging:
- https://d2l3ad90rail6x.cloudfront.net/
