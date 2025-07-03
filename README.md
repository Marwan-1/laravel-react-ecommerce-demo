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
