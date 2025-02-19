-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active'
);
INSERT INTO "new_Resource" ("id", "name", "value") SELECT "id", "name", "value" FROM "Resource";
DROP TABLE "Resource";
ALTER TABLE "new_Resource" RENAME TO "Resource";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
