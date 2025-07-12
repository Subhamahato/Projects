# 🌐 Project Dashboard by Shubham

This is a centralized **web project dashboard** built in HTML, CSS, and JavaScript.  
It serves as a **single access point** to open and explore multiple websites/projects from one main page without hosting them individually.

---

## 📌 Features

- Clean and responsive design
- Links to all your local web projects
- All links open in a **new tab** (so users can't return with the back button)
- Easy to maintain and extend
- No external libraries used

---

## 🧠 Idea Behind This Project

Instead of hosting each project separately, this dashboard hosts only one main `index.html` file.  
Each card links to your local projects saved in subfolders. This approach:

- Saves time and money (no hosting needed for each project)
- Keeps everything organized in one place
- Helps showcase all your work from one page

---

## 📁 Folder Structure
```
project-dashboard/
├── index.html              # Main dashboard file
├── README.md               # Documentation file
├── my-pustakalay/          # Project 1 folder
│   └── index.html
├── tech-tools/             # Project 2 folder
│   └── index.html
├── weather-app/            # Project 3 folder
│   └── index.html
└── ... (add more folders here as needed)
```

> 📁 Each subfolder contains a full web project with its own HTML/CSS/JS files.

---

## 🚀 How to Use

1. Open the `index.html` file in any browser.
2. Click on any project card to open that website in a **new tab**.
3. All projects are stored **locally**, so no internet is required.
4. To add a new project:
   - Create a new folder with the project files
   - Add a new `<div class="card">` block in `index.html` pointing to it

---

## ✅ Example Project Card in `index.html`

```html
<div class="card">
  <h3>Project Title</h3>
  <p>Short description of the project.</p>
  <a href="folder-name/index.html" target="_blank">Open</a>
</div>
```
