export type TeamMember = {
  readonly name: string
  readonly role: string
  readonly photoUrl?: string
  readonly portfolioUrl?: string
  readonly linkedinUrl?: string
}

/** Add only verified, official project details. Empty links are never clickable. */
export const project = {
  title: 'Sign Language Recognition',
  tagline: 'Breaking Communication Barriers Through Artificial Intelligence',
  description:
    'A camera-based capstone prototype exploring how artificial intelligence and computer vision can turn supported sign gestures into readable text.',
  publicUrl: '',
  contactEmail: '',
  logo: 'images/project-logo.jpg',
  developer: {
    name: 'Ryse Ian Prince Beralde',
    role: 'Full Stack Developer',
    photoUrl: '/images/ryse-ian-prince-beralde.jpg',
    portfolioUrl: '',
    linkedinUrl: '',
  },
  team: [
    { name: 'Geralden Batoon', role: 'Project Manager', photoUrl: '' },
    { name: 'Jakielou Madar', role: 'Database Designer', photoUrl: '' },
    {
      name: 'Johanah Mae Obar',
      role: 'UI Designer',
      photoUrl: '/images/johanah-mae-obar.jpg',
    },
  ] satisfies readonly TeamMember[],
  socials: {
    facebook: 'https://www.facebook.com/share/19rtHdkiub/',
    instagram: 'https://www.instagram.com/sign.language.recognition/',
    tiktok: 'https://www.tiktok.com/@signlanguagerecognition',
  },
} as const

/** Prevent placeholder or unsafe protocols from becoming public links. */
export function externalUrl(value: string): string | undefined {
  if (!value.trim()) return undefined
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && !url.username && !url.password
      ? url.href
      : undefined
  } catch {
    return undefined
  }
}

export function contactHref(value: string): string | undefined {
  return /^[^\s@<>?&#]+@[^\s@<>?&#]+\.[^\s@<>?&#]+$/.test(value)
    ? `mailto:${value}`
    : undefined
}
