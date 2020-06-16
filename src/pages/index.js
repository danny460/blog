import 'gatsby-remark-design-system/theme/gatsby-remark-design-system-theme.scss';

import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default function IndexPage() {
  return (
    <Layout sideNav={false}>
      <SEO title="cs study notes" />
    </Layout>
  );
}
