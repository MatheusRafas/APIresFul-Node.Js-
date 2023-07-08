//Executar o script
exports.up = function(knex) {
    return knex.schema.createTable("usuarios", tbl => {
        tbl.increments ("id");
        tbl.text ("nome", 255).unique().notNullable();
        tbl.text ("login", 100).unique().notNullable();
        tbl.text ("senha", 100).notNullable();
        tbl.text ("email",255).notNullable();
        tbl.text ("roles",255).notNullable();
      });
  
};

//Desfazer o script
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("usuarios");
};