export const COLORS = {
  primary: [20, 184, 166], // Tailwind teal-500
  secondary: [71, 85, 105], // slate-600
  dark: [15, 23, 42], // slate-900
  light: [248, 250, 252], // slate-50
  border: [226, 232, 240], // slate-200
  text: [51, 65, 85], // slate-700
  white: [255, 255, 255],
};

export const FONT = {
  title: 26,
  subtitle: 16,
  heading: 18,
  body: 12,
  small: 10,
};

export const PAGE = {
  width: 210,
  height: 297,
  margin: 20,
};

export const drawDivider = (doc, y) => {
  doc.setDrawColor(...COLORS.border);
  doc.setLineWidth(0.5);
  doc.line(PAGE.margin, y, PAGE.width - PAGE.margin, y);
};

export const sectionTitle = (doc, text, y) => {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(FONT.heading);
  doc.setTextColor(...COLORS.primary);

  doc.text(text, PAGE.margin, y);

  drawDivider(doc, y + 3);
};

export const normalText = (doc) => {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(FONT.body);
  doc.setTextColor(...COLORS.text);
};

export const headingText = (doc) => {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(FONT.title);
  doc.setTextColor(...COLORS.dark);
};

export const smallText = (doc) => {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(FONT.small);
  doc.setTextColor(...COLORS.secondary);
};

export const roundedHeader = (doc) => {
  doc.setFillColor(...COLORS.primary);
  doc.roundedRect(0, 0, PAGE.width, 42, 0, 0, "F");
};

export const footer = (doc, page, totalPages) => {
  const y = PAGE.height - 12;

  doc.setDrawColor(...COLORS.border);
  doc.line(PAGE.margin, y - 6, PAGE.width - PAGE.margin, y - 6);

  smallText(doc);

  doc.text(
    "Generated from Fardin Ahmed Portfolio",
    PAGE.margin,
    y
  );

  doc.text(
    `Page ${page} / ${totalPages}`,
    PAGE.width - PAGE.margin,
    y,
    {
      align: "right",
    }
  );
};