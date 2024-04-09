# Full Stack Photo App

![alt text](image.png)

This is a full stack photo gallery app built on the MEAN stack.  
You can sign up or log in, as well as upload, delete, and edit photos!  
This gallery app was built as a single page, no routing necessary.  

## Getting Started

### Assumptions:
- you have a mongo DB cloud instance up and running  
- you have have an understanding of Node.js and Npm  

### Steps:

To get started, clone this repository.  
Then run `npm install` in both the back and front end directories.  
Create a .env file in the back end directory and make sure to include a mongo db URI as DATABASE_URI  
and a secret access token as ACCESS_TOKEN_SECRET.  
Run the server with `node server.js` in the back end directory.  
Run the front end with `ng serve` in the front end.  

Voila! Enjoy the photo gallery application.  

## Know Limitations
- Rare user authentication bug that requires user to log in twice
