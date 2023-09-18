# Registering a User

Register a user as an app user.

- **Endpoint URL**: `{{baseURL}}/api/users/signup`
- **HTTP Method**: POST
- **Description**: This endpoint allows you to register a new user as an app user.
- **Request Body**: JSON format

### Request Body

```json
{
  "full_name": "Peter Tom",
  "mobile_number": "03059999999",
  "no_of_family_members": 8,
  "gender": "Male",
  "email": "pp1dddd@example.com",
  "date_of_birth": "2000-12-17T00:00:00.000Z",
  "password": "password"
}
```

- Success Response:
- **Status Code**: 200 OK

```json
{
  "success": true,
  "error": null,
  "body": {
    "newUser": {
      "is_verified": false,
      "id": 19,
      "full_name": "Peter Tom",
      "email": "yu@example.com",
      "gender": "Male",
      "mobile_number": "03159999999",
      "no_of_family_members": 8,
      "date_of_birth": "2000-12-17T00:00:00.000Z",
      "password": "$2b$10$3tYqEgv/ku3pclIJlQET.OdNR0KZeU6s317zd3aBODeuvkWEIDxDS",
      "updatedAt": "2023-09-18T05:36:35.162Z",
      "createdAt": "2023-09-18T05:36:35.162Z"
    },
    "token": "jwt"
  }
}
```

- Failure Response:
- **Status Code**: 400 Bad Request or 500 Server Error

```json
{
  "success": false,
  "error": "Validation error",
  "body": null
}
```

# User Login

Authenticate a user by logging in.

- **Endpoint URL**: `{{baseURL}}/api/users/login`
- **HTTP Method**: POST
- **Description**: This endpoint allows an existing user to log in to their account.
- **Request Body**: JSON format

### Request Body

```json
{
  "mobile_number": "03159999999",
  "password": "password"
}
```

- Success Response:
- **Status Code**: 200 OK

```json
{
  "success": true,
  "error": null,
  "body": {
    "newUser": {
      "is_verified": true,
      "id": 19,
      "full_name": "Peter Tom",
      "email": "yu@example.com",
      "gender": "Male",
      "mobile_number": "03159999999",
      "no_of_family_members": 8,
      "date_of_birth": "2000-12-17T00:00:00.000Z",
      "password": "$2b$10$3tYqEgv/ku3pclIJlQET.OdNR0KZeU6s317zd3aBODeuvkWEIDxDS",
      "updatedAt": "2023-09-18T05:36:35.162Z",
      "createdAt": "2023-09-18T05:36:35.162Z"
    },
    "token": "jwt"
  }
}
```

- Failure Response:
- **Status Code**: 401 Unauthorized or 403 Forbidden or 500 Server Error

```json
{
  "success": false,
  "error": "Not Verified",
  "body": null
}
```
