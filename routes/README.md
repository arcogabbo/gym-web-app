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

**Condition**:`Error with parameters`

**Code**:`400 Bad Request`

-------------------------------------

## /lesson
Lesson Resource

**URL**: `/lesson`

**Method**:`GET`

**Logged permission**: YES

**Admin permission**: NO

**Data**:
```
	[id]
```

If you don't provide the id future lessons will be displayed instead.

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

**Condition**:`When providing id, lesson doesnt exist`

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
The type could be "single" or "multiple"

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
	"msg": "Lesson added" 
}
```

### Error responses

**Condition**:`Error with parameters`

**Code**:`500 Server Error`

**Condition**:`type not provided`

**Code**:`400 Bad request`

-------------------------------------

**URL**: `/lesson`

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
	-d "id=32"	\
	http://127.0.0.1:8000/lesson
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

## /certificate

**URL**: `/certificate`

**Method**:`GET`

**Logged permission**: YES

**Admin permission**: YES

**Data**:
```
```
The type could be "single" or "multiple"

**Example**:
```bash
	curl -v	\
	-X GET	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d ""	\
	http://127.0.0.1:8000/certificate
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

**URL**: `/certificate`

**Method**:`PUT`

**Logged permission**: YES

**Admin permission**: YES

**Data**:
```
	id,
	type,
	date
```
Type must be "certificate" or "subscription"

**Example**:
```bash
	curl -v	\
	-X PUT	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d "id=4&type=certificate&date=2021-04-07"	\
	http://127.0.0.1:8000/certificate
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

**Condition**: `type parameter error`

**Code**:`400 Bad Request`

-------------------------------------

**URL**: `/certificate`

**Method**:`DELETE`

**Logged permission**: YES

**Admin permission**: YES

**Data**:
```
	id
```
Type must be "certificate" or "subscription"

**Example**:
```bash
	curl -v	\
	-X DELETE	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d "id=4"	\
	http://127.0.0.1:8000/certificate
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

**Data**:
```
	[id]
```

**Example**:
```bash
	curl -v	\
	-X GET	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d "id=1"	\
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
  "msg":"News added"
}
```

### Error responses

**Condition**:`Server error`

**Code**:`500 Server Error`

-------------------------------------

**URL**: `/news`

**Method**:`PUT`

**Logged permission**: YES

**Admin permission**: YES

**Data**:
```
	id,
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
	-d "id=1&expire_date=2021-07-19"	\
	http://127.0.0.1:8000/news
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

**URL**: `/news`

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
	-d "id=1"	\
	http://127.0.0.1:8000/news
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

**URL**: `/user`

**Method**:`GET`

**Logged permission**: YES

**Admin permission**: NO

**Data**:
```
	id
```

**Example**:
```bash
	curl -v	\
	-X GET	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d "id=1"	\
	http://127.0.0.1:8000/user
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
  "msg":"Registration occurred"
}
```

### Error responses

**Condition**:`Mail already used`

**Code**:`409 Conflict`

**Condition**:`Server Error`

**Code**:`500 Server Error`

-------------------------------------

**URL**: `/user`

**Method**:`PUT`

**Logged permission**: YES

**Admin permission**: YES

**Data**:
```
	id
```

**Example**:
```bash
	curl -v	\
	-X PUT	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d "id=1"	\
	http://127.0.0.1:8000/user
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
## /user/des

**URL**: `/user/des`

**Method**:`GET`

**Logged permission**: YES

**Admin permission**: NO

**Data**:
```
	id
```

**Example**:
```bash
	curl -v	\
	-X GET	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d "id=1"	\
	http://127.0.0.1:8000/user/des
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

**URL**: `/user/des`

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
	http://127.0.0.1:8000/user/des
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
## /user/pic

**URL**: `/user/pic`

**Method**:`GET`

**Logged permission**: YES

**Admin permission**: NO

**Data**:
```
	id
```

**Example**:
```bash
	curl -v	\
	-X GET	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d "id=1"	\
	http://127.0.0.1:8000/user/pic
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

**URL**: `/user/pic`

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
	http://127.0.0.1:8000/user/pic
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

**Condition**:`Server Error`

**Code**:`500 Server Error`

-------------------------------------
## /user/pr

**URL**: `/user/pr`

**Method**:`GET`

**Logged permission**: YES

**Admin permission**: NO

**Data**:
```
	id,
	exercise_id
```

**Example**:
```bash
	curl -v	\
	-X GET	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d "id=1&exercise_id=1"	\
	http://127.0.0.1:8000/user/pr
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

**URL**: `/user/pr`

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
## /diary

**URL**: `/diary`

**Method**:`GET`

**Logged permission**: YES

**Admin permission**: NO

**Data**:
```
	[lesson_id]
```
If not provided you will get all pages of the diary

**Example**:
```bash
	curl -v	\
	-X GET	\
	-H "cookie:token=YOUR_TOKEN"	\
	-d ""	\
	http://127.0.0.1:8000/diary	
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
      "lesson_id": 28
    },
    {
      "start_date": "07/04 - 16:30",
      "content": "bbb",
      "lesson_id": 24
    }
  ]
}
```

### Error responses

**Condition**:`Server Error`

**Code**:`500 Server Error`

-------------------------------------

**URL**: `/diary`

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
	http://127.0.0.1:8000/diary	
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

**URL**: `/diary`

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
	http://127.0.0.1:8000/diary	
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