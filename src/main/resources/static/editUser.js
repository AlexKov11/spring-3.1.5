$('#edit').on('show.bs.modal', async (event) => {
    const button = $(event.relatedTarget);
    const userId = button.data('id');
    await showEditModal(userId);
});

async function getUser(id) {
    const url = `http://localhost:8080/adminProfile/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

async function showEditModal(userId) {
    try {
        const user = await getUser(userId);
        const form = document.forms["editUserForm"];
        form.id.value = user.id;
        form.username.value = user.username;
        form.email.value = user.email;
        form.password.value = user.password;

        $('#rolesEditUser').empty();

        const rolesResponse = await fetch("http://localhost:8080/adminProfile/roles");
        if (!rolesResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const roles = await rolesResponse.json();

        roles.forEach(role => {
            const option = document.createElement("option");
            option.text = role.name.substring(5); // Удалить "ROLE_" из имени роли
            option.value = role.id;

            // Отметить выбранные роли
            if (user.roles.some(userRole => userRole.name === role.name)) {
                option.selected = true;
            }

            $('#rolesEditUser')[0].appendChild(option);
        });
    } catch (error) {
        console.error('Error showing edit modal:', error);
    }
}
$(async function () {
    setupEditUserForm();
});

function setupEditUserForm() {
    const editForm = document.forms["editUserForm"];

    editForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
            const roles = Array.from(editForm.roles.options)
                .filter(option => option.selected)
                .map(option => ({
                    id: option.value,
                    name: `ROLE_${option.text}`
                }));

            const body = JSON.stringify({
                id: editForm.id.value,
                username: editForm.username.value,
                email: editForm.email.value,
                password: editForm.password.value,
                roles: roles
            });

            const response = await fetch(`http://localhost:8080/adminProfile/edit/${editForm.id.value}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Обновить список пользователей и закрыть модальное окно
            await allUsers();
            $('#edit').modal('hide'); // Закрыть модальное окно редактирования
        } catch (error) {
            console.error('Error editing user:', error);
        }
    });
}
