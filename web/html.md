# HTML

## DOCTYPE
`DOCTYPE` is the **document type declaration**. It is an instruction that associates a SGML or XML document (like a webpage) with a **document type definition (DTD)**. 

a DTD defines how a document of a certain type should be structured, and the `DOCTYPE` declares which DTD the document supposedly respect.

The `DOCTYPE` tells the browser how to render a page. A missing or incorrectly declared DOCTYPE can trigger the browser to render the page in **quirks mode**. 

> **Note:** Modern browsers are generally desinged with multiple rendering modes:
> - **standard mode** renders the page according to HTML and CSS specifications;
> - **quirks mode** emulate the behavior of older browsers, where specifications can be partially or incorrectly implemented.
> - **almost standard mode** are provided by some browser
> 
> In most browsers you cane use `document.compatMode` to determine the rendering mode. The value would be `"CSS1Compat"` for standard mode and `"BackCompat"` for quicks mode.

For HTML5 use `<!DOCTYPE html>` as the declaraction, without DTDs.

> Example of HTML4.01 DOCTYPE with DTD: 
> 
> `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">`

See:
- https://en.wikipedia.org/wiki/Quirks_mode