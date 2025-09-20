import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile as updateFirebaseProfile,
  sendPasswordResetEmail,
  updateEmail as updateUserEmail,
  updatePassword as updateUserPassword,
  UserCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
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
    getIdToken: async () => await firebaseUser.getIdToken()
  };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Sign up a new user
  const signup = async (email: string, password: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update user profile with display name
    await updateFirebaseProfile(userCredential.user, {
      displayName
    });
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email,
      name: displayName,
      createdAt: new Date().toISOString(),
      isAdmin: false,
      quizCompleted: false
    });
    
    return userCredential;
  };

  // Log in an existing user
  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Log out the current user
  const logout = () => {
    return signOut(auth);
  };

  // Reset password
  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Update email
  const updateEmail = (email: string) => {
    if (!auth.currentUser) throw new Error('No user is signed in');
    return updateUserEmail(auth.currentUser, email);
  };

  // Update password
  const updatePassword = (password: string) => {
    if (!auth.currentUser) throw new Error('No user is signed in');
    return updateUserPassword(auth.currentUser, password);
  };

  // Update user profile
  const updateProfile = async (profileData: Partial<User>) => {
    if (!auth.currentUser) throw new Error('No user is signed in');
    
    const updates: { [key: string]: any } = {};
    
    // Update Firebase Auth profile
    if (profileData.name) {
      await updateFirebaseProfile(auth.currentUser, {
        displayName: profileData.name
      });
      updates.name = profileData.name;
    }
    
    // Update Firestore user document
    const userDoc = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userDoc, {
      ...updates,
      ...profileData,
      updatedAt: new Date().toISOString()
    });
    
    // Update local state
    setCurrentUser(prev => prev ? { ...prev, ...profileData } : null);
  };

  // Set up auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      const user = await mapFirebaseUser(firebaseUser);
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
