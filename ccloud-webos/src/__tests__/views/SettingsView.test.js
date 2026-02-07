import { render, screen, fireEvent } from '@testing-library/react';
import SettingsView from '../../views/SettingsView';
import { SettingsContext } from '../../store/SettingsContext';

// Mock Enact components
jest.mock('@enact/sandstone/Panels', () => ({
    Panel: (props) => <div>{props.children}</div>,
    Header: (props) => <div>{props.title}</div>
}));
jest.mock('@enact/sandstone/Scroller', () => (props) => <div>{props.children}</div>);
jest.mock('@enact/sandstone/Item', () => (props) => <div onClick={props.onClick}>{props.children}</div>);
jest.mock('@enact/sandstone/SwitchItem', () => (props) => (
    <div onClick={props.onToggle}>{props.children}: {props.selected ? 'On' : 'Off'}</div>
));
jest.mock('@enact/sandstone/Slider', () => (props) => <div>Slider</div>);
jest.mock('@enact/sandstone/Input', () => (props) => (
    <input
        data-testid="server-input"
        value={props.value}
        onChange={(e) => props.onChange({ value: e.target.value })}
    />
));
// Mock RadioItem
jest.mock('@enact/sandstone/RadioItem', () => (props) => (
    <div onClick={props.onClick}>{props.children}</div>
));
jest.mock('@enact/ui/Group', () => (props) => <div>{props.children}</div>);
jest.mock('@enact/sandstone/Heading', () => (props) => <div>{props.children}</div>);

describe('SettingsView', () => {
    const mockSettings = {
        accentColor: '#e6e6e6',
        serverUrl: 'http://test.com',
        autoplay: true
    };
    const mockUpdateSetting = jest.fn();

    const renderSettings = () => {
        render(
            <SettingsContext.Provider value={{ settings: mockSettings, updateSetting: mockUpdateSetting }}>
                <SettingsView />
            </SettingsContext.Provider>
        );
    };

    it('should render settings', () => {
        renderSettings();
        expect(screen.getByDisplayValue('http://test.com')).toBeInTheDocument();
        expect(screen.getByText(/Autoplay Videos/)).toBeInTheDocument();
    });

    it('should update server URL', () => {
        renderSettings();
        const input = screen.getByTestId('server-input');
        fireEvent.change(input, { target: { value: 'http://new.com' } });
        expect(mockUpdateSetting).toHaveBeenCalledWith('serverUrl', 'http://new.com');
    });

    it('should toggle autoplay', () => {
        renderSettings();
        fireEvent.click(screen.getByText(/Autoplay Videos/));
        expect(mockUpdateSetting).toHaveBeenCalledWith('autoplay', false);
    });
});
