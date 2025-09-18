import express from 'express';
import { firestore } from '../config/firebase.js';
import { authenticateToken, requireAdmin, optionalAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validate, careerPathSchema } from '../middleware/validation.js';

const router = express.Router();

/**
 * GET /api/careers
 * Get all career paths with optional filtering and pagination
 */
router.get('/', optionalAuth, asyncHandler(async (req, res) => {
  const { 
    category, 
    minSalary, 
    maxSalary, 
    educationLevel, 
    page = 1, 
    limit = 20,
    search 
  } = req.query;

  try {
    let query = firestore.collection('careers');

    // Apply filters
    if (category) {
      query = query.where('category', '==', category);
    }

    if (educationLevel) {
      query = query.where('educationRequirements', 'array-contains', educationLevel);
    }

    // Execute query
    const snapshot = await query.get();
    let careers = [];

    snapshot.forEach(doc => {
      careers.push({
        id: doc.id,
        ...doc.data()
      });
    });

    // Apply salary filtering (client-side since Firestore doesn't support range queries on nested objects)
    if (minSalary || maxSalary) {
      careers = careers.filter(career => {
        const salary = career.averageSalary;
        if (minSalary && salary.max < parseInt(minSalary)) return false;
        if (maxSalary && salary.min > parseInt(maxSalary)) return false;
        return true;
      });
    }

    // Apply search filtering
    if (search) {
      const searchLower = search.toLowerCase();
      careers = careers.filter(career => 
        career.title.toLowerCase().includes(searchLower) ||
        career.description.toLowerCase().includes(searchLower) ||
        career.category.toLowerCase().includes(searchLower)
      );
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedCareers = careers.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedCareers,
      pagination: {
        currentPage: parseInt(page),
        totalItems: careers.length,
        totalPages: Math.ceil(careers.length / limit),
        hasNext: endIndex < careers.length,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get careers error:', error);
    throw error;
  }
}));

/**
 * GET /api/careers/:id
 * Get a specific career path by ID
 */
router.get('/:id', optionalAuth, asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const careerDoc = await firestore.collection('careers').doc(id).get();

    if (!careerDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Career path not found'
      });
    }

    const careerData = {
      id: careerDoc.id,
      ...careerDoc.data()
    };

    res.json({
      success: true,
      data: careerData
    });
  } catch (error) {
    console.error('Get career error:', error);
    throw error;
  }
}));

/**
 * POST /api/careers
 * Create a new career path (Admin only)
 */
router.post('/', authenticateToken, requireAdmin, validate(careerPathSchema), asyncHandler(async (req, res) => {
  const careerData = {
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: req.user.uid
  };

  try {
    const docRef = await firestore.collection('careers').add(careerData);

    res.status(201).json({
      success: true,
      message: 'Career path created successfully',
      data: {
        id: docRef.id,
        ...careerData
      }
    });
  } catch (error) {
    console.error('Create career error:', error);
    throw error;
  }
}));

/**
 * PUT /api/careers/:id
 * Update a career path (Admin only)
 */
router.put('/:id', authenticateToken, requireAdmin, validate(careerPathSchema), asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const careerDoc = await firestore.collection('careers').doc(id).get();

    if (!careerDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Career path not found'
      });
    }

    const updateData = {
      ...req.body,
      updatedAt: new Date().toISOString(),
      updatedBy: req.user.uid
    };

    await firestore.collection('careers').doc(id).update(updateData);

    res.json({
      success: true,
      message: 'Career path updated successfully',
      data: {
        id,
        ...updateData
      }
    });
  } catch (error) {
    console.error('Update career error:', error);
    throw error;
  }
}));

/**
 * DELETE /api/careers/:id
 * Delete a career path (Admin only)
 */
router.delete('/:id', authenticateToken, requireAdmin, asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const careerDoc = await firestore.collection('careers').doc(id).get();

    if (!careerDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Career path not found'
      });
    }

    await firestore.collection('careers').doc(id).delete();

    res.json({
      success: true,
      message: 'Career path deleted successfully'
    });
  } catch (error) {
    console.error('Delete career error:', error);
    throw error;
  }
}));

/**
 * GET /api/careers/categories/list
 * Get all unique career categories
 */
router.get('/categories/list', asyncHandler(async (req, res) => {
  try {
    const snapshot = await firestore.collection('careers').get();
    const categories = new Set();

    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.category) {
        categories.add(data.category);
      }
    });

    res.json({
      success: true,
      data: Array.from(categories).sort()
    });
  } catch (error) {
    console.error('Get categories error:', error);
    throw error;
  }
}));

/**
 * GET /api/careers/skills/list
 * Get all unique skills from career paths
 */
router.get('/skills/list', asyncHandler(async (req, res) => {
  try {
    const snapshot = await firestore.collection('careers').get();
    const skills = new Set();

    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.requiredSkills && Array.isArray(data.requiredSkills)) {
        data.requiredSkills.forEach(skill => skills.add(skill));
      }
    });

    res.json({
      success: true,
      data: Array.from(skills).sort()
    });
  } catch (error) {
    console.error('Get skills error:', error);
    throw error;
  }
}));

export default router;
