$('#delete').on('show.bs.modal', async (event) => {
    const button = $(event.relatedTarget);
    const userId = button.data('id');
    await showDeleteModal(userId);
});

async function getUser(id) {
    const url = `http://localhost:8080/adminProfile/${id}`;
    const response = await fetch(url);
    return await response.json();
}

async function showDeleteModal(userId) {
    try {
        const user = await getUser(userId);
        const form = document.forms["deleteUserForm"];
        form.id.value = user.id;
        form.username.value = user.username;
        form.email.value = user.email;

        // Очистить список ролей перед заполнением
        $('#rolesDeleteUser').empty();

        const rolesResponse = await fetch("http://localhost:8080/adminProfile/roles");
        const roles = await rolesResponse.json();

        roles.forEach(role => {
            const option = document.createElement("option");
            option.text = role.name.substring(5); // Удалить "ROLE_" из имени роли
            option.value = role.id;

            // Отметить выбранные роли
            if (user.roles.some(userRole => userRole.name === role.name)) {
                option.selected = true;
            }

            $('#rolesDeleteUser')[0].appendChild(option);
        });
    } catch (error) {
        console.error('Error showing delete modal:', error);
    }
}
$(async function () {
    setupDeleteUserForm();
});

function setupDeleteUserForm() {
    const deleteForm = document.forms["deleteUserForm"];

    deleteForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
            const userId = deleteForm.id.value;
            await fetch(`http://localhost:8080/adminProfile/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Обновить список пользователей и закрыть модальное окно
            await allUsers();
            $('#delete').modal('hide'); // Закрыть модальное окно удаления
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    });
}




