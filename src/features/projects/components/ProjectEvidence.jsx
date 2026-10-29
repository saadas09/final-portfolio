import ProjectVisual from './ProjectVisual';
const descriptions = {
  findurway: 'A luminous path threads through a sculptural labyrinth toward opportunity.',
  lms: 'Lavender book pages form a rising staircase of learning.',
  darija: 'Abstract Arabic-inspired ceramic forms become a constellation of data.',
  rag: 'Glass pages connect through silver threads to a luminous answer.',
};
export default function ProjectEvidence({ project }) {
  return descriptions[project.id] ? (
    <div className="generated-cover">
      <img
        src={`/projects/art/${project.id}.webp`}
        alt={descriptions[project.id]}
        width="1536"
        height="1024"
        loading="lazy"
        decoding="async"
      />
    </div>
  ) : (
    <ProjectVisual kind={project.visual} />
  );
}
