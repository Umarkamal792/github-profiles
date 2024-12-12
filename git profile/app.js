function fetchProfile() {
    var username = document.getElementById('username-input').value;
    if (!username) {
        Swal.fire('Please enter a username.');
        return;
    }

    fetch(`https://api.github.com/users/${username}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.message === "Not Found") {
                Swal.fire('User not found.')
            } else {
                displayProfile(data);
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
}

function displayProfile(data) {
    var profileCard = document.getElementById('profile-card');
    profileCard.style.display = 'block';

    document.getElementById('avatar').src = data.avatar_url;
    document.getElementById('name').textContent = data.name || data.login;
    document.getElementById('email').textContent = data.email || 'Email not available';
    document.getElementById('bio').textContent = data.bio || 'No bio available';
    document.getElementById('followers').textContent = data.followers;
    document.getElementById('following').textContent = data.following;
    document.getElementById('repos').textContent = data.public_repos;

    var githubLink = document.getElementById('github-link');
    githubLink.onclick = function () {
        window.open(data.html_url, '_blank');
    };

    
}

