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
  // Namakkal District Colleges
  {
    id: 'ksriet-namakkal',
    name: 'K.S.R. Institute for Engineering and Technology',
    location: { city: 'Tiruchengode', state: 'Tamil Nadu', coordinates: { lat: 11.3800, lng: 77.8000 } },
    type: 'private',
    streams: ['engineering'],
    courses: ['B.E.', 'B.Tech', 'M.E.', 'Ph.D.'],
    facilities: ['Library', 'Hostel', 'WiFi Campus', 'Sports Complex', 'Transport'],
    cutoff: { general: 78, obc: 75, sc: 70, st: 65 },
    fees: { annual: '₹50,000', hostel: '₹40,000' },
    rating: 4.1,
    established: 2011,
    website: 'https://ksriet.ac.in',
    contact: { phone: '+91-4288-274741', email: 'info@ksriet.ac.in' },
    admissionProcess: ['TNEA', 'Counseling'],
    placements: { averagePackage: '₹3.2 LPA', topRecruiters: ['Infosys', 'TCS', 'Wipro'] }
  },
  {
    id: 'maec-namakkal',
    name: 'Mahendra Engineering College',
    location: { city: 'Tiruchengode', state: 'Tamil Nadu', coordinates: { lat: 11.3810, lng: 77.8490 } },
    type: 'private',
    streams: ['engineering'],
    courses: ['B.E.', 'B.Tech', 'M.E.', 'MBA'],
    facilities: ['Library', 'Hostel', 'Cafeteria', 'Sports Complex'],
    cutoff: { general: 72, obc: 68, sc: 63, st: 60 },
    fees: { annual: '₹55,000', hostel: '₹35,000' },
    rating: 3.9,
    established: 1999,
    website: 'http://www.mahendra.info',
    contact: { phone: '+91-4288-288500', email: 'info@mahendra.info' },
    admissionProcess: ['TNEA', 'Management Quota'],
    placements: { averagePackage: '₹2.8 LPA', topRecruiters: ['CTS', 'Infosys', 'Tech Mahindra'] }
  },
  {
    id: 'mec-namakkal',
    name: 'Muthayammal Engineering College',
    location: { city: 'Rasipuram', state: 'Tamil Nadu', coordinates: { lat: 11.5244, lng: 78.1541 } },
    type: 'private',
    streams: ['engineering', 'management'],
    courses: ['B.E.', 'B.Tech', 'M.E.', 'MBA'],
    facilities: ['Library', 'Hostel', 'WiFi', 'Labs', 'Sports Complex'],
    cutoff: { general: 75, obc: 70, sc: 65, st: 60 },
    fees: { annual: '₹60,000', hostel: '₹40,000' },
    rating: 4.0,
    established: 2000,
    website: 'https://mec.edu.in',
    contact: { phone: '+91-4288-225555', email: 'principal@mec.edu.in' },
    admissionProcess: ['TNEA', 'Counseling'],
    placements: { averagePackage: '₹3.0 LPA', topRecruiters: ['TCS', 'Infosys', 'Wipro'] }
  },
  {
    id: 'excel-college-namakkal',
    name: 'Excel Engineering College',
    location: { city: 'Namakkal', state: 'Tamil Nadu', coordinates: { lat: 11.4198, lng: 78.1649 } },
    type: 'private',
    streams: ['engineering'],
    courses: ['B.E.', 'B.Tech'],
    facilities: ['Library', 'Hostel', 'Transport', 'Sports Complex'],
    cutoff: { general: 70, obc: 65, sc: 60, st: 55 },
    fees: { annual: '₹45,000', hostel: '₹32,000' },
    rating: 3.7,
    established: 2005,
    website: 'http://excelcollege.edu.in',
    contact: { phone: '+91-4288-123456', email: 'office@excelcollege.edu.in' },
    admissionProcess: ['TNEA'],
    placements: { averagePackage: '₹2.5 LPA', topRecruiters: ['Infosys', 'CTS', 'Mindtree'] }
  },
  {
    id: 'paavai-engg-namakkal',
    name: 'Paavai Engineering College',
    location: { city: 'Namakkal', state: 'Tamil Nadu', coordinates: { lat: 11.4346, lng: 78.1870 } },
    type: 'private',
    streams: ['engineering', 'management'],
    courses: ['B.E.', 'B.Tech', 'MBA', 'MCA'],
    facilities: ['Library', 'Hostel', 'WiFi Campus', 'Sports Complex', 'Cafeteria'],
    cutoff: { general: 77, obc: 73, sc: 68, st: 63 },
    fees: { annual: '₹60,000', hostel: '₹40,000' },
    rating: 4.0,
    established: 2001,
    website: 'https://pec.paavai.edu.in',
    contact: { phone: '+91-4286-243038', email: 'principal@paavai.edu.in' },
    admissionProcess: ['TNEA'],
    placements: { averagePackage: '₹3.1 LPA', topRecruiters: ['TCS', 'Infosys', 'Amazon'] }
  },
  {
    id: 'gct-namakkal',
    name: 'Gnanamani College of Technology',
    location: { city: 'Namakkal', state: 'Tamil Nadu', coordinates: { lat: 11.4190, lng: 78.1960 } },
    type: 'private',
    streams: ['engineering'],
    courses: ['B.E.', 'M.E.'],
    facilities: ['Library', 'Hostel', 'Sports Facilities'],
    cutoff: { general: 68, obc: 65, sc: 61, st: 58 },
    fees: { annual: '₹38,000', hostel: '₹28,000' },
    rating: 3.8,
    established: 1996,
    website: 'https://gct.org.in',
    contact: { phone: '+91-4286-222222', email: 'info@gct.org.in' },
    admissionProcess: ['TNEA'],
    placements: { averagePackage: '₹3.0 LPA', topRecruiters: ['Cognizant', 'HCL', 'Infosys'] }
  },
  {
    id: 'annai-msheela-namakkal',
    name: 'Annai Mathammal Sheela Engineering College',
    location: { city: 'Namakkal', state: 'Tamil Nadu', coordinates: { lat: 11.4020, lng: 78.2050 } },
    type: 'private',
    streams: ['engineering'],
    courses: ['B.E.', 'B.Tech'],
    facilities: ['Library', 'Hostel', 'Cafeteria'],
    cutoff: { general: 65, obc: 60, sc: 55, st: 50 },
    fees: { annual: '₹35,000', hostel: '₹25,000' },
    rating: 3.5,
    established: 2002,
    website: 'http://annaimathammalsheela.ac.in',
    contact: { phone: '+91-4288-278000', email: 'principal@amsheela.ac.in' },
    admissionProcess: ['TNEA'],
    placements: { averagePackage: '₹2.3 LPA', topRecruiters: ['Infosys', 'Tech Mahindra'] }
  },
  {
    id: 'ssm-college-namakkal',
    name: 'SSM College of Engineering',
    location: { city: 'Komarapalayam', state: 'Tamil Nadu', coordinates: { lat: 11.3230, lng: 77.7540 } },
    type: 'private',
    streams: ['engineering'],
    courses: ['B.E.', 'B.Tech'],
    facilities: ['Library', 'Hostel'],
    cutoff: { general: 62, obc: 58, sc: 54, st: 50 },
    fees: { annual: '₹30,000', hostel: '₹20,000' },
    rating: 2.5,
    established: 2004,
    website: 'http://ssmcollege.edu.in',
    contact: { phone: '+91-4288-277777', email: 'info@ssmcollege.edu.in' },
    admissionProcess: ['TNEA'],
    placements: { averagePackage: '₹1.8 LPA', topRecruiters: ['Local companies'] }
  },
  {
    id: 'jkk-college-namakkal',
    name: 'J.K.K. Nataraja College of Engineering and Technology',
    location: { city: 'Komarapalayam', state: 'Tamil Nadu', coordinates: { lat: 11.3220, lng: 77.7550 } },
    type: 'private',
    streams: ['engineering'],
    courses: ['B.E.', 'B.Tech', 'M.E.'],
    facilities: ['Library', 'Hostel', 'Sports Complex', 'Labs'],
    cutoff: { general: 70, obc: 66, sc: 62, st: 58 },
    fees: { annual: '₹55,000', hostel: '₹40,000' },
    rating: 4.0,
    established: 2000,
    website: 'https://jkkni.edu.in',
    contact: { phone: '+91-4287-277999', email: 'info@jkkni.edu.in' },
    admissionProcess: ['TNEA'],
    placements: { averagePackage: '₹3.5 LPA', topRecruiters: ['Amazon', 'Infosys', 'TCS'] }
  },


  // Erode District Colleges
  {
    id: 'kongu-engg-erode',
    name: 'Kongu Engineering College',
    location: { city: 'Perundurai', state: 'Tamil Nadu', coordinates: { lat: 11.3640, lng: 77.6070 } },
    type: 'private',
    streams: ['engineering'],
    courses: ['B.E.', 'B.Tech', 'M.E.', 'MBA'],
    facilities: ['Library', 'Hostel', 'Sports Complex', 'WiFi Campus', 'Cafeteria'],
    cutoff: { general: 80, obc: 78, sc: 75, st: 72 },
    fees: { annual: '₹65,000', hostel: '₹40,000' },
    rating: 4.1,
    established: 1984,
    website: 'https://kongu.ac.in',
    contact: { phone: '+91-4233-223344', email: 'info@kongu.ac.in' },
    admissionProcess: ['TNEA', 'Management Quota'],
    placements: { averagePackage: '₹4.5 LPA', topRecruiters: ['Infosys', 'TCS', 'Wipro'] }
  },
  {
    id: 'bannari-amman-inst',
    name: 'Bannari Amman Institute of Technology',
    location: { city: 'Sathyamangalam', state: 'Tamil Nadu', coordinates: { lat: 11.5190, lng: 77.3550 } },
    type: 'private',
    streams: ['engineering'],
    courses: ['B.E.', 'B.Tech', 'M.E.'],
    facilities: ['Library', 'Hostel', 'Transport', 'Sports Complex'],
    cutoff: { general: 78, obc: 75, sc: 70, st: 65 },
    fees: { annual: '₹58,000', hostel: '₹38,000' },
    rating: 3.9,
    established: 1996,
    website: 'https://bannariammangroup.com',
    contact: { phone: '+91-4269-230400', email: 'info@bannariammangroup.com' },
    admissionProcess: ['TNEA'],
    placements: { averagePackage: '₹4.3 LPA', topRecruiters: ['Cognizant', 'Infosys', 'TechMahindra'] }
  },
  {
    id: 'nandha-engg-erode',
    name: 'Nandha Engineering College',
    location: { city: 'Erode', state: 'Tamil Nadu', coordinates: { lat: 11.3110, lng: 77.6290 } },
    type: 'private',
    streams: ['engineering', 'management'],
    courses: ['B.E.', 'B.Tech', 'M.E.', 'MBA', 'MCA'],
    facilities: ['Library', 'Hostel', 'Sports Complex', 'Labs', 'Cafeteria'],
    cutoff: { general: 75, obc: 70, sc: 65, st: 60 },
    fees: { annual: '₹70,000', hostel: '₹50,000' },
    rating: 4.2,
    established: 2001,
    website: 'https://nandhaengg.org',
    contact: { phone: '+91-424-2770266', email: 'principal@nandhaengg.org' },
    admissionProcess: ['TNEA'],
    placements: { averagePackage: '₹4.5 LPA', topRecruiters: ['Cognizant', 'Wipro', 'TCS', 'Infosys'] }
  },
  {
    id: 'nandha-tech-erode',
    name: 'Nandha College of Technology',
    location: { city: 'Erode', state: 'Tamil Nadu', coordinates: { lat: 11.3141, lng: 77.6339 } },
    type: 'private',
    streams: ['engineering'],
    courses: ['B.E.', 'B.Tech'],
    facilities: ['Library', 'Hostel', 'Cafeteria', 'Transport', 'Labs'],
    cutoff: { general: 70, obc: 65, sc: 60, st: 55 },
    fees: { annual: '₹55,000', hostel: '₹45,000' },
    rating: 4.1,
    established: 2008,
    website: 'https://nandhatech.org',
    contact: { phone: '+91-4244-553355', email: 'contact@nandhatech.org' },
    admissionProcess: ['TNEA'],
    placements: { averagePackage: '₹3 LPA', topRecruiters: ['Infosys', 'Hexaware', 'Capgemini'] }
  },
  {
    id: 'velalar-college-erode',
    name: 'Velalar College of Engineering and Technology',
    location: { city: 'Erode', state: 'Tamil Nadu', coordinates: { lat: 11.3510, lng: 77.6600 } },
    type: 'private',
    streams: ['engineering'],
    courses: ['B.E.', 'B.Tech', 'M.E.'],
    facilities: ['Library', 'Hostel', 'WiFi', 'Transport', 'Sports Complex'],
    cutoff: { general: 72, obc: 67, sc: 63, st: 60 },
    fees: { annual: '₹65,000', hostel: '₹40,000' },
    rating: 4.0,
    established: 1995,
    website: 'https://velalarengineering.ac.in',
    contact: { phone: '+91-424-2222222', email: 'info@velalarengineering.ac.in' },
    admissionProcess: ['TNEA', 'Management Quota'],
    placements: { averagePackage: '₹3.8 LPA', topRecruiters: ['Infosys', 'TCS', 'IBM'] }
  },
  {
    id: 'cms-college-erode',
    name: 'CMS College of Engineering',
    location: { city: 'Erode', state: 'Tamil Nadu', coordinates: { lat: 11.3200, lng: 77.6500 } },
    type: 'private',
    streams: ['engineering'],
    courses: ['B.E.', 'B.Tech', 'M.E.'],
    facilities: ['Library', 'Hostel', 'Labs'],
    cutoff: { general: 68, obc: 65, sc: 60, st: 55 },
    fees: { annual: '₹55,000', hostel: '₹38,000' },
    rating: 4.0,
    established: 2002,
    website: 'https://cmscollegeofengineering.org',
    contact: { phone: '+91-424-2770000', email: 'info@cmscollegeofengineering.org' },
    admissionProcess: ['TNEA'],
    placements: { averagePackage: '₹3.2 LPA', topRecruiters: ['Infosys', 'Wipro', 'Cognizant'] }
  },
  {
    id: 'erode-sengunthar',
    name: 'Erode Sengunthar Engineering College',
    location: { city: 'Perundurai', state: 'Tamil Nadu', coordinates: { lat: 11.3230, lng: 77.6000 } },
    type: 'private',
    streams: ['engineering'],
    courses: ['B.E.', 'B.Tech'],
    facilities: ['Library', 'Hostel', 'Transport'],
    cutoff: { general: 65, obc: 60, sc: 55, st: 50 },
    fees: { annual: '₹42,000', hostel: '₹30,000' },
    rating: 3.6,
    established: 1996,
    website: 'http://esec.edu.in',
    contact: { phone: '+91-4233-222333', email: 'contact@esec.edu.in' },
    admissionProcess: ['TNEA'],
    placements: { averagePackage: '₹2.5 LPA', topRecruiters: ['Local IT Companies'] }
  },
  {
    id: 'govt-erode-medical',
    name: 'Government Erode Medical College',
    location: { city: 'Erode', state: 'Tamil Nadu', coordinates: { lat: 11.3290, lng: 77.6760 } },
    type: 'government',
    streams: ['medical'],
    courses: ['MBBS', 'Nursing', 'Allied Health'],
    facilities: ['Library', 'Hostel', 'Hospital', 'Labs'],
    cutoff: { general: 85, obc: 80, sc: 75, st: 70 },
    fees: { annual: '₹1,09,000', hostel: '₹20,000' },
    rating: 4.1,
    established: 2012,
    website: 'https://goo.gl/govterodemedical',
    contact: { phone: '+91-424-2201234', email: 'info@govterodemedical.in' },
    admissionProcess: ['NEET'],
    placements: { averagePackage: 'N/A', topRecruiters: [] }
  },
  // Namakkal Government Colleges
  {
    id: 'arignar-anna-gac-namakkal',
    name: 'Arignar Anna Government Arts College',
    location: { city: 'Namakkal', state: 'Tamil Nadu', coordinates: { lat: 11.2191, lng: 78.1670 } },
    type: 'government',
    streams: ['arts', 'science'],
    courses: ['B.A.', 'B.Sc.', 'M.A.', 'M.Sc.'],
    facilities: ['Library', 'Hostel', 'Sports Facilities', 'Computer Labs'],
    cutoff: { general: 85, obc: 80, sc: 75, st: 70 },
    fees: { annual: '₹5000', hostel: '₹10,000' },
    rating: 4.0,
    established: 1967,
    website: 'http://aagacnkl.edu.in',
    contact: { phone: '+91-4286-266323', email: 'principal@aagacnkl.edu.in' },
    admissionProcess: ['Merit Based'],
    placements: { averagePackage: '₹2 LPA', topRecruiters: ['Local Govt', 'Educational Institutes'] }
  },
  {
    id: 'govt-arts-science-college-komarapalayam',
    name: 'Government Arts and Science College',
    location: { city: 'Komarapalayam', state: 'Tamil Nadu', coordinates: { lat: 11.33, lng: 77.75 } },
    type: 'government',
    streams: ['arts', 'science'],
    courses: ['B.A.', 'B.Sc.', 'M.A.', 'M.Sc.'],
    facilities: ['Library', 'Hostel', 'Computer Labs'],
    cutoff: { general: 82, obc: 78, sc: 73, st: 70 },
    fees: { annual: '₹6000', hostel: '₹9000' },
    rating: 3.9,
    established: 1970,
    website: 'http://www.gasckpm.org',
    contact: { phone: '+91-4288-263121', email: 'principalgasckpm2013@gmail.com' },
    admissionProcess: ['Merit Based'],
    placements: { averagePackage: '₹2.1 LPA', topRecruiters: ['Govt Offices', 'Teaching'] }
  },
  {
    id: 'govt-education-college-komarapalayam',
    name: 'Government College of Education',
    location: { city: 'Komarapalayam', state: 'Tamil Nadu', coordinates: { lat: 11.33, lng: 77.75 } },
    type: 'government',
    streams: ['education'],
    courses: ['B.Ed.', 'M.Ed.'],
    facilities: ['Library', 'Computer Lab'],
    cutoff: { general: 75, obc: 70, sc: 65, st: 60 },
    fees: { annual: '₹4000', hostel: '₹6000' },
    rating: 3.7,
    established: 1980,
    website: 'N/A',
    contact: { phone: '+91-4288-260085', email: '' },
    admissionProcess: ['Merit Based'],
    placements: { averagePackage: '₹1.8 LPA', topRecruiters: ['Schools', 'Education Dept'] }
  },
  {
    id: 'nkr-govt-arts-college-women-namakkal',
    name: 'N.K.R. Government Arts College for Women',
    location: { city: 'Namakkal', state: 'Tamil Nadu', coordinates: { lat: 11.22, lng: 78.15 } },
    type: 'government',
    streams: ['arts', 'science'],
    courses: ['B.Sc.', 'B.A.', 'M.Sc.', 'M.A.'],
    facilities: ['Library', 'Hostel', 'Sports Facilities', 'Computer Lab'],
    cutoff: { general: 80, obc: 75, sc: 70, st: 65 },
    fees: { annual: '₹5000', hostel: '₹8000' },
    rating: 4.1,
    established: 1964,
    website: 'http://www.nkrgacw.org',
    contact: { phone: '+91-4286-221152', email: 'nkrgacin@rediff.com' },
    admissionProcess: ['Merit Based'],
    placements: { averagePackage: '₹2 LPA', topRecruiters: ['Teaching Institutes', 'Local Govt'] }
  },
  {
    id: 'thiruvalluvar-government-arts-college-namakkal',
    name: 'Thiruvalluvar Government Arts College',
    location: { city: 'Rasipuram', state: 'Tamil Nadu', coordinates: { lat: 11.53, lng: 78.15 } },
    type: 'government',
    streams: ['arts', 'science'],
    courses: ['B.Sc.', 'B.A.', 'M.Sc.', 'M.A.'],
    facilities: ['Library', 'Hostel', 'Sports Facilities', 'Computer Lab'],
    cutoff: { general: 78, obc: 74, sc: 70, st: 65 },
    fees: { annual: '₹5000', hostel: '₹9000' },
    rating: 4.0,
    established: 1968,
    website: 'http://www.tgacrasi.org',
    contact: { phone: '+91-4287-231802', email: 'tgacrasi@yahoo.co.in' },
    admissionProcess: ['Merit Based'],
    placements: { averagePackage: '₹2 LPA', topRecruiters: ['Local Government', 'Educational Institutes'] }
  },
  {
    id: 'govt-industrial-training-institute-namakkal',
    name: 'Government Industrial Training Institute',
    location: { city: 'Namakkal', state: 'Tamil Nadu', coordinates: { lat: 11.22, lng: 78.14 } },
    type: 'government',
    streams: ['vocational'],
    courses: ['Diploma Electrical', 'Diploma Mechanical', 'Diploma Fitter'],
    facilities: ['Workshops', 'Computer Lab'],
    cutoff: { general: 75, obc: 70, sc: 65, st: 60 },
    fees: { annual: '₹3000', hostel: '₹5000' },
    rating: 3.8,
    established: 1975,
    website: 'http://skilltraining.tn.gov.in/itinamakkal',
    contact: { phone: '+91-4286-267976', email: 'itiwnnmkl@gmail.com' },
    admissionProcess: ['Merit Based'],
    placements: { averagePackage: '₹1.5 LPA', topRecruiters: ['Industrial Firms', 'Local Companies'] }
  },
  {
    id: 'govt-arts-college-kumarapalayam-namakkal',
    name: 'Government Arts and Science College, Kumarapalayam',
    location: { city: 'Kumarapalayam', state: 'Tamil Nadu', coordinates: { lat: 11.33, lng: 77.75 } },
    type: 'government',
    streams: ['arts', 'science'],
    courses: ['B.A.', 'B.Sc.', 'M.A.', 'M.Sc.'],
    facilities: ['Library', 'Hostel', 'Computer Labs', 'Cafeteria'],
    cutoff: { general: 80, obc: 76, sc: 72, st: 68 },
    fees: { annual: '₹6000', hostel: '₹10000' },
    rating: 3.9,
    established: 1980,
    website: 'http://gasckpm.org',
    contact: { phone: '+91-4288-263121', email: 'principalgasckpm2013@gmail.com' },
    admissionProcess: ['Merit Based'],
    placements: { averagePackage: '₹1.8 LPA', topRecruiters: ['Government Offices', 'Teaching'] }
  },
  {
    id: 'govt-arts-college-karur-namakkal',
    name: 'Government Arts College, Karur (Nearby Namakkal)',
    location: { city: 'Karur', state: 'Tamil Nadu', coordinates: { lat: 10.95, lng: 78.09 } },
    type: 'government',
    streams: ['arts', 'science'],
    courses: ['B.A.', 'B.Sc.', 'M.A.', 'M.Sc.'],
    facilities: ['Library', 'Hostel', 'Sports Facilities', 'Computer Labs'],
    cutoff: { general: 75, obc: 70, sc: 65, st: 60 },
    fees: { annual: '₹5000', hostel: '₹8000' },
    rating: 4.0,
    established: 1975,
    website: 'http://keralacollege.edu.in',
    contact: { phone: '+91-4321-223344', email: 'info@karurcollege.edu.in' },
    admissionProcess: ['Merit Based'],
    placements: { averagePackage: '₹2 LPA', topRecruiters: ['Educational Institutes', 'Local Govt'] }
  },
  {
    id: 'govt-law-college-namakkal',
    name: 'Government Law College, Namakkal',
    location: { city: 'Namakkal', state: 'Tamil Nadu', coordinates: { lat: 11.22, lng: 78.15 } },
    type: 'government',
    streams: ['law'],
    courses: ['B.A. LL.B', 'LL.M'],
    facilities: ['Library', 'Computer Labs', 'Hostel', 'Moot Court'],
    cutoff: { general: 80, obc: 75, sc: 70, st: 65 },
    fees: { annual: '₹7000', hostel: '₹9000' },
    rating: 4.2,
    established: 1990,
    website: 'http://govtlawnamakkal.in',
    contact: { phone: '+91-4286-221001', email: 'mail@govtlawnamakkal.in' },
    admissionProcess: ['Merit Based'],
    placements: { averagePackage: '₹3 LPA', topRecruiters: ['Legal Firms', 'Govt Legal Dept'] }
  },

  // Erode Government Colleges
  {
    id: 'govt-erode-medical-college',
    name: 'Government Erode Medical College',
    location: { city: 'Erode', state: 'Tamil Nadu', coordinates: { lat: 11.3290, lng: 77.6760 } },
    type: 'government',
    streams: ['medical'],
    courses: ['MBBS', 'Nursing', 'Allied Health Sciences'],
    facilities: ['Library', 'Hospital', 'Hostel', 'Labs', 'Sports Facilities'],
    cutoff: { general: 90, obc: 85, sc: 80, st: 75 },
    fees: { annual: '₹1,09,000', hostel: '₹20,000' },
    rating: 4.2,
    established: 2012,
    website: 'https://goo.gl/govterodemedical',
    contact: { phone: '+91-424-2201234', email: 'info@govterodemedical.in' },
    admissionProcess: ['NEET'],
    placements: { averagePackage: 'N/A', topRecruiters: [] }
  },
  {
    id: 'govt-degree-college-erode',
    name: 'Government Arts and Science College',
    location: { city: 'Erode', state: 'Tamil Nadu', coordinates: { lat: 11.3210, lng: 77.6670 } },
    type: 'government',
    streams: ['arts', 'science'],
    courses: ['B.A.', 'B.Sc.', 'M.A.', 'M.Sc.'],
    facilities: ['Library', 'Hostel', 'Computer Labs', 'Sports Complex'],
    cutoff: { general: 84, obc: 80, sc: 75, st: 70 },
    fees: { annual: '₹5000', hostel: '₹10,000' },
    rating: 4.0,
    established: 1980,
    website: 'http://governrmtartscollegeerode.in',
    contact: { phone: '+91-424-2223344', email: 'info@governmentartscollege.in' },
    admissionProcess: ['Merit Based'],
    placements: { averagePackage: '₹2 LPA', topRecruiters: ['Teaching', 'Govt Jobs'] }
  },
  {
    id: 'govt-polytechnic-erode',
    name: 'Government Polytechnic College',
    location: { city: 'Erode', state: 'Tamil Nadu', coordinates: { lat: 11.30, lng: 77.66 } },
    type: 'government',
    streams: ['vocational'],
    courses: ['Diploma in Engineering', 'Diploma in Computer Science'],
    facilities: ['Workshops', 'Computer Labs', 'Library', 'Hostel'],
    cutoff: { general: 75, obc: 70, sc: 65, st: 60 },
    fees: { annual: '₹3,000', hostel: '₹5,000' },
    rating: 3.8,
    established: 1975,
    website: 'https://dte.tn.gov.in',
    contact: { phone: '+91-424-2201000', email: 'contact@govpolytechnic.in' },
    admissionProcess: ['Merit Based'],
    placements: { averagePackage: '₹1.5 LPA', topRecruiters: ['Local industries'] }
  },
  {
    id: 'govt-college-education-erode',
    name: 'Government College of Education',
    location: { city: 'Erode', state: 'Tamil Nadu', coordinates: { lat: 11.32, lng: 77.67 } },
    type: 'government',
    streams: ['education'],
    courses: ['B.Ed.', 'M.Ed.'],
    facilities: ['Library', 'Hostel', 'Computer Labs'],
    cutoff: { general: 78, obc: 73, sc: 68, st: 65 },
    fees: { annual: '₹4,000', hostel: '₹7,000' },
    rating: 3.9,
    established: 1988,
    website: 'http://governtedcollegeerode.in',
    contact: { phone: '+91-424-2456789', email: 'info@governtedcollegeerode.in' },
    admissionProcess: ['Merit Based'],
    placements: { averagePackage: '₹1.7 LPA', topRecruiters: ['Schools', 'Education Dept'] }
  },
  {
    id: 'govt-law-college-erode',
    name: 'Government Law College, Erode',
    location: { city: 'Erode', state: 'Tamil Nadu', coordinates: { lat: 11.329, lng: 77.675 } },
    type: 'government',
    streams: ['law'],
    courses: ['B.A. LL.B', 'LL.M'],
    facilities: ['Library', 'Hostel', 'Moot Court'],
    cutoff: { general: 80, obc: 75, sc: 70, st: 65 },
    fees: { annual: '₹7,000', hostel: '₹8,000' },
    rating: 4.1,
    established: 1992,
    website: 'http://govtlawcollegeerode.in',
    contact: { phone: '+91-424-2211100', email: 'admin@govtlawcollegeerode.in' },
    admissionProcess: ['Merit Based'],
    placements: { averagePackage: '₹2.8 LPA', topRecruiters: ['Legal Firms', 'Government Departments'] }
  },
  {
    id: 'govt-nursing-college-erode',
    name: 'Government Nursing College, Erode',
    location: { city: 'Erode', state: 'Tamil Nadu', coordinates: { lat: 11.33, lng: 77.67 } },
    type: 'government',
    streams: ['medical'],
    courses: ['General Nursing', 'Midwifery'],
    facilities: ['Hostel', 'Hospital'],
    cutoff: { general: 85, obc: 80, sc: 75, st: 70 },
    fees: { annual: '₹15,000', hostel: '₹10,000' },
    rating: 4.0,
    established: 2005,
    website: 'http://govnursingerode.in',
    contact: { phone: '+91-424-2203344', email: 'info@govnursingerode.in' },
    admissionProcess: ['Merit Based'],
    placements: { averagePackage: '₹1.5 LPA', topRecruiters: ['Hospitals', 'Healthcare Organizations'] }
  },
  {
    id: 'govt-industrial-training-institute-erode',
    name: 'Government Industrial Training Institute, Erode',
    location: { city: 'Erode', state: 'Tamil Nadu', coordinates: { lat: 11.32, lng: 77.66 } },
    type: 'government',
    streams: ['vocational'],
    courses: ['Diploma Electrical', 'Diploma Mechanical', 'Diploma Fitter'],
    facilities: ['Workshops', 'Hostel'],
    cutoff: { general: 70, obc: 65, sc: 60, st: 55 },
    fees: { annual: '₹3,000', hostel: '₹5,000' },
    rating: 3.8,
    established: 1970,
    website: 'https://itinstituteerode.tn.gov.in',
    contact: { phone: '+91-424-2205678', email: 'contact@itinstituteerode.in' },
    admissionProcess: ['Merit Based'],
    placements: { averagePackage: '₹1.5 LPA', topRecruiters: ['Local Industrial Firms'] }
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
