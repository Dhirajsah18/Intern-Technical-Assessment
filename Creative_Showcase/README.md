#  Creative Showcase

Creative Showcase is a full-stack web application that allows users to upload, explore, and showcase creative images in a visually appealing **masonry (mosaic) layout**, similar to platforms like Pinterest or Unsplash.

It supports **public user profiles**, **random image discovery**, and a **personal dashboard** for managing uploads.

---

## Features
### Public Features
- Landing page with **randomly displayed images**
- Pinterest-style **masonry / mosaic gallery**
- **Public user profiles** accessible via `/profile/:username`
- View all images uploaded by a specific user
- Fully responsive design

### 🔐 Authenticated Features
- User authentication (Signup / Login)
- Personal dashboard
- Upload images to Cloudinary
- Delete uploaded images
- Image preview before upload
- Secure JWT-based access

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Cloudinary (Image Storage & CDN)

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Image Storage: Cloudinary

---

## 📸 Screenshots

### Landing Page
![Landing_page](https://github.com/user-attachments/assets/a92a85fe-173d-4cd3-95e4-f5f4c360606e)


### Dashboard
![Dashboard](https://github.com/user-attachments/assets/ba3d4ae8-3ecf-445c-83d7-b1fcc9e03278)

---

### PREREQUISITES

Before running this project locally, ensure the following software is installed
on your system:

- Node.js (version 18 or later recommended)
- npm (comes with Node.js)
- MongoDB (local installation or MongoDB Atlas)
- Git
- Cloudinary account

You can verify installation using:

node -v
npm -v
git --version

---

## 📁 Project Structure

```
Creative_Showcase/
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── config/
│   │   │   └── cloudinary.js
│   │   └── index.js
│   └── package.json
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── utils/
│   │   └── main.jsx
│   └── package.json
└── README.md

```

---

### BACKEND INSTALLATION & EXECUTION

1. Clone the repository

git clone https://github.com/Dhirajsah18/Creative-Showcase
cd creative-showcase/server

2. Install backend dependencies

npm install

3. Configure environment variables

Create a file named .env inside the server folder and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Note:
- Do not commit the .env file to GitHub.
- Use MongoDB Atlas for production
- Cloudinary is used for image uploads (no local storage)

4. Start the backend server

npm run dev

If successful, the backend will run at:

http://localhost:5000

---

### FRONTEND INSTALLATION & EXECUTION

5. Open a new terminal and navigate to frontend

cd ../client

6. Install frontend dependencies

npm install

7. Configure frontend environment variables

Create a file named .env inside the client folder and add:

VITE_API_BASE_URL=http://localhost:5000

This connects the frontend to the backend API.

8. Start the frontend development server

npm run dev

If successful, the frontend will run at:

http://localhost:5173

---

### Author

Dhiraj Kumar Sah

---

