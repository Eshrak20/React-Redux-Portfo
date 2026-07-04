import { COLORS, PAGE } from "./pdfHelpers";

export const drawFooter = (doc, blog) => {
  const staff = blog?.staff;

  const pageCount = doc.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    const pageWidth = PAGE.width;
    const pageHeight = PAGE.height;
    const y = pageHeight - 22;

    // Divider
    doc.setDrawColor(...COLORS.border);
    doc.setLineWidth(0.4);
    doc.line(20, y - 8, pageWidth - 20, y - 8);

    // Left Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.dark);

    doc.text("Thank you for reading ❤️", 20, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.text);

    doc.text(
      `${staff?.name || ""} • ${staff?.designation || ""}`,
      20,
      y + 5
    );

    // Right Section
    doc.setFontSize(8);

    doc.text(
      `Page ${i} / ${pageCount}`,
      pageWidth - 20,
      y,
      {
        align: "right",
      }
    );

    doc.text(
      `${new Date().getFullYear()} © ${
        staff?.name || "Verin Group"
      }`,
      pageWidth - 20,
      y + 5,
      {
        align: "right",
      }
    );

    // Contact Links
    let linkY = pageHeight - 8;
    let x = 20;

    const addLink = (label, url) => {
      if (!url) return;

      doc.setTextColor(...COLORS.primary);

      doc.textWithLink(label, x, linkY, {
        url,
      });

      x += doc.getTextWidth(label) + 8;
    };

    addLink("Portfolio", staff?.portfolio_url);
    addLink("GitHub", staff?.github_url);
    addLink("LinkedIn", staff?.linkedin_url);
    addLink("Facebook", staff?.facebook_url);

    if (staff?.email) {
      addLink("Email", `mailto:${staff.email}`);
    }
  }
};