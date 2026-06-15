import fs from 'fs';

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  // Increase mobile font sizes for legibility
  content = content.replace(/text-\[9px\]/g, 'text-[11px]');
  content = content.replace(/text-\[10px\]/g, 'text-xs');
  content = content.replace(/text-\[11px\]/g, 'text-[13px]');
  
  // For the ones that are already 'text-xs', they don't need a mobile bump here,
  // but if there are cases like md:text-xs, we might need to adjust them if they clash.
  // Generally, bumping the base size is enough.
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

fixFile('src/App.tsx');
fixFile('src/GallerySection.tsx');
fixFile('src/components/EnvelopeOpener.tsx');
console.log('Done');
