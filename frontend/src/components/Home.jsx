import React from 'react'
import Todo from './Todo'
import Todos from './Todos'

const Home = () => {
   const [cards, setCards] = useState([]);
   const [isPopupOpen, setIsPopupOpen] = useState(false);

   const addCard = (card) => {
      setCards([...cards, card]);
   };
  return (
     <div>
        <button onClick={() => setIsPopupOpen(true)} className="p-2 bg-green-500 text-white">Add Card</button>
        {isPopupOpen && <Todo closePopup={() => setIsPopupOpen(false)} addCard={addCard} />}
        {cards.map((card, index) => <Todos key={index} title={card.title} description={card.description} image={card.image} />)}
     </div>
  )
}

export default Home
