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

# Get User Profile

Get a user's profile

- **Endpoint URL**: `{{baseURL}}/api/users/profile`
- **HTTP Method**: GET
- **Description**: Get the profile details of a user.
- **Request Body**: none
- **Bearer Token**: required

* Success Response:
* **Status Code**: 200 OK

```json
{
  "success": true,
  "error": null,
  "body": {
    "user": {
      "id": 4,
      "full_name": "Mohammed Ali",
      "email": "mali@example.com",
      "date_of_birth": "2000-12-17T00:00:00.000Z",
      "gender": "Male",
      "mobile_number": "03059999111",
      "no_of_family_members": 4,
      "is_verified": true,
      "profile_image": "public url to profile image",
      "createdAt": "2023-09-14T05:11:30.000Z",
      "updatedAt": "2023-09-23T14:13:49.000Z"
    }
  }
}
```

- Failure Response:
- **Status Code**: 500 Server Error

```json
{
  "success": false,
  "error": "Error Message",
  "body": null
}
```

# Set User Profile Picture

Set or update a user's profile image

- **Endpoint URL**: `{{baseURL}}/api/users/profileImage`
- **HTTP Method**: PATCH
- **Description**: Set user's profile image
- **Request Body**: form-data
- **Bearer Token**: required

### Request Body

```form-data
{
  "profileImage": imageFile
}
```

- Success Response:
- **Status Code**: 200 OK

```json
{
  "success": true,
  "error": null,
  "body": {
    "updatedUserImage": "public url to the image"
  }
}
```

- Failure Response:
- **Status Code**: 500 Server Error

```json
{
  "success": false,
  "error": "Error Message",
  "body": null
}
```

# Update User Profile

Update user's profile

- **Endpoint URL**: `{{baseURL}}/api/users/profile`
- **HTTP Method**: PATCH
- **Description**: Update details about user
- **Request Body**: JSON
- **Bearer Token**: required

### Request Body

```json
{
  "full_name": "User Full Name"
}
```

- Success Response:
- **Status Code**: 200 OK

```json
{
  "success": true,
  "error": null,
  "body": {
    "updatedUser": {
      "id": 4,
      "full_name": "Mohammed Ali",
      "email": "mali@example.com",
      "date_of_birth": "2000-12-17T00:00:00.000Z",
      "gender": "Male",
      "mobile_number": "03059999111",
      "no_of_family_members": 4,
      "is_verified": true,
      "profile_image": "public url to profile image",
      "createdAt": "2023-09-14T05:11:30.000Z",
      "updatedAt": "2023-09-23T14:13:49.000Z"
    }
  }
}
```

- Failure Response:
- **Status Code**: 500 Server Error

```json
{
  "success": false,
  "error": "Error Message",
  "body": null
}
```

# Get User Favorites

Get a user's favorite products

- **Endpoint URL**: `{{baseURL}}/api/users/favorites`
- **HTTP Method**: GET
- **Description**: Get the products which the user has selected as favorites
- **Request Body**: none
- **Bearer Token**: required

* Success Response:
* **Status Code**: 200 OK

```json
{
  "success": true,
  "error": null,
  "body": {
    "userFavorites": [
      {
        "id": 3,
        "createdAt": "2023-09-23T14:20:27.000Z",
        "updatedAt": "2023-09-23T14:20:27.000Z",
        "user_id": 4,
        "product_id": 4,
        "product": {
          "id": 4,
          "name": "water bottle",
          "image": null,
          "unit_price": "6.99",
          "volume": "1.000",
          "is_coupon": false
        }
      },
      {
        "id": 4,
        "createdAt": "2023-09-23T14:26:16.000Z",
        "updatedAt": "2023-09-23T14:26:16.000Z",
        "user_id": 4,
        "product_id": 5,
        "product": {
          "id": 5,
          "name": "water can",
          "image": null,
          "unit_price": "13.99",
          "volume": "19.000",
          "is_coupon": false
        }
      }
    ]
  }
}
```

- Failure Response:
- **Status Code**: 500 Server Error

```json
{
  "success": false,
  "error": "Error Message",
  "body": null
}
```

# Add to Favorites

Add an item to Favorites

- **Endpoint URL**: `{{baseURL}}/api/users/favorites/:productId`
- **HTTP Method**: POST
- **Description**: Add a product selected by the user as favorites
- **Request Body**: none
- **Bearer Token**: required

* Success Response:
* **Status Code**: 200 OK

```json
{
  "success": true,
  "error": null,
  "body": {
    "favoriteItem": {
      "id": 5,
      "user_id": 4,
      "product_id": "9",
      "updatedAt": "2023-09-23T16:35:03.008Z",
      "createdAt": "2023-09-23T16:35:03.008Z"
    },
    "isNewEntry": true
  }
}
```

- Failure Response:
- **Status Code**: 500 Server Error

```json
{
  "success": false,
  "error": "Error Message",
  "body": null
}
```

# Remove from Favorites

Remove an item from Favorites

- **Endpoint URL**: `{{baseURL}}/api/users/favorites/:productId`
- **HTTP Method**: DELETE
- **Description**: Remove a product from user's favorites
- **Request Body**: none
- **Bearer Token**: required

* Success Response:
* **Status Code**: 200 OK

```json
{
  "success": true,
  "error": null,
  "body": {
    "message": "Product removed from favorites"
  }
}
```

- Failure Response:
- **Status Code**: 500 Server Error

```json
{
  "success": false,
  "error": "Error Message",
  "body": null
}
```
