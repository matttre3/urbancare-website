import * as migration_20261007_202853_initial from './20261007_202853_initial';

export const migrations = [
  {
    up: migration_20261007_202853_initial.up,
    down: migration_20261007_202853_initial.down,
    name: '20261007_202853_initial'
  },
];
