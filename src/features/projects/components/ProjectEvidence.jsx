import ProjectVisual from './ProjectVisual';
const descriptions = {
  findurway: 'FindUrWay interface concept showing skills matched to relevant jobs.',
  lms: 'Learning platform interface concept with courses, lessons and certificates.',
  darija: 'OCR interface concept showing an Arabic input image beside recognized text.',
  rag: 'Document assistant interface concept connecting an answer to source passages.',
};
export default function ProjectEvidence({ project }) {
  return descriptions[project.id] ? (
    <div className="generated-cover">
      <img
        src={`/projects/art/${project.id}-product.webp`}
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
