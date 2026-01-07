# Candle Velarte Cain

Artisan hand-poured candle shop website built with Next.js 15.

## Features

- **Product Catalog**: Dynamic product listing from a local JSON source.
- **Product Detail**: Detailed views with variant selection and quantity management.
- **Order Request**: Lightweight "cart" system where users submit requests via email.
- **Email Integration**: Integrated with Resend for reliable email delivery.
- **Modern UI**: Clean, responsive design using Tailwind CSS and Lucide icons.
- **Performance**: Built with Next.js 15 App Router and optimized images.

## Setup Instructions

1. **Clone the repository** (if applicable).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up Environment Variables**:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   RESEND_API_KEY=your_resend_api_key
   ORDERS_EMAIL=your_email@example.com
   FROM_EMAIL=onboarding@resend.dev
   ```
   *Note: `FROM_EMAIL` must be a verified domain in Resend if you're not using their default onboarding email.*

4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## How to Add a New Product

1. Navigate to `@/content/products.json`.
2. Add a new object to the array with the following structure:
   ```json
   {
     "slug": "unique-slug-here",
     "name": "Product Name",
     "shortDescription": "Brief catchphrase",
     "description": "Full product description",
     "images": ["https://url-to-image.jpg"],
     "priceFrom": 20,
     "tags": ["Tag1", "Tag2"],
     "variants": [
       { "id": "v1", "label": "Small", "price": 20 },
       { "id": "v2", "label": "Large", "price": 30 }
     ]
   }
   ```
3. Save the file. The new product will automatically appear on the site.

## Deployment to Vercel

1. Push your code to a GitHub/GitLab/Bitbucket repository.
2. Connect your repository to Vercel.
3. Add the Environment Variables (`RESEND_API_KEY`, `ORDERS_EMAIL`, `FROM_EMAIL`) in the Vercel project settings.
4. Deploy!

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Validation**: Zod
- **Email**: Resend
