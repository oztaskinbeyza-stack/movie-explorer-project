import { getSophisticatedRecommendations } from './recommendation_logic';

/**
 * UNIT TESTS FOR RECOMMENDATION ENGINE
 * Requirement: "Unit tests for recommendation logic and data integrity."
 */

const mockMovies = [
  { id: 1, title: 'Sci-Fi Epic', genre_ids: [878], vote_average: 8.5 },
  { id: 2, title: 'Comedy Night', genre_ids: [35], vote_average: 7.0 },
  { id: 3, title: 'Action Hero', genre_ids: [28], vote_average: 9.0 },
  { id: 4, title: 'Space Mystery', genre_ids: [878, 9648], vote_average: 7.5 }
];

const mockWatchlist = [
  { media_id: 1, genres: [{ id: 878, name: 'Sci-Fi' }] }
];

const mockRatings = [
  { rating: 5, genres: [{ id: 878, name: 'Sci-Fi' }] }
];

const testRecommendations = () => {
  console.log('--- STARTING UNIT TESTS: RECOMMENDATION_ENGINE ---');
  
  const results = getSophisticatedRecommendations(mockWatchlist, mockMovies, mockRatings);
  
  // Test 1: Should favor Sci-Fi (ID 878)
  const topPick = results[0];
  if (topPick.genre_ids.includes(878) && topPick.id === 4) {
    console.log('✅ TEST 1 PASSED: Sci-Fi preference correctly identified.');
  } else {
    console.log('❌ TEST 1 FAILED: Incorrect recommendation order.');
  }

  // Test 2: Should filter out already watched (ID 1)
  if (!results.find(m => m.id === 1)) {
    console.log('✅ TEST 2 PASSED: Filtered watched content.');
  } else {
    console.log('❌ TEST 2 FAILED: Included watched content.');
  }

  console.log('--- UNIT TESTS COMPLETED ---');
};

// Run if this script is executed directly
if (typeof process !== 'undefined') {
  testRecommendations();
}
