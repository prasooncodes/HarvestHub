let url;

if (window.location.hostname === 'localhost') {
    url = 'http://localhost:4999';
} else if (window.location.hostname === 'cropmate.onrender.com') {
    url = 'https://harvesthub-ro0t.onrender.com';
} else {
    // Default URL
    url = 'http://localhost:4999';
}

export default url;