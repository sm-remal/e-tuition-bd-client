# eTuitionBd - Tuition Management System

A comprehensive platform connecting students with qualified tutors, streamlining tuition management, applications, and payments.

## 🌐 Live URL
[Live Website](https://e-tuition-bd-10b58.web.app/)

## 🔗 Links

- **Live Site**: https://e-tuition-bd-10b58.web.app
- **Client Repository**: https://github.com/sm-remal/e-tuition-bd-client
- **Server Repository**: https://github.com/sm-remal/e-tuition-bd-server

## 📋 Project Overview

eTuitionBd is a full-stack web application designed to solve the real-world problem of finding qualified tutors and verified tuition opportunities. The platform provides automated workflows, digital class tracking, transparent payment processing, and structured communication between students, tutors, and administrators.

## 🎯 Purpose

- Connect students with qualified and verified tutors
- Reduce friction in the tuition-finding process through automation
- Enable transparent payment tracking and financial management
- Provide administrators with comprehensive platform monitoring tools
- Facilitate secure communication between students and tutors

## ✨ Key Features

### For Students
- **Post Tuition Requirements**: Create detailed tuition posts with subject, class, location, budget, and schedule
- **Manage Applications**: Review, approve, or reject tutor applications
- **Secure Payments**: Process payments through Stripe integration
- **Dashboard Management**: Track tuitions, applications, and payment history
- **Profile Customization**: Update personal information and preferences

### For Tutors
- **Browse Opportunities**: Search and filter available tuition posts
- **Apply to Tuitions**: Submit applications with qualifications and expected salary
- **Track Applications**: Monitor application status in real-time
- **Revenue Tracking**: View earnings and transaction history
- **Manage Ongoing Tuitions**: Access approved tuition details

### For Administrators
- **User Management**: Update user roles, verify accounts, and manage user data
- **Tuition Moderation**: Approve or reject tuition posts before publication
- **Financial Reports**: View platform earnings and transaction analytics
- **Platform Analytics**: Monitor system performance with charts and graphs

### General Features
- **Authentication**: Secure login with email/password and Google OAuth
- **Role-Based Access**: Different dashboards for Students, Tutors, and Admins
- **Search & Filter**: Advanced search by subject, location, class, and budget
- **Pagination**: Efficient data loading for large datasets
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Real-time Updates**: Dynamic content loading from backend
- **Secure Payments**: Stripe payment gateway integration

## 🛠️ Technologies Used

### Frontend
- **React 19.2.0** - Modern UI library
- **React Router 7.10.1** - Client-side routing
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Framer Motion 12.23.26** - Animation library
- **GSAP 3.13.0** - Advanced animations
- **Axios 1.13.2** - HTTP client
- **React Hook Form 7.68.0** - Form validation
- **Recharts 3.5.1** - Data visualization
- **Swiper 12.0.3** - Touch slider
- **Firebase 12.6.0** - Authentication
- **Stripe** - Payment processing
- **SweetAlert2 11.26.4** - Beautiful alerts
- **React Hot Toast 2.6.0** - Notifications
- **Lottie React 2.4.1** - Lottie animations
- **AOS 2.3.4** - Scroll animations
- **Lucide React 0.556.0** - Icon library
- **React Icons 5.5.0** - Additional icons

### Backend
- **Node.js** - Runtime environment
- **Express 5.2.1** - Web framework
- **MongoDB 7.0.0** - NoSQL database
- **Firebase Admin 13.6.0** - Authentication & authorization
- **Stripe 20.0.0** - Payment gateway
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 17.2.3** - Environment variable management

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB account
- Firebase account
- Stripe account

### Installation

#### Client Setup
```bash
# Clone the repository
git clone  https://github.com/sm-remal/e-tuition-bd-client
cd client

# Install dependencies
npm install

# Create .env file
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=your_backend_api_url
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Run development server
npm run dev
```

#### Server Setup
```bash
# Clone the repository
git clone [your-server-repo-url]
cd server

# Install dependencies
npm install

# Create .env file
MONGODB_URI=your_mongodb_connection_string
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=5000

# Run development server
npm start
```

## 📦 Package Highlights

### Frontend Packages
- **@heroicons/react** - Hero icons collection
- **react-simple-typewriter** - Typewriter effect
- **react-spinners** - Loading spinners
- **dayjs** - Date manipulation

### Backend Packages
- **express** - Fast web framework
- **mongodb** - MongoDB driver
- **firebase-admin** - Server-side Firebase SDK
- **stripe** - Payment processing

## 🔐 Environment Variables

### Client (.env)
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_API_URL
VITE_STRIPE_PUBLIC_KEY
```

### Server (.env)
```
MONGODB_URI
USER_NAME
USER_PASSWORD
STRIPE_SECRET
SITE_DOMAIN
FB_SERVICE_KEY
```

## 👤 Admin Credentials
```
Email: admin@gmail.com
Password: admin@1234
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Developer

Shah Mozzem Remal

---

**Note**: This project was developed as part of the eTuitionBd selection process assessment to demonstrate full-stack development capabilities, problem-solving skills, and attention to detail.