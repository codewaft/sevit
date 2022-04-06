<img src="https://i.imgur.com/wcSNV8i.png" height="46">

Free and open-source text message (SMS) bulk broadcast marketing web app.

### Server requirements
- [Node.js](https://nodejs.org/en/download/) 16.14.2 or later
- [PHP](https://www.php.net/downloads.php) 8.0 or later with following extensions enabled
  - BCMath
  - Ctype
  - cURL
  - DOM
  - Fileinfo
  - JSON
  - Mbstring
  - OpenSSL
  - PCRE
  - PDO
  - Tokenizer
  - XML
- [Composer](https://getcomposer.org/download/) v2.3.3 or later

### Installation
1. Download latest Sevit release from [Releases](https://github.com/codewaft/sevit/releases).
2. Copy the downloaded package to your server and extract it.
3. Change directory to root of the project.
4. Copy example environment variable configuration file `.env.example` to `.env`.
5. Configure following variables.
```sh
APP_URL=http://example.com # Host/domain name

APP_USER_USERNAME=admin # Sevit admin username
APP_USER_PASSWORD=password # Sevit admin password

DB_CONNECTION=mysql # Database connection: mysql, sqlite, pgsql or sqlsrv
DATABASE_URL= # Database url
DB_HOST=127.0.0.1 # Database host
DB_PORT=3306 # Database port
DB_DATABASE=sevit # Database name
DB_USERNAME=root # Database username
DB_PASSWORD= # Database password

TWILLIO_ACCOUNT_SID= # Twillio account SID
TWILLIO_AUTH_TOKEN= # Twillio account auth token
TWILLIO_PHONE_NUMBER= # Twillio phone number
```
7. Install backend dependencies using [Composer](https://getcomposer.org/download/) by running following command.
```sh
composer install --optimize-autoloader --no-dev
```
8. Generate application key by running following command.
```sh
php artisan key:generate
```
1. Setup database by running following command.
```sh
php artisan migrate:fresh --seed
```
10. Optimize configuration, route and view loading by running following command.
```sh
php artisan config:cache
php artisan route:cache
php artisan view:cache
```
11.  Install the frontend dependencies using [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) by running following command.
```sh
npm install
```
12. Create a production ready build of frontend by running following command.
```sh
npm run prod
```
13.  Set a cron job for every minutes to run `php artisan schedule:run` command from root of the project.
```sh
* * * * * cd /path/to/sevit && php artisan schedule:run >> /dev/null 2>&1
```
14.  Configure your web server as document root as `public` directory from the project root. You can find sample web server configuration files for Nginx (`nginx.conf`) and Apache (`apache.conf`) from root of the project.
