import React, { useState } from 'react';

interface Item {
    label: string;
    value: number;
}
interface Props {
    items: Item[];
}
interface HeadlessComponentReturnType {
    filter: string;
    onFilterChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    filteredItems: Item[];
}

const HeadlessComponent = ({ items }: Props): HeadlessComponentReturnType => {
    const [filter, setFilter] = useState('');
    const onFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilter(event.target.value);
    };
    const filteredItems = items.filter(
        (item) => item.label.toLowerCase().includes(filter.toLowerCase())
    );
    return {
        filter,
        onFilterChange,
        filteredItems,
    };
};
export default HeadlessComponent;
