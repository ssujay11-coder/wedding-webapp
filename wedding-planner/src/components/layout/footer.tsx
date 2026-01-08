import Link from 'next/link'
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'
import { Logo } from './logo'

export function Footer() {
  const destinations = [
    { name: 'Goa', href: '/destinations/goa' },
    { name: 'Udaipur', href: '/destinations/udaipur' },
    { name: 'Jaipur', href: '/destinations/jaipur' },
    { name: 'Jodhpur', href: '/destinations/jodhpur' },
    { name: 'Dubai', href: '/destinations/dubai' },
    { name: 'View All', href: '/destinations' },
  ]

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Pricing', href: '/pricing' },
  ]

  const services = [
    { name: 'Full-Service Planning', href: '/services/full-service' },
    { name: 'Destination Management', href: '/services/destination' },
    { name: 'Design & Styling', href: '/services/design' },
    { name: 'Day-Of Coordination', href: '/services/day-of' },
  ]

  return (
    <footer className="bg-[#221015] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Logo variant="light" size="md" />
            <p className="text-white/70 text-sm leading-relaxed">
              Curating timeless love stories since 2011. 200+ weddings, 14 years of excellence,
              creating unforgettable moments across India and beyond.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/eliteweddingplanner"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/eliteweddingplanner"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-6 text-secondary">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-secondary transition-colors text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-secondary transition-all mr-0 group-hover:mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Destinations */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-6 text-secondary">Top Destinations</h3>
            <ul className="space-y-3">
              {destinations.map((dest) => (
                <li key={dest.name}>
                  <Link
                    href={dest.href}
                    className="text-white/70 hover:text-secondary transition-colors text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-secondary transition-all mr-0 group-hover:mr-2" />
                    {dest.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-6 text-secondary">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70 text-sm">
                <Phone className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+918169255519" className="hover:text-secondary transition-colors">
                    +91-8169255519
                  </a>
                  <p className="text-xs text-white/50 mt-1">Mon-Sun, 9 AM - 5 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-white/70 text-sm">
                <Mail className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <a href="mailto:sales@eliteweddingplanner.in" className="hover:text-secondary transition-colors break-all">
                  sales@eliteweddingplanner.in
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p>Mumbai HQ</p>
                  <p className="text-xs text-white/50 mt-1">Offices in Goa, Udaipur, Jaipur, Jodhpur</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>© {new Date().getFullYear()} Elite Wedding Planner. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-secondary transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap.xml" className="hover:text-secondary transition-colors">
                Sitemap
              </Link>
              <Link href="/login" className="hover:text-secondary transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
