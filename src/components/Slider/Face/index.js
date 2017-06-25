import React from 'react';
import { Glyphicon } from 'react-bootstrap';

import './style.css';

export default ({ color = 'black', collapsed = true, photoUrl }) => (
  <div className='Face'>
    <Glyphicon style={{ color }} glyph='triangle-top' />
    { (collapsed && photoUrl) || <img className='photo' src={photoUrl} /> }
  </div>
);