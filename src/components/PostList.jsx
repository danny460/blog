import React from 'react';
import NestedContentList from './NestedContentList';
import { useStaticQuery, graphql } from 'gatsby';
import { css } from 'linaria';


/**
 * generate display name from slug. assume key to be 'cs-notes', generated
 * name will be 'CS Notes'
 * @param {string} slug the slug string
 * @returns {string} display name
 */
const getDisplayNameFromSlug = slug => {
    const DELIMITER = '-';
    const SPACER = ' ';

    const words = slug.split(DELIMITER);
    return words.map(capitalize).join(SPACER);
};

/**
 * captialize give string
 * @param {string} str
 * @returns {string}
 */
const capitalize = str =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const styles = {
    sidebar: css`
    border-right: solid 1px lightgray;
    width: 350px;
    height: 100%;
    min-height: 100%;
    padding: 1rem;
  `,
};

export default function SideContentNavigation() {
    const { allMarkdownRemark } = useStaticQuery(graphql`
    query MarkdownNotesQuery {
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

    const { nodes } = allMarkdownRemark;
    
    const posts = nodes.map(node => {
        const { frontmatter } = node
        const { title, path } = frontmatter
        return <Post key={path} title={title} link={path} />
    })

    return (
        <div>
            {posts}
        </div>
    );
}

const Post = ({ title, link, abstract }) => {
    return (
        <div>
            <h2>
                <a href={link}>{title}</a>
            </h2>
            <p>{abstract}</p>
        </div>
    )
}
