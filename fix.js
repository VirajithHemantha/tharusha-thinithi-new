import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  '<p className=\"font-cinzel text-[#d4af37] text-xs md:text-sm tracking-[0.4em] uppercase animate-pulse\">',
  '<p className=\"font-cinzel text-white text-xs md:text-sm tracking-[0.4em] uppercase animate-pulse drop-shadow-md\">'
);

content = content.replace(
  '<div className=\"w-16 h-16 border-2 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin\" />',
  '<div className=\"w-16 h-16 border-2 border-white/30 border-t-white rounded-full animate-spin shadow-sm\" />'
);

content = content.replace(
  '<div className=\"relative z-20 flex flex-col items-center text-center px-6 pb-[25vh] md:pb-0\">',
  '<div className=\"absolute top-12 md:top-auto md:relative z-20 flex flex-col items-center text-center px-6 w-full\">'
);

content = content.replace(
  '<span className=\"font-cinzel text-white/90 text-sm md:text-lg tracking-[0.4em] uppercase\">',
  '<span className=\"font-cinzel text-white text-sm md:text-lg tracking-[0.4em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]\">'
);

content = content.replace(
  '<div className=\"mt-2 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent\" />',
  '<div className=\"mt-2 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-white to-transparent opacity-70\" />'
);

content = content.replace(
  'className=\"font-alex text-6xl md:text-8xl lg:text-9xl text-[#d4af37] drop-shadow-2xl\"',
  'className=\"font-playball text-[3.5rem] leading-tight md:text-8xl lg:text-9xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] mt-2\"'
);

fs.writeFileSync('src/App.tsx', content);
console.log('Styles updated string version.');
