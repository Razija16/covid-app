import React, {useState, useEffect} from 'react';

export default function App() {
  const [background, setBackground] = useState('83, 8, 8');

  useEffect(() => {
    document.body.style.background = `rgb(${background})`
  }, [background]);
  
  
  return (
    <button
      onClick={()=>setBackground(`${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)}`)}
    >
      CLICK
    </button>
  )
}
