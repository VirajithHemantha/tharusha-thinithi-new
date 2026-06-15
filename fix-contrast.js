import fs from 'fs';

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  // Font weights
  content = content.replace(/font-light/g, 'font-normal');
  
  // Contrast fixes
  content = content.replace(/text-\[#d4af37\]\/40/g, 'text-[#d4af37]/80');
  content = content.replace(/text-\[#d4af37\]\/60/g, 'text-[#d4af37]/90');
  content = content.replace(/text-white\/40/g, 'text-white/80');
  content = content.replace(/text-white\/50/g, 'text-white/80');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated contrast and weights in ${filePath}`);
  }
}

fixFile('src/App.tsx');
fixFile('src/GallerySection.tsx');
fixFile('src/components/EnvelopeOpener.tsx');
console.log('Done contrast');
