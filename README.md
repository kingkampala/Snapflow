# SnapFlow: Image Processing and Notification System


### Overview
SnapFlow is a backend service designed to handle image uploads, process images, and send notifications via email when new images are processed. It leverages AWS S3 for storage, Sharp for image processing and Nodemailer for sending email notifications.

### Table of Contents
* Features
* Technologies Used
* Setup Instructions
* Usage
* API Endpoints
* Contributing
* License

### Features
* Upload images to AWS S3
* Process uploaded images (resize and format conversion)
* Notify users via email when an image is processed
* Add comments to images
* Retrieve images and their comments

### Technologies Used
* **Node.js**: Backend runtime
* **TypeScript**: Superset of JavaScript for type safety
* **Express.js**: Web framework
* **Sequelize**: ORM for database interactions
* **RESTful API**: Architectural style for API design
* **Docker**: Containerization for application portability
* **Terraform**: Infrastructure as code for managing cloud resources
* **AWS S3**: Object storage service
* **AWS SDK**: AWS services integration
* **AWS EC2**: Compute service for hosting the application
* **AWS ECS**: Container orchestration service
* **AWS ECR**: Container registry service
* **Sharp**: Image processing library
* **Nodemailer**: Email sending service
* **PostgreSQL**: Database management system

### Setup Instructions
**Prerequisites**

Make sure you have the following installed:

* Node.js (version 14 or later)
* PostgreSQL
* AWS account with S3 access
* Gmail account for email notifications (or any other SMTP service)

**Installation**

**1. Clone the Repository**
```
git clone https://github.com/kingkampala/snapflow.git
cd snapflow
```
**2. Install Dependencies**
```
npm install
```
**3. Create a `.env` File**: Create a `.env` file in the root directory and populate it with the following:
```
AWS_REGION=your_aws_region
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_S3_BUCKET=your_s3_bucket_name
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password
DB_URL=postgres://user:password@localhost:5432/your_db_name
```
**4. Run Database Migrations**: If you have set up Sequelize for your database, run:
```
npx sequelize-cli db:migrate
```
**5. Start the Application**
```
npm start
```
Your application should now be running locally on **`http://localhost:{port}`**.

### Usage
To interact with the SnapFlow API, you can use tools like Postman or Curl. Follow these steps to test the endpoints after successfully setting up the application:

**1. Add Your Email to the Database**:

Begin by sending a `POST` request to `/email`, including your email in the request body. This email will be used for receiving notifications.

**2. Upload an Image**:

After adding your email, upload an image by sending a `POST` request to `/image`. The image will be processed, and a notification email containing the processed image's link will be sent to the email you provided. Please note, the link to the processed image will expire after 1 hour.

**3. Add a Comment to the Image**:

You can add comments to the image you uploaded by sending a `POST` request to `/comment/{imageId}`, where `{imageId}` is the ID of the image you wish to comment on.

**4. Testing with Postman or Browser**:

Once your application is running locally or deployed on Render or AWS, you can test all API endpoints using Postman.

 * **For Local Testing**: Use **`http://localhost:{port}`** as the base URL in your Postman requests to test all endpoints.
 * **For Deployed Testing**: Use the Render deployed link at **`https://snapflow.onrender.com`** or AWS deployed link at **`http://51.20.104.72/`** as the base URL. Note that only `GET` requests can be tested using the deployed AWS link in you Web browser, other requests can be tested as well using the Render deployed link in your Postman.

### API Endpoints
**1. Upload an Image**
* **Endpoint**: `POST /image`
* **Request Body**:
  * **Form Data**: `image`: image file
  * `description`: string
* **Response**:
  * `201 Created`: Returns the newly created image record.

**2. Get All Images**
* **Endpoint**: `GET /image`
* **Response**:
  * `200 OK`: Returns an array of image records.
  * `404 Not Found`: If no images are found.

**3. Post a Comment on an Image**
* **Endpoint**: `POST /comment/:imageId`
* **Request Body**:
  * `content`: string
* **Response**:
  * `201 Created`: Returns the newly created comment.
  * `404 Not Found`: If the image does not exist.

**4. Get Comments for an Image**
* **Endpoint**: `GET /comment/:imageId`
* **Response**:
  * `200 OK`: Returns an array of comments.
  * `404 Not Found`: If the image does not exist.

**5. Add Notification Email**
* **Endpoint**: `POST /email`
* **Request Body**:
  * `email`: string
* **Response**:
  * `201 Created`: Returns the newly added email.
  * `400 Bad Request`: If email is not provided.

**6. Get Notification Email by ID**
* **Endpoint**: `GET /email/:id`
* **Response**:
  * `200 OK`: Returns the email record.
  * `404 Not Found`: If the email does not exist.

### Contributing
Contributions are welcome! Please open an issue or submit a pull request.

### License
This project is licensed under the `MIT License`. See the **LICENSE** file for more details.
