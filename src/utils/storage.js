const db_version = 1;
const db_rules = 'readwrite';
const db_name = 'color-palette';
const tables = ['solid', 'gradient', 'palette', 'swatch', 'complement', 'split', 'analogous', 'triadic', 'tetradic'];

let db = null;
let request = indexedDB.open(db_name, db_version);
request.onerror = (e) => (db = e.target.result);
request.onsuccess = (e) => (db = e.target.result);
request.onupgradeneeded = (e) => tables.forEach((table) => e.target.result.createObjectStore(table, { keyPath: 'key' }));

const add = (table, data, callback) => {
   if (db === null) {
      request = indexedDB.open(db_name, db_version);
      request.onsuccess = (e) => {
         db = e.target.result;
         callback(db.transaction(table, db_rules).objectStore(table).add(data));
      };
   } else callback(db.transaction(table, db_rules).objectStore(table).add(data));
};

const update = (table, data, key, callback) => {
   if (db === null) {
      request = indexedDB.open(db_name, db_version);
      request.onsuccess = (e) => {
         db = e.target.result;

         const store = db.transaction(table, db_rules).objectStore(table);
         store.get(key).onsuccess = () => callback(store.put(data));
      };
   } else {
      const store = db.transaction(table, db_rules).objectStore(table);
      store.get(key).onsuccess = () => callback(store.put(data));
   }
};

const removeOne = (table, key, callback) => {
   if (db === null) {
      request = indexedDB.open(db_name, db_version);
      request.onsuccess = (e) => {
         db = e.target.result;

         const store = db.transaction(table, db_rules).objectStore(table);
         store.get(key).onsuccess = () => callback(store.delete(key));
      };
   } else {
      const store = db.transaction(table, db_rules).objectStore(table);
      store.get(key).onsuccess = () => callback(store.delete(key));
   }
};

const removeAll = (table, callback) => {
   if (db === null) {
      request = indexedDB.open(db_name, db_version);
      request.onsuccess = (e) => {
         db = e.target.result;

         callback(db.transaction(table, db_rules).objectStore(table).clear());
      };
   } else callback(db.transaction(table, db_rules).objectStore(table).clear());
};

const fetchOne = (table, key, callback) => {
   if (db === null) {
      request = indexedDB.open(db_name, db_version);
      request.onsuccess = (e) => {
         db = e.target.result;
         callback(db.transaction(table).objectStore(table).get(key));
      };
   } else callback(db.transaction(table).objectStore(table).get(key));
};

const fetchAll = (table, callback) => {
   if (db === null) {
      request = indexedDB.open(db_name, db_version);
      request.onsuccess = (e) => {
         db = e.target.result;
         callback(db.transaction(table).objectStore(table).getAll());
      };
   } else callback(db.transaction(table).objectStore(table).getAll());
};

export { add, update, removeOne, removeAll, fetchAll, fetchOne };
