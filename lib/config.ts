// Frontend Configuration
export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://abdulraheem-api.vercel.app/api',
    endpoints: {
      about: '/about',
      skills: '/skills',
      projects: '/projects',
      contact: '/contact',
      contactSettings: '/contact/settings',
      footer: '/footer',
      images: '/images',
      resume: {
        info: '/resume/info',
        download: '/resume/download'
      },
      analytics: {
        trackView: '/analytics/track-view'
      }
    }
  },
  
  // App Configuration
  app: {
    name: 'Abdulraheem Portfolio',
    description: 'Full Stack Developer Portfolio',
    version: '1.0.0'
  },
  
  // Contact Configuration
  contact: {
    maxMessageLength: 1000,
    maxSubjectLength: 100
  },
  
  // File Upload Configuration
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${config.api.baseUrl}${endpoint}`;
};

// Helper function to get specific endpoint URL
export const getEndpointUrl = (endpointKey: string, subKey?: string): string => {
  if (subKey) {
    const endpoint = config.api.endpoints[endpointKey as keyof typeof config.api.endpoints];
    if (typeof endpoint === 'object' && endpoint[subKey as keyof typeof endpoint]) {
      return getApiUrl(endpoint[subKey as keyof typeof endpoint] as string);
    }
  }
  
  const endpoint = config.api.endpoints[endpointKey as keyof typeof config.api.endpoints];
  if (typeof endpoint === 'string') {
    return getApiUrl(endpoint);
  }
  
  throw new Error(`Invalid endpoint: ${endpointKey}${subKey ? `.${subKey}` : ''}`);
};

export default config; 