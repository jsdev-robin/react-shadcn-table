export function printTable(
  title: string,
  headers: string[],
  rows: unknown[][],
) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.alert(
      'Print window was blocked. Please allow popups for this site and try again.',
    );
    return;
  }

  const escapeHtml = (value: unknown) => {
    const text = value == null ? '' : String(value);
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  const headerRow = headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('');
  const bodyRows = rows
    .map(
      (row) =>
        `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`,
    )
    .join('');

  printWindow.document.open();
  printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
<title>${escapeHtml(title)}</title>
<style>
  @page { size: landscape; margin: 12mm; }
  body { font-family: Arial, sans-serif; color: #111; margin: 0; padding: 0; }
  h1 { font-size: 16px; font-weight: 600; margin: 0 0 12px; }
  table { width: 100%; border-collapse: collapse; font-size: 11px; }
  th, td { border: 1px solid #ccc; padding: 4px 6px; text-align: left; white-space: nowrap; }
  th { background: #f2f2f2; font-weight: 600; }
  tr:nth-child(even) td { background: #fafafa; }
</style>
</head>
<body>
<h1>${escapeHtml(title)}</h1>
<table>
  <thead><tr>${headerRow}</tr></thead>
  <tbody>${bodyRows}</tbody>
</table>
</body>
</html>
  `);
  printWindow.document.close();

  const triggerPrint = () => {
    printWindow.focus();
    printWindow.print();
  };

  if (printWindow.document.readyState === 'complete') {
    setTimeout(triggerPrint, 100);
  } else {
    printWindow.onload = () => setTimeout(triggerPrint, 100);
    setTimeout(triggerPrint, 500);
  }
}
