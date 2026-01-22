import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Communion } from './components/Communion';
import { Observatory } from './components/Observatory';
import { Archives } from './components/Archives';
import { Personas } from './components/Personas';
import { Blueprint } from './components/Blueprint';
import { Rooms } from './components/Rooms';
import { Timeline } from './components/Timeline';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { AuthOverlay } from './components/AuthOverlay';
import { ObservatoryDashboard } from './components/ObservatoryDashboard';
import { TodayGuidance } from './components/TodayGuidance';
import { ArchivesLibrary } from './components/ArchivesLibrary';
import { ReportDetail } from './components/ReportDetail';
import { ReportReader } from './components/ReportReader';
import { GuidesDirectory } from './components/GuidesDirectory';
import { GuidesChat } from './components/GuidesChat';
import { GuideDetail } from './components/GuideDetail';
import { PathNotes } from './components/PathNotes';
import { Corridor } from './components/Corridor';
import { CorridorProfile } from './components/CorridorProfile';
import { CorridorBlueprint } from './components/CorridorBlueprint';
import { CorridorMatches } from './components/CorridorMatches';
import { CorridorMatchDetail } from './components/CorridorMatchDetail';
import { CorridorChat } from './components/CorridorChat';
import { CorridorShortlist } from './components/CorridorShortlist';
import { CorridorSettings } from './components/CorridorSettings';
import { AccountSettings } from './components/AccountSettings';
import { CycleTimeline } from './components/CycleTimeline';
import { TransitsDashboard } from './components/TransitsDashboard';
import { ArchivesHistory } from './components/ArchivesHistory';
import { ArchivesHighlights } from './components/ArchivesHighlights';
import { PricingPage } from './components/PricingPage';
import { Manifesto } from './components/Manifesto';
import { ContactSupport } from './components/ContactSupport';
import { FAQPage } from './components/FAQPage';
import { SystemStatus } from './components/SystemStatus';
import { AnimatePresence } from 'framer-motion';

type ViewState = 'landing' | 'observatory' | 'today' | 'archives' | 'report-detail' | 'report-reader' | 'guides' | 'guides-chat' | 'guide-detail' | 'path-notes' | 'corridor' | 'corridor-profile' | 'corridor-blueprint' | 'corridor-matches' | 'corridor-match-detail' | 'corridor-chat' | 'corridor-shortlist' | 'corridor-settings' | 'account' | 'cycle' | 'transits' | 'archives-history' | 'archives-highlights' | 'pricing' | 'manifesto' | 'contact' | 'faq' | 'status';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);

  const openSignIn = () => {
    setAuthMode('signin');
    setIsAuthOpen(true);
  };

  const openSignUp = () => {
    setAuthMode('signup');
    setIsAuthOpen(true);
  };

  const handleLoginSuccess = () => {
      setIsLoggedIn(true);
      setCurrentView('observatory');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
      setIsLoggedIn(false);
      setCurrentView('landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: ViewState, data?: any) => {
      if (data?.guideId) {
          setSelectedGuideId(data.guideId);
      }
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-ink selection:text-paper">
      {/* Hide standard navigation in the immersive profile creation flow */}
      {currentView !== 'corridor-profile' && (
        <Navigation 
          onSignInClick={openSignIn} 
          onSignUpClick={openSignUp} 
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          currentView={currentView}
          onNavigate={handleNavigate}
        />
      )}
      
      <main>
        {currentView === 'landing' ? (
            <>
                <Hero />
                <Communion />
                <Observatory />
                <Archives />
                <Personas />
                <Blueprint />
                <Rooms />
                <Timeline />
                <Pricing />
            </>
        ) : currentView === 'observatory' ? (
            <ObservatoryDashboard onNavigate={handleNavigate} />
        ) : currentView === 'today' ? (
            <TodayGuidance onBack={() => handleNavigate('observatory')} />
        ) : currentView === 'archives' ? (
            <ArchivesLibrary onNavigate={handleNavigate} />
        ) : currentView === 'report-detail' ? (
            <ReportDetail 
                onBack={() => handleNavigate('archives')} 
                onNavigate={handleNavigate}
            />
        ) : currentView === 'report-reader' ? (
            <ReportReader onBack={() => handleNavigate('report-detail')} />
        ) : currentView === 'guides' ? (
            <GuidesDirectory onNavigate={handleNavigate} />
        ) : currentView === 'guide-detail' ? (
            <GuideDetail 
                guideId={selectedGuideId} 
                onNavigate={handleNavigate} 
                onBack={() => handleNavigate('guides')} 
            />
        ) : currentView === 'guides-chat' ? (
            <GuidesChat onNavigate={handleNavigate} onBack={() => handleNavigate('guides')} />
        ) : currentView === 'path-notes' ? (
            <PathNotes onNavigate={handleNavigate} />
        ) : currentView === 'corridor' ? (
            <Corridor onNavigate={handleNavigate} />
        ) : currentView === 'corridor-profile' ? (
            <CorridorProfile onNavigate={handleNavigate} onBack={() => handleNavigate('corridor')} />
        ) : currentView === 'corridor-blueprint' ? (
            <CorridorBlueprint onNavigate={handleNavigate} />
        ) : currentView === 'corridor-matches' ? (
            <CorridorMatches onNavigate={handleNavigate} />
        ) : currentView === 'corridor-match-detail' ? (
            <CorridorMatchDetail onNavigate={handleNavigate} onBack={() => handleNavigate('corridor-matches')} />
        ) : currentView === 'corridor-chat' ? (
            <CorridorChat onNavigate={handleNavigate} onBack={() => handleNavigate('corridor-matches')} />
        ) : currentView === 'corridor-shortlist' ? (
            <CorridorShortlist onNavigate={handleNavigate} onBack={() => handleNavigate('corridor-matches')} />
        ) : currentView === 'corridor-settings' ? (
            <CorridorSettings onNavigate={handleNavigate} onBack={() => handleNavigate('corridor-matches')} />
        ) : currentView === 'account' ? (
            <AccountSettings onNavigate={handleNavigate} onLogout={handleLogout} />
        ) : currentView === 'cycle' ? (
            <CycleTimeline onNavigate={handleNavigate} onBack={() => handleNavigate('observatory')} />
        ) : currentView === 'transits' ? (
            <TransitsDashboard onNavigate={handleNavigate} onBack={() => handleNavigate('observatory')} />
        ) : currentView === 'archives-history' ? (
            <ArchivesHistory onNavigate={handleNavigate} onBack={() => handleNavigate('archives')} />
        ) : currentView === 'archives-highlights' ? (
            <ArchivesHighlights onNavigate={handleNavigate} onBack={() => handleNavigate('archives')} />
        ) : currentView === 'pricing' ? (
            <PricingPage onNavigate={handleNavigate} />
        ) : currentView === 'manifesto' ? (
            <Manifesto onNavigate={handleNavigate} />
        ) : currentView === 'contact' ? (
            <ContactSupport onNavigate={handleNavigate} onBack={() => handleNavigate('landing')} />
        ) : currentView === 'faq' ? (
            <FAQPage onNavigate={handleNavigate} onBack={() => handleNavigate('landing')} />
        ) : currentView === 'status' ? (
            <SystemStatus onNavigate={handleNavigate} onBack={() => handleNavigate('landing')} />
        ) : null}
      </main>
      
      {currentView !== 'corridor-profile' && <Footer onNavigate={handleNavigate} />}

      <AnimatePresence>
        {isAuthOpen && (
            <AuthOverlay 
                isOpen={isAuthOpen} 
                onClose={() => setIsAuthOpen(false)} 
                defaultMode={authMode}
                onLoginSuccess={handleLoginSuccess}
            />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;