import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'linaria';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './Header';
import SideContentNavigation from './SideContentNavigation';
import './layout.css';

const Layout = ({ children, sideNav }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const styles = {
    mainSection: css`
      padding-top: 60px;
    `,
    layoutNav: css`
      position: fixed;
      width: 300px;
      height: 100%;
    `,
    layoutContent: css`
      padding-left: 300px;
    `,
    content: css`
      padding: 0.5rem 1.5rem;
      margin: 0 auto;
      max-width: 960px;
    `,
  };

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className={styles.mainSection}>
        {sideNav && (
          <div className={styles.layoutNav}>
            <SideContentNavigation />
          </div>
        )}
        <div className={styles.layoutContent}>
          <main className={styles.content}>{children}</main>
        </div>
      </div>
    </>
  );
};

Layout.defaultProps = {
  sideNav: true,
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  sideNav: PropTypes.bool,
};

export default Layout;
