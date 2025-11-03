import apiClient from "./client";

export const ProjectService = {
    getProjects: async (
        workspaceSlug: string
    ) => {
        const { data } = await apiClient.get(`/api/workspaces/${workspaceSlug}/projects/details/`);
        return data;
    },
};