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
