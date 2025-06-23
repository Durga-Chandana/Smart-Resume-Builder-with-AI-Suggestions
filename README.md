# Smart Resume Builder with AI Suggestions

A modern full-stack resume builder application with AI-powered suggestion features and PDF export functionality.

---

## Features

* Dynamic Resume Form – Input personal info, education, experience, skills, and summary
* Live Preview – See real-time updates to your resume
* PDF Export – Download/print your resume instantly
* 🤖AI Suggestions

  * Primary: OpenAI GPT-3.5 (Free Tier)
  * Fallback: Local logic for offline suggestions
* Role-Based Advice – Developer, Designer, Manager-specific resume tips
* Responsive UI – Built with React & Tailwind CSS, with animations and gradient styling

---

## Technologies Used

### Frontend:

* React.js
* Tailwind CSS

### Backend:

* Node.js
* Express.js

### Database:

* MongoDB Atlas

### AI:

* OpenAI GPT-3.5 
* Local fallback suggestion engine (Optional)

---

## Getting Started

### Prerequisites

* Node.js and npm installed
* MongoDB Atlas account (for DB connection)

### Installation

#### Clone the Repo

```bash
git clone https://github.com/your-username/smart-resume-builder.git
cd smart-resume-builder
```

#### Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in `server/` and add:

```bash
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
```

Then run:

```bash
npm start
```

#### Setup Frontend

```bash
cd ../client
npm install
npm start
```

The app runs at `http://localhost:3000` and connects to backend at `http://localhost:5000`

---

## AI Suggestions API (Fallback Supported)

* Frontend sends resume data to backend (`/api/openai-suggestions`)
* If OpenAI fails or is disabled, the local suggestion engine provides useful feedback

---

## Folder Structure

```
smart-resume-builder/
├── client/         # React Frontend
│   └── src/
│       ├── components/
│       └── App.js
├── server/         # Node.js Backend
│   └── index.js
└── README.md
```

---

##  Future Improvements

* User Authentication
* Resume Templates
* Cover Letter Generator
* DOCX Export Option

---

## License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgments

* [OpenAI](https://openai.com)
* [Tailwind CSS](https://tailwindcss.com)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
