// Function to fetch user data from GitHub
const fetchUserData = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
        alert("User not found!");
        return;
    }
    const data = await response.json();
    console.log("Fetched Data:", data);  // Log the full data for debugging
    displayUserData(data);
};

// Function to display the fetched user data
const displayUserData = (data) => {
    console.log("Display Data:", data);  // Log data here as well for debugging

    // Display Twitter Username (Check if 'twitter_username' exists in the data)
    const twitter = data.twitter_username ? data.twitter_username : 'Not available';
    console.log("GitHub Twitter Username:", twitter);  // Log the twitter username for debugging
    document.getElementById('github-twitter').querySelector('.twit').textContent = twitter;

    // Display Company (Check if 'company' exists in the data)
    const company = data.company ? data.company : 'Not available';
    console.log("GitHub Company:", company);  // Log the company for debugging
    document.getElementById('github-company').querySelector('.companies').textContent = company;

    // Display Location (Check if 'location' exists in the data)
    const location = data.location ? data.location : 'Not available';
    console.log("GitHub Location:", location);  // Log the location for debugging
    document.getElementById('github-location').querySelector('.locations').textContent = location;

    // Display Website (Check if 'blog' exists in the data)
    const website = data.blog ? data.blog : 'Not available';
    console.log("GitHub Website:", website);  // Log the website for debugging
    document.getElementById('github-website').querySelector('.websites').textContent = website;

    // Display Followers count (Check if 'followers' exists in the data)
    const followersCount = data.followers !== undefined ? data.followers : 0;
    console.log("Followers Count:", followersCount);  // Log the followers count
    document.getElementById('follower-count').textContent = followersCount;

    // Display Following count (Check if 'following' exists in the data)
    const followingCount = data.following !== undefined ? data.following : 0;
    console.log("Following Count:", followingCount);  // Log the following count
    document.getElementById('following-count').textContent = followingCount;

    // Display Repository count (Check if 'public_repos' exists in the data)
    const repoCount = data.public_repos !== undefined ? data.public_repos : 0;
    console.log("Repository Count:", repoCount);  // Log the repository count
    document.getElementById('repo-count').textContent = repoCount;

    // Other display logic for the rest of the data...
    document.getElementById('profile-img').style.backgroundImage = `url(${data.avatar_url})`;
    document.getElementById('github-user').textContent = data.name || 'Github username';
    document.getElementById('github-user-name').textContent = `@${data.login}`;
    document.getElementById('profile-link').href = data.html_url;
    document.getElementById('joined-date').textContent = `Joined ${new Date(data.created_at).toLocaleDateString()}`;
    document.getElementById('github-bio').textContent = data.bio || 'No bio available';
};

// Event listener for the search button
document.getElementById('search-btn').addEventListener('click', () => {
    const username = document.getElementById('search-input').value.trim();
    if (username) {
        fetchUserData(username);
    }
});

// Function to toggle between light and dark modes
const toggleMode = () => {
    const htmlElement = document.documentElement; // <html> element
    const currentMode = htmlElement.getAttribute('color-mode');

    // Toggle the mode
    if (currentMode === 'light') {
        htmlElement.setAttribute('color-mode', 'dark');
        localStorage.setItem('color-mode', 'dark');
        // Toggle button visibility
        document.querySelector('.light--hidden').classList.remove('light--hidden');
        document.querySelector('.dark--hidden').classList.add('light--hidden');
    } else {
        htmlElement.setAttribute('color-mode', 'light');
        localStorage.setItem('color-mode', 'light');
        // Toggle button visibility
        document.querySelector('.dark--hidden').classList.remove('light--hidden');
        document.querySelector('.light--hidden').classList.add('light--hidden');
    }
};

// Event listener for the light/dark mode toggle buttons
document.querySelector('.light-dark').addEventListener('click', toggleMode);

// Apply the saved mode on page load (from localStorage)
document.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('color-mode') || 'light';
    document.documentElement.setAttribute('color-mode', savedMode);
    if (savedMode === 'dark') {
        document.querySelector('.light--hidden').classList.remove('light--hidden');
        document.querySelector('.dark--hidden').classList.add('light--hidden');
    }
});
