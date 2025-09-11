import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-xl font-bold">CareerPath</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering students to make informed career decisions through personalized aptitude assessments and comprehensive guidance.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@careerpath.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/quiz" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Take Quiz
                </Link>
              </li>
              <li>
                <Link to="/course-mapping" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Course Mapping
                </Link>
              </li>
              <li>
                <Link to="/colleges" className="text-gray-300 hover:text-primary-400 transition-colors">
                  College Directory
                </Link>
              </li>
              <li>
                <Link to="/timeline" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Academic Timeline
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Career Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 CareerPath. All rights reserved. Built for educational guidance and career development.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
