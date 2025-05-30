import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  FileImage, 
  Settings, 
  Download, 
  Shield, 
  Zap,
  ThumbsUp,
  ThumbsDown,
  Star,
  Filter,
  X
} from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful: number;
  notHelpful: number;
}

const faqData: FAQ[] = [
  {
    id: '1',
    question: 'What image formats are supported?',
    answer: 'We support a wide range of image formats including JPG/JPEG, PNG, WebP, HEIC, BMP, GIF, TIFF, ICO, SVG, and PDF. You can convert between any of these formats with high quality preservation.',
    category: 'File Formats',
    tags: ['formats', 'supported', 'jpg', 'png', 'webp', 'heic'],
    helpful: 45,
    notHelpful: 2
  },
  {
    id: '2',
    question: 'Is there a file size limit?',
    answer: 'Yes, the maximum file size is 10MB per image. This limit ensures optimal performance and prevents browser memory issues. For larger files, consider compressing them first or using our batch processing feature.',
    category: 'File Formats',
    tags: ['size', 'limit', 'maximum', '10mb'],
    helpful: 38,
    notHelpful: 5
  },
  {
    id: '3',
    question: 'Are my images uploaded to your servers?',
    answer: 'No, absolutely not! All image processing happens locally in your browser using JavaScript and WebAssembly. Your images never leave your device, ensuring complete privacy and security.',
    category: 'Privacy & Security',
    tags: ['privacy', 'security', 'local', 'browser', 'upload'],
    helpful: 67,
    notHelpful: 1
  },
  {
    id: '4',
    question: 'How do I adjust the output quality?',
    answer: 'You can adjust the output quality using the quality slider in the header navigation or in the settings panel. Higher quality (90-100%) is best for professional use, while lower quality (50-70%) is ideal for web optimization.',
    category: 'Settings',
    tags: ['quality', 'settings', 'slider', 'compression'],
    helpful: 29,
    notHelpful: 3
  },
  {
    id: '5',
    question: 'Can I convert multiple images at once?',
    answer: 'Yes! You can upload multiple images simultaneously and convert them all at once. Use drag and drop or the file picker to select multiple files. You can also download all converted files as a ZIP archive.',
    category: 'Features',
    tags: ['batch', 'multiple', 'bulk', 'zip'],
    helpful: 52,
    notHelpful: 2
  },
  {
    id: '6',
    question: 'Why should I use WebP format?',
    answer: 'WebP is a modern image format that provides superior compression compared to JPEG and PNG. It can reduce file sizes by 25-50% while maintaining the same visual quality, making it perfect for web use.',
    category: 'File Formats',
    tags: ['webp', 'compression', 'modern', 'web'],
    helpful: 34,
    notHelpful: 4
  },
  {
    id: '7',
    question: 'How do I convert iPhone HEIC photos?',
    answer: 'Simply select the "HEIC → JPG" conversion option and upload your HEIC files. Our converter automatically handles Apple\'s HEIC format and converts it to widely compatible JPG format.',
    category: 'Features',
    tags: ['heic', 'iphone', 'apple', 'jpg', 'photos'],
    helpful: 41,
    notHelpful: 3
  },
  {
    id: '8',
    question: 'Does the converter work offline?',
    answer: 'Yes! Once the page is loaded, the converter works completely offline. All processing happens in your browser, so you don\'t need an internet connection to convert images.',
    category: 'Features',
    tags: ['offline', 'browser', 'local', 'internet'],
    helpful: 28,
    notHelpful: 1
  },
  {
    id: '9',
    question: 'What happens to transparency in PNG images?',
    answer: 'When converting PNG to JPG, transparency is replaced with a white background since JPG doesn\'t support transparency. When converting to PNG or WebP, transparency is preserved.',
    category: 'File Formats',
    tags: ['transparency', 'png', 'jpg', 'alpha'],
    helpful: 33,
    notHelpful: 2
  },
  {
    id: '10',
    question: 'Can I use keyboard shortcuts?',
    answer: 'Yes! We support several keyboard shortcuts: Ctrl+O to upload files, Ctrl+V to paste from clipboard, Ctrl+Enter to start conversion, and Ctrl+Delete to clear all files.',
    category: 'Features',
    tags: ['keyboard', 'shortcuts', 'hotkeys', 'productivity'],
    helpful: 19,
    notHelpful: 1
  },
  {
    id: '11',
    question: 'Is there a mobile app available?',
    answer: 'Currently, we offer a responsive web application that works great on mobile devices. A dedicated mobile app is in development and will be available soon.',
    category: 'Features',
    tags: ['mobile', 'app', 'responsive', 'development'],
    helpful: 15,
    notHelpful: 8
  },
  {
    id: '12',
    question: 'How do I report a bug or request a feature?',
    answer: 'You can contact us through the support page or send an email to support@pixlyforge.com. We appreciate all feedback and actively work on improving the converter based on user suggestions.',
    category: 'Support',
    tags: ['bug', 'feature', 'support', 'contact', 'feedback'],
    helpful: 22,
    notHelpful: 0
  }
];

const categories = ['All', 'File Formats', 'Features', 'Settings', 'Privacy & Security', 'Support'];

export const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, 'helpful' | 'not-helpful' | null>>({});

  const filteredFAQs = useMemo(() => {
    return faqData.filter(faq => {
      const matchesSearch = searchQuery === '' || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleVote = (faqId: string, vote: 'helpful' | 'not-helpful') => {
    setHelpfulVotes(prev => ({
      ...prev,
      [faqId]: prev[faqId] === vote ? null : vote
    }));
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our image converter. Can't find what you're looking for? Contact our support team.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-6 mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search questions, answers, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filter by category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent text-accent-foreground hover:bg-accent/80'
                  }
                `}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {filteredFAQs.length} {filteredFAQs.length === 1 ? 'question' : 'questions'} found
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </p>
          </div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <motion.button
                  onClick={() => toggleExpanded(faq.id)}
                  className="w-full p-6 text-left hover:bg-accent/50 transition-colors"
                  whileHover={{ backgroundColor: 'rgba(var(--accent), 0.5)' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="px-2 py-1 bg-accent rounded text-xs font-medium">
                          {faq.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{faq.helpful}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span>{Math.round((faq.helpful / (faq.helpful + faq.notHelpful)) * 100)}% helpful</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {expandedItems.has(faq.id) ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {expandedItems.has(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border"
                    >
                      <div className="p-6">
                        <div className="prose prose-gray dark:prose-invert max-w-none mb-6">
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {faq.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-accent/50 text-accent-foreground rounded text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Helpful Voting */}
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <span className="text-sm text-muted-foreground">Was this helpful?</span>
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleVote(faq.id, 'helpful')}
                              className={`
                                flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-colors
                                ${helpfulVotes[faq.id] === 'helpful'
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                  : 'bg-accent text-accent-foreground hover:bg-accent/80'
                                }
                              `}
                            >
                              <ThumbsUp className="w-4 h-4" />
                              Yes
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleVote(faq.id, 'not-helpful')}
                              className={`
                                flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-colors
                                ${helpfulVotes[faq.id] === 'not-helpful'
                                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                  : 'bg-accent text-accent-foreground hover:bg-accent/80'
                                }
                              `}
                            >
                              <ThumbsDown className="w-4 h-4" />
                              No
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No questions found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or browse a different category.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-card border border-border rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              Contact Support
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/80 transition-colors"
            >
              <FileImage className="w-4 h-4" />
              Request Feature
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
