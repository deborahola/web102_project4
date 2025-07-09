function History({ history }) {

  return (

    <div className="history">
      <h3>Who have we seen so far? &nbsp;👀</h3>
      {history.length === 0 ? (
        <p>No cats yet!</p>
      ) : (
        <ul>
          {history.map((cat, i) => {
            const breed = cat.breeds?.[0];
            return (
              <li key={i} className="history-item">
                <img src={cat.url} alt="cat" className="history-thumb" />
                <span>
                  A {breed?.name} cat from {breed?.origin}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
    
  );

}

export default History;
