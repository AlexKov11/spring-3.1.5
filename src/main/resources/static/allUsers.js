$(async function () {
    await allUsers();
});
const table = $('#all-user-tbody');

async function allUsers() {
    table.empty()
    fetch("http://localhost:8080/adminProfile")
        .then(res => res.json())
        .then(data => {
            data.forEach(user => {
                let roles = user.roles.map(role => role.name.replaceAll('ROLE_', '')).join(" ");
                let tableRow = `$(
            <tr>
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${roles}</td>
                <td>
                    <button type="button" class="btn btn-info" data-toggle="modal" id="buttonEdit"
                    data-action="edit" data-id="${user.id}" data-target="#edit">Edit
                    </button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" data-toggle="modal" id="buttonDelete"
                    data-action="delete" data-id="${user.id}" data-target="#delete">Delete</button>
                </td>
               
            </tr>)`;
                table.append(tableRow);
            })
        })
}




