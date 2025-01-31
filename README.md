# Test Assignment
Implement simple REST API server as defined in the [API documentation](https://openapi_apidocs.abz.dev/frontend-test-assignment-v1#/token/get_token) 


## Demo

- Frontend: https://test-assignment.sileikisdemo.net/
- API Server: https://test-assignment-api.sileikisdemo.net/


### Built With
- Backend: Laravel 11, tinify and jwt-auth package
- Frontend: React.js, Tailwind CSS

---

## Installation

### Prerequisites
Ensure you have the following installed on your system:
- PHP 8.2 or higher
- MySQL
- Composer
- Node.js and npm

### Steps to Install

1. **Clone the Repository**
   ```
   git clone <https://github.com/RaimondasSileikis/abz-test-assignment.git>
   cd abz-test-assignment
   ```

2. **Set up Backend**

- Copy the example environment file and update credentials: `cp .env.example .env`
- Set up the database and configure credentials in `.env.`
- Install dependencies: `composer install`
- Generate the application key: `php artisan key:generate --ansi`
- Run migrations and seed the database: `php artisan migrate --seed`
- Generate the JWT secret key: `php artisan jwt:secret`
- Add your Tinify API key to .env: `TINIFY_API_KEY=your_tinify_api_key_here`
- Start the Laravel server: `php artisan serve`

3. **Set up Frontend**

- Navigate to the React frontend directory: `cd fronted`
- Install npm dependencies: `npm install`
- Copy `cp .env.example .env`
- VITE_API_BASE_URL key in `.env` is set to API host (http://localhost:8000)
- Start the Vite development server: `npm run dev`

### Let me know if you’d like to tweak this further!
