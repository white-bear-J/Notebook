import React from 'react';
import HeadlessComponent from './headlessHook';
interface Props {
    items: {
        label: string;
        value: number;
    }[];
    onSelectItem: (item: { label: string; value: number }) => void;
}
const Dropdown = ({ items, onSelectItem }: Props) => {
    const { filter, onFilterChange, filteredItems } = HeadlessComponent({items});
    const dropdownItems = filteredItems.map((item) => (
        <li key={item.value} onClick={() => onSelectItem(item)}>
            <a>{item.label}</a>
        </li>
    ));
    return (
        <div>
            {/* <input type="text" value={filter} onChange={onFilterChange} /> */}
            <select
                value={filter}
                onChange={onFilterChange} >
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
            <ul>{dropdownItems}</ul>
        </div>
    );
};
export default Dropdown;
