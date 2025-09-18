import Joi from 'joi';

/**
 * Validation middleware factory
 * Creates middleware to validate request data against Joi schemas
 */
export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      });
    }
    
    next();
  };
};

/**
 * User registration validation schema
 */
export const userRegistrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).max(50).required(),
  educationLevel: Joi.string().valid('high_school', 'undergraduate', 'graduate', 'postgraduate').optional(),
  interests: Joi.array().items(Joi.string()).optional()
});

/**
 * User profile update validation schema
 */
export const userProfileSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  educationLevel: Joi.string().valid('high_school', 'undergraduate', 'graduate', 'postgraduate').optional(),
  interests: Joi.array().items(Joi.string()).optional(),
  skills: Joi.array().items(Joi.string()).optional(),
  preferences: Joi.object().optional()
});

/**
 * Career path validation schema
 */
export const careerPathSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  category: Joi.string().required(),
  requiredSkills: Joi.array().items(Joi.string()).required(),
  averageSalary: Joi.object({
    min: Joi.number().positive().required(),
    max: Joi.number().positive().required(),
    currency: Joi.string().default('USD')
  }).required(),
  growthRate: Joi.number().min(0).max(100).required(),
  educationRequirements: Joi.array().items(Joi.string()).required(),
  workEnvironment: Joi.string().required(),
  jobOutlook: Joi.string().required(),
  relatedCareers: Joi.array().items(Joi.string()).optional(),
  resources: Joi.array().items(Joi.object({
    title: Joi.string().required(),
    url: Joi.string().uri().required(),
    type: Joi.string().valid('course', 'article', 'video', 'book').required()
  })).optional()
});

/**
 * Recommendation request validation schema
 */
export const recommendationSchema = Joi.object({
  interests: Joi.array().items(Joi.string()).min(1).required(),
  skills: Joi.array().items(Joi.string()).optional(),
  educationLevel: Joi.string().valid('high_school', 'undergraduate', 'graduate', 'postgraduate').optional(),
  preferences: Joi.object({
    workEnvironment: Joi.string().optional(),
    salaryRange: Joi.object({
      min: Joi.number().positive().optional(),
      max: Joi.number().positive().optional()
    }).optional(),
    location: Joi.string().optional()
  }).optional()
});

/**
 * Quiz result validation schema
 */
export const quizResultSchema = Joi.object({
  answers: Joi.array().items(Joi.object({
    questionId: Joi.string().required(),
    answer: Joi.alternatives().try(Joi.string(), Joi.number(), Joi.array()).required()
  })).min(1).required(),
  completedAt: Joi.date().iso().optional()
});
