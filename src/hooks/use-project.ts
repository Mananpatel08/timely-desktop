import { ProjectService } from "@/api/project";
import type { IProject } from "@/types/project";
import { useQuery } from "@tanstack/react-query";

export const useProjects = (workspaceSlug: string) => {
    return useQuery({
        queryKey: ["projects", workspaceSlug],
        queryFn: () => ProjectService.getProjects(workspaceSlug),
        enabled: Boolean(workspaceSlug),
    });
};

export const useJoinedProjects = (workspaceSlug: string) => {
    return useQuery({
        queryKey: ["joined-projects", workspaceSlug],
        queryFn: () => ProjectService.getProjects(workspaceSlug),
        enabled: Boolean(workspaceSlug),
        select: (projects) =>
            projects?.filter(
                (project: IProject) =>
                    !!project.member_role &&
                    !project.archived_at &&
                    !project.deleted_at
            ) ?? [],
    });
};
