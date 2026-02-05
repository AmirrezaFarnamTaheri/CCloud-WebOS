import { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
	const [settings, setSettings] = useState({
		accentColor: '#e6e6e6', // Default accent
		serverUrl: 'https://server-hi-speed-iran.info/api',
		autoplay: true
	});

	useEffect(() => {
		if (typeof window === 'undefined' || !window.localStorage) return;

		try {
			const stored = JSON.parse(window.localStorage.getItem('appSettings'));
			if (stored) {
				setSettings((prev) => ({ ...prev, ...stored }));
			}
		} catch (e) {
			console.error('Failed to load settings', e);
		}
	}, []);

	const updateSetting = (key, value) => {
		setSettings((prev) => {
			const next = { ...prev, [key]: value };
			try {
				if (typeof window !== 'undefined' && window.localStorage) {
					window.localStorage.setItem('appSettings', JSON.stringify(next));
				}
			} catch (e) {
				console.warn('Failed to save settings', e);
			}
			return next;
		});
	};

	return (
		<SettingsContext.Provider value={{ settings, updateSetting }}>
			{children}
		</SettingsContext.Provider>
	);
};
