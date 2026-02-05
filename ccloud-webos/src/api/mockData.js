// Centralized mock data generator
const generateMockData = (type, count, startId = 0) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `${type}_${startId + i}`,
        type: type,
        title: `${type === 'movie' ? 'Movie' : 'Series'} Title ${startId + i}`,
        description: `This is a detailed description for ${type === 'movie' ? 'Movie' : 'Series'} ${startId + i}. It features intense drama, cutting-edge visuals, and a compelling narrative.`,
        poster: 'https://via.placeholder.com/300x450',
        backdrop: 'https://via.placeholder.com/1920x1080',
        posterPath: 'https://via.placeholder.com/300x450', // Ensure consistent property
        rating: Number((Math.random() * 5 + 5).toFixed(1)),
        year: 2020 + (i % 5),
        duration: type === 'movie' ? `${90 + (i % 60)} min` : undefined,
        seasons: type === 'series' ? `${1 + (i % 8)} Seasons` : undefined
    }));
};

// Initial datasets
export const mockMovies = generateMockData('movie', 100);
export const mockSeries = generateMockData('series', 100, 1000);

export const searchMockData = (query) => {
    const q = String(query ?? '').trim().toLowerCase();
    if (!q) return [];

    const movies = mockMovies.filter(m => m.title.toLowerCase().includes(q));
    const series = mockSeries.filter(s => s.title.toLowerCase().includes(q));
    return [...movies, ...series];
};
