import { ArrowDown, ArrowUpRight, Github, Linkedin, MapPin } from 'lucide-react';
import { personal } from '../../data/portfolioData';
import Reveal from '../../components/Reveal';

export default function ProfileIntro() {
  return (
    <section
      id="about"
      className="profile-section section-container"
      aria-labelledby="profile-title"
    >
      <div className="section-label">
        <span>01 / THE PERSON BEHIND THE PROJECTS</span>
        <span>
          <MapPin size={12} /> {personal.location.toUpperCase()}
        </span>
      </div>
      <div className="profile-layout">
        <Reveal className="profile-heading">
          <span className="eyebrow">HI, I’M SAAD ABS.</span>
          <h2 id="profile-title">
            An engineer.
            <br />
            <em>A curious human.</em>
            <br />
            Still becoming.
          </h2>
          <div className="profile-socials">
            <a href={personal.github} target="_blank" rel="noreferrer">
              <Github size={17} /> GitHub <ArrowUpRight size={14} />
            </a>
            <a href={personal.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} />
            </a>
          </div>
        </Reveal>
        <Reveal className="profile-story">
          <p className="profile-lead">
            I’m a final-year engineering student at ENSA Al Hoceima, studying Digital Transformation
            & Artificial Intelligence.
          </p>
          <p>
            I like working across the whole problem: understanding the data, building the model or
            backend, and turning it into something someone can use.
          </p>
          <p>
            That’s led me to Arabic text recognition, job-matching systems, and an employee learning
            platform during my internship at Maroc Modis. The projects are different, but each has
            taught me how to connect the pieces.
          </p>
          <dl className="profile-facts">
            <div>
              <dt>CURRENT CHAPTER</dt>
              <dd>Looking for a PFE internship</dd>
            </div>
            <div>
              <dt>EXPECTED GRADUATION</dt>
              <dd>September 2027</dd>
            </div>
            <div>
              <dt>MY FOCUS</dt>
              <dd>AI · Data · Software</dd>
            </div>
            <div>
              <dt>LET’S TALK IN</dt>
              <dd>Arabic · English C1 · French B2</dd>
            </div>
          </dl>
          <a href="#experience" className="text-link">
            Follow my journey <ArrowDown size={15} />
          </a>
        </Reveal>
      </div>
      <div className="profile-note">
        <span className="status-dot" />
        <p>
          Looking for a team where I can contribute, learn, and turn a real engineering problem into
          my final-year project.
        </p>
        <a href="#contact">
          Let’s connect <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
