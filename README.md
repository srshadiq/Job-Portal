# Job Portal - Full Stack Application

A comprehensive job portal application built with **Spring Boot** backend and **React TypeScript** frontend, featuring modern UI/UX design with day/night theme support.

## 🚀 Features

### 👨‍💼 For Employers

- **Post Jobs**: Create and manage job postings with rich text descriptions
- **Find Talent**: Search and filter candidates based on skills and experience
- **Manage Applications**: Review applications, schedule interviews, and make offers
- **Company Profile**: Showcase company information and culture
- **Application Tracking**: Track application status (Applied, Interviewing, Offered, Rejected)

### 👨‍💻 For Job Seekers

- **Find Jobs**: Advanced search and filtering system
- **Apply for Jobs**: Easy application process with profile integration
- **Job History**: Track all applications and their statuses
- **Profile Management**: Complete profile with skills, experience, and certifications
- **Resume Generation**: Auto-generate PDF resumes from profile data
- **Save Jobs**: Bookmark interesting job opportunities

### 🎨 UI/UX Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Day/Night Theme**: Toggle between light and dark modes with persistent preferences
- **Modern Interface**: Clean, professional design using Mantine UI components
- **Real-time Updates**: Dynamic content updates without page refresh
- **Rich Text Editor**: Advanced job description editing with formatting options

## 🛠️ Technology Stack

### Frontend

- **React 18** with TypeScript
- **Mantine UI** - Modern React components library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Utility-first CSS framework
- **TipTap** - Rich text editor
- **jsPDF & html2canvas** - PDF generation
- **Tabler Icons** - Icon library

### Backend

- **Spring Boot 3** - Java framework
- **MongoDB** - NoSQL database
- **Spring Data MongoDB** - Database integration
- **Spring Security** - Authentication and authorization
- **Maven** - Dependency management
- **Lombok** - Code generation

## 📁 Project Structure

```
JOB PORTAL/
├── Frontend/                 # React TypeScript application
│   ├── public/              # Static assets
│   │   ├── Category/        # Job category icons
│   │   ├── Companies/       # Company logos
│   │   ├── Icons/           # UI icons
│   │   └── Profile/         # Profile images
│   └── src/
│       ├── Components/      # Reusable UI components
│       │   ├── ApplyJob/    # Job application components
│       │   ├── CompanyProfile/
│       │   ├── FindJobs/    # Job search components
│       │   ├── FindTalent/  # Talent search components
│       │   ├── Header/      # Navigation components
│       │   ├── JobDescription/
│       │   ├── PostJob/     # Job posting components
│       │   ├── Profile/     # User profile components
│       │   └── SignupLogin/ # Authentication components
│       ├── Context/         # React context providers
│       ├── Data/           # Mock data and constants
│       ├── Pages/          # Page components
│       ├── Services/       # API services
│       ├── Slices/         # Redux slices
│       └── Hooks/          # Custom React hooks
└── Backend/                # Spring Boot application
    └── src/main/java/com/jobportal/
        ├── controller/     # REST controllers
        ├── dto/           # Data transfer objects
        ├── entity/        # Database entities
        ├── repository/    # Data repositories
        └── service/       # Business logic
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **Java** (v17 or higher)
- **MongoDB** (v4.4 or higher)
- **Maven** (v3.6 or higher)

### Backend Setup

1. **Navigate to Backend directory**

   ```bash
   cd Backend
   ```

2. **Configure MongoDB**

   - Update `application.properties` with your MongoDB connection string

   ```properties
   spring.data.mongodb.uri=mongodb://localhost:27017/jobportal
   ```

3. **Install dependencies and run**

   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

4. **Backend will start on** `http://localhost:8080`

### Frontend Setup

1. **Navigate to Frontend directory**

   ```bash
   cd Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm start
   ```

4. **Frontend will start on** `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the Frontend directory:

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_ENVIRONMENT=development
```

### Database Schema

The application uses MongoDB with the following main collections:

- **users** - User authentication data
- **profiles** - User profile information
- **jobs** - Job postings
- **applications** - Job applications

## 🎯 Key Features Implementation

### Theme System

- **Context-based theme management** with `ThemeContext`
- **CSS custom properties** for dynamic color switching
- **Persistent theme preferences** in localStorage
- **System preference detection** for initial theme

### Authentication & Authorization

- **Role-based access control** (APPLICANT/EMPLOYER)
- **Protected routes** based on user roles
- **JWT token management** for secure API calls

### PDF Resume Generation

- **Dynamic PDF creation** from user profile data
- **Professional resume template** with proper formatting
- **Base64 encoding** for efficient storage and transfer

### Advanced Search & Filtering

- **Multi-criteria search** for jobs and candidates
- **Real-time filtering** with instant results
- **Saved search preferences** for quick access

## 🎨 Design System

### Color Palette

- **Primary**: Blue variants for main actions and highlights
- **Secondary**: Gray tones for backgrounds and secondary text
- **Mine Shaft**: Dark theme background colors
- **Success/Error**: Green and red for status indicators

### Component Library

- **Consistent spacing** using Tailwind CSS utilities
- **Reusable components** with prop-based customization
- **Responsive breakpoints** for all screen sizes
- **Accessibility features** with proper ARIA labels

## 📱 Responsive Design

The application is fully responsive with optimized layouts for:

- **Desktop** (1200px+): Full sidebar navigation and multi-column layouts
- **Tablet** (768px - 1199px): Collapsible navigation with adapted layouts
- **Mobile** (320px - 767px): Stack layouts with touch-optimized interactions

## 🔐 Security Features

- **Input validation** on both frontend and backend
- **SQL injection prevention** through parameterized queries
- **XSS protection** with content sanitization
- **CORS configuration** for secure cross-origin requests
- **Password encryption** using BCrypt

## 🚀 Deployment

### Backend Deployment

1. **Build JAR file**: `mvn clean package`
2. **Deploy to server**: Upload JAR and run with `java -jar`
3. **Environment configuration**: Set production database URLs

### Frontend Deployment

1. **Build production bundle**: `npm run build`
2. **Deploy to web server**: Upload `build` folder contents
3. **Configure environment**: Set production API endpoints

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/new-feature`
3. **Commit changes**: `git commit -m 'Add new feature'`
4. **Push to branch**: `git push origin feature/new-feature`
5. **Submit pull request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: [srshadiq](https://github.com/srshadiq)

## 📞 Support

For support, please create an issue in the GitHub repository or contact the development team.

## 🙏 Acknowledgments

- **Mantine UI** for the excellent component library
- **Spring Boot** for the robust backend framework
- **MongoDB** for flexible data storage
- **Tailwind CSS** for utility-first styling
- **React community** for amazing ecosystem support

---

**Built with ❤️ for connecting talent with opportunities**
