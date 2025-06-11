## 🚀 Project Setup & Installation

test pr

This project is built with React (TypeScript) using Vite, Bun (or npm), TailwindCSS, and Axios. Deployed on Vercel.

### Prerequisites

- [Node.js](https://nodejs.org/) **OR** [Bun](https://bun.sh/) installed
- [Git](https://git-scm.com/) installed
- (Optional) A [GitHub API token](https://github.com/settings/tokens) for authenticated requests

### 1. Clone the Repository

```sh
git clone https://github.com/yohanesnaibaho303/atask-test-github-user-search.git
cd atask-test-github-user-search
```

### 2. Install Dependencies

Choose one of the following:

#### Using Bun (recommended for speed)
```sh
bun install
```

#### Using npm
```sh
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```sh
cp .env.example .env
```

Set your GitHub token (optional but recommended to increase API rate limits):

```
VITE_GITHUB_TOKEN=your_github_token_here
```
If you don't set a token, the app will still work but may hit GitHub's unauthenticated rate limits.

### 4. Run the Development Server

#### Using Bun
```sh
bun run dev
```

#### Using npm
```sh
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to view the app.

### 5. Build for Production

```sh
bun run build   # or npm run build
```

### 6. Run Tests & View Coverage

To run the tests and generate coverage report, use:

```sh
bun run test
```

- This will run all tests and generate a `coverage` folder in the project root.
- Coverage details will also be displayed in your terminal after the run completes.

### 7. Deploy

This project is ready for deployment on [Vercel](https://vercel.com/). You can import it directly from your GitHub repository, set the same environment variables in the Vercel dashboard, and deploy.

---
