# Film Finder

Film Finder is a React Native mobile application. It allows movie enthusiasts to discover trending films, locate their real-world filming locations on an interactive map, and save them for future reference.

## Feature List
* **Interactive Maps:** Utilizes react-native-maps to render dynamic geospatial markers for filming locations.
* **Cloud Integration:** Integrates with Supabase for secure user authentication and remote data storage.
* **Notifications:** Implements Expo Notifications to alert users when a location is successfully saved to their profile.

## Setup & Installation Instructions 
* **Clone the repository:** git clone (YOUR_GITHUB_REPO_URL) & enter cd FilmFinder. 
* **Install dependencies:** npm install --legacy-peer-deps
* **Start the Expo Server:** npx expo start 

## Environment Variables (.env Requirements)
To run this project locally, create a `.env` file in the root directory and include the following variables:
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
