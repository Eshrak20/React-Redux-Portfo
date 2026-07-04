import { COLORS, PAGE } from "./pdfHelpers";

const LEFT = PAGE.margin;
const RIGHT = PAGE.width - PAGE.margin;
const MAX_WIDTH = RIGHT - LEFT;

const TOP_MARGIN = 48;
const BOTTOM_MARGIN = 30;

/**
 * Remove HTML Tags
 */
export const stripHtml = (html = "") => {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
};

/**
 * Decode HTML
 */
const decodeHTML = (text = "") => {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
};
export const renderContent = (doc, html = "", startY = TOP_MARGIN) => {
  if (!html) {
    return startY;
  }

  const document = createDOM(html);

  let y = startY;

  y = renderChildren(doc, document.body.childNodes, y);

  return y;
};
/**
 * New Page
 */
const addPageIfNeeded = (doc, y, requiredHeight = 10) => {
  if (y + requiredHeight <= PAGE.height - BOTTOM_MARGIN) {
    return y;
  }

  doc.addPage();

  return TOP_MARGIN;
};

/**
 * Draw Paragraph
 */
const drawParagraph = (
  doc,
  text,
  y,
  {
    fontSize = 12,
    fontStyle = "normal",
    color = COLORS.text,
    lineHeight = 6,
  } = {},
) => {
  if (!text) return y;

  doc.setFont("helvetica", fontStyle);
  doc.setFontSize(fontSize);
  doc.setTextColor(...color);

  const lines = doc.splitTextToSize(text, MAX_WIDTH);

  for (const line of lines) {
    y = addPageIfNeeded(doc, y, lineHeight);

    doc.text(line, LEFT, y);

    y += lineHeight;
  }

  return y + 2;
};

/**
 * Draw Heading
 */
const drawHeading = (doc, text, y, level = 1) => {
  const sizes = {
    1: 22,
    2: 18,
    3: 16,
    4: 14,
  };

  return drawParagraph(doc, text, y, {
    fontSize: sizes[level] || 14,
    fontStyle: "bold",
    color: COLORS.primary,
    lineHeight: 8,
  });
};

/**
 * Convert HTML string into DOM
 */
const createDOM = (html) => {
  const parser = new DOMParser();

  return parser.parseFromString(html, "text/html");
};

/**
 * Render Children
 */
const renderChildren = (doc, children, y) => {
  children.forEach((child) => {
    y = renderNode(doc, child, y);
  });

  return y;
};

/**
 * Render a single DOM node
 */
const renderNode = (doc, node, y) => {
  // Plain Text
  if (node.nodeType === Node.TEXT_NODE) {
    const text = decodeHTML(node.textContent || "").trim();

    if (!text) return y;

    return drawParagraph(doc, text, y);
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return y;
  }

  const tag = node.tagName.toLowerCase();

  switch (tag) {
    case "body":
      return renderChildren(doc, node.childNodes, y);

    case "div":
      return renderChildren(doc, node.childNodes, y);

    case "section":
      return renderChildren(doc, node.childNodes, y);

    case "article":
      return renderChildren(doc, node.childNodes, y);

    case "span":
      return renderChildren(doc, node.childNodes, y);

    case "p": {
      const text = decodeHTML(node.textContent || "").trim();

      if (!text) {
        return y + 6;
      }

      return drawParagraph(doc, text, y, {
        fontSize: 12,
        lineHeight: 7,
      });
    }

    case "br":
      return y + 6;

    case "strong":
    case "b": {
      const text = decodeHTML(node.textContent || "").trim();

      if (!text) return y;

      return drawParagraph(doc, text, y, {
        fontStyle: "bold",
        fontSize: 12,
        lineHeight: 7,
      });
    }

    case "em":
    case "i": {
      const text = decodeHTML(node.textContent || "").trim();

      if (!text) return y;

      return drawParagraph(doc, text, y, {
        fontStyle: "italic",
        fontSize: 12,
        lineHeight: 7,
      });
    }

    case "h1": {
      return drawHeading(doc, decodeHTML(node.textContent || ""), y + 4, 1);
    }

    case "h2": {
      return drawHeading(doc, decodeHTML(node.textContent || ""), y + 3, 2);
    }

    case "h3": {
      return drawHeading(doc, decodeHTML(node.textContent || ""), y + 2, 3);
    }

    case "h4": {
      return drawHeading(doc, decodeHTML(node.textContent || ""), y + 2, 4);
    }
    case "ul": {
      y += 2;

      Array.from(node.children).forEach((child) => {
        y = renderNode(doc, child, y);
      });

      return y + 4;
    }

    case "ol": {
      y += 2;

      let index = 1;

      Array.from(node.children).forEach((child) => {
        child.setAttribute("data-index", index);

        y = renderNode(doc, child, y);

        index++;
      });

      return y + 4;
    }

    case "li": {
      const isOrdered = node.parentElement?.tagName?.toLowerCase() === "ol";

      const bullet = isOrdered ? `${node.getAttribute("data-index")}.` : "•";

      const text = decodeHTML(node.textContent || "").trim();

      if (!text) return y;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(...COLORS.text);

      const lines = doc.splitTextToSize(text, MAX_WIDTH - 10);

      lines.forEach((line, i) => {
        y = addPageIfNeeded(doc, y, 7);

        if (i === 0) {
          doc.text(bullet, LEFT + 2, y);
        }

        doc.text(line, LEFT + 8, y);

        y += 7;
      });

      return y + 2;
    }

    default:
      return renderChildren(doc, node.childNodes, y);
  }
};
