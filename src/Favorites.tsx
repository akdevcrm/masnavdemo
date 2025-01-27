import React, { useState } from 'react';
import { FaArrowLeft, FaPlane, FaStar, FaTimes, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';

const initialFavorites = [
  {
    id: 1,
    type: 'flight',
    airline: 'Delta',
    route: 'JFK → LAX',
    date: '2024-02-15',
    price: 299,
  },
  {
    id: 2,
    type: 'hotel',
    name: 'Marriott Downtown',
    location: 'Los Angeles',
    rating: 4.5,
    price: 199,
  },
  {
    id: 3,
    type: 'flight',
    airline: 'United',
    route: 'SFO → JFK',
    date: '2024-03-01',
    price: 350,
  },
  {
    id: 4,
    type: 'hotel',
    name: 'Hilton Garden Inn',
    location: 'New York',
    rating: 4.2,
    price: 250,
  },
  {
    id: 5,
    type: 'flight',
    airline: 'American',
    route: 'DFW → MIA',
    date: '2024-02-20',
    price: 280,
  },
  {
    id: 6,
    type: 'hotel',
    name: 'Hyatt Regency',
    location: 'Chicago',
    rating: 4.7,
    price: 320,
  },
  {
    id: 7,
    type: 'flight',
    airline: 'JetBlue',
    route: 'BOS → FLL',
    date: '2024-03-10',
    price: 220,
  },
  {
    id: 8,
    type: 'hotel',
    name: 'The Peninsula',
    location: 'Hong Kong',
    rating: 4.9,
    price: 450,
  },
  {
    id: 9,
    type: 'flight',
    airline: 'Alaska',
    route: 'SEA → ANC',
    date: '2024-04-01',
    price: 380,
  },
  {
    id: 10,
    type: 'hotel',
    name: 'Ritz-Carlton',
    location: 'Paris',
    rating: 4.8,
    price: 500,
  },
  {
    id: 11,
    type: 'flight',
    airline: 'Spirit',
    route: 'MCO -> ATL',
    date: '2024-04-15',
    price: 150,
  },
  {
    id: 12,
    type: 'hotel',
    name: 'Four Seasons',
    location: 'Maui',
    rating: 4.9,
    price: 600,
  },
  {
    id: 13,
    type: 'flight',
    airline: 'Southwest',
    route: 'DAL -> HOU',
    date: '2024-05-01',
    price: 180,
  },
  {
    id: 14,
    type: 'hotel',
    name: 'The Plaza',
    location: 'New York',
    rating: 4.7,
    price: 400,
  },
  {
    id: 15,
    type: 'flight',
    airline: 'Frontier',
    route: 'DEN -> LAS',
    date: '2024-05-15',
    price: 120,
  },
  {
    id: 16,
    type: 'hotel',
    name: 'Bellagio',
    location: 'Las Vegas',
    rating: 4.8,
    price: 350,
  },
  {
    id: 17,
    type: 'flight',
    airline: 'Hawaiian',
    route: 'HNL -> LAX',
    date: '2024-06-01',
    price: 420,
  },
  {
    id: 18,
    type: 'hotel',
    name: 'The Venetian',
    location: 'Macau',
    rating: 4.6,
    price: 300,
  },
  {
    id: 19,
    type: 'flight',
    airline: 'Emirates',
    route: 'DXB -> JFK',
    date: '2024-06-15',
    price: 800,
  },
  {
    id: 20,
    type: 'hotel',
    name: 'Burj Al Arab',
    location: 'Dubai',
    rating: 4.9,
    price: 700,
  },
  {
    id: 21,
    type: 'flight',
    airline: 'Qatar',
    route: 'DOH -> LHR',
    date: '2024-07-01',
    price: 750,
  },
  {
    id: 22,
    type: 'hotel',
    name: 'The Savoy',
    location: 'London',
    rating: 4.7,
    price: 550,
  }
];

const ITEMS_PER_PAGE = 20;

function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(initialFavorites);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('none');
  const [currentPage, setCurrentPage] = useState(1);
  const { darkMode } = useTheme();

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Simulate successful deletion
      setFavorites(favorites.filter(item => item.id !== id));
    } catch (error) {
      console.error("Failed to delete favorite:", error);
      // Handle error (e.g., show an error message)
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const filteredAndSortedFavorites = () => {
    let filtered = favorites.filter(item => {
      const searchLower = searchQuery.toLowerCase();
      if (item.type === 'flight') {
        return (
          (item.airline?.toLowerCase() || '').includes(searchLower) ||
          (item.route?.toLowerCase() || '').includes(searchLower) ||
          (item.date || '').includes(searchLower)
        );
      } else if (item.type === 'hotel') {
        return (
          (item.name?.toLowerCase() || '').includes(searchLower) ||
          (item.location?.toLowerCase() || '').includes(searchLower)
        );
      }
      return true;
    });

    if (filterType === 'flights') {
      filtered = filtered.filter(item => item.type === 'flight');
    } else if (filterType === 'hotels') {
      filtered = filtered.filter(item => item.type === 'hotel');
    }

    if (sortOrder === 'price_low_high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price_high_low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  const filteredFavorites = filteredAndSortedFavorites();

  const totalPages = Math.ceil(filteredFavorites.length / ITEMS_PER_PAGE);
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredFavorites.slice(startIndex, endIndex);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const renderPagination = () => {
    return (
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={handlePrevPage}
          className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:border-[#4b0086] disabled:opacity-50"
          disabled={currentPage === 1}
        >
          <FaChevronLeft className={`text-gray-600 ${darkMode ? 'dark:text-gray-300' : ''}`} />
        </button>
        <span className={`text-gray-600 ${darkMode ? 'dark:text-gray-300' : ''}`}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:border-[#4b0086] disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          <FaChevronRight className={`text-gray-600 ${darkMode ? 'dark:text-gray-300' : ''}`} />
        </button>
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col items-center px-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="w-full max-w-3xl mt-8 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className={`text-gray-600 hover:text-[#4b0086] transition-colors ${darkMode ? 'dark:text-gray-300 dark:hover:text-[#bb44f0]' : 'hover:text-[#4b0086]'}`}>
          <FaArrowLeft size={24} />
        </button>
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Saved Items</h1>
      </div>

      {/* Search and Filter */}
      <div className="w-full max-w-3xl mt-4 flex space-x-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className={`w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#4b0086] focus:border-[#4b0086] outline-none pl-10 ${darkMode ? 'bg-gray-700 text-gray-100 dark:focus:border-[#bb44f0]' : 'bg-white text-gray-800 focus:border-[#4b0086]'}`}
          />
          <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            <FaSearch />
          </div>
        </div>
        <select
          value={filterType}
          onChange={handleFilterChange}
          className={`px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#4b0086] focus:border-[#4b0086] outline-none hover:border-[#4b0086] ${darkMode ? 'bg-gray-700 text-gray-100 dark:hover:border-[#bb44f0]' : 'bg-white text-gray-800 hover:border-[#4b0086]'}`}
        >
          <option value="all">All</option>
          <option value="flights">Flights</option>
          <option value="hotels">Hotels</option>
        </select>
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className={`px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#4b0086] focus:border-[#4b0086] outline-none hover:border-[#4b0086] ${darkMode ? 'bg-gray-700 text-gray-100 dark:hover:border-[#bb44f0]' : 'bg-white text-gray-800 hover:border-[#4b0086]'}`}
        >
          <option value="none">Sort</option>
          <option value="price_low_high">Price: Low to High</option>
          <option value="price_high_low">Price: High to Low</option>
        </select>
      </div>

      {/* Favorites */}
      <div className="w-full max-w-3xl mt-8 space-y-4">
        {getCurrentPageItems().map((item) => (
          <div key={item.id} className={`rounded-lg shadow p-4 flex justify-between items-center ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <div className="flex items-center">
              {item.type === 'flight' ? (
                <div className="flex items-center">
                  <FaPlane className={`mr-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  <div>
                    <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.airline}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.route}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.date}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className={`mr-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.name}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.location}</p>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 text-sm mr-1" />
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.rating}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center">
              <p className={`text-2xl font-bold mr-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>${item.price}</p>
              <button onClick={() => handleDelete(item.id)} className={`text-gray-400 hover:text-red-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${darkMode ? 'dark:text-gray-500 dark:hover:text-[#bb44f0]' : ''}`} disabled={loading}>
                {loading ? 'Deleting...' : <FaTimes size={20} />}
              </button>
            </div>
          </div>
        ))}
      </div>
      {filteredFavorites.length > ITEMS_PER_PAGE && renderPagination()}
    </div>
  );
}

export default Favorites;
