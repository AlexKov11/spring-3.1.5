$('#delete').on('show.bs.modal', ev => {
    let button = $(ev.relatedTarget);
    let id = button.data('id');
    showDeleteModal(id);
})

async function getUser(id) {
    let url = "http://localhost:8080/adminProfile/" + id;
    let response = await fetch(url);
    return await response.json();
}

async function showDeleteModal(id) {
    let user = await getUser(id);
    let form = document.forms["deleteUserForm"];
    form.id.value = user.id;
    form.username.value = user.username;
    form.email.value = user.email;

    $('#rolesDeleteUser').empty();

    await fetch("http://localhost:8080/adminProfile/roles")
        .then(res => res.json())
        .then(roles => {
            roles.forEach(role => {
                let selectedRole = false;
                for (let i = 0; i < user.roles.length; i++) {
                    if (user.roles[i].name === role.name) {
                        selectedRole = true;
                        break;
                    }
                }
                let el = document.createElement("option");
                el.text = role.name.substring(5);
                el.value = role.id;
                if (selectedRole) el.selected = true;
                $('#rolesDeleteUser')[0].appendChild(el);
            })
        })
}

$(async function () {
    deleteUser();
});

function deleteUser() {
    const deleteForm = document.forms["deleteUserForm"];
    deleteForm.addEventListener("submit", async ev => {
        ev.preventDefault();
        await fetch("adminProfile/users/" + deleteForm.id.value, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'

            }
        })
            .then(() => {
                allUsers();
                $('#deleteFormCloseButton').click();
            })
    })
}



