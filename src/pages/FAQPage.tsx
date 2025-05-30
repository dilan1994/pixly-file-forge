
import { useState } from 'react';
import { Search, ChevronDown, ChevronRight, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    category: 'General',
    questions: [
      {
        id: 1,
        question: 'What file formats are supported?',
        answer: 'We support JPG, JPEG, PNG, WebP, HEIC, BMP, GIF, and PDF files for conversion.',
      },
      {
        id: 2,
        question: 'Is there a file size limit?',
        answer: 'Yes, each file must be under 10MB. For larger files, consider compressing them first.',
      },
      {
        id: 3,
        question: 'Are my files stored on your servers?',
        answer: 'No, all processing happens in your browser. Your files never leave your device.',
      },
    ],
  },
  {
    category: 'Conversion',
    questions: [
      {
        id: 4,
        question: 'How do I convert HEIC files?',
        answer: 'Simply select "HEIC to JPG" from the tabs and upload your HEIC files. The conversion happens automatically.',
      },
      {
        id: 5,
        question: 'Can I adjust the quality of converted images?',
        answer: 'Yes, click the Settings button to adjust quality from 10% to 100%. Lower quality means smaller file size.',
      },
      {
        id: 6,
        question: 'Can I convert multiple files at once?',
        answer: 'Absolutely! You can upload and convert multiple files simultaneously using batch processing.',
      },
    ],
  },
  {
    category: 'Troubleshooting',
    questions: [
      {
        id: 7,
        question: 'Why is my conversion failing?',
        answer: 'Common causes include unsupported file formats, corrupted files, or files that are too large. Check the file requirements.',
      },
      {
        id: 8,
        question: 'The download is not working',
        answer: 'Make sure your browser allows downloads. Some browsers block automatic downloads for security reasons.',
      },
      {
        id: 9,
        question: 'Can I use this tool offline?',
        answer: 'The initial loading requires internet, but once loaded, the conversion works offline since it processes files locally.',
      },
    ],
  },
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...faqData.map(cat => cat.category)];

  const toggleItem = (id: number) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFAQ = faqData
    .filter(category => selectedCategory === 'All' || category.category === selectedCategory)
    .map(category => ({
      ...category,
      questions: category.questions.filter(q =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-text/70 max-w-2xl mx-auto">
            Find answers to common questions about using our image converter tool.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text/50" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-surface border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${selectedCategory === category
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-surface text-text/70 hover:text-text hover:bg-surface/70'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Content */}
        <div className="space-y-6">
          {filteredFAQ.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-primary">{category.category}</h2>
              <div className="space-y-2">
                {category.questions.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
                    className="bg-surface/50 border border-primary/20 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-primary/5 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                        <span className="font-medium">{item.question}</span>
                      </div>
                      {expandedItems.includes(item.id) ? (
                        <ChevronDown className="w-5 h-5 text-primary" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-primary" />
                      )}
                    </button>

                    <AnimatePresence>
                      {expandedItems.includes(item.id) && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 pt-2 border-t border-primary/10">
                            <p className="text-text/70 leading-relaxed">{item.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredFAQ.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <HelpCircle className="w-16 h-16 text-text/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No questions found</h3>
            <p className="text-text/60">Try searching with different keywords or browse all categories.</p>
          </motion.div>
        )}

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-surface/30 rounded-xl p-8 border border-primary/20 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-text/70 mb-6">
            Can't find what you're looking for? Our converter is designed to be intuitive and user-friendly.
          </p>
          <div className="flex justify-center">
            <div className="bg-primary/10 px-6 py-3 rounded-lg">
              <p className="text-sm text-primary font-medium">
                Try the interactive guide for step-by-step instructions
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
