import NavBar from '../Nav/NavBar';
import Hero from '../Hero/Hero';


function Home() {
    return (
        <main className="flex-1 flex flex-col">
            <div className="sticky top-0 z-30">
                <NavBar />
            </div>
            <Hero />

        </main>
    );
}

export default Home;
