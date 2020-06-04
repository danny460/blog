import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import SideContentNavigation from '../components/SideContentNavigation';

BlogTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
      html: PropTypes.string.isRequired,
      parent: PropTypes.shape({
        modifiedTime: PropTypes.string.isRequired,
      }),
    }),
  }),
};

export default function BlogTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  console.log({ data });
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html, parent } = markdownRemark;

  const { title } = frontmatter;
  const { modifiedTime } = parent;
  return (
    <Layout>
      <div className="blog-post-container">
        <div className="blog-post">
          <h1>{title}</h1>
          <p>{modifiedTime}</p>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
      }
      parent {
        ... on File {
          modifiedTime
        }
      }
    }
  }
`;
