import React, { useContext } from 'react';
import { VirtualGridList } from '@enact/sandstone/VirtualList';
import Poster from '../components/Poster';
import { FavoritesContext } from '../store/FavoritesContext';

const FavoritesView = () => {
    const { favorites } = useContext(FavoritesContext);

    const renderItem = ({ index, ...rest }) => {
        const item = favorites[index];
        return (
            <Poster
                {...rest}
                key={index}
                src={item.posterPath}
                label={item.title}
            >
                {item.title}
            </Poster>
        );
    };

    return (
        <VirtualGridList
            dataSize={favorites.length}
            itemRenderer={renderItem}
            itemSize={{ minWidth: 300, minHeight: 450 }}
            spacing={20}
        />
    );
};

export default FavoritesView;
