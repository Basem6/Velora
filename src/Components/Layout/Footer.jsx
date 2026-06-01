export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#0D0D0D' }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex flex-col md:flex-row justify-between gap-12">
            <div className="max-w-sm">
                <h2 className="text-2xl font-bold" style={{ color: '#C8A882', fontFamily: "'Playfair Display', serif" }}>VELORA</h2>
                <p className="mt-4 leading-relaxed" style={{ color: 'rgba(200,168,130,0.8)' }}>
                Elevating everyday life through premium crafted products and modern design.
                </p>
                <div className="flex gap-3 mt-6">
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                <div>
                <h4 className="font-semibold mb-4" style={{ color: '#C8A882' }}>Shop</h4>
                <ul className="space-y-2" style={{ color: 'rgba(200,168,130,0.8)' }}>
                    <li><a className="hover:text-white transition" href="#">All Products</a></li>
                    <li><a className="hover:text-white transition" href="#">New Arrivals</a></li>
                    <li><a className="hover:text-white transition" href="#">Best Sellers</a></li>
                    <li><a className="hover:text-white transition" href="#">Sale</a></li>
                </ul>
                </div>
                <div>
                <h4 className="font-semibold mb-4" style={{ color: '#C8A882' }}>Support</h4>
                <ul className="space-y-2" style={{ color: 'rgba(200,168,130,0.8)' }}>
                    <li><a className="hover:text-white transition" href="#">Shipping & Returns</a></li>
                    <li><a className="hover:text-white transition" href="#">Contact Us</a></li>
                    <li><a className="hover:text-white transition" href="#">FAQs</a></li>
                    <li><a className="hover:text-white transition" href="#">Size Guide</a></li>
                </ul>
                </div>
                <div>
                <h4 className="font-semibold mb-4" style={{ color: '#C8A882' }}>Legal</h4>
                    <ul className="space-y-2" style={{ color: 'rgba(200,168,130,0.8)' }}>
                    <li><a className="hover:text-white transition" href="#">Privacy Policy</a></li>
                    <li><a className="hover:text-white transition" href="#">Terms of Service</a></li>
                    <li><a className="hover:text-white transition" href="#">Cookie Policy</a></li>
                </ul>
                </div>
            </div>
            </div>
            <div className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(200,168,130,0.2)' }}>
            <p className="text-sm text-center md:text-left" style={{ color: 'rgba(200,168,130,0.6)' }}>
                © 2024 VELORA Premium E-commerce. All rights reserved.
            </p>
            <div className="flex gap-4 text-xl" style={{ color: 'rgba(200,168,130,0.6)' }}>
            </div>
            </div>
        </div>
        </footer>
    );
}