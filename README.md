# Table Tennis E-commerce API

A RESTful API server for Table Tennis eCommerce built with Express.js and deployed on Vercel.

## Features

- Product management (CRUD operations)
- User authentication and authorization
- Order management
- JWT-based authentication
- Rate limiting and security middleware

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/search?q=query&category=category` - Search products
- `POST /api/products` - Create product (Admin only)
- `PATCH /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Users
- `POST /api/users/register` - Register user (Admin only)
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get current user details
- `GET /api/users` - Get all users (Admin only)

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders/checkout` - Create order

### Health Check
- `GET /health` - Health check endpoint
- `GET /` - Root endpoint

## Deployment on Vercel

This project is configured for Vercel serverless deployment. Important notes:

1. **File System Limitations**: Vercel serverless functions have a read-only filesystem. The database uses in-memory storage for production.

2. **Environment Variables**: Set the following environment variables in Vercel:
   - `JWT_SECRET`: Secret key for JWT tokens

3. **Database**: For production use, consider migrating to:
   - Vercel Postgres
   - Vercel KV (Redis)
   - External database service (MongoDB, PostgreSQL, etc.)

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. The API will be available at `http://localhost:3000`

## Default Users

- **Admin**: username: `admin`, password: `hashedpassword`
- **User**: username: `john_doe`, password: `hashedpassword`

## Security Features

- Helmet.js for security headers
- CORS enabled
- Rate limiting (100 requests per 15 minutes per IP)
- JWT authentication
- Password hashing with bcrypt

## Troubleshooting

If you encounter deployment issues:

1. Check Vercel function logs
2. Ensure all dependencies are in `package.json`
3. Verify environment variables are set
4. Test the `/health` endpoint first

## Production Considerations

- Replace in-memory database with a proper database
- Use environment variables for sensitive data
- Implement proper logging
- Add input validation
- Consider using a CDN for static assets 