import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'linaria';
import { styled } from 'linaria/react';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './Header';
import CustomPropTypes from '../CustomPropTypes';
import SideContentNavigation from './SideContentNavigation';
import './layout.css';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(
        sort: { fields: frontmatter___path }
        filter: { frontmatter: { path: { glob: "**" } } } # match any non-empty path
      ) {
        nodes {
          frontmatter {
            title
            path
          }
          parent {
            ... on File {
              name
            }
          }
        }
      }
    }
  `);

  const { allMarkdownRemark } = data;
  const { nodes } = allMarkdownRemark;

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
        <div className={styles.layoutNav}>
          <SideContentNavigation markdownNodes={nodes} />
        </div>
        <div className={styles.layoutContent}>
          <main className={styles.content}>{children}</main>
        </div>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  markdownNodes: CustomPropTypes.markdownNodeArray,
};

Layout.propTypes = {
  markdownNodes: null,
};

export default Layout;
