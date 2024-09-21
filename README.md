# SnapFlow: Image Processing and Notification System


### Overview
SnapFlow is a backend service designed to handle image uploads, process images, and send notifications via email when new images are processed. It leverages AWS S3 for storage, Sharp for image processing, and Nodemailer for sending email notifications.

### Table of Contents
* Features
* Technologies Used
* Setup Instructions
* API Endpoints
* Running Tests
* Expected Responses
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
* **AWS SDK**: AWS services integration
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
1. Clone the Repository
```
git clone https://github.com/kingkampala/snapflow.git
cd snapflow
```
2. Install Dependencies
```
npm install
```
3. Create a `.env` File Create a `.env` file in the root directory and populate it with the following:
```
AWS_REGION=your_aws_region
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_S3_BUCKET=your_s3_bucket_name
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
DATABASE_URL=postgres://user:password@localhost:5432/your_db_name
```
4. Run Database Migrations If you have set up Sequelize for your database, run:
```
npx sequelize-cli db:migrate
```
5. Start the Application
```
npm start
```
Your application should now be running locally on `http://localhost:2810`.
