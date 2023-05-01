import React from 'react';
import Registration from './components/Registration/Registration';
import './App.css';

function App() {
  return (
    <>
      <Registration />
      {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type={inputType}
                  name="dob"
                  label="Date of Birth"
                  onFocus={() => setInputType("date")}
                  onBlur={() => setInputType("text")}
                  value={formData.dob}
                  onChange={handleInputChange}
                  autoComplete="dob"
                />
              </Grid> */}
    </>
  );
}

export default App;
