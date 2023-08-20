import React from 'react';
import Header from './Components/Header';

const Prescription = ({navigation}) => {
  return (
    <>
      <Header
        navigation={navigation}
        title="My Prescriptions"
        color="#9A89FF"
      />
    </>
  );
};

export default Prescription;
