import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";

const API_URL = "https://deckofcardsapi.com/api/deck/new/shuffle";


class Deck extends Component{
    constructor(props) {
        super(props)
        this.state = {
            deck: null,
            drawn:[]
        }
        this.getCard = this.getCard.bind(this);
    }

    async componentDidMount() {
        let deck = await axios.get(API_URL);

      
        this.setState({
            deck:deck.data
        })
    }
    async getCard() {
          try {
             const CARD_URL = `https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw/`
              let cardRes = await axios.get(CARD_URL);
              if (!cardRes.data.success) {
                  throw new Error("No cards Remainig PLEASE REFRESH PAGE")
              }
              let card = cardRes.data.cards[0]
              this.setState(st => ({
            drawn: [
                ...st.drawn,
            {
                id: card.code,
                image: card.image,
                name:`${card.value} of ${card.suit} `
            }
           ]
        }))
 
          } catch (err) {
              alert(err)
        }
       
       
    }

    render() {

        const cards = this.state.drawn.map(c => (
            <Card name={c.name} image={c.image} key={ c.id}/>
        ))
        return (
            <div>
                <h1 className = "Deck-title"> Card Dealer</h1>
                <h1 className = "Deck-title subtitle"> A little API demo made with React</h1>
                <button onClick={this.getCard} className="Deck-btn">Get Card</button>
                <div className="Deck-cardarea">{cards}</div>
                
            </div>
        )
    }
}

export default Deck;