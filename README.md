# Learning Management System (LMS) | MERN Stack

![Vue.js](https://img.shields.io/badge/Frontend-Vue.js-42b883?logo=vue.js)
![TailwindCSS](https://img.shields.io/badge/Style-TailwindCSS-38B2AC?logo=tailwindcss)
![NestJS](https://img.shields.io/badge/Backend-NestJS-e0234e?logo=nestjs)
![Express.js](https://img.shields.io/badge/Server-Express-black?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-4EA94B?logo=mongodb)
![Stripe](https://img.shields.io/badge/Payments-Stripe-6772e5?logo=stripe)
![Google Auth](https://img.shields.io/badge/Auth-Google-4285F4?logo=google)
![Git](https://img.shields.io/badge/VersionControl-Git-orange?logo=git)


[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge&logo=vercel)](https://free-realm-quickshow.netlify.app/)

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [License](#-license)

---

## ✨ Features

- Responsive and mobile-friendly UI built with **Tailwind CSS**.
- Secure **authentication system** using **email/password** and **Google OAuth** via **NestJS Passport**.
- Book your favorite movies by selecting **date** and **seat numbers** with a smooth user experience.
- Seamless **Stripe integration** for secure payment during booking.
- Personalized **My Bookings** page to view all movie reservations.
- Role-based access:
  - Regular users (viewers) can upgrade to **Admin** from the profile dropdown.
  - Admins can access a dedicated **Movie Dashboard** to:
    - Add new movie shows.
    - View a list of all shows.
    - Track and manage movie bookings.
- Scalable **backend architecture** using **NestJS**, connected to **MongoDB** for persistent storage.
- Clean and intuitive design ensures a delightful user experience for both viewers and admins.


---

## 🛠️ Tech Stack

- **Frontend:** Vue.js, Tailwind CSS
- **Backend:** Nest.js, Express.js,
- **Database:** MongoDB
- **Authentication:** Google OAuth
- **Payments:** Stripe
- **Version Control:** Git, GitHub

---

## 📸 Screenshots

> Make sure you save your screenshots in a `screenshots` folder!

### 🏠 Home Page
![Home Page](./vue-project/public/admin-quickshot.png)

### 🎥 Course Preview
![Course Preview](./vue-project/public/book-quickshow.png)

### 💳 Checkout (Stripe Payment)
![Checkout Page](./vue-project/public/stripe.png)


---

## 🚀 Getting Started

### Prerequisites

- Nest.js installed
- MongoDB database (local or cloud)
- Stripe account for payment processing
- googOAuth account for authentication

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo-name.git

# Navigate into the project directory
cd your-repo-name

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run the application for frontend (/vue-project)
npm run dev

# Run the application for frontend (/server)
npm run:start dev /  npm run start:prod
