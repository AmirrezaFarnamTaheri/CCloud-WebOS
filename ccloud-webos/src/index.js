/* global ENACT_PACK_ISOMORPHIC */
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';

const appElement = (<App />);

// In a real Enact environment, ENACT_PACK_ISOMORPHIC might be injected by Webpack.
// If not defined, we default to client-side rendering.
const isomorphic = typeof ENACT_PACK_ISOMORPHIC !== 'undefined' && ENACT_PACK_ISOMORPHIC;

if (typeof window !== 'undefined') {
    const root = document.getElementById('root');
	if (!root) {
		console.error('Missing #root element; cannot start application.');
	} else if (isomorphic) {
		hydrateRoot(root, appElement);
	} else {
		createRoot(root).render(appElement);
	}
}

export default appElement;
