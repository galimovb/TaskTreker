import {ProjectListItem} from '../item/ProjectListItem.jsx';
import {NewProjectCard} from '../NewProjectCard.jsx';
import {useState} from 'react';
import {NewProjectModal} from '../modal/NewProjectModal.jsx';
import {useGetProjectsQuery, useGetProjectTasksQuery} from '../../api/projectsApi.js';

export function ProjectList({ searchQuery }) {
    const { data: response, isLoading, isError, error } = useGetProjectsQuery(
        { search: searchQuery },
    );
    const [isNewProjectModal, setIsNewProjectModal] = useState(false);

    const projects = response?.projects || [];

    if (projects.length === 0) {
        return (
            <div className="mt-5 grid grid-cols-3 gap-2">
                <NewProjectCard
                    setIsNewProjectModal={setIsNewProjectModal}
                />
                <NewProjectModal
                    open={isNewProjectModal}
                    setIsNewProjectModal={setIsNewProjectModal}
                />
            </div>
        );
    }

    // Если projects не пуст, отображаем список проектов
    return (
        <div className='mt-5 grid grid-cols-3 gap-2'>
            {projects.map((item, index) => (
                <ProjectListItem
                    key={index}
                    item={item}
                />
            ))}
            <NewProjectCard
                setIsNewProjectModal={setIsNewProjectModal}
            />
            <NewProjectModal
                open={isNewProjectModal}
                setIsNewProjectModal={setIsNewProjectModal}
            />
        </div>
    );
}
