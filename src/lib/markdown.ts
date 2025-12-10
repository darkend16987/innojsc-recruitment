/**
 * Convert simple markdown text to HTML
 * Supports:
 * - Line breaks
 * - Bold: **text**
 * - Italic: *text*
 * - Bullet lists: - item
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown) return '';

  let html = markdown;

  // Split into lines
  const lines = html.split('\n');
  const processedLines: string[] = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // Check if line is a bullet point
    if (line.startsWith('- ')) {
      if (!inList) {
        processedLines.push('<ul class="list-disc list-inside space-y-2 ml-4">');
        inList = true;
      }
      // Remove the '- ' and wrap in <li>
      line = '<li>' + line.substring(2).trim() + '</li>';
      processedLines.push(line);
    } else {
      // Close list if we were in one
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
      }

      // Process inline markdown in the line
      if (line) {
        // Bold: **text** -> <strong>text</strong>
        line = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

        // Italic: *text* -> <em>text</em> (but not if it's part of **)
        line = line.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');

        processedLines.push('<p>' + line + '</p>');
      } else {
        // Empty line
        processedLines.push('<br/>');
      }
    }
  }

  // Close list if still open
  if (inList) {
    processedLines.push('</ul>');
  }

  html = processedLines.join('\n');

  return html;
}

/**
 * Convert HTML back to markdown (for editing)
 */
export function htmlToMarkdown(html: string): string {
  if (!html) return '';

  let markdown = html;

  // Remove <p> tags but keep content
  markdown = markdown.replace(/<p>(.*?)<\/p>/g, '$1\n');

  // Convert <ul><li> to bullet points
  markdown = markdown.replace(/<ul[^>]*>/g, '');
  markdown = markdown.replace(/<\/ul>/g, '');
  markdown = markdown.replace(/<li>(.*?)<\/li>/g, '- $1\n');

  // Convert <strong> to **
  markdown = markdown.replace(/<strong>(.*?)<\/strong>/g, '**$1**');

  // Convert <em> to *
  markdown = markdown.replace(/<em>(.*?)<\/em>/g, '*$1*');

  // Convert <br/> to newline
  markdown = markdown.replace(/<br\s*\/?>/g, '\n');

  // Remove any remaining HTML tags
  markdown = markdown.replace(/<[^>]+>/g, '');

  // Clean up multiple newlines
  markdown = markdown.replace(/\n{3,}/g, '\n\n');

  // Trim whitespace
  markdown = markdown.trim();

  return markdown;
}
