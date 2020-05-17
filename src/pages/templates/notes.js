import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout";

export default function BlogTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  console.log({ data });
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, parent } = markdownRemark
  return (
    <Layout>
      <div className="blog-post-container">
        <div className="blog-post">
          <h2>{parent.modifiedTime}</h2>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(
      parent: {
        id: {
          eq: $id
        }
      }
    ) {
      html
      frontmatter {
        id
      }
      parent {
        ... on File {
          id
          name
          modifiedTime
        }
      }
    }
  }
`
