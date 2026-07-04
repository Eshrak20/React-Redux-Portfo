import jsPDF from "jspdf";

import { drawCoverPage } from "./pdfCover";
import { drawFooter } from "./pdfFooter";
import { drawHeader } from "./pdfHeader";

import { renderContent, stripHtml } from "./pdfContent";

/**
 * Download image
 */
const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      resolve(null);
      return;
    }

    const image = new Image();

    image.crossOrigin = "Anonymous";

    image.onload = () => resolve(image);

    image.onerror = reject;

    image.src = url;
  });
};

/**
 * Image -> Base64
 */
const imageToBase64 = (image) => {
  const canvas = document.createElement("canvas");

  canvas.width = image.width;
  canvas.height = image.height;

  const ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0);

  return canvas.toDataURL("image/jpeg");
};

/**
 * Format Date
 */
const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/**
 * Main Function
 */
export const generatePDF = async (blog) => {
  if (!blog) return;
  console.log(blog);

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const html = blog.content_bng || blog.content || "";

  const summary = stripHtml(blog.summary_bng || blog.summary || "");

  const staff = blog.staff;

  const featuredImage = await loadImage(blog.featured_image).catch(() => null);

  const staffImage = await loadImage(staff?.image).catch(() => null);
  // ===============================
  // PAGE 1 → COVER PAGE
  // ===============================

  await drawCoverPage(doc, blog, {
    featuredImage,
    staffImage,
  });

  // After cover page, we always start content on page 2
  doc.addPage();

  let y = 20;

  // ===============================
  // ARTICLE META BLOCK (Page 2 Top)
  // ===============================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(20, 184, 166);

  const title = blog.title_bng || blog.title;

  const titleLines = doc.splitTextToSize(title, 170);

  doc.text(titleLines, 20, y);

  y += titleLines.length * 8 + 4;

  // Category + Date row
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);

  const category = blog?.category?.name || "Blog";
  const date = formatDate(blog.published_at);

  doc.text(`Category: ${category}`, 20, y);
  doc.text(`Published: ${date}`, 140, y);

  y += 10;

  // Divider line
  doc.setDrawColor(226, 232, 240);
  doc.line(20, y, 190, y);

  y += 10;

  // ===============================
  // SUMMARY BLOCK
  // ===============================

  if (summary) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(11);
    doc.setTextColor(71, 85, 105);

    const summaryLines = doc.splitTextToSize(summary, 170);

    doc.text(summaryLines, 20, y);

    y += summaryLines.length * 6 + 10;
  }

  // ===============================
  // START CONTENT RENDERING
  // ===============================

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);

  const contentHTML = blog.content_bng || blog.content || "";

  // This function will come from pdfContent.js
  y = renderContent(doc, contentHTML, y);
  // ===============================
  // FINAL PAGE FIX + CLEANUP
  // ===============================

  const pageCount = doc.getNumberOfPages();

  // ===============================
  // HEADER (ALL PAGES EXCEPT COVER)
  // ===============================
  drawHeader(doc, blog);

  // ===============================
  // FOOTER (ALL PAGES)
  // ===============================
  drawFooter(doc, blog);

  // ===============================
  // OPTIONAL: WATERMARK (clean branding)
  // ===============================
  for (let i = 2; i <= pageCount; i++) {
    doc.setPage(i);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(40);
    doc.setTextColor(240, 240, 240);

    doc.text("Eshrak G", 105, 160, {
      align: "center",
      angle: 45,
    });
  }

  // ===============================
  // PAGE NUMBERS (SAFE OVERLAY)
  // ===============================
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);

    doc.text(`Page ${i} / ${pageCount}`, 190, 290, { align: "right" });
  }

  // ===============================
  // OPTIONAL: CLICKABLE LINKS FOOTER LINE
  // ===============================

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    let x = 20;
    const y = 285;

    const addLink = (label, url) => {
      if (!url) return;

      doc.setTextColor(20, 184, 166);
      doc.textWithLink(label, x, y, { url });

      x += doc.getTextWidth(label) + 6;
    };

    addLink("Portfolio", staff?.portfolio_url);
    addLink("GitHub", staff?.github_url);
    addLink("LinkedIn", staff?.linkedin_url);
    addLink("Email", `mailto:${staff?.email}`);
  }

  // ===============================
  // FINAL EXPORT
  // ===============================

  const fileName = `${(blog.slug || "blog")
    .toLowerCase()
    .replace(/\s+/g, "-")}.pdf`;

  doc.save(fileName);
};
