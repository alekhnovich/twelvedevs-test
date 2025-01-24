import React, { useEffect, useState } from 'react';

function ExchangeRates() {
  const [conversion_rates, setRates] = useState({});
  
  useEffect(() => {
    fetch('https://v6.exchangerate-api.com/v6/850f5e12910ac516b9a66b02/latest/RUB')
      .then((res) => res.json())
      .then((json) => setRates(json.conversion_rates))
      .catch((err) => {
        console.warn(err);
        alert('Не удалось получить курсы валют');
      });
  }, []);

  return (
    <div>
      <h2>Курсы валют</h2>
      <ul>
        {Object.entries(conversion_rates).map(([currency, rate]) => (
          <li key={currency}>{currency}: {rate}</li>
        ))}
      </ul>
    </div>
  );
}

export default ExchangeRates;
