import Navbar from '@/components/Navbar'
import ScrollStage from '@/components/ScrollStage'
import { CommunicationSection, ItSection, EnvironmentSection } from '@/components/Sections'
import ConnectionSection from '@/components/ConnectionSection'
import {
  HelpEnvironmentSection,
  ApplicationsSection,
  PositiveImpactsSection,
  ChallengesSection,
  FutureSection,
  TakeawaySection,
  ReferencesSection,
} from '@/components/AdditionalSections'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main id="top" className="relative min-h-screen bg-bg text-white">
      <Navbar />
      <ScrollStage />
      <CommunicationSection />
      <ItSection />
      <EnvironmentSection />
      <ConnectionSection />
      <HelpEnvironmentSection />
      <ApplicationsSection />
      <PositiveImpactsSection />
      <ChallengesSection />
      <FutureSection />
      <TakeawaySection />
      <ReferencesSection />
      <Footer />
    </main>
  )
}
