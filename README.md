# Open Music API
The Open Music API is an API that allows the user to do the following things:
- Add song to Open Music
- get all songs in Open Music
- Get detail of a song in Open Music
- Change the data of a song in Open Music
- Delete a song in Open Music
- Register him/herself as a user in Open Music
- Login as an authenticated user in Open Music
- Logout from Open Music
- Add a playlist to Open Music
- View all owned and collaborated playlist in Open Music
- Delete an owned playlist in Open Music
- Add a song to owned or collaborated playlist in Open Music
- View all songs in an owned or collaborated playlist in Open Music
- Delete a song in an owned or collaborated playlist in Open Music
- Add colloborator to owned playlist in Open Music
- Delete a colloborator from owned playlist in Open Music
- Export all songs in a owned or collaborated playlist in Open Music and have it send to the email.
- Upload a picture to Open Music  

Notes:  
- The Open Music API uses postgresql as it's database and it has also implemented authentication and authorization to some of it's routes such as the playlist (It uses token based authentication using JWT).
- It uses JOI for data validation for the request body to ensure that the user inputted the correct data in the request.
- It also implemented server-side caching with redis for the route getting all songs in a playlist and getting all owned or collaborated playlists.
- As for the feature of exporting songs in a playlist and have it send to the email is done by another application that is communicated with using message broker with rabbitMQ.
- This project is made in order to pass Dicoding's Fundamental BackEnd Development Course.

## Live Demo
https://jordy-open-music-api.herokuapp.com/
  
Note:  
This is just the base url for the api deployed at heroku. As for the front end application, it will be developed in the future.

## SETUP
### Installation
    git clone https://github.com/jordyf15/Open-Music-API_Dicoding-Fundamental-BackEnd-Development-Project.git
    npm install
    npm run migrate up

### Scripts
- To start on development environment using nodemon: `npm run start`
- To do migration for database: `npm run migrate <migrate command>`
- To do linting using eslint: `npm run lint`

### Environment Variables
These variables need to be prepared in a `.env` file in the root folder.
- PGDATABASE: Name of the database in your postgres.
- PGUSER: Name of the user for the database in your  postgres.
- PGPASSWORD: Password for the user used to access the database in your postgres.
- PGHOST: The host for the postgres.
- PGPORT: The port for the postgres database.
- PORT: The port of the server.
- HOST: The host of the server.
- ACCESS_TOKEN_KEY: The key that will be used to make the access token for authentication in Open Music
- REFRESH_TOKEN_KEY: The key that will be used to make the refresh token to refresh expired access token in Open Music.
- ACCESS_TOKEN_AGE: The age of access token before they expired in seconds.
- RABBITMQ_SERVER: The host server of rabbitmq.
- REDIS_HOST: The host server of redis.
- REDIS_PORT: The port for redis server.
- REDIS_PASSWORD: The password for redis server.

## Information about the course
There are 3 submission in the course that have their own requirements which have already been fulfilled by the Open Music API.  

### 1st Submission
There are 7 features that is required to be in the API in the first submission and have already been fulfilled. Thus the Open Music API have the following features: 

#### API can save songs
##### Request
The client can save a song in the API through the route:
- Method: `POST`
- URL: `/songs`
- Body Request: 
        {
            "title": string,
            "year": number,
            "performer": string,
            "genre": string,
            "duration": number
        }

##### Respond
If the song is saved successfully the API will respond like the following:
- Status Code: 201
- Response Body:
        {
            "status": "success",
            "message": "Lagu berhasil ditambahkan",
            "data": {
                "songId": "song-Qbax5Oy7L8WKf74l"
            }
        }

#### API can display all songs
##### Request
The client can get all saved song in the API through the route:
- Method: `GET`
- URL: `/songs`

##### Respond
If the songs is retrieved successfully, then the API will respond like the following:
- Status Code: 200
- Response Body:
        {
            "status": "success",
            "data": {
                "songs": [
                    {
                        "id": "song-Qbax5Oy7L8WKf74l",
                        "title": "Kenangan Mantan",
                        "performer": "Dicoding"
                    },
                    {
                        "id": "song-poax5Oy7L8WKllqw",
                        "title": "Kau Terindah",
                        "performer": "Dicoding"
                    },
                    {
                        "id": "song-Qalokam7L8WKf74l",
                        "title": "Tulus Padamu",
                        "performer": "Dicoding"
                    }
                ]
            }
        }

If there is no songs yet, then the API will respond like the following:
        {
            "status": "success",
            "data": {
                "songs": []
            }
        }

#### API can display details of a song
##### Request
The client can get the details of a song from the route:
- Method: `GET`
- URL: `/songs/{songId}`

##### Respond
If the song with the id that is in the request parameter is found, then the API will respond like the following:
- Status Code: 200
- Response Body:
        {
            "status": "success",
            "data": {
                "song": {
                    "id": "song-Qbax5Oy7L8WKf74l",
                    "title": "Kenangan Mantan",
                    "year": 2021,
                    "performer": "Dicoding",
                    "genre": "Indie",
                    "duration": 120,
                    "insertedAt": "2021-03-05T06:14:28.930Z",
                    "updatedAt": "2021-03-05T06:14:30.718Z"
                }
            }
        }

#### API can change/update data of a song
##### Request
The client can change a data of a song based on its id through the following route:
- Method: `PUT`
- URL: `/songs/{songId}`
- Body Request: 
        {
            "title": string,
            "year": number,
            "performer": string,
            "genre": string,
            "duration": number
        }

##### Respond
If the update data of the song is successful, then the API will respond like the following:
- Status Code: 200
- Response Body:
        {
            "status": "success",
            "message": "lagu berhasil diperbarui"
        }

#### The API can delete a song
##### Request
The client can delete a song based on it's id through the following route:
- Method: `DELETE`
- URL: `/songs/{songId}`

##### Respond
If the deletion is successful, then the API will respond like the following:
- Status Code: 200
- Response Body: 
        {
            "status": "success",
            "message": "lagu berhasil dihapus"
        }

#### Data Validation
The API has also impemented data validation for request payload using JOI for the following routes
- POST /songs
    - title: string, required.
    - year: number, required.
    - performer: string, required.
    - genre: string.
    - duration: number.
- PUT /songs
    - title: string, required.
    - year: number, required.
    - performer: string, required.
    - genre: string.
    - duration: number.

#### Error Handling
The API will handles error accordingly like the following:
- When there is a failed validation data process for the request payload. The API will respond like the following:
    - Status Code: 400 (Bad Request)
    - Response Body:
            {
                status: "fail",
                message: "message related to the cause of the error"
            }
- When the client accessed a resource that is not found. The API will respond like the following:
    - Status Code: 404 (Not Found)
    - Response Body:
            {
                status: "fail",
                message: "message related to the cause of the error"
            }
- When a server error happens, then the API will respond like the following:
    - Status Code: 500 (Internal Server Error)
    - Response Body: 
            {
                status: "error",
                message: "message related to the cause of the error"
            }

#### Used Database to save the data
The API uses postgresql as a database to keep all the datas.





### 2nd Submission
There are 13 features that is required to be in the API in the second submission and have already been fulfilled. Thus the Open Music API have the following features: 

#### The API have User Registration Feature
##### Request:
The client can register themselves as user in Open Music, through the following route:
- Method: `POST`
- URL: `/users`
- Body Request:
        {
            "username": string,
            "password": string,
            "fullname": string
        }

##### Respond
If the registration is successful, then the API will respond like the following:
- Status Code: 201
- Response Body:
        {
            "status": "success",
            "message": "User berhasil ditambahkan",
            "data": {
                "userId": "user-Qbax5Oy7L8WKf74l"
            }
        }

#### The API have login user feature (authentication)
##### Request
The client can login to Open Music through the following route:
- Method: `POST`
- URL: `/authentications`
- Body Request:
        {
            "username": string,
            "password": string
        }

##### Respond
If the client successfully login, then the API will respond like the following:
- Status Code: 201
- Response Body:
        {
            "status": "success",
            "message": "Authentication berhasil ditambahkan",
            "data": {
                "accessToken": "jwt.access.token",
                "refreshToken": "jwt.refresh.token"
            }
        }

#### The API have refresh access token feature
##### Request
The client can refresh his/her access token through the following route:
- Method: `PUT`
- URL: `/authentications`
- BodyRequest: 
        {
            "refreshToken": "jwt.refresh.token"
        }

##### Respond
If the refresh access token went successfully, then the API will respond like the following:
- Status Code: 200
- Response Body: 
        {
            "status": "success",
            "message": "Authentication berhasil diperbarui",
            "data": {
                "accessToken": "jwt.access.token"
            }
        }

#### The API have logout feature
##### Request
The client can logout from Open Music and the API will delete his refresh token, this can be done from the following route:
- Method: `DELETE`
- URL: `/authentications`
- Body Request:
        {
            "refreshToken": "jwt.refresh.token"
        }

##### Respond
If the client successfully logout and his/her refresh token is deleted, then the API will respond like the following:
- Status Code: 200
- Response Body: 
        {
            "status": "success",
            "message": "Refresh token berhasil dihapus"
        }

#### The API have add playlist feature
##### Request
The client can add a playlist in Open Music through the following route:
- Method: `POST`
- URL: `/playlists`
- Body Request: 
        {
            "name": string
        }

##### Respond
When the playlist is added successfully, then the API will respond like the following:
- Status Code: 201
- Response Body:
        {
            "status": "success",
            "message": "Playlist berhasil ditambahkan",
            "data": {
                "playlistId": "playlist-Qbax5Oy7L8WKf74l"
            }
        }

Note:  
This resource requires a valid access token in the authorization header. So you need to login first

#### The API have view all owned or collaborated playlist feature
##### Request
The client can view all owned or collaborated playlist in Open Music through the following route:
- Method: `GET`
- URL: `/playlists`

##### Response
If the playlists is received successfully then the API will respond like the following:
- Status Code: 200
- Response Body:
        {
            "status": "success",
            "data": {
                "playlists": [
                    {
                        "id": "playlist-Qbax5Oy7L8WKf74l",
                        "name": "Lagu Indie Hits Indonesia",
                        "username": "dicoding"
                    },
                    {
                        "id": "playlist-lmA4PkM3LseKlkmn",
                        "name": "Lagu Untuk Membaca",
                        "username": "dicoding"
                    }
                ]
            }
        }

Note:  
This resource requires a valid access token in the authorization header. So you need to login first

#### The API have delete playlist feature
##### Request
The client can delete his/her owned playlist from Open Music through the following route:
- Method: `DELETE`
- URL: `/playlists/{playlistId}`

##### Response
If the playlist is successfully deleted, then the API will respond like the following:
- Status Code: 200
- Response Body:
        {
            "status": "success",
            "message": "Playlist berhasil dihapus",
        }

Note:  
This resource requires a valid access token in the authorization header. So you need to login first

#### The API have have add song to owned or collaborated playlist feature
##### Request
The client can add songs to his/her owned or collaborated playlist in Open Music through the following route:
- Method: `POST`
- URL: `/playlists/{playlistId}/songs`
- Body Request:
        {
            "songId": string
        }

##### Response
If the song is successfully added to the playlist then the API will respond like the following:
- Status Code: 201
- Response Body:
        {
            "status": "success",
            "message": "Lagu berhasil ditambahkan ke playlist",
        }

Note:  
This resource requires a valid access token in the authorization header. So you need to login first

#### The API have view songs in owned or collaborated playlist feature
##### Request
The client can view all songs in his/her owned or collaborated playlist in Open Music from the following route:
- Method: `GET`
- URL: `/playlists/{playlistId}/songs`

##### Respond
If the songs in the playlist is fetched successfully then the API will respond like the following:
- Status Code: 200
- Response Body:
        {
            "status": "success",
            "data": {
                "songs": [
                    {
                        "id": "song-Qbax5Oy7L8WKf74l",
                        "title": "Kenangan Mantan",
                        "performer": "Dicoding"
                    },
                    {
                        "id": "song-poax5Oy7L8WKllqw",
                        "title": "Kau Terindah",
                        "performer": "Dicoding"
                    }
                ]
            }
        }

Note:  
This resource requires a valid access token in the authorization header. So you need to login first

#### The API have delete song from playlist feature
##### Request
The client can delete a song from his/her owned or collaborated playlist in Open Music through the following route:
- Method: `DELETE`
- URL: `/playlists/{playlistId}/songs`
- Body Request:
        {
            "songId": string
        }

##### Respond 
If the song is deleted successfully from the playlist then the API will respond like the following:
- Status Code: 200
- Response Body:
        {
            "status": "success",
            "message": "Lagu berhasil dihapus dari playlist",
        }

Note:  
This resource requires a valid access token in the authorization header. So you need to login first

#### Data Validation
The API has also impemented data validation for request payload using JOI for the following routes
- POST /users:
    - username: string, required.
    - password: string, required.
    - fullname: string, required.
- POST /authentications:
    - username: string, required.
    - password: string, required.
- PUT /authentications:
    - refreshToken: string, required.
- DELETE /authentications:
    - refreshToken: string, required.
- POST /playlists:
    - name: string, required.
- POST /playlists/{playlistId}/songs
    - songId: string, required.

#### Error Handling
The API will handles error accordingly like the following:
- When the client tries to access a protected resource without an access token, then the API will respond like the following:
    - Status Code: 401 (Unauthorized)
    - Response Body:
            {
                status: "fail",
                message: "error message related to the cause of the error"
            }
- When the client tries to update an access token without a valid refresh token, then the API will respond like the following:
    - Status Code: 400 (Bad Request)
    - Response Body:
            {
                status: "fail",
                message: "error message related to the cause of the error"
            }
- When the client tries to access that not in his/her authority or rights, then the API will respond like the following:
    - Status Code: 403 (Forbidden)
    - Response Body: 
            {
                status: "fail",
                message: "error message related to the cause of the error"
            }

#### The API have add collaborator to owned playlist feature
##### Request
The client can add a collaborator (another user) to his/her owned playlist through the following route:
- Method: `POST`
- URL: `/collaborations`
- Body Request: 
        {
            "playlistId": string,
            "userId": string,
        }

##### Respond
If the collaborator is successfully added to the playlist, then the API will respond like the following:
- Status Code: 201
- Response Body:
        {
            "status": "success",
            "message": "Kolaborasi berhasil ditambahkan",
            "data": {
                "collaborationId": "collab-Qbax5Oy7L8WKf74l"
            }
        }

Note:  
This resource requires a valid access token in the authorization header. So you need to login first.

#### The API have delete collaborator from owned playlist feature
##### Request
The client can delete a collaborator from his/her owned playlist in Open Music through the route:
- Method: `DELETE`
- URL: `/collaborations`
- Body Request:
        {
            "playlistId": string,
            "userId": string,
        }

##### Respond
If the collaborator is successfully deleted, then the API will respond like the following:
- Status Code: 200
- Response Body:
        {
            "status": "success",
            "message": "Kolaborasi berhasil dihapus"
        }

Note:  
This resource requires a valid access token in the authorization header. So you need to login first.

### 3rd Submission
There are 4 features that is required to be in the API in the third submission and have already been fulfilled. Thus the Open Music API have the following features:

#### The API have export songs in playlist
##### Request
The client can export the songs in his/her owned or collaborated playlist and have it send to their email. This can be done through the route:
- Method: `POST`
- URL: `/exports/playlists/{playlistId}`
- Body Request:
        {
            "targetEmail": string
        }

##### Respond
If the request is successful the API will send a message to another application that will handle the export functionality and send to the email, then the API will respond like the following:
- Status Code: 201
- Response Body: 
        {
            "status": "success",
            "message": "Permintaan Anda sedang kami proses",
        }

Note:  
The application that handles the export function have it's own github [repository](https://github.com/jordyf15/Open-Music-Queue-Consumer_Dicoding-Fundamental-BackEnd-Development-Project). The API only send the required information with RabbitMQ for the other application to carry out the task.

#### The API has upload picture feature
##### Request
The client can upload a picture to Open Music through the route:
- Method: `POST`
- URL: `/upload/pictures`
- Body Request (Form Data):
        {
            "data": file
        }

##### Respond
If the picture is uploaded successfully, then the API will respond like the following:
- Status Code: 201
- Response Body:
        {
            "status": "success",
            "message": "Gambar berhasil diunggah",
            "data": {
                "pictureUrl": "http://…"
            }
        }

Note:  
The picture maximum size is 500KB and the type is MIME type of images.

#### The API implement Server-side caching
The API also implement server-side cache for the following resources: 
- `GET playlists/{playlistId}/songs`
- `GET playlists`




