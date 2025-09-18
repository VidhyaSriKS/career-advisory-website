import { firestore } from '../config/firebase.js';

/**
 * Cloud Functions for user-related operations
 */

/**
 * Creates a default user profile in Firestore when a new user is registered
 * @param {string} uid - Firebase Auth UID
 * @param {Object} userData - Basic user data from registration
 * @returns {Promise<Object>} - Created user profile
 */
export const createUserProfile = async (uid, userData) => {
  try {
    const { email, name } = userData;
    
    // Create default user profile
    const userProfile = {
      uid,
      email,
      name,
      age: null,
      grade: null,
      location: null,
      educationLevel: null,
      interests: [],
      skills: [],
      preferences: {},
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save to Firestore
    await firestore.collection('users').doc(uid).set(userProfile);
    
    return userProfile;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

/**
 * Updates user profile with initialization data
 * @param {string} uid - Firebase Auth UID
 * @param {Object} profileData - Profile initialization data
 * @returns {Promise<Object>} - Updated user profile
 */
export const initializeUserProfile = async (uid, profileData) => {
  try {
    const { name, age, grade, location } = profileData;
    
    // Get existing user profile
    const userDoc = await firestore.collection('users').doc(uid).get();
    
    if (!userDoc.exists) {
      throw new Error('User profile not found');
    }
    
    // Update with initialization data
    const updateData = {
      name: name || userDoc.data().name,
      age: age || null,
      grade: grade || null,
      location: location || null,
      updatedAt: new Date().toISOString()
    };
    
    await firestore.collection('users').doc(uid).update(updateData);
    
    return {
      ...userDoc.data(),
      ...updateData
    };
  } catch (error) {
    console.error('Error initializing user profile:', error);
    throw error;
  }
};