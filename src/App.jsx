import React, { useEffect, useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);
  const [conversion_rates, setRates] = useState({});

  useEffect(() => {

  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / conversion_rates[fromCurrency];
    const result = price * conversion_rates[toCurrency];
    setToPrice(result);
    setFromPrice(value);
  }

  const onChangeToPrice = (value) => {
    const result = (conversion_rates[fromCurrency] / conversion_rates[toCurrency]) * value;
    setFromPrice(result);
    setToPrice(value);
  }

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency, fromPrice]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency, toPrice]);

  useEffect(() => {
    fetch('https://v6.exchangerate-api.com/v6/850f5e12910ac516b9a66b02/latest/RUB')
      .then((res) => res.json())
      .then((json) => {
        setRates(json.conversion_rates);
        console.log(json.conversion_rates);
      })
      .catch((err) => {
        console.warn(err);
        alert('Не удалось получить информацию!');
      });
  }, []);
  return (
    <div className="App">
      <Block 
        value={fromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency} 
        onChangeValue={onChangeFromPrice}/>
      <Block 
        value={toPrice} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency} 
        onChangeValue={onChangeToPrice}/>
    </div>
  );
}

export default App;
