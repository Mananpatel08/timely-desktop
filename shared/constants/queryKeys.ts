export const GET_WORKLOGS = (
  workspaceSlug: string,
  search: string,
  page: string,
  project: string,
  user: string,
  worklog_type: string,
  start_date: string,
  end_date: string
) => [
  "worklogs",
  workspaceSlug,
  search,
  page,
  project,
  user,
  worklog_type,
  start_date,
  end_date,
];
