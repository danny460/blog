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
    gridLayout: css`
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto 1fr;
      grid-template-areas:
        'header header'
        'sidebar main';
      min-height: 100%;
      height: 100%;
    `,
    headerGrid: css`
      grid-area: header;
    `,
    sidebarGrid: css`
      grid-area: sidebar;
    `,
    mainGrid: css`
      grid-area: main;
      overflow-y: scroll;
    `,
    content: css`
      padding: 1.5rem 1.5rem;
      margin: 0 auto;
      max-width: 960px;
    `,
  };

  return (
    <div className={styles.gridLayout}>
      <div className={styles.headerGrid}>
        <Header siteTitle={data.site.siteMetadata.title} />
      </div>
      <div className={styles.sidebarGrid}>
        <SideContentNavigation />
      </div>
      <div className={styles.mainGrid}>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
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
