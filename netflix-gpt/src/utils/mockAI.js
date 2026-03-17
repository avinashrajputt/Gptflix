// Mock movie recommendation engine - No API key required!
// Returns different movies based on search query

const mockMovieDatabase = {
  action: ['Die Hard', 'John Wick', 'Mission Impossible', 'Fast & Furious', 'Atomic Blonde'],
  comedy: ['Superbad', 'The Hangover', 'Dodgeball', 'Anchorman', 'Step Brothers'],
  drama: ['The Shawshank Redemption', 'Forrest Gump', 'The Pursuit of Happyness', 'Parasite', 'Whiplash'],
  horror: ['The Ring', 'The Conjuring', 'Insidious', 'A Quiet Place', 'Hereditary'],
  romance: ['Titanic', 'The Notebook', 'La La Land', 'Pride and Prejudice', 'Crazy Rich Asians'],
  sci_fi: ['Inception', 'Interstellar', 'The Matrix', 'Blade Runner', 'Avatar'],
  thriller: ['Inception', 'Shutter Island', 'Zodiac', 'Se7en', 'The Sixth Sense'],
  animation: ['Toy Story', 'Inside Out', 'Spirited Away', 'Frozen', 'Coco'],
  adventure: ['Indiana Jones', 'The Lord of the Rings', 'Pirates of the Caribbean', 'Jungle Book', 'Aladdin'],
  default: ['Inception', 'Titanic', 'Avatar', 'The Avengers', 'Interstellar'],
};

export const getMockMovieRecommendations = (query) => {
  const lowerQuery = query.toLowerCase();
  
  // Check for keywords in query to return appropriate movies
  for (const [category, movies] of Object.entries(mockMovieDatabase)) {
    if (category !== 'default' && lowerQuery.includes(category)) {
      return movies.join(', ');
    }
  }
  
  // Check for individual keywords
  if (lowerQuery.includes('action')) return mockMovieDatabase.action.join(', ');
  if (lowerQuery.includes('comedy') || lowerQuery.includes('funny')) return mockMovieDatabase.comedy.join(', ');
  if (lowerQuery.includes('drama')) return mockMovieDatabase.drama.join(', ');
  if (lowerQuery.includes('horror') || lowerQuery.includes('scary')) return mockMovieDatabase.horror.join(', ');
  if (lowerQuery.includes('romance') || lowerQuery.includes('love')) return mockMovieDatabase.romance.join(', ');
  if (lowerQuery.includes('sci-fi') || lowerQuery.includes('science fiction') || lowerQuery.includes('scifi')) return mockMovieDatabase.sci_fi.join(', ');
  if (lowerQuery.includes('thriller') || lowerQuery.includes('suspense')) return mockMovieDatabase.thriller.join(', ');
  if (lowerQuery.includes('animation') || lowerQuery.includes('animated')) return mockMovieDatabase.animation.join(', ');
  if (lowerQuery.includes('adventure')) return mockMovieDatabase.adventure.join(', ');
  
  // Default recommendations
  return mockMovieDatabase.default.join(', ');
};
