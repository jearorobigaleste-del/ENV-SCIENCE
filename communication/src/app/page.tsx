import Navbar from '@/components/Navbar'
import ScrollStage from '@/components/ScrollStage'
import { CommunicationSection, ItSection, EnvironmentSection } from '@/components/Sections'
import ConnectionSection from '@/components/ConnectionSection'
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
      <Footer />
    </main>
  )
}
