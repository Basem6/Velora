export default function LoginPage() {
    return (
        <main className="flex items-center justify-center relative overflow-hidden px-4 mt-14 " style={{ backgroundColor: '#0D0D0D' }}>
            <div className="w-full min-h-screen max-h-screen max-w-[480px] my-12">
                <div className="backdrop-blur-xl rounded-2xl shadow-[0px_10px_40px_rgba(0,0,0,0.5)] border overflow-hidden" style={{ backgroundColor: 'rgba(26,26,26,0.9)', borderColor: 'rgba(200,168,130,0.2)' }}>
                <div className="flex border-b" style={{ borderColor: 'rgba(200,168,130,0.2)' }}>

                    <button className="flex-1 py-5 text-center text-sm font-semibold border-b-2 transition-all duration-200" style={{ color: '#C8A882', borderColor: '#C8A882' }}>
                    Sign In
                    </button>

                    <button className="flex-1 py-5 text-center text-sm font-semibold border-b-2 border-transparent transition-all duration-200" style={{ color: 'rgba(200,168,130,0.5)' }}>
                    Create Account
                    </button>

                </div>

                <div className="p-6 md:p-8">
                    <div className="mb-8 text-center">

                    <h1 className="text-3xl font-bold mb-2" style={{ color: '#F0ECE4', fontFamily: "'Playfair Display', serif" }}>
                        Welcome Back
                    </h1>

                    <p style={{ color: 'rgba(240,236,228,0.6)' }}>
                        Please enter your details to access your account.
                    </p>

                    </div>
                    <div className="relative mb-6 flex items-center">
                    <div className="flex-grow border-t" style={{ borderColor: 'rgba(200,168,130,0.2)' }}></div>

                    <span className="mx-4 text-xs uppercase tracking-[3px]" style={{ color: 'rgba(200,168,130,0.5)' }}>
                        or continue with email
                    </span>

                    <div className="flex-grow border-t" style={{ borderColor: 'rgba(200,168,130,0.2)' }}></div>

                    </div>
                    <form className="space-y-6">
                    <div className="space-y-2">
                        <label
                        htmlFor="email"
                        className="block text-sm font-medium"
                        style={{ color: 'rgba(200,168,130,0.8)' }}
                        >
                        Email Address
                        </label>

                        <input
                        type="email"
                        id="email"
                        placeholder="name@company.com"
                        className="w-full px-4 py-3.5 rounded-xl outline-none transition-all duration-200"
                        style={{ backgroundColor: 'rgba(200,168,130,0.05)', borderColor: 'rgba(200,168,130,0.2)', border: '1px solid', color: '#F0ECE4' }}
                        />

                    </div>
                    <div className="space-y-2">

                        <div className="flex justify-between items-center">

                        <label
                            htmlFor="password"
                            className="block text-sm font-medium"
                            style={{ color: 'rgba(200,168,130,0.8)' }}
                        >
                            Password
                        </label>

                        <a
                            href="#"
                            className="text-sm hover:underline"
                            style={{ color: '#C8A882' }}
                        >
                            Forgot?
                        </a>

                        </div>

                        <div className="relative">

                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3.5 rounded-xl outline-none transition-all duration-200"
                            style={{ backgroundColor: 'rgba(200,168,130,0.05)', borderColor: 'rgba(200,168,130,0.2)', border: '1px solid', color: '#F0ECE4' }}
                        />

                        <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                            style={{ color: 'rgba(200,168,130,0.6)' }}
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
                        className="w-4 h-4"
                        style={{ accentColor: '#C8A882' }}
                        />

                        <label
                        htmlFor="remember"
                        className="text-sm select-none"
                        style={{ color: 'rgba(200,168,130,0.6)' }}
                        >
                        Remember me for 30 days
                        </label>

                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-4 rounded-xl text-white font-semibold hover:scale-[1.01] active:scale-[0.98] transition-all duration-200"
                        style={{ backgroundColor: '#C8A882', color: '#0D0D0D' }}
                    >
                        Sign In
                    </button>

                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center">

                    <p style={{ color: 'rgba(240,236,228,0.6)' }}>
                        New here?{" "}

                        <a
                        href="#"
                        className="font-semibold hover:underline"
                        style={{ color: '#C8A882' }}
                        >
                        Create account
                        </a>

                    </p>

                    </div>

                </div>

                </div>

                {/* Bottom Trust */}
                <div className="mt-6 flex justify-center gap-8" style={{ color: 'rgba(200,168,130,0.5)' }}>

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