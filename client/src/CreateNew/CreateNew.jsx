import React from 'react';

import './CreateNew.scss';
import FormInput from '../FormInput/FormInput';

export default function CreateNew() {
  const newChar = {
    name: 'Insert Name',
    winnings: 1337,
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
