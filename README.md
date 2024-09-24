# TREND_SET eCOMMERCE WEB APPLICATION

### URL

<a href="https://trendsetdb.vercel.app/">https://trendsetdb.vercel.app/</a>

## Table of Contents

- [Features](#features)
- [Technologies](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Enveronmental Variables](#env)

## Features

- User authentication (login/register)
- User profile management
- Address management
- Seller functionality
- Product management

## Technologies

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Bcrypt.js for password hashing

## API Endpoints

The API is structured as follows:

- **Root:** `/api`

  - **Authentication:**

    - `POST /auth/register` - Register a new user
    - `POST /auth/login` - Login a user

  - **User:**

    - `GET /user` - Get user information
    - `PATCH /user/:id` - Update user profile
    - `GET /user/userInfo` - Get detailed user information

  - **Cart:**

    - `POST /cart` - Add a product to the cart
    - `GET /cart/:userId` - Get products in the cart for a specific user
    - `DELETE /cart/:userId/remove/:productId` - Remove a product from the cart

  - **Wishlist:**

    - `POST /wishlist` - Add a product to the wishlist
    - `GET /wishlist/:userId` - Get wishlist items for a specific user
    - `DELETE /wishlist/:userId/remove/:productId` - Remove a product from the wishlist

  - **Address:**

    - `POST /address` - Create a new address
    - `GET /address` - Get user addresses
    - `PATCH /address/:id` - Update a user address
    - `DELETE /address/:id` - Delete a user address

  - **Seller:**

    - `POST /seller` - Become a seller
    - `GET /seller` - Get seller information
    - `GET /seller/:id` - Get seller information by ID
    - `PATCH /seller/:id` - Update seller information
    - `DELETE /seller/:id` - Delete seller account

  - **Product:**
    - `POST /product` - Create a new product
    - `GET /product` - Get all products
    - `GET /product/:id` - Get products by store ID
    - `GET /product/category/:category` - Get products by category
    - `GET /product/single_product/:id` - Get product details by ID
    - `PATCH /product/:id` - Edit product details
    - `DELETE /product/:id` - Delete a product

## Getting Started

## Installation

- clone the repository:

`git clone https://github.com/RajuNiranjan/eCommerce_Express_backend`

`cd eCommerce_Express_backend`

- To Install the Dependencies

`npm install`

## Enveronmental Variables

- DB_URI = your mongodb uri
- JWT_SECRET_KEY = your_secret_key
- PORT = your_port_number
- ORIGIN = your_frontend_port
