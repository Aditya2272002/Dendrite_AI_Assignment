import React from 'react';
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const Todos = ({ title, description, image=null }) => {

   return (
      <div className="border p-2 m-2">
         <img src={image} alt={title} className="w-full h-auto mb-2" />
         <h2>Title: {title}</h2>
         <h2>Description: {description}</h2>
         <h2>Date: {new Date(new Date()).toLocaleString('en-US', options)}</h2>
      </div>
   );
};

export default Todos;
