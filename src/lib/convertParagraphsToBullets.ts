// Utility to convert numbered blog paragraphs to bullet points
// Usage: import and call convertParagraphsToBullets(yourText)

export function convertParagraphsToBullets(text: string): string {
  // Split by numbered entries (e.g., 1. ... 2. ...)
  const entries = text.split(/\n?\d+\.\s/).filter(Boolean);
  // Add back the numbering for the first entry if it was at the start
  if (!/^\d+\./.test(text.trim())) entries[0] = "1. " + entries[0];
  // Format each entry as a bullet point
  return entries
    .map(entry => {
      // Split the entry into lines for sub-bullets (e.g., "Why purchase it?")
      const lines = entry.split(/\n/).map(line => line.trim()).filter(Boolean);
      const [main, ...rest] = lines;
      let bullet = `- ${main}`;
      if (rest.length) {
        bullet += "\n" + rest.map(sub => `  - ${sub}`).join("\n");
      }
      return bullet;
    })
    .join("\n\n");
}
