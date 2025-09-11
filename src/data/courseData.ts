export interface Course {
  id: string;
  name: string;
  stream: string;
  duration: string;
  description: string;
  eligibility: string[];
  careerPaths: CareerPath[];
  averageSalary: string;
  topColleges: string[];
}

export interface CareerPath {
  title: string;
  description: string;
  growthRate: string;
  skills: string[];
}

export const coursesData: Course[] = [
  // Science Stream Courses
  {
    id: 'btech-cs',
    name: 'B.Tech Computer Science',
    stream: 'science',
    duration: '4 years',
    description: 'Comprehensive program covering software development, algorithms, and computer systems.',
    eligibility: ['12th with PCM', 'JEE Main/Advanced'],
    careerPaths: [
      {
        title: 'Software Engineer',
        description: 'Design and develop software applications and systems',
        growthRate: '22%',
        skills: ['Programming', 'Problem Solving', 'System Design']
      },
      {
        title: 'Data Scientist',
        description: 'Analyze complex data to help organizations make decisions',
        growthRate: '35%',
        skills: ['Statistics', 'Machine Learning', 'Python/R']
      },
      {
        title: 'Product Manager',
        description: 'Lead product development and strategy',
        growthRate: '19%',
        skills: ['Leadership', 'Analytics', 'Communication']
      }
    ],
    averageSalary: '₹8-25 LPA',
    topColleges: ['IIT Delhi', 'IIT Bombay', 'BITS Pilani', 'NIT Trichy']
  },
  {
    id: 'mbbs',
    name: 'MBBS (Medicine)',
    stream: 'science',
    duration: '5.5 years',
    description: 'Medical degree program to become a licensed doctor.',
    eligibility: ['12th with PCB', 'NEET UG'],
    careerPaths: [
      {
        title: 'General Physician',
        description: 'Provide primary healthcare and medical consultation',
        growthRate: '7%',
        skills: ['Medical Knowledge', 'Empathy', 'Decision Making']
      },
      {
        title: 'Specialist Doctor',
        description: 'Specialize in specific medical fields',
        growthRate: '8%',
        skills: ['Specialized Knowledge', 'Precision', 'Continuous Learning']
      },
      {
        title: 'Medical Researcher',
        description: 'Conduct research to advance medical science',
        growthRate: '6%',
        skills: ['Research Methods', 'Critical Thinking', 'Scientific Writing']
      }
    ],
    averageSalary: '₹6-50 LPA',
    topColleges: ['AIIMS Delhi', 'CMC Vellore', 'JIPMER', 'KGMU']
  },
  // Commerce Stream Courses
  {
    id: 'bcom',
    name: 'B.Com (Commerce)',
    stream: 'commerce',
    duration: '3 years',
    description: 'Undergraduate program covering accounting, finance, and business studies.',
    eligibility: ['12th with Commerce/Any Stream'],
    careerPaths: [
      {
        title: 'Chartered Accountant',
        description: 'Provide accounting and financial advisory services',
        growthRate: '10%',
        skills: ['Accounting', 'Tax Knowledge', 'Analytical Skills']
      },
      {
        title: 'Financial Analyst',
        description: 'Analyze financial data and market trends',
        growthRate: '15%',
        skills: ['Financial Modeling', 'Excel', 'Market Analysis']
      },
      {
        title: 'Business Manager',
        description: 'Manage business operations and strategy',
        growthRate: '12%',
        skills: ['Leadership', 'Strategic Planning', 'Communication']
      }
    ],
    averageSalary: '₹3-15 LPA',
    topColleges: ['SRCC', 'LSR', 'Hindu College', 'Loyola College']
  },
  {
    id: 'bba',
    name: 'BBA (Business Administration)',
    stream: 'commerce',
    duration: '3 years',
    description: 'Management program focusing on business fundamentals and leadership.',
    eligibility: ['12th Any Stream'],
    careerPaths: [
      {
        title: 'Marketing Manager',
        description: 'Develop and execute marketing strategies',
        growthRate: '18%',
        skills: ['Digital Marketing', 'Brand Management', 'Analytics']
      },
      {
        title: 'Operations Manager',
        description: 'Oversee daily business operations',
        growthRate: '14%',
        skills: ['Process Optimization', 'Team Management', 'Problem Solving']
      },
      {
        title: 'Entrepreneur',
        description: 'Start and manage your own business',
        growthRate: '25%',
        skills: ['Innovation', 'Risk Management', 'Networking']
      }
    ],
    averageSalary: '₹4-18 LPA',
    topColleges: ['Christ University', 'Symbiosis', 'NMIMS', 'Amity University']
  },
  // Arts Stream Courses
  {
    id: 'ba-psychology',
    name: 'BA Psychology',
    stream: 'arts',
    duration: '3 years',
    description: 'Study of human behavior, mind, and mental processes.',
    eligibility: ['12th Any Stream'],
    careerPaths: [
      {
        title: 'Clinical Psychologist',
        description: 'Provide therapy and mental health treatment',
        growthRate: '14%',
        skills: ['Counseling', 'Empathy', 'Assessment Skills']
      },
      {
        title: 'HR Specialist',
        description: 'Manage human resources and organizational behavior',
        growthRate: '16%',
        skills: ['People Management', 'Communication', 'Conflict Resolution']
      },
      {
        title: 'Research Psychologist',
        description: 'Conduct psychological research and studies',
        growthRate: '8%',
        skills: ['Research Methods', 'Statistical Analysis', 'Scientific Writing']
      }
    ],
    averageSalary: '₹3-12 LPA',
    topColleges: ['JNU', 'BHU', 'Jamia Millia', 'Christ University']
  },
  {
    id: 'bjmc',
    name: 'BJMC (Journalism)',
    stream: 'arts',
    duration: '3 years',
    description: 'Mass communication and journalism program.',
    eligibility: ['12th Any Stream'],
    careerPaths: [
      {
        title: 'Journalist',
        description: 'Report news and create content for media',
        growthRate: '6%',
        skills: ['Writing', 'Research', 'Communication']
      },
      {
        title: 'Content Creator',
        description: 'Create digital content for various platforms',
        growthRate: '25%',
        skills: ['Creative Writing', 'Social Media', 'Video Production']
      },
      {
        title: 'Public Relations Manager',
        description: 'Manage public image and communications',
        growthRate: '11%',
        skills: ['Strategic Communication', 'Media Relations', 'Crisis Management']
      }
    ],
    averageSalary: '₹2.5-10 LPA',
    topColleges: ['IIMC', 'Jamia Millia', 'Xavier Institute', 'Symbiosis']
  },
  // Vocational Courses
  {
    id: 'diploma-cs',
    name: 'Diploma in Computer Science',
    stream: 'vocational',
    duration: '3 years',
    description: 'Practical computer science program with hands-on training.',
    eligibility: ['10th Pass'],
    careerPaths: [
      {
        title: 'Web Developer',
        description: 'Build and maintain websites and web applications',
        growthRate: '20%',
        skills: ['HTML/CSS', 'JavaScript', 'Frameworks']
      },
      {
        title: 'Technical Support',
        description: 'Provide technical assistance and troubleshooting',
        growthRate: '12%',
        skills: ['Problem Solving', 'Communication', 'Technical Knowledge']
      },
      {
        title: 'System Administrator',
        description: 'Manage computer systems and networks',
        growthRate: '15%',
        skills: ['Networking', 'System Management', 'Security']
      }
    ],
    averageSalary: '₹2-8 LPA',
    topColleges: ['Government Polytechnics', 'Private Technical Institutes']
  },
  {
    id: 'hotel-management',
    name: 'Hotel Management',
    stream: 'vocational',
    duration: '3-4 years',
    description: 'Hospitality and hotel operations management program.',
    eligibility: ['12th Any Stream'],
    careerPaths: [
      {
        title: 'Hotel Manager',
        description: 'Oversee hotel operations and guest services',
        growthRate: '10%',
        skills: ['Customer Service', 'Operations Management', 'Leadership']
      },
      {
        title: 'Event Manager',
        description: 'Plan and execute events and conferences',
        growthRate: '18%',
        skills: ['Event Planning', 'Coordination', 'Vendor Management']
      },
      {
        title: 'Restaurant Manager',
        description: 'Manage restaurant operations and staff',
        growthRate: '12%',
        skills: ['Food Service', 'Team Management', 'Customer Relations']
      }
    ],
    averageSalary: '₹2.5-12 LPA',
    topColleges: ['IHM Delhi', 'IHM Mumbai', 'Welcomgroup Graduate School']
  }
];

export const getCoursesbyStream = (stream: string): Course[] => {
  return coursesData.filter(course => course.stream === stream);
};

export const getCourseById = (id: string): Course | undefined => {
  return coursesData.find(course => course.id === id);
};
