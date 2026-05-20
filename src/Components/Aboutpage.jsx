export default function AboutPage() {
    return (
        <main className="bg-[#f8f8f7] text-[#111] overflow-hidden">
        
        {/* Hero Section */}
        <section className="relative h-[870px] w-full flex items-center overflow-hidden">
            
            <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSV4m9WUJ9BXjMTBm6LYCzBCD135BCK6I0nR6rKndV_AaIZM0Jv6fKXnho4Bp0SeP5vj6AzSt35PSzd2AeMmnDxSTGVZK_SIN11aJSm22-DK7pRQGRLdt2xYOltkHHo38xFeX8Z2_GiBXhtkaPJVenwctd7M_bjSyJm3yNTIk0dAIt8dCKsub3x7af7gntyvdW31B4m8SuGBj2XAU-EwYjjeByINIh9vdmKqIgWoOJDscwSkAuMh_5SXGkOcviqez80f4U4B8BUmg"
            alt=""
            loading='lazy'
            className="absolute inset-0 w-full h-full object-cover z-0"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#f8f8f7]/90 via-[#f8f8f7]/50 to-transparent z-10" />

            <div className="relative z-20 max-w-[1400px] mx-auto px-4 md:px-8 w-full">
            <div className="max-w-2xl">
                
                <span className="text-[#666] tracking-[0.2em] uppercase mb-6 block text-sm font-medium">
                Established 2012
                </span>

                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
                Our Story: Redefining Excellence.
                </h1>

                <p className="text-lg text-[#555] max-w-xl mb-12 leading-relaxed">
                We believe that luxury isn't just about labels; it's a commitment
                to precision, intentional design, and the quiet beauty of
                exceptional craftsmanship.
                </p>

                <button className="bg-black text-white hover:scale-[1.03] transition-all duration-300 px-8 py-4 rounded-full shadow-xl">
                Learn More
                </button>
            </div>
            </div>
        </section>

        {/* Philosophy */}
        <section className="py-32 max-w-[1400px] mx-auto px-4 md:px-8">
            
            <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4">
                Our Core Philosophy
            </h2>

            <div className="h-1 w-20 bg-black mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#ececec] hover:-translate-y-2 transition-all duration-300">
                
                <div className="w-14 h-14 bg-[#f1f1f1] rounded-full flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-[26px]">
                    diamond
                </span>
                </div>

                <h3 className="text-2xl font-semibold mb-4">
                Uncompromising Quality
                </h3>

                <p className="text-[#666] leading-relaxed">
                We source only the finest materials, ensuring every product meets
                our rigorous standards of longevity and tactile excellence.
                </p>
            </div>

            {/* Card */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#ececec] hover:-translate-y-2 transition-all duration-300">
                
                <div className="w-14 h-14 bg-[#f1f1f1] rounded-full flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-[26px]">
                    ink_pen
                </span>
                </div>

                <h3 className="text-2xl font-semibold mb-4">
                Minimalist Design
                </h3>

                <p className="text-[#666] leading-relaxed">
                Our aesthetic is defined by intentional restraint. We remove the
                noise to let the essence of the product shine through.
                </p>
            </div>

            {/* Card */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#ececec] hover:-translate-y-2 transition-all duration-300">
                
                <div className="w-14 h-14 bg-[#f1f1f1] rounded-full flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-[26px]">
                    eco
                </span>
                </div>

                <h3 className="text-2xl font-semibold mb-4">
                Sustainable Vision
                </h3>

                <p className="text-[#666] leading-relaxed">
                We are dedicated to ethical sourcing and sustainable production
                cycles that respect both the creator and the environment.
                </p>
            </div>
            </div>
        </section>

        {/* Craftsmanship */}
        <section className="bg-[#f1f1f1] py-32">
            
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 space-y-32">
            
            {/* Row 1 */}
            <div className="flex flex-col md:flex-row items-center gap-20">
                
                <div className="w-full md:w-1/2 overflow-hidden rounded-3xl shadow-xl">
                <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq6IMRnb56eCfe8jcZOr1-BLNvSN9_axBCpQBdFvwuCPckdoSgd1Cb3_bz6xBouWacYqeg1Cssd89-Ea11a7u4TrQwMfCIXkXZ7y3N0oMh2JjXw0DLnuxeablURZiVjy6vwWlgjrSh5DNBTlr3jrfWdIyxnmmMB3VOShcJdUX12B4tBwsbbFh5VdUxvfFICa8FBctaveBNqBKzmhd77XlIzMeXmh7yiC4ZBP5VXr5gHHyDtz0MAh3ZMXkcqOdlWjUyKJ2xvdKqqu8"
                    alt=""
                    loading='lazy'
                    className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />
                </div>

                <div className="w-full md:w-1/2">
                
                <span className="tracking-[0.2em] uppercase mb-4 block text-sm text-[#777]">
                    The Process
                </span>

                <h2 className="text-5xl font-bold mb-8">
                    Artistry in Every Stitch
                </h2>

                <p className="text-lg text-[#555] leading-relaxed mb-8">
                    Every LUXE piece begins with a conversation between materials
                    and masters. Our artisans bring decades of experience, blending
                    traditional techniques with modern technological precision.
                </p>

                <div className="flex items-center gap-3 font-medium">
                    <span>EXPLORE THE STUDIO</span>

                    <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                    </span>
                </div>
                </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-20">
                
                <div className="w-full md:w-1/2 overflow-hidden rounded-3xl shadow-xl">
                <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfEAAxA450YSZqbdRvZrF81fvNcD9ln8CWYz_gt_xjFblVVcwpFvzFvhZ1ug6ye33AyxJNby3l81SjjyYoZz1Oo1KsQnEAZp2VITzv1EDFknVjut_XBZ9-ikqlEXFtEk2ScmMKcQKAsGJTaUrFFVbqj9EmP3Fgpxri3hCoXRYRy9o6XK5sMdkxE0HwwCTzZb1XZcwU1JoqRzadWS6SguZI3jsoB2wZo0zieGyUJ8G70jqi-VHpezD7eX5K0F8AwX4zlOgzzWna1Js"
                    alt=""
                    loading='lazy'
                    className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />
                </div>

                <div className="w-full md:w-1/2">
                
                <span className="tracking-[0.2em] uppercase mb-4 block text-sm text-[#777]">
                    Our Standard
                </span>

                <h2 className="text-5xl font-bold mb-8">
                    The Alchemy of Materials
                </h2>

                <p className="text-lg text-[#555] leading-relaxed mb-8">
                    We spend months sourcing the perfect textiles and components.
                    From Italian-tanned leathers to Japanese-milled fabrics, our
                    materials are chosen for both beauty and longevity.
                </p>

                <div className="flex items-center gap-3 font-medium">
                    <span>Sourcing Ethics</span>

                    <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                    </span>
                </div>
                </div>
            </div>
            </div>
        </section>

        {/* Leadership */}
        <section className="py-32 max-w-[1400px] mx-auto px-4 md:px-8">
            
            <div className="mb-16">
            <h2 className="text-5xl font-bold mb-4">
                Guided by Vision
            </h2>

            <p className="text-[#666] max-w-2xl text-lg">
                Meet the people behind the LUXE brand who are committed to
                redefining the standards of luxury commerce.
            </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {[
                {
                name: "Julian Vance",
                role: "Founder & CEO",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuATN3w8Kp_D3mGGkkyT8ALdPH8_11bBk1VPyeGa73l6o7S_Us_U5Pj9TxyIcBBoE9Oye0yBy_wZrghxSLJoAm5Aq9nPbgQQhm_PofhTmIFRUIUUm3Fvjh-9oXMAlu0sByTJVq1sOdIBQrGCOJJjbf33F1ff7cojXR318U43GjWQ-Hkfw18vODjz8EMfZepGy14aiA4QaPx2fM2dEihTrkjkqprLLE4KZGdqsaip3tPKPRCfV_Co6ELgeo-hPYKE3wUV9OvqWy-vBmo",
                },
                {
                name: "Elena Rossi",
                role: "Creative Director",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFm7_ZUaqtgJeHRDjuos-ScmLmnFC0Mgp5GB2dH3i1xvoLH5Si7KK8JUCZgBq15CTMRy9AS98i-qZ5347-s8jlltqDRYQ6oT-qCIItoNrQCZC27sf0iyZgBnYEvhnwPyTPmwAj02dsxQJoZr7kFl4J1HcV4PirEvqRZgQxkgREiueckWNm3UafbwO-JoIiFJPqyIpyLb_OkZsDsRYCpsT1YHk6dwTtPINRlW12ZVeLb4UidXPs3jQ6A2VYbBJr3WEHdXpf_vIMZaw",
                },
                {
                name: "Marcus Thorne",
                role: "Lead Designer",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeGhq1SsVXR0JcS4sTx2Umz3iQGQQ8MzBhuCAgsfMC0yggK8eIK97SG6UIpGrimiyQkOUE_qgy-Al94CFuKNtPjsfG0EUOAoRt96lr-a5FBTkiBkuFcvfUwmJThpBRV4IFgoMqVfVo_PlJTwYqhYxjpZ_pcX4UFP2xa1_JRgNjQn54UBRLFAySND0oLCrtZPBdn-YGSzrql1ix7LXxc8hGysre6EP1GhvR2jt_BDxKX8SCq0VqzmseySAjyxz1YEVAoVF45QPpP-g",
                },
                {
                name: "Sarah Chen",
                role: "Head of Sustainability",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDX2yADoY85yX7jVdd4_swlChMtowNV9YSw9ZS9e3j4yyb6YcfcV5Guek3vtv3-AG7XD5UsWLuwnZow6IPfAlRPc32X8BpMjpPXXbrzAypobkHmzZPPQDMHFqugI55mEtKjaJy98qoB7SZ2TajLjP5opzT4yYVetj1goThqMcw7b3GleNLB8MHEo1nRSNkZMso0vT_YtU5zVMB-XvfrLIr2cSvIdxj4e-lVBcdk0vwXoewvRaBZ_kGlcmeeES7-SQTjrphw21pSTY",
                },
            ].map((item, index) => (
                <div key={index} className="group">
                
                <div className="aspect-[3/4] overflow-hidden rounded-3xl mb-6 bg-[#eee]">
                    <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                </div>

                <h4 className="text-2xl font-semibold mb-1">
                    {item.name}
                </h4>

                <p className="uppercase tracking-[0.2em] text-sm text-[#777]">
                    {item.role}
                </p>
                </div>
            ))}
            </div>
        </section>

        {/* CTA */}
        <section className="relative py-32 overflow-hidden">
            
            <div className="absolute inset-0 bg-[#efefef]" />

            <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 text-center">
            
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
                Ready to Experience LUXE?
            </h2>

            <p className="text-lg text-[#666] max-w-2xl mx-auto mb-12 leading-relaxed">
                Join thousands of discerning individuals who have discovered the
                difference of intentional design and uncompromising quality.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
                
                <button className="bg-black text-white hover:scale-[1.03] transition-all duration-300 px-10 py-5 rounded-full shadow-xl">
                Shop the Collection
                </button>

                <button className="border border-[#dcdcdc] hover:bg-white transition-all duration-300 px-10 py-5 rounded-full">
                View the Lookbook
                </button>
            </div>
            </div>
        </section>
        </main>
    );
}