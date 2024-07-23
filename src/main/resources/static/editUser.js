$('#edit').on('show.bs.modal', ev => {
    let button = $(ev.relatedTarget);
    let id = button.data('id');
    showEditModal(id);
})

async function showEditModal(id) {
    let user = await getUser(id);
    let form = document.forms["editUserForm"];
    form.id.value = user.id;
    form.username.value = user.username;
    form.email.value = user.email;
    form.password.value = user.password;

    $('#rolesEditUser').empty();

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
                $('#rolesEditUser')[0].appendChild(el);
            })
        })
}

$(async function () {
    editUser();
});

function editUser() {
    const editForm = document.forms["editUserForm"];
    editForm.addEventListener("submit", async ev => {
        ev.preventDefault();
        const roles = editForm.roles.options;
        let rolesList = [];
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].selected) rolesList.push({
                id: roles[i].value,
                name: "ROLE_" + roles[i].text
            });
        }
        let body = JSON.stringify({
            id: editForm.id.value,
            username: editForm.username.value,
            email: editForm.email.value,
            password: editForm.password.value,
            roles: rolesList
        })
        console.log(body)
        await fetch("adminProfile/" + editForm.id.value, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(() => {
                allUsers();
                $('#editFormCloseButton').click();
            })
    })
}