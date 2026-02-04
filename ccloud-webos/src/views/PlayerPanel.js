import { Panel } from '@enact/sandstone/Panels';
import StreamPlayer from '../components/StreamPlayer';

const PlayerPanel = ({ url, onBack, ...rest }) => {
	return (
		<Panel {...rest} noCloseButton>
			<StreamPlayer
				src={url}
				onBack={onBack}
				autoPlay
			/>
		</Panel>
	);
};

export default PlayerPanel;
