# Film Finder

Film Finder is a React Native mobile application. It allows movie enthusiasts to discover trending films, locate their real-world filming locations on an interactive map, and save them for future reference.

## Feature List
* **Secure Authentication:** Protected user routes with session persistence using `expo-secure-store` and Supabase Auth.
* **Interactive Maps:** Utilizes react-native-maps to render dynamic geospatial markers for filming locations.
* **Cloud Integration:** Integrates with Supabase for secure user authentication and remote data storage.
* **Notifications:** Implements Expo Notifications to alert users when a location is successfully saved to their profile.

## Setup & Installation Instructions 
* **Clone the repository:** git clone (https://github.com/FL-ASH14/CSCI-370-Project-.git) & enter cd CSCI-370-Project-. 
* **Install dependencies:** npm install --legacy-peer-deps
* **Start the Expo Server:** npx expo start 

## Environment Variables (.env Requirements)
To run this project locally, create a `.env` file in the root directory and include the following variables:
We have the Supabase ANON Key submitted to you in the Project Phase 5 Submission on Oaks 
```env
EXPO_PUBLIC_SUPABASE_URL=(https://rkbaqtnwavdfeipzecyk.supabase.co)
EXPO_PUBLIC_SUPABASE_ANON_KEY=<insert_key_provided_in_oaks_submission>

