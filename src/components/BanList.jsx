function BanList({ banList, onToggle, formatAttributeLabel }) {

  return (

    <div className="ban-list">
        <h3>Ban List 🚫</h3>
        <p className="ban-subtitle">Select an attribute on the left to ban it</p>
        <p className="ban-subtitle">(Click on an attribute below to unban it)</p>
        {banList.length === 0 ? (
          <p>Nothing banned yet</p>
        ) : (
          banList.map((item, i) => (
            <button key={i} onClick={() => onToggle(item)}>
              {formatAttributeLabel(item)}
            </button>
          ))
        )}
    </div>

  );

}

export default BanList;