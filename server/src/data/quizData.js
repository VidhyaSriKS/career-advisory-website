/**
 * Quiz questions data for seeding the database
 */

export const quizQuestions = [
  // Personality Module
  {
    module: 'personality',
    questionId: 'p1',
    question: 'How do you prefer to work on projects?',
    options: [
      { optionId: 'A', text: 'Independently, at my own pace', weight: 3 },
      { optionId: 'B', text: 'In a small team with defined roles', weight: 2 },
      { optionId: 'C', text: 'In a large collaborative group', weight: 1 }
    ]
  },
  {
    module: 'personality',
    questionId: 'p2',
    question: 'When faced with a problem, you typically:',
    options: [
      { optionId: 'A', text: 'Analyze it methodically step by step', weight: 3 },
      { optionId: 'B', text: 'Brainstorm multiple creative solutions', weight: 2 },
      { optionId: 'C', text: 'Discuss it with others to get different perspectives', weight: 1 }
    ]
  },
  {
    module: 'personality',
    questionId: 'p3',
    question: 'How do you handle deadlines?',
    options: [
      { optionId: 'A', text: 'Plan ahead and finish early', weight: 3 },
      { optionId: 'B', text: 'Work steadily and finish on time', weight: 2 },
      { optionId: 'C', text: 'Work intensely as the deadline approaches', weight: 1 }
    ]
  },
  
  // Academic Module
  {
    module: 'academic',
    questionId: 'a1',
    question: 'Which subjects do you enjoy the most?',
    options: [
      { optionId: 'A', text: 'Mathematics and Science', weight: 3 },
      { optionId: 'B', text: 'Languages and Social Studies', weight: 2 },
      { optionId: 'C', text: 'Arts and Physical Education', weight: 1 }
    ]
  },
  {
    module: 'academic',
    questionId: 'a2',
    question: 'How do you prefer to learn new concepts?',
    options: [
      { optionId: 'A', text: 'Reading and researching on my own', weight: 3 },
      { optionId: 'B', text: 'Watching demonstrations or videos', weight: 2 },
      { optionId: 'C', text: 'Hands-on practice and experimentation', weight: 1 }
    ]
  },
  {
    module: 'academic',
    questionId: 'a3',
    question: 'What type of assignments do you excel at?',
    options: [
      { optionId: 'A', text: 'Research papers and analytical projects', weight: 3 },
      { optionId: 'B', text: 'Creative projects and presentations', weight: 2 },
      { optionId: 'C', text: 'Group discussions and collaborative work', weight: 1 }
    ]
  },
  
  // Interests Module
  {
    module: 'interests',
    questionId: 'i1',
    question: 'In your free time, you prefer to:',
    options: [
      { optionId: 'A', text: 'Solve puzzles or play strategy games', weight: 3 },
      { optionId: 'B', text: 'Create art, music, or write', weight: 2 },
      { optionId: 'C', text: 'Participate in sports or outdoor activities', weight: 1 }
    ]
  },
  {
    module: 'interests',
    questionId: 'i2',
    question: 'Which of these activities sounds most appealing?',
    options: [
      { optionId: 'A', text: 'Building or fixing things', weight: 3 },
      { optionId: 'B', text: 'Teaching or helping others', weight: 2 },
      { optionId: 'C', text: 'Managing or organizing events', weight: 1 }
    ]
  },
  {
    module: 'interests',
    questionId: 'i3',
    question: 'What type of books or media do you enjoy most?',
    options: [
      { optionId: 'A', text: 'Science fiction, technology, or educational content', weight: 3 },
      { optionId: 'B', text: 'Biographies, history, or social issues', weight: 2 },
      { optionId: 'C', text: 'Fantasy, arts, or entertainment', weight: 1 }
    ]
  }
];

/**
 * Seeds the quiz questions into Firestore
 * @param {Object} firestore - Firestore instance
 * @returns {Promise<void>}
 */
export const seedQuizQuestions = async (firestore) => {
  try {
    const batch = firestore.batch();
    
    // Check if questions already exist
    const existingQuestions = await firestore.collection('quizQuestions').get();
    
    if (!existingQuestions.empty) {
      console.log('Quiz questions already exist in the database');
      return;
    }
    
    // Add each question to the batch
    quizQuestions.forEach(question => {
      const docRef = firestore.collection('quizQuestions').doc(question.questionId);
      batch.set(docRef, question);
    });
    
    // Commit the batch
    await batch.commit();
    
    console.log(`Successfully seeded ${quizQuestions.length} quiz questions`);
  } catch (error) {
    console.error('Error seeding quiz questions:', error);
    throw error;
  }
};