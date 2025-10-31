import { useGetWorklog } from "@/hooks";
import { useState } from "react";
import { WorklogHeader } from "./header";
import WorklogTable from "./body";

export const WorklogRoot = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useGetWorklog(
    "wedowebapps",
    searchQuery
  );
  return (
    <div>
      <WorklogHeader />
      <WorklogTable 
        records={data?.results ?? []}
      />
    </div>
  )
}
