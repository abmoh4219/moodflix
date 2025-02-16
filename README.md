# Moodflix

Moodflix is a movie streaming web app built using React and Appwrite. It allows users to search for movies, view trending movies, and see their posters, while also keeping track of the most popular searches.

## Features

- **Search Movies**: Users can search for movies by their names.
- **Trending Section**: Displays the most searched movies with their posters.
- **Movie Posters**: Displays posters for movies with fallback if the poster URL is unavailable.
- **Real-time Data**: Uses Appwrite to store and update search counts in real-time.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Appwrite
- **API**: TMDB (The Movie Database)
- **Others**: Vite (build tool)

## Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- Git
- Appwrite account (for database and authentication)
- TMDB API Key (for movie search and poster retrieval)

### Clone the Repository

```bash
git clone https://github.com/abmoh4219/moodflix.git
cd moodflix

Install Dependencies
  -npm install

Set Up Environment Variables
 -Create a .env.local file in the root of the project and add your Appwrite project settings and TMDB API key:
 -VITE_APPWRITE_PROJECT_ID=<your_project_id>
 -VITE_APPWRITE_DATABASE_ID=<your_database_id>
 -VITE_APPWRITE_COLLECTION_ID=<your_collection_id>
 -VITE_TMDB_API_KEY=<your_tmdb_api_key>

Run the Development Server
```
Deployment
To deploy your app, you can use platforms like Vercel or Netlify.

License
This project is licensed under the MIT License - see the LICENSE file for details.
