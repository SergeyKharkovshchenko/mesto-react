// function Card(props) 
  function Card({card, onCardClick}) {  

    const handleCardClick = () => {
        onCardClick(card)
      };

    return (
              <li className="element" id={card._id}> 
                    <img src={card.link} 
            onClick = {(e) => {handleCardClick(e)}}
            className="element__foto" alt={`фото ${card.name}`} />
                    <button className="element__thrashbin" type="button"> </button>
                    <div className="element__bottom">
                    <h2 className="element__title">{card.name}</h2>
                    <div className="element__heart-and-counter">
                        <button className="element__heart" type="button"></button>
                        <p className="element__likescounter">{card.likes.length}</p>
                    </div>
                </div>
                </li>
    );
  }

  export default Card;
