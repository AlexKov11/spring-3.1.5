$(async function () {
    await loadRoles();
});

async function loadRoles() {
    try {
        const response = await fetch("http://localhost:8080/adminProfile/roles");
        const roles = await response.json();
        const roleSelect = $('#new-userRole')[0];

        roles.forEach(role => {
            const option = document.createElement('option');
            option.text = role.name.substring(5); // Удалить "ROLE_" из имени роли
            option.value = role.id;
            roleSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading roles:', error);
    }
}

$(async function () {
    await initializeAddUserForm();
});

async function initializeAddUserForm() {
    const addForm = document.forms["newUserForm"];

    addForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const selectedRoles = Array.from(addForm.roles.options)
            .filter(option => option.selected)
            .map(option => ({
                id: option.value,
                name: `ROLE_${option.text}`
            }));

        const newUser = {
            id: addForm.id.value,
            username: addForm.username.value,
            email: addForm.email.value,
            password: addForm.password.value,
            roles: selectedRoles
        };

        try {
            await fetch("http://localhost:8080/adminProfile/newUser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            addForm.reset();
            await allUsers(); // Обновить список пользователей
            $('#nav-adminTable').click(); // Переключиться на вкладку пользователей
        } catch (error) {
            console.error('Error adding user:', error);
        }
    });
}




