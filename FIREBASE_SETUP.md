# Firebase Setup Guide

## Overview
This guide will help you set up Firebase for your Career Advisory Website, including Authentication, Firestore Database, and initial data seeding.

## Prerequisites
- Firebase account (https://firebase.google.com/)
- Node.js and npm installed
- Career Advisory Website project

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name (e.g., "career-advisory-website")
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In Firebase Console, go to "Authentication" → "Sign-in method"
2. Enable "Email/Password" provider
3. Optionally enable "Google" and "Facebook" providers for social login

## Step 3: Create Firestore Database

1. Go to "Firestore Database" → "Create database"
2. Choose "Start in test mode" (for development)
3. Select a location closest to your users
4. Click "Done"

## Step 4: Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" → Web app icon
4. Register your app with a nickname
5. Copy the configuration object

## Step 5: Configure Environment Variables

1. Open `.env.local` in your project root
2. Replace the placeholder values with your Firebase config:

```env
REACT_APP_FIREBASE_API_KEY=your_actual_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_actual_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
REACT_APP_FIREBASE_APP_ID=your_actual_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_actual_measurement_id
```

## Step 6: Set Up Firestore Security Rules

In Firebase Console → Firestore Database → Rules, replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Anyone can read courses, colleges, and timeline data
    match /courses/{document} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users can write
    }
    
    match /colleges/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /timeline/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Quiz results are private to the user
    match /quizResults/{document} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

## Step 7: Seed Initial Data (Optional)

To populate your database with sample data, create a temporary component or use the browser console:

```typescript
import { DataSeeder } from './src/services/seedData';

// Run this once to seed initial data
DataSeeder.seedAllData();
```

## Step 8: Test the Setup

1. Start your development server: `npm start`
2. Try registering a new user
3. Check Firebase Console → Authentication to see the new user
4. Check Firestore Database to see user document created

## Database Collections Structure

### Users Collection (`users`)
```typescript
{
  id: string;           // Firebase Auth UID
  email: string;
  name: string;
  age?: number;
  academicLevel?: string;
  location?: string;
  interests?: string[];
  strengths?: string[];
  quizCompleted?: boolean;
  recommendedStream?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Courses Collection (`courses`)
```typescript
{
  id: string;
  name: string;
  description: string;
  duration: string;
  eligibility: string[];
  careerPaths: string[];
  averageSalary: {
    entry: number;
    mid: number;
    senior: number;
  };
  skills: string[];
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  createdAt: Date;
  updatedAt: Date;
}
```

### Colleges Collection (`colleges`)
```typescript
{
  id: string;
  name: string;
  location: string;
  type: 'Government' | 'Private' | 'Deemed';
  established: number;
  courses: string[];
  fees: {
    tuition: number;
    hostel?: number;
    other?: number;
  };
  placements: {
    percentage: number;
    averagePackage: number;
    topPackage: number;
    recruiters: string[];
  };
  facilities: string[];
  rating: number;
  website?: string;
  contact: {
    phone?: string;
    email?: string;
    address: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### Quiz Results Collection (`quizResults`)
```typescript
{
  id: string;
  userId: string;
  answers: Record<string, string>;
  recommendedStream: string;
  score: number;
  completedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Timeline Events Collection (`timeline`)
```typescript
{
  id: string;
  title: string;
  description: string;
  date: Date;
  type: 'exam' | 'admission' | 'scholarship' | 'application';
  category: string;
  eligibility?: string[];
  website?: string;
  important: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Available Services

### FirebaseService
Generic CRUD operations for any collection:
- `getCollection(collectionName)`
- `getDocument(collectionName, docId)`
- `addDocument(collectionName, data)`
- `updateDocument(collectionName, docId, data)`
- `deleteDocument(collectionName, docId)`
- `queryDocuments(collectionName, filters, orderBy, limit)`

### CareerService
Specialized methods for career-related data:
- Course operations: `getCourses()`, `getCourse(id)`, `searchCourses(term)`
- College operations: `getColleges()`, `searchColleges(filters)`
- Quiz operations: `saveQuizResult()`, `getUserQuizResults(userId)`
- Timeline operations: `getTimelineEvents()`, `getUpcomingEvents()`

## Troubleshooting

### Common Issues

1. **"Firebase not initialized" error**
   - Check that all environment variables are set correctly
   - Ensure `.env.local` is in the project root
   - Restart the development server after adding environment variables

2. **Authentication errors**
   - Verify Email/Password provider is enabled in Firebase Console
   - Check that the domain is authorized in Firebase Console → Authentication → Settings

3. **Firestore permission errors**
   - Update Firestore security rules as shown above
   - Ensure user is authenticated before making database calls

4. **Environment variables not loading**
   - Variables must start with `REACT_APP_`
   - Restart development server after changes
   - Check for typos in variable names

### Security Best Practices

1. **Never commit `.env.local` to version control**
   - Add `.env.local` to `.gitignore`
   - Use different Firebase projects for development/production

2. **Use proper Firestore security rules**
   - Never use `allow read, write: if true` in production
   - Implement proper user-based access control

3. **Validate data on both client and server**
   - Use Firebase Functions for server-side validation
   - Implement proper error handling

## Next Steps

1. Customize the seeded data to match your requirements
2. Implement real-time updates using Firestore listeners
3. Add Firebase Cloud Functions for complex business logic
4. Set up Firebase Hosting for deployment
5. Configure Firebase Analytics for user insights

## Support

For Firebase-specific issues, refer to:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
