# API Documentation

## Authentication Routes

### Register User

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Body:**

{
"name": "string",
"email": "string",
"password": "string"
}

- **Response:** Returns user data and token

### Login User

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Body:**

{
"email": "string",
"password": "string"
}

- **Response:** Returns user data and authentication token

## User Routes

### Get User Profile

- **URL:** `/api/users/profile`
- **Method:** `GET`
- **Headers:** Authorization Bearer Token required
- **Response:** Returns user profile data

### Update User Profile

- **URL:** `/api/users/profile`
- **Method:** `PUT`
- **Headers:** Authorization Bearer Token required
- **Body:**

{
"name": "string",
"email": "string",
"password": "string"
}

- **Response:** Returns updated user data

## Product Routes

### Get All Products

- **URL:** `/api/products`
- **Method:** `GET`
- **Response:** Returns array of products

### Get Single Product

- **URL:** `/api/products/:id`
- **Method:** `GET`
- **Response:** Returns single product details

### Create Product (Admin)

- **URL:** `/api/products`
- **Method:** `POST`
- **Headers:** Authorization Bearer Token required (Admin only)
- **Body:**

{
"name": "string",
"price": "number",
"description": "string",
"image": "string",
"category": "string",
"countInStock": "number"
}

- **Response:** Returns created product

### Update Product (Admin)

- **URL:** `/api/products/:id`
- **Method:** `PUT`
- **Headers:** Authorization Bearer Token required (Admin only)
- **Body:** Same as Create Product
- **Response:** Returns updated product

### Delete Product (Admin)

- **URL:** `/api/products/:id`
- **Method:** `DELETE`
- **Headers:** Authorization Bearer Token required (Admin only)
- **Response:** Returns success message

## Cart Routes

### Get Cart Items

- **URL:** `/api/cart`
- **Method:** `GET`
- **Headers:** Authorization Bearer Token required
- **Response:** Returns cart items

### Add to Cart

- **URL:** `/api/cart`
- **Method:** `POST`
- **Headers:** Authorization Bearer Token required
- **Body:**

{
"productId": "string",
"quantity": "number"
}

- **Response:** Returns updated cart

### Update Cart Item

- **URL:** `/api/cart/:productId`
- **Method:** `PUT`
- **Headers:** Authorization Bearer Token required
- **Body:**

{
"quantity": "number"
}

- **Response:** Returns updated cart

### Remove from Cart

- **URL:** `/api/cart/:productId`
- **Method:** `DELETE`
- **Headers:** Authorization Bearer Token required
- **Response:** Returns updated cart

## Error Responses

All endpoints may return the following error responses:

- **400:** Bad Request - Invalid input data
- **401:** Unauthorized - Invalid or missing token
- **403:** Forbidden - Not enough permissions
- **404:** Not Found - Resource not found
- **500:** Internal Server Error

## Authentication

- All protected routes require a Bearer token in the Authorization header
- Token is obtained from login/register response
- Format: `Authorization: Bearer <token>`
