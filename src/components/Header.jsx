import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'linaria';
import { styled } from 'linaria/react';

import { Link } from 'gatsby';

const StyledHeader = styled.header`
  height: 60px;
  width: 100%;
  background-color: rebeccapurple;
`;

const HeaderContentContainer = styled.div`
  margin: 0;
  max-width: 960px;
  padding: 20px 1rem;
`;

const Heading = styled.h5`
  margin: 0;
`;

const styles = {
  headerLink: css`
    color: white;
    text-decoration: none;
  `,
};

const Header = ({ siteTitle }) => (
  <StyledHeader>
    <HeaderContentContainer>
      <Heading>
        <Link className={styles.headerLink} to="/">
          {siteTitle}
        </Link>
      </Heading>
    </HeaderContentContainer>
  </StyledHeader>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
