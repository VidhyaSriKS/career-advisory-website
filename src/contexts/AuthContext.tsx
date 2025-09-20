import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  updateEmail as firebaseUpdateEmail,
  updatePassword as firebaseUpdatePassword,
  UserCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  academicLevel: string;
  location: string;
  interests: string[];
  strengths: string[];
  quizCompleted: boolean;
  isAdmin: boolean;
  getIdToken: () => Promise<string>;
  [key: string]: any; // For additional properties
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  signup: (email: string, password: string, displayName: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Convert Firebase User to our User type
const mapFirebaseUser = async (firebaseUser: FirebaseUser | null): Promise<User | null> => {
  if (!firebaseUser) return null;
  
  // Get additional user data from Firestore
  const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
  const userData = userDoc.data();
  
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    name: firebaseUser.displayName || '',
    age: userData?.age || 0,
    academicLevel: userData?.academicLevel || '',
    location: userData?.location || '',
    interests: userData?.interests || [],
    strengths: userData?.strengths || [],
    quizCompleted: userData?.quizCompleted || false,
    isAdmin: userData?.isAdmin || false,
    ...userData, // Spread any additional user data
    getIdToken: async () => await firebaseUser.getIdToken()
  };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sign up a new user
  const signup = async (email: string, password: string, displayName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      
      // Update user profile with display name
      await firebaseUpdateProfile(user, { displayName });
      
      // Create user document in Firestore
      const userData = {
        email,
        name: displayName,
        age: 0,
        academicLevel: '',
        location: '',
        interests: [],
        strengths: [],
        quizCompleted: false,
        isAdmin: false,
        createdAt: new Date().toISOString(),
      };
      
      await setDoc(doc(db, 'users', user.uid), userData);
      
      // Update local state
      const newUser = await mapFirebaseUser(user);
      setCurrentUser(newUser);
      
      return userCredential;
    } catch (error) {
      console.error('Signup error:', error);
      setError(error instanceof Error ? error.message : String(error));
      throw error;
    }
  };

  // Login user
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = await mapFirebaseUser(userCredential.user);
      setCurrentUser(user);
      return userCredential;
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : String(error));
      throw error;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Logout error:', error);
      setError(error instanceof Error ? error.message : String(error));
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      await firebaseSendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Password reset error:', error);
      setError(error instanceof Error ? error.message : String(error));
      throw error;
    }
  };

  // Update email
  const updateEmail = async (email: string) => {
    if (!auth.currentUser) throw new Error('No user is signed in');
    try {
      await firebaseUpdateEmail(auth.currentUser, email);
      await updateDoc(doc(db, 'users', auth.currentUser.uid), { email });
      setCurrentUser(prev => prev ? { ...prev, email } : null);
    } catch (error) {
      console.error('Update email error:', error);
      setError(error instanceof Error ? error.message : String(error));
      throw error;
    }
  };

  // Update password
  const updatePassword = async (password: string) => {
    if (!auth.currentUser) throw new Error('No user is signed in');
    try {
      await firebaseUpdatePassword(auth.currentUser, password);
    } catch (error) {
      console.error('Update password error:', error);
      setError(error instanceof Error ? error.message : String(error));
      throw error;
    }
  };

  // Update user profile
  const updateProfile = async (profileData: Partial<User>) => {
    if (!auth.currentUser) throw new Error('No user is signed in');
    try {
      // Update Firestore
      await updateDoc(doc(db, 'users', auth.currentUser.uid), profileData);
      
      // Update local state
      setCurrentUser(prev => prev ? { ...prev, ...profileData } : null);
      
      // Update auth profile if name is being updated
      if (profileData.name) {
        await firebaseUpdateProfile(auth.currentUser, {
          displayName: profileData.name
        });
      }
    } catch (error) {
      console.error('Update profile error:', error);
      setError(error instanceof Error ? error.message : String(error));
      throw error;
    }
  };

  // Set up auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const user = await mapFirebaseUser(firebaseUser);
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    loading,
    error,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
