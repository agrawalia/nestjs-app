
# NestJS Supabase API

This project is a NestJS-based backend API that interacts with Supabase for database operations. It provides endpoints to manage companies, markets, trades, and news.


## Features

- CRUD operations for Companies, Markets, Trades, and News
- Standardized response handling using a utility class
- Filtering and querying capabilities
- No ORM, direct Supabase queries

## Technologies Used

- NestJS
- Supabase
- Typescript




## Setup Instructions

### Prerequisites
- Node.js (>=16.x.x)
- npm or yarn
- Supabase account and project

### Installation

Clone the repository:

```bash
git clone https://github.com/agrawalia/nestjs-app.git
cd nestjs-app
```

Install dependencies:
```bash
npm install
```

Create a .env file and add your Supabase credentials:
```bash
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

Start the application:
```bash
npm run start
```
    
## API Reference

#### Companies

Retrieve all companies with related market and trade data
```http
GET /company 
``` 

Create a new company
```http
POST /company
```

Update an existing company
```http
PUT /company/:id
```

Delete a company
```http
DELETE /company/:id
```

Toggle Interest
```http
POST /toggle-interest/:id
```

#### Markets

Retrieve all market data with filters
```http
GET /market 
``` 

Create a new market
```http
POST /market
```

Update an existing market
```http
PUT /market/:id
```

Delete a market
```http
DELETE /market/:id
```

#### Trades

Retrieve all trades with associated market and company data
```http
GET /trade 
``` 

Create a new trade
```http
POST /trade
```

Update an existing trade
```http
PUT /trade/:id
```

Delete a trade
```http
DELETE /trade/:id
```

#### News

Retrieve news articles related to companies
```http
GET /news 
``` 

Create a new news
```http
POST /news
```

Update an existing news
```http
PUT /news/:id
```

Delete a news
```http
DELETE /news/:id
```

