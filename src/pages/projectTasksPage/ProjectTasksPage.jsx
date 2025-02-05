import {ProjectTasksTopMenu} from "../../components/layout/ProjectTasksTopMenu.jsx";
import {GroupList} from "../../components/list/GroupList.jsx";
import {useParams} from "react-router";
import {useGetProjectTasksQuery} from "../../api/projectsApi.js";
import {useEffect, useState} from "react";

export function ProjectTasksPage(){
    const { id } = useParams();
    const { data: resp,isLoading } = useGetProjectTasksQuery(id);
    const [groups, setGroups] = useState([]);
    const [project, setProject] = useState();
    const [authors,setAuthors] = useState();

    useEffect(() => {
        if (resp && resp.project) {
            setGroups(resp.project.groups);
            setProject(resp.project);
            setAuthors(resp.project.coauthors)
        }
    }, [resp]);

    const onGroupCreated = (newGroup) => {
        setGroups((prevGroups) => [...prevGroups, newGroup]);
    };
    const onGroupDeleted = (id) => {
        setGroups((prevGroups) => prevGroups.filter(group => group.id !== id));
    };

    return (
        <>
            {project && <ProjectTasksTopMenu project={project} />}
            <GroupList
                propGroups={groups}
                authors={authors}
                projectId={id}
                onGroupCreated={onGroupCreated}
                onGroupDeleted={onGroupDeleted}
            />
        </>
    )
}
