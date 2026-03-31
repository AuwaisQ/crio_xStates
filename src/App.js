import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  const [state, setState] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');


  useEffect(() => {
    fetch('https://location-selector.labs.crio.do/countries')
      .then(response => response.json())
      .then(data => setCountry(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch(`https://location-selector.labs.crio.do/country=${selectedCountry}/states`)
        .then(response => response.json())
        .then(data => setState(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [selectedCountry]);

   useEffect(() => {
    if (selectedState) {
      fetch(`https://location-selector.labs.crio.do/country=${selectedCountry}/state=${selectedState}/cities`)
        .then(response => response.json())
        .then(data => setCity(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [selectedState]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };
  
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className='App'>
      <h1>Select Location</h1>

      <div className='form-container'>

        {/* Countries */}
        <select
          className="country-dd"
          label="Select Country"
          id="coutry-select"
          name="country-select"
          value={selectedCountry}
          onChange={handleCountryChange}
        >

          {country.length === 0 ? (
            <option value="">Select Country</option>
          ) : (
            country.map((country) => (
              <option
                // label='Select Country'
                value={country}>
                {country}
              </option>
            ))
          )}
        </select>

        {/* States */}
        <select
          className="country-dd"
          label="Select State"
          id="state-select"
          name="state-select"
          value={selectedState}
          onChange={handleStateChange}
        >

          {state.length === 0 ? (
            <option value="">Select State</option>
          ) : (
            state.map((state) => (
              <option
                value={state}>
                {state}
              </option>
            ))
          )}
        </select>


        {/* City */}
        <select
          className="country-dd"
          label="Select City"
          id="city-select"
          name="city-select"
          value={selectedCity}
          onChange={handleCityChange}
        >

          {city.length === 0 ? (
            <option value="">Select City</option>
          ) : (
            city.map((city) => (
              <option
                value={city}>
                {city}
              </option>
            ))
          )}
        </select>
      </div>

      <p>You selected: {`${selectedCity}, ${selectedState}, ${selectedCountry}`}</p>
    </div>
  );
}

export default App;
