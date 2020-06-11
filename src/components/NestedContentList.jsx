import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import CustomPropTypes from '../CustomPropTypes';

NestedContentList.propTypes = {
  contentNode: CustomPropTypes.contentNode.isRequired,
  depth: PropTypes.number,
  root: PropTypes.bool,
};

NestedContentList.defaultProps = {
  depth: Infinity,
  root: false,
};

export default function NestedContentList({ contentNode, depth, root }) {
  if (depth < 0) return null;

  const { isLink, displayName } = contentNode;

  if (isLink) {
    const { href } = contentNode;
    return <Link to={href}>{displayName}</Link>;
  }

  let nestedList = null;
  if (depth !== 0) {
    const { children } = contentNode;
    const listItems = Array.from(children.keys()).map(key => {
      const node = children.get(key);

      if (root) {
        return <NestedContentList key={key} contentNode={node} depth={depth} />;
      } else {
        return (
          <li key={key}>
            <NestedContentList contentNode={node} depth={depth - 1} />
          </li>
        );
      }
    });

    if (root) {
      nestedList = listItems;
    } else {
      nestedList = <ul>{listItems}</ul>;
    }
  }

  return (
    <>
      {root || <legend>{displayName}</legend>}
      {nestedList}
    </>
  );
}
