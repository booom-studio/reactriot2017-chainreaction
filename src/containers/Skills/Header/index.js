import React from 'react';
import { Navbar, Glyphicon } from 'react-bootstrap';
const { Text } = Navbar;

export default ({ profile = '', badges = 0, stars = 0 }) => (
  <Navbar>
    <Text>{profile}</Text>
    <Text>
      <Glyphicon className='skillPanelHeaderGlyph' glyph='tag' /> {badges}
      <Glyphicon className='skillPanelHeaderGlyph' glyph='star' /> {stars}
    </Text>
  </Navbar>
);
