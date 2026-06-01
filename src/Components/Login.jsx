import { useState } from 'react';
import { useToast } from '../Context/Toastcontext';
import '../App.css';

export default function LoginPage() {
    const { showAlert } = useToast();
    const [activeTab, setActiveTab] = useState('signin');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        
        if (!formData.email || !formData.password) {
            showAlert('error', 'Please fill in all fields');
            return;
        }

        if (!validateEmail(formData.email)) {
            showAlert('error', 'Please enter a valid email');
            return;
        }

        if (formData.password.length < 6) {
            showAlert('error', 'Password must be at least 6 characters');
            return;
        }

        // Sign in logic here
        showAlert('success', 'Sign in successful!');
        setFormData({ email: '', password: '', confirmPassword: '', name: '' });
    };

    const handleCreateAccount = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            showAlert('error', 'Please fill in all fields');
            return;
        }

        if (!validateEmail(formData.email)) {
            showAlert('error', 'Please enter a valid email');
            return;
        }

        if (formData.password.length < 6) {
            showAlert('error', 'Password must be at least 6 characters');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            showAlert('error', 'Passwords do not match');
            return;
        }

        // Create account logic here
        showAlert('success', 'Account created successfully!');
        setFormData({ email: '', password: '', confirmPassword: '', name: '' });
        setActiveTab('signin');
    };

    return (
        <main className="flex items-center justify-center relative overflow-hidden px-4 mt-14 " style={{ backgroundColor: '#0D0D0D' }}>
            <div className="w-full min-h-screen max-h-screen max-w-[480px] my-12">
                <div className="backdrop-blur-xl rounded-2xl shadow-[0px_10px_40px_rgba(0,0,0,0.5)] border overflow-hidden" style={{ backgroundColor: 'rgba(26,26,26,0.9)', borderColor: 'rgba(200,168,130,0.2)' }}>
                <div className="flex border-b" style={{ borderColor: 'rgba(200,168,130,0.2)' }}>

                    <button 
                        onClick={() => setActiveTab('signin')}
                        className="flex-1 py-5 text-center text-sm font-semibold border-b-2 transition-all duration-200" 
                        style={{ 
                            color: activeTab === 'signin' ? '#C8A882' : 'rgba(200,168,130,0.5)',
                            borderColor: activeTab === 'signin' ? '#C8A882' : 'transparent'
                        }}
                    >
                    Sign In
                    </button>

                    <button 
                        onClick={() => setActiveTab('signup')}
                        className="flex-1 py-5 text-center text-sm font-semibold border-b-2 transition-all duration-200" 
                        style={{ 
                            color: activeTab === 'signup' ? '#C8A882' : 'rgba(200,168,130,0.5)',
                            borderColor: activeTab === 'signup' ? '#C8A882' : 'transparent'
                        }}
                    >
                    Create Account
                    </button>

                </div>

                <div className="p-6 md:p-8">
                    <div className="mb-8 text-center">

                    <h1 className="text-3xl font-bold mb-2" style={{ color: '#F0ECE4', fontFamily: "'Playfair Display', serif" }}>
                        {activeTab === 'signin' ? 'Welcome Back' : 'Create Account'}
                    </h1>

                    <p style={{ color: 'rgba(240,236,228,0.6)' }}>
                        {activeTab === 'signin' 
                            ? 'Please enter your details to access your account.'
                            : 'Join us and start shopping today.'
                        }
                    </p>

                    </div>
                    <div className="relative mb-6 flex items-center">
                    <div className="grow border-t" style={{ borderColor: 'rgba(200,168,130,0.2)' }}></div>

                    <span className="mx-4 text-xs uppercase tracking-[3px]" style={{ color: 'rgba(200,168,130,0.5)' }}>
                        or continue with email
                    </span>

                    <div className="grow border-t" style={{ borderColor: 'rgba(200,168,130,0.2)' }}></div>

                    </div>

                    {/* Sign In Form */}
                    {activeTab === 'signin' && (
                        <form onSubmit={handleSignIn} className="space-y-6 animate-fade-in">
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
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl outline-none transition-all duration-200"
                            style={{ backgroundColor: 'rgba(200,168,130,0.05)',color: '#F0ECE4' }}
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
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3.5 rounded-xl border-none outline-none transition-all duration-200"
                                style={{ backgroundColor: 'rgba(200,168,130,0.05)', color: '#F0ECE4' }}
                            />
                            </div>
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
                    )}

                    {/* Create Account Form */}
                    {activeTab === 'signup' && (
                        <form onSubmit={handleCreateAccount} className="space-y-6 animate-fade-in">
                        <div className="space-y-2">
                            <label
                            htmlFor="name"
                            className="block text-sm font-medium"
                            style={{ color: 'rgba(200,168,130,0.8)' }}
                            >
                            Full Name
                            </label>

                            <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl outline-none transition-all duration-200"
                            style={{ backgroundColor: 'rgba(200,168,130,0.05)',color: '#F0ECE4' }}
                            />

                        </div>
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
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl outline-none transition-all duration-200"
                            style={{ backgroundColor: 'rgba(200,168,130,0.05)',color: '#F0ECE4' }}
                            />

                        </div>
                        <div className="space-y-2">

                            <label
                                htmlFor="password"
                                className="block text-sm font-medium"
                                style={{ color: 'rgba(200,168,130,0.8)' }}
                            >
                                Password
                            </label>

                            <div className="relative">

                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3.5 rounded-xl border-none outline-none transition-all duration-200"
                                style={{ backgroundColor: 'rgba(200,168,130,0.05)', color: '#F0ECE4' }}
                            />
                            </div>
                        </div>
                        <div className="space-y-2">

                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium"
                                style={{ color: 'rgba(200,168,130,0.8)' }}
                            >
                                Confirm Password
                            </label>

                            <div className="relative">

                            <input
                                type="password"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3.5 rounded-xl border-none outline-none transition-all duration-200"
                                style={{ backgroundColor: 'rgba(200,168,130,0.05)', color: '#F0ECE4' }}
                            />
                            </div>
                        </div>
                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full py-4 rounded-xl text-white font-semibold hover:scale-[1.01] active:scale-[0.98] transition-all duration-200"
                            style={{ backgroundColor: '#C8A882', color: '#0D0D0D' }}
                        >
                            Create Account
                        </button>

                        </form>
                    )}

                    {/* Footer */}
                    {activeTab === 'signin' && (
                        <div className="mt-6 text-center">

                        <p style={{ color: 'rgba(240,236,228,0.6)' }}>
                            New here?{" "}

                            <button
                            onClick={() => setActiveTab('signup')}
                            className="font-semibold hover:underline"
                            style={{ color: '#C8A882' }}
                            >
                            Create account
                            </button>

                        </p>

                        </div>
                    )}

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