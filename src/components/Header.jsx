import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'linaria';
import { styled } from 'linaria/react';

import { Link } from 'gatsby';
import ThemeToggle from './ThemeToggle';

const FlexHeader = styled.header`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:2.625rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 0;
  margin-top: 0;
`

const styles = {
  headerLink: css`
    text-decoration: none;
    color:var(--textTitle)
  `,
};

const Header = ({ siteTitle }) => (
  <FlexHeader>
    <Title>
      <Link className={styles.headerLink} to="/">
        {siteTitle}
      </Link>
    </Title>
    <ThemeToggle />
  </FlexHeader>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
