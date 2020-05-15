## CSS property

### position
The position CSS property sets how an element is positioned in a document. The `top`, `right`, `bottom`, and `left` properties determine the final location of positioned elements.

#### values
<nav class="no-bullet">

**`static`**
- The element is positioned according to the normal flow of document, the `top`, `right`, `bottom`, and `left` properties have no effect. This is the default value. 

**`relative`**
- The element is positioned according to the normal flow of document, and then offset relative to itself. other elements are not affected, the space given for the element remains in page layout.

**`absolute`**
- The element is removed from the normal document flow, and no space is created in the page layout. It is positioned relative to its closest positioned ancestor, if any; otherwise, relative to the intial **containing block**. position is based on `top`, `right`, `bottom`, and `left` properties.

**`fixed`**
- The element is removed from the normal document flow, and no space is created in the page layout. It is positioned relative to the initial **containing block** established by the viewport.

**`sticky`**
- The element is positioned according to the normal flow of the document, and then offset relative to its nearest scrolling ancestor and containing block.

#### type of positioning
positioned element is an element whose **computed position** value is either `relative`, `absolute`, `fixed` or `sticky`. (anything but `static`)

</nav>
