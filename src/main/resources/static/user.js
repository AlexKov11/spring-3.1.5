$(async function () {
    await thisUser();
});

async function thisUser() {
    fetch("http://localhost:8080/userProfile")
        .then(res => res.json())
        .then(data => {
            //info for nav-bar
            $('#header-username').append(data.username);
            let roles = data.roles.map(role => role.name.replaceAll('ROLE_', '')).join(" ");
            $('#header-roles').append(roles);

            let user = `$(
            <tr>
                <td>${data.id}</td>
                <td>${data.username}</td>
                <td>${data.email}</td>
                <td>${roles}</td>)`;
            $('#user-panel-tbody').append(user);
        })
}