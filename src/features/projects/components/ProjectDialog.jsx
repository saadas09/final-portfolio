import { lazy, Suspense } from 'react';
const ProjectDialogContent = lazy(() => import('./ProjectDialogContent'));
export default function ProjectDialog(props) {
  if (!props.project) return null;
  return (
    <Suspense
      fallback={
        <div className="project-loading">
          <span role="status">Opening project…</span>
          <button onClick={props.onClose}>Cancel</button>
        </div>
      }
    >
      <ProjectDialogContent {...props} />
    </Suspense>
  );
}
