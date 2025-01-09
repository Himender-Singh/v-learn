import React, { useEffect, useState, useRef } from 'react';
import Loader from './Loader';

const Blogs = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const observer = useRef();

  const apiKey = 'e0da94dbf7484f62b3984c5cf79dcabf'; // Replace with your News API key

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&page=${page}&apiKey=${apiKey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setArticles((prevArticles) => [...prevArticles, ...data.articles]);
        setHasMore(data.articles.length > 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page, apiKey]);

  const lastArticleRef = (node) => {
    if (loading) return; // Do not observe if loading
    if (observer.current) observer.current.disconnect(); // Disconnect the previous observer

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1); // Load more articles
      }
    });

    if (node) observer.current.observe(node); // Start observing the new last article
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  if (loading && page === 1) return <Loader showLoader={1500} />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Current News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => {
          const isLastArticle = index === articles.length - 1; // Check if it's the last article
          return (
            <div
              key={index}
              ref={isLastArticle ? lastArticleRef : null} // Attach ref to the last article
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-700 mb-4">{article.description || 'No description available.'}</p>
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className="mb-4 rounded-lg" />
              )}
              <button
                onClick={() => setSelectedArticle(article)}
                className="text-blue-500 hover:underline"
              >
                Read More
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal for displaying full article details */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-2">{selectedArticle.title}</h2>
            {selectedArticle.urlToImage && (
              <img src={selectedArticle.urlToImage} alt={selectedArticle.title} className="mb-4 rounded-lg" />
            )}
            <p className="text-gray-700 mb-4">{selectedArticle.content || 'No content available.'}</p>
            <p className="text-gray-600 mb-4">Source: {selectedArticle.source.name || 'Unknown'}</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
