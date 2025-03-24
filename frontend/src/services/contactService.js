const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const sendContactForm = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/api/contact/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send message');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending contact form:', error);
    throw error;
  }
};