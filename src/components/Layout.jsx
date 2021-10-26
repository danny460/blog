import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'linaria';

const Layout = ({ children }) => {
  const styles = {
    root: css`
      color: var(--textNormal);
      background: var(--bg);
      transition: color 0.2s ease-out, background 0.2s ease-out;
      min-height: 100vh;
    `,
    main: css`
      margin-left: auto;
      margin-right: auto;
      max-width: 42rem;
      padding: 2.625rem 1.3125rem;
    `
  };

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        { children }
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
