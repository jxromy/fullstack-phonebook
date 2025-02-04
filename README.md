# Phonebook App

This is a phonebook application built as part of the [Full Stack Open](https://fullstackopen.com/) course, specifically Chapter 3. The application allows users to store, retrieve, update, and delete contact information.

## Features
- RESTful API for managing contacts
- CRUD operations for phonebook entries
- Express.js for backend
- MongoDB for database
- Middleware for error handling and logging

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv
- morgan (for logging)
- cors
- nodemon (for development)

## Setup and Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/phonebook-app.git
   cd phonebook-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up the environment variables:
   - Create a `.env` file in the root directory and add the following:
     ```env
     PORT=3001
     MONGODB_URI=your_mongodb_connection_string
     ```

4. Start the server:
   ```sh
   npm start
   ```
   Or in development mode:
   ```sh
   npm run dev
   ```

5. The API will be running at `http://localhost:3001`.

## API Endpoints

### Phonebook
- `GET /api/persons` - Get all contacts
- `POST /api/persons` - Add a new contact
- `GET /api/persons/:id` - Get a specific contact
- `PUT /api/persons/:id` - Update a contact
- `DELETE /api/persons/:id` - Delete a contact

## Testing
Run tests using:
```sh
npm test
```

## Author
Created by Jeromy (https://github.com/jxromy) as part of the Full Stack Open course.

## License
This project is licensed under the MIT License.

