import React from 'react';
import TouchingBlock from '../../components/exercises/tutor/exercisesBlocks/touchingBlock';

const Landing = () => (
  <div>
    <h1>Landing</h1>
    <TouchingBlock
      model={{
        options: {
          thumb: false,
          index: false,
          middle: true,
          ring: false,
          little: false,
          random: false,
          randomMax: null
        }
      }}
      hand='RIGHT'
      deviceData={{ f: [0, 0, 0, 0, 0, 0] }} />
  </div>
);

export default Landing;
