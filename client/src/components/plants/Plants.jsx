import { useEffect, useState } from "react"
import PlantCard from "../plant-card/plantCard.jsx";

export default function Plants() {
    const [allPlants, setAllPlants] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/plants')
            .then(response => response.json())
            .then(result => setAllPlants(Object.values(result)))
            .catch(err => alert(err.message))
    }, []);

    return (
        <div id="catalog-page" className="page">

            <div className="catalog-header">
                <h2 id="catalog-title">All Plants</h2>
                <button className="btn" id="add-plant-btn" >+ Добави растение</button>
            </div>

            {
                allPlants.length === 0 &&
                <div className="empty-state" id="empty-catalog">
                    <div className="empty-state-icon">🌱</div>
                    <h3>No plants yet</h3>
                    <p>Add your first plant to the collection</p>
                    {/* <button className="btn" id="add-first-btn">Добави растение</button> */}
                </div>
            }

            <div className="cards-grid" id="catalog-plants">
                {allPlants.map(plant => <PlantCard key={plant._id} {...plant} />)}
            </div>


        </div>
    )
}