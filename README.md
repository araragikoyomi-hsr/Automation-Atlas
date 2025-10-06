# Automation Atlas

A mobile application for generating and managing webhook endpoints that deliver real-time project status notifications directly to your device.

## Overview

This Expo-based application enables seamless integration of webhook notifications into your CI/CD pipelines and YAML configurations. Receive instant mobile notifications for build statuses, deployments, and project updates.

## Tech Stack

- **Framework**: Expo (React Native)
- **Authentication**: Auth0
- **State Management**: Zustand
- **Push Notifications**: Expo Notifications

## Prerequisites

- Node.js 16+
- Expo CLI
- Auth0 account with configured application

## Installation

```bash
# Clone repository
git clone <repository-url>
cd webhook-notification-app

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Start development server
npx expo start
```

## Environment Configuration

Create a `.env` file with the following variables:

```env
EXPO_PUBLIC_API_URL=https://api.your-backend.com
EXPO_PUBLIC_AUTH0_DOMAIN=your-domain.auth0.com
EXPO_PUBLIC_AUTH0_CLIENT_ID=your-client-id
```

## YAML Integration

Integrate generated webhooks into your configuration files:

```yaml
notifications:
  webhook:
    - url: https://api.your-app.com/webhook/abc123xyz
      events: [success, failure]
      
# GitHub Actions Example
- name: Send Notification
  run: |
    curl -X POST ${{ secrets.WEBHOOK_URL }} \
      -H "Content-Type: application/json" \
      -d '{"status": "${{ job.status }}", "project": "app-name"}'
```

## Webhook Payload

```json
{
  "status": "success|failure|pending",
  "project": "string",
  "message": "string",
  "timestamp": "ISO8601",
  "metadata": {}
}
```

## Development

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run lint       # Lint codebase
```

## Building

```bash
# Production builds
eas build --platform android
eas build --platform ios
```

## Authentication Flow

The app uses Auth0 for secure authentication:

1. Users authenticate via Auth0 Universal Login
2. JWT tokens are managed by Secure store
3. All API requests include authentication headers
4. Token refresh handled automatically



## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

For issues and feature requests, please open a GitHub issue.
