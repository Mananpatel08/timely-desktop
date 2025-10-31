import type { IWorklogGetResponse, WorklogFilters } from "@/types/worklog";
import apiClient from "./client";

export const WorklogService = {
    async getWorklogs(
        workspaceSlug: string,
        filters: WorklogFilters = {}
    ): Promise<IWorklogGetResponse> {
        const params = {
            ...filters,
            per_page: filters.per_page ?? 20,
        };

        const { data } = await apiClient.get(`api/workspaces/${workspaceSlug}/worklog/`,
            { params }
        );
        return data;
    }
};