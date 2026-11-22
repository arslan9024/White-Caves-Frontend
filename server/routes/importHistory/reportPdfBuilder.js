export const buildJsonReportPayload = (session, reportSessionId) => ({
  sessionId: reportSessionId,
  fileName: session.fileName,
  status: session.status,
  importedBy: session.importedBy,
  createdAt: session.createdAt,
  completedAt: session.completedAt,
  statistics: {
    totalRows: session.totalRows,
    propertiesCreated: session.propertiesCreated,
    propertiesUpdated: session.propertiesUpdated,
    ownersCreated: session.ownersCreated,
    ownersUpdated: session.ownersUpdated,
    duplicatesFound: session.duplicatesFound,
    successRate: session.successRate,
    totalErrors: session.totalErrors,
    totalWarnings: session.totalWarnings,
  },
  errors: (session.importErrors || session.errors || []).slice(0, 100),
});

export const generateImportReportPdf = async (session, reportSessionId) => {
  // Generate PDF report using pdf-lib
  const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib');

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const page = pdfDoc.addPage([595, 842]); // A4
  const { width, height } = page.getSize();
  const margin = 50;

  let y = height - margin;

  const drawText = (text, x, yPos, size = 10, isBold = false) => {
    page.drawText(String(text), {
      x,
      y: yPos,
      size,
      font: isBold ? boldFont : font,
      color: rgb(0, 0, 0),
    });
  };

  const drawLine = yPos => {
    page.drawLine({
      start: { x: margin, y: yPos },
      end: { x: width - margin, y: yPos },
      thickness: 1,
      color: rgb(0.8, 0.8, 0.8),
    });
  };

  // Header
  page.drawRectangle({ x: 0, y: height - 80, width, height: 80, color: rgb(0.05, 0.05, 0.15) });
  drawText('White Caves Real Estate', margin, height - 35, 18, true);
  page.drawText('Import Report', {
    x: margin,
    y: height - 58,
    size: 12,
    font,
    color: rgb(0.8, 0.8, 0.8),
  });

  y = height - 100;

  // Session info
  drawText('IMPORT SESSION DETAILS', margin, y, 12, true);
  y -= 20;
  drawLine(y);
  y -= 15;

  const infoRows = [
    ['Session ID:', reportSessionId],
    ['File Name:', session.fileName || 'N/A'],
    ['Status:', session.status || 'N/A'],
    ['Imported By:', session.importedBy || 'N/A'],
    ['Started At:', session.createdAt ? new Date(session.createdAt).toLocaleString() : 'N/A'],
    [
      'Completed At:',
      session.completedAt ? new Date(session.completedAt).toLocaleString() : 'N/A',
    ],
  ];

  for (const [label, value] of infoRows) {
    drawText(label, margin, y, 10, true);
    drawText(value, margin + 120, y, 10);
    y -= 18;
  }

  y -= 10;
  drawText('IMPORT STATISTICS', margin, y, 12, true);
  y -= 20;
  drawLine(y);
  y -= 15;

  const stats = [
    ['Total Rows Processed:', session.totalRows ?? 0],
    ['Properties Created:', session.propertiesCreated ?? 0],
    ['Properties Updated:', session.propertiesUpdated ?? 0],
    ['Owners Created:', session.ownersCreated ?? 0],
    ['Owners Updated:', session.ownersUpdated ?? 0],
    ['Duplicates Found:', session.duplicatesFound ?? 0],
    ['Success Rate:', `${session.successRate ?? 0}%`],
    ['Total Errors:', session.totalErrors ?? 0],
    ['Total Warnings:', session.totalWarnings ?? 0],
  ];

  for (const [label, value] of stats) {
    drawText(label, margin, y, 10, true);
    drawText(String(value), margin + 150, y, 10);
    y -= 18;
  }

  // Errors section
  const errors = (session.importErrors || session.errors || []).slice(0, 20);
  if (errors.length > 0) {
    y -= 10;
    drawText('ERRORS (first 20)', margin, y, 12, true);
    y -= 20;
    drawLine(y);
    y -= 15;

    for (const err of errors) {
      if (y < margin + 30) {
        // Add new page if needed
        pdfDoc.addPage([595, 842]);
        y = 842 - margin;
      }
      const errText = typeof err === 'string' ? err : err.message || JSON.stringify(err);
      drawText(`• ${errText.substring(0, 90)}`, margin, y, 9);
      y -= 14;
    }
  }

  // Footer
  const lastPage = pdfDoc.getPages()[pdfDoc.getPageCount() - 1];
  lastPage.drawText(`Generated: ${new Date().toLocaleString()} | White Caves Real Estate`, {
    x: margin,
    y: 25,
    size: 8,
    font,
    color: rgb(0.5, 0.5, 0.5),
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
};
