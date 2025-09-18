import { firestore } from '../config/firebase.js';

/**
 * Sample career path data for seeding the database
 */
const sampleCareers = [
  {
    title: 'Software Developer',
    description: 'Design, develop, and maintain software applications using various programming languages and frameworks. Work on web applications, mobile apps, or desktop software.',
    category: 'Technology',
    requiredSkills: ['JavaScript', 'Python', 'Problem Solving', 'Git', 'Database Management'],
    averageSalary: { min: 65000, max: 130000, currency: 'USD' },
    growthRate: 22,
    educationRequirements: ['undergraduate'],
    workEnvironment: 'Office/Remote',
    jobOutlook: 'Excellent - Much faster than average growth expected',
    relatedCareers: ['Web Developer', 'Mobile App Developer', 'DevOps Engineer'],
    resources: [
      { title: 'JavaScript Fundamentals', url: 'https://javascript.info/', type: 'course' },
      { title: 'Python Programming', url: 'https://python.org/about/gettingstarted/', type: 'course' }
    ]
  },
  {
    title: 'Data Scientist',
    description: 'Analyze complex data sets to identify trends, patterns, and insights that help organizations make data-driven decisions. Use statistical methods and machine learning.',
    category: 'Technology',
    requiredSkills: ['Python', 'R', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization'],
    averageSalary: { min: 85000, max: 165000, currency: 'USD' },
    growthRate: 35,
    educationRequirements: ['graduate'],
    workEnvironment: 'Office/Remote',
    jobOutlook: 'Excellent - Much faster than average growth expected',
    relatedCareers: ['Data Analyst', 'Machine Learning Engineer', 'Business Intelligence Analyst'],
    resources: [
      { title: 'Data Science Fundamentals', url: 'https://www.coursera.org/specializations/data-science', type: 'course' },
      { title: 'Python for Data Science', url: 'https://www.kaggle.com/learn/python', type: 'course' }
    ]
  },
  {
    title: 'UX/UI Designer',
    description: 'Create user-centered designs for digital products, focusing on user experience and interface design. Conduct user research and create wireframes and prototypes.',
    category: 'Design',
    requiredSkills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping', 'Visual Design'],
    averageSalary: { min: 55000, max: 110000, currency: 'USD' },
    growthRate: 13,
    educationRequirements: ['undergraduate'],
    workEnvironment: 'Office/Remote',
    jobOutlook: 'Good - Faster than average growth expected',
    relatedCareers: ['Product Designer', 'Interaction Designer', 'Visual Designer'],
    resources: [
      { title: 'UX Design Fundamentals', url: 'https://www.interaction-design.org/', type: 'course' },
      { title: 'Figma Design Course', url: 'https://www.figma.com/resources/learn-design/', type: 'course' }
    ]
  },
  {
    title: 'Digital Marketing Specialist',
    description: 'Develop and implement digital marketing strategies across various online channels including social media, email, SEO, and paid advertising.',
    category: 'Marketing',
    requiredSkills: ['SEO', 'Social Media Marketing', 'Google Analytics', 'Content Creation', 'PPC Advertising'],
    averageSalary: { min: 45000, max: 85000, currency: 'USD' },
    growthRate: 10,
    educationRequirements: ['undergraduate'],
    workEnvironment: 'Office/Remote',
    jobOutlook: 'Good - Average growth expected',
    relatedCareers: ['Content Marketing Manager', 'SEO Specialist', 'Social Media Manager'],
    resources: [
      { title: 'Google Digital Marketing Course', url: 'https://learndigital.withgoogle.com/', type: 'course' },
      { title: 'HubSpot Marketing Certification', url: 'https://academy.hubspot.com/', type: 'course' }
    ]
  },
  {
    title: 'Cybersecurity Analyst',
    description: 'Protect organizations from cyber threats by monitoring security systems, investigating breaches, and implementing security measures.',
    category: 'Technology',
    requiredSkills: ['Network Security', 'Incident Response', 'Risk Assessment', 'Security Tools', 'Compliance'],
    averageSalary: { min: 70000, max: 140000, currency: 'USD' },
    growthRate: 33,
    educationRequirements: ['undergraduate'],
    workEnvironment: 'Office',
    jobOutlook: 'Excellent - Much faster than average growth expected',
    relatedCareers: ['Information Security Manager', 'Penetration Tester', 'Security Consultant'],
    resources: [
      { title: 'CompTIA Security+ Certification', url: 'https://www.comptia.org/certifications/security', type: 'course' },
      { title: 'Cybersecurity Fundamentals', url: 'https://www.sans.org/cyber-aces/', type: 'course' }
    ]
  },
  {
    title: 'Product Manager',
    description: 'Lead product development from conception to launch, working with cross-functional teams to define product strategy and requirements.',
    category: 'Business',
    requiredSkills: ['Product Strategy', 'Market Research', 'Project Management', 'Data Analysis', 'Communication'],
    averageSalary: { min: 80000, max: 160000, currency: 'USD' },
    growthRate: 19,
    educationRequirements: ['undergraduate'],
    workEnvironment: 'Office/Remote',
    jobOutlook: 'Excellent - Faster than average growth expected',
    relatedCareers: ['Program Manager', 'Business Analyst', 'Strategy Consultant'],
    resources: [
      { title: 'Product Management Fundamentals', url: 'https://www.coursera.org/learn/product-management', type: 'course' },
      { title: 'Agile Product Management', url: 'https://www.scrum.org/resources', type: 'course' }
    ]
  }
];

/**
 * Seed the database with sample career data
 */
export const seedCareers = async () => {
  try {
    console.log('Starting to seed career data...');
    
    const batch = firestore.batch();
    
    for (const career of sampleCareers) {
      const careerData = {
        ...career,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'system'
      };
      
      const docRef = firestore.collection('careers').doc();
      batch.set(docRef, careerData);
    }
    
    await batch.commit();
    console.log(`Successfully seeded ${sampleCareers.length} career paths`);
    
  } catch (error) {
    console.error('Error seeding career data:', error);
    throw error;
  }
};

/**
 * Clear all career data (use with caution)
 */
export const clearCareers = async () => {
  try {
    console.log('Clearing career data...');
    
    const snapshot = await firestore.collection('careers').get();
    const batch = firestore.batch();
    
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    console.log('Career data cleared successfully');
    
  } catch (error) {
    console.error('Error clearing career data:', error);
    throw error;
  }
};

/**
 * Check if careers collection is empty
 */
export const isCareersEmpty = async () => {
  try {
    const snapshot = await firestore.collection('careers').limit(1).get();
    return snapshot.empty;
  } catch (error) {
    console.error('Error checking careers collection:', error);
    return true;
  }
};
