# Project TODO List: Feedback Management System (with QR Feature)

## Phase 1: Project Setup & Initialization
- [x] Initialize frontend repository (React.js using Vite or Create React App)
- [x] Initialize backend repository (Node.js with Express)
- [x] Set up version control (Git) for both repositories
- [x] Configure environment variables (`.env`) for backend (Database URL, JWT Secret, etc.)
- [x] Connect backend to MongoDB (Mongoose setup)
- [x] Define backend MVC structure (Routes, Controllers, Models, Middlewares)

## Phase 2: Database Schema & Models
- [x] Create `User` schema in Mongoose with the following fields:
  - `username` (String, Required)
  - `email` (String, Unique, Required)
  - `phone` (String, Required)
  - `token` (String, Unique)
  - `qr_code_url` (String)
  - `has_submitted` (Boolean, Default: false)
  - `feedback` (Mixed/JSON, Optional)
  - `created_at` (Timestamp)

## Phase 3: Backend API Development
- [x] **Middleware:** Implement input validation middleware using `express-validator` or `Joi`.
- [x] **Middleware:** Implement robust error-handling middleware (`helmet`, `morgan` config).
- [x] **Endpoint:** `POST /api/check-user` - Check if user's email already exists or has submitted.
- [x] **Endpoint:** `POST /api/save-user` - Save new user details to the DB.
- [x] **Endpoint:** `POST /api/generate-qr` - Generate a unique token using `uuid`, save it to the user's DB record, and generate a QR code pointing to the token link.
- [x] **Endpoint:** Token Validation (e.g. `GET /feedback?token=...`) - Validate token. If valid and not submitted, redirect to Google Form. If invalid or already submitted, return error or redirect to "Already Responded" page.
- [x] **Endpoint:** `POST /api/submit-feedback` - Mark `has_submitted = true` for the user after Google Form submission.

## Phase 4: Admin Backend Functions (Protected)
- [x] **Middleware:** Implement JWT authentication middleware for admin routes.
- [x] **Endpoint:** `POST /api/admin/login` - Authenticate admin users (using `bcrypt` for password check) and return JWT.
- [x] **Endpoint:** `GET /api/admin/users` - Fetch list of all users and their submission statuses.
- [x] **Endpoint:** `GET /api/admin/users/:id` - Fetch details of a specific user.
- [x] **Admin Data Management:** Add logic to delete users and export data (CSV) if needed.

## Phase 5: Frontend Development (User Facing)
- [x] **Routing setup:** Implement `react-router-dom` for client-side routing.
- [x] **Page:** `Home Page` - Create landing page with a single "Submit Your Feedback" button.
- [x] **Page:** `User Details Page` - Build a form for Username, Email, and Phone Number. Add UI validation (`react-hook-form` + `Yup`).
- [x] **Integration on Details Page:** On submit, call `/api/check-user`.
  - If user exists -> Redirect to "Already Responded" page.
  - If new user -> Call `/api/save-user` and `/api/generate-qr`, then redirect to QR page.
- [x] **Page:** `QR Code Page` - Display the generated QR code (`qrcode.react`) with instructions for the user to scan.
- [x] **Page:** `Already Responded Page` - Simple screen indicating if the user has already submitted feedback or scanned an invalid token.

## Phase 6: Frontend Development (Admin Panel)
- [x] **Routing:** Setup Protected Routes for the admin dashboard.
- [x] **Page:** `Admin Login Page` - Form for admin username/password to retrieve JWT. Use Axios to set the authorization header.
- [x] **Page:** `Admin Dashboard` - Build a table view (`React Table` or `Material UI` tables) to list all users (Username, Email, Submission Status). Include Search bar and Filter options.
- [x] **Component:** `User Details View` - A detailed view (modal or page) showing a selected user's full data (Username, Email, Phone, Feedback Data, Token).

## Phase 7: Integration & Testing
- [x] Test end-to-end QR code flow (Enter details -> Get QR -> Scan QR -> Validate Token -> Submit Form -> Update DB).
- [x] Verify that Google Form integration correctly tracks user submission (either by redirect or webhooks).
- [x] Verify that used tokens are invalidated and cannot be reused.
- [x] Testing state management (Context API or Redux) across user and admin flows.
- [x] Implement secure CORS policies.
- [x] Ensure full mobile responsiveness for user-facing pages.

## Phase 8: Deployment & Post-Launch
- [ ] Deploy Frontend to Vercel/Netlify.
- [ ] Deploy Backend to Render/Railway.
- [ ] Set up MongoDB Atlas production database.
- [ ] (Future Enhancement) Implement OTP verification or direct Email of QR code to user.
- [ ] (Future Enhancement) Add QR expiry timer logic.
- [ ] (Future Enhancement) Replace Google Form with custom React form and analytics dashboard.
