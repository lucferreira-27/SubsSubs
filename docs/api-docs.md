# Subtitle Manager API Documentation

## Overview

This API provides endpoints for managing subtitles and dialogs, including creating, retrieving, updating, and deleting entries, as well as searching and filtering capabilities.

## Base URL

`http://localhost:3000/api/v1`

## Endpoints

### Subtitles

#### Get All Subtitles

Retrieves a list of all subtitle entries with pagination, sorting, and filtering options.

- **URL:** `/subtitles`
- **Method:** GET
- **Query Parameters:**
  - `page` (optional): Page number for pagination (default: 1)
  - `limit` (optional): Number of items per page (default: 10)
  - `sort` (optional): Field to sort by (default: 'episode')
  - `order` (optional): Sort order, 'asc' or 'desc' (default: 'asc')
  - `episode` (optional): Filter by episode number
  - `season` (optional): Filter by season number
  - `showName` (optional): Filter by show name
  - `language` (optional): Filter by language
  - `filler` (optional): Filter by filler status (true/false)
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "metadata": {
        "totalResults": 100,
        "currentPage": 1,
        "totalPages": 10,
        "hasNextPage": true,
        "hasPrevPage": false,
        "nextPage": "/subtitles?page=2&limit=10&sort=episode&order=asc",
        "prevPage": null
      },
      "results": [
        {
          "_id": "60a1b2c3d4e5f6g7h8i9j0k1",
          "episode": 1,
          "season": 1,
          "showName": "Example Show",
          "language": "en",
          "filler": false,
          "filename": "S01E01.srt",
          "dialogCount": 150
        },
        // ... more subtitle objects
      ]
    }
    ```
- **Error Response:**
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while fetching subtitles" }`

#### Create Subtitle

Creates a new subtitle entry.

- **URL:** `/subtitles`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "episode": 1,
    "season": 1,
    "showName": "Example Show",
    "language": "en",
    "filler": false,
    "filename": "S01E01.srt"
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:** Created subtitle object
- **Error Response:**
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while creating the subtitle" }`

#### Get Subtitle with Dialogs

Retrieves a specific subtitle entry with its associated dialogs.

- **URL:** `/subtitles/:id`
- **Method:** GET
- **URL Parameters:**
  - `id`: Subtitle ID
- **Success Response:**
  - **Code:** 200
  - **Content:** Subtitle object with dialogs array
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "message": "Subtitle not found" }`
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while fetching the subtitle with dialogs" }`

#### Update Subtitle

Updates an existing subtitle entry.

- **URL:** `/subtitles/:id`
- **Method:** PUT
- **URL Parameters:**
  - `id`: Subtitle ID
- **Request Body:**
  ```json
  {
    "episode": 2,
    "season": 1,
    "showName": "Updated Show Name",
    "language": "es",
    "filler": true,
    "filename": "S01E02.srt"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:** Updated subtitle object
- **Error Response:**
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while updating the subtitle" }`

#### Delete Subtitle

Deletes a specific subtitle entry.

- **URL:** `/subtitles/:id`
- **Method:** DELETE
- **URL Parameters:**
  - `id`: Subtitle ID
- **Success Response:**
  - **Code:** 200
  - **Content:** Deletion confirmation
- **Error Response:**
  - **Code:** 500
  - **Content:** `{ "error": "An error occurred while deleting the subtitle" }`

### Dialogs

#### Get All Dialogs

Retrieves a list of all dialog entries with pagination.

- **URL:** `/dialogs`
- **Method:** GET
- **Query Parameters:**
  - `page` (optional): Page number for pagination (default: 1)
  - `limit` (optional): Number of items per page (default: 10)
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of dialog objects
- **Error Response:**
  - **Code:** 500
  - **Content:** `{ "error": "Error message" }`

#### Create Dialog

Creates a new dialog entry.

- **URL:** `/dialogs`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "subtitleId": "60a1b2c3d4e5f6g7h8i9j0k1",
    "startTime": "00:00:01,000",
    "endTime": "00:00:04,000",
    "text": "Hello, world!"
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:** Created dialog object
- **Error Response:**
  - **Code:** 500
  - **Content:** `{ "error": "Error message" }`

#### Update Dialog

Updates an existing dialog entry.

- **URL:** `/dialogs/:id`
- **Method:** PUT
- **URL Parameters:**
  - `id`: Dialog ID
- **Request Body:**
  ```json
  {
    "startTime": "00:00:02,000",
    "endTime": "00:00:05,000",
    "text": "Updated dialog text"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:** Updated dialog object
- **Error Response:**
  - **Code:** 500
  - **Content:** `{ "error": "Error message" }`

#### Delete Dialog

Deletes a specific dialog entry.

- **URL:** `/dialogs/:id`
- **Method:** DELETE
- **URL Parameters:**
  - `id`: Dialog ID
- **Success Response:**
  - **Code:** 200
  - **Content:** Deletion confirmation
- **Error Response:**
  - **Code:** 500
  - **Content:** `{ "error": "Error message" }`

#### Search Dialogs

Searches for dialogs based on a text query.

- **URL:** `/dialogs/search`
- **Method:** GET
- **Query Parameters:**
  - `query`: Search text
  - `page` (optional): Page number for pagination (default: 1)
  - `limit` (optional): Number of items per page (default: 10)
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "metadata": {
        "totalResults": 50,
        "currentPage": 1,
        "totalPages": 5,
        "hasNextPage": true,
        "hasPrevPage": false,
        "nextPage": "/dialogs/search?query=example&page=2&limit=10",
        "prevPage": null
      },
      "results": [
        {
          "_id": "60a1b2c3d4e5f6g7h8i9j0k1",
          "episode": 1,
          "filename": "S01E01.srt",
          "dialogs": [
            {
              "_id": "70a1b2c3d4e5f6g7h8i9j0k1",
              "text": "Example dialog text",
              "startTime": "00:00:01,000",
              "endTime": "00:00:04,000"
            },
            // ... more matching dialogs
          ],
          "matchCount": 3
        },
        // ... more subtitle objects with matching dialogs
      ]
    }
    ```
- **Error Response:**
  - **Code:** 500
  - **Content:** `{ "error": "Error message" }`

## Error Handling

All endpoints may return the following error responses:

- **Code:** 500
  - **Content:** `{ "error": "Error message" }`
  - **Description:** Unexpected server error

## Pagination

Most list endpoints support pagination using the `page` and `limit` query parameters. The response includes metadata about the current page, total results, and links to the next and previous pages when applicable.

## Sorting

The subtitles endpoint supports sorting using the `sort` and `order` query parameters. Available sort options include 'episode', 'season', 'showName', 'language', and 'filename'.

## Filtering

The subtitles endpoint supports filtering using query parameters for 'episode', 'season', 'showName', 'language', and 'filler'.

## Authentication

Currently, this API does not require authentication. However, it's recommended to implement proper authentication and authorization mechanisms for production use.