import React, { useState } from 'react';
import Input from '@enact/sandstone/Input';
import Button from '@enact/sandstone/Button';

const SearchView = () => {
    const [query, setQuery] = useState('');

    const handleChange = ({ value }) => {
        setQuery(value);
    };

    return (
        <div style={{ padding: '50px' }}>
            <Input
                placeholder="Search..."
                value={query}
                onChange={handleChange}
            />
            <Button>Search</Button>
        </div>
    );
};

export default SearchView;
