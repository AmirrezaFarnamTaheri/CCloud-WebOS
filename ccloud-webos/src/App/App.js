import React from 'react';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import TabLayout, {Tab} from '@enact/sandstone/TabLayout';

import MoviesView from '../views/MoviesView';
import SeriesView from '../views/SeriesView';
import FavoritesView from '../views/FavoritesView';
import SearchView from '../views/SearchView';
import { FavoritesProvider } from '../store/FavoritesContext';

const App = (props) => {
	return (
		<FavoritesProvider>
			<TabLayout orientation="vertical">
				<Tab title="Movies" icon="play">
					<MoviesView />
				</Tab>
				<Tab title="Series" icon="list">
					<SeriesView />
				</Tab>
				<Tab title="Favorites" icon="star">
					<FavoritesView />
				</Tab>
				<Tab title="Search" icon="search">
					<SearchView />
				</Tab>
				<Tab title="Settings" icon="gear">
					<div style={{padding: '50px'}}>Settings Placeholder</div>
				</Tab>
			</TabLayout>
		</FavoritesProvider>
	);
};

export default ThemeDecorator(App);
