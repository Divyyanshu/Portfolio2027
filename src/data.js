import resumePdf from "./assests/files/Divyanshu_Tailor_Resume_RNdev.pdf";

export const profile = {
  name: 'Divyanshu Tailor',
  role: 'React Native Developer',
  roles: [
    'React Native Developer',
    'Mobile App Engineer',
    'React.js Developer',
    'Offline-first Specialist'
  ],
  location: 'Jaipur, Rajasthan, India',
  email: 'divyanshutailordeveloper@gmail.com',
  phone: '+91 9799443576',
  tagline:
    'I build production-ready Android & iOS apps that work offline, sync in real time and ship to the stores.',
  intro:
    'React Native developer with 2+ years of experience building and shipping apps used in the real world. I specialise in offline-first architecture, REST & WebSocket integrations and modular UI - and I have taken 4 products live on the Play Store and App Store.',
  about: [
    "I'm a mobile app developer and software engineer from Jaipur. I started with Flutter, moved into the MERN stack, and found my home in React Native, where I now build full-cycle apps - from understanding an existing architecture to delivering features end to end.",
    'My strongest area is offline-first data flow: SQLite and AsyncStorage on the device, structured error handling, and clean sync with the backend, so apps stay reliable even on weak networks. I also work with WebSockets for chat, dashboards and live data tables.',
    "I like owning my work. On Daksh I replicated a complete Android app architecture in React Native and independently owned the majority of feature development. When something breaks right before a deadline, I'm the person who rebuilds it and ships it."
  ],
  links: {
    github: 'https://github.com/Divyyanshu', // REPLACE if different
    linkedin: 'https://www.linkedin.com/in/divyanshu-tailor-17490823a/',
    resume: resumePdf
  }
}

export const stats = [
  { value: '2+', label: 'Years experience' },
  { value: '4', label: 'Live store apps' },
  { value: '2', label: 'Platforms: Android & iOS' },
  { value: '60%+', label: 'Feature ownership on Daksh' }
]

export const skills = [
  {
    group: 'Mobile',
    items: [
      'React Native CLI',
      'Expo',
      'React Navigation',
      'Offline-first',
      'Media Handling',
      'FCM Push',
      'React Native Maps',
      'Geolocation'
    ]
  },
  {
    group: 'Web',
    items: [
      'React.js',
      'JavaScript',
      'TypeScript',
      'HTML / CSS',
      'Tailwind CSS'
    ]
  },
  {
    group: 'Data & Storage',
    items: ['SQLite', 'AsyncStorage', 'MongoDB', 'Redux Toolkit', 'Context API']
  },
  {
    group: 'APIs',
    items: [
      'REST APIs',
      'WebSockets',
      'File Uploads',
      'WhatsApp Business API',
      'cURL'
    ]
  },
  {
    group: 'Tools',
    items: [
      'VS Code',
      'Android Studio',
      'Xcode',
      'Git / GitHub',
      'Firebase',
      'Postman'
    ]
  },
  {
    group: 'Workflow',
    items: ['Version Control', 'Responsive Design', 'Testing', 'Debugging']
  }
]

export const achievements = [
  {
    title: 'Critical QR workflow, rebuilt in hours',
    tag: 'ABRSM',
    text: 'When the existing Vision Camera based QR approach became unworkable just days before a major voting deadline, I independently rebuilt the Android and iOS scanning workflow with a bitmap-based gallery approach in 4-5 hours - and the feature went live on time.'
  },
  {
    title: 'Product ownership from day one',
    tag: 'Ownership',
    text: 'As one of the early developers on the project, I independently learned the required stack, built the initial demo from scratch and delivered a client-approved demonstration - helping the project move into full production development.'
  },
  {
    title: 'Took over the core app',
    tag: 'Growth',
    text: "After receiving a performance improvement opportunity, I took ownership of the company's core application for the next three months, raised my delivery significantly and earned recognition for the turnaround."
  }
]

export const experience = [
  {
    role: 'React Native Developer',
    company: 'Load Infotech',
    place: 'Jaipur, India',
    period: '01/2025 - Present',
    points: [
      'Offline-first architecture with SQLite + AsyncStorage, real-time API sync and structured error handling.',
      'WebSocket layer for selective real-time updates across chat, dashboards and data tables.',
      'QR / OTP flows, PDF & Excel export and media modules with dynamic modals and full validations.',
      'Delivered stable, scalable modules deployed across multiple locations with minimal crash rates.'
    ],
    stack: [
      'React Native',
      'TypeScript',
      'SQLite',
      'WebSockets',
      'REST',
      'Firebase'
    ]
  },
  {
    role: 'MERN Stack Intern',
    company: 'Global IT Providers',
    place: 'Jaipur, India',
    period: '09/2024 - 01/2025',
    points: [
      'Built job portal modules - authentication, job posting, applicant tracking - with React.js, Node.js, Express & MongoDB.',
      'Improved database query efficiency and ran sprints with GitHub version control.'
    ],
    stack: ['React.js', 'Node.js', 'Express', 'MongoDB']
  },
  {
    role: 'MERN Stack Trainee',
    company: 'Grras Solutions',
    place: 'Jaipur, India',
    period: '04/2024 - 07/2024',
    points: [
      'Hands-on full-stack training with the MERN stack and project work.'
    ],
    stack: ['MERN']
  },
  {
    role: 'Flutter Developer Intern',
    company: 'JediTeck',
    place: 'Remote',
    period: '10/2023 - 12/2023',
    points: [
      'Worked across Flutter, FlutterFlow and React.js, with Firebase authentication and API integrations.'
    ],
    stack: ['Flutter', 'Firebase', 'React.js']
  },
  {
    role: 'Jr. Flutter Application Developer',
    company: 'Mediacity Corp',
    place: 'Bhilwara, India',
    period: '11/2022 - 04/2023',
    points: [
      'Started my professional journey building cross-platform apps with Flutter.'
    ],
    stack: ['Flutter', 'Dart']
  }
]

export const education = {
  degree: 'Bachelor of Technology, Information Technology',
  school:
    'Rajasthan Technical University - M.L.V. Textile & Engineering College',
  place: 'Bhilwara, India',
  period: '2021 - 2024'
}

export const certifications = [
  'Flutter & Dart: The Complete Edition',
  'Goldman Sachs - Software Engineering Job Simulation',
  'MERN Stack Development',
  'Responsive Design'
]

export const projects = [
  {
    slug: 'daksh',
    name: 'Daksh (दक्ष)',
    type: 'Android + iOS app',
    client: 'RSS / Amrita Prakriti Samwardhan Abhiyan',
    period: '11/2025 - Present',
    published: '04/2026',
    accent: '#8b5cf6',
    variant: 'dashboard',
    summary:
      'A large field-operations app migrated from native Android to React Native, with data tables, reports and role-based access.',
    problem:
      'The existing Android app had to be rebuilt in React Native without losing any behaviour, while new features kept shipping on top of it.',
    solution:
      "I replicated the complete app architecture, merged the senior developer's codebase and independently owned 60-68% of the feature development - REST integrations, data tables, reports, and multi-step forms.",
    features: [
      'Complex REST integrations with real-time data rendering, filters and pagination',
      'Dynamic report screens with Excel / PDF generation',
      'Role-based access to screens and actions',
      'Multi-step forms with field-level validation and modular components'
    ],
    stack: [
      'React Native',
      'REST API',
      'Redux',
      'PDF / Excel',
      'Role-based access'
    ],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.plant.trees.plantingtrees&hl=en_IN',
      appStore: 'https://apps.apple.com/us/app/daksh-app/id6754160946',
      demo: ''
    },
    screenshots: []
  },
  {
    slug: 'loadconnect',
    name: 'LoadConnect',
    type: 'Chat product (Android + iOS)',
    client: 'Load Infotech - in-house product',
    period: '09/2025 - 02/2026',
    published: '11/2025',
    accent: '#22d3ee',
    variant: 'chat',
    summary:
      'A WhatsApp-style chat system with real-time messaging, offline-first storage and rich media sharing.',
    problem:
      'Chat must feel instant and never lose a message - even when the network drops or the app is killed.',
    solution:
      'A WebSocket real-time layer paired with local offline-first storage, queued sends, and WhatsApp Business API integration for business messaging.',
    features: [
      'Real-time messaging over WebSockets',
      'WhatsApp Business API integration',
      'Offline-first message storage and sync',
      'Media sharing - images, video and documents'
    ],
    stack: [
      'React Native',
      'WebSockets',
      'SQLite',
      'WhatsApp Business API',
      'FCM'
    ],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.loadwhatsapp&hl=en_IN',
      appStore: 'https://apps.apple.com/us/app/loadconnect/id6758776604',
      demo: ''
    },
    screenshots: []
  },
  {
    slug: 'abrsm',
    name: 'ABRSM',
    type: 'Attendance & verification app',
    client: 'Akhil Bharatiya Rashtriya Shaikshik Mahasangh (abrsm.in)',
    period: '05/2025 - 10/2025',
    published: '08/2025',
    accent: '#c6ff3d',
    variant: 'qr',
    summary:
      'A pan-India teacher attendance and verification app with QR workflows, ID cards and large-scale reporting.',
    problem:
      'Thousands of teachers needed to be verified on the ground, quickly, on a mix of Android and iOS devices.',
    solution:
      'OTP login, role-based dashboards, QR generation and scanning, dynamic ID-card creation and automated PDF / Excel reports for large datasets. I also handled the iOS build and release through Xcode.',
    features: [
      'OTP login / sign-up with role-based access control',
      'QR code generation and scanning with a gallery fallback',
      'Dynamic ID-card generation',
      'PDF & Excel export for large-scale reports'
    ],
    stack: ['React Native', 'QR', 'OTP', 'PDF / Excel', 'Xcode'],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.abrsnextrem&hl=en_IN', // REPLACE
      appStore: 'https://apps.apple.com/us/app/abrsm/id6749693778', // REPLACE
      demo: ''
    },
    screenshots: []
  },
  {
    slug: 'jyb-connect',
    name: 'JYB Connect',
    type: 'Dealership management app',
    client: 'Jawa Yezdi Motorcycles',
    period: '01/2025 - 05/2025',
    published: '04/2025',
    accent: '#fb923c',
    variant: 'form',
    summary:
      'A multi-step dealership management app with offline sync, KPI tracking and workshop modules.',
    problem:
      'Dealers file detailed reports from showrooms with poor connectivity, so nothing can depend on a live connection.',
    solution:
      'An offline-first design: data is saved locally in SQLite and AsyncStorage first, validated, then synced to the REST backend with clear error handling.',
    features: [
      'Multi-step forms - Dealer, Table, KPI, Manpower, Workshop',
      'SQLite + AsyncStorage offline-first storage',
      'Dynamic modals with conditional UI, image previews and validation',
      'REST API sync with structured error handling'
    ],
    stack: ['React Native CLI', 'TypeScript', 'SQLite', 'AsyncStorage', 'REST'],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.clpl.jawadvr&hl=en_IN', // REPLACE
      appStore: 'https://apps.apple.com/us/app/jyb-connect/id6744744761',
      demo: ''
    },
    screenshots: []
  }
]

export const testimonials = [
  {
    quote:
      'Divyanshu picked up a complex codebase quickly and delivered features we could actually ship. Communication was clear throughout.',
    name: 'Client Name', // REPLACE
    role: 'Project Manager, Client Company' // REPLACE
  },
  {
    quote:
      'Under a tight deadline he found a different approach and rebuilt a critical workflow in hours. Very reliable under pressure.',
    name: 'Team Lead Name', // REPLACE
    role: 'Team Lead, Load Infotech' // REPLACE
  },
  {
    quote:
      'The offline-first architecture he built made our field app dependable even in low-network areas. Clean, modular code.',
    name: 'Stakeholder Name', // REPLACE
    role: 'Product Owner' // REPLACE
  }
]

export const FORM_ENDPOINT = '' // REPLACE e.g. "https://formspree.io/f/xxxxxxx"
