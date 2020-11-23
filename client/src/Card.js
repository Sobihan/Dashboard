const Card = ({ card, feedback }) => (
    <div className={`card ${feedback}`}>
      <span className="symbol">
        {card}
        {feedback}
      </span>
    </div>
)

export default Card;