export default function LoginPage() {
    return (
        <main className="min-h-screen max-h-screen flex items-center justify-center relative overflow-hidden px-4 bg-white">
            <div className="w-full max-w-[480px] my-12">
                <div className="backdrop-blur-xl bg-white/80 rounded-2xl shadow-[0px_10px_40px_rgba(59,130,246,0.15)] border border-blue-100 overflow-hidden">
                <div className="flex border-b border-blue-100">

                    <button className="flex-1 py-5 text-center text-sm font-semibold border-b-2 border-blue-500 text-blue-600 transition-all duration-200">
                    Sign In
                    </button>

                    <button className="flex-1 py-5 text-center text-sm font-semibold border-b-2 border-transparent text-gray-400 hover:text-gray-700 hover:bg-blue-50 transition-all duration-200">
                    Create Account
                    </button>

                </div>

                <div className="p-6 md:p-8">
                    <div className="mb-8 text-center">

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome Back
                    </h1>

                    <p className="text-gray-500">
                        Please enter your details to access your account.
                    </p>

                    </div>
                    <div className="relative mb-6 flex items-center">
                    <div className="flex-grow border-t border-gray-200"></div>

                    <span className="mx-4 text-xs uppercase tracking-[3px] text-gray-400">
                        or continue with email
                    </span>

                    <div className="flex-grow border-t border-gray-200"></div>

                    </div>
                    <form className="space-y-6">
                    <div className="space-y-2">
                        <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                        >
                        Email Address
                        </label>

                        <input
                        type="email"
                        id="email"
                        placeholder="name@company.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 placeholder:text-gray-400"
                        />

                    </div>
                    <div className="space-y-2">

                        <div className="flex justify-between items-center">

                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>

                        <a
                            href="#"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Forgot?
                        </a>

                        </div>

                        <div className="relative">

                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 placeholder:text-gray-400"
                        />

                        <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[20px]">
                            visibility
                            </span>
                        </button>

                        </div>

                    </div>

                    {/* Remember */}
                    <div className="flex items-center gap-2">

                        <input
                        type="checkbox"
                        id="remember"
                        className="w-4 h-4 accent-blue-600"
                        />

                        <label
                        htmlFor="remember"
                        className="text-sm text-gray-500 select-none"
                        >
                        Remember me for 30 days
                        </label>

                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200"
                    >
                        Sign In
                    </button>

                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center">

                    <p className="text-gray-500">
                        New here?{" "}

                        <a
                        href="#"
                        className="text-blue-600 font-semibold hover:underline"
                        >
                        Create account
                        </a>

                    </p>

                    </div>

                </div>

                </div>

                {/* Bottom Trust */}
                <div className="mt-6 flex justify-center gap-8 text-gray-400">

                <div className="flex items-center gap-2">

                    <span className="material-symbols-outlined text-[18px]">
                    verified_user
                    </span>

                    <span className="text-sm">
                    Secure SSL
                    </span>

                </div>

                <div className="flex items-center gap-2">

                    <span className="material-symbols-outlined text-[18px]">
                    lock
                    </span>

                    <span className="text-sm">
                    Encrypted Data
                    </span>

                </div>

                </div>

            </div>
        </main>
    );
}