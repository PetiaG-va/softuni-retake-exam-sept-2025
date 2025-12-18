import { Link } from "react-router";

export default function PlantCard({
    _id,
    title,
    imageUrl,
    type,

}) {
    return (
        <div className="card-container">
            <div className="plant-card">
                <div className="card-content">
                    <h2 className="plant-name">{title}</h2>
                    <div className="decorative-line">
                        <img src={imageUrl} alt={title} />
                    </div>
                    <h3 className="plant-type">{type}</h3>

                    <Link to={`/plants/${_id}/details`} className="btn">Details</Link>

                    {/* <p className="plant-description">Красиво пустинно растение, което е перфектно за начинаещи. Изисква минимални грижи и обича слънчеви места.</p>
                    <div className="care-info">
                        <div className="care-item"><span className="care-icon">☀️</span>  <span className="care-value">Пряка слънчева</span>
                        </div>
                        <div className="care-item"><span className="care-icon">💧</span>  <span className="care-value">Рядко</span>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}