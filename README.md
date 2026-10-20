Ecommerce Template
A reusable ecommerce starter built with React, TypeScript, Vite,
Tailwind CSS, Netlify Functions, Stripe Checkout, and Supabase.

It includes a storefront structure, product browsing, a cart, checkout
redirection to Stripe, and server-side order status handling. Use it as
a starting point for a small online store and customize the branding,
catalog, content, and business rules before launch.
Payment safety: Stripe test mode is for development. Before
accepting real payments, review the production checklist below and
test the complete checkout and webhook flow.

Features
- React + TypeScript single-page storefront
- Vite development and production build tooling
- Tailwind CSS styling and configurable theme settings
- Product grid, product details, product gallery, and categories
- Cart with quantity and selected-variant support
- Cart persistence between page visits
- Checkout session creation through a Netlify Function
- Server-side product and price validation before creating a Stripe
  Checkout Session
- Stripe-hosted checkout rather than collecting card details in the
  app
- Stripe webhook handling for payment confirmation
- Supabase order records with statuses such as pending, paid, and
  payment_failed
- Order-success page that checks server-confirmed order status before
  showing confirmation
- About page, FAQ, navigation, footer, and not-found page
Features and file names can vary as you customize the template. Confirm
the current files in your repository before following a path-specific
instruction.
Tech stack
- Frontend: React, TypeScript, Vite, React Router
- Styling: Tailwind CSS
- Serverless functions: Netlify Functions
- Payments: Stripe Checkout and Stripe webhooks
- Database: Supabase
- Hosting: Netlify
Getting started
Requirements
Install these before starting:
- Node.js and npm
- A Stripe account for test-mode checkout
- A Supabase project
- A Netlify account for deployment
- Stripe CLI for local webhook testing
1. Clone the repository
git clone https://github.com/robinlashae1/ecommerce-template.git
cd ecommerce-template
If you are using your own fork, replace the repository URL with your
fork's URL.
2. Install dependencies
npm install
3. Configure environment variables
Create a local .env file in the project root. Do not commit it.
STRIPE_SECRET_KEY=sk_test_REPLACE_WITH_YOUR_STRIPE_TEST_SECRET
STRIPE_WEBHOOK_SECRET=whsec_REPLACE_WITH_YOUR_WEBHOOK_SECRET
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=REPLACE_WITH_YOUR_SERVER_ONLY_SUPABASE_KEY
SITE_URL=http://localhost:8888
Replace every placeholder with the correct value for your own services.
The webhook secret is provided by Stripe CLI during local testing; a
deployed webhook endpoint uses the secret configured for that endpoint.

Keep secrets private: - Never commit .env or paste secret values
into public issues or chat. - Do not prefix server secrets with VITE_.
Vite exposes VITE_ variables in client-side bundles. - Keep the
Supabase service-role/secret key exclusively in server-side functions.
Never put it in frontend code. - In Netlify, configure production
environment variables in the site's environment-variable settings and
make them available to Functions. - Restart local development processes
after changing environment variables.

See the Vite environment variable
guide and Netlify environment
variable
documentation.
4. Configure Supabase
Create or verify the orders table used by your functions. The current
integration expects fields equivalent to:
- id
- status
- stripe_session_id
- stripe_payment_intent_id
- customer_email
- shipping_details
- items
- subtotal
- shipping_amount
- currency
- created_at
- paid_at
Use the exact column types and constraints expected by your SQL schema
and function code. The status should only be updated to paid after
trusted server-side payment verification. Restrict direct client access
to orders; use the server-side key only inside Netlify Functions.

If the table already exists, verify the column names and types rather
than creating a duplicate table.
5. Start the app with Netlify Dev
Run the app through Netlify CLI so frontend requests to
/.netlify/functions/... can reach your local functions:
npx netlify dev
Open the local URL printed by the CLI. This project's checkout
configuration expects the local site URL to be http://localhost:8888;
if Netlify Dev chooses another port, update SITE_URL and keep the app
and Stripe CLI forwarding URL consistent.

For frontend-only development, the repository may also provide Vite's
npm run dev script, but Netlify Dev is needed to test the Netlify
Functions locally.
Stripe test checkout
1. Start the webhook listener
In a separate terminal, authenticate the Stripe CLI:
stripe login
Forward the events used by the webhook handler:
stripe listen \
  --events checkout.session.completed,checkout.session.async_payment_succeeded \
  --forward-to localhost:8888/.netlify/functions/stripe-webhook
Stripe CLI prints a local webhook signing secret beginning with
whsec_. Put that value in STRIPE_WEBHOOK_SECRET in .env, then
restart npx netlify dev. Keep both terminal processes running during
the test.

Do not use the local CLI secret as the production endpoint's signing
secret.
2. Complete a test purchase
1. Start npx netlify dev.
2. Start the Stripe CLI listener in another terminal.
3. Add an in-stock product to the cart.
4. Continue to checkout and complete Stripe's test checkout using
   Stripe's documented test card details.
5. Watch the Stripe CLI output for the webhook delivery and response.
6. Confirm that the matching Supabase order changes from pending to
   paid.
7. Confirm the success page displays the order confirmation and the
   cart is empty.
Use only Stripe test-mode credentials and test payment details during
development. A successful checkout redirect alone is not proof that an
order is paid; the backend should verify the payment and process the
webhook.
3. If an order remains pending
Check, in this order:
1. Is the webhook listener running and forwarding the expected event?
2. Does Stripe show a successful delivery to the correct endpoint?
3. Does the endpoint return a successful HTTP response?
4. Do Netlify Function logs show signature, environment-variable, or
   Supabase errors?
5. Does the event's metadata.order_id correspond to the row whose
   stripe_session_id matches the session?
6. Does the webhook update the order only after verifying the signed
   event and paid session status?
Do not manually mark an order as paid just because a test payment
appears successful. Diagnose and repair the webhook or order update,
then verify the payment status against Stripe.
Project structure
The repository may evolve, but the main areas are organized
approximately as follows:
.
├── netlify/
│   └── functions/
│       ├── create-checkout-session.mts
│       ├── stripe-webhook.mts
│       └── order-status.mts
├── public/
│   └── images/
├── src/
│   ├── components/
│   │   ├── ecommerce/
│   │   ├── layout/
│   │   └── ui/
│   ├── config/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   └── types/
├── .env                 # local secrets; never commit
├── .gitignore
├── netlify.toml
├── package.json
└── README.md
Key areas to customize
- Products and categories: update the catalog files under
  src/data/.
- Store identity: update site configuration, navigation, footer,
  About page, and page copy.
- Visual design: adjust theme configuration and Tailwind classes.
- Cart behavior: review src/context/CartContext.tsx and the cart
  hooks.
- Checkout: review src/pages/Checkout.tsx and the
  create-checkout-session function.
- Payment confirmation: review stripe-webhook and
  order-status. Keep payment verification on the server.
- Order database: keep the Supabase schema aligned with the
  server-side functions.
Deployment to Netlify
1. Push the project to your Git repository.
2. Import the repository into Netlify.
3. Confirm the build command and publish directory match the
   repository's Vite configuration. Typical Vite settings are
   npm run build and dist, but verify the project's actual scripts
   and config.
4. Configure the required environment variables in Netlify, including
   Stripe, Supabase, and the production site URL.
5. Deploy the site and verify that the deployed Netlify Functions are
   available.
6. In Stripe's Dashboard, create a webhook endpoint pointing to:
   https://YOUR_SITE_DOMAIN/.netlify/functions/stripe-webhook
7. Subscribe the endpoint to the events handled by the webhook,
   including:
   - checkout.session.completed
   - checkout.session.async_payment_succeeded
8. Set STRIPE_WEBHOOK_SECRET in Netlify to the signing secret for
   this deployed endpoint.
9. Redeploy after changing environment variables if required, then test
   the complete flow on the deployed test environment.
Netlify function environment variables must be configured for the
Functions runtime. See the Netlify Functions
documentation.
Before going live
Do not switch to live payments until you have completed the following:
- [ ] Replace sample product data, prices, copy, images, and contact
  information.
- [ ] Verify server-side pricing, quantity limits, stock checks,
  shipping rules, and any tax calculations.
- [ ] Confirm Stripe webhook signature verification and safe handling
  of duplicate/retried events.
- [ ] Confirm orders become paid only after verified payment.
- [ ] Test successful, cancelled, failed, and delayed payment flows.
- [ ] Test that the cart clears only after the server confirms
  payment.
- [ ] Protect customer/order information and review Supabase Row Level
  Security and access policies.
- [ ] Configure production environment variables and the production
  webhook signing secret.
- [ ] Add and test fulfillment, confirmation emails, inventory
  updates, refunds, and customer support workflows as needed.
- [ ] Add appropriate privacy, terms, shipping, returns, and refund
  policies.
- [ ] Review accessibility, responsive layouts, error states, logging,
  abuse prevention, and rate limiting.
- [ ] Verify the .env file and all secret files are excluded from
  Git history and repository tracking.
This template is a starting point, not a complete compliance, tax,
inventory, fulfillment, or production security solution. Review the code
and business requirements before accepting real orders.
Useful commands
# Install dependencies
npm install

# Run the site with Netlify Functions
npx netlify dev

# Build the frontend
npm run build

# Start Stripe webhook forwarding (in a separate terminal)
stripe listen --events checkout.session.completed,checkout.session.async_payment_succeeded --forward-to localhost:8888/.netlify/functions/stripe-webhook
Check package.json for the scripts available in your current version
of the repository.
License
Add your chosen license here before distributing or reusing this
template. If you intend to make it public or allow commercial reuse,
include a LICENSE file with terms that match how you want others to
use the code.