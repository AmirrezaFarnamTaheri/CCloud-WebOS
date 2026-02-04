import { Panel, Header } from '@enact/sandstone/Panels';
import TabLayout, { Tab } from '@enact/sandstone/TabLayout';
import MoviesView from './MoviesView';
import SeriesView from './SeriesView';
import FavoritesView from './FavoritesView';
import SearchView from './SearchView';
import SettingsView from './SettingsView';

const HomePanel = ({ onNavigate, ...rest }) => {
	// Pass onNavigate to views so they can trigger details
	return (
		<Panel {...rest}>
			<Header title="CCloud" type="mini" />
			<TabLayout orientation="vertical">
				<Tab title="Movies" icon="play">
					<MoviesView onNavigate={onNavigate} />
				</Tab>
				<Tab title="Series" icon="list">
					<SeriesView onNavigate={onNavigate} />
				</Tab>
				<Tab title="Favorites" icon="star">
					<FavoritesView onNavigate={onNavigate} />
				</Tab>
				<Tab title="Search" icon="search">
					<SearchView onNavigate={onNavigate} />
				</Tab>
				<Tab title="Settings" icon="gear">
					<SettingsView />
				</Tab>
			</TabLayout>
		</Panel>
	);
};

export default HomePanel;
