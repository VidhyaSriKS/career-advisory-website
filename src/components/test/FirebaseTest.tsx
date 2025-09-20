import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { FirebaseUser } from 'firebase/auth';

const FirebaseTest = () => {
  const [authState, setAuthState] = useState<string | null>('Checking...');
  const [firestoreState, setFirestoreState] = useState<string | null>('Checking...');

  useEffect(() => {
    // Test Firebase Auth
    const unsubscribe = auth.onAuthStateChanged((user: FirebaseUser | null) => {
      if (user) {
        setAuthState(`✅ Authenticated as: ${user.email}`);
      } else {
        setAuthState('✅ Firebase Auth is working (not signed in)');
      }
    });

    // Test Firestore connection
    const testFirestore = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'test'));
        setFirestoreState('✅ Firestore connection successful');
      } catch (error) {
        console.error('Firestore test error:', error);
        setFirestoreState(`❌ Firestore error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    testFirestore();

    // Cleanup
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Firebase Connection Test</h2>
      
      <div className="p-4 bg-gray-50 rounded">
        <h3 className="font-semibold">Authentication:</h3>
        <p className="mt-1">{authState}</p>
      </div>
      
      <div className="p-4 bg-gray-50 rounded">
        <h3 className="font-semibold">Firestore:</h3>
        <p className="mt-1">{firestoreState}</p>
      </div>
      
      <div className="p-4 bg-blue-50 text-blue-800 rounded text-sm">
        <p>If you see checkmarks (✅), your Firebase configuration is working correctly.</p>
        <p className="mt-2">If you see errors (❌), please check:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Your Firebase project is properly set up</li>
          <li>Firestore is initialized in your Firebase Console</li>
          <li>Your security rules allow read access</li>
        </ul>
      </div>
    </div>
  );
};

export default FirebaseTest;
