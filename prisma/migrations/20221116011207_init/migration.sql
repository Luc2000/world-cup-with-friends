-- CreateTable
CREATE TABLE "game" (
    "id" TEXT NOT NULL,
    "homeTeam" TEXT NOT NULL,
    "awayTeam" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameUsers" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "userMail" TEXT NOT NULL,
    "userPhoto" TEXT NOT NULL,
    "userName" TEXT NOT NULL,

    CONSTRAINT "GameUsers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameUsers" ADD CONSTRAINT "GameUsers_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
