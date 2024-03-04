# (Backend) Project PB

## Requirements
- [Node 20.11.0](https://nodejs.org/en)
- [Docker](https://docs.docker.com/)

## Development
For installation use the command:

```bash
npm install
```

This project have a `docker-compose.yml` file tha build the server and database using the command:

```bash
docker compose up --build
```

### Database
This project use [Prisma](https://www.prisma.io/) as the ORM. All migrations and schemas are in the `prisma` folder. To apply them in the development environment use command:

```bash
npx prisma migrate dev
```