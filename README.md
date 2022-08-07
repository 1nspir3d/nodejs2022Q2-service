# Home Library Service

# RSSchool PostgreSQL & ORM task

## Installation
```bash
git clone https://github.com/1nspir3d/nodejs2022Q2-service
cd nodejs2022Q2-service
git checkout db-orm
```

Don't forget to change .env.example into .env

## Docker

Start Docker. Build images and start container in detached mode:

```
npm run docker
```

Scanning built images:

```
npm run docker:scan:db
```
or

```
npm run docker:scan:api
```

## Tests

Start tests in another terminal using commands:
- all test cases
```
npm run test
```
- or individual

```
npm run test -- <path to suite>
Example:
npm run test -- test/albums.e2e-spec.ts
```
