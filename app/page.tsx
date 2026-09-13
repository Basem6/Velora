
import Hero from "@/app/components/landing/Hero"
import BestSeller from "@/app/components/landing/Bestseller"
import HomeCommerceSections from "@/app/components/landing/HomeCommerceSections"
import HomeFashionSections from "@/app/components/landing/HomeFashionSections"

export default function Home() {
    return (
        <>
            <Hero></Hero>
            <HomeFashionSections />
            <BestSeller></BestSeller>
            <HomeCommerceSections />
        </>
    );
}