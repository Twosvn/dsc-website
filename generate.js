// DS Cleaners - Landing Page Generator
// Run with: node generate.js

const fs = require('fs');
const path = require('path');

const BRAND = {
    name: 'DS Cleaners',
    phone: '+44 7765 875615',
    email: 'info@dscleanersltd.com',
    domain: 'https://dscleanersltd.com',
    founded: '2009',
};

const AREAS = [
    {
        slug: 'south-west-london',
        name: 'South West London',
        short: 'SW London',
        postcodes: 'SW1, SW2, SW3, SW4, SW6, SW8, SW10, SW11, SW12, SW15, SW17, SW18, SW19, SW20',
        neighbourhoods: 'Battersea, Clapham, Wandsworth, Wimbledon, Tooting, Putney, Chelsea, Fulham',
        desc: 'We serve all of South West London including Clapham, Battersea, Wandsworth, Wimbledon, Tooting, Putney, Chelsea, and Fulham.',
    },
    {
        slug: 'south-east-london',
        name: 'South East London',
        short: 'SE London',
        postcodes: 'SE1, SE3, SE4, SE5, SE6, SE8, SE10, SE13, SE14, SE15, SE16, SE17, SE21, SE22, SE23',
        neighbourhoods: 'Greenwich, Peckham, Lewisham, Deptford, Bermondsey, Dulwich, Forest Hill, Catford',
        desc: 'We serve all of South East London including Greenwich, Peckham, Lewisham, Deptford, Bermondsey, Dulwich, and Forest Hill.',
    },
    {
        slug: 'london',
        name: 'London',
        short: 'London',
        postcodes: 'Central London, North London, East London, South London, West London',
        neighbourhoods: 'Westminster, City of London, Islington, Camden, Hackney, Southwark, Lambeth, Tower Hamlets',
        desc: 'We cover all areas of London including Central, North, East, South, and West London.',
    },
    {
        slug: 'clapham',
        name: 'Clapham',
        short: 'Clapham',
        postcodes: 'SW4, SW8, SW9',
        neighbourhoods: 'Clapham North, Clapham South, Clapham Common, Stockwell, Oval',
        desc: 'We cover all of Clapham including Clapham North, Clapham South, Clapham Common, Stockwell, and Oval across SW4, SW8, and SW9.',
    },
    {
        slug: 'battersea',
        name: 'Battersea',
        short: 'Battersea',
        postcodes: 'SW8, SW11',
        neighbourhoods: 'Battersea Park, Nine Elms, Queenstown, Clapham Junction, Lavender Hill',
        desc: 'We cover all of Battersea including Nine Elms, Queenstown, Battersea Park, and Clapham Junction across SW8 and SW11.',
    },
    {
        slug: 'brixton',
        name: 'Brixton',
        short: 'Brixton',
        postcodes: 'SW2, SW9, SW16',
        neighbourhoods: 'Brixton, Tulse Hill, Streatham Hill, Stockwell, Herne Hill',
        desc: 'We cover Brixton and surrounding areas including Tulse Hill, Streatham Hill, Stockwell, and Herne Hill across SW2, SW9, and SW16.',
    },
    {
        slug: 'wimbledon',
        name: 'Wimbledon',
        short: 'Wimbledon',
        postcodes: 'SW19, SW20',
        neighbourhoods: 'Wimbledon Village, Wimbledon Town Centre, Raynes Park, Colliers Wood, Merton',
        desc: 'We cover Wimbledon and surrounding areas including Wimbledon Village, Raynes Park, Colliers Wood, and Merton across SW19 and SW20.',
    },
    {
        slug: 'greenwich',
        name: 'Greenwich',
        short: 'Greenwich',
        postcodes: 'SE10, SE3, SE7',
        neighbourhoods: 'Greenwich, Blackheath, Charlton, Woolwich, East Greenwich',
        desc: 'We cover Greenwich and surrounding areas including Blackheath, Charlton, Woolwich, and East Greenwich across SE10, SE3, and SE7.',
    },
    {
        slug: 'peckham',
        name: 'Peckham',
        short: 'Peckham',
        postcodes: 'SE15, SE22, SE14',
        neighbourhoods: 'Peckham, East Dulwich, Nunhead, New Cross, Telegraph Hill',
        desc: 'We cover Peckham and surrounding areas including East Dulwich, Nunhead, New Cross, and Telegraph Hill across SE15, SE22, and SE14.',
    },
    {
        slug: 'lewisham',
        name: 'Lewisham',
        short: 'Lewisham',
        postcodes: 'SE13, SE4, SE6, SE12',
        neighbourhoods: 'Lewisham, Catford, Brockley, Ladywell, Forest Hill, Hither Green',
        desc: 'We cover Lewisham and surrounding areas including Catford, Brockley, Ladywell, Forest Hill, and Hither Green across SE13, SE4, SE6, and SE12.',
    },
    {
        slug: 'wandsworth',
        name: 'Wandsworth',
        short: 'Wandsworth',
        postcodes: 'SW17, SW18, SW12',
        neighbourhoods: 'Wandsworth Town, Tooting, Balham, Earlsfield, Southfields',
        desc: 'We cover Wandsworth and surrounding areas including Tooting, Balham, Earlsfield, and Southfields across SW17, SW18, and SW12.',
    },
    {
        slug: 'tooting',
        name: 'Tooting',
        short: 'Tooting',
        postcodes: 'SW17, SW16',
        neighbourhoods: 'Tooting Bec, Tooting Broadway, Upper Tooting, Balham, Streatham',
        desc: 'We cover Tooting and surrounding areas including Tooting Bec, Tooting Broadway, Upper Tooting, and nearby Balham across SW17 and SW16.',
    },
    {
        slug: 'balham',
        name: 'Balham',
        short: 'Balham',
        postcodes: 'SW12, SW17',
        neighbourhoods: 'Balham, Tooting Bec, Clapham South, Bedford Hill, Nightingale Lane',
        desc: 'We cover Balham and surrounding areas including Tooting Bec, Clapham South, and Bedford Hill across SW12 and SW17.',
    },
    {
        slug: 'streatham',
        name: 'Streatham',
        short: 'Streatham',
        postcodes: 'SW16, SW2',
        neighbourhoods: 'Streatham, Streatham Hill, Streatham Common, Streatham Park, Norbury',
        desc: 'We cover Streatham and surrounding areas including Streatham Hill, Streatham Common, Streatham Park, and Norbury across SW16 and SW2.',
    },
    {
        slug: 'dulwich',
        name: 'Dulwich',
        short: 'Dulwich',
        postcodes: 'SE21, SE22, SE24',
        neighbourhoods: 'East Dulwich, West Dulwich, Dulwich Village, Herne Hill, Tulse Hill',
        desc: 'We cover Dulwich and surrounding areas including East Dulwich, West Dulwich, Dulwich Village, and Herne Hill across SE21, SE22, and SE24.',
    },
    {
        slug: 'kennington',
        name: 'Kennington',
        short: 'Kennington',
        postcodes: 'SE11, SE17',
        neighbourhoods: 'Kennington, Oval, Vauxhall, Elephant & Castle, Walworth',
        desc: 'We cover Kennington and surrounding areas including Oval, Vauxhall, Elephant & Castle, and Walworth across SE11 and SE17.',
    },
];

const SERVICES = [
    {
        slug: 'domestic-cleaning',
        name: 'Domestic Cleaning',
        tagline: 'Regular & one-off home cleaning',
        rateFrom: '£21/hr',
        minHrs: '2 hours',
        icon: '🏠',
        heroImg: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80',
        color: '#1c7ed6',
        description: 'Professional domestic cleaning services tailored to your home and schedule. Whether you need a weekly clean, a fortnightly visit, or a one-off tidy-up, our vetted team delivers outstanding results every time.',
        features: [
            'Weekly, fortnightly & monthly schedules',
            'Kitchen & bathroom deep scrub',
            'Hoovering, mopping & dusting throughout',
            'Skirting boards, window sills & switches',
            'Flexible morning, afternoon or evening slots',
            'Same cleaning team every visit',
        ],
        faqs: [
            { q: 'How much does domestic cleaning cost in {area}?', a: 'Our domestic cleaning starts from £21/hr with a 2-hour minimum in {area}. For a typical 3-bedroom home a clean takes around 3 hours — approximately £63. Use the price calculator on our main site for an instant estimate.' },
            { q: 'Do you bring your own products?', a: 'Yes. Our team arrives fully equipped with professional-grade, eco-friendly cleaning products and all necessary tools — you don\'t need to provide anything.' },
            { q: 'Can I have the same cleaner each visit?', a: 'Wherever possible we assign you the same team member, so they get to know your home and your preferences.' },
            { q: 'How do I book a domestic clean in {area}?', a: 'Fill in the quote form on this page or call us directly. We respond within 24 hours with availability and pricing.' },
        ],
        schema: 'HouseCleaningService',
        priceRange: '£42–£84',
    },
    {
        slug: 'deep-cleaning',
        name: 'Deep Cleaning',
        tagline: 'Thorough top-to-bottom reset',
        rateFrom: '£27/hr',
        minHrs: '4 hours',
        icon: '✨',
        heroImg: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=1600&q=80',
        color: '#0c1e35',
        description: 'A comprehensive deep clean covering every surface, corner, and hidden area of your property. Perfect as a one-off reset, post-renovation clean, or seasonal refresh — we go far beyond what a regular clean covers.',
        features: [
            'Inside all cupboards & drawers',
            'Oven, hob & extractor degreasing',
            'Tile & grout scrubbing',
            'Behind & underneath appliances',
            'Limescale removal from bathrooms',
            'Walls, skirting boards & light fittings',
        ],
        faqs: [
            { q: 'How much does a deep clean cost in {area}?', a: 'Deep cleaning starts from £27/hr with a 4-hour minimum in {area}. A typical 2-bedroom flat takes 4–5 hours (£108–£135). A larger property or post-renovation job may take longer — we\'ll confirm before booking.' },
            { q: 'How long does a deep clean take?', a: 'Minimum 4 hours. Larger or heavily soiled properties may take 6–8 hours. We always assess and give you a clear timeframe before we start.' },
            { q: 'Do I need to be home during the deep clean?', a: 'No, most clients aren\'t home. We\'re fully insured and trusted with keys and access codes. You just come back to a spotless property.' },
            { q: 'How is a deep clean different from a regular clean?', a: 'A regular clean maintains your home week to week. A deep clean is intensive — we go inside every cupboard, behind appliances, and tackle built-up grease and limescale that regular cleaning doesn\'t touch.' },
        ],
        schema: 'HouseCleaningService',
        priceRange: '£108–£216',
    },
    {
        slug: 'end-of-tenancy-cleaning',
        name: 'End of Tenancy Cleaning',
        tagline: 'Letting-agent standard — deposit guaranteed',
        rateFrom: '£27/hr',
        minHrs: '4 hours',
        icon: '🔑',
        heroImg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
        color: '#2f9e44',
        description: 'Professional end of tenancy cleaning that meets every letting agency checklist — helping you secure your full deposit back. We know exactly what landlords and agents inspect, and we deliver the standard they require.',
        features: [
            'Full agency checklist compliance',
            'Carpets, upholstery & curtains',
            'Oven, fridge & all appliances',
            'Walls, skirting boards & switches',
            'Windows (internal) & tracks',
            'Deposit-back guarantee',
        ],
        faqs: [
            { q: 'How much does end of tenancy cleaning cost in {area}?', a: 'End of tenancy cleaning starts from £27/hr with a 4-hour minimum in {area}. A 1-bed flat typically takes 4–5 hours (£108–£135). A 3-bed house takes 6–8 hours (£162–£216). We quote accurately before booking.' },
            { q: 'Will this guarantee my deposit back?', a: 'We clean to full letting agency standard and stand behind our work. If your agent raises a specific issue after the clean, we\'ll return to address it at no extra charge.' },
            { q: 'Do you provide a receipt or certificate for the agency?', a: 'Yes, we provide a dated invoice that confirms a professional clean was carried out — accepted by all major letting agencies.' },
            { q: 'How quickly can you clean before my checkout?', a: 'We can often accommodate same-week bookings in {area}. Contact us as early as possible and we\'ll do our best to fit your checkout date.' },
        ],
        schema: 'HouseCleaningService',
        priceRange: '£108–£216',
    },
    {
        slug: 'commercial-cleaning',
        name: 'Commercial Cleaning',
        tagline: 'Flexible contracts for businesses',
        rateFrom: '£21/hr',
        minHrs: 'Custom',
        icon: '🏢',
        heroImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80',
        color: '#1a3352',
        description: 'Reliable commercial cleaning contracts tailored to your business — offices, retail, hospitality, and more. We work around your hours so there\'s zero disruption to your operations, and assign a dedicated team who know your premises.',
        features: [
            'Daily, weekly or bespoke schedules',
            'After-hours & weekend availability',
            'Offices, retail, hospitality & warehouses',
            'Dedicated account manager',
            'Communal areas & shared facilities',
            'Fully insured & vetted staff',
        ],
        faqs: [
            { q: 'How much does commercial cleaning cost in {area}?', a: 'Commercial cleaning is priced by the size, frequency and type of your premises. We quote individually for each business — contact us for a tailored price.' },
            { q: 'Can you clean out of business hours?', a: 'Yes, most of our commercial clients prefer evening or early-morning cleans. We\'re flexible around your business hours.' },
            { q: 'Do you offer flexible contracts?', a: 'We offer rolling monthly contracts with no long tie-in. We\'re confident in our service — you won\'t want to leave, but you\'re never locked in.' },
            { q: 'What types of commercial premises do you cover in {area}?', a: 'Offices, retail units, restaurants, cafes, salons, medical practices, gyms, warehouses, and more. If you have a commercial premises in {area}, we can help.' },
        ],
        schema: 'CommercialCleaningService',
        priceRange: '££',
    },
    {
        slug: 'airbnb-cleaning',
        name: 'Airbnb Cleaning',
        tagline: 'Fast turnovers for short-let hosts',
        rateFrom: '£27/hr',
        minHrs: '3 hours',
        icon: '🏡',
        heroImg: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1600&q=80',
        color: '#1c7ed6',
        description: 'Professional Airbnb and short-let cleaning built around your check-in and check-out times. We handle the complete guest turnover — cleaning, linen change, restocking, and photo reporting — so your property hits 5-star standard every time. Whether you manage your property remotely or in person, our after-clean photos give you full visibility of every turnover.',
        features: [
            'Full 5-star turnover clean in 3 hours or under',
            'Linen change & hotel-fold fresh towel sets',
            'Before & after photos sent direct to host',
            'Restock toiletries, toilet roll & essentials',
            '7-day availability — early morning & late slots',
            'Same-day bookings accepted',
            'Eco-friendly products — safe for guests & children',
            'Damage & maintenance issue reporting',
        ],
        faqs: [
            { q: 'How much does Airbnb cleaning cost in {area}?', a: 'Our Airbnb turnover cleaning starts from £27/hr with a 3-hour minimum in {area}. A studio or 1-bed flat typically takes 3 hours (£81). A 2-bed takes around 3–4 hours (£81–£108). We quote clearly before booking — no hidden charges.' },
            { q: 'Can you do same-day turnovers in {area}?', a: 'Yes. We accept same-day bookings in {area} where availability allows. We recommend contacting us as early as possible — but if you have a last-minute guest check-in, reach out and we\'ll do our best to accommodate.' },
            { q: 'Do you change linen and towels between guests?', a: 'Yes. We provide a full linen change service — stripping beds, remaking with fresh linen, and replacing towel sets. You can either supply your own linen or ask us about our linen hire service.' },
            { q: 'How do you handle key access in {area}?', a: 'We work with key safes, lock boxes, concierge handovers, or direct handoff — whatever suits your property setup in {area}. We\'re experienced with all common access methods used by London Airbnb hosts.' },
            { q: 'Do you send photos after the clean?', a: 'Yes. We send before-and-after photos directly to you after every turnover so you can verify the standard from anywhere. This also gives you a record of property condition at check-out — useful if any damage disputes arise.' },
        ],
        schema: 'HouseCleaningService',
        priceRange: '£81–£162',
    },
    {
        slug: 'cleaning-services',
        name: 'Cleaning Services',
        tagline: 'Professional cleaning for homes & businesses',
        rateFrom: '£21/hr',
        minHrs: '2 hours',
        icon: '🧹',
        heroImg: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80',
        color: '#1c7ed6',
        description: 'DS Cleaners provides professional cleaning services for homes and businesses across London. From regular domestic cleaning to full commercial contracts — all delivered to the same high standard by a trusted, family-owned team.',
        features: [
            'Domestic & commercial cleaning',
            'Standard, deep clean & end of tenancy',
            'Flexible scheduling 7 days a week',
            'Fully insured & vetted staff',
            'Eco-friendly professional products',
            '15+ years experience across London',
        ],
        faqs: [
            { q: 'What cleaning services do you offer in {area}?', a: 'We offer domestic cleaning, deep cleaning, end of tenancy cleaning, and commercial cleaning across {area}. All services are carried out by our vetted, insured team to a consistently high standard.' },
            { q: 'How much do cleaning services cost in {area}?', a: 'Domestic and commercial cleaning starts from £21/hr. Deep cleaning and end of tenancy starts from £27/hr with a 4-hour minimum. Use the price calculator on our main site for an instant estimate.' },
            { q: 'Are you insured?', a: 'Yes. DS Cleaners is fully insured and all staff are vetted and reference-checked before joining the team.' },
            { q: 'How do I book a clean in {area}?', a: 'Fill in the quote form on this page or call us directly. We respond to every enquiry within 24 hours with clear pricing and availability.' },
        ],
        schema: 'HouseCleaningService',
        priceRange: '£42–£216',
    },
];

const REVIEW_POOLS = {
    'domestic-cleaning': [
        { text: '"Very happy with our service today from our two cleaners, house is spotless and both the team friendly and easy going. Will definitely recommend."', author: 'Shannon P.', sub: 'Verified Google Review' },
        { text: '"An excellent cleaning service — very pleasant, thorough and professional. Highly recommended."', author: 'Richard B.', sub: 'Verified Google Review' },
        { text: '"Great service, amazing staff and very professional. Highly recommend."', author: 'Nour E.', sub: 'Verified Google Review' },
    ],
    'deep-cleaning': [
        { text: '"Worth every penny for amazing deep cleaning!"', author: 'Drake', sub: 'Verified Google Review' },
        { text: '"Absolutely thrilled with the service. From start to finish, they provided exceptional cleaning."', author: 'Joshua J.', sub: 'Verified Google Review' },
        { text: '"Amazing service! Quick, professional and reliable."', author: 'Kiera', sub: 'Verified Google Review' },
    ],
    'end-of-tenancy-cleaning': [
        { text: '"Fantastic service in every way. I would highly recommend. Excellent cleaners and really good admin!"', author: 'Chavi B.', sub: 'Verified Google Review' },
        { text: '"Happy with the quality of the service. Timing and overall communication was great too."', author: 'Mohamad E.', sub: 'Verified Google Review' },
        { text: '"An excellent cleaning service — very pleasant, thorough and professional. Highly recommended."', author: 'Richard B.', sub: 'Verified Google Review' },
    ],
    'commercial-cleaning': [
        { text: '"An excellent cleaning service — very pleasant, thorough and professional. Highly recommended."', author: 'Richard B.', sub: 'Verified Google Review' },
        { text: '"Great service, amazing staff and very professional. Highly recommend."', author: 'Nour E.', sub: 'Verified Google Review' },
        { text: '"Happy with the quality of the service. Timing and overall communication was great too."', author: 'Mohamad E.', sub: 'Verified Google Review' },
    ],
    'cleaning-services': [
        { text: '"Amazing service! Quick, professional and reliable."', author: 'Kiera', sub: 'Verified Google Review' },
        { text: '"Fantastic service in every way. I would highly recommend. Excellent cleaners and really good admin!"', author: 'Chavi B.', sub: 'Verified Google Review' },
        { text: '"Worth every penny for amazing deep cleaning!"', author: 'Drake', sub: 'Verified Google Review' },
    ],
    'airbnb-cleaning': [
        { text: '"Amazing service! Quick, professional and reliable."', author: 'Kiera', sub: 'Verified Google Review' },
        { text: '"Worth every penny for amazing deep cleaning!"', author: 'Drake', sub: 'Verified Google Review' },
        { text: '"Fantastic service in every way. I would highly recommend. Excellent cleaners and really good admin!"', author: 'Chavi B.', sub: 'Verified Google Review' },
    ],
};

function buildPage(service, area) {
    const title = area.slug === 'london'
        ? `${service.name} London | DS Cleaners`
        : `${service.name} ${area.name} | DS Cleaners`;

    const h1 = area.slug === 'london'
        ? `${service.name} in London`
        : `${service.name} in ${area.name}`;

    const metaDesc = `Professional ${service.name.toLowerCase()} in ${area.name}. DS Cleaners — family-owned, 15+ years experience, fully insured. From ${service.rateFrom}. Free quote within 24 hours.`;

    const canonicalSlug = `${service.slug}-${area.slug}.html`;

    const faqs = service.faqs.map(f => ({
        q: f.q.replace(/\{area\}/g, area.name),
        a: f.a.replace(/\{area\}/g, area.name),
    }));

    const faqSchema = faqs.map(f => `{
          "@type": "Question",
          "name": "${f.q.replace(/"/g, '\\"')}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "${f.a.replace(/"/g, '\\"')}"
          }
        }`).join(',\n        ');

    const faqHtml = faqs.map((f, i) => `
            <div class="faq-item" id="fq${i}">
              <button class="faq-q" onclick="toggleFaq(${i})">
                ${f.q}
                <div class="faq-icon">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                </div>
              </button>
              <div class="faq-a">${f.a}</div>
            </div>`).join('');

    const featuresHtml = service.features.map(f => `
              <div class="feat-row">
                <div class="feat-check">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5L4.5 8L9 3" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <span>${f}</span>
              </div>`).join('');

    const reviewPool = REVIEW_POOLS[service.slug] || REVIEW_POOLS['domestic-cleaning'];
    const star13 = '<svg width="13" height="13" viewBox="0 0 14 14"><path d="M7 1L8.4 5H13L9.3 7.6L10.7 11.5L7 9L3.3 11.5L4.7 7.6L1 5H5.6L7 1Z" fill="#fcc419"/></svg>';
    const stars5 = star13.repeat(5);
    const reviewsHtml = reviewPool.map(r =>
        '<div class="review-mini"><div class="review-stars">' + stars5 + '</div><p class="review-text">' + r.text + '</p><div class="review-author">' + r.author + '</div><div class="review-sub">' + r.sub + '</div></div>'
    ).join('');

    const ogImage = service.heroImg.replace('w=1600', 'w=1200').replace('q=80', 'h=630&fit=crop&q=80');

    const relatedServices = SERVICES.filter(s =>
        s.slug !== service.slug &&
        !(s.slug === 'cleaning-services' && area.slug !== 'london')
    );
    const relatedLinksHtml = relatedServices.map(s =>
        `<a href="${BRAND.domain}/landing/${s.slug}-${area.slug}.html" class="rel-svc-link">` +
        `<span class="rel-svc-name">${s.name}</span>` +
        `<span class="rel-svc-from">From ${s.rateFrom}</span></a>`
    ).join('');

    const breadcrumbItems = area.slug === 'london'
        ? JSON.stringify([
            { '@type': 'ListItem', position: 1, name: 'Home', item: BRAND.domain },
            { '@type': 'ListItem', position: 2, name: service.name + ' in London', item: BRAND.domain + '/landing/' + canonicalSlug },
          ])
        : JSON.stringify([
            { '@type': 'ListItem', position: 1, name: 'Home', item: BRAND.domain },
            { '@type': 'ListItem', position: 2, name: service.name + ' in London', item: BRAND.domain + '/landing/' + service.slug + '-london.html' },
            { '@type': 'ListItem', position: 3, name: service.name + ' in ' + area.name, item: BRAND.domain + '/landing/' + canonicalSlug },
          ]);

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${title}</title>
<meta name="description" content="${metaDesc}"/>
<meta name="keywords" content="${service.name.toLowerCase()} ${area.name}, ${service.name.toLowerCase()} ${area.short}, cleaning services ${area.name}, DS Cleaners ${area.name}, professional cleaners ${area.short}"/>
<meta name="robots" content="index, follow"/>
<meta property="og:title" content="${title}"/>
<meta property="og:description" content="${metaDesc}"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="${BRAND.domain}/landing/${canonicalSlug}"/>
<meta property="og:image" content="${ogImage}"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<link rel="canonical" href="${BRAND.domain}/landing/${canonicalSlug}"/>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "${BRAND.name}",
      "url": "${BRAND.domain}",
      "telephone": "${BRAND.phone}",
      "email": "${BRAND.email}",
      "foundingDate": "${BRAND.founded}",
      "description": "Family-owned professional cleaning company with 15+ years experience in commercial and domestic cleaning across London.",
      "areaServed": "${area.name}",
      "priceRange": "${service.priceRange}",
      "serviceType": "${service.name}",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "9",
        "bestRating": "5"
      }
    },
    {
      "@type": "Service",
      "name": "${service.name} in ${area.name}",
      "serviceType": "${service.name}",
      "provider": {"@type":"LocalBusiness","name":"${BRAND.name}","url":"${BRAND.domain}"},
      "areaServed": "${area.name}",
      "description": "${service.description.replace(/"/g, '\\"')}"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": ${breadcrumbItems}
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        ${faqSchema}
      ]
    }
  ]
}
</script>

<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>

<style>
:root {
  --navy:#0c1e35;--navy-light:#1a3352;--blue:#1c7ed6;--blue-hover:#1971c2;
  --blue-pale:#e8f3fd;--blue-paler:#f4f9fe;--white:#fff;
  --grey-50:#f8f9fa;--grey-100:#f1f3f5;--grey-200:#e9ecef;
  --grey-300:#dee2e6;--grey-400:#ced4da;--grey-600:#6c757d;
  --grey-700:#495057;--grey-900:#212529;--green:#2f9e44;
  --accent:${service.color};
  --ff:'Plus Jakarta Sans',sans-serif;
  --radius:10px;--radius-lg:16px;
  --shadow:0 4px 20px rgba(0,0,0,.09);--shadow-lg:0 12px 48px rgba(0,0,0,.13);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--ff);color:var(--grey-900);background:var(--white);-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit;text-decoration:none}ul{list-style:none}
button{font-family:var(--ff);cursor:pointer}

/* NAV */
nav{position:sticky;top:0;z-index:100;height:64px;background:rgba(255,255,255,.97);backdrop-filter:blur(16px);border-bottom:1px solid var(--grey-200);display:flex;align-items:center;justify-content:space-between;padding:0 5%}
.logo{display:flex;align-items:center;gap:10px;text-decoration:none}
.logo-icon{width:34px;height:34px;background:var(--navy);border-radius:8px;display:flex;align-items:center;justify-content:center}
.logo-text{font-size:1.05rem;font-weight:800;color:var(--navy);letter-spacing:-.02em}
.logo-text span{color:var(--blue)}
.nav-cta{background:var(--blue);color:var(--white);font-weight:700;font-size:.85rem;padding:9px 20px;border-radius:8px;border:none;transition:background .2s}
.nav-cta:hover{background:var(--blue-hover)}
.nav-home{background:none;border:none;font-size:.85rem;font-weight:600;color:var(--grey-700);padding:8px 14px;border-radius:7px;transition:background .2s}
.nav-home:hover{background:var(--grey-100)}

/* HERO */
.hero{position:relative;min-height:78vh;display:flex;align-items:center;overflow:hidden;background:var(--navy)}
.hero-bg{position:absolute;inset:0;background:linear-gradient(105deg,rgba(12,30,53,.93) 0%,rgba(12,30,53,.72) 50%,rgba(12,30,53,.3) 100%),url('${service.heroImg}') center/cover no-repeat}
.hero-inner{position:relative;z-index:2;max-width:1160px;margin:0 auto;padding:88px 5% 72px;width:100%}
.hero-badge{display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.8);font-size:.72rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase;padding:5px 14px;border-radius:50px;margin-bottom:24px}
.hero-badge-dot{width:6px;height:6px;background:#4ade80;border-radius:50%}
.hero-h1{font-size:clamp(2.4rem,5vw,3.8rem);font-weight:800;color:var(--white);line-height:1.07;letter-spacing:-.03em;max-width:700px;margin-bottom:20px}
.hero-h1 em{color:${service.color === '#1c7ed6' ? '#60bdff' : service.color === '#2f9e44' ? '#51cf66' : '#90b8ff'};font-style:normal}
.hero-sub{font-size:1.05rem;color:rgba(255,255,255,.6);line-height:1.78;max-width:520px;margin-bottom:36px}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:52px}
.btn-primary{display:inline-flex;align-items:center;gap:8px;background:var(--blue);color:var(--white);font-weight:700;font-size:.95rem;padding:14px 28px;border-radius:var(--radius);border:none;transition:background .2s,transform .15s,box-shadow .2s;cursor:pointer}
.btn-primary:hover{background:var(--blue-hover);transform:translateY(-1px);box-shadow:0 6px 20px rgba(28,126,214,.35)}
.btn-ghost{display:inline-flex;align-items:center;gap:8px;background:transparent;color:var(--white);font-weight:600;font-size:.92rem;padding:13px 22px;border-radius:var(--radius);border:1.5px solid rgba(255,255,255,.28);transition:border-color .2s;cursor:pointer}
.btn-ghost:hover{border-color:rgba(255,255,255,.65)}
.hero-trust{display:flex;align-items:center;gap:24px;flex-wrap:wrap}
.trust-pill{display:flex;align-items:center;gap:7px;color:rgba(255,255,255,.55);font-size:.8rem;font-weight:500}
.trust-dot{width:5px;height:5px;background:#4ade80;border-radius:50%}
.hero-rate{display:inline-flex;align-items:center;gap:10px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:12px 18px;margin-bottom:28px}
.hero-rate-num{font-size:1.6rem;font-weight:800;color:var(--white);letter-spacing:-.03em;line-height:1}
.hero-rate-label{font-size:.75rem;color:rgba(255,255,255,.5);line-height:1.4}

/* TRUST BAR */
.trust-bar{background:var(--grey-50);border-bottom:1px solid var(--grey-200);padding:18px 5%}
.trust-bar-inner{max-width:1160px;margin:0 auto;display:flex;align-items:center;justify-content:center;gap:40px;flex-wrap:wrap}
.tb-item{display:flex;align-items:center;gap:8px;font-size:.8rem;font-weight:600;color:var(--grey-700)}
.tb-check{width:17px;height:17px;background:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}

/* MAIN LAYOUT */
.main{max-width:1160px;margin:0 auto;padding:72px 5%;display:grid;grid-template-columns:1fr 380px;gap:56px;align-items:start}

/* LEFT CONTENT */
.section-label{font-size:.7rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--blue);margin-bottom:10px}
.section-h2{font-size:clamp(1.7rem,3vw,2.4rem);font-weight:800;color:var(--navy);letter-spacing:-.025em;line-height:1.12;margin-bottom:14px}
.section-body{font-size:.97rem;color:var(--grey-600);line-height:1.82}

.features-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:28px}
.feat-row{display:flex;align-items:flex-start;gap:10px;background:var(--grey-50);border:1px solid var(--grey-200);border-radius:9px;padding:12px 14px;font-size:.86rem;color:var(--grey-700);font-weight:500;transition:border-color .2s}
.feat-row:hover{border-color:var(--blue)}
.feat-check{width:20px;height:20px;background:var(--navy);border-radius:5px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}

.why-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:36px}
.why-card{background:var(--white);border:1px solid var(--grey-200);border-radius:var(--radius-lg);padding:22px;transition:border-color .2s,box-shadow .2s}
.why-card:hover{border-color:var(--blue);box-shadow:var(--shadow)}
.why-icon{width:38px;height:38px;background:var(--grey-50);border:1px solid var(--grey-200);border-radius:9px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;font-size:1.1rem}
.why-title{font-size:.9rem;font-weight:700;color:var(--navy);margin-bottom:5px}
.why-text{font-size:.82rem;color:var(--grey-600);line-height:1.65}

.area-box{background:var(--grey-50);border:1px solid var(--grey-200);border-radius:var(--radius-lg);padding:26px;margin-top:36px}
.area-box h3{font-size:.9rem;font-weight:800;color:var(--navy);margin-bottom:8px}
.area-box p{font-size:.85rem;color:var(--grey-600);line-height:1.7;margin-bottom:12px}
.postcodes{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.pc-tag{background:var(--white);border:1px solid var(--grey-300);border-radius:5px;padding:3px 9px;font-size:.75rem;font-weight:700;color:var(--navy)}

/* FAQ */
.faq-list{margin-top:36px}
.faq-item{border-bottom:1px solid var(--grey-200)}
.faq-q{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px 0;cursor:pointer;font-size:.93rem;font-weight:600;color:var(--navy);background:none;border:none;width:100%;text-align:left;transition:color .15s}
.faq-q:hover{color:var(--blue)}
.faq-icon{width:26px;height:26px;border-radius:50%;background:var(--grey-100);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s,transform .25s;color:var(--grey-700)}
.faq-item.open .faq-icon{background:var(--blue);color:var(--white);transform:rotate(45deg)}
.faq-a{display:none;padding-bottom:18px;font-size:.88rem;color:var(--grey-600);line-height:1.8}
.faq-item.open .faq-a{display:block}

/* RIGHT: QUOTE FORM */
.quote-card{background:var(--white);border:1px solid var(--grey-200);border-radius:var(--radius-lg);padding:28px;box-shadow:var(--shadow-lg);position:sticky;top:80px}
.quote-card-title{font-size:1.1rem;font-weight:800;color:var(--navy);margin-bottom:4px}
.quote-card-sub{font-size:.82rem;color:var(--grey-600);margin-bottom:22px}
.form-divider{height:1px;background:var(--grey-100);margin:18px 0}
.f-g{margin-bottom:14px}
.f-g label{display:block;font-size:.76rem;font-weight:700;color:var(--grey-700);margin-bottom:5px;letter-spacing:.01em}
.f-g label em{color:var(--blue);font-style:normal}
.f-g input,.f-g select,.f-g textarea{width:100%;padding:10px 13px;background:var(--grey-50);border:1.5px solid var(--grey-200);border-radius:8px;font-family:var(--ff);font-size:.88rem;color:var(--grey-900);outline:none;transition:border-color .18s;appearance:none}
.f-g input:focus,.f-g select:focus,.f-g textarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(28,126,214,.11);background:var(--white)}
.f-g textarea{resize:vertical;min-height:84px}
.f-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.f-submit{width:100%;background:var(--blue);color:var(--white);font-family:var(--ff);font-weight:700;font-size:.95rem;padding:13px;border-radius:9px;border:none;cursor:pointer;transition:background .2s,transform .15s,box-shadow .2s;margin-top:4px}
.f-submit:hover{background:var(--blue-hover);transform:translateY(-1px);box-shadow:0 5px 16px rgba(28,126,214,.3)}
.f-note{text-align:center;font-size:.72rem;color:var(--grey-400);margin-top:10px}
.form-success{display:none;text-align:center;padding:36px 12px}
.form-success-icon{width:56px;height:56px;background:#d3f9d8;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
.form-success h3{font-size:1.1rem;font-weight:800;color:var(--navy);margin-bottom:6px}
.form-success p{font-size:.85rem;color:var(--grey-600);line-height:1.7}
.rate-badge{background:var(--grey-50);border:1px solid var(--grey-200);border-radius:9px;padding:12px 14px;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between}
.rate-label{font-size:.75rem;color:var(--grey-600);font-weight:500}
.rate-val{font-size:1rem;font-weight:800;color:var(--navy)}

/* SOCIAL PROOF */
.reviews-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:52px}
.review-mini{background:var(--white);border:1px solid var(--grey-200);border-radius:var(--radius-lg);padding:20px}
.review-stars{display:flex;gap:2px;margin-bottom:10px}
.review-text{font-size:.83rem;color:var(--grey-700);line-height:1.7;margin-bottom:14px}
.review-author{font-size:.78rem;font-weight:700;color:var(--navy)}
.review-sub{font-size:.72rem;color:var(--grey-600)}

/* FOOTER */
footer{background:var(--navy);padding:40px 5% 24px;margin-top:80px}
.footer-inner{max-width:1160px;margin:0 auto;display:flex;align-items:flex-start;justify-content:space-between;gap:40px;flex-wrap:wrap;padding-bottom:28px;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:20px}
.footer-brand p{font-size:.83rem;color:rgba(255,255,255,.4);line-height:1.7;max-width:240px;margin-top:10px}
.footer-links{display:flex;flex-direction:column;gap:8px}
.footer-links a{font-size:.85rem;color:rgba(255,255,255,.5);transition:color .15s}
.footer-links a:hover{color:var(--white)}
.footer-links h4{font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.25);margin-bottom:6px}
.footer-bottom{max-width:1160px;margin:0 auto;display:flex;justify-content:space-between;font-size:.75rem;color:rgba(255,255,255,.3);flex-wrap:wrap;gap:6px}

/* RESPONSIVE */
.rel-svcs{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px}
.rel-svc-link{display:block;background:var(--grey-50);border:1px solid var(--grey-200);border-radius:var(--radius);padding:14px 16px;transition:border-color .2s,box-shadow .2s}
.rel-svc-link:hover{border-color:var(--blue);box-shadow:var(--shadow)}
.rel-svc-name{display:block;font-size:.88rem;font-weight:700;color:var(--navy);margin-bottom:3px}
.rel-svc-from{display:block;font-size:.75rem;color:var(--grey-600)}
@media(max-width:900px){.main{grid-template-columns:1fr}.quote-card{position:static}}
@media(max-width:640px){.hero-h1{font-size:2.2rem}.features-grid{grid-template-columns:1fr}.why-grid{grid-template-columns:1fr}.reviews-strip{grid-template-columns:1fr}.rel-svcs{grid-template-columns:1fr 1fr}.trust-bar-inner{gap:18px}.f-row{grid-template-columns:1fr}}
</style>
</head>
<body>

<nav>
  <a class="logo" href="${BRAND.domain}">
    <div class="logo-icon"><svg width="17" height="17" viewBox="0 0 18 18" fill="none"><path d="M9 1.5L15.5 5.25V12.75L9 16.5L2.5 12.75V5.25L9 1.5Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 5.5L12 7.5V11.5L9 13.5L6 11.5V7.5L9 5.5Z" fill="white" fill-opacity=".25"/></svg></div>
    <div class="logo-text">DS<span>Cleaners</span></div>
  </a>
  <div style="display:flex;align-items:center;gap:8px">
    <a href="${BRAND.domain}" class="nav-home">All Services</a>
    <a href="#quote-form" class="nav-cta">Get a Free Quote</a>
  </div>
</nav>

<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-inner">
    <div class="hero-badge"><div class="hero-badge-dot"></div>${area.name} &middot; 15+ Years Experience</div>
    <h1 class="hero-h1"><em>${service.name}</em><br>in ${area.name}</h1>
    <p class="hero-sub">${service.description}</p>
    <div class="hero-rate">
      <div><div class="hero-rate-num">From ${service.rateFrom}</div><div class="hero-rate-label">${service.minHrs === 'Custom' ? 'Tailored quote' : 'Minimum ' + service.minHrs}</div></div>
    </div>
    <div class="hero-btns">
      <a href="#quote-form" class="btn-primary">Get a Free Quote</a>
      <a href="tel:${BRAND.phone.replace(/\s/g, '')}" class="btn-ghost">&#128222; Call Now</a>
    </div>
    <div class="hero-trust">
      <div class="trust-pill"><div class="trust-dot"></div>Fully insured</div>
      <div class="trust-pill"><div class="trust-dot"></div>Vetted staff</div>
      <div class="trust-pill"><div class="trust-dot"></div>24hr response</div>
      <div class="trust-pill"><div class="trust-dot"></div>No hidden fees</div>
    </div>
  </div>
</section>

<div class="trust-bar"><div class="trust-bar-inner">
  <div class="tb-item"><div class="tb-check"><svg width="9" height="9" viewBox="0 0 9 9"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>15+ years experience</div>
  <div class="tb-item"><div class="tb-check"><svg width="9" height="9" viewBox="0 0 9 9"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Eco-friendly products</div>
  <div class="tb-item"><div class="tb-check"><svg width="9" height="9" viewBox="0 0 9 9"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Family-owned business</div>
  <div class="tb-item"><div class="tb-check"><svg width="9" height="9" viewBox="0 0 9 9"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Free quote in 24 hours</div>
  <div class="tb-item"><div class="tb-check"><svg width="9" height="9" viewBox="0 0 9 9"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>500+ satisfied clients</div>
</div></div>

<div class="main">
  <!-- LEFT -->
  <div>
    <div class="section-label">Our service</div>
    <h2 class="section-h2">${service.name} in ${area.name}</h2>
    <p class="section-body">${service.description} ${area.desc}</p>

    <div class="features-grid">${featuresHtml}</div>

    <div style="margin-top:52px">
      <div class="section-label">Why choose us</div>
      <h2 class="section-h2" style="font-size:1.8rem">Why ${area.name} trusts DS Cleaners</h2>
      <div class="why-grid">
        <div class="why-card"><div class="why-icon">&#127942;</div><div class="why-title">15+ Years Experience</div><p class="why-text">A trusted name in ${area.name} cleaning since 2009. We know what works and we deliver it every time.</p></div>
        <div class="why-card"><div class="why-icon">&#128737;</div><div class="why-title">Fully Insured</div><p class="why-text">Every member of our team is background-checked, reference-verified, and covered by full public liability insurance.</p></div>
        <div class="why-card"><div class="why-icon">&#127807;</div><div class="why-title">Eco-Friendly</div><p class="why-text">We use safe, environmentally responsible cleaning products — effective for your home, kind to the planet.</p></div>
        <div class="why-card"><div class="why-icon">&#128176;</div><div class="why-title">Transparent Pricing</div><p class="why-text">No hidden fees. We quote clearly before we start — what we say is what you pay, every single time.</p></div>
      </div>
    </div>

    <div class="area-box">
      <h3>Areas we cover in ${area.name}</h3>
      <p>${area.desc}</p>
      <p style="font-size:.82rem;font-weight:700;color:var(--navy);margin-bottom:8px">Postcodes covered:</p>
      <div class="postcodes">${area.postcodes.split(', ').map(pc => `<span class="pc-tag">${pc}</span>`).join('')}</div>
      <p style="font-size:.82rem;color:var(--grey-600);margin-top:14px">Key neighbourhoods: <strong>${area.neighbourhoods}</strong></p>
    </div>

    <div style="margin-top:52px">
      <div class="section-label">What clients say</div>
      <h2 class="section-h2" style="font-size:1.8rem">Trusted by ${area.name} homes &amp; businesses</h2>
      <div class="reviews-strip">
        ${reviewsHtml}
      </div>
    </div>

    <div style="margin-top:52px">
      <div class="section-label">Also available in ${area.name}</div>
      <h2 class="section-h2" style="font-size:1.8rem">Other services in ${area.name}</h2>
      <div class="rel-svcs">${relatedLinksHtml}</div>
    </div>

    <div style="margin-top:52px">
      <div class="section-label">FAQ</div>
      <h2 class="section-h2" style="font-size:1.8rem">Common questions about ${service.name.toLowerCase()} in ${area.name}</h2>
      <div class="faq-list">${faqHtml}</div>
    </div>
  </div>

  <!-- RIGHT: QUOTE FORM -->
  <div id="quote-form">
    <div class="quote-card">
      <div class="rate-badge">
        <span class="rate-label">Starting from</span>
        <span class="rate-val">${service.rateFrom}${service.minHrs !== 'Custom' ? ' &middot; ' + service.minHrs + ' min' : ''}</span>
      </div>
      <div class="quote-card-title">Get a Free Quote</div>
      <p class="quote-card-sub">We respond within 24 hours with clear pricing.</p>
      <div id="formContent">
        <form id="quoteForm" action="https://formspree.io/f/maqkaryk" method="POST" onsubmit="submitForm(event)">
          <input type="hidden" name="_subject" value="Quote Request — ${service.name} ${area.name}"/>
          <input type="hidden" name="service" value="${service.name}"/>
          <input type="hidden" name="area" value="${area.name}"/>
          <div class="f-row">
            <div class="f-g"><label>First Name <em>*</em></label><input type="text" name="first_name" placeholder="John" required/></div>
            <div class="f-g"><label>Last Name <em>*</em></label><input type="text" name="last_name" placeholder="Smith" required/></div>
          </div>
          <div class="f-g"><label>Email <em>*</em></label><input type="email" name="email" placeholder="john@email.com" required/></div>
          <div class="f-g"><label>Phone</label><input type="tel" name="phone" placeholder="+44 7765 875615"/></div>
          <div class="f-g"><label>Postcode <em>*</em></label><input type="text" name="postcode" placeholder="e.g. SW11 4NG" required/></div>
          <div class="f-g"><label>Message</label><textarea name="message" placeholder="Property size, preferred dates, any special requirements..."></textarea></div>
          <input type="text" name="_gotcha" style="display:none"/>
          <button type="submit" class="f-submit" id="submitBtn">Send Quote Request</button>
          <p class="f-note">No obligation &middot; Reply within 24hrs &middot; Details never shared</p>
        </form>
      </div>
      <div class="form-success" id="formSuccess">
        <div class="form-success-icon"><svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M5 13L10 18L21 8" stroke="#2f9e44" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <h3>Quote Request Sent!</h3>
        <p>We'll be in touch within 24 hours with clear pricing and availability for ${area.name}.</p>
      </div>
    </div>
  </div>
</div>

<footer>
  <div class="footer-inner">
    <div class="footer-brand">
      <div class="logo"><div class="logo-icon"><svg width="17" height="17" viewBox="0 0 18 18" fill="none"><path d="M9 1.5L15.5 5.25V12.75L9 16.5L2.5 12.75V5.25L9 1.5Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/></svg></div><div class="logo-text" style="color:white">DS<span>Cleaners</span></div></div>
      <p>Family-owned professional cleaning across London. Trusted since 2009.</p>
    </div>
    <div>
      <div class="footer-links">
        <h4>Services</h4>
        <a href="${BRAND.domain}/landing/domestic-cleaning-london.html">Domestic Cleaning London</a>
        <a href="${BRAND.domain}/landing/deep-cleaning-london.html">Deep Cleaning London</a>
        <a href="${BRAND.domain}/landing/end-of-tenancy-cleaning-london.html">End of Tenancy London</a>
        <a href="${BRAND.domain}/landing/commercial-cleaning-london.html">Commercial Cleaning London</a>
      </div>
    </div>
    <div>
      <div class="footer-links">
        <h4>Areas</h4>
        <a href="${BRAND.domain}/landing/domestic-cleaning-south-west-london.html">South West London</a>
        <a href="${BRAND.domain}/landing/domestic-cleaning-south-east-london.html">South East London</a>
        <a href="${BRAND.domain}/landing/cleaning-services-london.html">London</a>
        <a href="${BRAND.domain}">DS Cleaners Home</a>
      </div>
    </div>
    <div>
      <div class="footer-links">
        <h4>Blog &amp; Guides</h4>
        <a href="${BRAND.domain}/blog/end-of-tenancy-cleaning-checklist-london.html">End of Tenancy Checklist</a>
        <a href="${BRAND.domain}/blog/deep-clean-vs-regular-clean.html">Deep Clean vs Regular Clean</a>
        <a href="${BRAND.domain}/blog/how-to-get-your-deposit-back-end-of-tenancy.html">Get Your Deposit Back</a>
        <a href="${BRAND.domain}/blog/">All Guides</a>
      </div>
    </div>
    <div>
      <div class="footer-links">
        <h4>Contact</h4>
        <a href="tel:${BRAND.phone.replace(/\s/g, '')}">${BRAND.phone}</a>
        <a href="mailto:${BRAND.email}">${BRAND.email}</a>
        <a>Mon–Sat: 8am–6pm</a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <span>&copy; 2026 DS Cleaners. All rights reserved.</span>
    <span>${service.name} &middot; ${area.name}</span>
  </div>
</footer>

<script>
async function submitForm(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Sending...'; btn.disabled = true;
  try {
    const r = await fetch(e.target.action, {method:'POST', body:new FormData(e.target), headers:{Accept:'application/json'}});
    if (r.ok) {
      document.getElementById('formContent').style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    } else {
      btn.textContent = 'Send Quote Request'; btn.disabled = false;
      alert('Something went wrong. Please try again.');
    }
  } catch {
    btn.textContent = 'Send Quote Request'; btn.disabled = false;
    alert('Network error. Please try again.');
  }
}
function toggleFaq(i) { document.getElementById('fq'+i).classList.toggle('open'); }
</script>
</body>
</html>`;
}

// Generate all pages
let count = 0;
const outDir = path.join(__dirname, 'landing');

// Ensure output directory exists
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

// Services × areas (excluding general hub × non-London)
for (const service of SERVICES) {
    for (const area of AREAS) {
        // General hub page only for London
        if (service.slug === 'cleaning-services' && area.slug !== 'london') continue;

        const filename = `${service.slug}-${area.slug}.html`;

        const html = buildPage(service, area);
        fs.writeFileSync(path.join(outDir, filename), html);
        console.log(`✓ ${filename}`);
        count++;
    }
}

console.log(`\n✅ Generated ${count} landing pages`);

// ─────────────────────────────────────────────
// BLOG GENERATOR
// ─────────────────────────────────────────────

const BLOG_POSTS = [
    {
        slug: 'end-of-tenancy-cleaning-checklist-london',
        title: 'End of Tenancy Cleaning Checklist London (2026) — Room by Room',
        metaTitle: 'End of Tenancy Cleaning Checklist London 2026 | DS Cleaners',
        metaDesc: 'A complete room-by-room end of tenancy cleaning checklist for London renters. Use it yourself or know exactly what to expect from a professional clean.',
        datePublished: '2025-01-15',
        category: 'End of Tenancy',
        readMins: 7,
        relatedServiceSlug: 'end-of-tenancy-cleaning',
        relatedServiceArea: 'london',
        intro: 'Deposits get withheld for one reason more than any other: cleaning. According to the <a href="https://www.tenancydepositscheme.com/is-my-deposit-protected/what-happens-when-a-tenancy-ends/" target="_blank" rel="noopener noreferrer">Tenancy Deposit Scheme</a>, cleaning disputes account for over 50% of all deposit deductions in England. In London, where rents — and therefore deposits — are among the highest in the country, getting this wrong is expensive. This checklist covers every room a letting agent will inspect. Use it yourself or to verify a professional job. See also our guide on <a href="https://dscleanersltd.com/blog/how-to-get-your-deposit-back-end-of-tenancy.html">how to get your full deposit back</a>.',
        sections: [
            {
                h2: 'Why Letting Agents Inspect So Thoroughly',
                body: 'Your tenancy agreement almost certainly includes a clause requiring you to return the property in the same condition it was handed over — fair wear and tear excepted. Letting agents use a check-out report that compares the property\'s current state against the check-in inventory, often with photographs. The standard is professional-grade: not "clean enough to live in" but "clean enough to relet immediately." That distinction matters.',
            },
            {
                h2: 'Kitchen Checklist',
                body: 'The kitchen is the most scrutinised room. Agents specifically check inside ovens, under hobs, and behind appliances — areas most tenants miss.',
                list: [
                    'Oven interior: degrease racks, cavity, glass door, and door seal',
                    'Hob: remove and clean burner caps and drip trays',
                    'Extractor fan: clean filters and outer housing',
                    'Fridge/freezer: defrost, wipe interior shelves and drawers, clean seals',
                    'Dishwasher: clean filter, wipe door seals, run empty cycle with cleaner',
                    'All cupboards: inside, outside, and door fronts (including hinges)',
                    'Sink and taps: descale, polish, clean around sealant edges',
                    'Walls and splashback: degrease any cooking splatter',
                    'Behind and underneath appliances if accessible',
                ],
            },
            {
                h2: 'Bathroom and Wet Room Checklist',
                body: 'Hard water in London means limescale builds up fast. Grout, shower heads, and taps must be descaled, not just wiped.',
                list: [
                    'Shower: descale head, clean screen or curtain, scrub tray and waste drain',
                    'Bath: remove limescale, clean taps, polish chrome',
                    'WC: inside the bowl (including under the rim), cistern top, seat and hinges',
                    'Sink: descale and polish basin and taps, clean pedestal',
                    'Tiles and grout: scrub with appropriate cleaner',
                    'Mirror: streak-free clean',
                    'Extractor fan: wipe grille',
                    'Sealant lines: remove any mould or mildew',
                ],
            },
            {
                h2: 'Bedrooms and Living Areas',
                body: 'These rooms look simpler but the details catch people out — especially window tracks and behind radiators.',
                list: [
                    'Carpets: professional hot-water extraction or equivalent deep clean',
                    'Hard floors: mop and remove any scuff marks',
                    'Skirting boards: wipe entire length including corners',
                    'Window sills, frames, and tracks (inside)',
                    'Light switches and plug sockets: wipe clean',
                    'Doors and door frames: remove fingerprints and scuffs',
                    'Wardrobe and storage interiors: wipe shelves, vacuum base',
                    'Radiators: clean between fins and top surface',
                    'Mirrors and glass: streak-free',
                    'Light fittings and shades: dust and wipe',
                ],
            },
            {
                h2: 'Hallway, Stairs, and Communal Areas',
                body: 'Often overlooked in the rush to clean individual rooms, these areas are among the first things seen on check-out.',
                list: [
                    'Staircase: hoover each step, wipe balustrades',
                    'Front door and letterbox: clean inside face and handles',
                    'Any storage cupboards: clear out and wipe down',
                    'Loft hatch or meter cupboard if applicable: dust and accessible surfaces clean',
                ],
            },
            {
                h2: 'Professional Clean vs DIY',
                body: 'A <a href="https://dscleanersltd.com/landing/end-of-tenancy-cleaning-london.html">professional end of tenancy clean</a> typically takes 4–8 hours for a 1–3 bed property and follows the same checklist above, documented with a dated invoice. Most letting agencies accept this as proof of professional cleaning, which removes their ability to charge for cleaning from your deposit. For a standard 1-bed flat in London, expect to pay £108–£135. Compare that to a deposit deduction, which agents typically calculate at full cleaning costs plus admin — often £200–£400. The maths usually favour booking a professional. DS Cleaners provides a dated invoice accepted by all major London letting agencies.',
            },
        ],
        cta: {
            heading: 'Need a Professional End of Tenancy Clean?',
            body: 'DS Cleaners covers all areas of London. We clean to full agency checklist standard and provide a dated invoice. Response within 24 hours.',
            label: 'Get a Free Quote',
        },
        sources: [
            { url: 'https://www.tenancydepositscheme.com/is-my-deposit-protected/what-happens-when-a-tenancy-ends/', label: 'Tenancy Deposit Scheme — What happens when a tenancy ends' },
            { url: 'https://www.gov.uk/tenancy-deposit-protection', label: 'UK Government — Tenancy deposit protection' },
            { url: 'https://dscleanersltd.com/blog/how-to-get-your-deposit-back-end-of-tenancy.html', label: 'DS Cleaners — How to get your full deposit back' },
        ],
    },
    {
        slug: 'deep-clean-vs-regular-clean',
        title: 'Deep Cleaning vs Regular Cleaning: What\'s the Difference?',
        metaTitle: 'Deep Cleaning vs Regular Cleaning: What\'s the Difference? | DS Cleaners',
        metaDesc: 'Understand exactly what separates a deep clean from a regular clean — and when you actually need each. Clear breakdown of scope, time, and cost.',
        datePublished: '2025-02-03',
        category: 'Deep Cleaning',
        readMins: 5,
        relatedServiceSlug: 'deep-cleaning',
        relatedServiceArea: 'london',
        intro: 'Both terms appear on cleaning company websites, but the distinction matters practically — especially when you\'re deciding what to book and what to budget. The short answer: a regular clean maintains your home week to week; a <a href="https://dscleanersltd.com/landing/deep-cleaning-london.html">deep clean</a> resets it. Here\'s exactly what each involves. See also: <a href="https://dscleanersltd.com/blog/how-often-should-you-deep-clean-your-home.html">how often should you deep clean your home</a>.',
        sections: [
            {
                h2: 'What a Regular Clean Covers',
                body: 'A regular domestic clean typically runs 2–3 hours for a standard home. It maintains visible cleanliness and removes everyday build-up. Think: surfaces wiped, floors hoovered and mopped, bathrooms and kitchen cleaned to a hygienic standard, beds changed if requested.',
                list: [
                    'Kitchen surfaces, hob top, and sink',
                    'Bathroom and WC — surfaces and fixtures',
                    'Hoovering all floors and mopping hard floors',
                    'Dusting accessible surfaces',
                    'Emptying bins',
                    'Tidying to enable cleaning (where agreed)',
                ],
            },
            {
                h2: 'What a Deep Clean Adds',
                body: 'A deep clean goes into every area a regular clean skips. Minimum 4 hours, often 6–8 for larger or heavily soiled properties. It\'s not just more of the same — it\'s a fundamentally different scope.',
                list: [
                    'Oven interior: cavity, racks, glass, seals — full degreasing',
                    'Inside all cupboards and drawers',
                    'Behind and underneath appliances',
                    'Tile grout scrubbing',
                    'Limescale removal from shower screens, taps, and showerheads',
                    'Skirting boards and window tracks',
                    'Light fittings and ceiling fans',
                    'Walls and door frames (removing scuffs and marks)',
                    'Behind radiators',
                ],
            },
            {
                h2: 'When to Book a Regular Clean',
                body: 'Regular cleans are for maintenance — keeping your home in a clean, liveable state without effort on your part. Most clients book weekly or fortnightly. The right frequency depends on the number of people in the property, whether you have pets, and your personal standard. For most London households, a fortnightly regular clean is the most popular option.',
            },
            {
                h2: 'When to Book a Deep Clean',
                body: 'A deep clean makes sense at key transition points or when a regular clean can no longer keep up with accumulated build-up. Common triggers include: moving into a new property (regardless of what the previous occupants claimed to have done), after renovation work, after a period when regular cleaning was skipped for several months, end of tenancy handover, or a seasonal reset — many clients book once or twice a year. If your regular cleaner is spending most of their time on catch-up work, it\'s a sign the property needs a deep clean first.',
            },
            {
                h2: 'Cost Comparison',
                body: 'Regular cleaning at DS Cleaners starts from £21/hr with a 2-hour minimum, so a typical session runs £42–£84. A deep clean starts from £27/hr with a 4-hour minimum — a standard flat runs £108–£162. The higher rate reflects the intensive nature of the work and the specialist products used. Many clients do a deep clean first, then maintain with regular fortnightly cleans — often the most cost-effective approach over time.',
            },
        ],
        cta: {
            heading: 'Not Sure Which Clean You Need?',
            body: 'Tell us about your property and we\'ll recommend the right service. Free quote, no obligation, reply within 24 hours.',
            label: 'Get a Free Quote',
        },
    },
    {
        slug: 'how-often-should-you-deep-clean-your-home',
        title: 'How Often Should You Deep Clean Your Home?',
        metaTitle: 'How Often Should You Deep Clean Your Home? | DS Cleaners',
        metaDesc: 'General guidelines, room-by-room frequencies, and clear signs your home is overdue a deep clean. Practical advice from 15+ years of professional cleaning.',
        datePublished: '2025-02-20',
        category: 'Deep Cleaning',
        readMins: 5,
        relatedServiceSlug: 'deep-cleaning',
        relatedServiceArea: 'london',
        intro: 'There\'s no universal answer — the right frequency depends on your household size, lifestyle, and what you consider an acceptable baseline. But there are practical guidelines that apply to most homes, and clear signs that tell you when you\'ve left it too long. If you\'re not sure what a <a href="https://dscleanersltd.com/blog/deep-clean-vs-regular-clean.html">deep clean vs a regular clean</a> actually covers, read that first.',
        sections: [
            {
                h2: 'The General Rule',
                body: 'For most households, a full deep clean once or twice a year is the standard recommendation. This assumes regular cleaning in between. The logic: a regular clean maintains surface-level hygiene, but grease, limescale, mould, and dust accumulate in areas a weekly cleaner doesn\'t reach — inside ovens, behind appliances, grout lines, and so on. Left unchecked, this build-up becomes harder to remove and can affect air quality, appliance lifespan, and the overall condition of the property.',
            },
            {
                h2: 'By Room: How Often Each Area Needs a Deep Clean',
                body: '',
                list: [
                    'Kitchen oven and hob: every 3–4 months if used frequently; every 6 months if lighter use',
                    'Kitchen cupboards and inside fridge: twice a year',
                    'Bathroom grout and limescale: every 3 months in hard-water areas like London',
                    'Shower head descaling: every 2–3 months (limescale reduces pressure and harbours bacteria)',
                    'Behind and under furniture: twice a year',
                    'Mattresses (vacuuming and sanitising): every 6 months',
                    'Windows and window tracks (inside): twice a year',
                    'Extractor fans: every 6 months',
                ],
            },
            {
                h2: 'London Homes: Why More Often Is Often Right',
                body: 'London\'s hard water accelerates limescale build-up in bathrooms and kitchens significantly compared to softer-water regions. Air pollution also means that dust and particulates settle faster, particularly in homes near busy roads. For most London properties, a deep clean every 4–6 months rather than every 12 is a more realistic maintenance schedule — especially for bathrooms and kitchens.',
            },
            {
                h2: 'Clear Signs You\'re Overdue',
                body: 'Your home is telling you it needs a deep clean when:',
                list: [
                    'The oven smokes or smells during use',
                    'Grout lines are grey, brown, or black',
                    'Shower pressure has dropped noticeably',
                    'There\'s a persistent smell in the kitchen despite regular cleaning',
                    'Dust reappears on surfaces within a day or two of a regular clean',
                    'Skirting boards and window frames feel grimy to the touch',
                    'The extractor fan sounds louder than usual',
                ],
            },
            {
                h2: 'How to Make It Last Longer',
                body: 'A professional deep clean followed by consistent regular maintenance is the most efficient approach. Once the baseline is reset, a fortnightly regular clean keeps build-up from accumulating — meaning the next deep clean is easier, faster, and cheaper. Many DS Cleaners clients combine an initial deep clean with an ongoing domestic cleaning schedule for exactly this reason.',
            },
        ],
        cta: {
            heading: 'Ready to Reset Your Home?',
            body: 'We cover all areas of London. Deep cleans from £27/hr with a 4-hour minimum. Free quote within 24 hours.',
            label: 'Book a Deep Clean',
        },
    },
    {
        slug: 'how-to-prepare-for-a-professional-clean',
        title: 'How to Prepare for a Professional Clean: 7 Simple Steps',
        metaTitle: 'How to Prepare for a Professional Clean | DS Cleaners',
        metaDesc: 'Make the most of your professional cleaning appointment with these 7 practical preparation steps. What to do, what not to do, and what to expect.',
        datePublished: '2025-03-05',
        category: 'Domestic Cleaning',
        readMins: 4,
        relatedServiceSlug: 'domestic-cleaning',
        relatedServiceArea: 'london',
        intro: 'A professional clean achieves its best results when your cleaner can focus on actual cleaning — not working around clutter or hunting for the bin bags. A few minutes of preparation the morning of your appointment makes a real difference to the outcome. Here\'s exactly what to do.',
        sections: [
            {
                h2: '1. Tidy Before They Arrive — Not Deep Clean, Just Tidy',
                body: 'Your cleaner is not there to sort through your belongings. Clearing surfaces, picking up clothes from floors, and returning items to their normal places takes you 10–15 minutes but saves your cleaner significant time — time they can instead spend on actual deep cleaning. You don\'t need to clean anything yourself; just create a clear work surface.',
            },
            {
                h2: '2. Secure or Move Valuables and Fragile Items',
                body: 'Move anything fragile or irreplaceable off open surfaces before the clean. This isn\'t a reflection of trust — it\'s simply good practice that removes risk for both parties. Jewellery, documents, and items with significant sentimental value are better stored away during any cleaning appointment.',
            },
            {
                h2: '3. Communicate Your Priorities',
                body: 'Every home is different. Tell your cleaner which areas need extra attention this visit — the bathroom grout, a kitchen appliance that\'s been neglected, or a specific room that\'s due more focus. Clear priorities mean your most important areas get the best attention, rather than even time spread across everything.',
            },
            {
                h2: '4. Let Your Cleaner Know What Products Are in the House',
                body: 'DS Cleaners brings their own professional-grade, eco-friendly products for every appointment. But if you have particular surfaces that require specific care — marble worktops, unsealed stone, certain wood finishes — mention this. We\'ll bring the right products and avoid anything that could damage a delicate surface.',
            },
            {
                h2: '5. Provide Access to What\'s Needed',
                body: 'Make sure your cleaner has access to a working hoover, mop and bucket (we bring products but not equipment unless agreed in advance), and knows where to find bin bags, extra cloths, or specific items you\'d like them to use. A quick orientation on your first appointment is time well spent.',
            },
            {
                h2: '6. You Don\'t Need to Be Home',
                body: 'Many clients provide a key or access code and are out for the duration of the clean. This is perfectly normal and often produces better results — your cleaner can work uninterrupted and focus entirely on the job. All DS Cleaners staff are vetted, reference-checked, and trusted with solo access routinely.',
            },
            {
                h2: '7. Give Feedback After the First Clean',
                body: 'The first appointment is always the most important for getting the relationship right. If anything wasn\'t done to your standard, or if you\'d like priorities adjusted, say so clearly and promptly. A good cleaning team wants to know — it means every subsequent visit gets closer to exactly what you want.',
            },
        ],
        cta: {
            heading: 'Book Your First Professional Clean',
            body: 'Domestic cleaning from £21/hr. Fortnightly and weekly schedules available across London. Free quote in 24 hours.',
            label: 'Get a Free Quote',
        },
    },
    {
        slug: 'how-to-get-your-deposit-back-end-of-tenancy',
        title: 'How to Get Your Full Deposit Back: End of Tenancy Cleaning Guide',
        metaTitle: 'How to Get Your Full Deposit Back: End of Tenancy Cleaning Guide | DS Cleaners',
        metaDesc: 'Cleaning is the number one reason deposits are withheld in London. This guide explains exactly what agents look for, and how to make sure you get every penny back.',
        datePublished: '2025-03-18',
        category: 'End of Tenancy',
        readMins: 6,
        relatedServiceSlug: 'end-of-tenancy-cleaning',
        relatedServiceArea: 'london',
        intro: 'If you\'re moving out of a London rental, your deposit — typically 5 weeks\' rent — is at risk if the property isn\'t returned in the right condition. Cleaning is the single most common reason deposits are withheld or partially deducted. This guide explains what the bar actually is, what agents look for, and how to make sure you hit it. For a room-by-room task list, see our <a href="https://dscleanersltd.com/blog/end-of-tenancy-cleaning-checklist-london.html">end of tenancy cleaning checklist</a>.',
        sections: [
            {
                h2: 'Why Cleaning Is the #1 Deposit Dispute',
                body: 'The <a href="https://www.tenancydepositscheme.com/is-my-deposit-protected/what-happens-when-a-tenancy-ends/" target="_blank" rel="noopener noreferrer">Tenancy Deposit Scheme</a> reports that cleaning accounts for 56% of all deposit deductions across England and Wales. In London, where average deposits run £2,000–£4,000 or more, even a partial deduction is significant. The reason cleaning causes so many disputes is the difference between "clean enough to live in" and "clean enough to relet immediately" — the standard a landlord or agent applies. You could spend a full day cleaning and still fall short of check-in condition if you miss key areas.',
            },
            {
                h2: 'What Agents Actually Check',
                body: 'A check-out inspection uses the check-in inventory as a baseline. Agents look specifically at:',
                list: [
                    'Oven and extractor fan — almost always flagged if not professionally cleaned',
                    'Bathroom grout, sealant, and shower screen limescale',
                    'Inside all kitchen cupboards and drawers',
                    'Carpets — condition compared to check-in',
                    'Walls — marks, scuffs, and hand prints at door heights',
                    'Window frames and sills inside',
                    'Skirting boards throughout',
                    'Behind and under furniture (if you\'re taking it)',
                ],
            },
            {
                h2: 'The Professional Invoice Advantage',
                body: 'When you book a <a href="https://dscleanersltd.com/landing/end-of-tenancy-cleaning-london.html">professional end of tenancy clean</a>, you receive a dated invoice confirming that a professional service was carried out. Most letting agents accept this as satisfying the cleaning clause in your tenancy agreement, which removes their ability to charge you for cleaning from your deposit — even if they have minor quibbles with the result. This is why professional cleaning at £108–£162 for a typical London flat is almost always the better financial decision versus a deposit deduction at full agency rates (often £200–£400 or more). Under <a href="https://www.gov.uk/tenancy-deposit-protection" target="_blank" rel="noopener noreferrer">UK tenancy deposit protection rules</a>, landlords must justify any deduction — a professional invoice makes this considerably harder.',
            },
            {
                h2: 'Timeline: When to Book',
                body: 'Book your professional end of tenancy clean for the day before or morning of your check-out. You want the property cleaned last — after all your belongings have left. Don\'t clean and then move furniture out afterwards, as this creates marks and debris you can\'t address. Leave enough time between the clean finishing and your check-out inspection for any quick touch-ups if needed.',
            },
            {
                h2: 'What About the Deposit-Back Guarantee?',
                body: 'At DS Cleaners, we clean to the full letting agency checklist and stand behind our work. If your agent raises a specific cleaning issue after we\'ve completed the job, we return to address it at no extra charge. We provide a dated invoice for every end of tenancy clean — accepted by all major London letting agencies.',
            },
        ],
        cta: {
            heading: 'Protect Your Deposit with a Professional Clean',
            body: 'End of tenancy cleaning from £27/hr. We cover all London areas and provide a full invoice for your agent. Free quote in 24 hours.',
            label: 'Get a Free Quote',
        },
        sources: [
            { url: 'https://www.tenancydepositscheme.com/is-my-deposit-protected/what-happens-when-a-tenancy-ends/', label: 'Tenancy Deposit Scheme — Cleaning as #1 cause of deposit disputes' },
            { url: 'https://www.gov.uk/tenancy-deposit-protection', label: 'UK Government — Tenancy deposit protection scheme rules' },
            { url: 'https://dscleanersltd.com/blog/end-of-tenancy-cleaning-checklist-london.html', label: 'DS Cleaners — End of tenancy cleaning checklist (room-by-room)' },
        ],
    },
    {
        slug: 'office-cleaning-london-guide',
        title: 'Office Cleaning in London: What Your Business Needs to Know',
        metaTitle: 'Office Cleaning London: What Your Business Needs to Know | DS Cleaners',
        metaDesc: 'A straightforward guide to commercial office cleaning in London — frequency, scope, contracts, and questions to ask any potential cleaning company.',
        datePublished: '2025-04-02',
        category: 'Commercial Cleaning',
        readMins: 6,
        relatedServiceSlug: 'commercial-cleaning',
        relatedServiceArea: 'london',
        intro: 'Office cleanliness directly affects staff wellbeing, client perception, and the overall efficiency of your business. Yet many London businesses operate on cleaning contracts that aren\'t well matched to their actual premises and usage. This guide covers the practical considerations: what professional commercial cleaning should include, how to determine the right frequency, and what to look for in a contract.',
        sections: [
            {
                h2: 'Why Office Cleanliness Is a Business Issue',
                body: 'Research consistently links cleaner office environments to lower sick days, higher staff satisfaction, and better client impressions. In London\'s competitive market, an office that doesn\'t present well — especially to visiting clients — can undermine commercial credibility. Beyond appearance, shared spaces harbour bacteria on high-touch surfaces like door handles, keyboards, and communal kitchen areas. Regular professional cleaning is a basic operational standard, not a luxury.',
            },
            {
                h2: 'What Professional Office Cleaning Should Include',
                body: 'A standard commercial cleaning contract typically covers:',
                list: [
                    'Vacuuming all floors and mats',
                    'Mopping hard floors',
                    'Wiping down all desk surfaces, tables, and meeting room furniture',
                    'Cleaning communal kitchen: surfaces, sink, appliance exteriors, microwave inside',
                    'Cleaning all bathrooms and WCs to hygienic standard',
                    'Emptying all bins',
                    'Wiping down glass partitions and internal windows',
                    'Dusting accessible surfaces, shelving, and skirting boards',
                    'Replenishing hand soap and paper towels (if agreed)',
                ],
            },
            {
                h2: 'How Often Does an Office Need Cleaning?',
                body: 'The right frequency depends on the size of your team and the nature of your work. As a general guide: small offices (1–10 people) can typically maintain hygiene with 2–3 cleans per week. Medium offices (10–30 people) usually require daily cleaning of kitchens and bathrooms, with full office cleaning 4–5 times per week. Larger offices or high-footfall spaces generally need daily cleaning throughout. If clients visit regularly, the visible standard needs to be consistently high — which usually means daily.',
            },
            {
                h2: 'Out-of-Hours Cleaning',
                body: 'The majority of DS Cleaners\' commercial clients prefer evening or early-morning cleans — typically 6pm–9pm or 6am–8am. This keeps the office undisturbed during working hours and avoids the disruption of vacuum cleaners and cleaning activity during calls or meetings. We\'re fully flexible around your business hours and can accommodate split shifts where different areas need cleaning at different times.',
            },
            {
                h2: 'Understanding Commercial Cleaning Contracts',
                body: 'Look for: a rolling monthly contract (no long tie-in), a dedicated account manager as a single point of contact, a named team who gets to know your premises, and a clearly defined scope of work in writing. Avoid contracts that lock you in for 12+ months without a performance review mechanism. At DS Cleaners, we offer rolling monthly contracts because we\'re confident in our service — you stay because the quality is right, not because you\'re locked in.',
            },
            {
                h2: 'Questions to Ask Before You Sign',
                body: '',
                list: [
                    'Who is the named contact if there\'s an issue?',
                    'Will we have the same cleaning team each visit?',
                    'How are replacement staff vetted?',
                    'What products are used — are they safe for our office environment?',
                    'What is the notice period to end the contract?',
                    'Do you provide consumables (soap, paper towels) or do we supply them?',
                ],
            },
        ],
        cta: {
            heading: 'Get a Commercial Cleaning Quote',
            body: 'We cover offices, retail, hospitality, and more across London. Rolling monthly contracts, no long tie-in. Free quote tailored to your premises.',
            label: 'Get a Free Quote',
        },
    },
    {
        slug: 'spring-cleaning-tips-london',
        title: 'Spring Cleaning Tips for London Homes (2026)',
        metaTitle: 'Spring Cleaning Tips for London Homes 2026 | DS Cleaners',
        metaDesc: 'A practical spring cleaning guide for London flats and houses — where to start, what gets missed, and when it\'s worth calling in professionals.',
        datePublished: '2025-04-14',
        category: 'Domestic Cleaning',
        readMins: 5,
        relatedServiceSlug: 'domestic-cleaning',
        relatedServiceArea: 'london',
        intro: 'Spring cleaning isn\'t just a tradition — it\'s a practical response to what happens in a home over winter. Closed windows, central heating, and less natural light mean that dust, mould, and grease accumulate in ways that aren\'t always visible day to day. A thorough spring reset sets a clean baseline for the rest of the year. Here\'s how to approach it effectively.',
        sections: [
            {
                h2: 'Why London Homes Need Extra Attention',
                body: 'London homes face specific challenges that make spring cleaning more important than elsewhere. Hard water means limescale builds up significantly over winter, particularly on shower heads, taps, and kettle elements. Urban air pollution settles as a fine layer of grime on window sills, blinds, and soft furnishings. And smaller average property sizes mean that clutter and dust accumulate in corners and under furniture faster than in larger homes.',
            },
            {
                h2: 'Start with Decluttering, Not Cleaning',
                body: 'Cleaning around clutter is inefficient. Before you pick up a cloth, go through each room and remove anything that shouldn\'t be there — items to donate, things that belong in a different room, and anything you haven\'t used in 12 months. A decluttered space is faster to clean and feels markedly different once done. One useful rule: one bag or box per room, to keep the process contained and manageable.',
            },
            {
                h2: 'Room-by-Room Priorities',
                body: 'Focus your spring clean effort where winter build-up is worst:',
                list: [
                    'Kitchen: oven interior (winter use = maximum grease build-up), extractor fan filter, inside cupboards, behind the fridge',
                    'Bathroom: descale shower head and taps, scrub grout, clean behind the toilet and under the sink',
                    'Living room: clean behind and under sofas and furniture, dust blinds and curtain rails, wipe skirting boards',
                    'Bedrooms: rotate or flip mattresses, clean under the bed, wipe down all furniture including tops of wardrobes',
                    'Windows: clean frames, tracks, and glass (inside) — spring light reveals every streak',
                    'Hallway: often the most neglected room; clean the front door, wipe wall switches and sockets, clear any winter clutter',
                ],
            },
            {
                h2: 'What People Consistently Miss',
                body: 'The areas that get skipped in a typical spring clean:',
                list: [
                    'Top of kitchen cupboards',
                    'Inside kitchen drawers',
                    'Behind radiators',
                    'Light fittings (dust accumulates quickly on shades and bulbs)',
                    'The inside of the dishwasher',
                    'Shower curtain or door tracks',
                    'Bin areas — inside bins, not just emptying them',
                ],
            },
            {
                h2: 'When to Call in Professionals',
                body: 'A full spring deep clean on a London flat typically takes 4–6 hours when done thoroughly. If you don\'t have that time, or if the property hasn\'t had a professional deep clean in over a year, booking a one-off deep clean is often the most practical option. Professionals bring the right products for limescale, grease, and grout — areas where DIY cleaning struggles to match commercial-grade results. You can then maintain the baseline with regular cleaning for the rest of the year.',
            },
        ],
        cta: {
            heading: 'Book a One-Off Spring Deep Clean',
            body: 'DS Cleaners covers all areas of London. Spring deep cleans from £27/hr with a 4-hour minimum. Free quote within 24 hours.',
            label: 'Get a Free Quote',
        },
    },
    {
        slug: 'eco-friendly-cleaning-what-it-means',
        title: 'Eco-Friendly Cleaning: What It Actually Means',
        metaTitle: 'Eco-Friendly Cleaning: What It Actually Means | DS Cleaners',
        metaDesc: 'What eco-friendly professional cleaning products actually are, how they compare to conventional alternatives, and why they matter for your home and health.',
        datePublished: '2025-05-01',
        category: 'Domestic Cleaning',
        readMins: 4,
        relatedServiceSlug: 'cleaning-services',
        relatedServiceArea: 'london',
        intro: '"Eco-friendly" appears on almost every cleaning company\'s website. But what does it actually mean in practice — and does it make a difference to how clean your home gets? Here\'s a straightforward breakdown.',
        sections: [
            {
                h2: 'The Problem with Conventional Cleaning Chemicals',
                body: 'Many conventional cleaning products contain compounds that are effective at cleaning but problematic in other ways. Phosphates in surface cleaners contribute to water pollution. Volatile organic compounds (VOCs) in aerosol sprays affect indoor air quality — particularly relevant in London flats where ventilation is limited. Chlorine-based bleaches, while effective, leave residues and can cause respiratory irritation with repeated exposure. None of this means they\'re dangerous in occasional use, but in a home that\'s professionally cleaned weekly, the cumulative exposure matters.',
            },
            {
                h2: 'What Eco-Friendly Products Actually Are',
                body: 'Professional eco-friendly cleaning products are formulated to be:',
                list: [
                    'Biodegradable — they break down naturally without leaving persistent compounds in water systems',
                    'Free from phosphates, chlorine bleach, and synthetic fragrances',
                    'Plant-derived surfactants rather than petroleum-based ones',
                    'Low or zero VOC — important for indoor air quality',
                    'Safe for use around children and pets at normal concentrations',
                ],
            },
            {
                h2: 'Do They Actually Clean as Well?',
                body: 'For standard cleaning tasks — surfaces, floors, bathrooms, kitchens — professional-grade eco-friendly products perform equivalently to conventional alternatives. Where they historically lagged was in very heavy-duty applications: serious oven grease, long-established limescale, or mould remediation. Modern formulations have largely closed this gap, and for most residential cleaning applications, there is no practical difference in the result. Where a genuinely difficult job requires a stronger product, a professional will use the appropriate tool — the goal is clean, safe results, not ideology.',
            },
            {
                h2: 'Why It Matters for Your Home Specifically',
                body: 'For households with children, people with respiratory conditions, or anyone with sensitivities to fragrances and chemical compounds, eco-friendly products are a straightforward preference. Beyond health, surfaces like natural stone, sealed wood, and certain finishes are better maintained with gentler, pH-neutral formulations over time — reducing the need for restoration work. And for anyone conscious of their environmental impact, the cumulative difference of professional-grade, biodegradable products across a year of weekly cleans is meaningful.',
            },
            {
                h2: 'What DS Cleaners Uses',
                body: 'We use professional-grade, eco-friendly products for all domestic and commercial cleaning. Our range is biodegradable, free from harsh chemicals, and effective across all standard residential surfaces. If you have specific surface requirements or sensitivities, tell us when you book — we\'ll confirm the exact products we\'ll use for your appointment.',
            },
        ],
        cta: {
            heading: 'Professional Cleaning with Eco-Friendly Products',
            body: 'Domestic cleaning from £21/hr across London. We bring all products. Free quote within 24 hours.',
            label: 'Get a Free Quote',
        },
    },
    {
        slug: 'airbnb-cleaning-service-london-guide',
        title: 'Airbnb Cleaning Service London: What Every Host Needs to Know (2026)',
        metaTitle: 'Airbnb Cleaning Service London: Host Guide 2026 | DS Cleaners',
        metaDesc: 'Everything London Airbnb hosts need to know about professional turnover cleaning — cost, same-day availability, linen service, and what to look for in a reliable cleaner.',
        datePublished: '2026-05-29',
        category: 'Airbnb Cleaning',
        readMins: 7,
        relatedServiceSlug: 'airbnb-cleaning',
        relatedServiceArea: 'london',
        intro: 'Cleanliness is the single most cited reason guests leave negative Airbnb reviews — and the most common reason hosts lose Superhost status. In London, where short-let competition is intense and guest expectations are high, the standard of your turnover clean directly affects your ratings, your occupancy rate, and your income. This guide covers everything you need to know about professional <a href="https://dscleanersltd.com/landing/airbnb-cleaning-london.html">Airbnb cleaning in London</a>: what it includes, what it costs, and how to find a service you can actually rely on. If you want a hands-on task list, go straight to our <a href="https://dscleanersltd.com/blog/airbnb-cleaning-checklist-london.html">Airbnb cleaning checklist for London hosts</a>.',
        sections: [
            {
                h2: 'Why Airbnb Cleaning Is Different From Regular Domestic Cleaning',
                body: 'A standard domestic clean maintains a lived-in home week to week. An Airbnb turnover is a different operation entirely. You have a fixed window — often 2–4 hours between a guest checking out and the next checking in — and the property needs to go from post-guest condition to hotel-standard presentation in that time. This means speed, consistency, and a specific checklist: fresh linen on every bed, spotless bathrooms, a kitchen clean enough for someone who has never been there before, and restocked essentials. Most domestic cleaners are not set up for this. A professional Airbnb cleaning service is.',
            },
            {
                h2: 'What a Professional Airbnb Turnover Clean Covers',
                body: 'A professional Airbnb clean goes well beyond surface tidying. A full turnover should include:',
                list: [
                    'Full clean of all rooms — kitchen, bathrooms, bedrooms, living areas, hallway',
                    'Stripping and remaking all beds with fresh linen',
                    'Replacing towel sets and folding hotel-style',
                    'Kitchen: cleaning appliances inside and out, washing any used items, wiping all surfaces',
                    'Bathroom: descaling taps and shower, scrubbing toilet including under the rim, cleaning mirrors',
                    'Restocking essentials — toilet paper, hand soap, washing-up liquid as agreed',
                    'Emptying all bins and replacing liners',
                    'Checking for and reporting any guest damage or maintenance issues',
                    'Before and after photos sent directly to the host',
                ],
            },
            {
                h2: 'How Much Does Airbnb Cleaning Cost in London?',
                body: 'Airbnb cleaning in London is typically charged by the hour, with a minimum booking. Expect to pay £25–£30/hr for a professional service. At DS Cleaners, we charge £27/hr with a 3-hour minimum. As a guide for typical London properties:',
                list: [
                    'Studio flat: 3 hours — from £81',
                    '1-bedroom flat: 3–3.5 hours — from £81',
                    '2-bedroom flat: 3.5–4 hours — from £95',
                    '3-bedroom house: 4.5–5.5 hours — from £122',
                    'Linen change: included in the turnaround time — no extra charge',
                    'Same-day booking: accepted where availability allows — no premium surcharge',
                ],
            },
            {
                h2: 'Same-Day Turnovers: Managing Back-to-Back Guests',
                body: 'Same-day turnovers — where a guest checks out in the morning and a new guest checks in that afternoon — are the most demanding scenario in Airbnb management. The window can be as short as two or three hours. A reliable professional service will: confirm availability at short notice, arrive on time with everything needed, work to a strict checklist regardless of what condition the previous guest left the property in, and send you confirmation photos before your guest arrives. According to <a href="https://www.airbnb.co.uk/help/article/1374" target="_blank" rel="noopener noreferrer">Airbnb\'s hosting standards</a>, cleanliness is the most weighted factor in overall guest satisfaction scores. At DS Cleaners, we accept same-day bookings across London. Contact us as early as possible — morning of the check-out is ideal.',
            },
            {
                h2: 'Linen, Photos, and Restocking: What to Agree in Advance',
                body: 'Before you book any Airbnb cleaning service, confirm three things clearly:',
                list: [
                    'Linen: Does the cleaner change linen, or do they just make beds with what\'s there? Confirm they will strip and remake every bed. If you want linen hire (so you don\'t need to supply it yourself), ask if this is available.',
                    'Photos: After-clean photos protect you in any guest damage dispute. A good service will send these automatically. If it\'s not mentioned, ask explicitly.',
                    'Restocking: Agree a list of essentials (toilet paper, soap, etc.) and who is responsible for supplies. Most professional services will restock from items left at the property.',
                ],
            },
            {
                h2: 'Key Access: How London Hosts Typically Manage Entry',
                body: 'Most London Airbnb hosts use one of four access methods: a key safe mounted near the entrance, a smart lock with a temporary code, a concierge handover (for apartment buildings), or a direct key handoff. A professional Airbnb cleaning service should be comfortable with all of these. Confirm the access method when booking and ensure your cleaner has the right code or key in advance — this eliminates the most common source of delays on the day.',
            },
            {
                h2: 'What to Look for in a Reliable Airbnb Cleaning Service',
                body: 'The difference between a good Airbnb cleaning service and a poor one comes down to reliability and consistency. Before you book, check for:',
                list: [
                    'References or reviews from other Airbnb hosts specifically — not just domestic clients',
                    'Clear confirmation that they cover your area and can accommodate your check-in/check-out pattern',
                    'A defined checklist they follow on every turnover — not ad-hoc cleaning',
                    'Photo documentation after every clean',
                    'A direct point of contact (not just a booking platform) so you can reach someone if there\'s an issue',
                    'Fully insured, vetted staff — important when giving access to your property without being present',
                ],
            },
        ],
        cta: {
            heading: 'Need Reliable Airbnb Cleaning in London?',
            body: 'DS Cleaners provides professional Airbnb turnover cleaning across London. From £27/hr, 7 days a week, with before & after photos included. Free quote within 24 hours.',
            label: 'Get a Free Quote',
        },
        sources: [
            { url: 'https://www.airbnb.co.uk/help/article/1374', label: 'Airbnb — Guest satisfaction and cleanliness standards' },
            { url: 'https://www.airbnb.co.uk/help/article/2820', label: 'Airbnb — Hosting standards and Superhost requirements' },
            { url: 'https://dscleanersltd.com/blog/airbnb-cleaning-checklist-london.html', label: 'DS Cleaners — Airbnb cleaning checklist for London hosts' },
            { url: 'https://dscleanersltd.com/landing/airbnb-cleaning-london.html', label: 'DS Cleaners — Airbnb cleaning service London' },
        ],
    },
    {
        slug: 'airbnb-cleaning-checklist-london',
        title: 'Airbnb Cleaning Checklist for London Hosts (2026)',
        metaTitle: 'Airbnb Cleaning Checklist London 2026 | DS Cleaners',
        metaDesc: 'A complete room-by-room Airbnb cleaning checklist for London hosts. Use it to brief your cleaner, audit a turnover, or clean the property yourself between guests.',
        datePublished: '2026-05-29',
        category: 'Airbnb Cleaning',
        readMins: 6,
        relatedServiceSlug: 'airbnb-cleaning',
        relatedServiceArea: 'london',
        intro: 'A consistent, thorough cleaning checklist is the foundation of every high-rated Airbnb property. Guests notice when things are missed — and London guests, paying premium short-let rates, notice more than most. Whether you clean your property yourself or use a professional service, this checklist covers every area a guest will see, use, and judge you on. For a full guide to choosing a reliable <a href="https://dscleanersltd.com/landing/airbnb-cleaning-london.html">Airbnb cleaning service in London</a>, read our <a href="https://dscleanersltd.com/blog/airbnb-cleaning-service-london-guide.html">host guide to Airbnb cleaning</a>.',
        sections: [
            {
                h2: 'Before the Clean: What to Do First',
                body: 'Before touching the property, do a quick walk-through:',
                list: [
                    'Check all rooms for items left by departing guests — return to lost property or leave in a designated spot',
                    'Identify any damage, broken items, or maintenance issues — photograph and report immediately',
                    'Open windows to ventilate before cleaning (10 minutes minimum)',
                    'Start the washing machine with used linen and towels if doing your own laundry',
                    'Gather all cleaning products, fresh linen, and restocking supplies before starting',
                ],
            },
            {
                h2: 'Kitchen Checklist',
                body: 'The kitchen is the room guests judge most harshly after the bathroom. Cover every surface:',
                list: [
                    'Hob: degrease all burners or induction surface — wipe underneath removable parts',
                    'Oven: wipe interior including racks and glass door — full degrease if heavily used',
                    'Microwave: clean inside, outside, and the plate',
                    'Fridge: wipe all shelves and drawers, remove any items left by guests, check door seals',
                    'Dishwasher: run a cycle if items have been washed and left inside; clean the filter',
                    'All cupboards: wipe fronts and handles; quickly check inside for left items',
                    'Sink and taps: descale and polish — hard water marks are the most common guest complaint in London kitchens',
                    'Countertops: wipe all surfaces including behind appliances',
                    'Bin: empty, clean inside, and replace liner',
                    'Restock: check washing-up liquid, dish soap, hand wash, kitchen roll',
                ],
            },
            {
                h2: 'Bathroom Checklist',
                body: 'Bathrooms receive the closest scrutiny. <a href="https://www.thameswater.co.uk/help/water-quality/hard-water" target="_blank" rel="noopener noreferrer">London\'s exceptionally hard water</a> means limescale builds quickly — descale at every turnover, not just occasionally:',
                list: [
                    'Toilet: inside bowl (including under the rim), seat both sides, cistern top, base, and surrounding floor',
                    'Shower screen or curtain: remove limescale; check curtain for mould at the base',
                    'Shower head: descale — London hard water blocks these fast',
                    'Bath or shower tray: remove limescale ring and any hair from the drain',
                    'Sink: descale taps and basin, clean drain',
                    'Mirror: streak-free clean — guests notice immediately',
                    'Tiles and grout: wipe down; spot-clean grout if darkening',
                    'Floor: mop including corners and behind the toilet',
                    'Towels: replace with fresh folded set — fold hotel-style if presentation matters to you',
                    'Restock: toilet paper (minimum 2 rolls visible), hand soap, any complimentary toiletries',
                ],
            },
            {
                h2: 'Bedroom Checklist',
                body: 'Beds are the centrepiece of the guest experience. A freshly made bed with clean linen is the single most powerful impression you can create:',
                list: [
                    'Strip all beds — mattress protectors should be changed every 3–5 stays or at any sign of staining',
                    'Remake with freshly laundered linen — fitted sheet, flat sheet or duvet cover, pillowcases',
                    'Check under the bed and behind furniture for items left by departing guests',
                    'Wipe all surfaces: bedside tables, desk, shelving',
                    'Dust any decorative items and light fittings',
                    'Check wardrobe and drawers for left items; wipe wardrobe interiors monthly',
                    'Vacuum carpet or mop hard floor including under furniture',
                    'Check and replace any missing or damaged amenities (hangers, spare blanket, etc.)',
                ],
            },
            {
                h2: 'Living Areas and Hallway',
                body: 'Living spaces often accumulate the most evidence of a previous guest — crumbs, fingerprints, rearranged furniture:',
                list: [
                    'Sofa and armchairs: plump cushions, check under cushions for crumbs and lost items, spot-clean any marks',
                    'Coffee table and surfaces: wipe thoroughly including bases and legs',
                    'TV remote: wipe with an antibacterial cloth — high-touch item often missed',
                    'Windows: wipe any visible fingerprints or marks from inside',
                    'Skirting boards: wipe — build-up is visible to guests at low angles',
                    'Hallway: vacuum or mop, wipe light switches and door handles throughout the property',
                    'Any outdoor space (balcony, garden): sweep, wipe down furniture, check for left items',
                ],
            },
            {
                h2: 'Final Checks Before Your Guest Arrives',
                body: 'Before locking up, do a final walk-through using the guest\'s perspective — enter each room as if for the first time:',
                list: [
                    'Switch on all lights and check every bulb is working',
                    'Check the temperature is set appropriately for the season',
                    'Confirm the WiFi password is visible',
                    'Check all windows are closed and locked if appropriate',
                    'Review the welcome guide or house manual is in place',
                    'Take final check-out photos of each room — send to the host immediately',
                    'Confirm any consumables that are running low so the host can restock before the next turn',
                    'Lock up securely and confirm key is returned to the correct location',
                ],
            },
        ],
        cta: {
            heading: 'Want a Professional to Handle Your Airbnb Turnovers?',
            body: 'DS Cleaners provides Airbnb turnover cleaning across London, 7 days a week. Before & after photos included. From £27/hr with a 3-hour minimum. Free quote within 24 hours.',
            label: 'Get a Free Quote',
        },
        sources: [
            { url: 'https://www.airbnb.co.uk/help/article/1374', label: 'Airbnb — Guest satisfaction and cleanliness standards' },
            { url: 'https://www.thameswater.co.uk/help/water-quality/hard-water', label: 'Thames Water — Hard water in London' },
            { url: 'https://dscleanersltd.com/blog/airbnb-cleaning-service-london-guide.html', label: 'DS Cleaners — Airbnb cleaning service London: host guide' },
            { url: 'https://dscleanersltd.com/landing/airbnb-cleaning-london.html', label: 'DS Cleaners — Airbnb cleaning service London' },
        ],
    },
];

function buildBlogPage(post) {
    const relatedLandingSlug = `${post.relatedServiceSlug}-${post.relatedServiceArea}.html`;
    const relatedLandingUrl = `${BRAND.domain}/landing/${relatedLandingSlug}`;
    const pageUrl = `${BRAND.domain}/blog/${post.slug}.html`;
    const dateFormatted = new Date(post.datePublished).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    const sectionsHtml = post.sections.map(s => {
        let listHtml = '';
        if (s.list && s.list.length) {
            listHtml = `<ul class="blog-list">${s.list.map(item => `<li>${item}</li>`).join('')}</ul>`;
        }
        const bodyHtml = s.body ? `<p>${s.body}</p>` : '';
        return `<h2>${s.h2}</h2>${bodyHtml}${listHtml}`;
    }).join('\n');

    const relatedPostsHtml = BLOG_POSTS
        .filter(p => p.slug !== post.slug)
        .slice(0, 3)
        .map(p => `
        <a href="${BRAND.domain}/blog/${p.slug}.html" class="related-card">
          <div class="related-cat">${p.category}</div>
          <div class="related-title">${p.title}</div>
          <div class="related-meta">${p.readMins} min read</div>
        </a>`).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${post.metaTitle}</title>
<meta name="description" content="${post.metaDesc}"/>
<meta name="robots" content="index, follow"/>
<meta property="og:title" content="${post.metaTitle}"/>
<meta property="og:description" content="${post.metaDesc}"/>
<meta property="og:type" content="article"/>
<meta property="og:url" content="${pageUrl}"/>
<link rel="canonical" href="${pageUrl}"/>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "headline": "${post.title.replace(/"/g, '\\"')}",
      "description": "${post.metaDesc.replace(/"/g, '\\"')}",
      "datePublished": "${post.datePublished}",
      "author": {
        "@type": "Organization",
        "name": "${BRAND.name}",
        "url": "${BRAND.domain}"
      },
      "publisher": {
        "@type": "Organization",
        "name": "${BRAND.name}",
        "url": "${BRAND.domain}"
      },
      "url": "${pageUrl}",
      "mainEntityOfPage": "${pageUrl}"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type":"ListItem","position":1,"name":"Home","item":"${BRAND.domain}"},
        {"@type":"ListItem","position":2,"name":"Blog","item":"${BRAND.domain}/blog/"},
        {"@type":"ListItem","position":3,"name":"${post.title.replace(/"/g, '\\"')}","item":"${pageUrl}"}
      ]
    }
  ]
}
</script>

<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>

<style>
:root {
  --navy:#0c1e35;--navy-light:#1a3352;--blue:#1c7ed6;--blue-hover:#1971c2;
  --blue-pale:#e8f3fd;--blue-paler:#f4f9fe;--white:#fff;
  --grey-50:#f8f9fa;--grey-100:#f1f3f5;--grey-200:#e9ecef;
  --grey-300:#dee2e6;--grey-400:#ced4da;--grey-600:#6c757d;
  --grey-700:#495057;--grey-900:#212529;--green:#2f9e44;
  --ff:'Plus Jakarta Sans',sans-serif;
  --radius:10px;--radius-lg:16px;
  --shadow:0 4px 20px rgba(0,0,0,.09);--shadow-lg:0 12px 48px rgba(0,0,0,.13);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--ff);color:var(--grey-900);background:var(--white);-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit;text-decoration:none}ul{list-style:none}
button{font-family:var(--ff);cursor:pointer}

nav{position:sticky;top:0;z-index:100;height:64px;background:rgba(255,255,255,.97);backdrop-filter:blur(16px);border-bottom:1px solid var(--grey-200);display:flex;align-items:center;justify-content:space-between;padding:0 5%}
.logo{display:flex;align-items:center;gap:10px;text-decoration:none}
.logo-icon{width:34px;height:34px;background:var(--navy);border-radius:8px;display:flex;align-items:center;justify-content:center}
.logo-text{font-size:1.05rem;font-weight:800;color:var(--navy);letter-spacing:-.02em}
.logo-text span{color:var(--blue)}
.nav-cta{background:var(--blue);color:var(--white);font-weight:700;font-size:.85rem;padding:9px 20px;border-radius:8px;border:none;transition:background .2s}
.nav-cta:hover{background:var(--blue-hover)}
.nav-home{background:none;border:none;font-size:.85rem;font-weight:600;color:var(--grey-700);padding:8px 14px;border-radius:7px;transition:background .2s}
.nav-home:hover{background:var(--grey-100)}

.blog-hero{background:var(--navy);padding:64px 5% 52px}
.blog-hero-inner{max-width:760px;margin:0 auto}
.breadcrumb{display:flex;align-items:center;gap:6px;font-size:.75rem;color:rgba(255,255,255,.4);margin-bottom:18px}
.breadcrumb a{color:rgba(255,255,255,.4);transition:color .15s}
.breadcrumb a:hover{color:rgba(255,255,255,.75)}
.breadcrumb-sep{color:rgba(255,255,255,.2)}
.blog-cat-badge{display:inline-block;background:rgba(28,126,214,.3);border:1px solid rgba(28,126,214,.5);color:#60bdff;font-size:.7rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase;padding:4px 12px;border-radius:50px;margin-bottom:16px}
.blog-hero h1{font-size:clamp(1.9rem,4vw,2.9rem);font-weight:800;color:var(--white);line-height:1.1;letter-spacing:-.025em;margin-bottom:20px}
.blog-meta{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.blog-meta-item{display:flex;align-items:center;gap:6px;font-size:.8rem;color:rgba(255,255,255,.45);font-weight:500}
.meta-dot{width:4px;height:4px;border-radius:50%;background:rgba(255,255,255,.2)}

.blog-layout{max-width:1100px;margin:0 auto;padding:60px 5%;display:grid;grid-template-columns:1fr 340px;gap:60px;align-items:start}

.blog-body{font-size:1rem;line-height:1.85;color:var(--grey-700)}
.blog-body p{margin-bottom:1.4em}
.blog-body h2{font-size:1.35rem;font-weight:800;color:var(--navy);line-height:1.15;letter-spacing:-.02em;margin:2.2em 0 .7em}
.blog-body h2:first-child{margin-top:0}
.blog-body h3{font-size:1.1rem;font-weight:700;color:var(--navy);margin:1.8em 0 .5em}
.blog-list{margin:.6em 0 1.4em 0;display:flex;flex-direction:column;gap:8px}
.blog-list li{display:flex;align-items:flex-start;gap:10px;font-size:.93rem;color:var(--grey-700);line-height:1.65}
.blog-list li::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--blue);flex-shrink:0;margin-top:8px}
.blog-intro{font-size:1.07rem;color:var(--grey-600);line-height:1.85;margin-bottom:2em;padding-bottom:2em;border-bottom:1px solid var(--grey-200)}
.blog-body a{color:var(--blue);text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:2px}
.blog-body a:hover{text-decoration-thickness:2px}
.blog-sources{margin:2.5em 0 1em;padding:20px 24px;background:var(--grey-50);border:1px solid var(--grey-200);border-radius:var(--radius)}
.blog-sources h3{font-size:.82rem;font-weight:700;color:var(--navy);letter-spacing:.06em;text-transform:uppercase;margin-bottom:12px}
.blog-sources-list{display:flex;flex-direction:column;gap:6px;list-style:none;padding:0}
.blog-sources-list li{font-size:.83rem;color:var(--grey-700);display:flex;align-items:flex-start;gap:8px}
.blog-sources-list li::before{content:'→';color:var(--blue);font-weight:700;flex-shrink:0}
.blog-sources-list a{color:var(--blue);text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:2px}

.sidebar{display:flex;flex-direction:column;gap:20px}
.sidebar-cta{background:var(--navy);border-radius:var(--radius-lg);padding:28px;position:sticky;top:80px}
.sidebar-cta h3{font-size:1rem;font-weight:800;color:var(--white);margin-bottom:8px;line-height:1.25}
.sidebar-cta p{font-size:.83rem;color:rgba(255,255,255,.55);line-height:1.65;margin-bottom:20px}
.sidebar-cta-btn{display:block;text-align:center;background:var(--blue);color:var(--white);font-weight:700;font-size:.9rem;padding:12px 20px;border-radius:9px;transition:background .2s}
.sidebar-cta-btn:hover{background:var(--blue-hover)}
.sidebar-related{background:var(--grey-50);border:1px solid var(--grey-200);border-radius:var(--radius-lg);padding:24px}
.sidebar-related h4{font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--grey-600);margin-bottom:14px}
.related-link{display:block;padding:10px 0;border-bottom:1px solid var(--grey-200);font-size:.83rem;font-weight:600;color:var(--navy);line-height:1.4;transition:color .15s}
.related-link:last-child{border-bottom:none;padding-bottom:0}
.related-link:hover{color:var(--blue)}

.blog-related-section{max-width:1100px;margin:0 auto;padding:0 5% 80px}
.blog-related-section h2{font-size:1.5rem;font-weight:800;color:var(--navy);margin-bottom:24px}
.related-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.related-card{background:var(--white);border:1px solid var(--grey-200);border-radius:var(--radius-lg);padding:22px;transition:border-color .2s,box-shadow .2s;display:block}
.related-card:hover{border-color:var(--blue);box-shadow:var(--shadow)}
.related-cat{font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--blue);margin-bottom:8px}
.related-title{font-size:.9rem;font-weight:700;color:var(--navy);line-height:1.4;margin-bottom:8px}
.related-meta{font-size:.75rem;color:var(--grey-600)}

footer{background:var(--navy);padding:40px 5% 24px;margin-top:0}
.footer-inner{max-width:1160px;margin:0 auto;display:flex;align-items:flex-start;justify-content:space-between;gap:40px;flex-wrap:wrap;padding-bottom:28px;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:20px}
.footer-brand p{font-size:.83rem;color:rgba(255,255,255,.4);line-height:1.7;max-width:240px;margin-top:10px}
.footer-links{display:flex;flex-direction:column;gap:8px}
.footer-links a{font-size:.85rem;color:rgba(255,255,255,.5);transition:color .15s}
.footer-links a:hover{color:var(--white)}
.footer-links h4{font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.25);margin-bottom:6px}
.footer-bottom{max-width:1160px;margin:0 auto;display:flex;justify-content:space-between;font-size:.75rem;color:rgba(255,255,255,.3);flex-wrap:wrap;gap:6px}

@media(max-width:860px){.blog-layout{grid-template-columns:1fr}.sidebar-cta{position:static}}
@media(max-width:640px){.blog-hero h1{font-size:1.8rem}.related-grid{grid-template-columns:1fr}}
</style>
</head>
<body>

<nav>
  <a class="logo" href="${BRAND.domain}">
    <div class="logo-icon"><svg width="17" height="17" viewBox="0 0 18 18" fill="none"><path d="M9 1.5L15.5 5.25V12.75L9 16.5L2.5 12.75V5.25L9 1.5Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 5.5L12 7.5V11.5L9 13.5L6 11.5V7.5L9 5.5Z" fill="white" fill-opacity=".25"/></svg></div>
    <div class="logo-text">DS<span>Cleaners</span></div>
  </a>
  <div style="display:flex;align-items:center;gap:8px">
    <a href="${BRAND.domain}/blog/" class="nav-home">Blog</a>
    <a href="${relatedLandingUrl}" class="nav-cta">Get a Free Quote</a>
  </div>
</nav>

<div class="blog-hero">
  <div class="blog-hero-inner">
    <div class="breadcrumb">
      <a href="${BRAND.domain}">Home</a>
      <span class="breadcrumb-sep">›</span>
      <a href="${BRAND.domain}/blog/">Blog</a>
      <span class="breadcrumb-sep">›</span>
      <span>${post.category}</span>
    </div>
    <div class="blog-cat-badge">${post.category}</div>
    <h1>${post.title}</h1>
    <div class="blog-meta">
      <div class="blog-meta-item">DS Cleaners</div>
      <div class="meta-dot"></div>
      <div class="blog-meta-item">${dateFormatted}</div>
      <div class="meta-dot"></div>
      <div class="blog-meta-item">${post.readMins} min read</div>
    </div>
  </div>
</div>

<div class="blog-layout">
  <article class="blog-body">
    <p class="blog-intro">${post.intro}</p>
    ${sectionsHtml}
    ${post.sources && post.sources.length ? `<div class="blog-sources"><h3>Sources &amp; Further Reading</h3><ul class="blog-sources-list">${post.sources.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.label}</a></li>`).join('')}</ul></div>` : ''}
  </article>

  <aside class="sidebar">
    <div class="sidebar-cta">
      <h3>${post.cta.heading}</h3>
      <p>${post.cta.body}</p>
      <a href="${relatedLandingUrl}" class="sidebar-cta-btn">${post.cta.label}</a>
    </div>
    <div class="sidebar-related">
      <h4>Related Articles</h4>
      ${BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 4).map(p =>
        `<a href="${BRAND.domain}/blog/${p.slug}.html" class="related-link">${p.title}</a>`
      ).join('')}
    </div>
  </aside>
</div>

<div class="blog-related-section">
  <h2>More from the DS Cleaners Blog</h2>
  <div class="related-grid">${relatedPostsHtml}</div>
</div>

<footer>
  <div class="footer-inner">
    <div class="footer-brand">
      <div class="logo"><div class="logo-icon"><svg width="17" height="17" viewBox="0 0 18 18" fill="none"><path d="M9 1.5L15.5 5.25V12.75L9 16.5L2.5 12.75V5.25L9 1.5Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/></svg></div><div class="logo-text" style="color:white">DS<span>Cleaners</span></div></div>
      <p>Family-owned professional cleaning across London. Trusted since 2009.</p>
    </div>
    <div>
      <div class="footer-links">
        <h4>Services</h4>
        <a href="${BRAND.domain}/landing/domestic-cleaning-london.html">Domestic Cleaning</a>
        <a href="${BRAND.domain}/landing/deep-cleaning-london.html">Deep Cleaning</a>
        <a href="${BRAND.domain}/landing/end-of-tenancy-cleaning-london.html">End of Tenancy</a>
        <a href="${BRAND.domain}/landing/commercial-cleaning-london.html">Commercial Cleaning</a>
      </div>
    </div>
    <div>
      <div class="footer-links">
        <h4>Blog</h4>
        ${BLOG_POSTS.slice(0, 4).map(p => `<a href="${BRAND.domain}/blog/${p.slug}.html">${p.title.substring(0, 40)}…</a>`).join('')}
      </div>
    </div>
    <div>
      <div class="footer-links">
        <h4>Contact</h4>
        <a href="tel:${BRAND.phone.replace(/\s/g, '')}">${BRAND.phone}</a>
        <a href="mailto:${BRAND.email}">${BRAND.email}</a>
        <a>Mon–Sat: 8am–6pm</a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <span>&copy; 2026 DS Cleaners. All rights reserved.</span>
    <span>${post.category} &middot; DS Cleaners Blog</span>
  </div>
</footer>

</body>
</html>`;
}

// Duplicate slug guard — fail fast if any slugs collide
(function checkDuplicates() {
    const blogSlugs = BLOG_POSTS.map(p => p.slug);
    const seen = new Set();
    for (const slug of blogSlugs) {
        if (seen.has(slug)) throw new Error(`Duplicate blog slug: "${slug}"`);
        seen.add(slug);
    }
    const landingSlugs = SERVICES.flatMap(s => AREAS.map(a => `${s.slug}-${a.slug}`));
    const lSeen = new Set();
    for (const slug of landingSlugs) {
        if (lSeen.has(slug)) throw new Error(`Duplicate landing slug: "${slug}"`);
        lSeen.add(slug);
    }
})();

// Generate blog pages
let blogCount = 0;
const blogDir = path.join(__dirname, 'blog');

if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
}

for (const post of BLOG_POSTS) {
    const filename = `${post.slug}.html`;
    const html = buildBlogPage(post);
    fs.writeFileSync(path.join(blogDir, filename), html);
    console.log(`✓ blog/${filename}`);
    blogCount++;
}

console.log(`\n✅ Generated ${blogCount} blog pages`);

// Generate blog index page
const blogIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Cleaning Tips &amp; Guides Blog | DS Cleaners London</title>
<meta name="description" content="Practical cleaning guides, tips, and advice from DS Cleaners — London's trusted professional cleaning service since 2009."/>
<meta name="robots" content="index, follow"/>
<link rel="canonical" href="${BRAND.domain}/blog/"/>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "DS Cleaners Blog",
  "description": "Practical cleaning guides and advice from DS Cleaners London.",
  "url": "${BRAND.domain}/blog/",
  "publisher": {"@type":"Organization","name":"${BRAND.name}","url":"${BRAND.domain}"}
}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
<style>
:root{--navy:#0c1e35;--blue:#1c7ed6;--blue-hover:#1971c2;--white:#fff;--grey-50:#f8f9fa;--grey-100:#f1f3f5;--grey-200:#e9ecef;--grey-600:#6c757d;--grey-700:#495057;--grey-900:#212529;--ff:'Plus Jakarta Sans',sans-serif;--radius-lg:16px;--shadow:0 4px 20px rgba(0,0,0,.09)}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:var(--ff);color:var(--grey-900);background:var(--white);-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
nav{position:sticky;top:0;z-index:100;height:64px;background:rgba(255,255,255,.97);backdrop-filter:blur(16px);border-bottom:1px solid var(--grey-200);display:flex;align-items:center;justify-content:space-between;padding:0 5%}
.logo{display:flex;align-items:center;gap:10px}
.logo-icon{width:34px;height:34px;background:var(--navy);border-radius:8px;display:flex;align-items:center;justify-content:center}
.logo-text{font-size:1.05rem;font-weight:800;color:var(--navy);letter-spacing:-.02em}
.logo-text span{color:var(--blue)}
.nav-cta{background:var(--blue);color:var(--white);font-weight:700;font-size:.85rem;padding:9px 20px;border-radius:8px;border:none;transition:background .2s}
.nav-cta:hover{background:var(--blue-hover)}
.index-hero{background:var(--navy);padding:64px 5% 52px;text-align:center}
.index-hero h1{font-size:clamp(2rem,4vw,3rem);font-weight:800;color:var(--white);margin-bottom:14px}
.index-hero p{font-size:1rem;color:rgba(255,255,255,.55);max-width:520px;margin:0 auto}
.index-inner{max-width:1100px;margin:0 auto;padding:60px 5% 80px}
.index-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.post-card{background:var(--white);border:1px solid var(--grey-200);border-radius:var(--radius-lg);padding:26px;transition:border-color .2s,box-shadow .2s;display:block}
.post-card:hover{border-color:var(--blue);box-shadow:var(--shadow)}
.post-cat{font-size:.68rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--blue);margin-bottom:10px}
.post-title{font-size:.97rem;font-weight:700;color:var(--navy);line-height:1.35;margin-bottom:10px}
.post-meta{font-size:.75rem;color:var(--grey-600)}
footer{background:var(--navy);padding:32px 5% 20px}
.footer-bottom{max-width:1160px;margin:0 auto;display:flex;justify-content:space-between;font-size:.75rem;color:rgba(255,255,255,.3);flex-wrap:wrap;gap:6px}
@media(max-width:760px){.index-grid{grid-template-columns:1fr 1fr}}
@media(max-width:520px){.index-grid{grid-template-columns:1fr}}
</style>
</head>
<body>
<nav>
  <a class="logo" href="${BRAND.domain}">
    <div class="logo-icon"><svg width="17" height="17" viewBox="0 0 18 18" fill="none"><path d="M9 1.5L15.5 5.25V12.75L9 16.5L2.5 12.75V5.25L9 1.5Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/></svg></div>
    <div class="logo-text">DS<span>Cleaners</span></div>
  </a>
  <a href="${BRAND.domain}/landing/cleaning-services-london.html" class="nav-cta">Get a Free Quote</a>
</nav>
<div class="index-hero">
  <h1>Cleaning Tips &amp; Guides</h1>
  <p>Practical advice from DS Cleaners — London's professional cleaning service since 2009.</p>
</div>
<div class="index-inner">
  <div class="index-grid">
    ${BLOG_POSTS.map(p => `
    <a href="${BRAND.domain}/blog/${p.slug}.html" class="post-card">
      <div class="post-cat">${p.category}</div>
      <div class="post-title">${p.title}</div>
      <div class="post-meta">${new Date(p.datePublished).toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'})} &middot; ${p.readMins} min read</div>
    </a>`).join('')}
  </div>
</div>
<footer>
  <div class="footer-bottom">
    <span>&copy; 2026 DS Cleaners. All rights reserved.</span>
    <a href="${BRAND.domain}" style="color:rgba(255,255,255,.3)">DS Cleaners Home</a>
  </div>
</footer>
</body>
</html>`;

fs.writeFileSync(path.join(blogDir, 'index.html'), blogIndexHtml);
console.log('✓ blog/index.html');

// ─────────────────────────────────────────────
// SITEMAP
// ─────────────────────────────────────────────
const today = new Date().toISOString().split('T')[0];

const sitemapUrls = [
    // Homepage
    { url: `${BRAND.domain}/`, priority: '1.0', changefreq: 'weekly' },
    // Blog index
    { url: `${BRAND.domain}/blog/`, priority: '0.8', changefreq: 'weekly' },
    // Landing pages
    ...fs.readdirSync(outDir).filter(f => f.endsWith('.html')).map(f => ({
        url: `${BRAND.domain}/landing/${f}`,
        priority: '0.9',
        changefreq: 'monthly',
    })),
    // Blog posts
    ...BLOG_POSTS.map(p => ({
        url: `${BRAND.domain}/blog/${p.slug}.html`,
        priority: '0.7',
        changefreq: 'monthly',
        lastmod: p.datePublished,
    })),
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(u => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastmod || today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapXml);
console.log(`✓ sitemap.xml (${sitemapUrls.length} URLs)`);

// ─────────────────────────────────────────────
// ROBOTS.TXT
// ─────────────────────────────────────────────
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BRAND.domain}/sitemap.xml
`;

fs.writeFileSync(path.join(__dirname, 'robots.txt'), robotsTxt);
console.log('✓ robots.txt');

console.log(`\nTotal generated: ${count} landing pages + ${blogCount} blog posts + 1 blog index + sitemap + robots.txt`);