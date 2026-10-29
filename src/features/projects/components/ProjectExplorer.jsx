import { useState } from 'react';
import { ArrowUpRight, Bookmark, Search, Shuffle, X } from 'lucide-react';
import { projects, filters } from '../../../data/portfolioData';

export default function ProjectExplorer({ saved, toggleSave, onOpen }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All work');
  const [onlySaved, setOnlySaved] = useState(false);
  const [compare, setCompare] = useState(false);
  const [message, setMessage] = useState('');
  const selected = projects.filter((p) => saved.includes(p.id));
  const visible = projects.filter(
    (p) =>
      (filter === 'All work' || p.categories.includes(filter)) &&
      (!onlySaved || saved.includes(p.id)) &&
      [p.title, p.description, ...p.stack, ...p.categories]
        .join(' ')
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  function surprise() {
    if (!visible.length) return;
    onOpen(visible[Math.floor(Math.random() * visible.length)]);
  }
  async function copyList() {
    try {
      const text = selected
        .map((p) => `${p.title}\n${p.description}\n${window.location.origin}/?project=${p.id}`)
        .join('\n\n');
      await navigator.clipboard.writeText(text);
      setMessage('Shortlist copied — ready to share.');
    } catch {
      setMessage('Copy is unavailable in this browser. Open a project to use its source link.');
    }
  }
  return (
    <div className="project-explorer">
      <div className="explorer-intro">
        <span className="eyebrow">FOLLOW YOUR CURIOSITY</span>
        <p>Find a technology. Pick a discipline. Keep what catches your eye.</p>
      </div>
      <div className="explorer-tools">
        <label className="project-search">
          <Search size={18} />
          <span className="sr-only">Search projects</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try Python, cloud, learning…"
            type="search"
          />
        </label>
        <button className="surprise-button" onClick={surprise} disabled={!visible.length}>
          <Shuffle size={16} /> Surprise me
        </button>
      </div>
      <div className="project-filters">
        {filters.map((f) => (
          <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
        <button aria-pressed={onlySaved} onClick={() => setOnlySaved(!onlySaved)}>
          Saved ({saved.length})
        </button>
        <span role="status">{visible.length} PROJECTS</span>
      </div>
      {saved.length > 0 && (
        <div className="shortlist-bar">
          <span>
            <Bookmark size={16} /> {saved.length} saved on this device
          </span>
          <button
            onClick={() => setCompare(!compare)}
            aria-expanded={compare}
            aria-controls="project-comparison"
          >
            {compare ? 'Close comparison' : 'Compare saved projects'}
          </button>
          <button onClick={copyList}>Copy shortlist ↗</button>
        </div>
      )}
      {compare && saved.length > 0 && (
        <div id="project-comparison" className="project-comparison">
          <div className="comparison-grid">
            {selected.map((p) => (
              <article key={p.id}>
                <button
                  className="comparison-remove"
                  aria-label={`Remove ${p.title} from shortlist`}
                  onClick={() => toggleSave(p.id)}
                >
                  <X size={16} />
                </button>
                <span className="eyebrow">{p.role}</span>
                <h4>{p.title}</h4>
                <p>{p.description}</p>
                <div className="tag-list">
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <button className="text-link" onClick={() => onOpen(p)}>
                  Explore project <ArrowUpRight size={15} />
                </button>
              </article>
            ))}
          </div>
        </div>
      )}
      <p className="explorer-message" role="status">
        {message}
      </p>
      <div className="index-list">
        {visible.map((p, i) => (
          <div className="index-entry" key={p.id}>
            <button className="index-row" onClick={() => onOpen(p)} aria-label={`Read ${p.title}`}>
              <span className="index-number">{String(i + 1).padStart(2, '0')}</span>
              <span className="index-name">
                {p.title}
                <small>{p.subtitle}</small>
              </span>
              <span className="index-category">{p.categories.join(' / ')}</span>
              <ArrowUpRight size={24} />
            </button>
            <button
              className="save-project"
              aria-label={`${saved.includes(p.id) ? 'Unsave' : 'Save'} ${p.title}`}
              aria-pressed={saved.includes(p.id)}
              onClick={() => toggleSave(p.id)}
            >
              <Bookmark size={18} fill={saved.includes(p.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
        ))}
      </div>
      {!visible.length && (
        <div className="explorer-empty">
          <span>Nothing here yet.</span>
          <p>
            {onlySaved
              ? 'Save a project using its bookmark to build your own collection.'
              : 'Try another skill or clear your filters to find a new direction.'}
          </p>
          <button
            className="text-link"
            onClick={() => {
              setQuery('');
              setFilter('All work');
              setOnlySaved(false);
            }}
          >
            Show every project ↗
          </button>
        </div>
      )}
    </div>
  );
}
