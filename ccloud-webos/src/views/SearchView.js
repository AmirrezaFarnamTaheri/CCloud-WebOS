import { useState, useCallback, useEffect } from 'react';
import Input from '@enact/sandstone/Input';
import BodyText from '@enact/sandstone/BodyText';
import { VirtualGridList } from '@enact/sandstone/VirtualList';
import Poster from '../components/Poster';
import { searchMockData } from '../api/mockData';

const SearchView = ({ onNavigate, ...rest }) => {
	const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [results, setResults] = useState([]);

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

    // Perform search
    useEffect(() => {
        if (debouncedQuery) {
            const data = searchMockData(debouncedQuery);
            setResults(data);
        } else {
            setResults([]);
        }
    }, [debouncedQuery]);

    const handleItemClick = useCallback((index) => {
		if (onNavigate && results[index]) {
			onNavigate(results[index]);
		}
	}, [results, onNavigate]);

    const renderItem = useCallback(({ index, ...itemRest }) => {
		const item = results[index];
        if (!item) return null;

		return (
			<Poster
				{...itemRest}
				key={item.id || index}
				index={index}
				src={item.poster || item.posterPath}
				label={item.title}
				onClick={handleItemClick}
			/>
		);
	}, [results, handleItemClick]);

	return (
		<div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
			<Input
				placeholder="Search..."
				value={query}
				onChange={handleChange}
                spotlightDisabled={false}
			/>
            <div style={{ marginTop: '20px', flex: 1 }}>
                <BodyText>
                    {debouncedQuery ? (results.length > 0 ? `Results for: ${debouncedQuery}` : `No results for: ${debouncedQuery}`) : 'Type to search for movies or series'}
                </BodyText>

                {results.length > 0 && (
                    <VirtualGridList
                        {...rest}
                        dataSize={results.length}
                        itemRenderer={renderItem}
                        itemSize={{ minWidth: 260, minHeight: 440 }}
                        spacing={24}
                        wrap
                        style={{ height: 'calc(100vh - 200px)' }} // Adjust based on layout
                    />
                )}
            </div>
		</div>
	);
};

export default SearchView;
