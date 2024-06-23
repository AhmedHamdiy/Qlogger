import { htmlToText } from 'html-to-text';

export const HTMLConverter = (htmlContent: string, maxLength: number = 180) => {
  const filteredHtml = htmlContent.replace(/<img[^>]*>/g, ''); 
  let plainText = htmlToText(filteredHtml, {
    wordwrap: maxLength + 20,
  });

  if (plainText.length > maxLength) {
    plainText = plainText.substring(0, maxLength).trim() + '...';
  }

  return plainText;
};

export const codeSnippetsFormatter = (htmlContent: string) => {
  return htmlContent.replace(/<pre/g, '<pre class="bg-black p-2 rounded text-white w-full"');
};