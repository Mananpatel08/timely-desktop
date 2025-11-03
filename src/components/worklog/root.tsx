import { useGetWorklog } from "@/hooks";
import { useState } from "react";
import { WorklogHeader } from "./header";
import WorklogTable from "./body";
import { useJoinedProjects, useProjects } from "@/hooks/use-project";

export const WorklogRoot = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useGetWorklog(
    "wedowebapps",
    searchQuery
  );
  const { data: projects, isLoading, error } = useJoinedProjects("wedowebapps");
  console.log("projects", projects)
  return (
    <div>
      <WorklogHeader />
      <WorklogTable
        records={data?.results ?? []}
      />
    </div>
  )
}
