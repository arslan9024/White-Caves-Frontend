import React, { FC, useState } from 'react';
import PageMeta from '../../components/seo/PageMeta';
import { WAVES } from './goalsGallery/goalsGalleryData';
import {
  Hero,
  HeroSubtitle,
  HeroTitle,
  Page,
  StatPill,
  StatsRow,
  Tab,
  TabBar,
} from './goalsGallery/goalsGalleryStyles';
import { WaveSectionsPrimary } from './goalsGallery/WaveSectionsPrimary';
import { WaveSectionsSecondary } from './goalsGallery/WaveSectionsSecondary';

export const GoalsGalleryPage: FC = () => {
  const [activeWave, setActiveWave] = useState('All');

  const showWave = (wave: string) => activeWave === 'All' || activeWave === wave;

  return (
    <div data-testid="goals-gallery-page">
      <PageMeta
        title="White Caves — Goals Gallery | AEGIS 100-Goal Sovereign Showcase"
        description="Explore all AEGIS-implemented components for White Caves Real Estate LLC — VR tours, analytics, VIP concierge, finance, conveyancing, IoT facilities, and commercial suite."
      />
      <Page>
        <Hero>
          <HeroTitle>
            <span>100</span> Goals Sovereign Showcase
          </HeroTitle>
          <HeroSubtitle>
            AEGIS V3 Sovereign OS — All implemented goals across 10 strategic waves (Waves 46–55) of
            the White Caves Real Estate platform.
          </HeroSubtitle>
          <StatsRow>
            <StatPill>✅ 100% Backlog Delivered</StatPill>
            <StatPill>🌊 10 Strategic Waves Active</StatPill>
            <StatPill>🤖 AEGIS V3 Enterprise Engine</StatPill>
            <StatPill>🏆 Dubai DLD & RERA Aligned</StatPill>
          </StatsRow>
        </Hero>

        <TabBar>
          {WAVES.map(w => (
            <Tab key={w} $active={w === activeWave} onClick={() => setActiveWave(w)}>
              {w}
            </Tab>
          ))}
        </TabBar>

        <WaveSectionsPrimary showWave={showWave} />
        <WaveSectionsSecondary showWave={showWave} />
      </Page>
    </div>
  );
};

export default GoalsGalleryPage;
