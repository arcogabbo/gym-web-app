# API endpoints 

**NOTE**: The [] on parameters means that the parameter is optional, not providing it the response could be different
**NOTE 2**: All operations that requires a permission, if not provided the result will be a 401 Unauthorized

## /login
Login with credentials

**URL**: `/login`

**Method**:`POST`

**Logged permission**: NO

**Admin permission**: NO

**Data**:
```
	mail
	password
```

**Example**:
```bash
	curl -v	\
	-X POST	\
	-d "mail=example@gmail.com&password=yourpassword"	\
	http://127.0.0.1:8000/login
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
	"token":"abcdef"
}
```

### Error responses

**Condition**:`Wrong credentials or athlete not accepted`

**Code**:`400 Bad Request`

-------------------------------------

## /lesson
Lesson Resource

**URL**: `/lesson`

**Method**:`GET`

**Logged permission**: YES

**Admin permission**: NO

Future lessons will be displayed.

**Example**:
```bash
	curl -v	\
	-X GET	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d ""	\
	http://127.0.0.1:8000/lesson
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
   "data":
   [
      {
         "id":32,
         "capacity":8,
         "start_date":"2021-04-15T15:30:00.000Z",
         "end_date":"2021-04-15T16:30:00.000Z",
         "n_books":3
      },
      {
         "id":33,
         "capacity":8,
         "start_date":"2021-04-22T15:30:00.000Z",
         "end_date":"2021-04-22T16:30:00.000Z",
         "n_books":3
      },
      {
         "id":34,
         "capacity":8,
         "start_date":"2021-04-29T15:30:00.000Z",
         "end_date":"2021-04-29T16:30:00.000Z",
         "n_books":3
      }
   ]
}
```

### Error responses

**Condition**:`Generic server error`

**Code**:`500 Server Error`

-------------------------------------

**URL**: `/lesson/:lesson_id`

**Method**:`GET`

**Logged permission**: YES

**Admin permission**: NO

Single lesson.

**Example**:
```bash
	curl -v	\
	-X GET	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d ""	\
	http://127.0.0.1:8000/lesson/32
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
   "data":
   [
      {
         "id":32,
         "capacity":8,
         "start_date":"2021-04-15T15:30:00.000Z",
         "end_date":"2021-04-15T16:30:00.000Z",
         "n_books":3
      }
   ]
}
```

### Error responses

**Condition**:`Lesson not found`

**Code**:`404 Not Found`

-------------------------------------

**URL**: `/lesson`

**Method**:`POST`

**Logged permission**: YES

**Admin permission**: YES

**Data**:
```
	type,
	capacity,
	initial_timestamp
```
The type must be "single" or "multiple"

**Example**:
```bash
	curl -v	\
	-X POST	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d "type=single&capacity=4&initial_timestamp=2021-04-13T10:30"	\
	http://127.0.0.1:8000/lesson
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
	"msg": "Lesson added", 
	"id" : "42"
}
```

### Error responses

**Condition**:`Error with parameters`

**Code**:`500 Server Error`

**Condition**:`type not provided`

**Code**:`400 Bad request`

-------------------------------------

**URL**: `/lesson/:id`

**Method**:`DELETE`

**Logged permission**: YES

**Admin permission**: YES

**Example**:
```bash
	curl -v	\
	-X DELETE	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d ""	\
	http://127.0.0.1:8000/lesson/32
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
	"msg":"Lesson removed"
}
```

### Error responses

**Condition**:`Server error`

**Code**:`500 Server Error`

-------------------------------------

## /certificates

**URL**: `/certificates`

**Method**:`GET`

**Logged permission**: YES

**Admin permission**: YES

**Example**:
```bash
	curl -v	\
	-X GET	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d ""	\
	http://127.0.0.1:8000/certificates
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
  "data": 
  [
    {
      "name": "test",
      "surname": "test",
      "certificate": "07-04-2021",
      "subscription": null,
      "id": 4
    }
  ]
}
```
-------------------------------------

**URL**: `/certificates/:id`

**Method**:`PUT`

**Logged permission**: YES

**Admin permission**: YES

**Data**:
```
	type,
	date
```
Type must be "certificate" or "subscription"

**Example**:
```bash
	curl -v	\
	-X PUT	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d "type=certificate&date=2021-04-07"	\
	http://127.0.0.1:8000/certificates/4
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
  "msg":"Certificate successfully added"
}
```

### Error responses

**Condition**:`Server error`

**Code**:`500 Server Error`

**Condition**: `type parameter not inserted`

**Code**:`400 Bad Request`

-------------------------------------

**URL**: `/certificates/:id`

**Method**:`DELETE`

**Logged permission**: YES

**Admin permission**: YES

**Example**:
```bash
	curl -v	\
	-X DELETE	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d ""	\
	http://127.0.0.1:8000/certificates/4
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
  "msg":"Certificates successfully removed"
}
```

### Error responses

**Condition**:`Server error`

**Code**:`500 Server Error`

-------------------------------------

## /news

**URL**: `/news`

**Method**:`GET`

**Logged permission**: YES

**Admin permission**: NO

**Example**:
```bash
	curl -v	\
	-X GET	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d ""	\
	http://127.0.0.1:8000/news
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
  "data": [
    {
      "id": 1,
      "title": "test3",
      "content": "test3_content"
    }
  ]
}
```

### Error responses

**Condition**:`Server error or news not found`

**Code**:`500 Server Error`

-------------------------------------

**URL**: `/news/:id`

**Method**:`GET`

**Logged permission**: YES

**Admin permission**: NO

**Example**:
```bash
	curl -v	\
	-X GET	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d ""	\
	http://127.0.0.1:8000/news/1
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
  "data": [
    {
      "id": 1,
      "title": "test3",
      "content": "test3_content"
    }
  ]
}
```

### Error responses

**Condition**:`Server error`

**Code**:`500 Server Error`

**Condition**:`Parameters error`

**Code**:`400 Bad Request`

-------------------------------------

**URL**: `/news`

**Method**:`POST`

**Logged permission**: YES

**Admin permission**: YES

**Data**:
```
	expire_date,
	title,
	content
```

**Example**:
```bash
	curl -v	\
	-X POST	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d "expire_date=2021-07-15&title=news&content=example_content"	\
	http://127.0.0.1:8000/news
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
  "msg":"News added",
  "id" : "4"
}
```

### Error responses

**Condition**:`Server error`

**Code**:`500 Server Error`

-------------------------------------

**URL**: `/news/:id`

**Method**:`PUT`

**Logged permission**: YES

**Admin permission**: YES

**Data**:
```
	[expire_date],
	[title],
	[content]
```
At least 1 of the optional parameters must be provided.

**Example**:
```bash
	curl -v	\
	-X PUT	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d "expire_date=2021-07-19"	\
	http://127.0.0.1:8000/news/1
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
  "msg":"News updated"
}
```

### Error responses

**Condition**:`Error while updating`

**Code**:`500 Server Error`

-------------------------------------

**URL**: `/news/:id`

**Method**:`DELETE`

**Logged permission**: YES

**Admin permission**: YES

**Data**:
```
	id
```

**Example**:
```bash
	curl -v	\
	-X DELETE	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d ""	\
	http://127.0.0.1:8000/news/1
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
  "msg":"News removed"
}
```

### Error responses

**Condition**:`Error while removing`

**Code**:`500 Server Error`

-------------------------------------

## /user

**URL**: `/user/:id`

**Method**:`GET`

**Logged permission**: YES

**Admin permission**: NO

**Example**:
```bash
	curl -v	\
	-X GET	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d ""	\
	http://127.0.0.1:8000/user/1
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
  "data": 
  {
    "utente": {
      "name": "test",
      "id": 1,
      "surname": "test",
      "description": "hello world"
    },
    "pic": {
      "name": "1",
      "extension": "png"
    },
    "prs": [
      {
        "id": 2,
        "name": "Overhead Squat",
        "value": 32
      },
      {
        "id": 11,
        "name": "Bench press",
        "value": 50
      }
    ]
  }
}
```

### Error responses

**Condition**:`Parameters error`

**Code**:`400 Bad Request`

-------------------------------------

**URL**: `/user`

**Method**:`POST`

**Logged permission**: NO

**Admin permission**: NO

**Data**:
```
	mail,
	name,
	surname,
	password,
	gender
```
Gender: 0 for female, 1 for male

**Example**:
```bash
	curl -v	\
	-X POST	\
	-d "mail=example@gmail.com&name=test&surname=test&password=changeme&gender=1"	\
	http://127.0.0.1:8000/user
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
  "msg":"Registration occurred",
  "id": "10"
}
```

### Error responses

**Condition**:`Parameters not validated`

**Code**:`400 Bad Request`

**Condition**:`Mail already used`

**Code**:`409 Conflict`

**Condition**:`Server Error`

**Code**:`500 Server Error`

-------------------------------------

**URL**: `/user/:id`

**Method**:`PUT`

**Logged permission**: YES

**Admin permission**: YES

**Example**:
```bash
	curl -v	\
	-X PUT	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d ""	\
	http://127.0.0.1:8000/user/1
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
  "msg":"User accepted"
}
```

### Error responses

**Condition**:`Server Error`

**Code**:`500 Server Error`

-------------------------------------
## /user/:id/des

**URL**: `/user/:id/des`

**Method**:`GET`

**Logged permission**: YES

**Admin permission**: NO

**Example**:
```bash
	curl -v	\
	-X GET	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d ""	\
	http://127.0.0.1:8000/user/1/des
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
  "data": 
  [
    {
      "description": "hello world"
    }
  ]
}
```

### Error responses

**Condition**:`Server Error`

**Code**:`500 Server Error`

-------------------------------------

**URL**: `/user/:id/des`

**Method**:`PUT`

**Logged permission**: YES

**Admin permission**: NO

**Data**:
```
	description
```

**Example**:
```bash
	curl -v	\
	-X PUT	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d "description=hello world"	\
	http://127.0.0.1:8000/user/1/des
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
  "msg":"Description saved"
}
```

-------------------------------------
## /user/:id/pic

**URL**: `/user/:id/pic`

**Method**:`GET`

**Logged permission**: YES

**Admin permission**: NO

**Example**:
```bash
	curl -v	\
	-X GET	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d "id=1"	\
	http://127.0.0.1:8000/user/1/pic
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
  "data": "/images/1.png"
}
```

### Error responses

**Condition**:`Error with parameters`

**Code**:`400 Bad Request`

-------------------------------------

**URL**: `/user/:id/pic`

**Method**:`PUT`

**Logged permission**: YES

**Admin permission**: NO

**Form Data**:
```
	file
```

**Example**:
```bash
	curl -v	\
	-X PUT	\
	-H "cookie:token=YOUR_TOKEN"	\
	-F "file=@path/to/your/image"	\
	http://127.0.0.1:8000/user/1/pic
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
  "msg":"Image uploaded"
}
```

### Error responses

**Condition**:`File size exceed max limit`

**Code**:`400 Bad Request`

**Condition**:`Server Error`

**Code**:`500 Server Error`

-------------------------------------
## /user/:id/pr

**URL**: `/user/:id/pr`

**Method**:`GET`

**Logged permission**: YES

**Admin permission**: NO

**Data**:
```
	exercise_id
```

**Example**:
```bash
	curl -v	\
	-X GET	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d ""	\
	http://127.0.0.1:8000/user/1/pr?exercise_id=1
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
  "data": 
  [
    {
      "exercise_id": 1,
      "value": 40
    }
  ]
}
```

### Error responses

**Condition**:`Server Error`

**Code**:`500 Server Error`

-------------------------------------

**URL**: `/user/:id/pr`

**Method**:`PUT`

**Logged permission**: YES

**Admin permission**: NO

**Data**:
```
	exercise_id,
	value
```

**Example**:
```bash
	curl -v	\
	-X PUT	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d "value=40&exercise_id=1"	\
	http://127.0.0.1:8000/user/pr
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
  "msg":"PR saved"
}
```

### Error responses

**Condition**:`Server Error`

**Code**:`500 Server Error`

-------------------------------------
## /diary/:id

Get all pages of a user

**URL**: `/diary/:id`

**Method**:`GET`

**Logged permission**: YES

**Admin permission**: NO

**Example**:
```bash
	curl -v	\
	-X GET	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d ""	\
	http://127.0.0.1:8000/diary/1	
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
  "data": 
  [
    {
      "start_date": "12/04 - 16:30",
      "content": "aaa",
      "lesson_id": 1
    }
  ]
}
```

### Error responses

**Condition**:`Server Error`

**Code**:`500 Server Error`

-------------------------------------

**URL**: `/diary/:id`

**Method**:`PUT`

**Logged permission**: YES

**Admin permission**: NO

**Data**:
```
	lesson_id,
	date,
	content
```

**Example**:
```bash
	curl -v	\
	-X PUT	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d "lesson_id=24&date=2021-04-07&content=bbb"	\
	http://127.0.0.1:8000/diary/1	
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
  "msg":"Page saved"
}
```

### Error responses

**Condition**:`Server Error`

**Code**:`500 Server Error`

-------------------------------------

**URL**: `/diary/:id`

**Method**:`DELETE`

**Logged permission**: YES

**Admin permission**: NO

**Data**:
```
	lesson_id
```

**Example**:
```bash
	curl -v	\
	-X DELETE	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d "lesson_id=24"	\
	http://127.0.0.1:8000/diary/1	
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
  "msg":"Page removed"
}
```

### Error responses

**Condition**:`Server Error`

**Code**:`500 Server Error`

**Condition**:`Error with parameters`

**Code**:`400 Bad Request`

-------------------------------------

## /book/:lesson_id

**URL**: `/book/:lesson_id`

**Method**:`POST`

**Logged permission**: YES

**Admin permission**: NO

**Example**:
```bash
	curl -v	\
	-X POST	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d ""	\
	http://127.0.0.1:8000/book/32	
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
  "msg":"Page saved"
}
```

### Error responses

**Condition**:`Lesson is full or user is already booked on another lesson of the same day`

**Code**:`400 Bad Request`

**Condition**:`Error with the book`

**Code**:`500 Server Error`

-------------------------------------

**URL**: `/book/:lesson_id`

**Method**:`DELETE`

**Logged permission**: YES

**Admin permission**: NO

**Example**:
```bash
	curl -v	\
	-X DELETE	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d ""	\
	http://127.0.0.1:8000/book/32	
```

### Success responses
**Code**:`200 OK`

**Output example**

```json
{
  "msg":"Book removed"
}
```

### Error responses

**Condition**:`Server Error`

**Code**:`500 Server Error`

**Condition**:`Lesson doesn't exist`

**Code**:`404 Not Found`