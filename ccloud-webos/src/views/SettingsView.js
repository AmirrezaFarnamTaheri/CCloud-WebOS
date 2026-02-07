import { useContext, useCallback } from 'react';
import { Header } from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import SwitchItem from '@enact/sandstone/SwitchItem';
import Input from '@enact/sandstone/Input';
import RadioItem from '@enact/sandstone/RadioItem';
import Group from '@enact/ui/Group';
import Heading from '@enact/sandstone/Heading';
import { SettingsContext } from '../store/SettingsContext';

const SettingsView = () => {
	const { settings, updateSetting } = useContext(SettingsContext);

	const handleAutoplayToggle = useCallback(() => {
		updateSetting('autoplay', !settings.autoplay);
	}, [settings.autoplay, updateSetting]);

	const handleUrlChange = useCallback(({ value }) => {
		updateSetting('serverUrl', value);
	}, [updateSetting]);

	const handleColorSelect = useCallback(({ selected }) => {
		const colorValues = ['#e6e6e6', '#ff4d4d', '#4d79ff', '#50c878'];
		updateSetting('accentColor', colorValues[selected]);
	}, [updateSetting]);

	const colorLabels = ['Default (Silver)', 'Red', 'Blue', 'Green'];
	const selectedColorIndex = ['#e6e6e6', '#ff4d4d', '#4d79ff', '#50c878'].indexOf(settings.accentColor);

	return (
		<Scroller>
			<div style={{ padding: '0 2rem 2rem' }}>
				<Header title="Settings" type="mini" subtitle="Customize your experience" />

				<Heading showLine>Playback</Heading>
				<SwitchItem
					selected={settings.autoplay}
					onToggle={handleAutoplayToggle}
				>
					Autoplay Videos
				</SwitchItem>

				<Heading showLine style={{ marginTop: '2rem' }}>Appearance</Heading>
				<Group
					childComponent={RadioItem}
					selectedProp="selected"
					selected={selectedColorIndex >= 0 ? selectedColorIndex : 0}
					onSelect={handleColorSelect}
					select="radio"
				>
					{colorLabels}
				</Group>

				<Heading showLine style={{ marginTop: '2rem' }}>Server Configuration</Heading>
				<Input
					value={settings.serverUrl}
					onChange={handleUrlChange}
					placeholder="Enter Server API URL"
					style={{ width: '100%', maxWidth: '600px' }}
					iconAfter="server"
				/>
			</div>
		</Scroller>
	);
};

export default SettingsView;
