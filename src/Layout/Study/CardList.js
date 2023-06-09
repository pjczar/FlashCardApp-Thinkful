import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom'

function CardList({ cards }) {
    const [currentCard, setCurrentCard] = useState(0)
    // set card faceup
    const [frontSide, setFrontSide] = useState(true)
    const {deckId} = useParams()
    const history = useHistory()
    
    // lastcard? notice for restart or go home
    const nextHandler = () => {
        if (currentCard === (cards.length-1)) {
            window.confirm("Click OK to restart the deck, or CANCEL to return to the homepage.")
            ? setCurrentCard(() => 0) 
            : history.push("/")
        // or keep going if more cards
        } else {
            setCurrentCard((currentCard) => currentCard+1)
            setFrontSide(() => !frontSide)
        }
    }
    // user flips --> change sides
    const flipHandler = () => {
        setFrontSide(() => !frontSide)
    }
    // mas que 2 cartas en la deck
    if (cards.length > 2) { 
        return (
            <div className="row p-3">
                <div className="card w-100">
                    <div className="card-body">
                        <h5 className="card-title">
                            Card {currentCard+1} of {cards.length}
                        </h5>
                        <p className="card-text">
                            {frontSide ? cards[currentCard].front : cards[currentCard].back}
                        </p>
                        {/* flip card button */}
                        <button onClick={flipHandler} className="btn btn-secondary mr-3">
                            Flip
                        </button>
                        {/* if card facedown need button togoto nextcard */}
                        {frontSide ? null : 
                        <button onClick={nextHandler} className="btn btn-primary">
                            Next
                        </button>}                 
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="row p-3 w-100">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            Not enough cards.
                        </h5>
                        <p className="card-text">
                            You need at least 3 cards to study. There are {cards.length} cards in this deck.
                        </p>
                        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 1 20 16">
                                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                            </svg>
                            Add Cards
                        </Link>
                    </div>
                </div>
            </div>
        )    
    }
}

export default CardList