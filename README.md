# SurveyJS Form Builder

A full-stack web application for creating, managing, and collecting responses from dynamic forms using SurveyJS library.

## 📋 About The Project

This project is a comprehensive form builder application that allows users to:

- **Create Forms**: Build dynamic forms with various question types using SurveyJS's drag-and-drop interface
- **Share Forms**: Generate shareable URLs for forms to collect responses
- **Collect Responses**: Gather and store form submissions from users
- **View Analytics**: Access and analyze collected responses

The application is built with modern web technologies and provides a user-friendly interface for both form creators and respondents.

## 🎯 Demo

| Type           | URL                                                                                                    | Description           |
| -------------- | ------------------------------------------------------------------------------------------------------ | --------------------- |
| **Server API** | [surveyjs-form-builder-server.onrender.com/api](https://surveyjs-form-builder-server.onrender.com/api) | Backend API endpoints |
| **Client App** | [surveyjs-form-builder-clien.onrender.com](https://surveyjs-form-builder-clien.onrender.com/)          | Live application demo |

### Built With

**Frontend:**

- React 19.1.1
- SurveyJS (Creator & React UI)
- Tailwind CSS 4.1.13
- React Router DOM
- Vite (Build tool)
- Axios (HTTP client)

**Backend:**

- Node.js with Express 5.1.0
- MongoDB with Mongoose
- Helmet (Security)
- CORS
- Rate Limiting
- Morgan (Logging)

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v16 or higher)
- pnpm (recommended) or npm
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/amir-mostafa-hs/Surveyjs-Form-Builder.git
   cd Surveyjs-Form-Builder
   ```

2. **Install dependencies for both client and server**

   ```bash
   # Install client dependencies
   cd client
   pnpm install

   # Install server dependencies
   cd ../server
   pnpm install
   ```

3. **Environment Setup**

   Create a `.env` file in the `server` directory:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/surveyjs-forms
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

4. **Start MongoDB**

   Make sure MongoDB is running on your system:

   ```bash
   # If using local MongoDB
   mongod

   # Or if using MongoDB service
   brew services start mongodb/brew/mongodb-community
   ```

### Running the Application

1. **Start the backend server**

   ```bash
   cd server
   pnpm dev
   ```

   Server will run on http://localhost:5000

2. **Start the frontend development server**

   ```bash
   cd client
   pnpm dev
   ```

   Client will run on http://localhost:5173

3. **Access the application**

   Open your browser and navigate to http://localhost:5173

## 📁 Project Structure

```
Surveyjs-Form-Builder/
├── client/                     # Frontend React application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── api/               # API service functions
│   │   │   ├── forms.js       # Forms API calls
│   │   │   └── responses.js   # Responses API calls
│   │   ├── components/        # Reusable components
│   │   │   └── Navbar.jsx     # Navigation component
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx       # Landing page
│   │   │   ├── FormBuilder.jsx # Form creation/editing
│   │   │   ├── FormViewer.jsx  # Form display for users
│   │   │   └── Responses.jsx   # Response analytics
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # App entry point
│   │   └── styles.css         # Global styles
│   ├── package.json           # Frontend dependencies
│   └── vite.config.js         # Vite configuration
│
├── server/                     # Backend Node.js application
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js          # MongoDB connection
│   │   ├── controllers/       # Request handlers
│   │   │   ├── formsController.js
│   │   │   └── responsesController.js
│   │   ├── middleware/        # Custom middleware
│   │   │   └── errorHandler.js
│   │   ├── models/            # MongoDB schemas
│   │   │   ├── Form.js        # Form model
│   │   │   └── Response.js    # Response model
│   │   ├── routes/            # API routes
│   │   │   ├── forms.js       # Form-related routes
│   │   │   └── responses.js   # Response-related routes
│   │   ├── utils/             # Utility functions
│   │   │   └── slugify.js     # URL slug generation
│   │   └── server.js          # Server entry point
│   └── package.json           # Backend dependencies
│
└── README.md                   # Project documentation
```

## 🔧 API Endpoints

### Forms

- `GET /api/forms` - Get all forms
- `POST /api/forms` - Create a new form
- `GET /api/forms/:id` - Get form by ID
- `PUT /api/forms/:id` - Update form
- `DELETE /api/forms/:id` - Delete form
- `GET /api/forms/slug/:slug` - Get form by slug

### Responses

- `GET /api/responses/form/:formId` - Get responses for a form
- `POST /api/responses` - Submit a form response
- `DELETE /api/responses/:id` - Delete a response

## 🌟 Features

- **Drag & Drop Form Builder**: Intuitive interface powered by SurveyJS
- **Multiple Question Types**: Text, multiple choice, rating, matrix, and more
- **Form Sharing**: Generate unique URLs for each form
- **Response Collection**: Secure storage of form submissions
- **Response Analytics**: View and analyze collected data
- **Responsive Design**: Works on desktop and mobile devices
- **Rate Limiting**: API protection against abuse
- **Error Handling**: Comprehensive error management
- **SEO Friendly**: Clean URLs with slug generation

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Scripts

### Client Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm preview  # Preview production build
pnpm lint     # Run ESLint
```

### Server Scripts

```bash
pnpm start    # Start production server
pnpm dev      # Start development server with nodemon
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Known Issues

- None at the moment

## 🚀 Future Enhancements

- [ ] User authentication and authorization
- [ ] Form templates library
- [ ] Advanced analytics and charts
- [ ] Email notifications for responses
- [ ] Export responses to CSV/Excel
- [ ] Form versioning
- [ ] Conditional logic in forms
- [ ] Custom themes and branding

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub or contact the maintainers.

---

Built with ❤️ using SurveyJS, React, and Node.js
