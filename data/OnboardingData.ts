import { OnboardingItem, OnboardingFooterItem } from '@/types';

const OnboardingData: OnboardingItem[] = [
        {
            id: '1',
            image: require('../assets/images/onboarding-screen-1.png'),
            title: "Stranded? Help is on the way.",
            description: "Get fast, reliable roadside assistance from verified mechanics, wherever you are in India.",
            footer: [
                { icon: "BadgeCheck", color: "#22c55e", label: "Verified" },     
                { icon: "Clock", color: "#2563eb", label: "24/7 Support" },       
                { icon: "Map", color: "#f59e42", label: "Pan India" }            
            ]
        },
        {
            id: '2',
            image: require('../assets/images/onboarding-screen-2.png'),
            title: "Track Your Mechanic in Real-Time.",
            description: "Know exactly who is coming and when they will arrive with live GPS tracking.",
            footer: [
                { icon: "MapPin", color: "#2563eb", label: "Live GPS" },
                { icon: "UserCheck", color: "#22c55e", label: "Verified ID" },
                { icon: "Phone", color: "#f59e42", label: "Direct Call" }
            ]
        },
        {
            id: '3',
            image: require('../assets/images/onboarding-screen-3.png'),
            title: "Simple & Secure Payments",
            description: "Pay directly in app with UPI, cards or wallets. No cash hassles.",
            footer: [
                { icon: "ShieldHalf", color: "#2563eb", label: "Secure" },
                { icon: "CreditCard", color: "#f59e42", label: "UPI & Cards" },
                { icon: "Wallet", color: "#8b5cf6", label: "Wallets" }
            ]
        }
    ];

export default OnboardingData;