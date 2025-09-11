export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  category: 'admission' | 'exam' | 'scholarship' | 'application' | 'result';
  priority: 'high' | 'medium' | 'low';
  stream?: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'missed';
  link?: string;
  requirements?: string[];
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'jee-main-2024',
    title: 'JEE Main 2024 Session 2',
    description: 'Joint Entrance Examination for engineering admissions',
    date: '2024-04-01',
    endDate: '2024-04-15',
    category: 'exam',
    priority: 'high',
    stream: ['science'],
    status: 'upcoming',
    link: 'https://jeemain.nta.nic.in',
    requirements: ['12th with PCM', 'Application form', 'Valid ID proof']
  },
  {
    id: 'neet-2024',
    title: 'NEET UG 2024',
    description: 'National Eligibility cum Entrance Test for medical courses',
    date: '2024-05-05',
    category: 'exam',
    priority: 'high',
    stream: ['science'],
    status: 'upcoming',
    link: 'https://neet.nta.nic.in',
    requirements: ['12th with PCB', 'Application form', 'Medical certificate']
  },
  {
    id: 'cuet-2024',
    title: 'CUET UG 2024',
    description: 'Common University Entrance Test for undergraduate admissions',
    date: '2024-05-15',
    endDate: '2024-05-31',
    category: 'exam',
    priority: 'high',
    stream: ['science', 'commerce', 'arts'],
    status: 'upcoming',
    link: 'https://cuet.samarth.ac.in',
    requirements: ['12th pass', 'Application form', 'Subject selection']
  },
  {
    id: 'du-admissions',
    title: 'Delhi University Admissions 2024',
    description: 'Undergraduate admissions for DU colleges',
    date: '2024-06-01',
    endDate: '2024-07-15',
    category: 'admission',
    priority: 'high',
    stream: ['science', 'commerce', 'arts'],
    status: 'upcoming',
    link: 'https://du.ac.in',
    requirements: ['CUET UG score', '12th marksheet', 'Category certificate if applicable']
  },
  {
    id: 'josaa-counselling',
    title: 'JoSAA Counselling 2024',
    description: 'Joint Seat Allocation Authority counselling for IITs, NITs',
    date: '2024-06-10',
    endDate: '2024-07-20',
    category: 'admission',
    priority: 'high',
    stream: ['science'],
    status: 'upcoming',
    link: 'https://josaa.nic.in',
    requirements: ['JEE Advanced qualification', 'Document verification', 'Choice filling']
  },
  {
    id: 'merit-scholarship',
    title: 'National Merit Scholarship 2024',
    description: 'Scholarship for meritorious students',
    date: '2024-07-01',
    endDate: '2024-08-31',
    category: 'scholarship',
    priority: 'medium',
    stream: ['science', 'commerce', 'arts', 'vocational'],
    status: 'upcoming',
    link: 'https://scholarships.gov.in',
    requirements: ['Merit certificate', 'Income certificate', 'Bank details']
  },
  {
    id: 'cat-2024',
    title: 'CAT 2024',
    description: 'Common Admission Test for MBA programs',
    date: '2024-11-24',
    category: 'exam',
    priority: 'medium',
    stream: ['commerce', 'science', 'arts'],
    status: 'upcoming',
    link: 'https://iimcat.ac.in',
    requirements: ['Bachelor\'s degree', 'Application form', 'Work experience (preferred)']
  },
  {
    id: 'gate-2025',
    title: 'GATE 2025',
    description: 'Graduate Aptitude Test in Engineering',
    date: '2025-02-01',
    endDate: '2025-02-16',
    category: 'exam',
    priority: 'medium',
    stream: ['science'],
    status: 'upcoming',
    link: 'https://gate.iisc.ac.in',
    requirements: ['Engineering degree', 'Application form', 'Valid ID']
  },
  {
    id: 'clat-2024',
    title: 'CLAT 2024',
    description: 'Common Law Admission Test',
    date: '2024-12-01',
    category: 'exam',
    priority: 'medium',
    stream: ['arts'],
    status: 'upcoming',
    link: 'https://consortiumofnlus.ac.in',
    requirements: ['12th pass', 'Application form', 'English proficiency']
  },
  {
    id: 'bitsat-2024',
    title: 'BITSAT 2024',
    description: 'BITS Admission Test',
    date: '2024-06-20',
    endDate: '2024-06-30',
    category: 'exam',
    priority: 'medium',
    stream: ['science'],
    status: 'upcoming',
    link: 'https://www.bitsadmission.com',
    requirements: ['12th with PCM', '75% aggregate', 'Application form']
  },
  {
    id: 'state-scholarships',
    title: 'State Government Scholarships',
    description: 'Various state-level scholarship programs',
    date: '2024-08-01',
    endDate: '2024-09-30',
    category: 'scholarship',
    priority: 'low',
    stream: ['science', 'commerce', 'arts', 'vocational'],
    status: 'upcoming',
    requirements: ['Domicile certificate', 'Income certificate', 'Academic records']
  },
  {
    id: 'iit-advanced-result',
    title: 'JEE Advanced Results 2024',
    description: 'Results for JEE Advanced examination',
    date: '2024-06-09',
    category: 'result',
    priority: 'high',
    stream: ['science'],
    status: 'upcoming',
    link: 'https://jeeadv.ac.in'
  }
];

export const getEventsByStream = (stream: string): TimelineEvent[] => {
  return timelineEvents.filter(event => 
    !event.stream || event.stream.includes(stream)
  );
};

export const getUpcomingEvents = (limit?: number): TimelineEvent[] => {
  const upcoming = timelineEvents
    .filter(event => event.status === 'upcoming' || event.status === 'ongoing')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return limit ? upcoming.slice(0, limit) : upcoming;
};

export const getEventsByCategory = (category: string): TimelineEvent[] => {
  return timelineEvents.filter(event => event.category === category);
};
