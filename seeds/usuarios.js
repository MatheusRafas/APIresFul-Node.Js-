exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('usuarios').del()
  await knex('usuarios').insert([
    {id: 1, nome: 'Administrador', 
    login: 'admin', 
    senha: '1234', //1234
    email: 'admin@gmail.com', 
    roles: 'ADMIN:USER'},
    {id: 2, nome: 'Usuario', 
    login: 'user', 
    senha: '1234', //1234
    email: 'user@gmail.com', 
    roles: 'USER'},
  ]);
};
