import express from 'express';
import { firestore } from '../config/firebase.js';
import { authenticateUser } from '../middleware/auth.js';
import { validate, collegeNearbySchema } from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {Object} coord1 - First coordinate {lat, lng}
 * @param {Object} coord2 - Second coordinate {lat, lng}
 * @returns {Number} Distance in kilometers
 */
function calculateDistance(coord1, coord2) {
  const R = 6371; // Earth's radius in km
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
  const dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

/**
 * GET /api/colleges
 * Get all colleges with optional filters
 */
router.get('/', asyncHandler(async (req, res) => {
  try {
    const { course, accreditation } = req.query;
    
    let query = firestore.collection('colleges');
    
    // Apply filters if provided
    if (course) {
      query = query.where('courses', 'array-contains', course);
    }
    
    if (accreditation) {
      query = query.where('accreditation', '==', accreditation);
    }
    
    const snapshot = await query.get();
    const colleges = [];
    
    snapshot.forEach(doc => {
      colleges.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.json({
      success: true,
      data: colleges,
      count: colleges.length
    });
  } catch (error) {
    console.error('Error fetching colleges:', error);
    throw error;
  }
}));

/**
 * GET /api/colleges/:id
 * Get college by ID
 */
router.get('/:id', asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const collegeDoc = await firestore.collection('colleges').doc(id).get();
    
    if (!collegeDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'College not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        id: collegeDoc.id,
        ...collegeDoc.data()
      }
    });
  } catch (error) {
    console.error('Error fetching college:', error);
    throw error;
  }
}));

/**
 * POST /api/colleges/nearby
 * Get colleges near a location that offer courses related to a career field
 */
router.post('/nearby', authenticateUser, validate(collegeNearbySchema), asyncHandler(async (req, res) => {
  try {
    const { lat, lng, careerField } = req.body;
    const userLocation = { lat, lng };
    
    // Get all colleges
    const collegesSnapshot = await firestore.collection('colleges').get();
    const colleges = [];
    
    collegesSnapshot.forEach(doc => {
      colleges.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Filter colleges by distance and career field
    const nearbyColleges = colleges
      .filter(college => {
        // Check if college has courses related to the career field
        const hasRelevantCourses = college.courses.some(course => {
          return course.toLowerCase().includes(careerField.toLowerCase());
        });
        
        // Calculate distance
        const distance = calculateDistance(userLocation, college.location);
        
        // Return colleges within 50km that have relevant courses
        return distance <= 50 && hasRelevantCourses;
      })
      .map(college => {
        const distance = calculateDistance(userLocation, college.location);
        return {
          ...college,
          distance: Math.round(distance * 10) / 10 // Round to 1 decimal place
        };
      })
      .sort((a, b) => a.distance - b.distance);
    
    res.json({
      success: true,
      data: nearbyColleges,
      count: nearbyColleges.length
    });
  } catch (error) {
    console.error('Error finding nearby colleges:', error);
    throw error;
  }
}));

export default router;