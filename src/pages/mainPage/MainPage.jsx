import { useState } from 'react';
import { SearchInputBlock } from '../../components/SearchInputBlock.jsx';
import { ProjectList } from '../../components/list/ProjectList.jsx';

export function MainPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (value) => {
        setSearchQuery(value);
    };

    return (
        <div>
            <SearchInputBlock onSearch={handleSearch} />
            <div className='px-5 pb-5'>
                <ProjectList searchQuery={searchQuery} />
            </div>
        </div>
    );
}
