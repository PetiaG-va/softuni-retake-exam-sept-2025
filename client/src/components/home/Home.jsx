import { Link } from "react-router";

export default function Home() {
    return (
        // 
        <section className="home-page">
            <div className="container">
                <div className="hero">
                    <h1 id="home-title">Plant Care</h1>
                    <p id="home-subtitle">Take care of your green friends</p>
                </div>
                <div className="categories">
                    <div className="category-card">
                        <h2>Стайни растения</h2>
                        <div>
                            <img src="https://tami.bg/wp-content/uploads/2024/02/vechno-zeleni-staini-cvetq-1024x738.webp" alt="home-plants" />
                        </div>
                        <Link to="/plants/category/homeplants" className="btn">Виж всички</Link>
                    </div>

                    <div className="category-card">
                        <h2>Градински растения</h2>
                        <div>
                            <img src="https://home-design.bg/wp-content/uploads/2022/09/echinacea-1024x681.webp" alt="garden-plants" />
                        </div>
                        <Link to="/plants/category/gardenplants" className="btn">Виж всички</Link>
                    </div>

                    <div className="category-card">
                        <h2>Дървета и храсти</h2>
                        <div>
                            <img src="https://gradinarite.com/wp-content/uploads/2015/01/2-Grapapple.jpg" alt="trees-and-shrubs" />
                        </div>
                        <Link to="/plants/category/treesandshrubs" className="btn">Виж всички</Link>
                    </div>
                </div>
            </div>
        </section>

    )
}