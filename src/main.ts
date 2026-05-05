import './style.css'
import projectsData from './data/projects.json'
import operatorHero from './assets/operator.webp'
import face1 from './assets/face-1.webp'
import face2 from './assets/face-2.webp'
import face3 from './assets/face-3.webp'

type LinkType = 'github' | 'download' | 'external';

interface Project {
  name: string;
  problem: string;
  accent: string;
  tech: string[];
  links: { label: string; url: string; type: LinkType }[];
}

const projects: Project[] = projectsData as Project[];
const faces = [operatorHero, face1, face2, face3];

// --- Utilities ---
const getIcon = (type: LinkType) => {
  switch (type) {
    case 'github':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`;
    case 'download':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
    default:
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
  }
}

const getHologram = (accent: string) => `
<div class="screenshot-placeholder" style="--card-glow: ${accent}22">
  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="${accent}" stroke-width="0.5" opacity="0.3"/>
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#grid)" />
    <circle cx="50" cy="50" r="20" fill="none" stroke="${accent}" stroke-width="0.5" opacity="0.5" />
    <path d="M 0 0 L 100 100 M 100 0 L 0 100" stroke="${accent}" stroke-width="0.2" opacity="0.2" />
  </svg>
</div>`;

// --- Rendering ---
const renderProjects = (filteredProjects = projects) => {
  const grid = document.getElementById('project-grid');
  if (!grid) return;

  grid.innerHTML = filteredProjects.map(project => `
    <div class="project-card" style="--card-accent: ${project.accent}; --card-glow: ${project.accent}15;">
      <div class="card-top">
        <div class="project-name">${project.name}</div>
      </div>
      <p class="project-problem">${project.problem}</p>
      <div class="project-screenshot">
        ${getHologram(project.accent)}
      </div>
      <div class="tech-stack">
        ${project.tech.map(t => `<span class="tech-badge" title="Built with ${t}">${t}</span>`).join('')}
      </div>
      <div class="card-links">
        ${project.links.map(link => `
          <a href="${link.url}" target="_blank" rel="noopener">
            ${getIcon(link.type)}
            ${link.label}
          </a>
        `).join('')}
      </div>
    </div>
  `).join('');

  setupInteractions();
}

// --- Interactions ---
const setupInteractions = () => {
  const cards = document.querySelectorAll('.project-card');
  
  // Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).style.transitionDelay = `${i * 0.05}s`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    observer.observe(card);
    
    // Mouse Glow Tracking
    card.addEventListener('mousemove', (e: any) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}%`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}%`);
    });
  });
}

const setupHero = () => {
  const heroLogo = document.querySelector('.hero-logo') as HTMLImageElement;
  if (!heroLogo) return;

  const randomFace = faces[Math.floor(Math.random() * faces.length)];
  heroLogo.src = randomFace;

  let glitchInterval: number | undefined;

  heroLogo.addEventListener('mouseenter', () => {
    if (glitchInterval) clearInterval(glitchInterval);
    let count = 0;
    glitchInterval = setInterval(() => {
      heroLogo.src = faces[Math.floor(Math.random() * faces.length)];
      count++;
      if (count > 6) {
        clearInterval(glitchInterval);
        heroLogo.src = randomFace;
      }
    }, 60) as unknown as number;
  });

  // Decrypt Effect
  const title = document.getElementById('hero-title');
  if (title) {
    const originalText = title.innerHTML;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*$@0123456789";
    let iteration = 0;
    
    const decrypt = setInterval(() => {
      title.innerText = title.innerText.split("").map((_, index) => {
        if(index < iteration) return originalText.replace(/<\/?[^>]+(>|$)/g, "")[index];
        return letters[Math.floor(Math.random() * 42)];
      }).join("");
      
      if(iteration >= originalText.length) clearInterval(decrypt);
      iteration += 1 / 3;
    }, 30);
  }
}

const setupMagnetic = () => {
  const magneticElements = document.querySelectorAll('.logo-mark, .hero-cta a');
  
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e: any) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      (el as HTMLElement).style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    el.addEventListener('mouseleave', () => {
      (el as HTMLElement).style.transform = `translate(0px, 0px)`;
    });
  });
}

// --- Command Palette ---
const setupCommandPalette = () => {
  const cp = document.getElementById('command-palette');
  const input = document.getElementById('cp-input') as HTMLInputElement;
  const results = document.getElementById('cp-results');

  const openCP = () => {
    cp?.classList.add('active');
    setTimeout(() => input?.focus(), 50);
  }

  const closeCP = () => {
    cp?.classList.remove('active');
    input.value = '';
    renderCPResults('');
  }

  const renderCPResults = (query: string) => {
    if (!results) return;
    if (!query) {
      results.innerHTML = '';
      return;
    }

    const filtered = projects.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.tech.some(t => t.toLowerCase().includes(query.toLowerCase()))
    );

    results.innerHTML = filtered.map(p => `
      <div class="cp-item" data-name="${p.name}">
        <span class="cp-item-name">${p.name}</span>
        <span class="cp-item-tech">${p.tech.slice(0, 3).join(', ')}</span>
      </div>
    `).join('');

    document.querySelectorAll('.cp-item').forEach(item => {
      item.addEventListener('click', () => {
        const name = item.getAttribute('data-name');
        const target = Array.from(document.querySelectorAll('.project-name')).find(el => el.textContent === name);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          closeCP();
        }
      });
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && !cp?.classList.contains('active')) {
      e.preventDefault();
      openCP();
    }
    if (e.key === 'Escape') closeCP();
  });

  cp?.addEventListener('click', (e) => {
    if (e.target === cp) closeCP();
  });

  input?.addEventListener('input', (e) => {
    renderCPResults((e.target as HTMLInputElement).value);
  });
}

const setupSEO = () => {
  const script = document.getElementById('ld-json');
  if (!script) return;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": projects.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": p.name,
        "description": p.problem,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Windows, Web, Multi"
      }
    }))
  };

  script.textContent = JSON.stringify(schema);
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  setupHero();
  setupMagnetic();
  setupCommandPalette();
  setupSEO();
});

