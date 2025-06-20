import React, { useState, useEffect } from 'react';

// --- Mock Data ---
const INITIAL_BUSINESSES = [
  {
    id: '1',
    name: 'Café y Pan "El Mirador"',
    category: 'Restaurantes y Cafeterías',
    logo: 'https://placehold.co/100x100/EAD9C8/8C6D52?text=Café',
    image: 'https://placehold.co/600x400/A9B4C2/FFFFFF?text=Imagen+del+Café',
    description: 'El mejor café de la región con una vista espectacular. Disfruta de nuestros postres caseros.',
    phone: '2441234567',
    rating: 4.5,
    reviews: [
        { id: 'r1', author: 'Ana Pérez', comment: '¡El café es delicioso y la vista increíble! Súper recomendado.', stars: 5 },
        { id: 'r2', author: 'Carlos Gómez', comment: 'Buen lugar para pasar la tarde. El pan de elote es un must.', stars: 4 },
    ],
    tags: ['café', 'postres', 'vista panorámica', 'panadería'],
    offer: '2x1 en rebanadas de pastel los martes',
    products: [
        {id: 'p1', name: 'Rebanada de Pastel de Chocolate', price: '60.00', stock: 15, image: 'https://placehold.co/300x200/5C3D2E/FFFFFF?text=Pastel'},
        {id: 'p2', name: 'Café Americano', price: '35.00', stock: 100, image: 'https://placehold.co/300x200/A9B4C2/FFFFFF?text=Café'}
    ],
    verified: true,
    location: { top: '30%', left: '40%' },
    stats: { views: 2540, favorites: 180 },
    gallery: [
        'https://placehold.co/600x400/BFB2A7/FFFFFF?text=Interior+1',
        'https://placehold.co/600x400/8C7A6B/FFFFFF?text=Terraza',
        'https://placehold.co/600x400/EAD9C8/FFFFFF?text=Postre+del+día',
    ],
    schedule: { 'lun-vie': '9:00-21:00', 'sab': '10:00-22:00', 'dom': 'Cerrado' },
    serviceType: 'product' // product, appointment, quote
  },
  {
    id: '2',
    name: 'Artesanías "Manos de Atlixco"',
    category: 'Tiendas y Artesanías',
    logo: 'https://placehold.co/100x100/D4E4BC/7A9D54?text=Artesanías',
    image: 'https://placehold.co/600x400/F5E8DD/AC87C5?text=Talavera',
    description: 'Talavera, textiles y más. Apoya a los artesanos locales y llévate un recuerdo único.',
    phone: '2447654321',
    rating: 5,
    reviews: [
        { id: 'r3', author: 'Laura Méndez', comment: 'Encontré piezas únicas y a muy buen precio. La atención fue excelente.', stars: 5 }
    ],
    tags: ['talavera', 'recuerdos', 'textiles', 'barro'],
    offer: null,
    products: [],
    verified: false,
    location: { top: '55%', left: '60%' },
    stats: { views: 1890, favorites: 95 },
    gallery: [],
    schedule: { 'lun-dom': '10:00-19:00' },
    serviceType: 'product'
  },
  {
    id: '3',
    name: 'Vivero "La Flor Eterna"',
    category: 'Hogar y Jardinería',
    logo: 'https://placehold.co/100x100/F9F3CC/E55604?text=Vivero',
    image: 'https://placehold.co/600x400/C3EDC0/748E63?text=Flores',
    description: 'Amplia variedad de plantas, flores y árboles para tu jardín. Expertos en Nochebuenas.',
    phone: '2441122334',
    rating: 4.8,
    reviews: [],
    tags: ['plantas', 'flores', 'jardín', 'nochebuena'],
    offer: '15% de descuento en árboles frutales',
    products: [
        {id: 'p3', name: 'Maceta de Nochebuena', price: '150.00', stock: 50, image: 'https://placehold.co/300x200/E55604/FFFFFF?text=Nochebuena'}
    ],
    verified: true,
    location: { top: '70%', left: '25%' },
    stats: { views: 3125, favorites: 250 },
    gallery: [
        'https://placehold.co/600x400/A3BE8C/FFFFFF?text=Invernadero',
        'https://placehold.co/600x400/EBCB8B/FFFFFF?text=Orquídeas',
    ],
    schedule: { 'lun-sab': '9:00-18:00', 'dom': '9:00-14:00' },
    serviceType: 'product'
  },
   {
    id: '4',
    name: 'Consultorio Dental Sonrisas',
    category: 'Salud y Bienestar',
    logo: 'https://placehold.co/100x100/A0D2DB/3A8891?text=Dental',
    image: 'https://placehold.co/600x400/BEEAF3/FFFFFF?text=Consultorio',
    description: 'Cuidamos tu salud dental con la mejor tecnología y un trato amable. Limpiezas, blanqueamientos y más.',
    phone: '2442233445',
    rating: 4.9,
    reviews: [],
    tags: ['dentista', 'salud', 'limpieza dental', 'ortodoncia'],
    offer: '20% de descuento en tu primera consulta.',
    products: [],
    verified: true,
    location: { top: '45%', left: '75%' },
    stats: { views: 1500, favorites: 120 },
    gallery: [],
    schedule: { 'lun-vie': '10:00-14:00', 'sab': '10:00-13:00', 'dom': 'Cerrado' },
    serviceType: 'appointment'
  },
];

const CATEGORIES = [
    "Restaurantes y Cafeterías",
    "Tiendas y Artesanías",
    "Hogar y Jardinería",
    "Hoteles y Hospedaje",
    "Salud y Bienestar",
    "Servicios Profesionales"
];

// --- Styles ---
const styles = {
  container: { fontFamily: "'Lato', sans-serif", backgroundColor: '#F8F9FA', color: '#343A40', minHeight: '100vh'},
  headerContainer: { padding: '20px' },
  headerTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '-10px'},
  backToRoleButton: { background: 'transparent', border: '1px solid #CED4DA', color: '#6C757D', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', padding: '5px 10px', borderRadius: '8px'},
  title: { fontSize: '36px', fontWeight: 'bold', color: '#212529', margin: '0', textAlign: 'center'},
  subtitle: { fontSize: '18px', color: '#6C757D', marginBottom: '30px', textAlign: 'center' },
  input: { height: '50px', padding: '0 20px', fontSize: '16px', color: '#343A40', backgroundColor: '#FFFFFF', border: '1px solid #CED4DA', width: '100%', boxSizing: 'border-box', borderRadius: '12px'},
  textarea: { minHeight: '100px', padding: '15px 20px', fontSize: '16px', color: '#343A40', backgroundColor: '#FFFFFF', border: '1px solid #CED4DA', width: '100%', boxSizing: 'border-box', borderRadius: '12px', fontFamily: 'inherit'},
  fileInputButton: { backgroundColor: '#F8F9FA', borderRadius: '12px', padding: '15px', textAlign: 'center', color: '#3B82F6', fontWeight: '600', cursor: 'pointer', border: '2px dashed #D1D5DB'},
  imagePreview: { width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover', marginTop: '10px', border: '1px solid #E5E7EB' },
  buttonGroup: { marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', maxWidth: '400px', margin: '20px auto' },
  primaryButton: { flex: 1, backgroundColor: '#3B82F6', borderRadius: '12px', padding: '15px', textAlign: 'center', color: '#FFFFFF', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', border: 'none', boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.39)'},
  secondaryButton: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '15px', textAlign: 'center', color: '#3B82F6', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', border: '1px solid #3B82F6'},
  listContainer: { padding: '0 20px 20px 20px' },
  card: { backgroundColor: '#FFFFFF', borderRadius: '16px', marginTop: '20px', display: 'flex', alignItems: 'center', padding: '15px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', cursor: 'pointer', position: 'relative' },
  cardLogo: { width: '60px', height: '60px', borderRadius: '12px', marginRight: '15px', objectFit: 'cover' },
  cardTextContainer: { flex: 1 },
  cardTitle: { fontSize: '20px', fontWeight: '600', color: '#111827', margin: 0, display: 'flex', alignItems: 'center' },
  cardCategory: { fontSize: '14px', color: '#6B7280', marginTop: '4px', margin: 0 },
  verifiedBadge: { backgroundColor: '#3B82F6', color: 'white', fontSize: '12px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '6px', marginLeft: '8px'},
  detailContainer: { backgroundColor: '#F8F9FA', height: '100vh', display: 'flex', flexDirection: 'column' },
  detailImage: { width: '100%', height: '40vh', objectFit: 'cover', position: 'relative' },
  backButton: { position: 'absolute', top: '20px', left: '20px', backgroundColor: 'rgba(0,0,0,0.5)', padding: '8px 15px', borderRadius: '20px', color: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer', border: 'none', zIndex: 10 },
  detailContent: { backgroundColor: '#F8F9FA', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', marginTop: '-24px', padding: '20px', textAlign: 'center', position: 'relative', flex: 1, overflowY: 'auto' },
  detailLogo: { width: '120px', height: '120px', borderRadius: '24px', marginTop: '-84px', border: '4px solid #F8F9FA', objectFit: 'cover', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' },
  detailTitle: { fontSize: '34px', fontWeight: 'bold', color: '#111827', marginTop: '15px', margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  detailCategory: { fontSize: '18px', color: '#3B82F6', marginTop: '5px', marginBottom: '10px', fontWeight: '600' },
  detailDescription: { fontSize: '16px', color: '#4B5563', lineHeight: '1.6', marginBottom: '30px', maxWidth: '700px', margin: '15px auto 30px auto' },
  contactButton: { backgroundColor: '#10B981', padding: '15px 40px', borderRadius: '30px', boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.39)', color: 'white', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', border: 'none', textDecoration: 'none' },
  formScreen: { padding: '30px', maxWidth: '600px', margin: '40px auto', backgroundColor: '#FFFFFF', borderRadius: '20px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'},
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  formLabel: { fontWeight: '600', marginBottom: '-10px', fontSize: '14px', color: '#4B5563' },
  actionButton: { backgroundColor: '#3B82F6', borderRadius: '12px', padding: '15px', textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', border: 'none', marginTop: '10px'},
  logoutButton: { backgroundColor: '#EF4444' },
  goBackButton: { backgroundColor: '#6B7280', borderRadius: '12px', padding: '12px', textAlign: 'center', marginTop: '20px', color: 'white', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', border: 'none', display: 'inline-block' },
  message: { marginTop: '15px', padding: '12px', borderRadius: '10px', textAlign: 'center', fontWeight: 'bold' },
  successMessage: { backgroundColor: '#D1FAE5', color: '#065F46' },
  reviewsSection: { marginTop: '40px', borderTop: '1px solid #E5E7EB', paddingTop: '30px', textAlign: 'left'},
  reviewsTitle: { fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '20px'},
  reviewCard: { backgroundColor: '#F9FAFB', borderRadius: '12px', padding: '15px', marginBottom: '15px', border: '1px solid #E5E7EB'},
  reviewAuthor: { fontWeight: 'bold', marginBottom: '5px', color: '#3B82F6' },
  starRatingContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px' },
  starRatingText: { fontSize: '16px', color: '#6B7280', fontWeight: '600' },
  stars: { color: '#FBBF24', fontSize: '24px' },
  reviewForm: { marginTop: '20px' },
  starInputContainer: { display: 'flex', justifyContent: 'center', marginBottom: '15px' },
  starButton: { fontSize: '30px', color: '#D1D5DB', cursor: 'pointer', background: 'none', border: 'none'},
  starButtonFilled: { color: '#FBBF24' },
  favButton: { position: 'absolute', top: '15px', right: '15px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none', cursor: 'pointer' },
  favIcon: { fontSize: '20px', color: '#D1D5DB' },
  favIconActive: { color: '#EF4444' },
  navButtonGroup: { display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' },
  navButton: { backgroundColor: '#E5E7EB', border: 'none', borderRadius: '20px', padding: '10px 20px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer'},
  navButtonActive: { backgroundColor: '#3B82F6', color: 'white' },
  offersContainer: { padding: '20px 0' },
  offerCard: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: '16px', padding: '20px', marginBottom: '15px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', cursor: 'pointer' },
  offerTitle: { fontSize: '18px', fontWeight: 'bold', margin: '0 0 5px 0' },
  offerBusiness: { fontSize: '14px', opacity: 0.9 },
  roleSelectionContainer: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px' },
  logoLarge: { width: '120px', height: '120px', marginBottom: '20px'},
  productCard: { display: 'flex', gap: '15px', alignItems: 'center', backgroundColor: '#F9FAFB', borderRadius: '12px', padding: '10px', border: '1px solid #E5E7EB' },
  productImage: { width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover'},
  productInfo: { flex: 1 },
  productName: { fontWeight: 'bold', color: '#111827' },
  productPrice: { color: '#10B981', fontWeight: 'bold' },
  productStock: { fontSize: '12px', color: '#6B7280' },
  dashboardSection: { marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #E5E7EB' },
  productListItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #F3F4F6'},
  productEditButton: { marginRight: '10px', color: '#3B82F6', cursor: 'pointer' },
  productDeleteButton: { color: '#EF4444', cursor: 'pointer' },
  mapContainer: { position: 'relative', width: '100%', height: 'calc(100vh - 250px)', backgroundColor: '#E5E7EB', borderRadius: '16px', overflow: 'hidden' },
  mapImage: { width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 },
  mapPin: { position: 'absolute', transform: 'translate(-50%, -100%)', cursor: 'pointer' },
  pinIcon: { fontSize: '30px', color: '#EF4444', textShadow: '0 0 3px black' },
  statCard: { flex: 1, backgroundColor: '#F9FAFB', borderRadius: '12px', padding: '20px', textAlign: 'center', border: '1px solid #E5E7EB' },
  statValue: { fontSize: '24px', fontWeight: 'bold', color: '#3B82F6' },
  statLabel: { fontSize: '14px', color: '#6B7280' },
  chatScreen: { display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#FFFFFF' },
  chatHeader: { padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: '#F8F9FA', borderBottom: '1px solid #E5E7EB' },
  chatAvatar: { width: '40px', height: '40px', borderRadius: '50%' },
  chatHeaderTitle: { fontWeight: 'bold', fontSize: '18px' },
  chatMessagesContainer: { flex: 1, padding: '10px', overflowY: 'auto', display: 'flex', flexDirection: 'column-reverse' },
  messageBubble: { maxWidth: '70%', padding: '10px 15px', borderRadius: '20px', marginBottom: '10px', wordWrap: 'break-word' },
  myMessage: { backgroundColor: '#3B82F6', color: 'white', alignSelf: 'flex-end' },
  theirMessage: { backgroundColor: '#E9ECEF', color: '#212529', alignSelf: 'flex-start' },
  chatInputContainer: { display: 'flex', padding: '10px', borderTop: '1px solid #E5E7EB', backgroundColor: '#F8F9FA' },
  chatInput: { flex: 1, height: '40px', border: '1px solid #CED4DA', borderRadius: '20px', padding: '0 15px' },
  chatSendButton: { backgroundColor: '#3B82F6', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', marginLeft: '10px', cursor: 'pointer', fontSize: '20px' },
  scheduleContainer: { backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '15px', margin: '20px auto', maxWidth: '700px'},
  scheduleRow: { display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #F3F4F6'},
  statusBadge: { padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold', color: 'white', fontSize: '14px' },
  statusOpen: { backgroundColor: '#10B981' },
  statusClosed: { backgroundColor: '#EF4444' },
  galleryContainer: { display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px'},
  galleryImage: { width: '150px', height: '100px', borderRadius: '8px', objectFit: 'cover' },
  filtersContainer: { display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '15px 0'},
  notificationBell: { position: 'relative', background: 'transparent', border: 'none', cursor: 'pointer' },
  notificationDot: { position: 'absolute', top: '0', right: '0', width: '8px', height: '8px', backgroundColor: '#EF4444', borderRadius: '50%', border: '1px solid white' },
  notificationsPanel: { position: 'absolute', top: '50px', right: '0', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '300px', zIndex: 100 },
  notificationItem: { padding: '15px', borderBottom: '1px solid #F3F4F6' },
};

// --- Helper Functions ---
function getCurrentStatus(schedule) {
    const now = new Date();
    const day = now.getDay(); 
    const currentTime = now.getHours() * 100 + now.getMinutes();
    let todaySchedule = '';
    const dayMap = [ 'dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab' ];
    const currentDayKey = dayMap[day];

    for (const key in schedule) {
        if (key.includes(currentDayKey)) { todaySchedule = schedule[key]; break; }
        else if (key === 'lun-vie' && day >= 1 && day <= 5) { todaySchedule = schedule[key]; break; }
        else if (key === 'lun-sab' && day >= 1 && day <= 6) { todaySchedule = schedule[key]; break; }
    }

    if (!todaySchedule || todaySchedule.toLowerCase() === 'cerrado') return { text: 'Cerrado', isOpen: false };
    try {
        const [start, end] = todaySchedule.split('-').map(time => {
            const [hours, minutes] = time.split(':');
            return parseInt(hours, 10) * 100 + parseInt(minutes, 10);
        });
        if (currentTime >= start && currentTime <= end) return { text: 'Abierto ahora', isOpen: true };
        else return { text: 'Cerrado', isOpen: false };
    } catch (e) { return { text: 'Horario no disponible', isOpen: false }; }
}


// --- Components ---

const RoleSelectionScreen = ({ onSelectRole }) => (
    <div style={styles.roleSelectionContainer}>
        <img src="https://placehold.co/150x150/3B82F6/FFFFFF?text=A" style={styles.logoLarge} alt="Logo de Atlixora"/>
        <h1 style={styles.title}>Bienvenido a Atlixora</h1>
        <p style={styles.subtitle}>¿Cómo quieres empezar?</p>
        <div style={styles.buttonGroup}>
            <button onClick={() => onSelectRole('customer')} style={styles.secondaryButton}>Soy Cliente</button>
            <button onClick={() => onSelectRole('seller')} style={styles.primaryButton}>Quiero Vender</button>
        </div>
    </div>
);

const StarRating = ({ rating, totalReviews }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
        <div style={styles.starRatingContainer}>
            <span style={styles.stars}>{'★'.repeat(fullStars)}{halfStar && '☆'}{'☆'.repeat(emptyStars)}</span>
            <span style={styles.starRatingText}>{rating.toFixed(1)} ({totalReviews} reseñas)</span>
        </div>
    );
}

const ReviewForm = ({ onSubmit, loggedInCustomer }) => {
    const [comment, setComment] = useState('');
    const [stars, setStars] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!loggedInCustomer || !comment || stars === 0) {
            alert('Por favor, completa todos los campos y selecciona una calificación.');
            return;
        }
        onSubmit({ author: loggedInCustomer.name, comment, stars });
        setComment(''); setStars(0);
    };

    return (
        <form onSubmit={handleSubmit} style={styles.reviewForm}>
            <h3 style={styles.reviewsTitle}>Deja tu opinión</h3>
            <div style={styles.starInputContainer}>
                {[1, 2, 3, 4, 5].map(value => (
                    <button key={value} type="button" style={{...styles.starButton, ...(value <= stars ? styles.starButtonFilled : {})}} onClick={() => setStars(value)}>★</button>
                ))}
            </div>
            <textarea style={styles.textarea} placeholder={`Como ${loggedInCustomer.name}, escribe tu reseña aquí...`} value={comment} onChange={(e) => setComment(e.target.value)} />
            <button type="submit" style={{...styles.actionButton, marginTop: '10px'}}>Enviar Reseña</button>
        </form>
    );
};

const BusinessCard = ({ business, onPress, onToggleFavorite, isFavorite }) => (
  <div style={styles.card}>
    <div style={{cursor: 'pointer', flex: 1, display: 'flex', alignItems: 'center'}} onClick={() => onPress(business)}>
      <img src={business.logo || 'https://placehold.co/100x100/CCCCCC/FFFFFF?text=Logo'} style={styles.cardLogo} alt={`Logo de ${business.name}`} />
      <div style={styles.cardTextContainer}>
        <p style={styles.cardTitle}>{business.name} {business.verified && <span style={styles.verifiedBadge}>✓</span>}</p>
        <p style={styles.cardCategory}>{business.category}</p>
      </div>
    </div>
    <button style={styles.favButton} onClick={(e) => { e.stopPropagation(); onToggleFavorite(business.id); }}>
      <span style={{...styles.favIcon, ...(isFavorite ? styles.favIconActive : {})}}>♥</span>
    </button>
  </div>
);

const BusinessDetail = ({ business, onBack, onReviewSubmit, onToggleFavorite, isFavorite, loggedInCustomer, onChat, onAppointment, onQuote }) => {
    const status = getCurrentStatus(business.schedule);
    
    const renderActionButton = () => {
        if(!loggedInCustomer) return <button style={styles.contactButton} onClick={() => alert('Debes registrarte como cliente para interactuar.')}>Chatear / Agendar</button>
        switch(business.serviceType) {
            case 'appointment': return <button style={styles.contactButton} onClick={() => onAppointment(business)}>Agendar Cita</button>;
            case 'quote': return <button style={styles.contactButton} onClick={() => onQuote(business)}>Solicitar Cotización</button>;
            case 'product': default: return <button style={styles.contactButton} onClick={() => onChat(business)}>Chatear con el Vendedor</button>;
        }
    };

    return (
        <div style={styles.detailContainer}>
            <div style={{...styles.detailImage, backgroundImage: `url(${business.image || 'https://placehold.co/600x400/CCCCCC/FFFFFF?text=Imagen'})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
              <button onClick={() => onBack()} style={styles.backButton}>← Volver</button>
            </div>
            <div style={styles.detailContent}>
                <img src={business.logo || 'https://placehold.co/100x100/CCCCCC/FFFFFF?text=Logo'} style={styles.detailLogo} alt={`Logo de ${business.name}`}/>
                <h1 style={styles.detailTitle}>{business.name} {business.verified && <span style={styles.verifiedBadge}>✓</span>}</h1>
                 <button style={{...styles.favButton, top: '-50px', right: '20px'}} onClick={(e) => { e.stopPropagation(); onToggleFavorite(business.id); }}>
                    <span style={{...styles.favIcon, ...(isFavorite ? styles.favIconActive : {})}}>♥</span>
                </button>
                <p style={styles.detailCategory}>{business.category}</p>
                <div style={{...styles.statusBadge, ...(status.isOpen ? styles.statusOpen : styles.statusClosed), margin: '0 auto 10px auto' }}>{status.text}</div>
                {business.reviews && <StarRating rating={business.rating} totalReviews={business.reviews.length} />}
                <p style={styles.detailDescription}>{business.description || "Este negocio aún no ha añadido una descripción."}</p>
                {renderActionButton()}
                
                <div style={{...styles.reviewsSection, width: '100%'}}>
                    <h2 style={styles.reviewsTitle}>Horario</h2>
                    <div style={styles.scheduleContainer}>
                        {Object.entries(business.schedule).map(([days, hours]) => (
                            <div key={days} style={styles.scheduleRow}><span>{days.toUpperCase()}</span><span>{hours}</span></div>
                        ))}
                    </div>
                </div>

                {business.gallery && business.gallery.length > 0 && (
                  <div style={{...styles.reviewsSection, width: '100%'}}>
                    <h2 style={styles.reviewsTitle}>Galería</h2>
                    <div style={styles.galleryContainer}>
                      {business.gallery.map((photo, index) => (
                        <img key={index} src={photo} style={styles.galleryImage} alt={`Galería ${index+1}`} />
                      ))}
                    </div>
                  </div>
                )}
                
                {business.products && business.products.length > 0 && (
                  <div style={{...styles.reviewsSection, width: '100%'}}>
                    <h2 style={styles.reviewsTitle}>Productos y Servicios</h2>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                      {business.products.map(p => (
                        <div key={p.id} style={styles.productCard}>
                          <img src={p.image || 'https://placehold.co/100x100/CCCCCC/FFFFFF?text=Img'} style={styles.productImage} alt={p.name} />
                          <div style={styles.productInfo}>
                            <p style={styles.productName}>{p.name}</p>
                            <p style={styles.productPrice}>${p.price}</p>
                            <p style={styles.productStock}>{p.stock > 0 ? `Disponible: ${p.stock}`: 'Agotado'}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={styles.reviewsSection}>
                    <h2 style={styles.reviewsTitle}>Opiniones de Clientes</h2>
                    {business.reviews && business.reviews.length > 0 ? (
                        business.reviews.map(review => (
                            <div key={review.id} style={styles.reviewCard}><p style={styles.reviewAuthor}>{review.author} - {'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}</p><p>{review.comment}</p></div>
                        ))
                    ) : ( <p>Este negocio todavía no tiene reseñas. ¡Sé el primero!</p> )}
                    {loggedInCustomer ? (
                        <ReviewForm onSubmit={(review) => onReviewSubmit(business.id, review)} loggedInCustomer={loggedInCustomer} />
                    ) : (
                        <p style={{textAlign: 'center', marginTop: '20px', backgroundColor: '#E9ECEF', padding: '15px', borderRadius: '12px'}}>Debes <a href="#" onClick={(e) => { e.preventDefault(); onBack(true); }}>registrarte como cliente</a> para dejar una reseña.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const SellerRegisterScreen = ({ onRegister, onBack }) => {
    const [businessName, setBusinessName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!businessName || !email || !password) { alert('Por favor, completa todos los campos.'); return; }
        onRegister({ id: Date.now().toString(), name: businessName, email: email, category: CATEGORIES[0], description: '', phone: '', logo: '', image: '', rating: 0, reviews: [], tags: [], offer: '', products: [], verified: false, location: {top: `${Math.random()*60+20}%`, left: `${Math.random()*60+20}%`}, stats: {views: 0, favorites: 0}, gallery: [], schedule: {'lun-vie': '9:00-18:00', 'sab': 'Cerrado', 'dom': 'Cerrado'}, serviceType: 'product', membershipActive: true });
    };
    return (
        <div style={styles.formScreen}>
            <h1 style={styles.title}>Registra tu Negocio</h1><p style={styles.subtitle}>Crea tu cuenta para empezar a vender.</p>
            <form style={styles.form} onSubmit={handleSubmit}><input type="text" placeholder="Nombre del Negocio" style={styles.input} value={businessName} onChange={(e) => setBusinessName(e.target.value)} /><input type="email" placeholder="Correo Electrónico" style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} /><input type="password" placeholder="Contraseña" style={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} /><button type="submit" style={styles.actionButton}>Crear Cuenta y Continuar</button></form>
            <button onClick={onBack} style={styles.goBackButton}>← Volver al inicio</button>
        </div>
    );
};

const SellerDashboard = ({ business, onUpdate, onLogout }) => {
    const [formData, setFormData] = useState({...business, tags: Array.isArray(business.tags) ? business.tags.join(', ') : ''}); 
    const [message, setMessage] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productStock, setProductStock] = useState('');

    const logoInputRef = React.useRef(null); 
    const imageInputRef = React.useRef(null);
    
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if ((name === "logo" || name === "image") && files && files[0]) {
            setFormData(prev => ({ ...prev, [name]: URL.createObjectURL(files[0]) }));
        } else { 
            setFormData(prev => ({ ...prev, [name]: value })); 
        }
    };

    const handleAddProduct = () => {
        if (!productName || !productPrice || !productStock) {
            alert('Completa todos los campos del producto.');
            return;
        }
        const newProduct = { id: `p${Date.now()}`, name: productName, price: productPrice, stock: parseInt(productStock, 10), image: '' };
        setFormData(prev => ({ ...prev, products: [...prev.products, newProduct] }));
        setProductName(''); setProductPrice(''); setProductStock('');
    };
    
    const handleDeleteProduct = (productId) => { setFormData(prev => ({ ...prev, products: prev.products.filter(p => p.id !== productId) })); };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const tagsAsArray = typeof formData.tags === 'string' ? formData.tags.split(',').map(tag => tag.trim()) : [];
        onUpdate({...formData, tags: tagsAsArray}); 
        setMessage('¡Perfil actualizado con éxito!');
        setTimeout(() => setMessage(''), 3000);
    };
    
    return (
        <div style={styles.formScreen}>
            <h1 style={styles.title}>Panel de Vendedor</h1><p style={styles.subtitle}>Bienvenido, {business.name}.</p>
            <form style={styles.form} onSubmit={handleSubmit}>
                 <div style={{...styles.dashboardSection, borderTop: 'none', marginTop: 0}}>
                    <h2 style={{...styles.reviewsTitle, fontSize: '20px'}}>Membresía</h2>
                     <div style={{...styles.statCard, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div>
                            <div style={styles.statLabel}>Estado</div>
                            <div style={{...styles.statusBadge, ...(business.membershipActive ? styles.statusOpen : styles.statusClosed)}}>{business.membershipActive ? 'Activa' : 'Inactiva'}</div>
                        </div>
                        <button type="button" onClick={() => alert('Simulación de pago completada.')} style={{...styles.secondaryButton, flex: 'none'}}>Pagar Membresía</button>
                    </div>
                </div>

                <div style={styles.dashboardSection}>
                    <h2 style={{...styles.reviewsTitle, fontSize: '20px'}}>Estadísticas</h2>
                    <div style={{display: 'flex', gap: '15px'}}>
                        <div style={styles.statCard}><div style={styles.statValue}>{business.stats.views}</div><div style={styles.statLabel}>Vistas al Perfil</div></div>
                        <div style={styles.statCard}><div style={styles.statValue}>{business.stats.favorites}</div><div style={styles.statLabel}>Veces en Favoritos</div></div>
                    </div>
                </div>

                <div style={styles.dashboardSection}>
                    <h2 style={{...styles.reviewsTitle, fontSize: '20px'}}>Información del Negocio</h2>
                    <div><label style={styles.formLabel}>Nombre del Negocio</label><input name="name" value={formData.name} onChange={handleChange} style={styles.input} /></div>
                    <div><label style={styles.formLabel}>Categoría</label><select name="category" value={formData.category} onChange={handleChange} style={styles.input}>{CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}</select></div>
                    <div><label style={styles.formLabel}>Descripción</label><textarea name="description" value={formData.description} onChange={handleChange} style={styles.textarea} placeholder="Describe tu negocio..." /></div>
                    <div><label style={styles.formLabel}>Teléfono</label><input name="phone" type="tel" value={formData.phone} onChange={handleChange} style={styles.input} /></div>
                    <div><label style={styles.formLabel}>Oferta Especial</label><input name="offer" value={formData.offer || ''} onChange={handleChange} style={styles.input} placeholder="Ej: 2x1 en cafés los martes"/></div>
                    <div><label style={styles.formLabel}>Etiquetas de Búsqueda</label><input name="tags" value={formData.tags} onChange={handleChange} style={styles.input} placeholder="Ej: pasteles, café, postres" /></div>
                    <div><label style={styles.formLabel}>Logo</label><input name="logo" type="file" accept="image/*" onChange={handleChange} style={{ display: 'none' }} ref={logoInputRef} /><button type="button" onClick={() => logoInputRef.current.click()} style={styles.fileInputButton}>Adjuntar Logo</button>{formData.logo && <img src={formData.logo} alt="Vista previa del logo" style={styles.imagePreview} />}</div>
                    <div><label style={styles.formLabel}>Imagen Principal</label><input name="image" type="file" accept="image/*" onChange={handleChange} style={{ display: 'none' }} ref={imageInputRef} /><button type="button" onClick={() => imageInputRef.current.click()} style={styles.fileInputButton}>Adjuntar Imagen</button>{formData.image && <img src={formData.image} alt="Vista previa de la imagen" style={styles.imagePreview} />}</div>
                </div>
                
                <div style={styles.dashboardSection}>
                    <h2 style={{...styles.reviewsTitle, fontSize: '20px'}}>Gestionar Productos</h2>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px'}}>
                        <input value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Nombre del producto" style={styles.input}/>
                        <input value={productPrice} onChange={(e) => setProductPrice(e.target.value)} placeholder="Precio (ej: 50.00)" style={styles.input}/>
                        <input value={productStock} onChange={(e) => setProductStock(e.target.value)} placeholder="Stock (ej: 10)" style={styles.input} type="number"/>
                        <button type="button" onClick={handleAddProduct} style={{...styles.secondaryButton, flex: 'none'}}>Añadir Producto</button>
                    </div>
                    <div>{formData.products && formData.products.length > 0 ? formData.products.map(p => (<div key={p.id} style={styles.productListItem}><span>{p.name} - ${p.price} ({p.stock} disp.)</span><div><span onClick={() => alert('Función de editar no implementada')} style={styles.productEditButton}>✏️</span><span onClick={() => handleDeleteProduct(p.id)} style={styles.productDeleteButton}>🗑️</span></div></div>)) : <p>Aún no tienes productos.</p>}</div>
                </div>

                <div style={styles.dashboardSection}>
                    <h2 style={{...styles.reviewsTitle, fontSize: '20px'}}>Tus Reseñas</h2>
                    {business.reviews && business.reviews.length > 0 ? (business.reviews.map(review => (<div key={review.id} style={styles.reviewCard}><p style={styles.reviewAuthor}>{review.author} - {'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}</p><p>{review.comment}</p></div>))) : ( <p>Todavía no tienes reseñas.</p> )}
                </div>
                
                <button type="submit" style={styles.actionButton}>Guardar Cambios Generales</button>
            </form>
            {message && (<div style={{...styles.message, ...styles.successMessage}}>{message}</div>)}
            <button onClick={onLogout} style={{...styles.actionButton, ...styles.logoutButton, marginTop: '20px'}}>Cerrar Sesión</button>
        </div>
    );
};

const CustomerRegisterScreen = ({ onRegister, onBack }) => {
    const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
    const handleSubmit = (e) => { e.preventDefault(); if (!name || !email || !password) { alert('Por favor, completa todos los campos.'); return; } onRegister({ id: `c${Date.now()}`, name, email }); };
    return (
        <div style={styles.formScreen}>
            <h1 style={styles.title}>Crea tu Cuenta</h1><p style={styles.subtitle}>Regístrate para calificar y guardar tus negocios favoritos.</p>
            <form style={styles.form} onSubmit={handleSubmit}><input type="text" placeholder="Tu Nombre Completo" style={styles.input} value={name} onChange={(e) => setName(e.target.value)} /><input type="email" placeholder="Correo Electrónico" style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} /><input type="password" placeholder="Contraseña" style={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} /><button type="submit" style={styles.actionButton}>Crear Cuenta</button></form>
            <button onClick={onBack} style={styles.goBackButton}>← Volver al inicio</button>
        </div>
    );
};


const CustomerDashboard = ({ customer, onLogout, allBusinesses }) => {
    const myReviews = [];
    allBusinesses.forEach(b => { b.reviews.forEach(r => { if (r.author === customer.name) { myReviews.push({ ...r, businessName: b.name }); } }); });

    return (
        <div style={styles.formScreen}>
            <h1 style={styles.title}>Mi Cuenta</h1><p style={styles.subtitle}>Bienvenido, {customer.name}.</p>
            <div style={styles.dashboardSection}>
                <h2 style={{...styles.reviewsTitle, fontSize: '20px'}}>Mis Reseñas</h2>
                 {myReviews.length > 0 ? (myReviews.map(review => (<div key={review.id} style={styles.reviewCard}><p>En <b>{review.businessName}</b> - {'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}</p><p>"{review.comment}"</p></div>))) : ( <p>Aún no has dejado ninguna reseña.</p> )}
            </div>
            <button onClick={onLogout} style={{...styles.actionButton, ...styles.logoutButton, marginTop: '20px'}}>Cerrar Sesión</button>
        </div>
    );
};

const ChatScreen = ({ business, customer, onBack, messages, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = React.useRef(null);

    const handleSend = () => {
        if (newMessage.trim()) {
            onSendMessage(business.id, { author: customer.name, text: newMessage });
            setNewMessage('');
        }
    };
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div style={styles.chatScreen}>
            <div style={styles.chatHeader}>
                <button onClick={onBack} style={{...styles.goBackButton, marginTop: 0}}>←</button>
                <img src={business.logo} style={styles.chatAvatar} alt={business.name} />
                <span style={styles.chatHeaderTitle}>{business.name}</span>
            </div>
            <div style={styles.chatMessagesContainer}>
                <div style={{display: 'flex', flexDirection: 'column-reverse'}}>
                    <div ref={messagesEndRef} />
                    {messages.map((msg, index) => (
                        <div key={index} style={{...styles.messageBubble, ...(msg.author === customer.name ? styles.myMessage : styles.theirMessage)}}>
                            {msg.text}
                        </div>
                    ))}
                </div>
            </div>
            <div style={styles.chatInputContainer}>
                <input style={styles.chatInput} placeholder="Escribe un mensaje..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} />
                <button style={styles.chatSendButton} onClick={handleSend}>➤</button>
            </div>
        </div>
    );
};

const MapView = ({ businesses, onPinClick }) => (
    <div style={styles.mapContainer}>
        <img src="https://placehold.co/1200x800/e0e0e0/ffffff?text=Mapa+de+Atlixco" style={styles.mapImage} alt="Mapa de Atlixco" />
        {businesses.map(b => (
            <div key={b.id} style={{...styles.mapPin, top: b.location.top, left: b.location.left}} onClick={() => onPinClick(b)}>
                <span style={styles.pinIcon} title={b.name}>📍</span>
            </div>
        ))}
    </div>
);

const NotificationsPanel = ({ notifications }) => (
    <div style={styles.notificationsPanel}>
        {notifications.length > 0 ? (
            notifications.map((n, i) => <div key={i} style={styles.notificationItem}>{n}</div>)
        ) : (
            <div style={styles.notificationItem}>No tienes notificaciones nuevas.</div>
        )}
    </div>
);


export default function App() {
  const [businesses, setBusinesses] = useState(INITIAL_BUSINESSES);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); 
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [loggedInSeller, setLoggedInSeller] = useState(null);
  const [loggedInCustomer, setLoggedInCustomer] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [chatMessages, setChatMessages] = useState({});
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentView, setCurrentView] = useState('roleSelection'); 
  
  const offers = businesses.filter(b => b.offer);
  const favoriteBusinesses = businesses.filter(b => favorites.includes(b.id));

  const filteredBusinesses = businesses.filter((b) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = b.name.toLowerCase().includes(query) || b.category.toLowerCase().includes(query) || (b.tags && b.tags.some(tag => tag.toLowerCase().includes(query)));
      if (!matchesSearch) return false;
      switch(activeFilter) {
          case 'open': return getCurrentStatus(b.schedule).isOpen;
          case 'offers': return !!b.offer;
          case 'verified': return b.verified;
          case 'all': default: return true;
      }
  });
  
  const handleSelectBusiness = (business) => { setSelectedBusiness(business); setCurrentView('details'); };
  const handleGoToRoleSelection = () => { setCurrentView('roleSelection'); };
  const handleSelectRole = (role) => {
      if (role === 'customer') setCurrentView('customerRegister');
      else setCurrentView('sellerRegister');
  };
  
  const handleSellerRegister = (newBusiness) => { setBusinesses(prev => [...prev, newBusiness]); setLoggedInSeller(newBusiness); setCurrentView('dashboard'); };
  const handleCustomerRegister = (customer) => { setLoggedInCustomer(customer); setCurrentView('home'); };
  const handleUpdate = (updatedBusiness) => { setBusinesses(prev => prev.map(b => b.id === updatedBusiness.id ? updatedBusiness : b)); setLoggedInSeller(updatedBusiness); };
  const handleLogout = () => { setLoggedInSeller(null); setLoggedInCustomer(null); setCurrentView('roleSelection'); };

  const handleToggleFavorite = (businessId) => {
    setFavorites(prev => prev.includes(businessId) ? prev.filter(id => id !== businessId) : [...prev, businessId]);
  };
  
  const handleReviewSubmit = (businessId, review) => {
      const newReview = {...review, id: `r${Date.now()}`};
      const updatedBusinesses = businesses.map(b => {
          if (b.id === businessId) {
              const updatedReviews = [...b.reviews, newReview];
              const newRating = updatedReviews.reduce((acc, r) => acc + r.stars, 0) / updatedReviews.length;
              const updatedBusiness = {...b, reviews: updatedReviews, rating: newRating};
              if(selectedBusiness && selectedBusiness.id === businessId) setSelectedBusiness(updatedBusiness); 
              return updatedBusiness;
          }
          return b;
      });
      setBusinesses(updatedBusinesses);
  };
  
  const handleGoToChat = (business) => {
    setSelectedBusiness(business);
    if (!chatMessages[business.id]) {
      setChatMessages(prev => ({ ...prev, [business.id]: [] }));
    }
    setCurrentView('chat');
  };

  const handleSendMessage = (businessId, message) => {
    setChatMessages(prev => {
        const newMessages = [...(prev[businessId] || []), message];
        setTimeout(() => {
            const sellerReply = { author: businesses.find(b=>b.id === businessId).name, text: "¡Hola! Gracias por tu mensaje. Te responderemos a la brevedad." };
            setChatMessages(p => ({...p, [businessId]: [...newMessages, sellerReply]}));
        }, 1000);
        return { ...prev, [businessId]: newMessages };
    });
  };

  const handleAppointment = (business) => { alert(`Función para agendar cita con ${business.name} no implementada.`); };
  const handleQuote = (business) => { alert(`Función para solicitar cotización a ${business.name} no implementada.`); };

  const renderHeader = (currentTab) => (
    <div style={styles.headerContainer}>
        <div style={styles.headerTop}>
            <h1 style={{...styles.title, textAlign: 'left', fontSize: '30px'}}>Atlixora</h1>
             <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                <button onClick={() => setShowNotifications(!showNotifications)} style={styles.notificationBell}>
                    🔔
                    {(loggedInCustomer || loggedInSeller) && <div style={styles.notificationDot}></div>}
                </button>
                {showNotifications && <NotificationsPanel notifications={["¡El Mirador tiene una nueva oferta!", "Tu cita en Dental Sonrisas es mañana."]}/>}
                {loggedInCustomer ? (<button onClick={() => setCurrentView('customerDashboard')} style={styles.backToRoleButton}>Mi Cuenta</button>) : (loggedInSeller ? <button onClick={() => setCurrentView('dashboard')} style={styles.backToRoleButton}>Mi Panel</button> :<button onClick={handleGoToRoleSelection} style={styles.backToRoleButton}>← Cambiar</button>)}
            </div>
        </div>
        <p style={{...styles.subtitle, textAlign: 'left', marginBottom: '20px'}}>Encuentra lo mejor de Atlixco</p>
        <div style={styles.searchContainer}><input style={styles.input} placeholder="Busca por nombre, categoría o producto..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
        <div style={styles.filtersContainer}>
            <button onClick={() => setActiveFilter('all')} style={activeFilter === 'all' ? styles.navButtonActive : styles.navButton}>Todos</button>
            <button onClick={() => setActiveFilter('open')} style={activeFilter === 'open' ? styles.navButtonActive : styles.navButton}>Abierto ahora</button>
            <button onClick={() => setActiveFilter('offers')} style={activeFilter === 'offers' ? styles.navButtonActive : styles.navButton}>Con Ofertas</button>
            <button onClick={() => setActiveFilter('verified')} style={activeFilter === 'verified' ? styles.navButtonActive : styles.navButton}>Verificados</button>
        </div>
        <div style={styles.navButtonGroup}>
            <button onClick={() => setCurrentView('home')} style={currentTab === 'home' ? styles.navButtonActive : styles.navButton}>Explorar</button>
            <button onClick={() => setCurrentView('map')} style={currentTab === 'map' ? styles.navButtonActive : styles.navButton}>Mapa</button>
            <button onClick={() => setCurrentView('favorites')} style={currentTab === 'favorites' ? styles.navButtonActive : styles.navButton}>Mis Favoritos ({favorites.length})</button>
        </div>
    </div>
  );

  const renderContent = () => {
    switch(currentView) {
        case 'roleSelection': return <RoleSelectionScreen onSelectRole={handleSelectRole} />;
        case 'details': return <BusinessDetail business={selectedBusiness} onBack={() => setCurrentView('home')} onReviewSubmit={handleReviewSubmit} onToggleFavorite={handleToggleFavorite} isFavorite={favorites.includes(selectedBusiness.id)} loggedInCustomer={loggedInCustomer} onChat={handleGoToChat} onAppointment={handleAppointment} onQuote={handleQuote}/>;
        case 'sellerRegister': return <SellerRegisterScreen onRegister={handleSellerRegister} onBack={handleGoToRoleSelection} />;
        case 'customerRegister': return <CustomerRegisterScreen onRegister={handleCustomerRegister} onBack={handleGoToRoleSelection} />;
        case 'dashboard': return <SellerDashboard business={loggedInSeller} onUpdate={handleUpdate} onLogout={handleLogout} />;
        case 'customerDashboard': return <CustomerDashboard customer={loggedInCustomer} onLogout={handleLogout} allBusinesses={businesses} />;
        case 'chat': return <ChatScreen business={selectedBusiness} customer={loggedInCustomer} onBack={() => setCurrentView('details')} messages={chatMessages[selectedBusiness.id] || []} onSendMessage={handleSendMessage}/>;
        case 'map':
            return (<>{renderHeader('map')}<div style={styles.listContainer}><MapView businesses={businesses} onPinClick={handleSelectBusiness} /></div></>);
        case 'favorites':
            return (<>{renderHeader('favorites')}<div style={styles.listContainer}>{favoriteBusinesses.length > 0 ? (favoriteBusinesses.map(item => ( <BusinessCard business={item} onPress={handleSelectBusiness} key={item.id} onToggleFavorite={handleToggleFavorite} isFavorite={favorites.includes(item.id)} /> ))) : (<p style={{textAlign: 'center', marginTop: '40px'}}>No has guardado ningún negocio como favorito todavía.</p>)}</div></>);
        case 'home':
        default:
            return (<>{renderHeader('home')}<div style={{...styles.listContainer, padding: '0 20px'}}>{offers.length > 0 && activeFilter === 'all' && (<div style={styles.offersContainer}><h2 style={{...styles.reviewsTitle, fontSize: '20px'}}>Ofertas del Día</h2>{offers.map(b => (<div key={`offer-${b.id}`} style={styles.offerCard} onClick={() => handleSelectBusiness(b)}><p style={styles.offerTitle}>{b.offer}</p><p style={styles.offerBusiness}>en {b.name}</p></div>))}</div>)}<h2 style={{...styles.reviewsTitle, fontSize: '20px', marginTop: '20px'}}>Negocios</h2>{filteredBusinesses.map(item => ( <BusinessCard business={item} onPress={handleSelectBusiness} key={item.id} onToggleFavorite={handleToggleFavorite} isFavorite={favorites.includes(item.id)} /> ))}</div></>);
    }
  };

  return (
    <div style={styles.container}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');`}</style>
      {renderContent()}
    </div>
  );
}