import { useState, useCallback, useEffect } from 'react';
import Input from '@enact/sandstone/Input';
import BodyText from '@enact/sandstone/BodyText';

const SearchView = () => {
	const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

	const handleChange = useCallback(({ value }) => {
		setQuery(value);
	}, []);

    // Debounce logic
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300); // 300ms delay

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    // Effect to trigger search (mock)
    useEffect(() => {
        if (debouncedQuery) {
            console.log('Searching for:', debouncedQuery);
            // In real app: client.get('/search', { params: { q: debouncedQuery } })
        }
    }, [debouncedQuery]);

	return (
		<div style={{ padding: '50px' }}>
			<Input
				placeholder="Search..."
				value={query}
				onChange={handleChange}
			/>
            <div style={{ marginTop: '20px' }}>
                <BodyText>
                    {debouncedQuery ? `Results for: ${debouncedQuery}` : 'Type to search'}
                </BodyText>
            </div>
		</div>
	);
};

export default SearchView;
