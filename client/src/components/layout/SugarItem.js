import React from 'react';
import PropTypes from 'prop-types';

const SugarIteme = ({ sugarnaute: { name, avatar } }) => {
  return (
    <div className='minimoy'>
      <img src={avatar} alt='' className='round-img mini-img mx' />
      <div>
        {name}
        {/* <div className='btn btn-dark' onClick={friendCheck}>
              Demander en ami
            </div> */}
      </div>
    </div>
  );
};

SugarIteme.propTypes = {};

export default SugarIteme;
