import 'gatsby-remark-design-system/theme/gatsby-remark-design-system-theme.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import SideContentNavigation from '../components/SideContentNavigation';
import CustomPropTypes from '../CustomPropTypes';

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      nodes: CustomPropTypes.markdownNodeArray,
    }),
  }),
};

export default function IndexPage({ data }) {
  const { allMarkdownRemark } = data;
  const { nodes } = allMarkdownRemark;

  return (
    <Layout>
      <SEO title="cs study notes" />
      <SideContentNavigation markdownNodes={nodes} />
    </Layout>
  );
}

export const pageQuery = graphql`
  {
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
`;
