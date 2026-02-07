import { Panel, Header } from '@enact/sandstone/Panels';
import TabLayout, { Tab } from '@enact/sandstone/TabLayout';
import MoviesView from './MoviesView';
import SeriesView from './SeriesView';
import FavoritesView from './FavoritesView';
import SearchView from './SearchView';
import SettingsView from './SettingsView';

const HomePanel = ({ onNavigate, ...rest }) => {
	return (
		<Panel {...rest}>
			<Header
				title="CCloud"
				subtitle="Your Ultimate Streaming Experience"
				type="standard"
			/>
			<TabLayout
                orientation="vertical"
                collapsed={false}
            >
				<Tab title="Movies" icon="play" aria-label="Movies Section">
					<MoviesView onNavigate={onNavigate} />
				</Tab>
				<Tab title="Series" icon="list" aria-label="Series Section">
					<SeriesView onNavigate={onNavigate} />
				</Tab>
				<Tab title="Favorites" icon="star" aria-label="Favorites Section">
					<FavoritesView onNavigate={onNavigate} />
				</Tab>
				<Tab title="Search" icon="search" aria-label="Search Section">
					<SearchView onNavigate={onNavigate} />
				</Tab>
				<Tab title="Settings" icon="gear" aria-label="Settings Section">
					<SettingsView />
				</Tab>
			</TabLayout>
		</Panel>
	);
};

export default HomePanel;
