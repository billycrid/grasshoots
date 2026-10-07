exports.up = (pgm) => {
  pgm.createSchema('platform');
  pgm.createTable(
    { schema: 'platform', name: 'schema_version' },
    {
      singleton: { type: 'boolean', primaryKey: true, default: true, check: 'singleton = true' },
      version: { type: 'integer', notNull: true },
      installed_at: { type: 'timestamptz', notNull: true, default: pgm.func('CURRENT_TIMESTAMP') },
    },
  );
  pgm.sql('INSERT INTO platform.schema_version (singleton, version) VALUES (true, 1)');
};
exports.down = (pgm) => {
  pgm.dropTable({ schema: 'platform', name: 'schema_version' });
  pgm.dropSchema('platform');
};
