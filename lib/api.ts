import { config, getApiUrl, getEndpointUrl } from './config';

export const apiConfig = {
  baseUrl: config.api.baseUrl,
  endpoints: {
    about: getEndpointUrl('about'),
    skills: getEndpointUrl('skills'),
    projects: getEndpointUrl('projects'),
    contact: getEndpointUrl('contact'),
    contactSettings: getEndpointUrl('contactSettings'),
    footer: getEndpointUrl('footer'),
    images: getEndpointUrl('images'),
  }
};

export const fetchApi = async (endpoint: string, options?: RequestInit) => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export default apiConfig; 