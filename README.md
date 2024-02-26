# Product Catalog Application Readme

## Overview

This repository contains the code for a Product Catalog application built using the MERN (MongoDB, Express.js, React, Node.js) stack. The application allows users to manage a catalog of products, including features like searching, sorting, editing, and deleting products.

## Features

### Frontend (React)

#### Components

1. **ProductCatalog Component**
   - Displays a table of products.
   - Supports searching products by name.
   - Provides sorting functionality for product attributes (Name, Description, Price, Currency).
   - Allows adding new products.
   - Supports editing and deleting existing products.

#### State Management

- Uses React `useState` and `useEffect` hooks for managing state.
- State variables include products, filteredProducts, openDeleteDialog, editStates, selectedProduct, searchTerm, showAddRow, and newProduct.

#### Data Fetching

- Utilizes the `fetchData` function to retrieve product data from the backend.
- Sends requests to the backend API for CRUD operations.

#### Sorting

- Implements sorting functionality for product attributes using the `handleSort` function.
- Displays sorting indicators (chevron icons) in the table headers.

#### Editing

- Allows editing of existing products with the `handleEditClick`, `handleSaveEdit`, and `handleCancelEdit` functions.

#### Deleting

- Supports deleting products with the `handleDeleteClick`, `handleDelete`, and `handleCancelDelete` functions.
- Displays a confirmation modal before deleting a product.

#### Searching

- Enables product search functionality with the `handleSearch` and `handleClearSearch` functions.

#### Adding New Products

- Allows adding new products with the `handleAddRow`, `handleSaveNewProduct`, and `handleCancelNewProduct` functions.
- Provides a row with input fields for adding a new product.

#### UI Components

- Uses Chakra UI components for styling and user interface elements.
- Includes icons from popular icon libraries (Font Awesome, React Icons).

### Backend (Express.js)

#### Controllers (productController)

1. **getProducts**
   - Retrieves products from the MongoDB database.
   - Supports sorting, filtering, and searching based on query parameters.

2. **addProduct**
   - Adds a new product to the database.

3. **updateProduct**
   - Updates an existing product in the database.

4. **deleteProduct**
   - Deletes a product from the database.

#### Models (ProductModel)

- Defines the MongoDB data model for products.

#### Routes

- Routes are defined to handle CRUD operations on products.

#### Error Handling

- Provides basic error handling for database operations.

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone <repository_url>
  Install Dependencies

2. **Navigate to the frontend directory**
   ```bash
   cd frontend
  
  npm install

4. **Navigate to the backend directory**
   ```bash
   cd backend
   npm install
  Set Up MongoDB

- Ensure you have a MongoDB server running.
- Update the MongoDB connection string in backend/config/db.config.js.
- Run the Application

4. **Start the frontend (from the frontend directory)**
   ```bash
   npm start

6. **Start the backend (from the backend directory)**
   ```bash
   npm start

8. **Access the Application**
- Open your browser and navigate to http://localhost:3000 to access the Product Catalog application.

## Dependencies
- Frontend: React, Chakra UI, React Icons
- Backend: Express.js, Mongoose (MongoDB ODM)

## Future Improvements
- Add user authentication for secure CRUD operations.
- Enhance error handling and validation.
- Implement pagination for large datasets.

Feel free to contribute to this project and make it even better!
