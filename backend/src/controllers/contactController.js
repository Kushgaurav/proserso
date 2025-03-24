const { sendContactEmail } = require('../utils/emailService');

exports.submitContactForm = async (req, res) => {
    try {
        const contactData = req.body;

        // Basic validation
        if (!contactData.name || !contactData.email || !contactData.subject || !contactData.message) {
            return res.status(400).json({ 
                success: false, 
                error: 'Please provide all required fields' 
            });
        }

        // Send email
        await sendContactEmail(contactData);

        res.status(200).json({
            success: true,
            message: 'Contact form submitted successfully'
        });
    } catch (error) {
        console.error('Contact form submission error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to send contact form. Please try again later.' 
        });
    }
};