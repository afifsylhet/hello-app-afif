import Home from "./Component/Home";
import { useEffect } from 'react';
import { useState } from 'react';


function App() {


  const [items, setItems] = useState([]);



  useEffect(() => {
    fetch('/contents.json')
      .then(res => res.json())
      .then(data => setItems(data))

  }, [])

  return (
    <div>
      <Home items={items}></Home>
    </div>
  );
}

export default App;
