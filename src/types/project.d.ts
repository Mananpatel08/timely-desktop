export interface IPartialProject {
    id: string;
    name: string;
    identifier: string;
    sort_order: number | null;
    logo_props: TLogoProps;
    member_role?: TUserPermissions | EUserProjectRoles | null;
    archived_at: string | null;
    workspace: IWorkspace | string;
    cycle_view: boolean;
    issue_views_view: boolean;
    module_view: boolean;
    page_view: boolean;
    inbox_view: boolean;
    guest_view_all_features?: boolean;
    project_lead?: IUserLite | string | null;
    network?: number;
    // Timestamps
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    // actor
    created_by?: string;
    updated_by?: string;
    project_url?: string;
    project_client?: string;

    // analytics
    total_issues?: number;
    assigned_issues?: number;
    pending_issues?: number;
    testing_issues?: number;
    in_progress_issues?: number;
    done_issues?: number;
    completed_issues?: number;
    cancelled_issues?: number;
    startdate?: string;
    deadline?: string;
    allow_notification?: boolean;
}

export interface IProject extends IPartialProject {
    archive_in?: number;
    close_in?: number;
    // only for uploading the cover image
    cover_image_asset?: null;
    cover_image?: string;
    // only for rendering the cover image
    readonly cover_image_url?: string;
    default_assignee?: IUser | string | null;
    default_state?: string | null;
    description?: string;
    estimate?: string | null;
    anchor?: string | null;
    is_favorite?: boolean;
    members?: string[];
    timezone?: string;
}