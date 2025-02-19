# Problem 5: Crude Server

I create a simple server that can create, read, update, and delete resources. I use Prisma as an ORM and SQLite as a database. I also use Swagger for API documentation.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Generate Prisma client:

   ```bash
   npx prisma generate
   ```

3. Migrate the database:

   ```bash
   npx prisma migrate dev
   ```

4. Run the server:

   ```bash
   npm run dev
   ```

## Endpoints

- `POST /resources`: Create a new resource.
- `GET /resources`: List all resources. (I add filter for status)
- `GET /resources/:id`: Get a resource by ID.
- `PUT /resources/:id`: Update a resource by ID.
- `DELETE /resources/:id`: Delete a resource by ID.

## API Documentation

Access the API documentation at `http://localhost:3000/docs` after starting the server.
