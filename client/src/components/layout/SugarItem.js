import React from 'react';

const SugarIteme = ({ sugarnaute: { name, avatar } }) => {
  return (
    <div className='minimoy'>
      <img src={avatar} alt='' className='round-img mini-img mx' />
      <div>{name}</div>
    </div>
  );
};

export default SugarIteme;
