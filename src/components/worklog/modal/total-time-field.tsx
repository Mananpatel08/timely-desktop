import type { FC } from 'react';
import { Controller } from 'react-hook-form';

type Props = {
    control: any;
    watch: any;
    errors?: any
}

export const TotalTime: FC<Props> = ((props) => {
    const {
        control,
        errors,
        watch,
    } = props;
    return (
        <>
            <div
                className={`flex items-center rounded border ${errors.hours || errors.minutes
                    ? "border-red-500"
                    : "border-custom-border-300"
                    }`}
            >
                {/* Hours */}
                <Controller
                    control={control}
                    name="hours"
                    rules={{
                        validate: (hoursValue) => {
                            const hours = Number(hoursValue) || 0;
                            const minutes = Number(watch("minutes")) || 0;
                            if (hours === 0 && minutes === 0) {
                                return "Total working time is required";
                            }
                            return true;
                        },
                    }}
                    render={({ field }) => (
                        <input
                            type="number"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(value === "" ? undefined : Number(value));
                            }}
                            placeholder="Hours"
                            className="w-1/2 rounded-l-lg border-none bg-transparent p-3 outline-none focus:ring-0"
                            min={0}
                        />
                    )}
                />

                <div className="h-6 w-px border border-custom-border-300"></div>

                {/* Minutes */}
                <Controller
                    control={control}
                    name="minutes"
                    rules={{
                        validate: (minutesValue) => {
                            const minutes = Number(minutesValue) || 0;
                            const hours = Number(watch("hours")) || 0;
                            if (hours === 0 && minutes === 0) {
                                return "Total working time is required";
                            }
                            return true;
                        },
                    }}
                    render={({ field }) => (
                        <input
                            type="number"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(value === "" ? undefined : Number(value));
                            }}
                            placeholder="Minutes"
                            className="w-1/2 rounded-r-lg border-none bg-transparent p-3 outline-none focus:ring-0"
                            min={0}
                            max={59}
                        />
                    )}
                />
            </div>

            {(errors.hours || errors.minutes) && (
                <p className="text-xs text-red-500">
                    Total working time is required
                </p>
            )}
        </>
    )
})
