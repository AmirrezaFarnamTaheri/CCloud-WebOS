import { useContext, useCallback } from 'react';
import { Header } from '@enact/sandstone/Panels';
import BodyText from '@enact/sandstone/BodyText';
import SwitchItem from '@enact/sandstone/SwitchItem';
import Input from '@enact/sandstone/Input';
import RadioItem from '@enact/sandstone/RadioItem';
import Group from '@enact/ui/Group';
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
		<div style={{ padding: '24px' }}>
			<Header title="Settings" type="mini" />

			<BodyText>Playback</BodyText>
			<SwitchItem
				selected={settings.autoplay}
				onToggle={handleAutoplayToggle}
			>
				Autoplay Videos
			</SwitchItem>

			<BodyText style={{ marginTop: '24px' }}>Appearance (Accent Color)</BodyText>
			<Group
				childComponent={RadioItem}
				selectedProp="selected"
				defaultSelected={selectedColorIndex >= 0 ? selectedColorIndex : 0}
				onSelect={handleColorSelect}
				select="radio"
			>
				{colorLabels}
			</Group>

			<BodyText style={{ marginTop: '24px' }}>Server Configuration</BodyText>
			<Input
				value={settings.serverUrl}
				onChange={handleUrlChange}
				placeholder="Enter Server API URL"
				style={{ width: '100%' }}
			/>
		</div>
	);
};

export default SettingsView;
