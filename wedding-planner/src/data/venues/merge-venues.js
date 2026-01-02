const fs = require('fs');
const path = require('path');

// Read original venues (1-8)
const originalVenues = JSON.parse(fs.readFileSync(path.join(__dirname, 'venues.json'), 'utf8'));

// Read all individual venue files
const individualDir = path.join(__dirname, 'individual');
const individualFiles = fs.readdirSync(individualDir)
  .filter(f => f.endsWith('.json') && f.startsWith('venue-'))
  .sort();

const newVenues = individualFiles.map(file => {
  const content = fs.readFileSync(path.join(individualDir, file), 'utf8');
  return JSON.parse(content);
});

// Combine all venues
const allVenues = [...originalVenues, ...newVenues];

// Sort by ID
allVenues.sort((a, b) => {
  const numA = parseInt(a.id.split('-')[1]);
  const numB = parseInt(b.id.split('-')[1]);
  return numA - numB;
});

// Write the combined venues
fs.writeFileSync(
  path.join(__dirname, 'venues.json'),
  JSON.stringify(allVenues, null, 2),
  'utf8'
);

console.log(`Total venues: ${allVenues.length}`);
console.log('Venues merged successfully!');
