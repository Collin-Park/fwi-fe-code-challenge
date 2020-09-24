import React from 'react';
import FormInput from '../FormInput/FormInput';
import './CreateNew.scss';

export default function CreateNew() {
  const newChar = {
    name: 'Insert Name',
    winnings: Math.ceil((Math.random() + 1) * 2000),
    country: 'AL',
    imageUrl: '',
  };
  return (
    <div className="mx-3">
      <div className="hidden-nav" />
      <FormInput props={newChar} />
    </div>
  );
}
