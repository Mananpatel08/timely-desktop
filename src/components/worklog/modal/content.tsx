import { Button } from '@/components/ui';
import type { IWorklog } from '@/types/worklog';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import TimeBadge from '../time-badge';
import { TotalTime } from './total-time-field';
import { WorklogDefaultProperties } from './worklog-default-properties';
import TypeDropdown from '@/components/ui/dropdowns/worklog-type';

type Props = {
    worklog: IWorklog | undefined;
    handleClose?: () => void;
    isUpdate: boolean;
    showToolbarInitially?: boolean;
};

export const WorkLogModalMainContent: React.FC<Props> = ((props) => {
    const { worklog, handleClose, isUpdate } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState<any | null>(null);
    const {
        control,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<IWorklog>({
        defaultValues: {
            worklog_type: worklog?.worklog_type || "",
            hours: worklog ? worklog.hours ?? 0 : undefined,
            minutes: worklog ? worklog.minutes ?? 0 : undefined,
            description: worklog?.description || "",
            project: worklog?.project || undefined,
            issue: worklog?.issue || undefined,
            date: worklog?.date || new Date().toISOString().split("T")[0],
        },
    });

    const watchedHours = watch("hours") || 0;
    const watchedMinutes = watch("minutes") || 0;
    const projectId = watch("project") || "";

    return (
        <div className="flex gap-2 bg-transparent">
            <div className="rounded-lg w-full">
                {/* main content */}
                <form
                    className="flex flex-col w-full"
                    onSubmit={handleSubmit(() => { })}
                >
                    <div className="p-5 rounded-t-lg bg-custom-background-100">
                        <h3 className="text-xl font-medium text-custom-text-200 pb-2">
                            {isUpdate ? "Update Worklog" : "Create Worklog"}
                        </h3>
                        {/* Worklog Type */}
                        <div className="flex items-center gap-3 pt-2 pb-4">
                            <div className="flex items-center gap-x-2">
                                <Controller
                                    control={control}
                                    name="worklog_type"
                                    rules={{ required: true }}
                                    render={() => (
                                        <div className="h-7">
                                            <TypeDropdown />
                                        </div>
                                    )}
                                />
                            </div>
                            <TimeBadge
                                watchedHours={watchedHours}
                                watchedMinutes={watchedMinutes}
                                className="px-2 py-0.5"
                            />
                        </div>

                        {/* Total time  */}
                        <div className="space-y-1">
                            <TotalTime control={control} errors={errors} watch={watch} />
                        </div>

                    </div>

                    {/* Description Section */}
                    <div className="pb-4 space-y-3 bg-custom-background-100">
                        <Controller
                            control={control}
                            name="description"
                            rules={{
                                required: "Description is required",
                                validate: (value: any) => {
                                    const text = value;
                                    return text.trim().split(/\s+/).length >= 10 || "Description must have at least 10 words";
                                }
                            }}
                            render={({ field: { value, onChange } }) => (
                                <div className="px-5">
                                    <input type="textarea" className='min-h-28 w-full flex items-center rounded border border-custom-border-300 outline-none focus:ring-0 p-2' value={value} onChange={onChange} />
                                    {errors.description && (
                                        <p className="text-xs text-red-500 pt-1">
                                            {errors.description.message as string}
                                        </p>
                                    )}
                                </div>
                            )}
                        />
                    </div>

                    <div className="px-4 py-3 border-t-[0.5px] border-custom-border-200 shadow-custom-shadow-xs rounded-b-lg bg-custom-background-100">
                        <div className="pb-3 border-b-[0.5px] border-custom-border-200">
                            <WorklogDefaultProperties
                                control={control}
                                watch={watch}
                                selectedIssue={selectedIssue}
                                setSelectedIssue={setSelectedIssue}
                                errors={errors}
                                projectId={projectId}
                            />
                        </div>
                        <div className="flex items-center justify-end gap-4 py-3">
                            <div className="flex items-center gap-2">
                                <div>
                                    <Button
                                        variant="neutral-primary"
                                        size="sm"
                                        onClick={handleClose}
                                    >
                                        Discard
                                    </Button>
                                </div>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    size="sm"
                                    disabled={isLoading}
                                >
                                    {isUpdate ? "Update Worklog" : "Add Worklog"}
                                </Button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
})
