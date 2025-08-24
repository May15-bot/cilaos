// ================================================
// assets/js/data/data.js
// Module de données centralisées pour tout le site
// ================================================

// Données des hébergements
const hebergements = {
    hotels: [
        {
            "id": 1,
            "name": "La Villa Kazuera",
            "type": "hotel",
            "category": "Hôtel",
            "price": 120,
            "capacity": 4,
            "coordinates": {
                "lat": -21.13775,
                "lon": 55.47200
            },
            "rating": 4.8,
            "features": ["WiFi", "Piscine", "Vue montagne", "Parking", "Restaurant"],
            "description": "Villa de charme avec vue exceptionnelle sur le cirque",
            "detailedDescription": "Située sur les hauteurs de Cilaos, La Villa Kazuera offre une vue panoramique exceptionnelle sur le cirque. Ses chambres spacieuses et élégamment décorées allient confort moderne et charme créole.",
            "images": [
                "images/hotels/villa-kazuera-1.jpg",
                "images/hotels/villa-kazuera-2.jpg",
                "images/hotels/villa-kazuera-3.jpg"
            ],
            "contact": {
                "phone": "+262 262 31 77 77",
                "email": "contact@villakazuera.re",
                "website": "www.villakazuera.re"
            },
            "amenities": {
                "breakfast": true,
                "halfBoard": true,
                "fullBoard": false,
                "spa": true,
                "pool": true,
                "restaurant": true,
                "bar": true,
                "parking": true,
                "wifi": true,
                "airConditioning": true,
                "petsAllowed": false,
                "handicapAccess": true
            }
        },
        {
            "id": 2,
            "name": "Otroiza Hotel",
            "type": "hotel",
            "category": "Hôtel",
            "price": 85,
            "capacity": 2,
            "coordinates": {
                "lat": -21.137924,
                "lon": 55.469052
            },
            "rating": 4.5,
            "features": ["WiFi", "Restaurant", "Jardin", "Parking"],
            "description": "Hôtel au cœur du village, proche de tous commerces",
            "detailedDescription": "L'Otroiza Hotel vous accueille dans une ambiance chaleureuse et familiale. Idéalement situé au centre de Cilaos, vous serez à quelques pas des commerces, restaurants et départs de randonnées.",
            "images": [
                "images/hotels/otroiza-1.jpg",
                "images/hotels/otroiza-2.jpg"
            ],
            "contact": {
                "phone": "+262 262 31 71 39",
                "email": "otroiza@orange.fr",
                "website": "www.otroiza.com"
            },
            "amenities": {
                "breakfast": true,
                "halfBoard": true,
                "fullBoard": false,
                "spa": false,
                "pool": false,
                "restaurant": true,
                "bar": true,
                "parking": true,
                "wifi": true,
                "airConditioning": false,
                "petsAllowed": true,
                "handicapAccess": false
            }
        },
        {
            "id": 3,
            "name": "Hotel Des Neiges",
            "type": "hotel",
            "category": "Hôtel",
            "price": 95,
            "capacity": 2,
            "coordinates": {
                "lat": -21.13383,
                "lon": 55.47475
            },
            "rating": 4.6,
            "features": ["WiFi", "Piscine", "Spa", "Restaurant"],
            "description": "Hôtel avec deux piscines et vue sur les montagnes",
            "images": ["images/hotels/des-neiges-1.jpg"],
            "contact": {
                "phone": "+262 262 31 72 89",
                "email": "hoteldesneiges@wanadoo.fr",
                "website": "www.hoteldesneiges.re"
            }
        },
        {
            "id": 4,
            "name": "Le Vieux Cep",
            "type": "hotel",
            "category": "Hôtel",
            "price": 75,
            "capacity": 2,
            "coordinates": {
                "lat": -21.13612,
                "lon": 55.47278
            },
            "rating": 4.3,
            "features": ["WiFi", "Restaurant", "Bar"],
            "description": "Charme créole authentique, cuisine traditionnelle",
            "images": ["images/hotels/vieux-cep-1.jpg"],
            "contact": {
                "phone": "+262 262 31 71 89",
                "email": "levieuxcep@wanadoo.fr"
            }
        },
        {
            "id": 5,
            "name": "Tsilaosa Hôtel",
            "type": "hotel",
            "category": "Hôtel",
            "price": 110,
            "capacity": 3,
            "coordinates": {
                "lat": -21.13612,
                "lon": 55.46958
            },
            "rating": 4.7,
            "features": ["WiFi", "Jacuzzi", "Vue panoramique"],
            "description": "Architecture créole, idéal pour les randonneurs",
            "images": ["images/hotels/tsilaosa-1.jpg"],
            "contact": {
                "phone": "+262 262 31 79 39",
                "email": "tsilaosa@orange.fr"
            }
        },
        {
            "id": 6,
            "name": "Hotel Le Cilaos",
            "type": "hotel",
            "category": "Hôtel",
            "price": 90,
            "capacity": 2,
            "coordinates": {
                "lat": -21.13608,
                "lon": 55.47967
            },
            "rating": 4.4,
            "features": ["WiFi", "Parking", "Restaurant"],
            "description": "Situation centrale, accès facile aux sentiers",
            "images": ["images/hotels/le-cilaos-1.jpg"],
            "contact": {
                "phone": "+262 262 31 85 85"
            }
        }
    ],
    "gites": [
        {
            "id": 7,
            "name": "Gîte le Fouquet",
            "type": "gite",
            "category": "Gîte",
            "price": 65,
            "capacity": 6,
            "coordinates": {
                "lat": -21.1360,
                "lon": 55.4680
            },
            "rating": 4.5,
            "features": ["WiFi", "Jardin", "Barbecue", "Parking", "Cuisine équipée"],
            "description": "Gîte familial avec grand jardin, proche centre",
            "images": ["images/gites/fouquet-1.jpg"],
            "contact": {
                "phone": "+262 692 12 34 56"
            }
        },
        {
            "id": 8,
            "name": "Gîte du Pas de Bellecombe",
            "type": "gite",
            "category": "Gîte",
            "price": 55,
            "capacity": 4,
            "coordinates": {
                "lat": -21.1380,
                "lon": 55.4750
            },
            "rating": 4.3,
            "features": ["Cuisine équipée", "Terrasse", "Vue montagne"],
            "description": "Gîte de montagne, départ de randonnées",
            "images": ["images/gites/bellecombe-1.jpg"],
            "contact": {
                "phone": "+262 692 98 76 54"
            }
        },
        {
            "id": 9,
            "name": "Gîte Le Relais des Cimes",
            "type": "gite",
            "category": "Gîte",
            "price": 70,
            "capacity": 8,
            "coordinates": {
                "lat": -21.1320,
                "lon": 55.4690
            },
            "rating": 4.6,
            "features": ["WiFi", "Cheminée", "Parking", "Grand séjour"],
            "description": "Grand gîte pour groupes, ambiance montagne",
            "images": ["images/gites/relais-cimes-1.jpg"],
            "contact": {
                "phone": "+262 262 31 85 85"
            }
        },
        {
            "id": 10,
            "name": "Gîte Le Figuier",
            "type": "gite",
            "category": "Gîte",
            "price": 60,
            "capacity": 5,
            "coordinates": {
                "lat": -21.1370,
                "lon": 55.4760
            },
            "rating": 4.4,
            "features": ["Jardin", "Barbecue", "Parking gratuit"],
            "description": "Gîte calme avec jardin tropical",
            "images": ["images/gites/figuier-1.jpg"]
        },
        {
            "id": 11,
            "name": "Gîte la Cascade",
            "type": "gite",
            "category": "Gîte",
            "price": 75,
            "capacity": 6,
            "coordinates": {
                "lat": -21.1340,
                "lon": 55.4670
            },
            "rating": 4.7,
            "features": ["WiFi", "Jacuzzi", "Vue cascade"],
            "description": "Vue exceptionnelle sur la cascade Bras Rouge",
            "images": ["images/gites/cascade-1.jpg"]
        },
        {
            "id": 12,
            "name": "Gîte Les Avirons",
            "type": "gite",
            "category": "Gîte",
            "price": 50,
            "capacity": 4,
            "coordinates": {
                "lat": -21.1385,
                "lon": 55.4740
            },
            "rating": 4.2,
            "features": ["Cuisine", "Terrasse", "Calme"],
            "description": "Gîte économique, ambiance familiale",
            "images": ["images/gites/avirons-1.jpg"]
        }
    ],
    "chambres": [
        {
            "id": 13,
            "name": "Case Nyala",
            "type": "chambre",
            "category": "Chambre d'hôtes",
            "price": 80,
            "capacity": 2,
            "coordinates": {
                "lat": -21.1310,
                "lon": 55.4710
            },
            "rating": 4.8,
            "features": ["Petit-déjeuner", "WiFi", "Jardin", "Piscine"],
            "description": "Chambres d'hôtes de charme, accueil chaleureux",
            "images": ["images/chambres/case-nyala-1.jpg"],
            "contact": {
                "phone": "+262 262 31 92 50",
                "website": "www.case-nyala.com"
            }
        },
        {
            "id": 14,
            "name": "Chambres d'hôtes DORIS",
            "type": "chambre",
            "category": "Chambre d'hôtes",
            "price": 70,
            "capacity": 2,
            "coordinates": {
                "lat": -21.1365,
                "lon": 55.4685
            },
            "rating": 4.6,
            "features": ["Petit-déjeuner", "Terrasse", "Vue"],
            "description": "Vue magnifique, petit-déjeuner généreux",
            "images": ["images/chambres/doris-1.jpg"]
        },
        {
            "id": 15,
            "name": "Ti Fleur Aimée",
            "type": "chambre",
            "category": "Chambre d'hôtes",
            "price": 85,
            "capacity": 3,
            "coordinates": {
                "lat": -21.1335,
                "lon": 55.4705
            },
            "rating": 4.7,
            "features": ["Piscine", "Spa", "Petit-déjeuner"],
            "description": "Chambres avec piscine chauffée et spa",
            "images": ["images/chambres/ti-fleur-1.jpg"]
        },
        {
            "id": 16,
            "name": "Chez Paul et Lydie",
            "type": "chambre",
            "category": "Chambre d'hôtes",
            "price": 65,
            "capacity": 2,
            "coordinates": {
                "lat": -21.1375,
                "lon": 55.4730
            },
            "rating": 4.5,
            "features": ["Table d'hôtes", "Jardin", "Parking"],
            "description": "Table d'hôtes créole, produits du jardin",
            "images": ["images/chambres/paul-lydie-1.jpg"]
        }
    ],
    "campings": [
        {
            "id": 17,
            "name": "Camping Le Saint François",
            "type": "camping",
            "category": "Camping",
            "price": 25,
            "capacity": 4,
            "coordinates": {
                "lat": -21.1390,
                "lon": 55.4770
            },
            "rating": 4.1,
            "features": ["Sanitaires", "Eau chaude", "Électricité"],
            "description": "Camping familial, emplacements ombragés",
            "images": ["images/campings/saint-francois-1.jpg"]
        },
        {
            "id": 18,
            "name": "Camping Les Lataniers",
            "type": "camping",
            "category": "Camping",
            "price": 20,
            "capacity": 4,
            "coordinates": {
                "lat": -21.1400,
                "lon": 55.4780
            },
            "rating": 4.0,
            "features": ["Sanitaires", "Barbecue commun"],
            "description": "Camping nature, proche sentiers de randonnée",
            "images": ["images/campings/lataniers-1.jpg"]
        },
        {
            "id": 19,
            "name": "Camping du Grand Bénare",
            "type": "camping",
            "category": "Camping",
            "price": 30,
            "capacity": 6,
            "coordinates": {
                "lat": -21.1380,
                "lon": 55.4760
            },
            "rating": 4.3,
            "features": ["Bungalows", "Électricité", "WiFi"],
            "description": "Camping avec option bungalows",
            "images": ["images/campings/grand-benare-1.jpg"]
        },
        {
            "id": 20,
            "name": "Camping Les Cimes",
            "type": "camping",
            "category": "Camping",
            "price": 22,
            "capacity": 4,
            "coordinates": {
                "lat": -21.1395,
                "lon": 55.4775
            },
            "rating": 3.9,
            "features": ["Sanitaires", "Aire de jeux"],
            "description": "Idéal pour familles avec enfants",
            "images": ["images/campings/les-cimes-1.jpg"]
        },
        {
            "id": 21,
            "name": "Camping Le Bras Sec",
            "type": "camping",
            "category": "Camping",
            "price": 18,
            "capacity": 2,
            "coordinates": {
                "lat": -21.1410,
                "lon": 55.4790
            },
            "rating": 3.8,
            "features": ["Nature", "Calme"],
            "description": "Camping sauvage, retour à la nature",
            "images": ["images/campings/bras-sec-1.jpg"]
        },
        {
            "id": 22,
            "name": "Camping Le Vieux Cep",
            "type": "camping",
            "category": "Camping",
            "price": 28,
            "capacity": 4,
            "coordinates": {
                "lat": -21.1385,
                "lon": 55.4765
            },
            "rating": 4.2,
            "features": ["Restaurant", "Épicerie", "WiFi"],
            "description": "Camping avec services et restaurant",
            "images": ["images/campings/vieux-cep-camping-1.jpg"]
        }
    ]
};


  // Images pour les slideshows par catégorie
        const categoryImages = {
            hotel: [
                'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
                'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
                'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
                'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
            ],
            gite: [
                'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
                'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
                'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
                'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800'
            ],
            camping: [
                'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800',
                'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800',
                'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800',
                'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?w=800'
            ]
        };




// Données des restaurants
const restaurants = [
    {
        "id": 1,
        "name": "Le Vieux Cep",
        "type": "Cuisine traditionnelle",
        "cuisine": "Créole",
        "price": "€€€",
        "priceRange": {
            "min": 25,
            "max": 40
        },
        "coordinates": {
            "lat": -21.13612,
            "lon": 55.47278
        },
        "rating": 4.6,
        "reviews": 234,
        "emoji": "🍷",
        "specialites": ["Carry de porc", "Cuisine créole", "Vins locaux", "Lentilles de Cilaos"],
        "description": "Restaurant emblématique de Cilaos, le Vieux Cep vous propose une cuisine créole authentique dans un cadre traditionnel.",
        "detailedDescription": "Installé depuis 1970, Le Vieux Cep est une institution à Cilaos. Notre chef perpétue les traditions culinaires créoles tout en y apportant sa touche personnelle. Cave à vins exceptionnelle avec une sélection de vins de Cilaos.",
        "images": [
            "images/restaurants/vieux-cep-1.jpg",
            "images/restaurants/vieux-cep-2.jpg"
        ],
        "openingHours": {
            "monday": "12:00-14:00, 19:00-21:30",
            "tuesday": "12:00-14:00, 19:00-21:30",
            "wednesday": "Fermé",
            "thursday": "12:00-14:00, 19:00-21:30",
            "friday": "12:00-14:00, 19:00-21:30",
            "saturday": "12:00-14:00, 19:00-22:00",
            "sunday": "12:00-14:30"
        },
        "contact": {
            "phone": "+262 262 31 71 89",
            "email": "levieuxcep@wanadoo.fr",
            "website": "www.levieuxcep.re"
        },
        "features": {
            "terrace": true,
            "parking": true,
            "wifi": true,
            "creditCard": true,
            "reservation": true,
            "takeaway": false,
            "delivery": false,
            "wheelchairAccess": true,
            "kidsMenu": true,
            "vegetarianOptions": true,
            "veganOptions": false
        }
    },
    {
        "id": 2,
        "name": "Le Grilladin",
        "type": "Grillades & BBQ",
        "cuisine": "Grillades",
        "price": "€€",
        "priceRange": {
            "min": 15,
            "max": 25
        },
        "coordinates": {
            "lat": -21.1370,
            "lon": 55.4720
        },
        "rating": 4.3,
        "reviews": 156,
        "emoji": "🔥",
        "specialites": ["Grillades au feu de bois", "Côte de bœuf", "Saucisses fumées"],
        "description": "Spécialiste des grillades au feu de bois, Le Grilladin vous offre une expérience unique avec ses viandes fumées.",
        "images": ["images/restaurants/grilladin-1.jpg"],
        "openingHours": {
            "monday": "12:00-14:30, 19:00-22:00",
            "tuesday": "12:00-14:30, 19:00-22:00",
            "wednesday": "12:00-14:30, 19:00-22:00",
            "thursday": "12:00-14:30, 19:00-22:00",
            "friday": "12:00-14:30, 19:00-22:30",
            "saturday": "12:00-14:30, 19:00-22:30",
            "sunday": "12:00-15:00"
        },
        "contact": {
            "phone": "+262 262 31 85 42"
        }
    },
    {
        "id": 3,
        "name": "La Table de Tatie Jeanne",
        "type": "Cuisine familiale",
        "cuisine": "Créole familiale",
        "price": "€€",
        "priceRange": {
            "min": 12,
            "max": 22
        },
        "coordinates": {
            "lat": -21.1340,
            "lon": 55.4695
        },
        "rating": 4.8,
        "reviews": 312,
        "emoji": "👵",
        "specialites": ["Rougail saucisse", "Cari légumes", "Gâteau patate douce"],
        "description": "Chez Tatie Jeanne, c'est comme à la maison ! Cuisine familiale généreuse, recettes de grand-mère.",
        "images": ["images/restaurants/tatie-jeanne-1.jpg"],
        "contact": {
            "phone": "+262 692 45 67 89"
        }
    },
    {
        "id": 4,
        "name": "Le Bistrot Cilaos",
        "type": "Bistrot moderne",
        "cuisine": "Fusion",
        "price": "€€€",
        "priceRange": {
            "min": 20,
            "max": 35
        },
        "coordinates": {
            "lat": -21.1355,
            "lon": 55.4715
        },
        "rating": 4.4,
        "reviews": 189,
        "emoji": "🍽️",
        "specialites": ["Cuisine fusion", "Tartare de thon", "Cocktails créoles"],
        "description": "Bistrot moderne alliant tradition créole et techniques culinaires contemporaines.",
        "images": ["images/restaurants/bistrot-cilaos-1.jpg"],
        "contact": {
            "phone": "+262 262 31 79 55"
        }
    },
    {
        "id": 5,
        "name": "Le Relais des Cimes",
        "type": "Restaurant d'altitude",
        "cuisine": "Gastronomique",
        "price": "€€€€",
        "priceRange": {
            "min": 35,
            "max": 60
        },
        "coordinates": {
            "lat": -21.1320,
            "lon": 55.4690
        },
        "rating": 4.7,
        "reviews": 267,
        "emoji": "🏔️",
        "specialites": ["Lentilles de Cilaos", "Cerf aux épices", "Fromage de chèvre"],
        "description": "Restaurant gastronomique perché dans les hauteurs, offrant une vue exceptionnelle.",
        "images": ["images/restaurants/relais-cimes-1.jpg"],
        "contact": {
            "phone": "+262 262 31 85 85",
            "website": "www.relais-des-cimes.re"
        }
    },
    {
        "id": 6,
        "name": "Chez Loulou",
        "type": "Snack créole",
        "cuisine": "Snack",
        "price": "€",
        "priceRange": {
            "min": 5,
            "max": 12
        },
        "coordinates": {
            "lat": -21.1375,
            "lon": 55.4730
        },
        "rating": 4.2,
        "reviews": 423,
        "emoji": "🥪",
        "specialites": ["Samoussas", "Bouchons", "Bonbons piment"],
        "description": "Le snack incontournable de Cilaos ! Chez Loulou, tous les en-cas créoles.",
        "images": ["images/restaurants/chez-loulou-1.jpg"],
        "contact": {
            "phone": "+262 692 12 34 56"
        }
    },
    {
        "id": 7,
        "name": "L'Affût",
        "type": "Restaurant de chasse",
        "cuisine": "Gibier",
        "price": "€€€",
        "priceRange": {
            "min": 22,
            "max": 38
        },
        "coordinates": {
            "lat": -21.1310,
            "lon": 55.4750
        },
        "rating": 4.5,
        "reviews": 198,
        "emoji": "🦌",
        "specialites": ["Civet de cerf", "Cabri massalé", "Charcuterie locale"],
        "description": "Spécialiste du gibier et des viandes de caractère. Cuisine rustique et authentique.",
        "images": ["images/restaurants/affut-1.jpg"],
        "contact": {
            "phone": "+262 262 31 88 77"
        }
    },
    {
        "id": 8,
        "name": "La Cascade",
        "type": "Restaurant panoramique",
        "cuisine": "Créole moderne",
        "price": "€€€",
        "priceRange": {
            "min": 18,
            "max": 32
        },
        "coordinates": {
            "lat": -21.1340,
            "lon": 55.4670
        },
        "rating": 4.6,
        "reviews": 245,
        "emoji": "🌊",
        "specialites": ["Poisson grillé", "Salade de lentilles", "Rhum arrangé"],
        "description": "Restaurant avec vue imprenable sur la cascade Bras Rouge. Cuisine légère et fraîche.",
        "images": ["images/restaurants/cascade-1.jpg"],
        "contact": {
            "phone": "+262 262 31 91 23"
        }
    },
    {
        "id": 9,
        "name": "Juste",
        "type": "Cuisine végétarienne",
        "cuisine": "Végétarienne",
        "price": "€€",
        "priceRange": {
            "min": 14,
            "max": 24
        },
        "coordinates": {
            "lat": -21.1360,
            "lon": 55.4680
        },
        "rating": 4.4,
        "reviews": 167,
        "emoji": "🌱",
        "specialites": ["Curry de légumes", "Graines créoles", "Jus de fruits frais"],
        "description": "Premier restaurant végétarien de Cilaos, cuisine saine et colorée.",
        "images": ["images/restaurants/juste-1.jpg"],
        "contact": {
            "phone": "+262 692 98 76 54",
            "website": "www.juste-cilaos.re"
        }
    }
];
;

// Export pour utilisation dans les modules
export { hebergements, categoryImages, restaurants };