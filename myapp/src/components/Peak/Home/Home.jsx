import Hero from "../../Hero/Hero";
import NavBar from "../../Nav/NavBar";
function Home() {
    return (
        <main className="flex-1 flex flex-col">
            <div className="sticky top-0 z-30">
                <NavBar />
            </div>
            <Hero heroType='peek' />
        </main>
    )
}
export default Home;