import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Firebase Admin SDK Configuration
 * Initializes Firebase Admin with service account credentials
 */
const initializeFirebase = () => {
  try {
    // Check if Firebase is already initialized
    if (admin.apps.length === 0) {
      const serviceAccount = {
        type: "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
      };

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: process.env.FIREBASE_PROJECT_ID
      });

      console.log('Firebase Admin SDK initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
    process.exit(1);
  }
};

// Initialize Firebase
initializeFirebase();

// Export Firebase services
export const auth = admin.auth();
export const firestore = admin.firestore();
export default admin;
