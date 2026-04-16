# Backend Programming Template (2025)

## Development Setup

1. Fork and clone this repository to your local computer.
2. Open the project using VS Code.
3. Install the recommended VS Code extensions: `ESLint` and `Prettier`.
4. Copy and rename `.env.example` to `.env`. Open `.env` and change the database connection string.
5. Run `npm install` to install the project dependencies.
6. Run `npm run dev` to start the dev server.
7. Test the endpoints in the API client app.

## Add New API Endpoints

1. Create a new database schema in `./src/models`.
2. Create a new folder in `./src/api/components` (if needed). Remember to separate your codes to repositories, services, controllers, and routes.
3. Add the new route in `./src/api/routes.js`.
4. Test your new endpoints in the API client app.

## Penjelasan EndPoint

1. Play Gacha (POST /play): Digunakan untuk bermain gacha. Perlu input JSON body berupa userId. Respons sistem akan berupa hasil gacha dan secara otomatis membatasi setiap user maksimal 5 kali percobaan per hari.

2. List Rewards (GET /rewards): Menampilkan daftar seluruh hadiah yang ada beserta sisa kuota untuk masing-masing hadiah. Data ini akan berkurang secara otomatis setiap kali ada user yang menang.

3. Winners List (GET /winners): Menampilkan daftar user yang telah memenangkan hadiah. Nama pemenang akan disamarkan secara acak (contoh: J*\*\* *oe) untuk melindungi privasi user.

4. User Gacha History (GET /history/:id): Menampilkan seluruh riwayat aktivitas gacha setiap user yang main. Masukkan ID User pada parameter URL (path parameter) untuk melihat daftar menang maupun kalah user tersebut.
