import { Input } from 'antd';

const { Search } = Input;

export function SearchInputBlock({ onSearch }) {
    return (
        <div className='bg-gray-50 px-5 py-3 border-b border-gray-200'>
            <Search
                placeholder="Найти проект"
                allowClear
                onSearch={onSearch}
                size={'large'}
            />
        </div>
    );
}
