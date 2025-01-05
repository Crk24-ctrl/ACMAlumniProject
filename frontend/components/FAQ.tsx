import { useState } from "react";
import "../styles/faq.css";
interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const faqData: FAQItem[] = [
    {
      question: "What is Deal Finder?",
      answer:
        "DealFinder is your ultimate online companion for finding the best deals across all websites. Whether you're shopping for groceries, technology, or everyday essentials, DealFinder compares prices, highlights discounts, and ensures you never miss out on savings. Simplify your shopping experience and make smarter purchases with DealFinder!",
    },
    {
      question: "How does DealFinder work?",
      answer:
        "We aggregate deals from various shopping websites and present them in an easy-to-browse interface for users. Users can visit our website and browse through available offers, search for specific products or categories.",
    },
    {
      question: "How frequently are deals updated on DealFinder?",
      answer: "Deals are updated regularly to ensure users get the latest offers.",
    },
    
  
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
  
      <h2>
        Frequently Asked <span className="highlight2">Questions</span>
      </h2>
      <br></br>
      <br></br>
      <h3>
       Get answers to frequently asked questions!
      </h3>
      <br></br>
      <br></br>
      <div className="faq-container">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
            </button>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;