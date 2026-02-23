const FIRST_NAMES = [
  'James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda',
  'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Christopher', 'Karen', 'Charles', 'Nancy', 'Daniel', 'Lisa',
  'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley'
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas'
];

export function generatePeople(count: number = 10) {
  const people = [];
  const usedNames = new Set();
  const usedImageIds = new Set();

  while (people.length < count) {
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const fullName = `${firstName} ${lastName}`;
    
    // Ensure unique names for the game
    if (usedNames.has(fullName)) continue;
    usedNames.add(fullName);

    // Random image ID for picsum
    const imageId = Math.floor(Math.random() * 1000);
    if (usedImageIds.has(imageId)) continue;
    usedImageIds.add(imageId);

    people.push({
      id: Math.random().toString(36).substring(2, 9),
      name: fullName,
      imageUrl: `https://picsum.photos/seed/${imageId}/400/400`,
    });
  }

  return people;
}
