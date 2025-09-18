/**
 * Career mapping data for the recommendation engine
 */

export const careerMappings = [
  {
    careerId: 'eng01',
    careerName: 'Engineering',
    requiredTraits: {
      personality: { min: 20 },
      academic: { min: 25 },
      interests: { min: 15 }
    }
  },
  {
    careerId: 'med01',
    careerName: 'Medicine',
    requiredTraits: {
      personality: { min: 18 },
      academic: { min: 27 },
      interests: { min: 20 }
    }
  },
  {
    careerId: 'bus01',
    careerName: 'Business',
    requiredTraits: {
      personality: { min: 25 },
      academic: { min: 15 },
      interests: { min: 20 }
    }
  },
  {
    careerId: 'art01',
    careerName: 'Arts',
    requiredTraits: {
      personality: { min: 15 },
      academic: { min: 10 },
      interests: { min: 30 }
    }
  },
  {
    careerId: 'tech01',
    careerName: 'Technology',
    requiredTraits: {
      personality: { min: 20 },
      academic: { min: 20 },
      interests: { min: 25 }
    }
  },
  {
    careerId: 'law01',
    careerName: 'Law',
    requiredTraits: {
      personality: { min: 22 },
      academic: { min: 23 },
      interests: { min: 18 }
    }
  },
  {
    careerId: 'edu01',
    careerName: 'Education',
    requiredTraits: {
      personality: { min: 25 },
      academic: { min: 18 },
      interests: { min: 22 }
    }
  }
];

/**
 * Seeds the career mappings into Firestore
 * @param {Object} firestore - Firestore instance
 * @returns {Promise<void>}
 */
export const seedCareerMappings = async (firestore) => {
  try {
    const batch = firestore.batch();
    
    // Check if mappings already exist
    const existingMappings = await firestore.collection('careerMappings').get();
    
    if (!existingMappings.empty) {
      console.log('Career mappings already exist in the database');
      return;
    }
    
    // Add each mapping to the batch
    careerMappings.forEach(mapping => {
      const docRef = firestore.collection('careerMappings').doc(mapping.careerId);
      batch.set(docRef, mapping);
    });
    
    // Commit the batch
    await batch.commit();
    
    console.log(`Successfully seeded ${careerMappings.length} career mappings`);
  } catch (error) {
    console.error('Error seeding career mappings:', error);
    throw error;
  }
};