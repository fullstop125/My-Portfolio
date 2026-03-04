import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectsFilePath = path.join(__dirname, 'src', 'data', 'projects.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

async function addProject() {
  console.log('\n=== Add New Portfolio Project ===\n');
  
  try {
    const title = await askQuestion('Project Title: ');
    const imag = await askQuestion('Image filename (e.g., project.png) [must be placed in public/images/about-image/]: ');
    const role = await askQuestion('Role (e.g., Front End Dev): ');
    const clientName = await askQuestion('Client/Company Name: ');
    const clientYear = await askQuestion('Year: ');
    const projectDescription = await askQuestion('Description: ');
    const tagsInput = await askQuestion('Tags (comma separated, e.g., React, Tailwind, Node.js): ');
    const seeLive = await askQuestion('Live URL: ');
    const seeSource = await askQuestion('Source Code URL: ');

    const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);

    const newProject = {
      title,
      imag,
      role,
      clientName,
      clientYear,
      projectDescription,
      tags,
      seeLive,
      seeSource
    };

    const data = fs.readFileSync(projectsFilePath, 'utf8');
    const projects = JSON.parse(data);
    
    // Add new project to the beginning of the array so it shows up first
    projects.unshift(newProject);

    fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2));
    
    console.log('\n✅ Project successfully added to src/data/projects.json!');
    console.log(`Don't forget to place the image '${imag}' inside the 'public/images/about-image/' directory.`);
    
  } catch (error) {
    console.error('Error adding project:', error);
  } finally {
    rl.close();
  }
}

addProject();
