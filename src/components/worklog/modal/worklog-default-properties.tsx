import { LayoutPanelTop, X } from "lucide-react";
import { useState, type FC } from "react";
import { Controller } from "react-hook-form";

type Props = {
    control: any;
    watch: any;
    selectedIssue: any;
    setSelectedIssue: any;
    errors?: any;
    projectId?: any
}

export const WorklogDefaultProperties: FC<Props> = ((props) => {
    const { control, selectedIssue, setSelectedIssue, projectId } = props;
    const [issueListModalOpen, setIssueListModalOpen] = useState(false);


    return (
        <div className="flex flex-wrap items-center gap-2">
            {/* <Controller
                control={control}
                name="project"
                render={({ field: { value, onChange } }) => (
                    <div className="h-7">
                        <ProjectDropdown
                            value={value ? value : null}
                            onChange={onChange}
                            multiple={false}
                            buttonVariant='border-with-text'
                            showDefaultIcon={true}
                            isClearable={true}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="issue"
                render={({ field: { onChange } }) => (
                    <>
                        {selectedIssue ? (
                            <div className={`flex w-min items-center gap-2 whitespace-nowrap rounded border border-custom-border-300 px-2 py-0.5 h-7 text-xs`}>
                                <div className="flex items-center gap-2">
                                    <span
                                        className="block h-1.5 w-1.5 rounded-full"
                                        style={{
                                            backgroundColor: selectedIssue.state__color,
                                        }}
                                    />
                                    <span className="flex-shrink-0 text-custom-text-200">
                                        {selectedIssue?.project_id && (
                                            <IssueIdentifier
                                                projectId={selectedIssue.project_id}
                                                issueTypeId={selectedIssue.type_id}
                                                projectIdentifier={selectedIssue?.project__identifier}
                                                issueSequenceId={selectedIssue.sequence_id}
                                                textContainerClassName="text-xs"
                                            />
                                        )}
                                    </span>
                                    <span className="truncate font-medium">{selectedIssue.name.substring(0, 50)}</span>
                                    <button
                                        type="button"
                                        className="grid place-items-center"
                                        onClick={() => {
                                            onChange(null);
                                            setSelectedIssue(null);
                                        }}
                                    >
                                        <X className="h-3 w-3 cursor-pointer" />
                                    </button>
                                </div>
                            </div>
                        ) : projectId && (
                            <div className="h-7">
                                <button
                                    type="button"
                                    className="flex cursor-pointer items-center justify-between gap-1.5 h-full rounded border-[0.5px] border-custom-border-300 px-2 py-0.5 text-xs hover:bg-custom-background-80"
                                    onClick={() => setIssueListModalOpen(true)}
                                >
                                    <LayoutPanelTop className="h-3 w-3 flex-shrink-0" />
                                    <span className="whitespace-nowrap">Add Ticket</span>
                                </button>
                            </div>
                        )}
                        <ParentIssuesListModal
                            isOpen={issueListModalOpen}
                            handleClose={() => setIssueListModalOpen(false)}
                            onChange={(issue) => {
                                onChange(issue.id);
                                setSelectedIssue(issue);
                            }}
                            projectId={projectId ?? undefined}
                        />
                    </>

                )}
            />
            <Controller
                control={control}
                name="date"
                rules={{
                    required: true,
                }}
                render={({ field: { value, onChange } }) => (
                    <div className="h-7">
                        <DateDropdown
                            value={value ? new Date(value) : null}
                            onChange={(val: Date | null) => {
                                if (val) {
                                    const formatted = val.toLocaleDateString("en-CA");
                                    onChange(formatted);
                                } else {
                                    onChange(null);
                                }
                            }}
                            buttonVariant="border-with-text"
                            placeholder="Date"
                            isClearable={false}
                            clearIconClassName="h-3 w-3 flex-shrink-0"
                            maxDate={new Date()}
                        />
                    </div>
                )}
            /> */}
        </div>
    )
})
