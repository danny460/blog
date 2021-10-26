import 'gatsby-remark-design-system/theme/gatsby-remark-design-system-theme.scss';
import 'react-toggle/style.css'
import './index.css'

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { Header, Layout, SEO, PostList } from '../components';


export default function IndexPage() {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <Layout>
      <SEO title={data.site.siteMetadata.title} />
      <Header siteTitle={data.site.siteMetadata.title} />
      <PostList />
    </Layout>
  );
}
