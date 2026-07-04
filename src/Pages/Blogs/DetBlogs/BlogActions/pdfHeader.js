import { COLORS, PAGE } from "./pdfHelpers";

export const drawHeader = (doc, blog) => {
  const staff = blog?.staff;
  const totalPages = doc.getNumberOfPages();

  // Skip the cover page (page 1)
  for (let page = 2; page <= totalPages; page++) {
    doc.setPage(page);

    const pageWidth = PAGE.width;

    // Background
    doc.setFillColor(...COLORS.primary);
    doc.rect(0, 0, pageWidth, 24, "F");

    // Brand
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.setTextColor(255, 255, 255);

    doc.text("Eshrak G", 18, 11);

    // Blog Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);

    const title =
      blog?.title_bng ||
      blog?.title ||
      "Untitled Blog";

    const titleLines = doc.splitTextToSize(title, 90);

    doc.text(
      titleLines[0],
      pageWidth / 2,
      11,
      {
        align: "center",
      }
    );

    // Category Badge
    const category = blog?.category?.name || "Blog";

    const badgeWidth =
      doc.getTextWidth(category) + 10;

    const badgeX = pageWidth - badgeWidth - 18;

    doc.setFillColor(255, 255, 255);
    doc.roundedRect(
      badgeX,
      5,
      badgeWidth,
      10,
      3,
      3,
      "F"
    );

    doc.setFontSize(9);
    doc.setTextColor(...COLORS.primary);

    doc.text(
      category,
      badgeX + badgeWidth / 2,
      11,
      {
        align: "center",
      }
    );

    // Information Row
    doc.setDrawColor(...COLORS.border);
    doc.line(
      20,
      30,
      pageWidth - 20,
      30
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.text);

    doc.text(
      `Author: ${staff?.name || "Unknown"}`,
      20,
      36
    );

    doc.text(
      `Designation: ${
        staff?.designation || "-"
      }`,
      70,
      36
    );

    const date = blog?.published_at
      ? new Date(blog.published_at).toLocaleDateString()
      : "-";

    doc.text(
      `Published: ${date}`,
      pageWidth - 20,
      36,
      {
        align: "right",
      }
    );
  }
};