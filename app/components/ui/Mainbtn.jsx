"use client";
export default function MainBtn(){
function handlescroll() {
const section = document.getElementById("offers");

if (!section) return;

const offset =30;
const top =
    section.getBoundingClientRect().top +
    window.scrollY -
    offset;

window.scrollTo({
    top,
    behavior: "smooth",
});
}
return(
    <button
                                            onClick={()=>handlescroll()}
                                            className="
                                                group relative overflow-hidden
                                                lg:px-10 md:px-8 px-4
                                                md:py-4 py-2.5
                                                border border-black 
                                                uppercase tracking-widest
                                                cursor-pointer
                                                bg-black text-white
                                            "
                                            >
                                            <span className="absolute inset-0 bg-white transform -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-0" />

                                            <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
                                    Explore Deals
                                </span>
    </button>
)
}