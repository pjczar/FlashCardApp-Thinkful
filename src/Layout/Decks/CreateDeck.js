import React, { useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import { createDeck } from '../../utils/api/index.js'

function CreateDeck({updateDecks}) {
    const [newDeck, setNewDeck] = useState({name: "", description: ""})
    const history = useHistory()
    const changeForm = ({ target }) => {
        setNewDeck({...newDeck, [target.name]: target.value})
    }
    const submitForm = async (event) => {
        event.preventDefault()
        const response = await createDeck(newDeck)
        history.push(`/decks/${response.id}`)
        updateDecks(1)
    }
    return (
        <div className="col-9 mx-auto">
            {/* two link navigation bar */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">                  
                    <li className="breadcrumb-item">
                        {/* a home page link */}
                        <Link to={"/"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 20 20">
                                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
                            </svg> 
                            Home
                        </Link>
                    </li>
                    {/* a create deck label */}
                    <li 
                    className="breadcrumb-item"
                    >Create Deck
                    </li>                
                </ol>
            </nav>
            {/* form */}
            <form 
                onSubmit={submitForm}>
                    {/* text input - deck name */}
                <div className="form-group">
                    <label>
                        Name
                    </label>
                    <input 
                        type="text" 
                        name="name"
                        value={newDeck.name}
                        onChange={changeForm}
                        id="name" 
                        className="form-control" 
                        placeholder="Deck Name" 
                    />
                </div>
                {/* text for card description */}
                <div className="form-group">
                    <label>
                        Description
                    </label>
                    <textarea
                    name="description" 
                    value={newDeck.description}
                    onChange={changeForm}
                    className="form-control" 
                    id="description" 
                    placeholder="Brief description of the deck."
                    rows={4}
                    />
                </div>
                {/* cancel button */}
                <Link 
                    to="/" 
                    name="cancel" 
                    className="btn btn-secondary mr-3">
                    Cancel
                </Link>
                {/* submit button */}
                <button 
                    type="submit" 
                    className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default CreateDeck