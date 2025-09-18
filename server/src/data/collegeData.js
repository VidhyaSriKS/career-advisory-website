import { firestore } from '../config/firebase.js';

/**
 * Sample college data for the AISHE dataset
 * This would be replaced with actual data from the AISHE dataset in production
 */
export const collegesData = [
  {
    collegeId: 'col001',
    name: 'Engineering Institute of Technology',
    courses: ['Engineering', 'Computer Science', 'Information Technology'],
    location: { lat: 11.23, lng: 77.89 },
    aisheCode: 'AISHE001',
    address: '123 College Road, Chennai, Tamil Nadu',
    website: 'https://www.eit.edu.in',
    phone: '+91-1234567890',
    accreditation: 'NAAC A++'
  },
  {
    collegeId: 'col002',
    name: 'Medical Sciences University',
    courses: ['Medicine', 'Pharmacy', 'Nursing'],
    location: { lat: 11.33, lng: 77.73 },
    aisheCode: 'AISHE002',
    address: '456 Health Avenue, Bangalore, Karnataka',
    website: 'https://www.msu.edu.in',
    phone: '+91-9876543210',
    accreditation: 'NAAC A+'
  },
  {
    collegeId: 'col003',
    name: 'National Business School',
    courses: ['Business Administration', 'Commerce', 'Economics'],
    location: { lat: 11.43, lng: 77.63 },
    aisheCode: 'AISHE003',
    address: '789 Management Street, Mumbai, Maharashtra',
    website: 'https://www.nbs.edu.in',
    phone: '+91-8765432109',
    accreditation: 'NAAC A'
  },
  {
    collegeId: 'col004',
    name: 'Creative Arts College',
    courses: ['Fine Arts', 'Design', 'Animation'],
    location: { lat: 11.53, lng: 77.53 },
    aisheCode: 'AISHE004',
    address: '101 Arts Lane, Kolkata, West Bengal',
    website: 'https://www.cac.edu.in',
    phone: '+91-7654321098',
    accreditation: 'NAAC B++'
  },
  {
    collegeId: 'col005',
    name: 'Science & Technology University',
    courses: ['Physics', 'Chemistry', 'Biology', 'Engineering'],
    location: { lat: 11.63, lng: 77.43 },
    aisheCode: 'AISHE005',
    address: '202 Science Park, Hyderabad, Telangana',
    website: 'https://www.stu.edu.in',
    phone: '+91-6543210987',
    accreditation: 'NAAC A'
  },
  {
    collegeId: 'col006',
    name: 'Humanities & Social Sciences Institute',
    courses: ['Psychology', 'Sociology', 'Political Science', 'History'],
    location: { lat: 11.73, lng: 77.33 },
    aisheCode: 'AISHE006',
    address: '303 Humanities Road, Delhi, Delhi',
    website: 'https://www.hssi.edu.in',
    phone: '+91-5432109876',
    accreditation: 'NAAC B+'
  },
  {
    collegeId: 'col007',
    name: 'Agriculture & Environmental Studies College',
    courses: ['Agriculture', 'Environmental Science', 'Forestry'],
    location: { lat: 11.83, lng: 77.23 },
    aisheCode: 'AISHE007',
    address: '404 Farm Road, Pune, Maharashtra',
    website: 'https://www.aesc.edu.in',
    phone: '+91-4321098765',
    accreditation: 'NAAC B'
  },
  {
    collegeId: 'col008',
    name: 'Law University',
    courses: ['Law', 'Legal Studies', 'Criminal Justice'],
    location: { lat: 11.93, lng: 77.13 },
    aisheCode: 'AISHE008',
    address: '505 Justice Avenue, Ahmedabad, Gujarat',
    website: 'https://www.lawu.edu.in',
    phone: '+91-3210987654',
    accreditation: 'NAAC A+'
  },
  {
    collegeId: 'col009',
    name: 'Hospitality & Tourism Management Institute',
    courses: ['Hotel Management', 'Tourism', 'Culinary Arts'],
    location: { lat: 12.03, lng: 77.03 },
    aisheCode: 'AISHE009',
    address: '606 Hospitality Street, Jaipur, Rajasthan',
    website: 'https://www.htmi.edu.in',
    phone: '+91-2109876543',
    accreditation: 'NAAC B++'
  },
  {
    collegeId: 'col010',
    name: 'Education & Teacher Training College',
    courses: ['Education', 'Teaching', 'Special Education'],
    location: { lat: 12.13, lng: 76.93 },
    aisheCode: 'AISHE010',
    address: '707 Education Lane, Lucknow, Uttar Pradesh',
    website: 'https://www.ettc.edu.in',
    phone: '+91-1098765432',
    accreditation: 'NAAC B'
  }
];

/**
 * Seed college data to Firestore
 * @param {FirebaseFirestore.Firestore} firestoreInstance - Firestore instance
 */
export async function seedCollegeData(firestoreInstance) {
  try {
    const collectionRef = firestoreInstance.collection('colleges');
    const snapshot = await collectionRef.get();
    
    // Only seed if collection is empty
    if (!snapshot.empty) {
      console.log('Colleges collection already has data, skipping seed');
      return;
    }
    
    console.log('Seeding colleges collection...');
    
    // Use batch write for better performance
    const batch = firestoreInstance.batch();
    
    collegesData.forEach(college => {
      const docRef = collectionRef.doc(college.collegeId);
      batch.set(docRef, {
        ...college,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    });
    
    await batch.commit();
    console.log(`Successfully seeded ${collegesData.length} colleges`);
  } catch (error) {
    console.error('Error seeding college data:', error);
    throw error;
  }
}