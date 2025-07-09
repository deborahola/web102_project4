import { useState } from 'react';
import './App.css';

import BanList from './components/BanList';
import CatCard from './components/CatCard';
import History from './components/History';

const CAT_API_KEY = import.meta.env.VITE_CAT_API_KEY;

function App() {

  const [cat, setCat] = useState(null);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);

  const fetchCat = async () => {
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?has_breeds=1",
        {
          headers: {
            "x-api-key": CAT_API_KEY
          }
        }
      );

      const data = await response.json();
      const newCat = data[0];
      const breed = newCat?.breeds?.[0];

      if (!breed) return fetchCat(); // Retry if no breed info

      const { name, weight, origin, life_span } = breed;

      const isBanned =
        banList.includes(name) ||
        banList.includes(weight.metric) ||
        banList.includes(origin) ||
        banList.includes(life_span);

      if (!isBanned) {
        setCat(newCat);
        setHistory((prev) => [newCat, ...prev]);
      } else {
        fetchCat(); // Retry if banned (retry until valid)
      }
    } catch (error) {
      console.error("Error fetching cat:", error);
    }
  };

  const handleAttributeClick = (attribute) => {
    if (banList.includes(attribute)) {
      setBanList(banList.filter(item => item !== attribute));
    } else {
      setBanList([...banList, attribute]);
    }
  };

  const formatAttributeLabel = (attr) => {
  if (attr.includes(" - ") && attr.match(/^\d/)) {
    if (attr.includes("lbs")) return attr;
    if (attr.includes(".")) return `${attr} years`;
    if (parseInt(attr.split(" - ")[1]) > 10) return `${attr} years`;
    return `${attr} lbs`;
  }
  return attr;
};


  return (

    <div className="App">
      <h1 className="title">The Great Cat Journey 😺</h1>
      <p className="subtitle">Discover your next favorite cat... or ban it forever!</p>

      <button className="discover-btn" onClick={fetchCat}>Discover! &nbsp;🔀</button>

      {cat && (
        <div className="grid-container">
          <History history={history} />
          <CatCard cat={cat} onAttributeClick={handleAttributeClick} />
          <BanList banList={banList} onToggle={handleAttributeClick} formatAttributeLabel={formatAttributeLabel} />
        </div>
      )}
    </div>

  );

}

export default App;

