import { AuthService } from '@/api/auth';
import React, { useEffect, useRef, useState } from 'react'
import TimelyLogo from '@/assets/timely-logo/timely-logo-white.png'
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();
    const [csrfPromise, setCsrfPromise] = useState<Promise<{ csrf_token: string }> | undefined>(undefined);

    const {
        control,
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            csrfmiddlewaretoken: ''
        }
    });

    const onSubmit = async (formData: any) => {
        try {
            const token = await csrfPromise;
            if (!token?.csrf_token) {
                console.error("Missing CSRF token");
                return;
            }

            const data = {
                ...formData,
                csrfmiddlewaretoken: token.csrf_token,
            };

            console.log("Submitting with data:", data);
            const res = await AuthService.login(data);
            if (res) {
                navigate("/worklog");
            }
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        if (csrfPromise === undefined) {
            const promise = AuthService.requestCSRFToken();
            setCsrfPromise(promise);
        }
    }, [csrfPromise]);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-white">
            {/* Logo */}
            <div className="absolute top-6 left-8 flex items-center space-x-2">
                <img
                    src={TimelyLogo}
                    alt="Timely Logo"
                    className="h-[42px] w-[133px]"
                />
            </div>

            {/* Center Content */}
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="w-full max-w-sm text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Login
                    </h2>
                    <p className="text-gray-500 mb-6">Welcome back to timely.</p>

                    {/* Email Input */}
                    <div className="space-y-4">
                        <div className="space-y-1.5 flex flex-col items-start">
                            <label htmlFor="email" className="text-sm text-gray-500 font-medium">Email</label>
                            <Controller
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="email"
                                        placeholder="name@company.com"
                                        className="w-full border rounded-md px-3 py-2 text-sm outline-none"
                                    />
                                )}
                            />
                        </div>

                        <input type="hidden" {...register("csrfmiddlewaretoken")} />

                        <div className="space-y-1.5 flex flex-col items-start">
                            <label htmlFor="password" className="text-sm text-gray-500 font-medium">Password</label>
                            <Controller
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="password"
                                        placeholder="........."
                                        className="w-full border rounded-md px-3 py-2 text-sm outline-none"
                                    />
                                )}
                            />
                        </div>

                        <button type="submit" className="w-full bg-blue-500 text-white font-medium rounded-md py-2 hover:bg-blue-600">
                            Continue
                        </button>
                    </div>

                    {/* Terms */}
                    <p className="mt-4 text-xs text-gray-500">
                        By signing in, you understand and agree to our{" "}
                        <a href="#" className="text-sky-700 hover:underline">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-sky-700 hover:underline">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </form>

        </div>
    )
}
