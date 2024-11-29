# Occasions API Documentation

This document provides details about all available API endpoints in the Occasions application.

## Admin APIs

### Authentication

#### Register Admin
- **Endpoint**: `/api/admin/auth/register`
- **Method**: POST
- **Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

#### Admin Login
- **Endpoint**: `/api/admin/auth/login`
- **Method**: POST
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### Check Admin Auth
- **Endpoint**: `/api/admin/auth/check`
- **Method**: GET

### Categories

#### Add Category
- **Endpoint**: `/api/admin/category/add`
- **Method**: POST
- **Body**:
  ```json
  {
    "CategoryName": "string",
    "CategoryImage": "string (base64)",
    "Description": "string"
  }
  ```

#### Fetch Categories
- **Endpoint**: `/api/admin/category/fetch`
- **Method**: GET

#### Delete Category
- **Endpoint**: `/api/admin/category/[id]`
- **Method**: DELETE

### Packages

#### Add Package
- **Endpoint**: `/api/admin/package/add`
- **Method**: POST
- **Body**:
  ```json
  {
    "PackageName": "string",
    "CategoryId": "string",
    "Description": "string",
    "PackageImage": "string (base64)",
    "Price": "number",
    "PackageReview": "string",
    "Policy": [{ "point": "string" }],
    "NeedToKnow": [{ "name": "string" }]
  }
  ```

#### Fetch Packages
- **Endpoint**: `/api/admin/package/fetch`
- **Method**: GET

#### Delete Package
- **Endpoint**: `/api/admin/package/[id]`
- **Method**: DELETE

### Inclusions

#### Add Inclusion
- **Endpoint**: `/api/inclusions`
- **Method**: POST
- **Body**:
  ```json
  {
    "packageId": "string",
    "points": [
      {
        "IconName": "string (optional)",
        "Point": "string"
      }
    ]
  }
  ```

#### Fetch Inclusions
- **Endpoint**: `/api/inclusions`
- **Method**: GET

## User APIs

### Authentication

#### Register User
- **Endpoint**: `/api/user/auth/register`
- **Method**: POST
- **Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

#### User Login
- **Endpoint**: `/api/user/auth/login`
- **Method**: POST
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### Fetch Users
- **Endpoint**: `/api/user/fetch`
- **Method**: GET

## Response Format

All APIs follow a consistent response format:

### Success Response
```json
{
  "message": "Success message",
  "data": {} // Optional data object
}
```

### Error Response
```json
{
  "error": "Error message"
}
```

## Authentication

Most admin routes require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer [token]
```

## Notes

- All image uploads should be in base64 format
- Dates are returned in ISO format
- IDs are MongoDB ObjectIds
- All requests should use JSON content type