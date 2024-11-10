// Define interfaces for our data structure
interface Stage {
    current: 'employed' | 'evaluation' | 'training' | 'onboard';
    date: string;
}

interface Participant {
    id: string;
    name: string;
    company: string;
    position: string;
    location: string;
    country: string;
    program: string;
    batchNumber: string;
    stage: Stage;
}

interface ParticipantsData {
    participants: Participant[];
}

// Export the data with proper typing
export const participantsData: ParticipantsData = {
    participants: [
        {
            id: "1",
            name: "Ahmad Al-Ahmad",
            company: "Falcon Adventures",
            position: "Destination Specialist",
            location: "Jurong East",
            country: "Singapore",
            program: "Heritage Tourism Development",
            batchNumber: "4",
            stage: {
                current: "employed",
                date: "2024-02-28"
            }
        },
        {
            id: "2",
            name: "Sarah Smith",
            company: "Discovery Tours",
            position: "Business Development Manager",
            location: "Singapore",
            country: "Singapore",
            program: "Eco-Tourism Development",
            batchNumber: "8",
            stage: {
                current: "evaluation",
                date: "2025-06-21"
            }
        },
        {
            id: "3",
            name: "Mohammed Hassan",
            company: "Falcon Adventures",
            position: "Travel Consultant",
            location: "Johor Bahru",
            country: "Malaysia",
            program: "Eco-Tourism Development",
            batchNumber: "5",
            stage: {
                current: "training",
                date: "2024-04-15"
            }
        },
        {
            id: "4",
            name: "Fatima Al-Sayed",
            company: "Sands Tourism",
            position: "Tourism Officer",
            location: "Dubai",
            country: "UAE",
            program: "Adventure Tourism Promotion",
            batchNumber: "4",
            stage: {
                current: "training",
                date: "2023-12-18"
            }
        },
        {
            id: "5",
            name: "John Miller",
            company: "Desert Adventures",
            position: "Travel Consultant",
            location: "Sharjah",
            country: "UAE",
            program: "Adventure Tourism Promotion",
            batchNumber: "2",
            stage: {
                current: "training",
                date: "2023-08-09"
            }
        },
        {
            id: "6",
            name: "Aisha Abdullah",
            company: "Travel & Tourism Co.",
            position: "Travel Consultant",
            location: "Jurong East",
            country: "Singapore",
            program: "Heritage Tourism Development",
            batchNumber: "5",
            stage: {
                current: "training",
                date: "2024-05-06"
            }
        },
        {
            id: "7",
            name: "Omar Khalil",
            company: "Arabian Journeys",
            position: "Operations Manager",
            location: "Singapore",
            country: "Singapore",
            program: "Heritage Tourism Development",
            batchNumber: "1",
            stage: {
                current: "onboard",
                date: "2023-01-17"
            }
        },
        {
            id: "8",
            name: "Lisa Anderson",
            company: "Falcon Adventures",
            position: "Tourism Officer",
            location: "Sentosa",
            country: "Singapore",
            program: "Eco-Tourism Development",
            batchNumber: "6",
            stage: {
                current: "training",
                date: "2024-10-20"
            }
        },
        {
            id: "9",
            name: "Zainab Al-Ali",
            company: "Gulf Tours & Travel",
            position: "Tourism Officer",
            location: "Johor Bahru",
            country: "Malaysia",
            program: "Eco-Tourism Development",
            batchNumber: "4",
            stage: {
                current: "employed",
                date: "2024-01-17"
            }
        },
        {
            id: "10",
            name: "Thomas Wilson",
            company: "Heritage Explorers",
            position: "Customer Service Manager",
            location: "George Town",
            country: "Malaysia",
            program: "Eco-Tourism Development",
            batchNumber: "10",
            stage: {
                current: "training",
                date: "2026-01-16"
            }
        },
        {
            id: "11",
            name: "Mariam Hussein",
            company: "Falcon Adventures",
            position: "Sales Director",
            location: "Jurong East",
            country: "Singapore",
            program: "Heritage Tourism Development",
            batchNumber: "7",
            stage: {
                current: "training",
                date: "2025-02-10"
            }
        },
        {
            id: "12",
            name: "David Brown",
            company: "Gulf Tours & Travel",
            position: "Operations Manager",
            location: "Sentosa",
            country: "Singapore",
            program: "Eco-Tourism Development",
            batchNumber: "10",
            stage: {
                current: "training",
                date: "2026-03-21"
            }
        },
        {
            id: "13",
            name: "Noura Al-Mazrouei",
            company: "Emirates Experience",
            position: "Program Coordinator",
            location: "Johor Bahru",
            country: "Malaysia",
            program: "Adventure Tourism Promotion",
            batchNumber: "3",
            stage: {
                current: "training",
                date: "2023-09-27"
            }
        },
        {
            id: "14",
            name: "James Taylor",
            company: "Gulf Tours & Travel",
            position: "Program Coordinator",
            location: "Jurong East",
            country: "Singapore",
            program: "Adventure Tourism Promotion",
            batchNumber: "1",
            stage: {
                current: "onboard",
                date: "2023-01-18"
            }
        },
        {
            id: "15",
            name: "Layla Al-Hashimi",
            company: "Sands Tourism",
            position: "Tour Guide",
            location: "Sentosa",
            country: "Singapore",
            program: "Eco-Tourism Development",
            batchNumber: "5",
            stage: {
                current: "training",
                date: "2024-04-05"
            }
        },
        {
            id: "16",
            name: "Peter Johnson",
            company: "Oasis Travels",
            position: "Tour Guide",
            location: "Kuala Lumpur",
            country: "Malaysia",
            program: "Eco-Tourism Development",
            batchNumber: "6",
            stage: {
                current: "onboard",
                date: "2024-07-28"
            }
        },
        {
            id: "17",
            name: "Hessa Al-Falasi",
            company: "Heritage Explorers",
            position: "Program Coordinator",
            location: "Johor Bahru",
            country: "Malaysia",
            program: "Eco-Tourism Development",
            batchNumber: "10",
            stage: {
                current: "onboard",
                date: "2026-03-09"
            }
        },
        {
            id: "18",
            name: "Michael Davis",
            company: "Falcon Adventures",
            position: "Sales Director",
            location: "George Town",
            country: "Malaysia",
            program: "Heritage Tourism Development",
            batchNumber: "6",
            stage: {
                current: "employed",
                date: "2024-08-09"
            }
        },
        {
            id: "19",
            name: "Reem Al-Suwaidi",
            company: "Desert Adventures",
            position: "Marketing Manager",
            location: "Sharjah",
            country: "UAE",
            program: "Heritage Tourism Development",
            batchNumber: "2",
            stage: {
                current: "evaluation",
                date: "2023-06-02"
            }
        },
        {
            id: "20",
            name: "Robert Martin",
            company: "Emirates Experience",
            position: "Event Coordinator",
            location: "George Town",
            country: "Malaysia",
            program: "Heritage Tourism Development",
            batchNumber: "8",
            stage: {
                current: "evaluation",
                date: "2025-03-19"
            }
        },
        {
            id: "21",
            name: "Amina Al-Zaabi",
            company: "UAE Tourism Plus",
            position: "Operations Manager",
            location: "Singapore",
            country: "Singapore",
            program: "Adventure Tourism Promotion",
            batchNumber: "4",
            stage: {
                current: "evaluation",
                date: "2024-01-19"
            }
        },
        {
            id: "22",
            name: "William Thompson",
            company: "Discovery Tours",
            position: "Tourism Officer",
            location: "Johor Bahru",
            country: "Malaysia",
            program: "Eco-Tourism Development",
            batchNumber: "4",
            stage: {
                current: "employed",
                date: "2023-12-29"
            }
        },
        {
            id: "23",
            name: "Maha Al-Mansoori",
            company: "Gulf Tours & Travel",
            position: "Program Coordinator",
            location: "Singapore",
            country: "Singapore",
            program: "Heritage Tourism Development",
            batchNumber: "4",
            stage: {
                current: "employed",
                date: "2024-03-25"
            }
        },
        {
            id: "24",
            name: "Richard Garcia",
            company: "UAE Tourism Plus",
            position: "Tourism Officer",
            location: "Johor Bahru",
            country: "Malaysia",
            program: "Eco-Tourism Development",
            batchNumber: "5",
            stage: {
                current: "employed",
                date: "2024-06-10"
            }
        },
        {
            id: "25",
            name: "Latifa Al-Qubaisi",
            company: "UAE Tourism Plus",
            position: "Business Development Manager",
            location: "Sentosa",
            country: "Singapore",
            program: "Adventure Tourism Promotion",
            batchNumber: "10",
            stage: {
                current: "training",
                date: "2026-02-17"
            }
        },
        {
            id: "26",
            name: "Joseph Martinez",
            company: "Global Tours LLC",
            position: "Customer Service Manager",
            location: "George Town",
            country: "Malaysia",
            program: "Adventure Tourism Promotion",
            batchNumber: "8",
            stage: {
                current: "training",
                date: "2025-04-24"
            }
        },
        {
            id: "27",
            name: "Shamsa Al-Dhaheri",
            company: "UAE Tourism Plus",
            position: "Tourism Officer",
            location: "Johor Bahru",
            country: "Malaysia",
            program: "Heritage Tourism Development",
            batchNumber: "9",
            stage: {
                current: "training",
                date: "2025-11-20"
            }
        },
        {
            id: "28",
            name: "Daniel Robinson",
            company: "Travel & Tourism Co.",
            position: "Customer Service Manager",
            location: "Dubai",
            country: "UAE",
            program: "Eco-Tourism Development",
            batchNumber: "10",
            stage: {
                current: "training",
                date: "2025-12-16"
            }
        },
        {
            id: "29",
            name: "Maitha Al-Shamsi",
            company: "Sands Tourism",
            position: "Destination Specialist",
            location: "Johor Bahru",
            country: "Malaysia",
            program: "Heritage Tourism Development",
            batchNumber: "9",
            stage: {
                current: "training",
                date: "2025-09-04"
            }
        },
        {
            id: "30",
            name: "Christopher Lee",
            company: "Oasis Travels",
            position: "Tour Guide",
            location: "Abu Dhabi",
            country: "UAE",
            program: "Adventure Tourism Promotion",
            batchNumber: "2",
            stage: {
                current: "onboard",
                date: "2023-04-22"
            }
        },
        {
            id: "31",
            name: "Sheikha Al-Ketbi",
            company: "Emirates Experience",
            position: "Sales Director",
            location: "Penang",
            country: "Malaysia",
            program: "Eco-Tourism Development",
            batchNumber: "5",
            stage: {
                current: "training",
                date: "2024-06-29"
            }
        },
        {
            id: "32",
            name: "Kevin Hall",
            company: "Heritage Explorers",
            position: "Customer Service Manager",
            location: "Johor Bahru",
            country: "Malaysia",
            program: "Heritage Tourism Development",
            batchNumber: "1",
            stage: {
                current: "training",
                date: "2023-02-24"
            }
        },
        {
            id: "33",
            name: "Lubna Al-Qasimi",
            company: "Sands Tourism",
            position: "Event Coordinator",
            location: "Umm Al Quwain",
            country: "UAE",
            program: "Heritage Tourism Development",
            batchNumber: "3",
            stage: {
                current: "training",
                date: "2023-10-15"
            }
        },
        {
            id: "34",
            name: "Edward Young",
            company: "Sands Tourism",
            position: "Business Development Manager",
            location: "Umm Al Quwain",
            country: "UAE",
            program: "Heritage Tourism Development",
            batchNumber: "2",
            stage: {
                current: "training",
                date: "2023-08-05"
            }
        },
        {
            id: "35",
            name: "Shamma Al-Mazrouei",
            company: "Falcon Adventures",
            position: "Destination Specialist",
            location: "Umm Al Quwain",
            country: "UAE",
            program: "Heritage Tourism Development",
            batchNumber: "5",
            stage: {
                current: "evaluation",
                date: "2024-06-08"
            }
        },
        {
            id: "36",
            name: "Brian King",
            company: "Sands Tourism",
            position: "Marketing Manager",
            location: "Sharjah",
            country: "UAE",
            program: "Heritage Tourism Development",
            batchNumber: "10",
            stage: {
                current: "employed",
                date: "2025-12-24"
            }
        },
        {
            id: "37",
            name: "Hamda Al-Suwaidi",
            company: "UAE Tourism Plus",
            position: "Tour Guide",
            location: "Jurong East",
            country: "Singapore",
            program: "Eco-Tourism Development",
            batchNumber: "9",
            stage: {
                current: "employed",
                date: "2025-11-29"
            }
        },
        {
            id: "38",
            name: "Steven Wright",
            company: "Emirates Experience",
            position: "Customer Service Manager",
            location: "Dubai",
            country: "UAE",
            program: "Heritage Tourism Development",
            batchNumber: "5",
            stage: {
                current: "training",
                date: "2024-04-05"
            }
        },
        {
            id: "39",
            name: "Rawdha Al-Dhaheri",
            company: "Discovery Tours",
            position: "Operations Manager",
            location: "Penang",
            country: "Malaysia",
            program: "Adventure Tourism Promotion",
            batchNumber: "1",
            stage: {
                current: "evaluation",
                date: "2023-02-19"
            }
        },
        {
            id: "40",
            name: "Ronald Hill",
            company: "Emirates Experience",
            position: "Tourism Manager",
            location: "George Town",
            country: "Malaysia",
            program: "Eco-Tourism Development",
            batchNumber: "4",
            stage: {
                current: "employed",
                date: "2023-12-29"
            }
        },
        {
            id: "41",
            name: "Afra Al-Muhairi",
            company: "Gulf Tours & Travel",
            position: "Business Development Manager",
            location: "Dubai",
            country: "UAE",
            program: "Eco-Tourism Development",
            batchNumber: "6",
            stage: {
                current: "training",
                date: "2024-07-15"
            }
        },
        {
            id: "42",
            name: "Timothy Scott",
            company: "Gulf Tours & Travel",
            position: "Event Coordinator",
            location: "Sentosa",
            country: "Singapore",
            program: "Eco-Tourism Development",
            batchNumber: "8",
            stage: {
                current: "employed",
                date: "2025-05-20"
            }
        },
        {
            id: "43",
            name: "Mozah Al-Maktoum",
            company: "Sands Tourism",
            position: "Destination Specialist",
            location: "Umm Al Quwain",
            country: "UAE",
            program: "Eco-Tourism Development",
            batchNumber: "10",
            stage: {
                current: "evaluation",
                date: "2026-02-07"
            }
        },
        {
            id: "44",
            name: "Jeffrey Green",
            company: "Gulf Tours & Travel",
            position: "Operations Manager",
            location: "Penang",
            country: "Malaysia",
            program: "Heritage Tourism Development",
            batchNumber: "10",
            stage: {
                current: "training",
                date: "2026-01-17"
            }
        },
        {
            id: "45",
            name: "Khawla Al-Nuaimi",
            company: "Falcon Adventures",
            position: "Sales Director",
            location: "George Town",
            country: "Malaysia",
            program: "Eco-Tourism Development",
            batchNumber: "9",
            stage: {
                current: "employed",
                date: "2025-08-31"
            }
        },
        {
            id: "46",
            name: "Gary Baker",
            company: "Emirates Experience",
            position: "Marketing Manager",
            location: "Sharjah",
            country: "UAE",
            program: "Adventure Tourism Promotion",
            batchNumber: "7",
            stage: {
                current: "onboard",
                date: "2025-01-22"
            }
        },
        {
            id: "47",
            name: "Salama Al-Kaabi",
            company: "Falcon Adventures",
            position: "Operations Manager",
            location: "Sharjah",
            country: "UAE",
            program: "Eco-Tourism Development",
            batchNumber: "9",
            stage: {
                current: "employed",
                date: "2025-10-29"
            }
        },
        {
            id: "48",
            name: "Larry Adams",
            company: "UAE Tourism Plus",
            position: "Tourism Manager",
            location: "George Town",
            country: "Malaysia",
            program: "Adventure Tourism Promotion",
            batchNumber: "6",
            stage: {
                current: "evaluation",
                date: "2024-09-26"
            }
        },
        {
            id: "49",
            name: "Meera Al-Ahbabi",
            company: "Falcon Adventures",
            position: "Program Coordinator",
            location: "Abu Dhabi",
            country: "UAE",
            program: "Heritage Tourism Development",
            batchNumber: "8",
            stage: {
                current: "evaluation",
                date: "2025-06-07"
            }
        },
        {
            id: "50",
            name: "Dennis Nelson",
            company: "Desert Adventures",
            position: "Travel Consultant",
            location: "Penang",
            country: "Malaysia",
            program: "Eco-Tourism Development",
            batchNumber: "10",
            stage: {
                current: "onboard",
                date: "2026-03-10"
            }
        }
    ]
} as const;

// Export type definitions for use in other files
export type { Participant, ParticipantsData, Stage };