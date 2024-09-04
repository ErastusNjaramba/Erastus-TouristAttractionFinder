import { auth, db } from './firebase.js';

// Handle user registration
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await auth.createUserWithEmailAndPassword(email, password);
        window.location.href = 'login.html';
    } catch (error) {
        alert(error.message);
    }
});

// Handle user login
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        window.location.href = 'index.html';
    } catch (error) {
        alert(error.message);
    }
});

// Handle adding an attraction
document.getElementById('add-attraction-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const location = document.getElementById('location').value;
    const imageUrl = document.getElementById('imageUrl').value;

    try {
        await db.collection('attractions').add({
            name,
            description,
            location,
            imageUrl
        });
        window.location.href = 'index.html';
    } catch (error) {
        alert(error.message);
    }
});

// Display attractions
document.addEventListener('DOMContentLoaded', async () => {
    const attractionsList = document.getElementById('attractions-list');
    const snapshot = await db.collection('attractions').get();
    snapshot.forEach(doc => {
        const data = doc.data();
        const attractionElement = document.createElement('div');
        attractionElement.innerHTML = `
            <h2>${data.name}</h2>
            <p>${data.description}</p>
            <p>${data.location}</p>
            <img src="${data.imageUrl}" alt="${data.name}" style="width: 200px; height: auto;">
        `;
        attractionsList.appendChild(attractionElement);
    });
});
