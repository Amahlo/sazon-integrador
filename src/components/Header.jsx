import { useEffect } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import Breadcrumb from './Breadcrumb'
import Toast from './Toast'
import ThemeToggle from './ThemeToggle'
import Footer from './Footer'
import DashboardView from './DashboardView'

function Header({ children }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (typeof window.initGlobals === 'function') {
        window.initGlobals()
      } else if (typeof window.syncHeaderSession === 'function') {
        window.syncHeaderSession()
      }
    }
  }, [])

  return (
    <>
      <Sidebar />
      <TopBar />
      <Breadcrumb />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {children || <DashboardView />}
      </main>

      <Toast />
      <ThemeToggle />
      <Footer />
    </>
  )
}

export default Header
