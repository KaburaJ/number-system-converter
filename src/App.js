import './App.css';
import React, { useState } from 'react';

function App() {
  const options = [
    { value: '0b', label: 'Binary' },
    { value: '10', label: 'Decimal' },
    { value: '0o', label: 'Octal' },
    { value: '0x', label: 'Hexadecimal' },
  ];

  const [value, setValue] = useState('');
  const [inputSystem, setInputSystem] = useState(options[0]);
  const [outputSystem, setOutputSystem] = useState(options[1]);
  const [convertedValue, setConvertedValue] = useState('');

  const handleNumberInput = (e) => {
    setValue(e.target.value);
    convertNumber(e.target.value);
  };

  const handleInputSystemChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = options.find((option) => option.value === selectedValue);
    setInputSystem(selectedOption);
    convertNumber(value);
  };

  const handleOutputSystemChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = options.find((option) => option.value === selectedValue);
    console.log(typeof(selectedOption));
    setOutputSystem(selectedOption);
    convertNumber(value);
  };

  const resetInput = () => {
    setValue('')
  } 

  const convertNumber = (num) => {
    let converted = '';

    if (/^[01]+$/.test(num)) { //binary
      if (outputSystem.value === '10') {
        converted = parseInt(num, 2).toString(10);
      } else if (outputSystem.value === '0o') {
        converted = parseInt(num, 2).toString(8);
      } else if (outputSystem.value === '0x') {
        converted = parseInt(num, 2).toString(16);
      }
      else if (outputSystem.value === '0b') {
        converted= parseInt(num, 2);
      }
    } else if (/^\d+$/.test(num)) { //decimal
      if (outputSystem.value === '0b') {
        converted = parseInt(num, 10).toString(2);
      } else if (outputSystem.value === '0o') {
        converted = parseInt(num, 10).toString(8);
      } else if (outputSystem.value === '0x') {
        converted = parseInt(num, 10).toString(16);
      }
      else if (outputSystem.value === '10') {
        converted = parseInt(num, 10);
      }
    } else if (/^[0-7]+$/.test(num.slice(2))) { //Octal
      if (outputSystem.value === '0b') {
        converted = parseInt(num, 8).toString(2);
      } else if (outputSystem.value === '10') {
        converted = parseInt(num, 8).toString(10);
      } else if (outputSystem.value === '0x') {
        converted = parseInt(num, 8).toString(16);
      }
      else if (outputSystem.value === '0o') {
        converted = parseInt(num, 8);
      }
    } else if (/^[0-9A-Fa-f]+$/.test(num.slice(2))) { //Hex
      if (outputSystem.value === '0b') {
        converted = parseInt(num, 16).toString(2);
      } else if (outputSystem.value === '10') {
        converted = parseInt(num, 16).toString(10);
      } else if (outputSystem.value === '0o') {
        converted = parseInt(num, 16).toString(8);
      }
      else if(outputSystem.value === '0x') {
        converted = parseInt(num, 16);
      }
    }

    setConvertedValue(converted);
  };

  return (
    <div className="App">
      <div className='bothSelectors'>
      <div>
        <label>Input System:</label>
        <select className="selector" value={inputSystem.value} onChange={handleInputSystemChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Output System:</label>
        <select className="selector" value={outputSystem.value} onChange={handleOutputSystemChange}>
          {/* {console.log(options.find((option) => option.value === outputSystem.value))} */}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      </div>
      <input className="input" value={value} onChange={handleNumberInput} placeholder='Enter number for conversion'/>
      <button placeholder='button' onClick={resetInput} className='reset'>Reset</button>
      <h2>
        Converted Value: 
        <value>{convertedValue}</value></h2>
    </div>
  );
}

export default App;
