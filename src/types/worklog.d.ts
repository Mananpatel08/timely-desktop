export type IPartialWorklog = {
    id: string;
    project?: string;
    issue?: string;
    start_time?: string;
    end_time?: string;
    date?: string;
    description?: string;
    created_at: string;
    updated_at?: string;
    is_approved?: boolean;
    key?: boolean;
    estimate?: boolean;
}

export type IWorklog = IPartialWorklog & {
    user?: {
        id: string;
        first_name: string;
        last_name: string;
        avatar: string;
        avatar_url: string;
        is_bot: boolean;
        display_name: string;
    }
    user_name?: string;
    title?: string;
    on_leave?: boolean;
    hours?: number;
    minutes?: number;
    created_by?: string;
    updated_by?: string;
    worklog_type?: string;
    workspace?: string;
    is_draft?: boolean;
    total_hours?: string;
    project_name?: string;
    issue_name?: string;
    view: any;
    identifier: number;
}

export type IWorklogGetResponse = {
    total_count: number;
    grouped_by: string;
    sub_grouped_by?: string;
    next_cursor?: string;
    prev_cursor?: string;
    next_page_results?: boolean;
    prev_page_results?: boolean;
    count: number;
    total_pages: number;
    total_results: number;
    extra_stats?: any;
    results: IWorklog[];
    user?: {
        id: string;
        first_name: string;
        last_name: string;
        avatar: string;
        avatar_url: string;
        is_bot: boolean;
        display_name: string;
    }
    total_worked_hours?: {
        total_hours: number;
    }
}

interface WorklogFilters {
  search?: string;
  project?: string | null;
  user?: string | null;
  worklog_type?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  per_page?: number;
  cursor?: string | null;
}