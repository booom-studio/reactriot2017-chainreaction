import React from 'react';
import { Glyphicon } from 'react-bootstrap';

import './style.css';

export default ({ color = 'black', collapsed = true, imgUrl }) => (
  <div className='Face'>
    <Glyphicon style={{ color }} glyph="triangle-top" />
    { collapsed || <div className='photo' /> }
  </div>
);