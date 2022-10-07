function Card(props) {

    const handleCardClick = () => {
        props.onCardClick(props.card)
      };

    return (
              <li className="element" id={props.card._id}> 
                    <img src={props.card.link} 
            onClick = {(e) => {handleCardClick(e)}}
            className="element__foto" alt="фото природы" />
                    <button className="element__thrashbin" type="button"> </button>
                    <div className="element__bottom">
                    <h2 className="element__title">{props.card.name}</h2>
                    <div className="element__heart-and-counter">
                        <button className="element__heart" type="button"></button>
                        <p className="element__likescounter">{props.card.likes.length}</p>
                    </div>
                </div>
                </li>
    );
  }

  export default Card;
