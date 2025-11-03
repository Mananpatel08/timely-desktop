import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import type { IWorklogGetResponse } from "@/types/worklog";
import { WorklogService } from "@/api/worklog";
import { GET_WORKLOGS } from "@shared/constants";

export const useGetWorklog = (
    workspaceSlug: string,
    searchQuery: string,
    enabled: boolean = true
): UseQueryResult<IWorklogGetResponse, Error> => {
    const storedProject = localStorage.getItem("project");
    const storedUser = localStorage.getItem("user");
    const storedWorklogType = localStorage.getItem("worklog_type");
    const start_date = localStorage.getItem("start_date") ?? "";
    const end_date = localStorage.getItem("end_date") ?? "";
    const cursor = localStorage.getItem("cursor") ?? "20:0:1";

    const project = storedProject ? storedProject.split(",") : [];
    const user = storedUser ? storedUser.split(",") : [];
    const worklog_type = storedWorklogType ? storedWorklogType.split(",") : [];

    const filters = {
        search: searchQuery,
        project: project.join(","),
        user: user.join(","),
        worklog_type: worklog_type.join(","),
        start_date,
        end_date,
        cursor,
    };

    return useQuery<IWorklogGetResponse, Error>({
        queryKey: GET_WORKLOGS(
            workspaceSlug,
            searchQuery,
            cursor,
            project.join(","),
            user.join(","),
            worklog_type.join(","),
            start_date,
            end_date
        ),
        queryFn: () => WorklogService.getWorklogs(workspaceSlug, filters),
        enabled,
        select: (data) => {
            if (Array.isArray((data as any)?.results)) return data;
            return { results: Array.isArray(data) ? data : [data] } as IWorklogGetResponse;
        },
    });
};
