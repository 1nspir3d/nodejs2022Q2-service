# Home Library Service

# RSSchool Containerization task

## Installation
```
git clone https://github.com/1nspir3d/nodejs2022Q2-service
cd nodejs2022Q2-service
git checkout docker
```

Don't forget to change .env.example into .env

## Docker

Build images and start container in detached mode:

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
