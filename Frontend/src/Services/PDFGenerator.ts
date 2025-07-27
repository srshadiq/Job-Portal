import jsPDF from "jspdf";

interface ProfileData {
  name: string;
  email: string;
  jobTitle: string;
  company: string;
  location: string;
  about: string;
  totalExperience: number;
  skills: string[];
  experiences: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    working: boolean;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    issueDate: string;
    certificateId: string;
  }>;
}

export const generateResumePDF = (profile: ProfileData) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;

  // Colors
  const primaryColor = "#4B75FF";
  const darkColor = "#2D3748";
  const lightColor = "#718096";

  // Helper function to add text with word wrapping
  const addText = (
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    fontSize: number = 12,
    color: string = darkColor
  ) => {
    pdf.setFontSize(fontSize);
    pdf.setTextColor(color);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + lines.length * fontSize * 0.4;
  };

  // Helper function to add section header
  const addSectionHeader = (title: string, y: number) => {
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(primaryColor);
    pdf.text(title, 20, y);
    // Add underline
    pdf.setDrawColor(primaryColor);
    pdf.setLineWidth(0.5);
    pdf.line(20, y + 2, pageWidth - 20, y + 2);
    return y + 15;
  };

  // Header Section
  pdf.setFontSize(24);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(darkColor);
  pdf.text(profile.name || "John Doe", 20, yPosition);
  yPosition += 10;

  pdf.setFontSize(14);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(primaryColor);
  pdf.text(profile.jobTitle || "Professional", 20, yPosition);
  yPosition += 10;

  // Contact Information
  pdf.setFontSize(10);
  pdf.setTextColor(lightColor);
  let contactInfo = "";
  if (profile.email) contactInfo += `•  ${profile.email}  `;
  if (profile.location) contactInfo += `•  ${profile.location}  `;
  if (profile.company) contactInfo += `•  ${profile.company}`;
  pdf.text(contactInfo, 20, yPosition);
  yPosition += 15;

  // Professional Summary
  if (profile.about) {
    yPosition = addSectionHeader("PROFESSIONAL SUMMARY", yPosition);
    yPosition = addText(profile.about, 20, yPosition, pageWidth - 40, 11) + 10;
  }

  // Skills Section
  if (profile.skills && profile.skills.length > 0) {
    yPosition = addSectionHeader("SKILLS", yPosition);
    const skillsText = profile.skills.join(" • ");
    yPosition = addText(skillsText, 20, yPosition, pageWidth - 40, 11) + 10;
  }

  // Experience Section
  if (profile.experiences && profile.experiences.length > 0) {
    yPosition = addSectionHeader("PROFESSIONAL EXPERIENCE", yPosition);

    profile.experiences.forEach((exp, index) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = 20;
      }

      // Job Title and Company
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(darkColor);
      pdf.text(`${exp.title} at ${exp.company}`, 20, yPosition);
      yPosition += 8;

      // Location and Duration
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(lightColor);
      const duration = exp.working
        ? `${exp.startDate} - Present`
        : `${exp.startDate} - ${exp.endDate}`;
      pdf.text(`${exp.location} | ${duration}`, 20, yPosition);
      yPosition += 10;

      // Description
      if (exp.description) {
        yPosition =
          addText(exp.description, 20, yPosition, pageWidth - 40, 10) + 8;
      }

      yPosition += 5;
    });
  }

  // Certifications Section
  if (profile.certifications && profile.certifications.length > 0) {
    // Check if we need a new page
    if (yPosition > pageHeight - 50) {
      pdf.addPage();
      yPosition = 20;
    }

    yPosition = addSectionHeader("CERTIFICATIONS", yPosition);

    profile.certifications.forEach((cert) => {
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(darkColor);
      pdf.text(cert.name, 20, yPosition);
      yPosition += 8;

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(lightColor);
      pdf.text(
        `${cert.issuer} | Issued: ${cert.issueDate} | ID: ${cert.certificateId}`,
        20,
        yPosition
      );
      yPosition += 12;
    });
  }

  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(lightColor);
  pdf.text(
    `Generated on ${new Date().toLocaleDateString()}`,
    20,
    pageHeight - 10
  );

  // Save the PDF
  const fileName = `${
    profile.name?.replace(/\s+/g, "_") || "Resume"
  }_Resume.pdf`;
  pdf.save(fileName);
};

export const previewResumePDF = (profile: ProfileData): string => {
  const pdf = new jsPDF();
  // ... same PDF generation logic ...
  return pdf.output("datauristring");
};
