import { render, screen, act } from '@testing-library/react';
import { SettingsProvider, SettingsContext } from '../../store/SettingsContext';
import { useContext } from 'react';

const TestSettings = () => {
    const { settings, updateSetting } = useContext(SettingsContext);
    return (
        <div>
            <div data-testid="accent">{settings.accentColor}</div>
            <button onClick={() => updateSetting('accentColor', '#ff0000')}>Update</button>
        </div>
    );
};

describe('SettingsContext', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('should provide default settings', () => {
        render(
            <SettingsProvider>
                <TestSettings />
            </SettingsProvider>
        );
        expect(screen.getByTestId('accent')).toHaveTextContent('#e6e6e6');
    });

    it('should update setting', async () => {
        render(
            <SettingsProvider>
                <TestSettings />
            </SettingsProvider>
        );

        await act(async () => {
            screen.getByText('Update').click();
        });
        expect(screen.getByTestId('accent')).toHaveTextContent('#ff0000');
    });

    it('should persist settings', async () => {
        render(
            <SettingsProvider>
                <TestSettings />
            </SettingsProvider>
        );

        await act(async () => {
            screen.getByText('Update').click();
        });

        const stored = JSON.parse(window.localStorage.getItem('appSettings'));
        expect(stored.accentColor).toBe('#ff0000');
    });
});
