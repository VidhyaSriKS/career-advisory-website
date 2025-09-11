export interface College {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  type: 'government' | 'private' | 'deemed';
  streams: string[];
  courses: string[];
  facilities: string[];
  cutoff: {
    general: number;
    obc: number;
    sc: number;
    st: number;
  };
  fees: {
    annual: string;
    hostel: string;
  };
  rating: number;
  established: number;
  website: string;
  contact: {
    phone: string;
    email: string;
  };
  admissionProcess: string[];
  placements: {
    averagePackage: string;
    topRecruiters: string[];
  };
}

export const collegesData: College[] = [
  {
    id: 'iit-delhi',
    name: 'Indian Institute of Technology Delhi',
    location: {
      city: 'New Delhi',
      state: 'Delhi',
      coordinates: { lat: 28.5449, lng: 77.1928 }
    },
    type: 'government',
    streams: ['science'],
    courses: ['B.Tech', 'M.Tech', 'PhD'],
    facilities: ['Library', 'Hostel', 'Sports Complex', 'Research Labs', 'WiFi Campus'],
    cutoff: {
      general: 95,
      obc: 92,
      sc: 85,
      st: 80
    },
    fees: {
      annual: '₹2.5 Lakhs',
      hostel: '₹25,000'
    },
    rating: 4.8,
    established: 1961,
    website: 'https://home.iitd.ac.in',
    contact: {
      phone: '+91-11-2659-1000',
      email: 'info@admin.iitd.ac.in'
    },
    admissionProcess: ['JEE Advanced', 'JoSAA Counselling'],
    placements: {
      averagePackage: '₹18 LPA',
      topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs']
    }
  },
  {
    id: 'srcc',
    name: 'Shri Ram College of Commerce',
    location: {
      city: 'New Delhi',
      state: 'Delhi',
      coordinates: { lat: 28.6854, lng: 77.2081 }
    },
    type: 'government',
    streams: ['commerce'],
    courses: ['B.Com (Hons)', 'B.A. Economics (Hons)', 'M.Com'],
    facilities: ['Library', 'Computer Lab', 'Auditorium', 'Sports Facilities', 'Canteen'],
    cutoff: {
      general: 98.75,
      obc: 97.5,
      sc: 95,
      st: 92
    },
    fees: {
      annual: '₹15,000',
      hostel: 'Day College'
    },
    rating: 4.6,
    established: 1926,
    website: 'https://www.srcc.du.ac.in',
    contact: {
      phone: '+91-11-2766-7601',
      email: 'principal@srcc.du.ac.in'
    },
    admissionProcess: ['CUET UG', 'DU Admission'],
    placements: {
      averagePackage: '₹8 LPA',
      topRecruiters: ['Deloitte', 'EY', 'KPMG', 'JP Morgan']
    }
  },
  {
    id: 'jnu',
    name: 'Jawaharlal Nehru University',
    location: {
      city: 'New Delhi',
      state: 'Delhi',
      coordinates: { lat: 28.5383, lng: 77.1641 }
    },
    type: 'government',
    streams: ['arts', 'science'],
    courses: ['BA', 'MA', 'M.Phil', 'PhD'],
    facilities: ['Central Library', 'Hostels', 'Health Centre', 'Sports Complex', 'Cultural Centers'],
    cutoff: {
      general: 85,
      obc: 80,
      sc: 75,
      st: 70
    },
    fees: {
      annual: '₹5,000',
      hostel: '₹1,200'
    },
    rating: 4.4,
    established: 1969,
    website: 'https://www.jnu.ac.in',
    contact: {
      phone: '+91-11-2670-4000',
      email: 'info@jnu.ac.in'
    },
    admissionProcess: ['JNUEE', 'Merit Based'],
    placements: {
      averagePackage: '₹6 LPA',
      topRecruiters: ['Civil Services', 'Media Houses', 'NGOs', 'Research Institutes']
    }
  },
  {
    id: 'bits-pilani',
    name: 'BITS Pilani',
    location: {
      city: 'Pilani',
      state: 'Rajasthan',
      coordinates: { lat: 28.3670, lng: 75.5880 }
    },
    type: 'deemed',
    streams: ['science'],
    courses: ['B.E.', 'M.E.', 'M.Sc.', 'PhD'],
    facilities: ['Digital Library', 'Hostels', 'Sports Complex', 'Innovation Labs', 'Cafeterias'],
    cutoff: {
      general: 320,
      obc: 310,
      sc: 280,
      st: 270
    },
    fees: {
      annual: '₹4.5 Lakhs',
      hostel: '₹80,000'
    },
    rating: 4.7,
    established: 1964,
    website: 'https://www.bits-pilani.ac.in',
    contact: {
      phone: '+91-1596-242-204',
      email: 'info@pilani.bits-pilani.ac.in'
    },
    admissionProcess: ['BITSAT'],
    placements: {
      averagePackage: '₹15 LPA',
      topRecruiters: ['Microsoft', 'Google', 'Amazon', 'Flipkart']
    }
  },
  {
    id: 'christ-university',
    name: 'Christ University',
    location: {
      city: 'Bangalore',
      state: 'Karnataka',
      coordinates: { lat: 12.9342, lng: 77.6101 }
    },
    type: 'deemed',
    streams: ['commerce', 'arts', 'science'],
    courses: ['BBA', 'BCA', 'B.Com', 'BA', 'B.Sc'],
    facilities: ['Library', 'Hostels', 'Sports Complex', 'Auditorium', 'Computer Labs'],
    cutoff: {
      general: 80,
      obc: 75,
      sc: 70,
      st: 65
    },
    fees: {
      annual: '₹2.5 Lakhs',
      hostel: '₹1.2 Lakhs'
    },
    rating: 4.3,
    established: 1969,
    website: 'https://christuniversity.in',
    contact: {
      phone: '+91-80-4012-9100',
      email: 'info@christuniversity.in'
    },
    admissionProcess: ['Christ University Entrance Test', 'Merit Based'],
    placements: {
      averagePackage: '₹6 LPA',
      topRecruiters: ['Infosys', 'TCS', 'Wipro', 'Accenture']
    }
  },
  {
    id: 'nit-trichy',
    name: 'National Institute of Technology Tiruchirappalli',
    location: {
      city: 'Tiruchirappalli',
      state: 'Tamil Nadu',
      coordinates: { lat: 10.7590, lng: 78.8147 }
    },
    type: 'government',
    streams: ['science'],
    courses: ['B.Tech', 'M.Tech', 'MBA', 'PhD'],
    facilities: ['Central Library', 'Hostels', 'Sports Complex', 'Medical Centre', 'Labs'],
    cutoff: {
      general: 92,
      obc: 88,
      sc: 82,
      st: 78
    },
    fees: {
      annual: '₹1.8 Lakhs',
      hostel: '₹35,000'
    },
    rating: 4.5,
    established: 1964,
    website: 'https://www.nitt.edu',
    contact: {
      phone: '+91-431-250-3000',
      email: 'director@nitt.edu'
    },
    admissionProcess: ['JEE Main', 'JoSAA Counselling'],
    placements: {
      averagePackage: '₹12 LPA',
      topRecruiters: ['Microsoft', 'Google', 'Samsung', 'Intel']
    }
  },
  {
    id: 'govt-polytechnic-mumbai',
    name: 'Government Polytechnic Mumbai',
    location: {
      city: 'Mumbai',
      state: 'Maharashtra',
      coordinates: { lat: 19.0330, lng: 72.8570 }
    },
    type: 'government',
    streams: ['vocational'],
    courses: ['Diploma in Engineering', 'Diploma in Computer Science', 'Diploma in Mechanical'],
    facilities: ['Workshops', 'Computer Labs', 'Library', 'Placement Cell', 'Canteen'],
    cutoff: {
      general: 75,
      obc: 70,
      sc: 65,
      st: 60
    },
    fees: {
      annual: '₹25,000',
      hostel: '₹40,000'
    },
    rating: 4.0,
    established: 1946,
    website: 'https://gpmumbai.ac.in',
    contact: {
      phone: '+91-22-2410-2174',
      email: 'principal@gpmumbai.ac.in'
    },
    admissionProcess: ['State CET', 'Merit Based'],
    placements: {
      averagePackage: '₹3.5 LPA',
      topRecruiters: ['L&T', 'Tata Motors', 'Mahindra', 'Bajaj Auto']
    }
  },
  {
    id: 'iim-mumbai',
    name: 'Indian Institute of Hotel Management Mumbai',
    location: {
      city: 'Mumbai',
      state: 'Maharashtra',
      coordinates: { lat: 19.0760, lng: 72.8777 }
    },
    type: 'government',
    streams: ['vocational'],
    courses: ['B.Sc. Hospitality', 'Diploma in Hotel Management', 'Certificate Courses'],
    facilities: ['Training Kitchen', 'Restaurant', 'Housekeeping Lab', 'Computer Lab', 'Library'],
    cutoff: {
      general: 70,
      obc: 65,
      sc: 60,
      st: 55
    },
    fees: {
      annual: '₹1.5 Lakhs',
      hostel: '₹80,000'
    },
    rating: 4.2,
    established: 1962,
    website: 'https://ihmmumbai.gov.in',
    contact: {
      phone: '+91-22-2620-4627',
      email: 'principal@ihmmumbai.gov.in'
    },
    admissionProcess: ['NCHM JEE', 'State Level Counselling'],
    placements: {
      averagePackage: '₹4 LPA',
      topRecruiters: ['Taj Hotels', 'Oberoi Group', 'Marriott', 'Hyatt']
    }
  }
];

export const getCollegesByStream = (stream: string): College[] => {
  return collegesData.filter(college => college.streams.includes(stream));
};

export const getCollegesByLocation = (state: string): College[] => {
  return collegesData.filter(college => 
    college.location.state.toLowerCase().includes(state.toLowerCase())
  );
};

export const searchColleges = (query: string): College[] => {
  const searchTerm = query.toLowerCase();
  return collegesData.filter(college => 
    college.name.toLowerCase().includes(searchTerm) ||
    college.location.city.toLowerCase().includes(searchTerm) ||
    college.location.state.toLowerCase().includes(searchTerm) ||
    college.courses.some(course => course.toLowerCase().includes(searchTerm))
  );
};
