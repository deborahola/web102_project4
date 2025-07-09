function CatCard({ cat, onAttributeClick }) {

  if (!cat || !cat.breeds || cat.breeds.length === 0) return null;

  const breed = cat.breeds[0];

  return (

    <div className="cat-card">
      <h2>{breed.name}</h2>

      <div className="attributes">
        <button onClick={() => onAttributeClick(breed.name)}>{breed.name}</button>
        <button onClick={() => onAttributeClick(breed.weight.metric)}>{breed.weight.metric} lbs</button>
        <button onClick={() => onAttributeClick(breed.origin)}>{breed.origin}</button>
        <button onClick={() => onAttributeClick(breed.life_span)}>{breed.life_span} years</button>
      </div>

      <img src={cat.url} alt={`A ${breed.name}`} className="cat-img" />
    </div>
    
  );

}

export default CatCard;
