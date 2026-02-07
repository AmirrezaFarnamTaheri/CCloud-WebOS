import { mockMovies, mockSeries, searchMockData } from '../../api/mockData';

describe('Mock Data', () => {
    it('should have mock movies', () => {
        expect(mockMovies.length).toBeGreaterThan(0);
        expect(mockMovies[0]).toHaveProperty('id');
        expect(mockMovies[0].type).toBe('movie');
    });

    it('should have mock series', () => {
        expect(mockSeries.length).toBeGreaterThan(0);
        expect(mockSeries[0]).toHaveProperty('id');
        expect(mockSeries[0].type).toBe('series');
    });

    it('should search correctly', () => {
        const result = searchMockData('Movie Title 0');
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].title).toContain('Movie Title 0');
    });

    it('should return empty array for empty query', () => {
        expect(searchMockData('')).toEqual([]);
        expect(searchMockData(null)).toEqual([]);
    });

    it('should be case insensitive', () => {
        const result = searchMockData('movie title 0');
        expect(result.length).toBeGreaterThan(0);
    });
});
