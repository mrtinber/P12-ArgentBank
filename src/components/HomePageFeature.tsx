type HomePageFeatureProps = {
    icon: string, 
    title: string, 
    text: string
}

export function HomePageFeature({icon, title, text}: HomePageFeatureProps) {
    return <div className="feature__item">
        <img src={icon} alt="Chat Icon" className="feature__icon" />
        <h3 className="feature__item__title">{title}</h3>
        <p>{text}</p>
    </div>
}