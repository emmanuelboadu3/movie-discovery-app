# Development Notes

## Project Setup
- Modular folder structure created for scalability.
- TMDb API integrated for trending, search, and details.
- LocalStorage used for persistence (favorites, watchlist).

## Challenges
- Handling API rate limits.
- Ensuring responsive design across devices.
- Coordinating multiple API calls (TMDb + Utelly).

## Solutions
- Added centralized `storage.js` for persistence.
- Implemented `error.js` and `loading.js` for user feedback.
- Expanded `recommendations.js` to use TMDb recommendations + similar titles.

## Next Steps
- Final polish on styling and animations.
- Expand testing in `api.test.js`.
- Deploy via GitHub Pages or AWS Elastic Beanstalk.
