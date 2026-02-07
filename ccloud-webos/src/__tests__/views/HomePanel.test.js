import { render, screen } from '@testing-library/react';
import HomePanel from '../../views/HomePanel';

// Mock Enact components
jest.mock('@enact/sandstone/Panels', () => ({
    Panel: (props) => <div data-testid="panel">{props.children}</div>,
    Header: (props) => <div data-testid="header">{props.title}</div>
}));

jest.mock('@enact/sandstone/TabLayout', () => {
    return {
        __esModule: true,
        default: (props) => <div data-testid="tab-layout">{props.children}</div>,
        Tab: (props) => <div data-testid="tab" aria-label={props['aria-label']}>{props.title}</div>
    };
});

// Mock child views
jest.mock('../../views/MoviesView', () => () => <div data-testid="movies-view" />);
jest.mock('../../views/SeriesView', () => () => <div data-testid="series-view" />);
jest.mock('../../views/FavoritesView', () => () => <div data-testid="favorites-view" />);
jest.mock('../../views/SearchView', () => () => <div data-testid="search-view" />);
jest.mock('../../views/SettingsView', () => () => <div data-testid="settings-view" />);

describe('HomePanel', () => {
    it('should render correct structure', () => {
        render(<HomePanel />);
        expect(screen.getByTestId('header')).toHaveTextContent('CCloud');
        expect(screen.getByTestId('tab-layout')).toBeInTheDocument();
        expect(screen.getAllByTestId('tab')).toHaveLength(5);
    });

    it('should have aria-labels on tabs', () => {
        render(<HomePanel />);
        expect(screen.getByLabelText('Movies Section')).toBeInTheDocument();
        expect(screen.getByLabelText('Series Section')).toBeInTheDocument();
        expect(screen.getByLabelText('Favorites Section')).toBeInTheDocument();
        expect(screen.getByLabelText('Search Section')).toBeInTheDocument();
        expect(screen.getByLabelText('Settings Section')).toBeInTheDocument();
    });
});
