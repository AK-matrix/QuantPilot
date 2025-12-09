import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo Area */}
                <Link to="/" className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-orange-700 rounded-lg shadow-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                        <span className="font-serif text-white text-lg font-bold italic">Q</span>
                    </div>
                    <span className="font-serif text-xl text-white tracking-tight group-hover:text-primary transition-colors">QuantPilot</span>
                </Link>

                {/* Links */}
                <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-secondary/80">
                    <Link to="/" className="hover:text-white transition-colors">Research</Link>
                    <Link to="/methodology" className="hover:text-white transition-colors">Methodology</Link>
                    <Link to="/api" className="hover:text-white transition-colors">API</Link>
                    <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all">Sign In</button>
                </div>

                {/* Mobile Menu Icon (Placeholder) */}
                <div className="md:hidden text-white/50 cursor-pointer hover:text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                </div>
            </div>
        </nav>
    );
}
