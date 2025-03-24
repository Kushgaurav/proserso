# Proserso - Professional Services Platform

A comprehensive platform built with React and Node.js that provides professional business services including technology consulting, infrastructure management, and business transformation solutions.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Environment Configuration](#environment-configuration)
- [Deployment](#deployment)
- [Database Setup](#database-setup)
- [Security Considerations](#security-considerations)
- [Monitoring and Maintenance](#monitoring-and-maintenance)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements
- Node.js 18.x or higher
- MongoDB 6.0 or higher
- Redis (for caching and session management)
- Git
- Docker and Docker Compose (optional, for containerized deployment)

### Required Tools
- npm (Node Package Manager) or yarn
- MongoDB Compass (optional, for database management)
- A text editor (VS Code recommended)
- Postman or similar tool for API testing

## Project Structure

```
proserso/
├── backend/                # Backend API server
│   ├── src/               # Source code
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Route controllers
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   └── utils/       # Utility functions
│   └── package.json      # Backend dependencies
├── frontend/             # React frontend application
│   ├── public/          # Static files
│   ├── src/            # Source code
│   │   ├── components/ # Reusable components
│   │   ├── pages/     # Page components
│   │   └── styles/    # CSS styles
│   └── package.json    # Frontend dependencies
└── docs/               # Documentation
```

## Local Development

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the backend directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/proserso

   # Authentication
   JWT_SECRET=your-secret-key-here
   JWT_EXPIRES_IN=24h

   # Redis Configuration (Optional)
   REDIS_URL=redis://localhost:6379

   # Cors Configuration
   CORS_ORIGIN=http://localhost:3000

   # Email Configuration (if needed)
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=your-email@example.com
   SMTP_PASS=your-email-password

   # File Upload (if needed)
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=./uploads
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the frontend directory:
   ```env
   # API Configuration
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_ENV=development

   # Feature Flags
   REACT_APP_ENABLE_AUTH=true
   REACT_APP_ENABLE_BLOG=true

   # Analytics (for production)
   REACT_APP_GA_ID=your-ga-id

   # Other Configuration
   REACT_APP_MAX_UPLOAD_SIZE=5242880
   REACT_APP_SUPPORT_EMAIL=support@example.com
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Environment Configuration

### Environment Types
The application supports three environment types:
- Development (`development`): Local development environment
- Staging (`staging`): Testing and QA environment
- Production (`production`): Live production environment

### Backend Environment Variables

#### Required Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/proserso` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secure-secret-key` |
| `NODE_ENV` | Environment name | `development`, `staging`, `production` |

#### Optional Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |
| `CORS_ORIGIN` | Allowed CORS origins | `http://localhost:3000` |
| `SMTP_HOST` | Email server hostname | `smtp.example.com` |
| `LOG_LEVEL` | Logging detail level | `debug`, `info`, `error` |

### Frontend Environment Variables

#### Required Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000` |
| `REACT_APP_ENV` | Environment name | `development` |

#### Optional Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_GA_ID` | Google Analytics ID | `UA-XXXXXXXXX-X` |
| `REACT_APP_ENABLE_AUTH` | Enable authentication | `true` |
| `REACT_APP_SENTRY_DSN` | Sentry error tracking | `https://xxxxx@sentry.io/xxxxx` |

### Environment File Templates
You can find example environment files in:
- Backend: `backend/.env.example`
- Frontend: `frontend/.env.example`

Always remember to:
- Never commit .env files to version control
- Use strong, unique values for secrets in production
- Regularly rotate sensitive credentials
- Keep development and production environments isolated

## Deployment

There are two ways to deploy the Proserso application:

### Method 1: Docker Deployment (Recommended)

This is the easiest way to deploy the entire application stack with all services.

1. Prerequisites:
   - Docker and Docker Compose installed on your server
   - SSL certificate for your domain
   - Domain name configured

2. Initial Setup:
   ```bash
   # Clone the repository
   git clone https://github.com/your-username/proserso.git
   cd proserso

   # Copy environment files
   cp .env.production .env
   ```

3. Configure Environment:
   - Edit .env file with your production settings
   - Update domain names in nginx.conf
   - Configure SSL certificates if needed

4. Start the Application:
   ```bash
   # Build and start all services
   docker-compose up -d

   # View logs
   docker-compose logs -f
   ```

5. Verify Deployment:
   - Frontend: https://your-domain.com
   - Backend API: https://your-domain.com/api
   - MongoDB: localhost:27017 (internal only)
   - Redis: localhost:6379 (internal only)

### Method 2: Traditional Deployment

This method gives you more control over each component but requires more setup.

#### Backend Deployment

1. Server Setup:
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade

   # Install Node.js 18.x
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs

   # Install MongoDB
   sudo apt install -y mongodb

   # Install Redis
   sudo apt install -y redis-server
   ```

2. Application Setup:
   ```bash
   # Clone repository
   git clone https://github.com/your-username/proserso.git
   cd proserso/backend

   # Install dependencies
   npm install --production

   # Setup PM2
   sudo npm install -g pm2
   ```

3. Configure Environment:
   ```bash
   # Create and edit .env file
   cp .env.example .env
   nano .env
   ```

4. Start Application:
   ```bash
   # Start with PM2
   pm2 start src/server.js --name proserso-backend
   pm2 save

   # Setup PM2 startup script
   pm2 startup
   ```

#### Frontend Deployment

1. Build Application:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. Nginx Setup:
   ```bash
   # Install Nginx
   sudo apt install -y nginx

   # Copy build files
   sudo cp -r build/* /var/www/html/

   # Configure Nginx
   sudo nano /etc/nginx/sites-available/proserso
   ```

3. Nginx Configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/html;
       index index.html;

       # Frontend routes
       location / {
           try_files $uri $uri/ /index.html;
       }

       # Backend API proxy
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. Enable Site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/proserso /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### Post-Deployment Steps (Both Methods)

1. SSL Setup:
   ```bash
   # Install Certbot
   sudo apt install -y certbot python3-certbot-nginx

   # Obtain SSL certificate
   sudo certbot --nginx -d your-domain.com
   ```

2. Configure Backups:
   ```bash
   # Create backup directory
   sudo mkdir -p /var/backups/proserso

   # Setup daily MongoDB backups
   echo "0 0 * * * mongodump --out /var/backups/proserso/\$(date +\%Y\%m\%d)" | sudo tee -a /var/spool/cron/crontabs/root
   ```

3. Setup Monitoring:
   - Configure server monitoring (CPU, memory, disk)
   - Setup application logging
   - Configure error tracking
   - Setup uptime monitoring

4. Security Checklist:
   - [ ] SSL/TLS enabled
   - [ ] Firewall configured
   - [ ] Database security hardened
   - [ ] Regular security updates enabled
   - [ ] Rate limiting configured
   - [ ] CORS policies set
   - [ ] Environment variables secured

## Database Setup

### MongoDB Setup
1. Install MongoDB on your server
2. Create a new database: `use proserso`
3. Create required collections
4. Set up user authentication
5. Enable backup solutions

### Data Migration
1. Export data from development:
   ```bash
   mongodump --db proserso
   ```

2. Import to production:
   ```bash
   mongorestore --db proserso dump/proserso
   ```

## Security Considerations

1. SSL/TLS Configuration
   - Install SSL certificate
   - Configure HTTPS
   - Enable HSTS

2. Security Headers
   - CORS configuration
   - CSP (Content Security Policy)
   - XSS Protection
   - CSRF Protection

3. Rate Limiting
   - API rate limiting
   - Failed login attempt limiting

4. Regular Updates
   - Keep dependencies updated
   - Monitor security advisories
   - Regular security audits

## Monitoring and Maintenance

### Application Monitoring
- Set up logging (Winston/ELK Stack)
- Configure error tracking (Sentry)
- Performance monitoring (New Relic/Datadog)

### Server Monitoring
- CPU usage
- Memory usage
- Disk space
- Network traffic

### Backup Strategy
1. Database backups
   - Daily automated backups
   - Point-in-time recovery
   - Off-site backup storage

2. Application backups
   - Configuration files
   - User uploads
   - Log files

## Troubleshooting

### Common Issues

1. Connection Issues
   - Check MongoDB connection
   - Verify network connectivity
   - Check firewall settings

2. Performance Issues
   - Monitor server resources
   - Check database indexes
   - Analyze API response times

3. Deployment Issues
   - Verify environment variables
   - Check build logs
   - Validate dependencies

### Logging

1. Application Logs
   - Backend: `/var/log/proserso/app.log`
   - Frontend: Browser console
   - Server: `/var/log/nginx/error.log`

2. Monitoring Logs
   ```bash
   # View backend logs
   pm2 logs

   # View nginx logs
   tail -f /var/log/nginx/error.log
   ```

You can now deploy the application using either the traditional approach or Docker. For Docker deployment, simply:

Copy the .env.production file to .env and update the values
Run the following command to start all services:

docker-compose up -d

For traditional deployment, follow the first step-by-step 

## Support and Documentation

- [Frontend Documentation](./frontend/README.md)
- [API Documentation](./docs/api.md)
- [Development Guidelines](./docs/development.md)

## License

Copyright © 2024 Proserso. All rights reserved.