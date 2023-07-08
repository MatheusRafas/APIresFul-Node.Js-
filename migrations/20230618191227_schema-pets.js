//Executar o script
exports.up = function(knex) {
    return knex.schema.createTable("pets", tbl => {
        tbl.increments ("id");
        tbl.text ("nome", 255).unique ().notNullable();
        tbl.text ("especie", 128).notNullable();
        tbl.text ("raca", 128).notNullable();
        tbl.date ("data_nascimento").notNullable();
        tbl.date ("data_cadastro").notNullable();
        tbl.text ("dono", 255).unique ().notNullable();
      });
  
};

//Desfazer o script
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("pets");
};
