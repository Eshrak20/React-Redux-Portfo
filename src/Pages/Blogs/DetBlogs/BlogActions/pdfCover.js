import { COLORS, PAGE } from "./pdfHelpers";

/**
 * Beautiful Cover Page
 */
export const drawCoverPage = async (doc, blog) => {
  const { staff } = blog;

  const pageWidth = PAGE.width;
  const pageHeight = PAGE.height;

  // Background
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Top Banner
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, pageWidth, 45, "F");

  // Website Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(255, 255, 255);

  doc.text("Eshrak G", pageWidth / 2, 20, {
    align: "center",
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  doc.text("Knowledge • Development • Technology", pageWidth / 2, 30, {
    align: "center",
  });

  // Blog Title
  let y = 70;

  doc.setTextColor(...COLORS.dark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);

  const title = doc.splitTextToSize(
    blog.title_bng || blog.title,
    160
  );

  doc.text(title, pageWidth / 2, y, {
    align: "center",
  });

  y += title.length * 10 + 10;

  // Category
  doc.setFillColor(...COLORS.primary);
  doc.roundedRect(pageWidth / 2 - 20, y - 5, 40, 10, 4, 4, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);

  doc.text(blog.category?.name || "Blog", pageWidth / 2, y + 2, {
    align: "center",
  });

  y += 28;

  // Summary
  const summary = stripHtml(
    blog.summary_bng || blog.summary || ""
  );

  doc.setTextColor(...COLORS.text);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);

  const summaryLines = doc.splitTextToSize(summary, 165);

  doc.text(summaryLines, pageWidth / 2, y, {
    align: "center",
  });

  y += summaryLines.length * 6 + 20;

  // Divider
  doc.setDrawColor(...COLORS.border);
  doc.line(35, y, pageWidth - 35, y);

  y += 20;

  // Written By
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...COLORS.dark);

  doc.text("Written By", pageWidth / 2, y, {
    align: "center",
  });

  y += 10;

  doc.setFontSize(20);
  doc.text(staff?.name || "", pageWidth / 2, y, {
    align: "center",
  });

  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  doc.text(staff?.designation || "", pageWidth / 2, y, {
    align: "center",
  });

  y += 15;

  // Contact Card
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(30, y, 150, 55, 5, 5, "F");

  doc.setDrawColor(...COLORS.border);
  doc.roundedRect(30, y, 150, 55, 5, 5);

  let infoY = y + 10;

  doc.setFontSize(11);
  doc.setTextColor(...COLORS.text);

  if (staff?.email) {
    doc.text(`Email : ${staff.email}`, 38, infoY);
    infoY += 8;
  }

  if (staff?.phone) {
    doc.text(`Phone : ${staff.phone}`, 38, infoY);
    infoY += 8;
  }

  if (staff?.portfolio_url) {
    doc.text(`Portfolio : ${staff.portfolio_url}`, 38, infoY);
    infoY += 8;
  }

  if (staff?.github_url) {
    doc.text(`GitHub : ${staff.github_url}`, 38, infoY);
    infoY += 8;
  }

  if (staff?.linkedin_url) {
    doc.text(`LinkedIn : ${staff.linkedin_url}`, 38, infoY);
  }

  // Bottom Quote
  doc.setFont("helvetica", "italic");
  doc.setFontSize(13);
  doc.setTextColor(...COLORS.secondary);

  doc.text(
    "Building ideas into real-world digital experiences.",
    pageWidth / 2,
    pageHeight - 28,
    {
      align: "center",
    }
  );

  // Date
  doc.setFontSize(10);

  doc.text(
    new Date(blog.published_at).toLocaleDateString(),
    pageWidth / 2,
    pageHeight - 15,
    {
      align: "center",
    }
  );

  // Next Page
  doc.addPage();
};

function stripHtml(html = "") {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}