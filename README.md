# Full-Stack E-Commerce Platform - (Laravel & React)

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
  <img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="Material-UI">
</p>

## Introduction

This project is a complete, full-stack e-commerce system built as a skills demonstration. It features a robust **Laravel RESTful API** backend that handles products, orders, and authentication, paired with a dynamic and responsive **React.js** single-page application (SPA) for the user interface.

The application is designed with modern development practices, focusing on performance, security, and a clean, maintainable codebase. It showcases a wide range of full-stack capabilities, from database design and API development to sophisticated frontend state management and UI implementation.

---

## Getting Started

### **Option 1: Quick Run from Zipped Folder**

If you have received this project as a `.zip` file, follow these simple steps to get the application running immediately.

**Prerequisites:**
* PHP, Node.js, and a MySQL database server must be installed and running on your machine.

**Steps:**
1.  **Unzip the Project:** Unzip the provided folder to your desired location.

2.  **Set Up the Database:**
    * Open your MySQL client (like phpMyAdmin or TablePlus).
    * Enter the credentials for the mysql database in the provided `.env` file.

3.  **Prepare the Database:**
    Open a terminal inside the project folder and run the following command. This will create all the necessary tables and populate the database with sample products and the demo user account.
    ```bash
    php artisan migrate --seed
    ```

4.  **Run the Application:**
    You will need to open **two separate terminal windows** inside the project folder.
    
    * **In Terminal 1 (Backend):** Start the Laravel server.
        ```bash
        php artisan serve
        ```
    * **In Terminal 2 (Frontend):** Start the Vite server.
        ```bash
        npm run dev
        ```

5.  **View the Application:**
    Open your browser and navigate to `http://localhost:8000`.

---

### **Option 2: Full Installation from Git**

Follow these instructions to get the project up and running from a Git repository.

**Prerequisites:**
* PHP >= 8.2
* Composer
* Node.js & npm
* A local database server (e.g., MySQL)

**Steps:**
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Marwan-1/laravel-react-ecommerce-demo.git
    cd laravel-react-ecommerce-demo
    ```

2.  **Install Backend Dependencies:**
    ```bash
    composer install
    ```

3.  **Set Up Environment:**
    * Copy the example environment file.
        ```bash
        cp .env.example .env
        ```
    * Generate a unique application key.
        ```bash
        php artisan key:generate
        ```

4.  **Database Setup:**
    * Open the `.env` file and ensure your `DB_*` variables match your local database credentials.
    * Run the migrations and click `yes` when asked to create database `ecommerce_test`, then wait for seeding the database with sample data.
        ```bash
        php artisan migrate --seed
        ```

5.  **Create Storage Link:**
    This makes product images publicly accessible from the browser.
    ```bash
    php artisan storage:link
    ```

6.  **Install Frontend Dependencies:**
    ```bash
    npm install
    ```

7.  **Run the Development Servers:**
    * **Terminal 1 (Frontend):**
        ```bash
        npm run dev
        ```
    * **Terminal 2 (Backend):**
        ```bash
        php artisan serve
        ```

8.  **You're All Set!**
    Open your browser and navigate to `http://localhost:8000`.

---

## Demo Credentials

For your convenience, a demo user account has been created. The login page features an "Auto-fill" button to populate these credentials automatically.

-   **Email:** `marwan@dev.com`
-   **Password:** `123456`

---

## Key Features & Skills Demonstrated

### Backend (Laravel)
-   **RESTful API Design**: A clean, well-structured API for managing products and orders.
-   **Authentication**: Secure user authentication and protected routes using **Laravel Sanctum**.
-   **Database Management**: Efficient database schema design with Eloquent ORM and many-to-many relationships.
-   **Performance Optimization**: Implemented **caching** on the product listing endpoint to reduce database load and improve response times.
-   **Asynchronous Task Handling**: Utilized Laravel's **Events and Listeners** for post-order processing (e.g., sending notifications), ensuring a fast user experience.
-   **Advanced Validation**: Robust, custom validation rules using Form Requests to ensure data integrity and product availability.
-   **Database Seeding**: Pre-populated the database with realistic product data and a demo user account for easy testing.

### Frontend (React.js)
-   **Modern React**: Built entirely with functional components and extensive use of **React Hooks** (`useState`, `useEffect`, `useContext`).
-   **Component-Based Architecture**: A clean, organized, and reusable component structure.
-   **Global State Management**: Centralized state management for authentication and the shopping cart using the **Context API**.
-   **Responsive Design**: A fully responsive UI that adapts seamlessly from mobile to desktop, built with **Material-UI**.
-   **Client-Side Routing**: Smooth navigation handled by **React Router**.
-   **API Integration**: Efficient data fetching and state synchronization with the Laravel backend using **Axios**.
-   **Enhanced UX**: Features like debounced search, animated logos, and helpful UI cues (like the demo credentials box) to showcase attention to user experience.

---
# API Documentation

## Base URL
http://localhost:8000/api

## Authentication
This API uses **Laravel Sanctum** for token-based authentication. Include the Bearer token in the Authorization header for protected endpoints:
Authorization: Bearer {your-access-token}

---

## 🔓 Public Endpoints

### **User Registration**
POST /api/register

**Request Body:**
{
"name": "John Doe",
"email": "john@example.com",
"password": "password123",
"password_confirmation": "password123"
}

**Response (201):**
{
"access_token": "1|abc123...",
"token_type": "Bearer"
}

---

### **User Login**

POST /api/login

**Request Body:**

{
"email": "marwan@dev.com",
"password": "123456"
}

**Response (200):**

{
"access_token": "1|abc123...",
"token_type": "Bearer"
}


---

### **List Products**

GET /api/products

**Query Parameters:**
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `name` | string | Filter by product name (partial match) | `?name=shirt` |
| `category` | string | Filter by exact category | `?category=Electronics` |
| `min_price` | number | Minimum price filter | `?min_price=10` |
| `max_price` | number | Maximum price filter | `?max_price=100` |
| `page` | integer | Page number for pagination | `?page=2` |

**Example Request:**

GET /api/products?name=cotton&category=Clothing&min_price=20&max_price=50&page=1


**Response (200):**

{
"current_page": 1,
"data": [
{
"id": 1,
"name": "Cotton T-Shirt",
"description": "Comfortable cotton t-shirt for everyday wear",
"price": "25.99",
"stock": 45,
"category": "Clothing",
"image": "products/product1.jpg",
"created_at": "2025-01-01T00:00:00.000000Z",
"updated_at": "2025-01-01T00:00:00.000000Z"
}
],
"first_page_url": "http://localhost:8000/api/products?page=1",
"from": 1,
"last_page": 5,
"last_page_url": "http://localhost:8000/api/products?page=5",
"next_page_url": "http://localhost:8000/api/products?page=2",
"path": "http://localhost:8000/api/products",
"per_page": 10,
"prev_page_url": null,
"to": 10,
"total": 50
}


---

## 🔒 Protected Endpoints

### **Get Current User**

GET /api/user
Authorization: Bearer {token}

**Response (200):**

{
"id": 1,
"name": "Marwan Hassan",
"email": "marwan@dev.com",
"email_verified_at": null,
"created_at": "2025-01-01T00:00:00.000000Z",
"updated_at": "2025-01-01T00:00:00.000000Z"
}

---

### **Place Order**

POST /api/orders
Authorization: Bearer {token}

**Request Body:**

{
"products": [
{
"product_id": 1,
"quantity": 2
},
{
"product_id": 3,
"quantity": 1
}
]
}

**Response (201):**

{
"id": 15,
"user_id": 1,
"total_cost": "77.97",
"created_at": "2025-01-01T12:00:00.000000Z",
"updated_at": "2025-01-01T12:00:00.000000Z",
"products": [
{
"id": 1,
"name": "Cotton T-Shirt",
"description": "Comfortable cotton t-shirt",
"price": "25.99",
"stock": 43,
"category": "Clothing",
"pivot": {
"order_id": 15,
"product_id": 1,
"quantity": 2
}
}
]
}

---

### **Get Order Details**

GET /api/orders/{id}
Authorization: Bearer {token}

**Response (200):**
{
"id": 15,
"user_id": 1,
"total_cost": "77.97",
"created_at": "2025-01-01T12:00:00.000000Z",
"updated_at": "2025-01-01T12:00:00.000000Z",
"products": [
{
"id": 1,
"name": "Cotton T-Shirt",
"description": "Comfortable cotton t-shirt",
"price": "25.99",
"stock": 43,
"category": "Clothing",
"pivot": {
"order_id": 15,
"product_id": 1,
"quantity": 2
}
}
]
}
---

### **User Logout**
POST /api/logout
Authorization: Bearer {token}
**Response (200):**
{
"message": "Successfully logged out"
}
---

## 📊 API Features

### **Performance Optimizations**
- **Caching**: Product listings cached for 1 hour to reduce database load
- **Pagination**: All listings paginated (10 items per page)
- **Eager Loading**: Related models loaded efficiently to prevent N+1 queries
- **Query Optimization**: Filtered queries use database indexes

### **Security Features**
- **Laravel Sanctum**: Secure token-based authentication
- **Input Validation**: All inputs validated using Form Requests
- **Authorization Policies**: Users can only access their own orders
- **Stock Validation**: Real-time stock checking prevents overselling
- **SQL Injection Prevention**: Eloquent ORM prevents SQL injection

### **Business Logic**
- **Inventory Management**: Stock automatically decremented on order placement
- **Order Events**: `OrderPlaced` event triggers admin notifications
- **Transaction Safety**: Database transactions ensure data consistency
- **Cache Invalidation**: Product cache cleared when products are modified

---

## 🌐 Frontend Routes (React SPA)

All frontend routes are handled by React Router through Laravel's catch-all route:

Route::get('/{any}', function () {
return view('app');
})->where('any', '.*');

| Route | Component | Description | Auth Required |
|-------|-----------|-------------|---------------|
| `/` | `ProductsPage` | Browse products with search & filters | ❌ |
| `/login` | `LoginPage` | User authentication | ❌ |
| `/cart` | `CartPage` | Shopping cart management | ❌ |
| `/orders/{id}` | `OrderDetailsPage` | View order details | ✅ |

**Route Protection**: React Router guards redirect unauthenticated users to `/login` for protected routes.

---

## ⚠️ Error Responses

### **Validation Error (422)**
{
"message": "The given data was invalid.",
"errors": {
"email": ["The email field is required."],
"products.0.quantity": ["Only 5 units of Cotton T-Shirt are available."]
}
}

### **Unauthorized (401)**
{
"message": "Unauthenticated."
}
### **Forbidden (403)**
{
"message": "This action is unauthorized."
}
### **Not Found (404)**
{
"message": "No query results for model [App\Models\Order] 999"
}
### **Server Error (500)**
{
"message": "Server Error"
}


---

## 🔧 Development Notes

### **Database Schema**
- **Products Table**: `id`, `name`, `description`, `price`, `stock`, `category`, `image`
- **Orders Table**: `id`, `user_id`, `total_cost`, `created_at`, `updated_at`
- **Order_Product Pivot**: `order_id`, `product_id`, `quantity`

### **Key Relationships**
- **User** → **Orders**: One-to-Many
- **Orders** → **Products**: Many-to-Many (with quantity pivot)

### **Event System**
- **OrderPlaced Event**: Triggered when order is successfully created
- **SendAdminOrderNotification Listener**: Logs order information (email integration ready)

### **Caching Strategy**
- **Cache Key**: `products.index.{query_params}`
- **Cache Duration**: 1 hour (3600 seconds)
- **Cache Invalidation**: Automatic via ProductObserver on model changes

---

## 📝 API Testing

### **Using cURL**
Register user
curl -X POST http://localhost:8000/api/register
-H "Content-Type: application/json"
-d '{"name":"Test User","email":"test@example.com","password":"password123","password_confirmation":"password123"}'

Login and get token
curl -X POST http://localhost:8000/api/login
-H "Content-Type: application/json"
-d '{"email":"marwan@dev.com","password":"123456"}'

Get products
curl -X GET "http://localhost:8000/api/products?name=shirt&page=1"

Place order (replace {token} with actual token)
curl -X POST http://localhost:8000/api/orders
-H "Authorization: Bearer {token}"
-H "Content-Type: application/json"
-d '{"products":[{"product_id":1,"quantity":2}]}'
### **Using Postman**
1. Import the collection from `/postman/` directory
2. Set base URL to `http://localhost:8000/api`
3. Configure Bearer token authentication
4. Test all endpoints with provided examples

This comprehensive API documentation provides everything needed for developers to understand, integrate with, and test your e-commerce platform's backend services.

---
## API Endpoint Documentation

| Method | Endpoint             | Description                                   | Protected |
| :----- | :------------------- | :-------------------------------------------- | :-------- |
| `POST` | `/api/register`      | Register a new user.                          | No        |
| `POST` | `/api/login`         | Authenticate a user and receive a token.      | No        |
| `GET`  | `/api/products`      | List all products with filtering & pagination. | No        |
| `POST` | `/api/orders`        | Place a new order.                            | **Yes** |
| `GET`  | `/api/orders/{order}`| View details of a specific order.             | **Yes** |
| `POST` | `/api/logout`        | Log the current user out.                     | **Yes** |
| `POST` | `/api/products`      | (Admin) Create a new product with an image.   | **Yes** |

---

## Time Tracking

-   **Estimated Time:** 40 Hours
-   **Actual Time Taken:** 12 Hours

---

## Author & Contact

This project was developed by **Marwan**.

-   **GitHub:** [Marwan-1](https://github.com/Marwan-1)
-   **LinkedIn:** [marwan-h-shaker](https://linkedin.com/in/marwan-h-shaker)
-   **Email:** [marwan.hassan.shaker@gmail.com](mailto:marwan.hassan.shaker@gmail.com)
