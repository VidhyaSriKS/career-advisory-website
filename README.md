# 🌐 Career & Education Advisory Website

A comprehensive, responsive career guidance platform that helps students choose suitable subject streams, degree courses, and career paths through aptitude assessments, course-to-career mappings, and real-time college data.

## 🎯 Features

### ✅ Implemented (MVP Ready)
- **User Authentication**: Complete signup/login system with profile management
- **Aptitude Assessment**: 20-question psychometric quiz with stream recommendations
- **Profile Management**: Comprehensive user profiles with interests and academic details
- **Course-to-Career Mapping**: Visual exploration of degree courses and career paths
- **College Directory**: Searchable database with detailed college information
- **Academic Timeline**: Important dates for admissions, exams, and scholarships
- **Responsive Design**: Mobile-first, accessible interface with Tailwind CSS

### 🔄 In Development
- **Backend API**: Node.js + Express REST APIs
- **Database Integration**: PostgreSQL with data models
- **Multilingual Support**: English + regional language support
- **Admin Dashboard**: Content management system
- **Real-time Notifications**: Firebase Cloud Messaging integration

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js + TypeScript + Tailwind CSS |
| **Backend** | Node.js + Express (Planned) |
| **Database** | PostgreSQL (Planned) |
| **Authentication** | Mock Auth (Firebase ready) |
| **Styling** | Tailwind CSS + Custom Components |
| **Icons** | Lucide React |
| **Notifications** | React Hot Toast |
| **Routing** | React Router DOM |

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd career-advisory-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 📱 Application Structure

```
src/
├── components/
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── contexts/
│   └── AuthContext.tsx
├── data/
│   ├── quizData.ts
│   ├── courseData.ts
│   ├── collegeData.ts
│   └── timelineData.ts
├── pages/
│   ├── Home.tsx
│   ├── Quiz.tsx
│   ├── Results.tsx
│   ├── Profile.tsx
│   ├── CourseMapping.tsx
│   ├── CollegeDirectory.tsx
│   ├── Timeline.tsx
│   └── auth/
│       ├── Login.tsx
│       └── Register.tsx
├── App.tsx
├── index.tsx
└── index.css
```

## 🎨 Key Features Breakdown

### 1. Aptitude Assessment
- **20 psychometric questions** covering analytical, creative, social, and practical thinking
- **Real-time scoring** with category-based analysis
- **Stream recommendations**: Science, Commerce, Arts, or Vocational
- **Progress tracking** with visual indicators

### 2. Course-to-Career Mapping
- **Interactive course exploration** by stream
- **Detailed career path information** with growth rates and salary ranges
- **Skills requirements** and top colleges for each course
- **Visual course selection** interface

### 3. College Directory
- **Comprehensive college database** with 8+ institutions
- **Advanced filtering** by stream, type, location, and ratings
- **Detailed college profiles** including:
  - Admission processes and cutoffs
  - Facilities and infrastructure
  - Placement statistics
  - Contact information
- **Search functionality** across multiple fields

### 4. Academic Timeline
- **Important dates tracking** for exams, admissions, and scholarships
- **Category-based filtering** (exams, admissions, scholarships, results)
- **Stream-specific events** based on user recommendations
- **Priority indicators** and status tracking
- **External links** to official websites

### 5. User Profile System
- **Comprehensive profile management** with personal and academic information
- **Interest and strength tracking** with visual tags
- **Assessment status** and recommendation display
- **Editable profile** with real-time updates

## 🎯 User Journey

1. **Registration/Login** → Create account or sign in
2. **Profile Setup** → Add personal and academic details
3. **Take Assessment** → Complete 20-question aptitude quiz
4. **View Results** → Get personalized stream recommendations
5. **Explore Courses** → Browse course-to-career mappings
6. **Find Colleges** → Search and filter college options
7. **Plan Timeline** → Track important academic dates

## 🔧 Configuration

### Tailwind CSS Setup
The project uses a custom Tailwind configuration with:
- **Custom color palette** (primary blue, secondary green)
- **Extended animations** (fade-in, slide-up)
- **Custom components** (buttons, cards, input fields)
- **Responsive breakpoints** optimized for mobile-first design

### Mock Data Structure
All data is currently stored in TypeScript files for easy development:
- **Quiz questions** with categorized scoring
- **Course information** with career paths and requirements
- **College database** with comprehensive details
- **Timeline events** with filtering capabilities

## 🚀 Deployment Options

### Frontend Deployment
- **Vercel** (Recommended for React apps)
- **Netlify** (Easy continuous deployment)
- **GitHub Pages** (Free static hosting)

### Future Backend Deployment
- **Render** (Full-stack applications)
- **Heroku** (Container-based deployment)
- **Railway** (Modern deployment platform)

## 🔮 Future Enhancements

### Phase 2 - Backend Integration
- [ ] Node.js + Express API development
- [ ] PostgreSQL database setup
- [ ] Firebase Authentication integration
- [ ] Real-time data synchronization

### Phase 3 - Advanced Features
- [ ] AI/ML-based recommendations
- [ ] Real-time chat support
- [ ] Video counseling integration
- [ ] Mobile app development (React Native)

### Phase 4 - Scale & Optimization
- [ ] Performance optimization
- [ ] SEO enhancements
- [ ] Analytics integration
- [ ] A/B testing framework

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set
- **Educational institutions** for inspiration and data structure

## 📞 Support

For support, email support@careerpath.com or join our community discussions.

---

**Built with ❤️ for students seeking their perfect career path**
