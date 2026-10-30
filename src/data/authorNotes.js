export const authorNotes = [
  "I enjoy writing backend code.",
  "Laravel is my favorite framework.",
  "I love building APIs.",
  "I'm always learning something new.",
  "I enjoy working with databases.",
  "React makes frontend fun for me.",
  "I like solving coding problems.",
  "Clean code matters to me.",
  "I enjoy building real-world projects.",
  "Coding is a continuous learning journey.",
];

export const getRandomAuthorNote = (currentNote = null) => {
  const availableNotes = authorNotes.filter((note) => note !== currentNote);

  const notes = availableNotes.length ? availableNotes : authorNotes;

  return notes[Math.floor(Math.random() * notes.length)];
};
