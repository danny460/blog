import PropTypes from 'prop-types';

const markdownNode = PropTypes.shape({
  frontmatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }),
});

const markdownNodeArray = PropTypes.arrayOf(markdownNode);

const contentNode = PropTypes.shape({});

const CustomPropTypes = {
  markdownNode,
  markdownNodeArray,
  contentNode,
};

export default CustomPropTypes;
