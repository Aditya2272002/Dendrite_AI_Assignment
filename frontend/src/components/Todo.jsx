import React, { useState } from 'react';
import axios from 'axios'
import PaymentApp from './payment';
import { useNavigate } from 'react-router-dom';

const Todo = ({ closePopup, addCard }) => {
   const navigate = useNavigate();

   const isPremiumUser = localStorage.getItem("isPremiumUser") || false;

   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('')
   const [image, setImage] = useState('');

   const handleImageChange = (e) => {
      if (isPremiumUser) {
         const file = e.target.files[0];
         const reader = new FileReader();
         reader.onloadend = () => {
            setImage(reader.result);
         };
         reader.readAsDataURL(file);
      }
      return;
   };

   const handleSaveData = async()=>{
      try {
         await axios.post("http://localhost:5000/graphql", {
            "query": `mutation { createTodo(title: \"${title}\", description: \"${description}\", image: \"${image}\") { todo { id title description } } }`
         })
      } catch (error) {
         console.log('error in saving data', error);
      }
   }

   const handleSave = () => {
      handleSaveData()
      addCard({ title, image });
      closePopup();
   };

   const handlePremium = () => {
      navigate('/payment')
   }

   return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
         <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <input
               type="text"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               className="border p-2 w-full mb-2"
               placeholder="Title"
            />
            <input
               type="text"
               value={description}
               onChange={(e) => setTitle(e.target.value)}
               className="border p-2 w-full mb-2"
               placeholder="Description"
            />
            {isPremiumUser ? (<>
               <input
                  type="file"
                  onChange={handleImageChange}
                  className={`border p-2 w-full mb-2`}
               />
            </>) : (
               <button className='mt-2 p-2 bg-yellow-500 text-white' onClick={handlePremium}>Get Premium</button>
            )}
            {image && <img src={image} alt="Preview" className="w-full h-auto mb-2" />}
            <button onClick={handleSave} className="mt-2 p-2 bg-blue-500 text-white">Save</button>
            <button onClick={closePopup} className="mt-2 p-2 bg-red-500 text-white ml-2">Cancel</button>
         </div>
      </div>
   );
};

export default Todo;
