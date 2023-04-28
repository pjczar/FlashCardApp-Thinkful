import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck, updateDeck } from "../../utils/api";
import CardForm from "./CardForm";

function AddCard () {
    const [deck, setDeck] = useState([])
    const [card, setCard] = useState(
        {
            front: "",
            back: "",
            deckId: "",
        }
    )
    const { deckId } = useParams();
    useEffect(() => {
        const abortController = new AbortController()
        const deckInfo = async () => {
            const response = await readDeck(deckId, abortController.signal)
            setDeck(() => response)
            console.log(readDeck(deckId, abortController.signal))
        }
        deckInfo()

        return () => abortController.abort()
    }, [deckId])
    const changeForm = ({ target }) => {
        setCard({...card, [target.name]: target.value})
    }
    const submitForm = (event) => {
        event.preventDefault();
        setCard({...card, deckId: deckId})
        createCard(deckId, card)
        console.log("'submitForm' saved")
        setCard({front: "", back: "", deckId: ""})
    }
    return (
        <div className="col-9 mx-auto">
            {/*navigation bar */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {/* a link to the home page */}
                    <li className="breadcrumb-item">
                        <Link to={"/"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 20 20">
                                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
                            </svg>
                            Home
                        </Link>
                    </li>
                    {/* link to the deck */}
                    <li className="breadcrumb-item">
                        {/* 'deckId' retrieved from 'useParams' */}
                        <Link to={`/decks/${deckId}`}>
                            {/* need to define/retrieve deck and name */}
                            {deck.name}
                        </Link>
                    </li>
                    {/* a link to the home page */}
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}/cards/new`}>
                            Add Card
                        </Link>
                    </li>

                </ol>
            </nav>
            <div className="row pl-3 pb-2">
                <h1>{deck.name}: Add Card</h1>
            </div>
            {/* use CardForm component to display a form for adding front/back
            content to the card, as well as a Done and Save button */}
            <CardForm 
                submitForm={submitForm}
                changeForm={changeForm}
                card={card}    
                deckId={deckId}
            />
        </div>
    )
}

export default AddCard