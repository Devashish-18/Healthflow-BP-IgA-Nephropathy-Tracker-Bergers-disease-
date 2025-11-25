Privacy Policy — HealthFlow

Effective date: November 24, 2025

How We Store and Protect Your Information

HealthFlow stores user-provided information (such as email, name, age, height, weight, BMI, and blood‑pressure readings) only within your browser session using the browser's sessionStorage API. This data remains exclusively on your device and is not uploaded to any server or cloud service by default. Because sessionStorage is temporary, all stored information is automatically cleared when the browser tab or window is closed, which provides short‑term privacy and prevents persistent cross‑device storage.

Important security notes:
- The app currently stores some fields (including passwords) in plain text in sessionStorage. While sessionStorage is deleted on browser close, data stored this way is readable by anyone with access to the device and visible in browser developer tools (F12 → Application → Session Storage). For maximum privacy, avoid sharing devices and use private/incognito windows when testing.
- For production use and long‑term storage across devices, we recommend adding a secured backend and database (for example, MongoDB Atlas) and migrating authentication and user data to the server. On the server side, passwords must be hashed (for example with bcrypt) and all traffic must be served over HTTPS.

What we recommend before going to production:
1. Hash passwords before saving (use bcrypt or equivalent) and never store plain‑text passwords in the browser.
2. Move persistent user data to a secured backend with proper authentication (JWT or secure cookies) and encrypted transport (HTTPS).
3. Use secure, HTTP‑only cookies or token storage on the client to reduce exposure in developer tools.
4. Apply input validation and sanitization to guard against injection or malformed inputs.
5. Document data retention and deletion policies for users if you will store data on servers.

If you have questions about this policy or need help implementing secure storage and authentication, contact the HealthFlow development team or ask me and I can implement recommended changes for you.
