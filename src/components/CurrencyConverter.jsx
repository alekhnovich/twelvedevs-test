import React, { useEffect, useRef, useState } from 'react';
import { Block } from './Block';
import '../index.scss';

function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState('BYN');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  const ratesRef = useRef({}); 

  useEffect(() => {
    fetch('https://v6.exchangerate-api.com/v6/850f5e12910ac516b9a66b02/latest/BYN')
      .then((res) => res.json())
      .then((json) => {
        ratesRef.current = json.conversion_rates;
        onChangeToPrice(1);
      })
      .catch((err) => {
        console.warn(err);
        alert('Не удалось получить информацию');
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  }

  const onChangeToPrice = (value) => {
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  }

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

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

export default CurrencyConverter;
