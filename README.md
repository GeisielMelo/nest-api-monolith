# Nest Api Monolith

A robust, modular backend API built with [NestJS](https://nestjs.com/) for managing users, authentication, and likes. Designed for scalability, security, and easy integration with frontend clients.

## Features

- **User Management:** Register, update, and delete users with secure password handling.
- **Authentication:** JWT-based authentication with access and refresh tokens, secure cookie handling, and token refresh endpoint.
- **Likes System:** Authenticated users can create, update, and remove "likes" for various entities.
- **Modular Architecture:** Clean separation of concerns using NestJS modules for Auth, Users, and Likes.
- **TypeORM & MySQL:** Flexible repository pattern supporting both in-memory and MySQL storage.
- **Validation & Error Handling:** Global validation pipes and exception filters for consistent API responses.
- **CORS & Environment Config:** Secure CORS setup and environment-based configuration.

## API Overview

All endpoints are prefixed with `/api/v1`.

### Auth

- `POST /api/v1/auth/sign-in` — User login (returns tokens in cookies)
- `POST /api/v1/auth/sign-up` — User registration
- `POST /api/v1/auth/refresh` — Refresh access token using refresh token

### Users

- `PUT /api/v1/users/:id` — Update user (requires authentication)
- `DELETE /api/v1/users/:id` — Delete user (requires authentication)

### Likes

- `POST /api/v1/likes/:id` — Create a like (requires authentication)
- `GET /api/v1/likes/:id` — Get all likes for a user (requires authentication)
- `PUT /api/v1/likes/:id` — Update a like (requires authentication)
- `DELETE /api/v1/likes/:id` — Remove a like (requires authentication)

## Getting Started


- Node.js 18+
- MySQL database (or use in-memory for development)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file with the following (example):

```
TYPEORM_TYPE=mysql
TYPEORM_HOST=localhost
TYPEORM_PORT=3306
TYPEORM_USERNAME=root
TYPEORM_PASSWORD=yourpassword
TYPEORM_DATABASE=tmdb_catalogue
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
APP_CLIENT_URL=http://localhost:3010
NODE_ENV=development
```

### Running the Server

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000/api/v1`.

## Project Structure

- `src/modules/auth` — Authentication logic and endpoints
- `src/modules/users` — User management
- `src/modules/likes` — Likes system
- `src/common` — Shared guards, filters, and constants
- `src/config` — Configuration files

## License

- [MIT](https://choosealicense.com/licenses/mit/)