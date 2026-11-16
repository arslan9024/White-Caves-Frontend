import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Bot, Layers, MessageCircle, ShieldCheck } from 'lucide-react';
import { cleanupHomepageHeroPreload, ensureHomepageHeroPreload } from './homePagePreload';
import './HomePage.css';

const DEPARTMENT_FLOORS = [
  { floor: 1, name: 'Luxury Sales', path: '/crm/floor/1' },
  { floor: 2, name: 'Strategic Offplan', path: '/crm/floor/2' },
  { floor: 3, name: 'Commercial Investment', path: '/crm/floor/3' },
  { floor: 4, name: 'Residential Leasing', path: '/crm/floor/4' },
  { floor: 5, name: 'Asset & Facilities', path: '/crm/floor/5' },
  { floor: 6, name: 'Revenue & Finance', path: '/crm/floor/6' },
  { floor: 7, name: 'Performance Marketing', path: '/crm/floor/7' },
  { floor: 8, name: 'Client Experience', path: '/crm/floor/8' },
  { floor: 9, name: 'Corporate Governance', path: '/crm/floor/9' },
  { floor: 10, name: 'RERA Compliance', path: '/crm/floor/10' },
  { floor: 11, name: 'Conveyancing & Transactions', path: '/crm/floor/11' },
  { floor: 12, name: 'Market Intelligence', path: '/crm/floor/12' },
] as const;

const HomePage: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    ensureHomepageHeroPreload();
    return () => {
      cleanupHomepageHeroPreload();
    };
  }, []);

  return (
    <main className="crm-command-center" data-testid="crm-command-center">
      <header className="crm-command-center__header">
        <div className="crm-command-center__brand">
          <Building2 size={28} />
          <div>
            <h1>White Caves CRM Command Center</h1>
            <p>Authenticated Enterprise Operations • Department Floors 1–12 &amp; AIAMS</p>
          </div>
        </div>
        <div className="crm-command-center__actions">
          <button type="button" onClick={() => navigate('/aiams')}>
            <Bot size={18} />
            <span>AIAMS Workforce</span>
          </button>
          <button type="button" onClick={() => navigate('/sourcing/linda')}>
            <MessageCircle size={18} />
            <span>Linda WhatsApp Sync</span>
          </button>
          <button type="button" onClick={() => navigate('/login')}>
            <ShieldCheck size={18} />
            <span>Operator Sign-In</span>
          </button>
        </div>
      </header>

      <section aria-label="Department Floors 1 to 12" className="crm-command-center__floors">
        <h2>
          <Layers size={20} />
          <span>Department Floors (1–12)</span>
        </h2>
        <div className="crm-command-center__grid">
          {DEPARTMENT_FLOORS.map(dept => (
            <button
              key={dept.floor}
              type="button"
              className="crm-floor-card"
              onClick={() => navigate(dept.path)}
            >
              <span className="crm-floor-card__num">Floor {dept.floor}</span>
              <span className="crm-floor-card__name">{dept.name}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;

